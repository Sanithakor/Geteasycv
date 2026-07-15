/**
 * GET /api/resumes/[id]/skills - List skills
 * POST /api/resumes/[id]/skills - Add skill
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

    const skills = await prisma.skill.findMany({
      where: { resumeId: id },
      orderBy: { order: 'asc' },
    });

    return NextResponse.json({
      success: true,
      data: skills,
    });
  } catch (error) {
    console.error('[SKILLS_LIST_ERROR]', error);
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
    const { name, level, category } = body;

    if (!name) {
      return NextResponse.json(
        { error: 'Skill name is required' },
        { status: 400 }
      );
    }

    const maxOrder = await prisma.skill.findFirst({
      where: { resumeId: id },
      orderBy: { order: 'desc' },
      select: { order: true },
    });

    const skill = await prisma.skill.create({
      data: {
        resumeId: id,
        name,
        level: level || 'intermediate',
        category: category || null,
        order: (maxOrder?.order || 0) + 1,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: skill,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[SKILLS_CREATE_ERROR]', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
