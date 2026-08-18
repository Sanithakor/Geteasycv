import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { 
  getTemplateDownloadCount, 
  incrementTemplateDownloadCount, 
  getAllTemplateDownloadCounts 
} from '@/lib/templateStatsStore';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const templateId = searchParams.get('templateId');

    if (templateId) {
      const count = getTemplateDownloadCount(templateId);
      return NextResponse.json({ success: true, count });
    }

    // Try fetching from DB if available
    try {
      const dbTemplates = await prisma.template.findMany({
        select: { id: true, downloads: true },
      });
      const counts: Record<string, number> = { ...getAllTemplateDownloadCounts() };
      dbTemplates.forEach((t: typeof dbTemplates[number]) => {
        if (t.downloads > 0) {
          counts[t.id] = t.downloads;
        }
      });
      return NextResponse.json({ success: true, counts });
    } catch {
      return NextResponse.json({ success: true, counts: getAllTemplateDownloadCounts() });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { templateId } = body;
    if (!templateId) {
      return NextResponse.json({ error: 'templateId is required' }, { status: 400 });
    }

    const updatedCount = incrementTemplateDownloadCount(templateId);

    try {
      await prisma.template.update({
        where: { id: templateId },
        data: { downloads: { increment: 1 } },
      });
    } catch (dbErr) {
      console.warn('[TEMPLATE_DOWNLOAD_INCREMENT_DB_WARN]', dbErr);
    }

    return NextResponse.json({ success: true, count: updatedCount });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
