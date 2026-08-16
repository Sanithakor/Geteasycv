/**
 * GET /api/users - List all users (with database failure fallback)
 * PATCH /api/users - Update user details/status (with database failure fallback)
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getAuthFromRequest, requireAdmin } from '@/lib/middleware/auth';

// In-memory mock data to store updates when DB is offline
const mockUsersMemory = [
  { id: '1', name: 'John Doe', email: 'john@example.com', subscriptionTier: 'pro', role: 'user', isActive: true, isBanned: false, createdAt: '2024-01-15T00:00:00.000Z', resumes: 5 },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', subscriptionTier: 'free', role: 'user', isActive: true, isBanned: false, createdAt: '2024-02-20T00:00:00.000Z', resumes: 2 },
  { id: '3', name: 'Mike Johnson', email: 'mike@example.com', subscriptionTier: 'pro', role: 'user', isActive: false, isBanned: false, createdAt: '2024-03-10T00:00:00.000Z', resumes: 8 },
  { id: '4', name: 'Sarah Williams', email: 'sarah@example.com', subscriptionTier: 'free', role: 'user', isActive: true, isBanned: false, createdAt: '2024-01-05T00:00:00.000Z', resumes: 1 },
  { id: '5', name: 'Tom Brown', email: 'tom@example.com', subscriptionTier: 'pro', role: 'user', isActive: true, isBanned: false, createdAt: '2024-02-14T00:00:00.000Z', resumes: 12 },
];

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

    try {
      const dbUsers = await prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          subscriptionTier: true,
          role: true,
          isActive: true,
          isBanned: true,
          createdAt: true,
          _count: {
            select: { resumes: true }
          }
        },
        orderBy: { createdAt: 'desc' }
      });

      const formatted = dbUsers.map((u: typeof dbUsers[number]) => ({
        id: u.id,
        name: u.name,
        email: u.email,
        subscriptionTier: u.subscriptionTier,
        role: u.role,
        isActive: u.isActive,
        isBanned: u.isBanned,
        createdAt: u.createdAt.toISOString(),
        resumes: u._count.resumes
      }));

      return NextResponse.json({ success: true, data: formatted });
    } catch (dbError) {
      console.warn('[PRISMA_UNAVAILABLE] Falling back to mock users list:', dbError);
      return NextResponse.json({ success: true, data: mockUsersMemory });
    }
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
      console.warn('[PRISMA_UNAVAILABLE] Falling back to mock users in-memory update:', dbError);

      const uIdx = mockUsersMemory.findIndex(u => u.id === String(userId));
      if (uIdx !== -1) {
        if (isActive !== undefined) mockUsersMemory[uIdx].isActive = isActive;
        if (isBanned !== undefined) mockUsersMemory[uIdx].isBanned = isBanned;
        if (subscriptionTier !== undefined) mockUsersMemory[uIdx].subscriptionTier = subscriptionTier;
        if (role !== undefined) mockUsersMemory[uIdx].role = role;
        
        return NextResponse.json({ success: true, data: mockUsersMemory[uIdx] });
      }

      return NextResponse.json({ error: 'Mock User not found' }, { status: 404 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}
