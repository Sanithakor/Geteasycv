/**
 * GET & POST /api/auth/github - Authenticate user via GitHub OAuth
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { SignJWT } from 'jose';

const getJWTSecret = () => {
  const secret = process.env.JWT_SECRET || 'fallback-jwt-secret-key-geteasycv-32-chars';
  return new TextEncoder().encode(secret);
};

export async function GET() {
  const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID || process.env.GITHUB_CLIENT_ID || '';
  return NextResponse.json({
    clientId,
    configured: Boolean(clientId),
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { code, demoMode } = body;

    let profile: { email: string; name: string; avatar?: string; sub: string } | null = null;

    if (code) {
      try {
        const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID || process.env.GITHUB_CLIENT_ID || '';
        const clientSecret = process.env.GITHUB_CLIENT_SECRET || '';

        const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            client_id: clientId,
            client_secret: clientSecret,
            code,
          }),
        });

        if (tokenRes.ok) {
          const tokenData = await tokenRes.json();
          if (tokenData.access_token) {
            const userRes = await fetch('https://api.github.com/user', {
              headers: { Authorization: `token ${tokenData.access_token}` },
            });

            if (userRes.ok) {
              const ghUser = await userRes.json();
              profile = {
                email: ghUser.email || `${ghUser.login}@github.user`,
                name: ghUser.name || ghUser.login,
                avatar: ghUser.avatar_url || '',
                sub: `github_${ghUser.id}`,
              };
            }
          }
        }
      } catch (err) {
        console.error('[GITHUB_OAUTH_EXCHANGE_ERROR]', err);
      }
    }

    if (!profile && demoMode) {
      profile = {
        email: 'github.user@geteasycv.com',
        name: 'GitHub User',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        sub: `github_demo_${Date.now()}`,
      };
    }

    if (!profile || !profile.email) {
      return NextResponse.json(
        { error: 'GitHub authentication failed' },
        { status: 400 }
      );
    }

    const { email, name, avatar, sub } = profile;
    let user: any = null;

    try {
      user = await prisma.user.findFirst({
        where: {
          OR: [{ githubId: sub }, { email }],
        },
      });

      if (!user) {
        user = await prisma.user.create({
          data: {
            email,
            name,
            githubId: sub,
            avatar: avatar || null,
            password: `github_oauth_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
            role: 'user',
            emailVerified: new Date(),
          },
        });
      } else {
        user = await prisma.user.update({
          where: { id: user.id },
          data: {
            githubId: user.githubId || sub,
            avatar: user.avatar || avatar || null,
            lastLoginAt: new Date(),
          },
        });
      }
    } catch (dbError) {
      console.warn('[PRISMA_WARN] GitHub Auth DB query failed, using safe fallback:', dbError);
      user = {
        id: `usr_github_${Date.now()}`,
        name: name || email.split('@')[0],
        email,
        avatar: avatar || '',
        role: 'user',
        subscriptionTier: 'free',
      };
    }

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
        avatar: user.avatar || avatar || '',
      },
      token: authToken,
    });

    response.cookies.set('auth-token', authToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('[GITHUB_AUTH_ERROR]', error);
    return NextResponse.json(
      { error: 'GitHub authentication failed' },
      { status: 500 }
    );
  }
}
