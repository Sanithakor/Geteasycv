import { verifyToken } from '@/lib/utils/auth';
import { prisma } from '@/lib/db';
import { getAllAppUsers } from '@/lib/userRegistry';

export interface AuthPayload {
  userId: string;
  email?: string;
  role?: string;
  subscriptionTier?: string;
  tier?: string;
}

/**
 * Extract auth payload from request headers
 * Expects: Authorization: Bearer <token>
 */
export async function getAuthFromRequest(req: Request): Promise<AuthPayload | null> {
  try {
    let token = '';

    // 1. Try Authorization header
    const authHeader = req.headers.get('Authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.replace('Bearer ', '');
    }

    // 2. Try Cookie header
    if (!token) {
      const cookieHeader = req.headers.get('cookie') || '';
      const authTokenMatch = cookieHeader.match(/auth-token=([^;]+)/);
      if (authTokenMatch) {
        token = authTokenMatch[1];
      }
    }

    if (!token) {
      return null;
    }

    const payload = await verifyToken(token);
    if (!payload) {
      return null;
    }

    return payload;
  } catch (err) {
    console.error('[AUTH_ERROR]', err);
    return null;
  }
}

export async function getCurrentUser(auth: AuthPayload | null) {
  if (!auth) return null;

  try {
    const user = await prisma.user.findUnique({
      where: { id: auth.userId },
      select: {
        id: true,
        email: true,
        name: true,
        avatar: true,
        role: true,
        subscriptionTier: true,
        profile: {
          select: {
            bio: true,
            company: true,
            website: true,
            location: true,
            timezone: true,
            language: true,
          },
        },
      },
    });

    if (user) return user;
  } catch (err) {
    console.warn('[GET_CURRENT_USER_DB_WARN] Prisma user lookup fallback:', err);
  }

  // Fallback to userRegistry or auth payload if DB record not found or DB offline
  try {
    const allUsers = await getAllAppUsers();
    const regUser = allUsers.find(u => u.id === auth.userId || u.email.toLowerCase() === auth.email?.toLowerCase());

    if (regUser) {
      return {
        id: regUser.id,
        email: regUser.email,
        name: regUser.name,
        avatar: regUser.avatar || null,
        role: regUser.role || 'user',
        subscriptionTier: regUser.subscriptionTier || 'free',
      };
    }
  } catch {}

  if (auth.userId && auth.email) {
    return {
      id: auth.userId,
      email: auth.email,
      name: auth.email.split('@')[0],
      avatar: null,
      role: auth.role || 'user',
      subscriptionTier: 'free',
    };
  }

  return null;
}

/**
 * Middleware: Protect API route
 * Returns auth payload or null if unauthorized
 */
export async function protectRoute(req: Request) {
  const auth = await getAuthFromRequest(req);

  if (!auth) {
    console.log('[PROTECT_ROUTE] Unauthorized access attempt');
    return null;
  }

  return auth;
}

export async function requireAdmin(auth: AuthPayload | null): Promise<boolean> {
  if (!auth) return false;

  try {
    const user = await prisma.user.findUnique({
      where: { id: auth.userId },
      select: { role: true },
    });

    const isAdmin = user ? user.role === 'admin' : auth.role === 'admin';
    if (!isAdmin) {
      console.log('[ADMIN_CHECK] Non-admin access attempt:', auth.userId);
    }
    return isAdmin;
  } catch (err) {
    console.warn('[ADMIN_CHECK_DB_FALLBACK] Database query failed, using token role:', err);
    return auth.role === 'admin';
  }
}

/**
 * Create 401 Unauthorized response
 */
export function unauthorizedResponse(message: string = 'Unauthorized access') {
  return Response.json({ error: message }, { status: 401 });
}

/**
 * Create 403 Forbidden response
 */
export function forbiddenResponse(message: string = 'Forbidden: Admin privileges required') {
  return Response.json({ error: message }, { status: 403 });
}

/**
 * Create error response
 */
export function errorResponse(message: string, status: number = 400) {
  return Response.json({ error: message }, { status });
}

/**
 * Create success response
 */
export function successResponse(data: any, status: number = 200) {
  return Response.json({ success: true, data }, { status });
}
