/**
 * GET /api/templates/[id] - Get template details
 */

import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const template = await prisma.template.findFirst({
      where: {
        OR: [
          { id },
          { slug: id },
        ],
      },
      include: {
        theme: true,
        reviews: {
          select: {
            id: true,
            rating: true,
            review: true,
            helpful: true,
            createdAt: true,
          },
          orderBy: { createdAt: 'desc' },
          take: 5,
        },
      },
    });

    if (!template) {
      return NextResponse.json(
        { error: 'Template not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: template,
    });
  } catch (error) {
    console.error('[TEMPLATE_GET_ERROR]', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
