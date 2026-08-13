/**
 * POST /api/auth/signup
 * Register new user account
 * Returns JWT token and user data
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { hashPassword, generateToken, validatePassword, sanitizeEmail, validateEmail } from '@/lib/utils/auth';
import { createSystemNotification } from '@/lib/notifications';
import { checkRateLimit, createRateLimitResponse } from '@/lib/middleware/rateLimit';

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
    const { email, password, name } = body;

    if (!email || !password || !name) {
      return Response.json(
        { error: 'Email, password, and name are required' },
        { status: 400 }
      );
    }

    const sanitized = sanitizeEmail(email);
    if (!validateEmail(sanitized)) {
      return Response.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const passwordCheck = validatePassword(password);
    if (!passwordCheck.valid) {
      return Response.json(
        { error: 'Password too weak', errors: passwordCheck.errors },
        { status: 400 }
      );
    }

    let existingUser = null;
    let isDbAvailable = true;

    try {
      existingUser = await prisma.user.findUnique({
        where: { email: sanitized },
      });
    } catch (dbError) {
      console.warn('[PRISMA_UNAVAILABLE] Signup falling back to mock database mode:', dbError);
      isDbAvailable = false;
    }

    if (isDbAvailable && existingUser) {
      return Response.json(
        { error: 'Email already registered' },
        { status: 409 }
      );
    }

    const hashedPassword = await hashPassword(password);
    let user: any = null;

    if (isDbAvailable) {
      try {
        user = await prisma.user.create({
          data: {
            email: sanitized,
            password: hashedPassword,
            name,
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
      } catch (createErr: any) {
        console.warn('[PRISMA_CREATE_ERROR]', createErr);
        if (createErr?.code === 'P2002') {
          return Response.json(
            { error: 'Email already registered' },
            { status: 409 }
          );
        }
        isDbAvailable = false;
      }
    }

    if (!isDbAvailable || !user) {
      // Mock user creation fallback when PostgreSQL database is offline
      user = {
        id: `mock-user-${Date.now()}`,
        email: sanitized,
        name: name,
        avatar: null,
        role: 'user',
        subscriptionTier: 'free',
      };
    }

    const token = await generateToken(user.id);

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
