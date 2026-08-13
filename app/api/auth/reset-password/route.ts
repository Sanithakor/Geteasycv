/**
 * POST /api/auth/reset-password
 *
 * Accepts a token and a new password. Updates the user's password if the token is valid.
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { hashPassword, validatePassword } from '@/lib/utils/auth';
import { checkRateLimit, createRateLimitResponse } from '@/lib/middleware/rateLimit';

export async function POST(req: Request) {
  // Apply rate limiting (Max 5 attempts per 15 minutes per IP)
  const rateLimit = checkRateLimit(req, {
    windowMs: 15 * 60 * 1000,
    max: 5,
    keyPrefix: 'auth_reset_password',
  });

  if (!rateLimit.success) {
    return createRateLimitResponse(
      rateLimit.retryAfter,
      'Too many password reset attempts. Please try again later.'
    );
  }

  try {
    const body = await req.json();
    const { token, newPassword } = body;

    if (!token || !newPassword) {
      return NextResponse.json({ error: 'Token and new password are required' }, { status: 400 });
    }

    const passwordCheck = validatePassword(newPassword);
    if (!passwordCheck.valid) {
      return NextResponse.json(
        { error: 'Password too weak', errors: passwordCheck.errors },
        { status: 400 }
      );
    }

    // Find the token
    const verificationRecord = await prisma.verificationToken.findFirst({
      where: {
        token,
        type: 'password_reset',
        expiresAt: {
          gt: new Date(), // Check if not expired
        },
      },
    });

    if (!verificationRecord) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 });
    }

    // Hash the new password
    const hashedPassword = await hashPassword(newPassword);

    // Update the user's password
    await prisma.user.update({
      where: { email: verificationRecord.email },
      data: { password: hashedPassword },
    });

    // Delete the token
    await prisma.verificationToken.delete({
      where: {
        email_type: {
          email: verificationRecord.email,
          type: 'password_reset',
        },
      },
    });

    return NextResponse.json(
      { success: true, message: 'Password has been reset successfully.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('[RESET_PASSWORD_ERROR]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
