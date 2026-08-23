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
    message: 'user@geteasycv.com joined GetEasyCV',
    type: 'user_signup',
    target: 'all',
    isRead: false,
    createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
  },
  {
    id: 'notif-default-2',
    title: 'Subscription Upgraded',
    message: 'User upgraded to Pro Monthly plan',
    type: 'subscription',
    target: 'all',
    isRead: false,
    createdAt: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
  },
  {
    id: 'notif-default-3',
    title: 'New Resume Created',
    message: 'ATS Modern layout template was generated',
    type: 'resume_created',
    target: 'all',
    isRead: true,
    createdAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'notif-default-4',
    title: 'Payment Successful',
    message: 'Received ₹199 payment for Pro plan',
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
    const dbNotif = await (prisma as any).notification.create({
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
  } catch (err) {
    console.warn('[NOTIFICATION_DB_WARN] Using memory notification fallback:', err);
    memoryNotifications.unshift(newItem);
    return newItem;
  }
}

export async function getSystemNotifications(userId?: string): Promise<NotificationItem[]> {
  try {
    const dbNotifs = await (prisma as any).notification.findMany({
      where: {
        OR: [
          { target: 'all' },
          { userId: userId || undefined },
        ],
      },
      orderBy: { createdAt: 'desc' },
      take: 20,
    });

    if (dbNotifs && dbNotifs.length > 0) {
      return dbNotifs;
    }
  } catch (err) {
    // Fallback to memory notifications
  }

  return memoryNotifications;
}

export async function markNotificationAsRead(id: string) {
  if (id === 'all') {
    memoryNotifications = memoryNotifications.map(n => ({ ...n, isRead: true }));
    try {
      await (prisma as any).notification.updateMany({
        data: { isRead: true },
      });
    } catch {}
    return;
  }

  memoryNotifications = memoryNotifications.map(n => (n.id === id ? { ...n, isRead: true } : n));
  try {
    await (prisma as any).notification.update({
      where: { id },
      data: { isRead: true },
    });
  } catch {}
}
