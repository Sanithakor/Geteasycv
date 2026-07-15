/**
 * GET /api/resumes/[id]/experience - List experience
 * POST /api/resumes/[id]/experience - Add experience
 */

import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { getAuthFromRequest } from '@/lib/middleware/auth';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const auth = await getAuthFromRequest(req);
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify resume ownership
    const resume = await prisma.resume.findFirst({
      where: {
        id,
        userId: auth.userId,
      },
    });

    if (!resume) {
      return NextResponse.json({ error: 'Resume not found' }, { status: 404 });
    }

    const experience = await prisma.experience.findMany({
      where: { resumeId: id },
      orderBy: { order: 'asc' },
    });

    return NextResponse.json({
      success: true,
      data: experience,
    });
  } catch (error) {
    console.error('[EXPERIENCE_LIST_ERROR]', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const auth = await getAuthFromRequest(req);
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify resume ownership
    const resume = await prisma.resume.findFirst({
      where: {
        id,
        userId: auth.userId,
      },
    });

    if (!resume) {
      return NextResponse.json({ error: 'Resume not found' }, { status: 404 });
    }

    const body = await req.json();
    const {
      company,
      position,
      startDate,
      endDate,
      current,
      description,
      achievements,
      location,
    } = body;

    if (!company || !position) {
      return NextResponse.json(
        { error: 'Company and position are required' },
        { status: 400 }
      );
    }

    const maxOrder = await prisma.experience.findFirst({
      where: { resumeId: id },
      orderBy: { order: 'desc' },
      select: { order: true },
    });

    const experience = await prisma.experience.create({
      data: {
        resumeId: id,
        company,
        position,
        startDate: startDate || '',
        endDate: endDate || null,
        current: current || false,
        description: description || null,
        achievements: achievements || [],
        location: location || null,
        order: (maxOrder?.order || 0) + 1,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: experience,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[EXPERIENCE_CREATE_ERROR]', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
