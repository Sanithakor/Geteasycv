/**
 * GET /api/resume-categories/[id]/sample-data - Get sample resume data for specific category
 */

import { NextResponse } from 'next/server';
import { getCategoryById } from '@/data/resumeCategories';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: categoryId } = await params;
    
    if (!categoryId) {
      return NextResponse.json(
        { error: 'Category ID is required' },
        { status: 400 }
      );
    }

    const category = getCategoryById(categoryId);
    
    if (!category || !category.isActive) {
      return NextResponse.json(
        { error: 'Category not found or inactive' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        category: {
          id: category.id,
          name: category.name,
          description: category.description,
          icon: category.icon,
          color: category.color
        },
        sampleData: category.sampleData
      }
    });

  } catch (error) {
    console.error('[CATEGORY_SAMPLE_DATA_ERROR]', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}