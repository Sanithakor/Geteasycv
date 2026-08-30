/**
 * POST /api/users/heartbeat
 * Updates current authenticated user's lastSeenAt activity timestamp
 */

import { NextResponse } from 'next/server';
import { getAuthFromRequest } from '@/lib/middleware/auth';
import { touchUserActivity } from '@/lib/userRegistry';

export async function POST(req: Request) {
  try {
    const auth = await getAuthFromRequest(req);
    if (!auth || !auth.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await touchUserActivity(auth.userId);

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update user activity heartbeat' },
      { status: 500 }
    );
  }
}
