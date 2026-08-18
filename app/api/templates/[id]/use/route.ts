/**
 * POST /api/templates/[id]/use - Create resume from template
 */

import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { getAuthFromRequest } from '@/lib/middleware/auth';

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

    // Get template
    const template = await prisma.template.findUnique({
      where: { id },
    });

    if (!template) {
      return NextResponse.json(
        { error: 'Template not found' },
        { status: 404 }
      );
    }

    const body = await req.json();
    const { title } = body;

    // Create resume from template
    const resume = await prisma.resume.create({
      data: {
        title: title || `${template.name} Resume`,
        slug: `resume-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        userId: auth.userId,
        templateId: template.id,
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

    // Increment template uses
    await prisma.template.update({
      where: { id: template.id },
      data: { uses: { increment: 1 } },
    });

    return NextResponse.json(
      {
        success: true,
        data: resume,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[TEMPLATE_USE_ERROR]', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
