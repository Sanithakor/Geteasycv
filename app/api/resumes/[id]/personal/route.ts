/**
 * PUT /api/resumes/[id]/personal - Update personal info
 */

import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { getAuthFromRequest } from '@/lib/middleware/auth';

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const auth = await getAuthFromRequest(req);
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify resume ownership
    const resume = await prisma.resume.findFirst({
      where: {
        id,
        userId: auth.userId,
      },
    });

    if (!resume) {
      return NextResponse.json({ error: 'Resume not found' }, { status: 404 });
    }

    const body = await req.json();
    const {
      firstName,
      lastName,
      email,
      phone,
      location,
      website,
      linkedin,
      github,
      twitter,
      avatar,
    } = body;

    const personal = await prisma.personalInfo.upsert({
      where: { resumeId: id },
      create: {
        resumeId: id,
        firstName: firstName || '',
        lastName: lastName || '',
        email: email || '',
        phone: phone || '',
        location: location || '',
        website: website || null,
        linkedin: linkedin || null,
        github: github || null,
        twitter: twitter || null,
        avatar: avatar || null,
      },
      update: {
        firstName: firstName || undefined,
        lastName: lastName || undefined,
        email: email || undefined,
        phone: phone || undefined,
        location: location || undefined,
        website: website || undefined,
        linkedin: linkedin || undefined,
        github: github || undefined,
        twitter: twitter || undefined,
        avatar: avatar || undefined,
      },
    });

    return NextResponse.json({
      success: true,
      data: personal,
    });
  } catch (error) {
    console.error('[PERSONAL_INFO_UPDATE_ERROR]', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
