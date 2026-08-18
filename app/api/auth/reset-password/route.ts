/**
 * POST /api/auth/reset-password
 *
 * Accepts a token and a new password. Updates the user's password if the token is valid.
 * Accepts both `newPassword` and `password` field names for compatibility.
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { hashPassword, validatePassword } from '@/lib/utils/auth';
import { checkRateLimit, createRateLimitResponse } from '@/lib/middleware/rateLimit';

export async function POST(req: Request) {
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
    const { token } = body;
    // Accept both field names from old and new reset-password pages
    const newPassword: string = body.newPassword || body.password || '';

    if (!token || !newPassword) {
      return NextResponse.json(
        { error: 'Token and new password are required' },
        { status: 400 }
      );
    }

    const passwordCheck = validatePassword(newPassword);
    if (!passwordCheck.valid) {
      return NextResponse.json(
        { error: passwordCheck.errors[0] || 'Password too weak', errors: passwordCheck.errors },
        { status: 400 }
      );
    }

    // Find the token
    const verificationRecord = await prisma.verificationToken.findFirst({
      where: {
        token,
        type: 'password_reset',
        expiresAt: { gt: new Date() },
      },
    });

    if (!verificationRecord) {
      return NextResponse.json(
        { error: 'Invalid or expired reset link. Please request a new one.' },
        { status: 400 }
      );
    }

    // Hash and update
    const hashedPassword = await hashPassword(newPassword);

    await prisma.user.update({
      where: { email: verificationRecord.email },
      data: { password: hashedPassword },
    });

    // Delete the used token
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
