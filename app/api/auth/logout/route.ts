/**
 * POST /api/auth/logout
 * Logout current user — clears the auth cookie.
 * Does NOT require authentication so it always works even with an expired token.
 */

import { NextResponse } from 'next/server';

export async function POST(_req: Request) {
  try {
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
