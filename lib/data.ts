// Data access layer - provides backward compatibility and unified data access

import { getAllLayouts, Layout } from '@/data/layouts';
import { getAllThemes, Theme } from '@/data/themes';
import { generateTemplates, getAllTemplateConfigs, GeneratedTemplate, TemplateConfig } from '@/lib/generateTemplates';
import { sampleCV, CVData, getEmptyCV } from '@/data/sampleCV';

// Legacy template format for backward compatibility
export type LegacyTemplate = {
  id: string;
  name: string;
  thumbnail: string;
  category: string;
  features: string[];
  rating: number;
  downloads: number;
};

// Convert generated templates to legacy format
const convertToLegacyFormat = (template: GeneratedTemplate): LegacyTemplate => ({
  id: template.id,
  name: template.name,
  thumbnail: `/images/templates/preview-placeholder.svg`,
  category: template.layout.name,
  features: [
    template.theme.name,
    template.layout.name,
    ...Object.entries(template.sectionVariants)
      .filter(([_, value]) => value)
      .map(([key, value]) => `${key}: ${value}`),
  ],
  rating: 4.5 + Math.random() * 0.5,
  downloads: 100 + Math.floor(Math.random() * 900),
});

// Get all templates (legacy format)
export function getTemplates(): LegacyTemplate[] {
  return generateTemplates().map(convertToLegacyFormat);
}

// Get template by ID (legacy format)
export function getTemplateById(id: string) {
  const templates = getTemplates();
  return templates.find((t) => t.id === id);
}

// Get sample CV data
export function getSampleCV(): CVData {
  return sampleCV;
}

// New API - Get all generated templates
export function getGeneratedTemplates(): GeneratedTemplate[] {
  return generateTemplates();
}

// New API - Get template configurations
export function getTemplateConfigs(): TemplateConfig[] {
  return getAllTemplateConfigs();
}

// New API - Get all layouts
export function getLayouts(): Layout[] {
  return getAllLayouts();
}

// New API - Get all themes
export function getThemes(): Theme[] {
  return getAllThemes();
}

// New API - Get empty CV for form
export function getEmptyCVData(): CVData {
  return getEmptyCV();
}