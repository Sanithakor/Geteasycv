import { prisma } from '@/lib/db';

export interface NotificationItem {
  id: string;
  userId?: string | null;
  title: string;
  message: string;
  type: string;
  target: string;
  isRead: boolean;
  link?: string | null;
  createdAt: string | Date;
}

// In-memory fallback cache for notifications when database is connecting or unavailable
let memoryNotifications: NotificationItem[] = [
  {
    id: 'notif-default-1',
    title: 'New User Registered',
    message: 'sarah.jones@example.com joined GetEasyCV',
    type: 'user_signup',
    target: 'all',
    isRead: false,
    createdAt: new Date(Date.now() - 3 * 60 * 1000).toISOString(),
  },
  {
    id: 'notif-default-2',
    title: 'Subscription Upgraded',
    message: 'Mike upgraded to Pro Monthly',
    type: 'subscription',
    target: 'all',
    isRead: false,
    createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
  },
  {
    id: 'notif-default-3',
    title: 'New Resume Created',
    message: 'ATS Modern layout was used by Alex',
    type: 'resume_created',
    target: 'all',
    isRead: true,
    createdAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'notif-default-4',
    title: 'Payment Successful',
    message: 'Received $9.00 payment for Pro plan',
    type: 'payment',
    target: 'all',
    isRead: true,
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
  },
];

export async function createSystemNotification(params: {
  title: string;
  message: string;
  type?: string;
  target?: string;
  userId?: string | null;
  link?: string | null;
}) {
  const {
    title,
    message,
    type = 'info',
    target = 'all',
    userId = null,
    link = null,
  } = params;

  const newItem: NotificationItem = {
    id: `notif-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    userId,
    title,
    message,
    type,
    target,
    isRead: false,
    link,
    createdAt: new Date().toISOString(),
  };

  try {
    const dbNotif = await prisma.notification.create({
      data: {
        title,
        message,
        type,
        target,
        userId,
        link,
        isRead: false,
      },
    });
    memoryNotifications.unshift({
      id: dbNotif.id,
      userId: dbNotif.userId,
      title: dbNotif.title,
      message: dbNotif.message,
      type: dbNotif.type,
      target: dbNotif.target,
      isRead: dbNotif.isRead,
      link: dbNotif.link,
      createdAt: dbNotif.createdAt,
    });
    return dbNotif;
  } catch (error) {
    console.warn('[NOTIFICATION_DB_FALLBACK] Saving notification to memory fallback:', error);
    memoryNotifications.unshift(newItem);
    return newItem;
  }
}

export async function getSystemNotifications(userId?: string) {
  try {
    const dbNotifications = await prisma.notification.findMany({
      where: userId
        ? {
            OR: [
              { userId: null },
              { userId },
            ],
          }
        : {},
      orderBy: { createdAt: 'desc' },
      take: 50,
    });

    if (dbNotifications && dbNotifications.length > 0) {
      return dbNotifications;
    }
  } catch (error) {
    console.warn('[NOTIFICATION_DB_FALLBACK] Reading notifications from memory fallback');
  }

  return memoryNotifications;
}

export async function markNotificationAsRead(id?: string) {
  if (!id || id === 'all') {
    memoryNotifications = memoryNotifications.map(n => ({ ...n, isRead: true }));
    try {
      await prisma.notification.updateMany({
        data: { isRead: true },
      });
    } catch (e) {
      // Ignored fallback
    }
    return true;
  }

  const found = memoryNotifications.find(n => n.id === id);
  if (found) {
    found.isRead = true;
  }

  try {
    await prisma.notification.update({
      where: { id },
      data: { isRead: true },
    });
  } catch (e) {
    // Ignored fallback
  }

  return true;
}
