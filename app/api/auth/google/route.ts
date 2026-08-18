/**
 * GET & POST /api/auth/google - Authenticate user via Google OAuth (ID Token, Access Token, or Auth Code Verification)
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { SignJWT } from 'jose';

const getJWTSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET is not set');
  return new TextEncoder().encode(secret);
};

interface GoogleProfile {
  email: string;
  name: string;
  picture?: string;
  sub?: string;
  email_verified?: boolean | string;
}

export async function GET() {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || process.env.GOOGLE_CLIENT_ID || '';
  return NextResponse.json({
    clientId,
    configured: Boolean(clientId),
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { credential, accessToken, code, redirectUri, demoMode } = body;

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

    // 3. Exchange Authorization Code for tokens if code is provided
    if (!profile && code && typeof code === 'string') {
      try {
        const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || process.env.GOOGLE_CLIENT_ID || '';
        const clientSecret = process.env.GOOGLE_CLIENT_SECRET || '';
        const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

        const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            code,
            client_id: clientId,
            client_secret: clientSecret,
            redirect_uri: redirectUri || `${appUrl}/api/auth/google/callback`,
            grant_type: 'authorization_code',
          }),
        });

        if (tokenRes.ok) {
          const tokenData = await tokenRes.json();
          if (tokenData.access_token) {
            const userinfoRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
              headers: { Authorization: `Bearer ${tokenData.access_token}` },
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
          }
        }
      } catch (err) {
        console.error('[GOOGLE_CODE_EXCHANGE_ERROR]', err);
      }
    }

    // 4. Development / Demo Fallback Mode
    if (!profile && demoMode) {
      profile = {
        email: 'google.user@geteasycv.com',
        name: 'Google User',
        picture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
        sub: 'google_demo_10001',
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
      console.error('[PRISMA_ERROR] Google Auth DB error:', dbError);
      return NextResponse.json(
        { error: 'Authentication failed. Please try again.' },
        { status: 500 }
      );
    }

    // Generate JWT auth token using jose (edge-compatible)
    const secret = getJWTSecret();
    const authToken = await new SignJWT({
      userId: user.id,
      email: user.email,
      role: user.role || 'user',
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('30d')
      .sign(secret);

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role || 'user',
        tier: user.subscriptionTier || user.tier || 'free',
        avatar: user.avatar || picture || '',
      },
      token: authToken,
    });

    // Set httpOnly cookie for browser session persistence
    response.cookies.set('auth-token', authToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60,
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
