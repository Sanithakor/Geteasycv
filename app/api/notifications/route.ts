/**
 * GET /api/notifications - List real system/user notifications
 * POST /api/notifications - Create a new notification (Admin)
 * PATCH /api/notifications - Mark notification(s) as read
 */

import { NextResponse } from 'next/server';
import { getAuthFromRequest } from '@/lib/middleware/auth';
import {
  getSystemNotifications,
  createSystemNotification,
  markNotificationAsRead,
} from '@/lib/notifications';

export async function GET(req: Request) {
  try {
    const auth = await getAuthFromRequest(req);
    const notifications = await getSystemNotifications(auth?.userId);

    const unreadCount = notifications.filter((n: any) => !n.isRead).length;

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
    // Optional: check admin authorization
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
    const body = await req.json();
    const { id } = body;

    await markNotificationAsRead(id);

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
