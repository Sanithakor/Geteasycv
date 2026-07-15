/**
 * POST /api/auth/logout
 * Logout current user
 * Clears auth cookie and token
 */

import { NextResponse } from 'next/server';
import { getAuthFromRequest } from '@/lib/middleware/auth';

export async function POST(req: Request) {
  try {
    console.log('[LOGOUT] Logging out user...');

    // 1. Verify user is authenticated
    const auth = await getAuthFromRequest(req);
    if (!auth) {
      console.log('[LOGOUT] No authenticated user');
      return Response.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    console.log('[LOGOUT] Logging out user:', auth.userId);

    // 2. Create response
    const response = NextResponse.json({
      success: true,
      message: 'Logged out successfully',
    });

    // 3. Clear auth cookie
    response.cookies.set('auth-token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0, // Expires immediately
      path: '/',
    });

    console.log('[LOGOUT] User logged out successfully');
    return response;
  } catch (error) {
    console.error('[LOGOUT_ERROR]', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
