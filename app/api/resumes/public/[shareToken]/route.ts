import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ shareToken: string }> }
) {
  try {
    const { shareToken } = await params;

    if (!shareToken) {
      return NextResponse.json(
        { error: 'Share token is required' },
        { status: 400 }
      );
    }

    const resume = await prisma.resume.findUnique({
      where: { shareToken },
      include: {
        personal: true,
        experience: { orderBy: { order: 'asc' } },
        education: { orderBy: { order: 'asc' } },
        skills: { orderBy: { order: 'asc' } },
        projects: { orderBy: { order: 'asc' } },
        certifications: { orderBy: { order: 'asc' } },
        languages: { orderBy: { order: 'asc' } },
        template: { include: { theme: true } },
      },
    });

    if (!resume || (!resume.isPublic && resume.status !== 'published')) {
      return NextResponse.json(
        { error: 'Public resume not found or link has been disabled' },
        { status: 404 }
      );
    }

    // Increment view count analytics asynchronously
    prisma.resume.update({
      where: { id: resume.id },
      data: { views: { increment: 1 } },
    }).catch((err) => console.warn('[VIEW_INCREMENT_ERROR]', err));

    return NextResponse.json({
      success: true,
      resume,
    });
  } catch (error) {
    console.error('[GET_PUBLIC_RESUME_ERROR]', error);
    return NextResponse.json(
      { error: 'Failed to load public resume' },
      { status: 500 }
    );
  }
}
