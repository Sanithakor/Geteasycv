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
    console.log('[SIGNUP] Attempting user registration...');
    
    // 1. Parse request
    const body = await req.json();
    const { email, password, name } = body;

    // 2. Validate input
    if (!email || !password || !name) {
      console.log('[SIGNUP] Missing required fields');
      return Response.json(
        { error: 'Email, password, and name are required' },
        { status: 400 }
      );
    }

    // 3. Validate email format
    const sanitized = sanitizeEmail(email);
    if (!validateEmail(sanitized)) {
      console.log('[SIGNUP] Invalid email format');
      return Response.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // 4. Validate password strength
    const passwordCheck = validatePassword(password);
    if (!passwordCheck.valid) {
      console.log('[SIGNUP] Weak password');
      return Response.json(
        { error: 'Password too weak', errors: passwordCheck.errors },
        { status: 400 }
      );
    }

    // 5. Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: sanitized },
    });

    if (existingUser) {
      console.log('[SIGNUP] User already exists:', sanitized);
      return Response.json(
        { error: 'Email already registered' },
        { status: 409 }
      );
    }

    // 6. Hash password
    const hashedPassword = await hashPassword(password);
    console.log('[SIGNUP] Password hashed');

    // 7. Create user in database
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

    console.log('[SIGNUP] User created:', user.id);

    // 8. Generate JWT token
    const token = await generateToken(user.id);
    console.log('[SIGNUP] Token generated');

    // 9. Create response
    const response = NextResponse.json(
      {
        success: true,
        message: 'Account created successfully',
        user,
        token,
      },
      { status: 201 }
    );

    // 10. Set secure auth cookie
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: '/',
    });

    console.log('[SIGNUP] User registered successfully:', user.email);
    return response;
  } catch (error) {
    console.error('[SIGNUP_ERROR]', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
