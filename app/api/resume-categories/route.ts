/**
 * GET /api/resume-categories - List all resume categories
 * Provides category information for resume creation
 */

import { NextResponse } from 'next/server';
import { getActiveCategories, getCategoryById } from '@/data/resumeCategories';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const includeData = searchParams.get('includeData') === 'true';
    const categoryId = searchParams.get('id');

    // Get specific category if ID provided
    if (categoryId) {
      const category = getCategoryById(categoryId);
      if (!category) {
        return NextResponse.json(
          { error: 'Category not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        data: includeData ? category : {
          id: category.id,
          name: category.name,
          description: category.description,
          icon: category.icon,
          color: category.color,
          popularRoles: category.popularRoles,
          requiredSkills: category.requiredSkills,
          isActive: category.isActive,
          sortOrder: category.sortOrder
        }
      });
    }

    // Get all active categories
    const categories = getActiveCategories();
    
    const responseData = categories.map(category => ({
      id: category.id,
      name: category.name,
      description: category.description,
      icon: category.icon,
      color: category.color,
      popularRoles: category.popularRoles,
      requiredSkills: category.requiredSkills,
      isActive: category.isActive,
      sortOrder: category.sortOrder,
      // Include sample data only if requested
      ...(includeData && { sampleData: category.sampleData })
    }));

    return NextResponse.json({
      success: true,
      data: responseData,
      total: responseData.length
    });

  } catch (error) {
    console.error('[RESUME_CATEGORIES_ERROR]', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}