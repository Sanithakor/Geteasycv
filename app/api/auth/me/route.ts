/**
 * GET /api/auth/me
 * Get current authenticated user data
 * Requires Authorization header with Bearer token
 */

import { getAuthFromRequest, getCurrentUser } from '@/lib/middleware/auth';

export async function GET(req: Request) {
  try {
    console.log('[ME] Getting current user...');

    // 1. Get auth from request
    const auth = await getAuthFromRequest(req);
    if (!auth) {
      console.log('[ME] Unauthorized - no valid token');
      return Response.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // 2. Get current user from database
    const user = await getCurrentUser(auth);
    if (!user) {
      console.log('[ME] User not found');
      return Response.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    console.log('[ME] Returning user data:', user.email);
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
