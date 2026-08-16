/**
 * POST /api/auth/forgot-password
 *
 * Accepts an email address and initiates a password reset flow.
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { randomBytes } from 'crypto';
import { sendPasswordResetEmail } from '@/lib/email';
import { checkRateLimit, createRateLimitResponse } from '@/lib/middleware/rateLimit';

export async function POST(req: Request) {
  // Apply rate limiting (Max 5 attempts per 15 minutes per IP)
  const rateLimit = checkRateLimit(req, {
    windowMs: 15 * 60 * 1000,
    max: 5,
    keyPrefix: 'auth_forgot_password',
  });

  if (!rateLimit.success) {
    return createRateLimitResponse(
      rateLimit.retryAfter,
      'Too many password reset requests. Please try again later.'
    );
  }

  try {
    const body = await req.json();
    const { email } = body;

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Always return 200 regardless of whether the email exists to prevent enumeration.
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user) {
      // Generate token
      const token = randomBytes(32).toString('hex');
      const expiresAt = new Date(Date.now() + 3600000); // 1 hour

      // Save token in DB
      await prisma.verificationToken.upsert({
        where: {
          email_type: {
            email: user.email,
            type: 'password_reset',
          },
        },
        update: {
          token,
          expiresAt,
        },
        create: {
          email: user.email,
          token,
          type: 'password_reset',
          expiresAt,
        },
      });

      // Dispatch real transactional password reset email
      await sendPasswordResetEmail(user.email, token).catch((err) => {
        console.warn('[FORGOT_PASSWORD_EMAIL_WARN]', err);
      });
    }

    return NextResponse.json(
      { success: true, message: 'If that email is registered, a reset link has been sent.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('[FORGOT_PASSWORD_ERROR]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
