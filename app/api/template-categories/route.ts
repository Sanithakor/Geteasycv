import { NextResponse } from 'next/server';
import { 
  templateCategories, 
  experienceLevels, 
  styleCategories,
  getActiveCategoriesForTemplates,
  getCategoriesForExperienceLevel,
  getCategoriesForStyle,
  getAllIndustries
} from '@/data/templateCategories';

// GET /api/template-categories - Get all template categories and filter options
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const includeInactive = searchParams.get('includeInactive') === 'true';
    const experienceLevel = searchParams.get('experienceLevel');
    const style = searchParams.get('style');

    let categories = includeInactive ? templateCategories : getActiveCategoriesForTemplates();

    // Filter by experience level if provided
    if (experienceLevel && experienceLevel !== 'all') {
      categories = getCategoriesForExperienceLevel(experienceLevel as any);
    }

    // Filter by style if provided
    if (style && style !== 'all') {
      categories = getCategoriesForStyle(style as any);
    }

    const response = {
      success: true,
      data: {
        categories,
        experienceLevels,
        styleCategories,
        industries: getAllIndustries(),
        meta: {
          totalCategories: categories.length,
          activeCategories: getActiveCategoriesForTemplates().length,
          totalExperienceLevels: experienceLevels.length,
          totalStyles: styleCategories.length,
          totalIndustries: getAllIndustries().length
        }
      }
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching template categories:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch template categories',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}