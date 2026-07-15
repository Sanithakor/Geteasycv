/**
 * GET /api/users/profile - Get current user profile
 * PUT /api/users/profile - Update profile
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getAuthFromRequest, getCurrentUser } from '@/lib/middleware/auth';

export async function GET(req: Request) {
  try {
    const auth = await getAuthFromRequest(req);
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: auth.userId },
      include: {
        profile: true,
        subscription: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Remove password
    const { password, ...userWithoutPassword } = user;

    return NextResponse.json({
      success: true,
      data: userWithoutPassword,
    });
  } catch (error) {
    console.error('[PROFILE_GET_ERROR]', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const auth = await getAuthFromRequest(req);
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { name, avatar, bio, company, website, location, timezone, language } = body;

    // Update user
    const user = await prisma.user.update({
      where: { id: auth.userId },
      data: {
        ...(name && { name }),
        ...(avatar && { avatar }),
      },
      include: {
        profile: true,
        subscription: true,
      },
    });

    // Update profile
    if (bio || company || website || location || timezone || language) {
      await prisma.userProfile.update({
        where: { userId: auth.userId },
        data: {
          ...(bio && { bio }),
          ...(company && { company }),
          ...(website && { website }),
          ...(location && { location }),
          ...(timezone && { timezone }),
          ...(language && { language }),
        },
      });
    }

    const { password, ...userWithoutPassword } = user;

    return NextResponse.json({
      success: true,
      data: userWithoutPassword,
    });
  } catch (error) {
    console.error('[PROFILE_UPDATE_ERROR]', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
