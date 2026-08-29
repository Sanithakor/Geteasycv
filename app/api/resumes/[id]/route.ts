import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { getAuthFromRequest } from '@/lib/middleware/auth';
import { getStoreResumeById, updateStoreResume, deleteStoreResume } from '@/lib/resumeStore';

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
  const { id } = await params;
  try {
    const auth = await getAuthFromRequest(req);
    const userId = auth?.userId || 'guest';

    let resume: any = null;
    try {
      if (auth) {
        resume = await getResumeOrFail(id, auth.userId);
      }
    } catch (dbError) {
      console.warn('[PRISMA_UNAVAILABLE] Falling back to store resume retrieval:', dbError);
    }

    if (!resume) {
      resume = getStoreResumeById(id, auth?.userId);
    }

    // Security Check: If resume does not exist return 404, if forbidden return 403
    if (!resume) {
      return NextResponse.json({ error: 'Resume not found' }, { status: 404 });
    }

    if (resume.userId && (!auth || (resume.userId !== auth.userId && auth.role !== 'admin')) && !resume.isPublic) {
      return NextResponse.json(
        { error: 'Forbidden: Access denied to this resume' },
        { status: 403 }
      );
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
  const { id } = await params;
  try {
    const auth = await getAuthFromRequest(req);
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized. Please sign in.' }, { status: 401 });
    }

    const body = await req.json();
    const { title, status, isPublic, summary, templateId, cvData, customTheme, selectedLayout, sectionVariants, sectionOrder } = body;

    let updatedResume: any = null;

    try {
      const existing = await getResumeOrFail(id, auth.userId);
      if (existing) {
        updatedResume = await prisma.resume.update({
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
      }
    } catch (dbError) {
      console.warn('[PRISMA_UNAVAILABLE] Falling back to store update:', dbError);
    }

    // Update in-memory fallback store with ownership check
    const storeItem = updateStoreResume(id, auth.userId, {
      title,
      status,
      isPublic,
      summary,
      templateId,
      cvData,
      customTheme,
      selectedLayout,
      sectionVariants,
      sectionOrder,
      personal: cvData?.personal,
    });

    if (!updatedResume && !storeItem) {
      return NextResponse.json({ error: 'Resume not found or access denied' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: updatedResume || storeItem,
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
  const { id } = await params;
  try {
    const auth = await getAuthFromRequest(req);
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized. Please sign in.' }, { status: 401 });
    }

    try {
      await prisma.resume.deleteMany({
        where: { id, userId: auth.userId },
      });
    } catch (dbError) {
      console.warn('[PRISMA_UNAVAILABLE] Falling back to store deletion:', dbError);
    }

    deleteStoreResume(id, auth.userId);

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

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  return PUT(req, context);
}
