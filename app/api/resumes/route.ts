/**
 * GET /api/resumes - List user resumes
 * POST /api/resumes - Create new resume
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getAuthFromRequest } from '@/lib/middleware/auth';

export async function GET(req: Request) {
  try {
    const auth = await getAuthFromRequest(req);
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const resumes = await prisma.resume.findMany({
      where: { userId: auth.userId },
      include: {
        personal: true,
        template: {
          select: {
            id: true,
            name: true,
            thumbnail: true,
          },
        },
      },
      orderBy: { updatedAt: 'desc' },
    });

    return NextResponse.json({
      success: true,
      data: resumes,
    });
  } catch (error) {
    console.error('[RESUMES_LIST_ERROR]', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const auth = await getAuthFromRequest(req);
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { title, templateId } = body;

    if (!title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }

    // Verify template exists only when a templateId is supplied.
    // Duplicate actions may omit templateId when the original template
    // was deleted — we allow that instead of returning 404.
    if (templateId) {
      const template = await prisma.template.findUnique({
        where: { id: templateId },
      });

      if (!template) {
        return NextResponse.json(
          { error: 'Template not found' },
          { status: 404 }
        );
      }
    }

    // Create resume
    const resume = await prisma.resume.create({
      data: {
        title,
        slug: `resume-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        userId: auth.userId,
        ...(templateId ? { templateId } : {}),
        status: 'draft',
      },
      include: {
        template: {
          select: {
            id: true,
            name: true,
            thumbnail: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: resume,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[RESUME_CREATE_ERROR]', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
