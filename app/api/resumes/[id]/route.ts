/**
 * GET /api/resumes/[id] - Get single resume
 * PUT /api/resumes/[id] - Update resume
 * DELETE /api/resumes/[id] - Delete resume
 */

import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { getAuthFromRequest } from '@/lib/middleware/auth';

async function getResumeOrFail(resumeId: string, userId: string) {
  const resume = await prisma.resume.findFirst({
    where: {
      id: resumeId,
      userId,
    },
    include: {
      personal: true,
      experience: { orderBy: { order: 'asc' } },
      education: { orderBy: { order: 'asc' } },
      skills: { orderBy: { order: 'asc' } },
      projects: { orderBy: { order: 'asc' } },
      certifications: { orderBy: { order: 'asc' } },
      languages: { orderBy: { order: 'asc' } },
      template: true,
    },
  });

  return resume;
}

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

    const resume = await getResumeOrFail(id, auth.userId);

    if (!resume) {
      return NextResponse.json({ error: 'Resume not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: resume,
    });
  } catch (error) {
    console.error('[RESUME_GET_ERROR]', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const auth = await getAuthFromRequest(req);
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const resume = await getResumeOrFail(id, auth.userId);
    if (!resume) {
      return NextResponse.json({ error: 'Resume not found' }, { status: 404 });
    }

    const body = await req.json();
    const { title, status, isPublic, summary } = body;

    const updated = await prisma.resume.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(status && { status }),
        ...(isPublic !== undefined && { isPublic }),
        ...(summary && { summary }),
        updatedAt: new Date(),
      },
      include: {
        personal: true,
        template: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: updated,
    });
  } catch (error) {
    console.error('[RESUME_UPDATE_ERROR]', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const auth = await getAuthFromRequest(req);
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const resume = await getResumeOrFail(id, auth.userId);
    if (!resume) {
      return NextResponse.json({ error: 'Resume not found' }, { status: 404 });
    }

    await prisma.resume.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: 'Resume deleted',
    });
  } catch (error) {
    console.error('[RESUME_DELETE_ERROR]', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
