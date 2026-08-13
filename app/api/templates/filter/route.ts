import { NextResponse } from 'next/server';
import { generateTemplates } from '@/lib/generateTemplates';
import { 
  isTemplateInCategory,
  getCategoriesForTemplate,
  getTemplateCategory
} from '@/data/templateCategories';

// POST /api/templates/filter - Advanced template filtering
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      category = 'all',
      experienceLevel = 'all',
      style = 'all',
      industry = 'all',
      search = '',
      sortBy = 'popular',
      page = 1,
      limit = 12
    } = body;

    const allTemplates = generateTemplates();
    
    // Apply filters
    let filteredTemplates = allTemplates.filter((template) => {
      // Category filter
      if (category !== 'all') {
        const belongsToCategory = isTemplateInCategory(template.id, category);
        if (!belongsToCategory) return false;
      }
      
      // Experience level filter
      if (experienceLevel !== 'all') {
        const templateCategories = getCategoriesForTemplate(template.id);
        const hasExperienceLevel = templateCategories.some(cat => 
          cat.experienceLevel.includes(experienceLevel)
        );
        if (!hasExperienceLevel) return false;
      }
      
      // Style filter
      if (style !== 'all') {
        const templateCategories = getCategoriesForTemplate(template.id);
        const hasStyle = templateCategories.some(cat => 
          cat.styles.includes(style)
        );
        if (!hasStyle) return false;
      }
      
      // Industry filter
      if (industry !== 'all') {
        const templateCategories = getCategoriesForTemplate(template.id);
        const hasIndustry = templateCategories.some(cat => 
          cat.industries.includes(industry) || cat.industries.includes('All Industries')
        );
        if (!hasIndustry) return false;
      }

      // Search filter
      if (search.trim()) {
        const query = search.trim().toLowerCase();
        const templateCategories = getCategoriesForTemplate(template.id);
        const searchableText = [
          template.name,
          template.description,
          template.layout.name,
          template.theme.name,
          template.category,
          ...template.tags,
          ...templateCategories.map(cat => cat.name)
        ].join(' ').toLowerCase();
        
        if (!searchableText.includes(query)) return false;
      }

      return true;
    });

    // Apply sorting
    switch (sortBy) {
      case 'alphabetical':
        filteredTemplates.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'newest':
        filteredTemplates.sort((a, b) => b.id.localeCompare(a.id));
        break;
      case 'category':
        filteredTemplates.sort((a, b) => {
          const aCats = getCategoriesForTemplate(a.id);
          const bCats = getCategoriesForTemplate(b.id);
          const aMainCat = aCats[0]?.name || '';
          const bMainCat = bCats[0]?.name || '';
          return aMainCat.localeCompare(bMainCat);
        });
        break;
      case 'popular':
      default:
        // Keep current order as "popular"
        break;
    }

    // Apply pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedTemplates = filteredTemplates.slice(startIndex, endIndex);

    // Add category information to each template
    const templatesWithCategories = paginatedTemplates.map(template => ({
      ...template,
      categories: getCategoriesForTemplate(template.id),
      badges: getTemplateBadges(template)
    }));

    const response = {
      success: true,
      data: {
        templates: templatesWithCategories,
        pagination: {
          page,
          limit,
          total: filteredTemplates.length,
          totalPages: Math.ceil(filteredTemplates.length / limit),
          hasNextPage: endIndex < filteredTemplates.length,
          hasPreviousPage: page > 1
        },
        filters: {
          category,
          experienceLevel,
          style,
          industry,
          search,
          sortBy
        }
      }
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error filtering templates:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to filter templates',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Helper function to generate template badges (same as in the frontend)
function getTemplateBadges(template: any): { type: string; label: string; color: string }[] {
  const badges = [];
  
  // ATS Friendly badge
  const text = `${template.name} ${template.category} ${template.layout.name}`.toLowerCase();
  if (text.includes('ats') || text.includes('compact') || text.includes('single column')) {
    badges.push({ type: 'ats', label: 'ATS Ready', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' });
  }
  
  // Style badges based on layout category
  if (template.layout.category === 'Creative') {
    badges.push({ type: 'style', label: 'Creative', color: 'bg-orange-50 text-orange-700 border-orange-200' });
  } else if (template.layout.category === 'Luxury') {
    badges.push({ type: 'style', label: 'Premium', color: 'bg-purple-50 text-purple-700 border-purple-200' });
  } else if (template.layout.category === 'Modern') {
    badges.push({ type: 'style', label: 'Modern', color: 'bg-blue-50 text-blue-700 border-blue-200' });
  } else if (template.layout.category === 'Professional') {
    badges.push({ type: 'style', label: 'Professional', color: 'bg-gray-50 text-gray-700 border-gray-200' });
  }
  
  return badges;
}