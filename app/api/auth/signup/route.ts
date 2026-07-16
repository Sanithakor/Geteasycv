/**
 * POST /api/auth/signup
 * Register new user account
 * Returns JWT token and user data
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { hashPassword, generateToken, validatePassword, sanitizeEmail, validateEmail } from '@/lib/utils/auth';

export async function POST(req: Request) {
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

    const existingUser = await prisma.user.findUnique({
      where: { email: sanitized },
    });

    if (existingUser) {
      return Response.json(
        { error: 'Email already registered' },
        { status: 409 }
      );
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
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

    const token = await generateToken(user.id);

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
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
