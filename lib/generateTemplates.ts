// Template generation system
// Generates templates from layout and theme combinations

import { Layout, getAllLayouts } from '../data/layouts';
import { Theme, getAllThemes } from '../data/themes';

export type SectionVariant = {
  headerVariant: 'centered' | 'split' | 'banner' | 'minimal';
  experienceVariant: 'timeline' | 'cards' | 'bordered' | 'compact';
  skillsVariant: 'tags' | 'progress-bars' | 'circles' | 'pills';
  projectsVariant: 'cards' | 'grid' | 'portfolio';
  educationVariant: 'cards' | 'list' | 'compact';
  certificationsVariant: 'cards' | 'list' | 'badges';
  languagesVariant: 'tags' | 'flags' | 'progress';
  summaryVariant: 'standard' | 'highlight' | 'minimal';
  contactVariant: 'list' | 'cards' | 'icons';
  awardsVariant: 'cards' | 'list' | 'badges';
};

export type TemplateConfig = {
  id: string;
  name: string;
  layoutId: string;
  themeId: string;
  sectionVariants: SectionVariant;
  description: string;
  tags: string[];
  category: string;
};

export type GeneratedTemplate = TemplateConfig & {
  layout: Layout;
  theme: Theme;
};

// Generate all possible template combinations
export const generateTemplates = (): GeneratedTemplate[] => {
  const allLayouts = getAllLayouts();
  const allThemes = getAllThemes();
  const templates: GeneratedTemplate[] = [];

  allLayouts.forEach((layout) => {
    allThemes.forEach((theme) => {
      const template: GeneratedTemplate = {
        id: `${layout.id}-${theme.id}`,
        name: `${layout.name} - ${theme.name}`,
        layoutId: layout.id,
        themeId: theme.id,
        layout,
        theme,
        sectionVariants: getDefaultSectionVariants(layout),
        description: `${layout.description} with ${theme.name} styling.`,
        tags: [layout.category.toLowerCase(), theme.id, 'generated'],
        category: layout.category,
      };
      templates.push(template);
    });
  });

  return templates;
};

// Get default section variants based on layout type
const mapHeaderStyleToVariant = (headerStyle: Layout['headerStyle']): SectionVariant['headerVariant'] => {
  switch (headerStyle) {
    case 'full':
      return 'centered';
    case 'compact':
      return 'split';
    case 'banner':
      return 'banner';
    case 'minimal':
    default:
      return 'minimal';
  }
};

const getDefaultSectionVariants = (layout: Layout): SectionVariant => {
  const isCompact = layout.spacing === 'compact';
  const isCreative = layout.category === 'Creative';
  const isLuxury = layout.category === 'Luxury';

  return {
    headerVariant: mapHeaderStyleToVariant(layout.headerStyle),
    experienceVariant: isCompact ? 'compact' : isCreative ? 'cards' : 'timeline',
    skillsVariant: isLuxury ? 'circles' : isCreative ? 'pills' : 'tags',
    projectsVariant: isCreative ? 'portfolio' : 'cards',
    educationVariant: isCompact ? 'compact' : 'cards',
    certificationsVariant: isCreative ? 'badges' : 'list',
    languagesVariant: 'tags',
    summaryVariant: isLuxury ? 'highlight' : 'standard',
    contactVariant: 'icons',
    awardsVariant: isCreative ? 'badges' : 'cards',
  };
};

// Get a specific template by ID
export const getTemplate = (templateId: string): GeneratedTemplate => {
  const templates = generateTemplates();
  const template = templates.find((t) => t.id === templateId);
  if (!template) {
    throw new Error(`Template with id "${templateId}" not found`);
  }
  return template;
};

// Get templates by layout
export const getTemplatesByLayout = (layoutId: string): GeneratedTemplate[] => {
  return generateTemplates().filter((t) => t.layoutId === layoutId);
};

// Get templates by theme
export const getTemplatesByTheme = (themeId: string): GeneratedTemplate[] => {
  return generateTemplates().filter((t) => t.themeId === themeId);
};

// Get templates by category
export const getTemplatesByCategory = (category: string): GeneratedTemplate[] => {
  return generateTemplates().filter((t) => t.category.toLowerCase() === category.toLowerCase());
};

// Get all unique template configurations (without layout/theme objects)
export const getAllTemplateConfigs = (): TemplateConfig[] => {
  return generateTemplates().map(({ layout, theme, ...config }) => config);
};

// Create custom template configuration
export const createTemplateConfig = (
  layoutId: string,
  themeId: string,
  sectionVariants: Partial<SectionVariant>,
  name?: string,
  description?: string
): TemplateConfig => {
  const layout = getAllLayouts().find((l) => l.id === layoutId);
  const theme = getAllThemes().find((t) => t.id === themeId);

  if (!layout || !theme) {
    throw new Error(`Invalid layoutId or themeId`);
  }

  return {
    id: `${layoutId}-${themeId}`,
    name: name || `${layout.name} - ${theme.name}`,
    layoutId,
    themeId,
    sectionVariants: {
      headerVariant: 'centered',
      experienceVariant: 'timeline',
      skillsVariant: 'tags',
      projectsVariant: 'cards',
      educationVariant: 'cards',
      certificationsVariant: 'list',
      languagesVariant: 'tags',
      summaryVariant: 'standard',
      contactVariant: 'icons',
      awardsVariant: 'cards',
      ...sectionVariants,
    },
    description: description || `${layout.description} with ${theme.name} styling.`,
    tags: [layout.category.toLowerCase(), theme.id, 'custom'],
    category: layout.category,
  };
};

// Export template count statistics
export const getTemplateStats = () => {
  const allLayouts = getAllLayouts();
  const allThemes = getAllThemes();
  const categories = [...new Set(allLayouts.map((l) => l.category))];
  
  return {
    layouts: allLayouts.length,
    themes: allThemes.length,
    totalTemplates: allLayouts.length * allThemes.length,
    categories: categories,
    layoutNames: allLayouts.map((l) => l.name),
    themeNames: allThemes.map((t) => t.name),
  };
};
