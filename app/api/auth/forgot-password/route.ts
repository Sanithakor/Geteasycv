/**
 * POST /api/auth/forgot-password
 *
 * Accepts an email address and initiates a password reset flow.
 *
 * Current status: STUB — email sending is not yet implemented.
 * The endpoint always returns 200 to prevent user enumeration
 * (never reveal whether an email is registered or not).
 *
 * TODO: Implement password reset flow:
 *   1. Look up user by email in DB
 *   2. Generate a signed, time-limited reset token (e.g. JWT with 1h exp or DB token)
 *   3. Store the token (hashed) against the user record
 *   4. Send an email with a link to /reset-password?token=<token>
 *   5. Create POST /api/auth/reset-password to validate token and update password
 */

import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // ── Stub: password reset email is not sent yet ────────────────────────
    // Always return 200 regardless of whether the email exists.
    // This prevents attackers from enumerating registered addresses.
    console.log('[FORGOT_PASSWORD] Reset requested for:', email, '(email sending not yet implemented)');

    return NextResponse.json(
      { success: true, message: 'If that email is registered, a reset link has been sent.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('[FORGOT_PASSWORD_ERROR]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
