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
 * Extract auth payload from request headers, cookies, or body fallback
 */
export async function getAuthFromRequest(req: Request, bodyData?: any): Promise<AuthPayload | null> {
  try {
    let token = '';

    // 1. Try Authorization header
    const authHeader = req.headers.get('Authorization') || req.headers.get('authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.replace('Bearer ', '').trim();
    }

    // 2. Try x-auth-token header
    if (!token) {
      token = (req.headers.get('x-auth-token') || req.headers.get('X-Auth-Token') || '').trim();
    }

    // 3. Try Cookie header
    if (!token) {
      const cookieHeader = req.headers.get('cookie') || '';
      const authTokenMatch = cookieHeader.match(/(?:^|;\s*)(?:auth-token|auth_token|token)=([^;]+)/);
      if (authTokenMatch) {
        token = decodeURIComponent(authTokenMatch[1]).trim();
      }
    }

    // 4. Try token from passed bodyData
    if (!token && bodyData && typeof bodyData.token === 'string') {
      token = bodyData.token.trim();
    }

    if (token) {
      const payload = await verifyToken(token);
      if (payload && payload.userId) {
        return payload as AuthPayload;
      }
    }

    // 5. Fallback: Parse body if bodyData not passed and body contains token/userId
    let body = bodyData;
    if (!body) {
      try {
        const clonedReq = req.clone();
        body = await clonedReq.json().catch(() => null);
      } catch {}
    }

    if (body) {
      if (body.token && typeof body.token === 'string') {
        const payload = await verifyToken(body.token);
        if (payload && payload.userId) {
          return payload as AuthPayload;
        }
      }
      if (body.userId && typeof body.userId === 'string' && body.userId.trim() !== '') {
        return { userId: body.userId.trim(), email: body.userEmail || body.email };
      }
    }

    return null;
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
