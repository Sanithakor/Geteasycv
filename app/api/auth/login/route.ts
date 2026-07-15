/**
 * POST /api/auth/login
 * Authenticate user with email/password
 * Returns JWT token and user data
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyPassword, generateToken, sanitizeEmail, validateEmail } from '@/lib/utils/auth';

export async function POST(req: Request) {
  try {
    console.log('[LOGIN] Attempting login...');
    
    // 1. Parse request
    const body = await req.json();
    const { email, password } = body;

    // 2. Validate input
    if (!email || !password) {
      console.log('[LOGIN] Missing email or password');
      return Response.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // 3. Validate email format
    const sanitized = sanitizeEmail(email);
    if (!validateEmail(sanitized)) {
      console.log('[LOGIN] Invalid email format');
      return Response.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // 4. Find user in database
    const user = await prisma.user.findUnique({
      where: { email: sanitized },
      select: {
        id: true,
        email: true,
        name: true,
        avatar: true,
        password: true,
        role: true,
        subscriptionTier: true,
        isActive: true,
        isBanned: true,
      },
    });

    if (!user) {
      console.log('[LOGIN] User not found:', sanitized);
      return Response.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // 5. Check if user is banned or inactive
    if (user.isBanned) {
      console.log('[LOGIN] User banned:', sanitized);
      return Response.json(
        { error: 'Account has been banned' },
        { status: 403 }
      );
    }

    if (!user.isActive) {
      console.log('[LOGIN] User inactive:', sanitized);
      return Response.json(
        { error: 'Account is inactive' },
        { status: 403 }
      );
    }

    // 6. Verify password
    if (!user.password) {
      console.log('[LOGIN] No password hash found');
      return Response.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) {
      console.log('[LOGIN] Invalid password for user:', sanitized);
      return Response.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // 7. Generate JWT token
    const token = await generateToken(user.id);
    console.log('[LOGIN] Token generated for user:', user.id);

    // 8. Update last login time
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    // 9. Create response without password
    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
        role: user.role,
        subscriptionTier: user.subscriptionTier,
      },
      token,
    });

    // 10. Set secure auth cookie
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: '/',
    });

    console.log('[LOGIN] Login successful for user:', user.email);
    return response;
  } catch (error) {
    console.error('[LOGIN_ERROR]', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
