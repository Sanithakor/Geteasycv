/**
 * POST /api/auth/otp/verify
 * Verifies an OTP and issues a session token.
 * Compatible with Cloudflare Workers (no Buffer, no Node-only APIs).
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { generateToken } from '@/lib/utils/auth';
import { sendWelcomeEmail } from '@/lib/email';
import { createSystemNotification } from '@/lib/notifications';
import { checkRateLimit, createRateLimitResponse } from '@/lib/middleware/rateLimit';
import { hashOtp } from '../send/route';

const MAX_ATTEMPTS = 5;

export async function POST(req: Request) {
  const rateLimit = checkRateLimit(req, {
    windowMs: 15 * 60 * 1000,
    max: 10,
    keyPrefix: 'auth_otp_verify',
  });
  if (!rateLimit.success) {
    return createRateLimitResponse(rateLimit.retryAfter, 'Too many verification attempts. Please try again later.');
  }

  try {
    const body = await req.json();
    const { identifier, identifierType, otp, purpose, name } = body;

    if (!identifier || !identifierType || !otp || !purpose) {
      return NextResponse.json(
        { error: 'identifier, identifierType, otp, and purpose are required.' },
        { status: 400 },
      );
    }
    if (!['email', 'phone'].includes(identifierType)) {
      return NextResponse.json({ error: 'identifierType must be "email" or "phone".' }, { status: 400 });
    }
    if (!['login', 'signup'].includes(purpose)) {
      return NextResponse.json({ error: 'purpose must be "login" or "signup".' }, { status: 400 });
    }

    const normalized = identifier.trim().toLowerCase();
    const cleanOtp = String(otp).trim().replace(/\s/g, '');

    if (!/^\d{6}$/.test(cleanOtp)) {
      return NextResponse.json({ error: 'OTP must be exactly 6 digits.' }, { status: 400 });
    }

    // Find record by individual fields (no named unique constraint needed)
    const otpRecord = await prisma.otpToken.findFirst({
      where: { identifier: normalized, purpose },
    });

    if (!otpRecord) {
      return NextResponse.json(
        { error: 'OTP not found or already used. Please request a new code.' },
        { status: 400 },
      );
    }

    if (new Date() > otpRecord.expiresAt) {
      await prisma.otpToken.delete({ where: { id: otpRecord.id } }).catch(() => {});
      return NextResponse.json({ error: 'OTP has expired. Please request a new code.' }, { status: 400 });
    }

    if (otpRecord.attempts >= MAX_ATTEMPTS) {
      await prisma.otpToken.delete({ where: { id: otpRecord.id } }).catch(() => {});
      return NextResponse.json(
        { error: 'Too many failed attempts. Please request a new OTP.' },
        { status: 429 },
      );
    }

    // Constant-time verify — no Buffer, pure Uint8Array hex comparison
    const expectedHash = await hashOtp(cleanOtp);
    const isValid = expectedHash === otpRecord.otp;

    if (!isValid) {
      await prisma.otpToken.update({
        where: { id: otpRecord.id },
        data: { attempts: { increment: 1 } },
      });
      const remaining = MAX_ATTEMPTS - otpRecord.attempts - 1;
      return NextResponse.json(
        {
          error:
            remaining > 0
              ? `Incorrect code. ${remaining} attempt${remaining === 1 ? '' : 's'} remaining.`
              : 'Incorrect code. This OTP has been invalidated. Please request a new one.',
        },
        { status: 400 },
      );
    }

    // Valid — delete (single-use)
    await prisma.otpToken.delete({ where: { id: otpRecord.id } }).catch(() => {});

    // ── Resolve user ──────────────────────────────────────────────────────
    let user: any = null;

    if (purpose === 'login') {
      if (identifierType === 'email') {
        user = await prisma.user.findUnique({ where: { email: normalized } });
      } else {
        user = await prisma.user.findFirst({ where: { phone: normalized } });
        if (!user) {
          user = await prisma.user.findFirst({ where: { phone: identifier.trim() } });
        }
      }

      if (!user) {
        return NextResponse.json(
          { error: 'Account not found. Please sign up first.' },
          { status: 404 },
        );
      }
      if (user.isBanned) return NextResponse.json({ error: 'Account has been banned.' }, { status: 403 });
      if (!user.isActive) return NextResponse.json({ error: 'Account is inactive.' }, { status: 403 });

      await prisma.user.update({ where: { id: user.id }, data: { lastLoginAt: new Date() } })
        .catch((e: Error) => console.warn('[OTP_LASTLOGIN_WARN]', e));
    } else {
      // signup
      if (!name?.trim()) {
        return NextResponse.json({ error: 'Full name is required for sign up.' }, { status: 400 });
      }

      if (identifierType === 'email') {
        user = await prisma.user.findUnique({ where: { email: normalized } });
      } else {
        user = await prisma.user.findFirst({ where: { phone: normalized } });
      }

      if (user) {
        if (user.isBanned) return NextResponse.json({ error: 'Account has been banned.' }, { status: 403 });
        // existing user — log them in
      } else {
        const sharedData = {
          name: name.trim(),
          subscriptionTier: 'free',
          role: 'user',
          profile: { create: { timezone: 'UTC', language: 'en' } },
          subscription: {
            create: { plan: 'free', status: 'active', resumes: 3, storage: 100, aiCredits: 10 },
          },
        } as const;

        if (identifierType === 'email') {
          user = await prisma.user.create({
            data: {
              ...sharedData,
              email: normalized,
              emailVerified: new Date(),
            },
          });
        } else {
          const digits = normalized.replace(/\D/g, '');
          user = await prisma.user.create({
            data: {
              ...sharedData,
              email: `phone_${digits}@geteasycv.placeholder`,
              phone: normalized,
              phoneVerified: new Date(),
            },
          });
        }

        if (identifierType === 'email') {
          sendWelcomeEmail(user.email, user.name).catch((e: Error) =>
            console.warn('[WELCOME_EMAIL_WARN]', e),
          );
        }

        await createSystemNotification({
          title: 'New User Registered',
          message: `${identifierType === 'email' ? user.email : normalized} joined GetEasyCV via OTP`,
          type: 'user_signup',
          target: 'all',
          userId: user.id,
        });
      }
    }

    const token = await generateToken(user.id, user.role);

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar ?? null,
        role: user.role,
        subscriptionTier: user.subscriptionTier,
      },
      token,
    });

    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });

    return response;
  } catch (err) {
    console.error('[OTP_VERIFY_ERROR]', err);
    const msg =
      process.env.NODE_ENV !== 'production' && err instanceof Error
        ? err.message
        : 'Verification failed. Please try again.';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
