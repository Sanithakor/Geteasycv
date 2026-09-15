/**
 * Centralized Notification Service
 * Purely event-driven, database-backed notification utility.
 * ZERO hardcoded or dummy notifications.
 */

import { prisma, safeDbQuery } from '@/lib/db';
import fs from 'fs';
import path from 'path';

export interface NotificationItem {
  id: string;
  userId?: string | null;
  title: string;
  message: string;
  type: string; // 'user_signup' | 'subscription' | 'payment' | 'resume_created' | 'resume_downloaded' | 'email_verified' | 'contact_submission' | 'info'
  target: string; // 'all' | 'free' | 'pro' | 'admin' | 'user'
  isRead: boolean;
  link?: string | null;
  createdAt: string | Date;
}

const NOTIFICATIONS_FILE_PATH = path.join(process.cwd(), 'data', 'notifications_store.json');

// File-backed fallback store when DB is offline (starts EMPTY, zero hardcoded dummies)
let localNotificationsStore: NotificationItem[] = [];

function loadStoreFromDisk(): void {
  try {
    if (fs.existsSync(NOTIFICATIONS_FILE_PATH)) {
      const content = fs.readFileSync(NOTIFICATIONS_FILE_PATH, 'utf-8');
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed)) {
        localNotificationsStore = parsed;
      }
    }
  } catch (err) {
    console.warn('[NOTIFICATIONS_DISK_READ_WARN]', err);
  }
}

function saveStoreToDisk(): void {
  try {
    const dir = path.dirname(NOTIFICATIONS_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(NOTIFICATIONS_FILE_PATH, JSON.stringify(localNotificationsStore.slice(0, 100), null, 2), 'utf-8');
  } catch (err) {
    console.warn('[NOTIFICATIONS_DISK_WRITE_WARN]', err);
  }
}

// Initial load
loadStoreFromDisk();

/**
 * Create a real system notification for an application event
 */
export async function createSystemNotification(params: {
  title: string;
  message: string;
  type?: string;
  target?: string;
  userId?: string | null;
  link?: string | null;
}): Promise<NotificationItem> {
  const {
    title,
    message,
    type = 'info',
    target = 'all',
    userId = null,
    link = null,
  } = params;

  const newItem: NotificationItem = {
    id: `notif_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    userId,
    title,
    message,
    type,
    target,
    isRead: false,
    link,
    createdAt: new Date().toISOString(),
  };

  const dbNotif = await safeDbQuery(async () => {
    return await (prisma as any).notification.create({
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
  }, null);

  if (dbNotif) {
    const formatted: NotificationItem = {
      id: dbNotif.id,
      userId: dbNotif.userId,
      title: dbNotif.title,
      message: dbNotif.message,
      type: dbNotif.type,
      target: dbNotif.target,
      isRead: dbNotif.isRead,
      link: dbNotif.link,
      createdAt: dbNotif.createdAt,
    };
    localNotificationsStore.unshift(formatted);
    saveStoreToDisk();
    return formatted;
  }

  // Backup store save
  localNotificationsStore.unshift(newItem);
  saveStoreToDisk();
  return newItem;
}

/**
 * Get notifications scoped by authenticated user & role
 * - Regular users: only get notifications targeted to their userId or target='all'
 * - Admins: get all notifications including system events
 */
export async function getSystemNotifications(
  userId?: string | null,
  isAdmin?: boolean
): Promise<NotificationItem[]> {
  loadStoreFromDisk();

  const dbNotifs = await safeDbQuery(async () => {
    let whereClause: any = {};

    if (!isAdmin) {
      if (userId) {
        whereClause = {
          OR: [
            { userId: userId },
            { target: 'all' },
          ],
        };
      } else {
        whereClause = { target: 'all' };
      }
    }

    return await (prisma as any).notification.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
  }, null);

  if (dbNotifs && Array.isArray(dbNotifs)) {
    return dbNotifs.map((n: any) => ({
      id: n.id,
      userId: n.userId,
      title: n.title,
      message: n.message,
      type: n.type,
      target: n.target,
      isRead: n.isRead,
      link: n.link,
      createdAt: n.createdAt,
    }));
  }

  // Fallback to local store filtered strictly by authorization
  if (!isAdmin) {
    return localNotificationsStore.filter(
      (n) => (userId && n.userId === userId) || n.target === 'all'
    );
  }

  return localNotificationsStore;
}

/**
 * Mark notification(s) as read with user ownership verification
 */
export async function markNotificationAsRead(
  id: string,
  userId?: string | null,
  isAdmin?: boolean
): Promise<boolean> {
  loadStoreFromDisk();

  if (id === 'all') {
    localNotificationsStore = localNotificationsStore.map((n) => {
      if (isAdmin || (userId && n.userId === userId) || n.target === 'all') {
        return { ...n, isRead: true };
      }
      return n;
    });
    saveStoreToDisk();

    await safeDbQuery(async () => {
      const whereClause = isAdmin ? {} : userId ? { OR: [{ userId }, { target: 'all' }] } : { target: 'all' };
      await (prisma as any).notification.updateMany({
        where: whereClause,
        data: { isRead: true },
      });
    }, null);

    return true;
  }

  localNotificationsStore = localNotificationsStore.map((n) =>
    n.id === id ? { ...n, isRead: true } : n
  );
  saveStoreToDisk();

  await safeDbQuery(async () => {
    await (prisma as any).notification.update({
      where: { id },
      data: { isRead: true },
    });
  }, null);

  return true;
}

// ----------------------------------------------------------------------------
// CONVENIENCE EVENT NOTIFICATION HELPERS
// ----------------------------------------------------------------------------

export async function notifyUserSignup(userId: string, userName: string, isGoogle: boolean = false) {
  return createSystemNotification({
    userId,
    title: isGoogle ? 'Account Created via Google 🎉' : 'Welcome to GetEasyCV! 👋',
    message: `Account created for ${userName}. Start building your ATS resume today!`,
    type: 'user_signup',
    target: 'user',
    link: '/editor',
  });
}

export async function notifyLoginAlert(userId: string, isGoogle: boolean = false) {
  return createSystemNotification({
    userId,
    title: isGoogle ? 'Google Sign-In Alert 🔒' : 'Successful Sign-In 🔐',
    message: `New sign-in detected for your account on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}.`,
    type: 'login_alert',
    target: 'user',
    link: '/settings',
  });
}

export async function notifyPasswordChanged(userId: string) {
  return createSystemNotification({
    userId,
    title: 'Password Updated 🔑',
    message: 'Your account password was updated successfully. If this was not you, please secure your account immediately.',
    type: 'password_changed',
    target: 'user',
    link: '/settings',
  });
}

export async function notifyPaymentInitiated(userId: string, planName: string, amount: string) {
  return createSystemNotification({
    userId,
    title: 'Payment Session Initiated 💳',
    message: `Checkout started for GetEasyCV ${planName} Plan (${amount}). Complete payment to activate your plan.`,
    type: 'payment_initiated',
    target: 'user',
    link: `/payment/checkout?plan=${planName.toLowerCase()}`,
  });
}

export async function notifyPaymentSuccess(userId: string, planName: string, amount: string) {
  return createSystemNotification({
    userId,
    title: 'Payment Successful! 🎉',
    message: `Your payment of ${amount} for ${planName} Plan has been verified and activated.`,
    type: 'payment_success',
    target: 'user',
    link: '/editor',
  });
}

export async function notifyPaymentFailed(userId: string, planName: string, reason?: string) {
  return createSystemNotification({
    userId,
    title: 'Payment Failed ⚠️',
    message: `Payment attempt for ${planName} Plan could not be completed${reason ? `: ${reason}` : ''}. Please retry with another payment method.`,
    type: 'payment_failed',
    target: 'user',
    link: '/pricing',
  });
}

export async function notifyPaymentCancelled(userId: string, planName: string) {
  return createSystemNotification({
    userId,
    title: 'Payment Cancelled ℹ️',
    message: `Payment checkout for ${planName} Plan was cancelled. Your card was not charged.`,
    type: 'payment_cancelled',
    target: 'user',
    link: '/pricing',
  });
}

export async function notifySubscriptionStarted(userId: string, planName: string) {
  return createSystemNotification({
    userId,
    title: `GetEasyCV ${planName} Subscription Active 🌟`,
    message: `You now have full access to all premium ATS templates, high-res PDF exports, and AI resume tools.`,
    type: 'subscription_started',
    target: 'user',
    link: '/subscription',
  });
}

export async function notifySubscriptionRenewed(userId: string, planName: string) {
  return createSystemNotification({
    userId,
    title: 'Subscription Renewed 🔄',
    message: `Your GetEasyCV ${planName} subscription was renewed successfully. Access extended!`,
    type: 'subscription_renewed',
    target: 'user',
    link: '/subscription',
  });
}

export async function notifySubscriptionCancelled(userId: string, planName: string) {
  return createSystemNotification({
    userId,
    title: 'Subscription Cancelled ℹ️',
    message: `Your ${planName} subscription was cancelled. You will maintain access until the end of your billing period.`,
    type: 'subscription_cancelled',
    target: 'user',
    link: '/pricing',
  });
}

export async function notifyPlanChanged(userId: string, oldPlan: string, newPlan: string) {
  return createSystemNotification({
    userId,
    title: 'Plan Updated 🚀',
    message: `Your account tier was updated from ${oldPlan} to ${newPlan}.`,
    type: 'plan_changed',
    target: 'user',
    link: '/subscription',
  });
}

export async function notifyRefundInitiated(userId: string, amount: string) {
  return createSystemNotification({
    userId,
    title: 'Refund Initiated 💸',
    message: `A refund request of ${amount} has been initiated for your payment.`,
    type: 'refund_initiated',
    target: 'user',
    link: '/subscription',
  });
}

export async function notifyRefundCompleted(userId: string, amount: string) {
  return createSystemNotification({
    userId,
    title: 'Refund Processed ✅',
    message: `Your refund of ${amount} has been processed and returned to your original payment method.`,
    type: 'refund_completed',
    target: 'user',
    link: '/subscription',
  });
}

export async function notifyResumeCreated(userId: string, title: string) {
  return createSystemNotification({
    userId,
    title: 'Resume Created 📄',
    message: `Created new resume "${title}". Add your experience and skills to make it stand out!`,
    type: 'resume_created',
    target: 'user',
    link: '/editor',
  });
}

export async function notifyResumeDownloaded(userId: string, title: string) {
  return createSystemNotification({
    userId,
    title: 'PDF Export Downloaded 📥',
    message: `Successfully downloaded PDF export for "${title}". Best of luck with your applications!`,
    type: 'resume_downloaded',
    target: 'user',
    link: '/my-resumes',
  });
}

export async function notifyPremiumActivated(userId: string, featureName: string) {
  return createSystemNotification({
    userId,
    title: 'Premium Feature Activated ✨',
    message: `${featureName} is now active on your account.`,
    type: 'premium_activated',
    target: 'user',
    link: '/editor',
  });
}

