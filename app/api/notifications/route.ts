/**
 * GET /api/notifications - List real system/user notifications
 * POST /api/notifications - Create a new system notification (Admin only)
 * PATCH /api/notifications - Mark notification(s) as read (Authenticated)
 */

import { NextResponse } from 'next/server';
import { getAuthFromRequest, requireAdmin } from '@/lib/middleware/auth';
import {
  getSystemNotifications,
  createSystemNotification,
  markNotificationAsRead,
} from '@/lib/notifications';

export async function GET(req: Request) {
  try {
    const auth = await getAuthFromRequest(req);
    const userId = auth?.userId || null;
    const isAdmin = auth?.role === 'admin';

    const notifications = await getSystemNotifications(userId, isAdmin);
    const unreadCount = notifications.filter((n) => !n.isRead).length;

    return NextResponse.json({
      success: true,
      unreadCount,
      data: notifications,
    });
  } catch (error) {
    console.error('[NOTIFICATIONS_GET_ERROR]', error);
    return NextResponse.json(
      { error: 'Failed to fetch notifications' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const auth = await getAuthFromRequest(req);
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const isAdmin = await requireAdmin(auth);
    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Forbidden: Admin authorization required' },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { title, message, type = 'info', target = 'all', link } = body;

    if (!title || !message) {
      return NextResponse.json(
        { error: 'Title and message are required' },
        { status: 400 }
      );
    }

    const notification = await createSystemNotification({
      title,
      message,
      type,
      target,
      link,
    });

    return NextResponse.json({
      success: true,
      data: notification,
    });
  } catch (error) {
    console.error('[NOTIFICATIONS_POST_ERROR]', error);
    return NextResponse.json(
      { error: 'Failed to create notification' },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const auth = await getAuthFromRequest(req);
    const userId = auth?.userId || null;
    const isAdmin = auth?.role === 'admin';

    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Notification ID is required' },
        { status: 400 }
      );
    }

    await markNotificationAsRead(id, userId, isAdmin);

    return NextResponse.json({
      success: true,
      message: 'Notification marked as read',
    });
  } catch (error) {
    console.error('[NOTIFICATIONS_PATCH_ERROR]', error);
    return NextResponse.json(
      { error: 'Failed to update notification' },
      { status: 500 }
    );
  }
}
