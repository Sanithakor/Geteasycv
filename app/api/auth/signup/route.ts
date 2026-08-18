/**
 * POST /api/auth/signup
 * Register new user account
 * Returns JWT token and user data
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { hashPassword, generateToken, validatePassword, sanitizeEmail, validateEmail } from '@/lib/utils/auth';
import { sendWelcomeEmail } from '@/lib/email';
import { checkRateLimit, createRateLimitResponse } from '@/lib/middleware/rateLimit';
import { createSystemNotification } from '@/lib/notifications';

/** Validate international phone number (E.164 basic check) */
function validatePhone(phone: string): boolean {
  return /^\+?[1-9]\d{6,14}$/.test(phone.replace(/[\s\-()]/g, ''));
}

function normalizePhone(phone: string): string {
  return phone.replace(/[\s\-()]/g, '').toLowerCase();
}

export async function POST(req: Request) {
  // Apply rate limiting (Max 10 signups per 15 minutes per IP)
  const rateLimit = checkRateLimit(req, {
    windowMs: 15 * 60 * 1000,
    max: 10,
    keyPrefix: 'auth_signup',
  });

  if (!rateLimit.success) {
    return createRateLimitResponse(
      rateLimit.retryAfter,
      'Too many registration requests. Please try again later.'
    );
  }

  try {
    const body = await req.json();
    const { email, phone, password, name } = body;

    if ((!email && !phone) || !password || !name) {
      return Response.json(
        { error: 'Email or phone, password, and name are required' },
        { status: 400 }
      );
    }

    // Build user data based on identifier type
    const userData: any = { password, name };

    if (email) {
      const sanitized = sanitizeEmail(email);
      if (!validateEmail(sanitized)) {
        return Response.json({ error: 'Invalid email format' }, { status: 400 });
      }

      const existingUser = await prisma.user.findUnique({ where: { email: sanitized } });
      if (existingUser) {
        return Response.json({ error: 'Email already registered' }, { status: 409 });
      }
      userData.email = sanitized;
    } else {
      // Phone-based registration
      const normalizedPhone = normalizePhone(phone);
      if (!validatePhone(normalizedPhone)) {
        return Response.json({ error: 'Invalid phone number format' }, { status: 400 });
      }
      const existingUser = await prisma.user.findFirst({ where: { phone: normalizedPhone } });
      if (existingUser) {
        return Response.json({ error: 'Phone number already registered' }, { status: 409 });
      }
      userData.phone = normalizedPhone;
      // Placeholder email required by unique constraint
      userData.email = `phone_${normalizedPhone.replace(/\D/g, '')}@geteasycv.placeholder`;
    }

    const passwordCheck = validatePassword(password);
    if (!passwordCheck.valid) {
      return Response.json(
        { error: 'Password too weak', errors: passwordCheck.errors },
        { status: 400 }
      );
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        ...userData,
        password: hashedPassword,
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
      },
      select: {
        id: true,
        email: true,
        name: true,
        avatar: true,
        role: true,
        subscriptionTier: true,
      },
    });

    const token = await generateToken(user.id);

    // Send transactional welcome email (only for email-based registrations)
    if (email) {
      sendWelcomeEmail(user.email, user.name).catch((err) => {
        console.warn('[WELCOME_EMAIL_ERROR]', err);
      });
    }

    // Dispatch real notification for user registration
    await createSystemNotification({
      title: 'New User Registered',
      message: `${user.email} joined GetEasyCV`,
      type: 'user_signup',
      target: 'all',
      userId: user.id,
    });

    const response = NextResponse.json(
      {
        success: true,
        message: 'Account created successfully',
        user,
        token,
      },
      { status: 201 }
    );

    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('[SIGNUP_ERROR]', error);
    const errorMessage = error instanceof Error ? error.message : 'Signup failed';
    return Response.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
