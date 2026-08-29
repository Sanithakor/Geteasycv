import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getAuthFromRequest, requireAdmin } from '@/lib/middleware/auth';
import { getAllAppUsers, updateUserInRegistry } from '@/lib/userRegistry';

export async function GET(req: Request) {
  try {
    const auth = await getAuthFromRequest(req);
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const isAdmin = await requireAdmin(auth);
    if (!isAdmin) {
      return NextResponse.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
    }

    const appUsers = await getAllAppUsers();
    return NextResponse.json({ success: true, data: appUsers });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const auth = await getAuthFromRequest(req);
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const isAdmin = await requireAdmin(auth);
    if (!isAdmin) {
      return NextResponse.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
    }

    const body = await req.json();
    const { userId, isActive, isBanned, subscriptionTier, role } = body;

    if (!userId) {
      return NextResponse.json({ error: 'Missing userId parameter' }, { status: 400 });
    }

    updateUserInRegistry(userId, {
      ...(isActive !== undefined && { isActive }),
      ...(isBanned !== undefined && { isBanned }),
      ...(subscriptionTier !== undefined && { subscriptionTier }),
      ...(role !== undefined && { role }),
    });

    try {
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          ...(isActive !== undefined && { isActive }),
          ...(isBanned !== undefined && { isBanned }),
          ...(subscriptionTier !== undefined && { subscriptionTier }),
          ...(role !== undefined && { role }),
        },
        select: {
          id: true,
          name: true,
          email: true,
          subscriptionTier: true,
          role: true,
          isActive: true,
          isBanned: true,
          createdAt: true,
        }
      });

      return NextResponse.json({ success: true, data: updatedUser });
    } catch (dbError) {
      console.warn('[PRISMA_UNAVAILABLE] Using userRegistry update response:', dbError);
      return NextResponse.json({ success: true, message: 'User status updated successfully' });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}
