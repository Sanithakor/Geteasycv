import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getAuthFromRequest } from '@/lib/middleware/auth';
import { canDownloadCV } from '@/lib/entitlements';

export async function GET(req: Request) {
  try {
    const auth = await getAuthFromRequest(req);
    if (!auth?.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await (prisma.user as any).findUnique({
      where: { id: auth.userId },
      select: { id: true, subscriptionTier: true, downloadCount: true },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const downloadCount = user.downloadCount || 0;
    const check = canDownloadCV(user, downloadCount);

    return NextResponse.json({
      success: true,
      downloadCount,
      canDownload: check.allowed,
      redirectUrl: check.redirectUrl,
      reason: check.reason,
    });
  } catch (error) {
    console.error('[GET_DOWNLOAD_COUNT_ERROR]', error);
    return NextResponse.json({ error: 'Failed to fetch download status' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const auth = await getAuthFromRequest(req);
    if (!auth?.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await (prisma.user as any).findUnique({
      where: { id: auth.userId },
      select: { id: true, subscriptionTier: true, downloadCount: true },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const currentDownloads = user.downloadCount || 0;
    const check = canDownloadCV(user, currentDownloads);

    if (!check.allowed) {
      return NextResponse.json(
        {
          success: false,
          allowed: false,
          redirectUrl: check.redirectUrl || '/pricing?reason=download_limit',
          error: check.reason || 'Free user download limit reached.',
        },
        { status: 403 }
      );
    }

    // Increment download count
    const updatedUser = await (prisma.user as any).update({
      where: { id: auth.userId },
      data: { downloadCount: { increment: 1 } },
      select: { downloadCount: true },
    });

    return NextResponse.json({
      success: true,
      allowed: true,
      downloadCount: updatedUser.downloadCount,
    });
  } catch (error) {
    console.error('[POST_DOWNLOAD_COUNT_ERROR]', error);
    return NextResponse.json({ error: 'Failed to record download' }, { status: 500 });
  }
}
