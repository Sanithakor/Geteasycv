/**
 * User Registry Utility
 * Manages user lookup, creation, profile updates, and admin user list synchronization
 * ensuring Google OAuth users and regular users are consistently tracked across DB and in-memory stores.
 */

import { prisma } from '@/lib/db';

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
  resumes: number;
}

// Default initial users for fallback / admin presentation
const INITIAL_DEMO_USERS: UserRegistryItem[] = [
  { id: 'usr_demo_1', name: 'John Doe', email: 'john@example.com', subscriptionTier: 'pro', role: 'user', isActive: true, isBanned: false, createdAt: '2024-01-15T00:00:00.000Z', resumes: 5 },
  { id: 'usr_demo_2', name: 'Jane Smith', email: 'jane@example.com', subscriptionTier: 'free', role: 'user', isActive: true, isBanned: false, createdAt: '2024-02-20T00:00:00.000Z', resumes: 2 },
  { id: 'usr_demo_3', name: 'Mike Johnson', email: 'mike@example.com', subscriptionTier: 'pro', role: 'user', isActive: false, isBanned: false, createdAt: '2024-03-10T00:00:00.000Z', resumes: 8 },
  { id: 'usr_demo_4', name: 'Sarah Williams', email: 'sarah@example.com', subscriptionTier: 'free', role: 'user', isActive: true, isBanned: false, createdAt: '2024-01-05T00:00:00.000Z', resumes: 1 },
  { id: 'usr_demo_5', name: 'Tom Brown', email: 'tom@example.com', subscriptionTier: 'pro', role: 'user', isActive: true, isBanned: false, createdAt: '2024-02-14T00:00:00.000Z', resumes: 12 },
];

// Global in-memory user registry map across hot-reloads
const globalForUserRegistry = globalThis as unknown as {
  userRegistryMap: Map<string, UserRegistryItem> | undefined;
};

const userMap = globalForUserRegistry.userRegistryMap ?? new Map<string, UserRegistryItem>();
if (process.env.NODE_ENV !== 'production') {
  globalForUserRegistry.userRegistryMap = userMap;
}

// Seed default demo users if map is empty
if (userMap.size === 0) {
  INITIAL_DEMO_USERS.forEach((u) => userMap.set(u.email.toLowerCase(), u));
}

/**
 * Register or update a user in the global registry store
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
  resumes?: number;
}): UserRegistryItem {
  const normalizedEmail = userData.email.trim().toLowerCase();
  const existing = userMap.get(normalizedEmail);

  const updatedItem: UserRegistryItem = {
    id: userData.id || existing?.id || `usr_${Date.now()}`,
    name: userData.name || existing?.name || normalizedEmail.split('@')[0],
    email: normalizedEmail,
    avatar: userData.avatar || existing?.avatar || null,
    googleId: userData.googleId || existing?.googleId || null,
    subscriptionTier: (userData.subscriptionTier || existing?.subscriptionTier || 'free').toLowerCase(),
    role: userData.role || existing?.role || 'user',
    isActive: userData.isActive !== undefined ? userData.isActive : (existing?.isActive ?? true),
    isBanned: userData.isBanned !== undefined ? userData.isBanned : (existing?.isBanned ?? false),
    createdAt: userData.createdAt || existing?.createdAt || new Date().toISOString(),
    lastLoginAt: new Date().toISOString(),
    resumes: userData.resumes !== undefined ? userData.resumes : (existing?.resumes ?? 0),
  };

  userMap.set(normalizedEmail, updatedItem);
  return updatedItem;
}

/**
 * Get all registered users for Admin User List
 * Merges Prisma database records with in-memory synced user records
 */
export async function getAllAppUsers(): Promise<UserRegistryItem[]> {
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
        lastLoginAt: u.lastLoginAt ? u.lastLoginAt.toISOString() : null,
        resumes: u._count ? u._count.resumes : 0,
      };
      resultList.push(item);
      // Keep memory map in sync
      userMap.set(emailLower, item);
    }
  } catch (dbErr) {
    console.warn('[USER_REGISTRY_DB_WARN] Prisma user query fallback:', dbErr);
  }

  // Include in-memory users that were not in DB results (e.g. fallback sessions / newly logged in Google users)
  Array.from(userMap.values()).forEach((memUser) => {
    if (!seenEmails.has(memUser.email.toLowerCase())) {
      seenEmails.add(memUser.email.toLowerCase());
      resultList.push(memUser);
    }
  });

  return resultList;
}

/**
 * Update user status/plan in the registry
 */
export function updateUserInRegistry(emailOrId: string, updateData: Partial<UserRegistryItem>): UserRegistryItem | null {
  const target = Array.from(userMap.values()).find(
    (u) => u.id === emailOrId || u.email.toLowerCase() === emailOrId.toLowerCase()
  );

  if (!target) return null;

  const updated: UserRegistryItem = {
    ...target,
    ...updateData,
  };

  userMap.set(target.email.toLowerCase(), updated);
  return updated;
}
