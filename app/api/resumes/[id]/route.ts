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
      resume = getStoreResumeById(id);
    }

    if (!resume) {
      // Fallback default mock item
      resume = {
        id,
        userId,
        title: id === 'mock-resume-2' ? 'UX/UI Designer Portfolio CV' : 'Senior Software Engineer Resume',
        status: id === 'mock-resume-2' ? 'draft' : 'published',
        downloads: 14,
        views: 45,
        updatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        templateId: id === 'mock-resume-2' ? 'creative-designer-creative-orange' : 'sidebar-left-modern-blue',
        personal: {
          firstName: id === 'mock-resume-2' ? 'Emily' : 'John',
          lastName: id === 'mock-resume-2' ? 'Clark' : 'Doe',
          title: id === 'mock-resume-2' ? 'UX/UI Designer' : 'Senior Software Engineer',
          email: id === 'mock-resume-2' ? 'emily.clark@example.com' : 'john.doe@example.com',
          phone: '+1 555 123 4567',
          location: 'San Francisco, CA',
        },
        summary: 'Senior full-stack engineer with 8+ years of experience...',
      };
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
    const userId = auth?.userId || 'guest';

    const body = await req.json();
    const { title, status, isPublic, summary, templateId, cvData, customTheme, selectedLayout, sectionVariants, sectionOrder } = body;

    let updatedResume: any = null;

    try {
      if (auth) {
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
      }
    } catch (dbError) {
      console.warn('[PRISMA_UNAVAILABLE] Falling back to store update:', dbError);
    }

    // Update in-memory fallback store
    const storeItem = updateStoreResume(id, userId, {
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
    const userId = auth?.userId || 'guest';

    try {
      if (auth) {
        await prisma.resume.delete({
          where: { id },
        });
      }
    } catch (dbError) {
      console.warn('[PRISMA_UNAVAILABLE] Falling back to store deletion:', dbError);
    }

    deleteStoreResume(id);

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

