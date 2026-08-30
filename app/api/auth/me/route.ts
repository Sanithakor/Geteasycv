/**
 * GET /api/auth/me
 * Get current authenticated user data
 * Updates user lastSeenAt activity heartbeat
 */

import { getAuthFromRequest, getCurrentUser } from '@/lib/middleware/auth';
import { touchUserActivity } from '@/lib/userRegistry';

export async function GET(req: Request) {
  try {
    const auth = await getAuthFromRequest(req);
    if (!auth) {
      return Response.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Touch user activity timestamp
    touchUserActivity(auth.userId).catch(() => {});

    const user = await getCurrentUser(auth);
    if (!user) {
      return Response.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error('[ME_ERROR]', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
