/**
 * Admin API for managing resume categories
 * GET /api/admin/resume-categories - List all categories (including inactive)
 * POST /api/admin/resume-categories - Create new category
 * PUT /api/admin/resume-categories - Update category
 */

import { NextResponse } from 'next/server';
import { getAuthFromRequest } from '@/lib/middleware/auth';
import { resumeCategories } from '@/data/resumeCategories';

export async function GET(req: Request) {
  try {
    const auth = await getAuthFromRequest(req);
    if (!auth || auth.role !== 'admin') {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(req.url);
    const includeData = searchParams.get('includeData') === 'true';

    const responseData = resumeCategories
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .map(category => ({
        id: category.id,
        name: category.name,
        description: category.description,
        icon: category.icon,
        color: category.color,
        popularRoles: category.popularRoles,
        requiredSkills: category.requiredSkills,
        isActive: category.isActive,
        sortOrder: category.sortOrder,
        // Include sample data only if requested for editing
        ...(includeData && { sampleData: category.sampleData })
      }));

    return NextResponse.json({
      success: true,
      data: responseData,
      total: responseData.length,
      stats: {
        active: resumeCategories.filter(c => c.isActive).length,
        inactive: resumeCategories.filter(c => !c.isActive).length
      }
    });

  } catch (error) {
    console.error('[ADMIN_CATEGORIES_LIST_ERROR]', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const auth = await getAuthFromRequest(req);
    if (!auth || auth.role !== 'admin') {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }

    const body = await req.json();
    const {
      id,
      name,
      description,
      icon,
      color,
      popularRoles,
      requiredSkills,
      sampleData,
      isActive = true
    } = body;

    // Validate required fields
    if (!id || !name || !description) {
      return NextResponse.json(
        { error: 'ID, name, and description are required' },
        { status: 400 }
      );
    }

    // Check if category with same ID already exists
    const existingCategory = resumeCategories.find(c => c.id === id);
    if (existingCategory) {
      return NextResponse.json(
        { error: 'Category with this ID already exists' },
        { status: 409 }
      );
    }

    // In a real implementation, this would save to database
    // For now, we'll return success response for demo purposes
    const newCategory = {
      id,
      name,
      description,
      icon: icon || '📄',
      color: color || '#6B7280',
      popularRoles: popularRoles || [],
      requiredSkills: requiredSkills || [],
      sampleData: sampleData || null,
      isActive,
      sortOrder: resumeCategories.length + 1
    };

    return NextResponse.json({
      success: true,
      message: 'Category created successfully',
      data: newCategory
    }, { status: 201 });

  } catch (error) {
    console.error('[ADMIN_CATEGORY_CREATE_ERROR]', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const auth = await getAuthFromRequest(req);
    if (!auth || auth.role !== 'admin') {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { id, updates } = body;

    if (!id || !updates) {
      return NextResponse.json(
        { error: 'Category ID and updates are required' },
        { status: 400 }
      );
    }

    // Find category
    const categoryIndex = resumeCategories.findIndex(c => c.id === id);
    if (categoryIndex === -1) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    // In a real implementation, this would update the database
    // For now, we'll return success response for demo purposes
    const updatedCategory = {
      ...resumeCategories[categoryIndex],
      ...updates,
      id // Ensure ID cannot be changed
    };

    return NextResponse.json({
      success: true,
      message: 'Category updated successfully',
      data: updatedCategory
    });

  } catch (error) {
    console.error('[ADMIN_CATEGORY_UPDATE_ERROR]', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}