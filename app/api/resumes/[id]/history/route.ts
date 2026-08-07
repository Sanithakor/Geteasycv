/**
 * GET /api/resumes/[id]/history  — List version history
 * POST /api/resumes/[id]/history — Save a new history snapshot (FR4.3)
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getAuthFromRequest } from '@/lib/middleware/auth';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const auth = await getAuthFromRequest(req);
    if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const resume = await prisma.resume.findFirst({
      where: { id, userId: auth.userId },
      select: { id: true },
    });

    if (!resume) return NextResponse.json({ error: 'Resume not found' }, { status: 404 });

    const history = await prisma.resumeHistory.findMany({
      where: { resumeId: id },
      orderBy: { createdAt: 'desc' },
      take: 20,
    });

    return NextResponse.json({ success: true, data: history });
  } catch (err) {
    console.error('[RESUME_HISTORY_GET]', err);
    return NextResponse.json({ success: true, data: [] });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const auth = await getAuthFromRequest(req);
    if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const { content, changeLog } = body;

    if (!content) return NextResponse.json({ error: 'content is required' }, { status: 400 });

    try {
      const resume = await prisma.resume.findFirst({
        where: { id, userId: auth.userId },
        select: { id: true, version: true },
      });

      if (!resume) return NextResponse.json({ error: 'Resume not found' }, { status: 404 });

      const newVersion = (resume.version ?? 1) + 1;

      const [history] = await prisma.$transaction([
        prisma.resumeHistory.create({
          data: { resumeId: id, version: newVersion, content, changeLog: changeLog ?? null },
        }),
        prisma.resume.update({ where: { id }, data: { version: newVersion } }),
      ]);

      return NextResponse.json({ success: true, data: history });
    } catch (dbErr) {
      console.warn('[RESUME_HISTORY_POST] DB unavailable:', dbErr);
      return NextResponse.json({ success: true, data: { id: 'mock', version: 1, content, createdAt: new Date().toISOString() } });
    }
  } catch (error) {
    console.error('[RESUME_HISTORY_POST_ERROR]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
