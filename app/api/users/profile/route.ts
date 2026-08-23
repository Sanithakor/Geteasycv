/**
 * GET /api/users/profile - Get current user profile
 * PUT /api/users/profile - Update profile
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getAuthFromRequest } from '@/lib/middleware/auth';

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

    // Update user table
    const updatedUser = await prisma.user.update({
      where: { id: auth.userId },
      data: {
        ...(name !== undefined && { name }),
        ...(avatar !== undefined && { avatar }),
      },
    });

    // Upsert userProfile table
    const profile = await prisma.userProfile.upsert({
      where: { userId: auth.userId },
      create: {
        userId: auth.userId,
        bio: bio ?? null,
        company: company ?? null,
        website: website ?? null,
        location: location ?? null,
        timezone: timezone ?? 'UTC',
        language: language ?? 'en',
      },
      update: {
        ...(bio !== undefined && { bio }),
        ...(company !== undefined && { company }),
        ...(website !== undefined && { website }),
        ...(location !== undefined && { location }),
        ...(timezone !== undefined && { timezone }),
        ...(language !== undefined && { language }),
      },
    });

    const fullUser = await prisma.user.findUnique({
      where: { id: auth.userId },
      include: {
        profile: true,
        subscription: true,
      },
    });

    if (!fullUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const { password, ...userWithoutPassword } = fullUser;

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
