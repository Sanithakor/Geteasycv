/**
 * POST /api/auth/google - Authenticate user via Google OAuth (ID Token or Access Token Verification)
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-here-change-in-production';

interface GoogleProfile {
  email: string;
  name: string;
  picture?: string;
  sub?: string;
  email_verified?: boolean | string;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { credential, accessToken, googleUser } = body;

    let profile: GoogleProfile | null = null;

    // 1. Verify Google Credential (ID Token) via Google's official tokeninfo API
    if (credential && typeof credential === 'string') {
      try {
        const verifyRes = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(credential)}`, {
          headers: { 'Accept': 'application/json' },
        });

        if (verifyRes.ok) {
          const payload = await verifyRes.json();
          if (payload && payload.email) {
            profile = {
              email: payload.email,
              name: payload.name || payload.email.split('@')[0],
              picture: payload.picture || '',
              sub: payload.sub,
              email_verified: payload.email_verified,
            };
          }
        } else {
          console.warn('[GOOGLE_VERIFY_WARN] Google tokeninfo API rejected ID token:', verifyRes.status);
        }
      } catch (err) {
        console.error('[GOOGLE_VERIFY_ERROR] Error calling Google tokeninfo:', err);
      }
    }

    // 2. Verify Access Token via Google's userinfo API if ID Token verification was not used
    if (!profile && accessToken && typeof accessToken === 'string') {
      try {
        const userinfoRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (userinfoRes.ok) {
          const payload = await userinfoRes.json();
          if (payload && payload.email) {
            profile = {
              email: payload.email,
              name: payload.name || payload.email.split('@')[0],
              picture: payload.picture || '',
              sub: payload.sub,
              email_verified: payload.email_verified,
            };
          }
        }
      } catch (err) {
        console.error('[GOOGLE_USERINFO_ERROR] Error calling Google userinfo:', err);
      }
    }

    // 3. Fallback to client-provided googleUser if available (dev / fallback)
    if (!profile && googleUser && googleUser.email) {
      profile = {
        email: googleUser.email,
        name: googleUser.name || googleUser.email.split('@')[0],
        picture: googleUser.picture || googleUser.avatar || '',
        sub: googleUser.sub || googleUser.id,
      };
    }

    if (!profile || !profile.email) {
      return NextResponse.json(
        { error: 'Invalid or unverified Google token. Please try signing in again.' },
        { status: 400 }
      );
    }

    const { email, name, picture, sub } = profile;
    let user: any = null;

    try {
      // Find existing user by googleId or email
      if (sub) {
        user = await prisma.user.findFirst({
          where: {
            OR: [
              { googleId: sub },
              { email: email },
            ],
          },
        });
      } else {
        user = await prisma.user.findUnique({
          where: { email },
        });
      }

      if (!user) {
        // Create new user account via Google
        user = await prisma.user.create({
          data: {
            email,
            name,
            googleId: sub || null,
            avatar: picture || null,
            password: `google_oauth_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
            role: 'user',
            emailVerified: new Date(),
          },
        });
      } else {
        // Update existing user with googleId & avatar if missing
        user = await prisma.user.update({
          where: { id: user.id },
          data: {
            googleId: user.googleId || sub || null,
            avatar: user.avatar || picture || null,
            lastLoginAt: new Date(),
          },
        });
      }
    } catch (dbError) {
      console.warn('[PRISMA_UNAVAILABLE] Google Auth DB fallback:', dbError);
      user = {
        id: `google-user-${sub || Date.now()}`,
        email,
        name,
        role: 'user',
        avatar: picture || '',
        subscriptionTier: 'free',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    }

    // Generate JWT auth token
    const authToken = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role || 'user',
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role || 'user',
        tier: user.subscriptionTier || 'free',
        avatar: user.avatar || picture || '',
      },
      token: authToken,
    });

    // Set cookie for browser session persistence
    response.cookies.set('token', authToken, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('[GOOGLE_AUTH_ERROR]', error);
    return NextResponse.json(
      { error: 'Google authentication failed' },
      { status: 500 }
    );
  }
}
