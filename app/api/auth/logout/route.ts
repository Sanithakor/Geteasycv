/**
 * POST /api/auth/logout
 * Logout current user — clears the auth cookie and marks user offline immediately.
 */

import { NextResponse } from 'next/server';
import { getAuthFromRequest } from '@/lib/middleware/auth';
import { markUserOffline } from '@/lib/userRegistry';

export async function POST(req: Request) {
  try {
    const auth = await getAuthFromRequest(req);
    if (auth && auth.userId) {
      await markUserOffline(auth.userId);
    }

    const response = NextResponse.json({
      success: true,
      message: 'Logged out successfully',
    });

    // Clear auth cookie immediately
    response.cookies.set('auth-token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0,
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('[LOGOUT_ERROR]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
