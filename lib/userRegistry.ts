/**
 * User Registry Utility
 * Manages permanent user records, activity tracking, online/offline presence,
 * file-backed disk persistence, and admin statistics for the complete platform user registry.
 */

import { prisma } from '@/lib/db';
import fs from 'fs';
import path from 'path';

export interface UserRegistryItem {
  id: string;
  name: string;
  email: string;
  avatar?: string | null;
  googleId?: string | null;
  subscriptionTier: string;
  role: string;
  isActive: boolean;
  isBanned: boolean;
  createdAt: string;
  lastLoginAt?: string | null;
  lastSeenAt?: string | null;
  isOnline: boolean;
  resumes: number;
}

// Initial fallback users array (kept empty to ensure no fake/demo users populate production state)
const INITIAL_DEMO_USERS: Omit<UserRegistryItem, 'isOnline'>[] = [];

const REGISTRY_FILE_PATH = path.join(process.cwd(), 'data', 'user_registry.json');

const globalForUserRegistry = globalThis as unknown as {
  userRegistryMap: Map<string, Omit<UserRegistryItem, 'isOnline'>> | undefined;
};

const userMap = globalForUserRegistry.userRegistryMap ?? new Map<string, Omit<UserRegistryItem, 'isOnline'>>();
if (process.env.NODE_ENV !== 'production') {
  globalForUserRegistry.userRegistryMap = userMap;
}

function loadRegistryFromDisk(): void {
  try {
    if (fs.existsSync(REGISTRY_FILE_PATH)) {
      const content = fs.readFileSync(REGISTRY_FILE_PATH, 'utf-8');
      const items: Omit<UserRegistryItem, 'isOnline'>[] = JSON.parse(content);
      if (Array.isArray(items)) {
        items.forEach((item) => {
          if (item && item.email) {
            userMap.set(item.email.toLowerCase(), item);
          }
        });
      }
    }
  } catch (err) {
    console.warn('[USER_REGISTRY_DISK_READ_WARN]', err);
  }
}

function saveRegistryToDisk(): void {
  try {
    const items = Array.from(userMap.values());
    const dir = path.dirname(REGISTRY_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(REGISTRY_FILE_PATH, JSON.stringify(items, null, 2), 'utf-8');
  } catch (err) {
    console.warn('[USER_REGISTRY_DISK_WRITE_WARN]', err);
  }
}

// Initial registry loading
if (userMap.size === 0) {
  loadRegistryFromDisk();
}

/** Check if user is currently online (active within last 5 minutes and not banned) */
export function isUserOnline(lastSeenAt?: string | null, isBanned?: boolean): boolean {
  if (!lastSeenAt || isBanned) return false;
  const lastSeenMs = new Date(lastSeenAt).getTime();
  if (isNaN(lastSeenMs)) return false;
  return Date.now() - lastSeenMs < 5 * 60 * 1000;
}

/**
 * Register or update a user in the permanent store & disk file
 */
export function registerOrUpdateUserInStore(userData: {
  id: string;
  name: string;
  email: string;
  avatar?: string | null;
  googleId?: string | null;
  role?: string;
  subscriptionTier?: string;
  isActive?: boolean;
  isBanned?: boolean;
  createdAt?: string;
  lastLoginAt?: string | null;
  lastSeenAt?: string | null;
  resumes?: number;
}): UserRegistryItem {
  loadRegistryFromDisk();
  const normalizedEmail = userData.email.trim().toLowerCase();
  const existing = userMap.get(normalizedEmail);
  const now = new Date().toISOString();

  const rawItem: Omit<UserRegistryItem, 'isOnline'> = {
    id: userData.id || existing?.id || `usr_${Date.now()}`,
    name: userData.name || existing?.name || normalizedEmail.split('@')[0],
    email: normalizedEmail,
    avatar: userData.avatar || existing?.avatar || null,
    googleId: userData.googleId || existing?.googleId || null,
    subscriptionTier: (userData.subscriptionTier || existing?.subscriptionTier || 'free').toLowerCase(),
    role: userData.role || existing?.role || 'user',
    isActive: userData.isActive !== undefined ? userData.isActive : (existing?.isActive ?? true),
    isBanned: userData.isBanned !== undefined ? userData.isBanned : (existing?.isBanned ?? false),
    createdAt: userData.createdAt || existing?.createdAt || now,
    lastLoginAt: userData.lastLoginAt || existing?.lastLoginAt || now,
    lastSeenAt: userData.lastSeenAt || now,
    resumes: userData.resumes !== undefined ? userData.resumes : (existing?.resumes ?? 0),
  };

  userMap.set(normalizedEmail, rawItem);
  saveRegistryToDisk();

  return {
    ...rawItem,
    isOnline: isUserOnline(rawItem.lastSeenAt, rawItem.isBanned),
  };
}

/**
 * Touch user activity / heartbeat timestamp
 */
export async function touchUserActivity(userIdOrEmail: string): Promise<void> {
  if (!userIdOrEmail) return;
  loadRegistryFromDisk();
  const now = new Date().toISOString();
  const normalized = userIdOrEmail.trim().toLowerCase();

  const found = Array.from(userMap.values()).find(
    (u) => u.id === userIdOrEmail || u.email.toLowerCase() === normalized
  );

  if (found) {
    found.lastSeenAt = now;
    userMap.set(found.email.toLowerCase(), found);
    saveRegistryToDisk();
  }

  try {
    await prisma.user.updateMany({
      where: {
        OR: [
          { id: userIdOrEmail },
          { email: normalized },
        ],
      },
      data: {
        lastLoginAt: new Date(),
      },
    });
  } catch {}
}

/**
 * Mark user offline (e.g. on explicit logout)
 */
export async function markUserOffline(userIdOrEmail: string): Promise<void> {
  if (!userIdOrEmail) return;
  loadRegistryFromDisk();
  const offlineTime = new Date(Date.now() - 3600 * 1000).toISOString(); // 1 hour ago
  const normalized = userIdOrEmail.trim().toLowerCase();

  const found = Array.from(userMap.values()).find(
    (u) => u.id === userIdOrEmail || u.email.toLowerCase() === normalized
  );

  if (found) {
    found.lastSeenAt = offlineTime;
    userMap.set(found.email.toLowerCase(), found);
    saveRegistryToDisk();
  }
}

/**
 * Get all registered users for Admin User List
 * Merges Prisma database records with disk & memory user registry
 */
export async function getAllAppUsers(): Promise<UserRegistryItem[]> {
  loadRegistryFromDisk();
  const resultList: UserRegistryItem[] = [];
  const seenEmails = new Set<string>();

  try {
    const dbUsers = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        googleId: true,
        subscriptionTier: true,
        role: true,
        isActive: true,
        isBanned: true,
        createdAt: true,
        lastLoginAt: true,
        _count: {
          select: { resumes: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    for (const u of dbUsers) {
      const emailLower = u.email.toLowerCase();
      seenEmails.add(emailLower);

      // Check if memory/disk has a more recent lastSeenAt timestamp
      const memUser = userMap.get(emailLower);
      const lastSeenAt = memUser?.lastSeenAt || u.lastLoginAt?.toISOString() || null;
      const lastLoginAt = u.lastLoginAt ? u.lastLoginAt.toISOString() : memUser?.lastLoginAt || null;

      const item: UserRegistryItem = {
        id: u.id,
        name: u.name || emailLower.split('@')[0],
        email: u.email,
        avatar: u.avatar || null,
        googleId: u.googleId || null,
        subscriptionTier: (u.subscriptionTier || 'free').toLowerCase(),
        role: u.role || 'user',
        isActive: u.isActive !== false,
        isBanned: u.isBanned === true,
        createdAt: u.createdAt.toISOString(),
        lastLoginAt,
        lastSeenAt,
        isOnline: isUserOnline(lastSeenAt, u.isBanned === true),
        resumes: u._count ? u._count.resumes : 0,
      };

      resultList.push(item);
      userMap.set(emailLower, {
        id: item.id,
        name: item.name,
        email: item.email,
        avatar: item.avatar,
        googleId: item.googleId,
        subscriptionTier: item.subscriptionTier,
        role: item.role,
        isActive: item.isActive,
        isBanned: item.isBanned,
        createdAt: item.createdAt,
        lastLoginAt: item.lastLoginAt,
        lastSeenAt: item.lastSeenAt,
        resumes: item.resumes,
      });
    }
  } catch (dbErr) {
    console.warn('[USER_REGISTRY_DB_WARN] Prisma user query fallback:', dbErr);
  }

  // Include disk/memory users that were not in DB results (e.g. fallback sessions / newly registered users)
  Array.from(userMap.values()).forEach((memUser) => {
    if (!seenEmails.has(memUser.email.toLowerCase())) {
      seenEmails.add(memUser.email.toLowerCase());
      resultList.push({
        ...memUser,
        isOnline: isUserOnline(memUser.lastSeenAt, memUser.isBanned),
      });
    }
  });

  // Save current merged state to disk
  saveRegistryToDisk();

  return resultList;
}

/**
 * Update user status/plan/role in the registry, disk file, and database
 */
export async function updateUserInRegistry(
  emailOrId: string,
  updateData: Partial<Omit<UserRegistryItem, 'isOnline'>>
): Promise<UserRegistryItem | null> {
  loadRegistryFromDisk();
  const normalized = emailOrId.trim().toLowerCase();
  const target = Array.from(userMap.values()).find(
    (u) => u.id === emailOrId || u.email.toLowerCase() === normalized
  );

  if (!target) return null;

  const updated: Omit<UserRegistryItem, 'isOnline'> = {
    ...target,
    ...updateData,
  };

  userMap.set(target.email.toLowerCase(), updated);
  saveRegistryToDisk();

  try {
    await prisma.user.updateMany({
      where: {
        OR: [{ id: emailOrId }, { email: normalized }],
      },
      data: {
        ...(updateData.isActive !== undefined && { isActive: updateData.isActive }),
        ...(updateData.isBanned !== undefined && { isBanned: updateData.isBanned }),
        ...(updateData.subscriptionTier !== undefined && { subscriptionTier: updateData.subscriptionTier }),
        ...(updateData.role !== undefined && { role: updateData.role }),
      },
    });
  } catch {}

  return {
    ...updated,
    isOnline: isUserOnline(updated.lastSeenAt, updated.isBanned),
  };
}
