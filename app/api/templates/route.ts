/**
 * GET /api/templates - List templates with filters
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const isPremium = searchParams.get('premium') === 'true';
    const isATS = searchParams.get('ats') === 'true';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');

    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {
      status: 'active',
    };

    if (category) {
      where.category = category;
    }

    if (isPremium) {
      where.isPremium = true;
    }

    if (isATS) {
      where.isATS = true;
    }

    // Get templates and total count
    const [templates, total] = await Promise.all([
      prisma.template.findMany({
        where,
        select: {
          id: true,
          name: true,
          slug: true,
          category: true,
          thumbnail: true,
          preview: true,
          isPremium: true,
          isATS: true,
          downloads: true,
          rating: true,
          reviewCount: true,
        },
        skip,
        take: limit,
        orderBy: { downloads: 'desc' },
      }),
      prisma.template.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: templates,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('[TEMPLATES_LIST_ERROR]', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
