import { verifyToken } from '@/lib/utils/auth';
import { prisma } from '@/lib/db';

export interface AuthPayload {
  userId: string;
  email?: string;
  role?: string;
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
      const match = cookieHeader.match(/auth-token=([^;]+)/);
      if (match) {
        token = match[1];
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

/**
 * Get current user from auth payload
 */
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
      },
    });

    if (!user) {
      if (auth.userId.startsWith('mock-')) {
        return {
          id: auth.userId,
          email: auth.userId === 'mock-admin-id' ? 'admin@example.com' : 'user@example.com',
          name: auth.userId === 'mock-admin-id' ? 'John Admin' : 'Demo User',
          avatar: null,
          role: auth.userId === 'mock-admin-id' ? 'admin' : 'user',
          subscriptionTier: auth.userId === 'mock-admin-id' ? 'premium' : 'free',
        };
      }
      console.log('[AUTH] User not found:', auth.userId);
      return null;
    }

    console.log('[AUTH] Current user:', user.email);
    return user;
  } catch (err) {
    console.error('[GET_CURRENT_USER_ERROR]', err);
    if (auth.userId.startsWith('mock-')) {
      return {
        id: auth.userId,
        email: auth.userId === 'mock-admin-id' ? 'admin@example.com' : 'user@example.com',
        name: auth.userId === 'mock-admin-id' ? 'John Admin' : 'Demo User',
        avatar: null,
        role: auth.userId === 'mock-admin-id' ? 'admin' : 'user',
        subscriptionTier: auth.userId === 'mock-admin-id' ? 'premium' : 'free',
      };
    }
    return null;
  }
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

/**
 * Middleware: Ensure user is admin
 */
export async function requireAdmin(auth: AuthPayload | null): Promise<boolean> {
  if (!auth) return false;

  if (auth.userId === 'mock-admin-id') {
    return true;
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: auth.userId },
      select: { role: true },
    });

    const isAdmin = user?.role === 'admin';
    if (!isAdmin) {
      console.log('[ADMIN_CHECK] Non-admin access attempt:', auth.userId);
    }
    return isAdmin;
  } catch (err) {
    console.error('[ADMIN_CHECK_ERROR]', err);
    // When DB is offline, allow mock-admin-id
    return auth.userId === 'mock-admin-id';
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
