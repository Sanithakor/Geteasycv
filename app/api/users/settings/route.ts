/**
 * GET /api/users/settings - Get user settings
 * PUT /api/users/settings - Update user settings
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { protectRoute } from '@/lib/middleware/auth';

export async function GET(req: Request) {
  try {
    console.log('[USER_SETTINGS] GET - Fetching settings...');

    // 1. Protect route
    const auth = await protectRoute(req);
    if (!auth) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Get user settings
    const user = await prisma.user.findUnique({
      where: { id: auth.userId },
      include: {
        profile: true,
      },
    });

    if (!user) {
      console.log('[USER_SETTINGS] User not found:', auth.userId);
      return Response.json({ error: 'User not found' }, { status: 404 });
    }

    console.log('[USER_SETTINGS] Settings fetched for user:', user.email);

    return Response.json({
      success: true,
      data: {
        userId: user.id,
        email: user.email,
        emailVerified: user.emailVerified,
        name: user.name,
        subscriptionTier: user.subscriptionTier,
        settings: {
          timezone: user.profile?.timezone || 'UTC',
          language: user.profile?.language || 'en',
          theme: user.profile?.theme || 'light',
          notifications: user.profile?.notifications ?? true,
          emailUpdates: user.profile?.emailUpdates ?? true,
        },
      },
    });
  } catch (error) {
    console.error('[USER_SETTINGS_GET_ERROR]', error);
    return Response.json(
      { error: 'Failed to fetch settings' },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    console.log('[USER_SETTINGS] PUT - Updating settings...');

    // 1. Protect route
    const auth = await protectRoute(req);
    if (!auth) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Parse request
    const body = await req.json();
    const {
      timezone,
      language,
      theme,
      notifications,
      emailUpdates,
    } = body;

    // 3. Validate timezone
    const validTimezones = ['UTC', 'EST', 'CST', 'MST', 'PST'];
    if (timezone && !validTimezones.includes(timezone)) {
      return Response.json(
        { error: 'Invalid timezone' },
        { status: 400 }
      );
    }

    // 4. Validate language
    const validLanguages = ['en', 'es', 'fr', 'de', 'it', 'pt', 'ja', 'zh'];
    if (language && !validLanguages.includes(language)) {
      return Response.json(
        { error: 'Invalid language' },
        { status: 400 }
      );
    }

    // 5. Validate theme
    const validThemes = ['light', 'dark', 'system'];
    if (theme && !validThemes.includes(theme)) {
      return Response.json(
        { error: 'Invalid theme' },
        { status: 400 }
      );
    }

    // 6. Get current user
    const currentUser = await prisma.user.findUnique({
      where: { id: auth.userId },
      include: { profile: true },
    });

    if (!currentUser) {
      console.log('[USER_SETTINGS] User not found:', auth.userId);
      return Response.json({ error: 'User not found' }, { status: 404 });
    }

    // 7. Update settings
    const updated = await prisma.user.update({
      where: { id: auth.userId },
      data: {
        profile: {
          upsert: {
            create: {
              timezone: timezone || 'UTC',
              language: language || 'en',
              theme: theme || 'light',
              notifications: typeof notifications === 'boolean' ? notifications : true,
              emailUpdates: typeof emailUpdates === 'boolean' ? emailUpdates : true,
            },
            update: {
              timezone: timezone || undefined,
              language: language || undefined,
              theme: theme || undefined,
              notifications: typeof notifications === 'boolean' ? notifications : undefined,
              emailUpdates: typeof emailUpdates === 'boolean' ? emailUpdates : undefined,
            },
          },
        },
      },
      include: {
        profile: true,
      },
    });

    console.log('[USER_SETTINGS] Settings updated for user:', updated.email);

    return Response.json({
      success: true,
      message: 'Settings updated successfully',
      data: {
        settings: {
          timezone: updated.profile?.timezone || 'UTC',
          language: updated.profile?.language || 'en',
          theme: updated.profile?.theme || 'light',
          notifications: updated.profile?.notifications ?? true,
          emailUpdates: updated.profile?.emailUpdates ?? true,
        },
      },
    });
  } catch (error) {
    console.error('[USER_SETTINGS_PUT_ERROR]', error);
    return Response.json(
      { error: 'Failed to update settings' },
      { status: 500 }
    );
  }
}

