/**
 * GET/POST/DELETE /api/media - Admin & User Media Library File Upload API
 */

import { NextResponse } from 'next/server';
import { protectRoute } from '@/lib/middleware/auth';

// Memory/Storage fallback store for media files
let mediaLibrary: Array<{
  id: string;
  name: string;
  type: string;
  size: string;
  url: string;
  createdAt: string;
}> = [
  {
    id: 'm-1',
    name: 'logo.svg',
    type: 'image/svg+xml',
    size: '42 KB',
    url: '/logo.svg',
    createdAt: new Date().toISOString(),
  },
];

export async function GET(req: Request) {
  try {
    return NextResponse.json({
      success: true,
      data: mediaLibrary,
    });
  } catch (error) {
    console.error('[MEDIA_GET_ERROR]', error);
    return NextResponse.json({ error: 'Failed to fetch media library' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const auth = await protectRoute(req);
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.formData();
    const files = formData.getAll('files') as File[];

    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No files uploaded' }, { status: 400 });
    }

    const uploadedItems = [];

    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64 = `data:${file.type};base64,${buffer.toString('base64')}`;

      const newItem = {
        id: `media_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        name: file.name,
        type: file.type || 'image/png',
        size: `${(file.size / 1024).toFixed(1)} KB`,
        url: base64,
        createdAt: new Date().toISOString(),
      };

      mediaLibrary.unshift(newItem);
      uploadedItems.push(newItem);
    }

    return NextResponse.json({
      success: true,
      data: uploadedItems,
    });
  } catch (error) {
    console.error('[MEDIA_POST_ERROR]', error);
    return NextResponse.json({ error: 'Failed to upload media files' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const auth = await protectRoute(req);
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const url = new URL(req.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing file id' }, { status: 400 });
    }

    mediaLibrary = mediaLibrary.filter((m) => m.id !== id);

    return NextResponse.json({
      success: true,
      message: 'File deleted',
    });
  } catch (error) {
    console.error('[MEDIA_DELETE_ERROR]', error);
    return NextResponse.json({ error: 'Failed to delete file' }, { status: 500 });
  }
}
