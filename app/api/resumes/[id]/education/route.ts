/**
 * GET /api/resumes/[id]/education - List education
 * POST /api/resumes/[id]/education - Add education
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

    const education = await prisma.education.findMany({
      where: { resumeId: id },
      orderBy: { order: 'asc' },
    });

    return NextResponse.json({
      success: true,
      data: education,
    });
  } catch (error) {
    console.error('[EDUCATION_LIST_ERROR]', error);
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
      institution,
      degree,
      field,
      startDate,
      endDate,
      gpa,
      honors,
      description,
    } = body;

    if (!institution || !degree || !field) {
      return NextResponse.json(
        { error: 'Institution, degree, and field are required' },
        { status: 400 }
      );
    }

    const maxOrder = await prisma.education.findFirst({
      where: { resumeId: id },
      orderBy: { order: 'desc' },
      select: { order: true },
    });

    const education = await prisma.education.create({
      data: {
        resumeId: id,
        institution,
        degree,
        field,
        startDate: startDate || '',
        endDate: endDate || null,
        gpa: gpa || null,
        honors: honors || [],
        description: description || null,
        order: (maxOrder?.order || 0) + 1,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: education,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[EDUCATION_CREATE_ERROR]', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
