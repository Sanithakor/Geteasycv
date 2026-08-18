/**
 * POST /api/auth/otp/verify
 *
 * Verifies an OTP and returns a JWT token (logs in or creates account for signup).
 *
 * For "login" purpose: user must already exist.
 * For "signup" purpose: user is created if they don't exist yet (requires name).
 *
 * Body: { identifier, identifierType, otp, purpose, name? }
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
  // Rate limit: 10 verify attempts per 15 minutes per IP
  const rateLimit = checkRateLimit(req, {
    windowMs: 15 * 60 * 1000,
    max: 10,
    keyPrefix: 'auth_otp_verify',
  });

  if (!rateLimit.success) {
    return createRateLimitResponse(
      rateLimit.retryAfter,
      'Too many verification attempts. Please try again later.'
    );
  }

  try {
    const body = await req.json();
    const { identifier, identifierType, otp, purpose, name } = body;

    if (!identifier || !identifierType || !otp || !purpose) {
      return NextResponse.json(
        { error: 'identifier, identifierType, otp, and purpose are required' },
        { status: 400 }
      );
    }

    if (!['email', 'phone'].includes(identifierType)) {
      return NextResponse.json(
        { error: 'identifierType must be "email" or "phone"' },
        { status: 400 }
      );
    }

    if (!['login', 'signup'].includes(purpose)) {
      return NextResponse.json(
        { error: 'purpose must be "login" or "signup"' },
        { status: 400 }
      );
    }

    const normalizedIdentifier = identifier.trim().toLowerCase();
    const cleanOtp = String(otp).trim();

    if (!/^\d{6}$/.test(cleanOtp)) {
      return NextResponse.json(
        { error: 'OTP must be exactly 6 digits' },
        { status: 400 }
      );
    }

    // Find the OTP record
    const otpRecord = await prisma.otpToken.findUnique({
      where: {
        identifier_purpose: {
          identifier: normalizedIdentifier,
          purpose,
        },
      },
    });

    if (!otpRecord) {
      return NextResponse.json(
        { error: 'OTP not found. Please request a new code.' },
        { status: 400 }
      );
    }

    // Check expiry
    if (new Date() > otpRecord.expiresAt) {
      // Clean up expired record
      await prisma.otpToken.delete({
        where: {
          identifier_purpose: {
            identifier: normalizedIdentifier,
            purpose,
          },
        },
      }).catch(() => {});

      return NextResponse.json(
        { error: 'OTP has expired. Please request a new code.' },
        { status: 400 }
      );
    }

    // Check attempts
    if (otpRecord.attempts >= MAX_ATTEMPTS) {
      // Invalidate on too many attempts
      await prisma.otpToken.delete({
        where: {
          identifier_purpose: {
            identifier: normalizedIdentifier,
            purpose,
          },
        },
      }).catch(() => {});

      return NextResponse.json(
        { error: 'Too many failed attempts. Please request a new OTP.' },
        { status: 429 }
      );
    }

    // Verify OTP
    const expectedHash = await hashOtp(cleanOtp);
    const isValid = expectedHash === otpRecord.otp;

    if (!isValid) {
      // Increment attempt counter
      await prisma.otpToken.update({
        where: {
          identifier_purpose: {
            identifier: normalizedIdentifier,
            purpose,
          },
        },
        data: { attempts: { increment: 1 } },
      });

      const remainingAttempts = MAX_ATTEMPTS - otpRecord.attempts - 1;
      return NextResponse.json(
        {
          error: remainingAttempts > 0
            ? `Invalid OTP. ${remainingAttempts} attempt${remainingAttempts === 1 ? '' : 's'} remaining.`
            : 'Invalid OTP. This OTP has been invalidated.',
        },
        { status: 400 }
      );
    }

    // OTP is valid — delete it (single-use)
    await prisma.otpToken.delete({
      where: {
        identifier_purpose: {
          identifier: normalizedIdentifier,
          purpose,
        },
      },
    }).catch(() => {});

    let user: any = null;

    if (purpose === 'login') {
      // Fetch existing user
      if (identifierType === 'email') {
        user = await prisma.user.findUnique({ where: { email: normalizedIdentifier } });
      } else {
        user = await prisma.user.findFirst({ where: { phone: normalizedIdentifier } });
      }

      if (!user) {
        return NextResponse.json(
          { error: 'Account not found. Please sign up first.' },
          { status: 404 }
        );
      }

      if (user.isBanned) {
        return NextResponse.json({ error: 'Account has been banned' }, { status: 403 });
      }

      if (!user.isActive) {
        return NextResponse.json({ error: 'Account is inactive' }, { status: 403 });
      }

      // Update last login
      await prisma.user.update({
        where: { id: user.id },
        data: { lastLoginAt: new Date() },
      }).catch((err: Error) => console.warn('[OTP_LOGIN_UPDATE_WARN]', err));

    } else {
      // signup purpose — create user if they don't exist
      if (!name || !name.trim()) {
        return NextResponse.json(
          { error: 'Name is required for signup' },
          { status: 400 }
        );
      }

      // Check if user already exists
      if (identifierType === 'email') {
        user = await prisma.user.findUnique({ where: { email: normalizedIdentifier } });
      } else {
        user = await prisma.user.findFirst({ where: { phone: normalizedIdentifier } });
      }

      if (user) {
        // Account already exists — treat as login instead
        if (user.isBanned) {
          return NextResponse.json({ error: 'Account has been banned' }, { status: 403 });
        }
      } else {
        // Create new user
        const createData: any = {
          name: name.trim(),
          subscriptionTier: 'free',
          role: 'user',
          profile: {
            create: {
              timezone: 'UTC',
              language: 'en',
            },
          },
          subscription: {
            create: {
              plan: 'free',
              status: 'active',
              resumes: 3,
              storage: 100,
              aiCredits: 10,
            },
          },
        };

        if (identifierType === 'email') {
          createData.email = normalizedIdentifier;
          createData.emailVerified = new Date();
        } else {
          // Phone users need a placeholder email to satisfy unique constraint
          createData.email = `phone_${normalizedIdentifier.replace(/\D/g, '')}@geteasycv.placeholder`;
          createData.phone = normalizedIdentifier;
          createData.phoneVerified = new Date();
        }

        user = await prisma.user.create({ data: createData });

        // Send welcome email for email-based signups
        if (identifierType === 'email') {
          sendWelcomeEmail(user.email, user.name).catch((err: Error) => {
            console.warn('[WELCOME_EMAIL_ERROR]', err);
          });
        }

        // System notification
        await createSystemNotification({
          title: 'New User Registered',
          message: `${identifierType === 'email' ? user.email : normalizedIdentifier} joined GetEasyCV via OTP`,
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
  } catch (error) {
    console.error('[OTP_VERIFY_ERROR]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
