import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getAuthFromRequest } from '@/lib/middleware/auth';
import { comparePassword, hashPassword, validatePassword } from '@/lib/utils/auth';
import { checkRateLimit, createRateLimitResponse } from '@/lib/middleware/rateLimit';

export async function POST(req: Request) {
  // Rate limiting (Max 5 password change attempts per 15 min per IP)
  const rateLimit = checkRateLimit(req, {
    windowMs: 15 * 60 * 1000,
    max: 5,
    keyPrefix: 'user_change_password',
  });

  if (!rateLimit.success) {
    return createRateLimitResponse(
      rateLimit.retryAfter,
      'Too many password change attempts. Please try again later.'
    );
  }

  try {
    const auth = await getAuthFromRequest(req);
    if (!auth?.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { currentPassword, newPassword } = body;

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: 'Current password and new password are required' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: auth.userId },
      select: { id: true, password: true },
    });

    if (!user || !user.password) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Verify current password server-side
    const isCurrentValid = await comparePassword(currentPassword, user.password);
    if (!isCurrentValid) {
      return NextResponse.json(
        { error: 'Current password is incorrect' },
        { status: 400 }
      );
    }

    // Validate new password strength
    const passwordCheck = validatePassword(newPassword);
    if (!passwordCheck.valid) {
      return NextResponse.json(
        { error: 'New password too weak', errors: passwordCheck.errors },
        { status: 400 }
      );
    }

    // Ensure new password is not identical to current
    if (currentPassword === newPassword) {
      return NextResponse.json(
        { error: 'New password must be different from current password' },
        { status: 400 }
      );
    }

    // Hash & update
    const newHashedPassword = await hashPassword(newPassword);
    await prisma.user.update({
      where: { id: auth.userId },
      data: { password: newHashedPassword },
    });

    return NextResponse.json({
      success: true,
      message: 'Password updated successfully.',
    });
  } catch (error) {
    console.error('[CHANGE_PASSWORD_ERROR]', error);
    return NextResponse.json(
      { error: 'Failed to update password. Please try again.' },
      { status: 500 }
    );
  }
}
