/**
 * GET & POST /api/auth/github - GitHub authentication (disabled)
 */

import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    configured: false,
    message: 'GitHub authentication is disabled.',
  });
}

export async function POST() {
  return NextResponse.json(
    { error: 'GitHub authentication is disabled.' },
    { status: 400 }
  );
}

