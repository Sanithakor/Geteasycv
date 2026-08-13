import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getAuthFromRequest } from '@/lib/middleware/auth';
import { createSystemNotification } from '@/lib/notifications';
import { getStoreResumes, saveStoreResume, ResumeStoreItem } from '@/lib/resumeStore';

async function ensureTemplateExists(templateId: string, userId: string): Promise<string | undefined> {
  if (!templateId) return undefined;
  try {
    const existing = await prisma.template.findUnique({
      where: { id: templateId },
    });
    if (existing) return existing.id;

    // Check by slug
    const bySlug = await prisma.template.findUnique({
      where: { slug: templateId },
    });
    if (bySlug) return bySlug.id;

    // Check if any theme exists
    let theme = await prisma.themeConfig.findFirst();
    if (!theme) {
      theme = await prisma.themeConfig.create({
        data: {
          name: 'Default Theme',
          slug: `theme-${Date.now()}`,
          primary: '#4F46E5',
          secondary: '#64748B',
          accent: '#10B981',
          background: '#FFFFFF',
          text: '#0F172A',
          textMuted: '#64748B',
          border: '#E2E8F0',
          fontFamily: 'Inter',
          fontSizeBase: 16,
          lineHeight: 1.5,
          borderRadius: '12px',
        },
      });
    }

    // Create template row dynamically
    const created = await prisma.template.create({
      data: {
        id: templateId,
        slug: `${templateId}-${Date.now()}`,
        name: templateId.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
        category: 'professional',
        layout: 'standard',
        blocks: {},
        thumbnail: '/templates/default.png',
        createdById: userId,
        themeId: theme.id,
        isATS: true,
        status: 'active',
      },
    });
    return created.id;
  } catch (err) {
    console.warn('[ENSURE_TEMPLATE_WARN] Foreign key placeholder fallback:', err);
    try {
      const anyTmpl = await prisma.template.findFirst();
      return anyTmpl?.id;
    } catch {
      return undefined;
    }
  }
}

export async function GET(req: Request) {
  try {
    const auth = await getAuthFromRequest(req);
    const userId = auth?.userId || 'guest';

    let dbResumes: any[] = [];
    try {
      if (auth) {
        dbResumes = await prisma.resume.findMany({
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
      }
    } catch (dbError) {
      console.warn('[PRISMA_UNAVAILABLE] Falling back to store resumes:', dbError);
    }

    const storeResumes = getStoreResumes(userId);
    
    // Merge DB resumes with in-memory store resumes (avoiding duplicates)
    const combined = [...dbResumes];
    for (const storeItem of storeResumes) {
      if (!combined.some((r) => r.id === storeItem.id)) {
        combined.push(storeItem);
      }
    }

    return NextResponse.json({
      success: true,
      data: combined,
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
    const userId = auth?.userId || 'guest';

    const body = await req.json();
    const { title, templateId, summary, cvData, customTheme, selectedLayout, sectionVariants, sectionOrder } = body;

    const requestedTitle = title || `${(cvData?.personal?.firstName || 'New')} Resume`.trim();
    const targetTemplateId = templateId || 'sidebar-left-modern-blue';
    const resumeId = `resume-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;

    let createdResume: any = null;

    try {
      if (auth) {
        const validTemplateId = await ensureTemplateExists(targetTemplateId, auth.userId);
        
        if (validTemplateId) {
          const resume = await prisma.resume.create({
            data: {
              title: requestedTitle,
              slug: `resume-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
              userId: auth.userId,
              templateId: validTemplateId,
              status: 'draft',
              summary: summary || cvData?.summary || '',
              ...(cvData?.personal && {
                personal: {
                  create: {
                    firstName: cvData.personal.firstName || '',
                    lastName: cvData.personal.lastName || '',
                    email: cvData.personal.email || '',
                    phone: cvData.personal.phone || '',
                    location: cvData.personal.location || '',
                    website: cvData.personal.website || '',
                    linkedin: cvData.personal.linkedin || '',
                  },
                },
              }),
            },
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
          });

          createdResume = {
            ...resume,
            templateId: targetTemplateId, // Preserve exact dynamic templateId
          };

          createSystemNotification({
            title: 'New Resume Created',
            message: `"${resume.title}" was created`,
            type: 'resume_created',
            target: 'all',
            userId: auth.userId,
          }).catch(() => {});
        }
      }
    } catch (dbError) {
      console.warn('[PRISMA_UNAVAILABLE] Falling back to in-memory resume store:', dbError);
    }

    // Save to in-memory store so it persists cleanly
    const storeItem: ResumeStoreItem = createdResume || {
      id: resumeId,
      userId,
      title: requestedTitle,
      slug: `resume-${Date.now()}`,
      templateId: targetTemplateId,
      status: 'draft',
      downloads: 0,
      views: 0,
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      summary: summary || cvData?.summary || '',
      personal: cvData?.personal || { firstName: 'John', lastName: 'Doe' },
      cvData,
      customTheme,
      selectedLayout,
      sectionVariants,
      sectionOrder,
      template: {
        id: targetTemplateId,
        name: targetTemplateId.replace(/-/g, ' '),
        thumbnail: null,
      },
    };

    saveStoreResume(storeItem);

    return NextResponse.json(
      {
        success: true,
        data: storeItem,
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

