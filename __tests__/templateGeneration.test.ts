import { describe, it, expect } from 'vitest';
import { layouts, getAllLayouts, getLayout } from '@/data/layouts';
import { themes, getAllThemes, getTheme } from '@/data/themes';
import { generateTemplates } from '@/lib/generateTemplates';

describe('CV Layouts, Themes & Template Generation Engine', () => {
  describe('Layout Definitions (data/layouts.ts)', () => {
    it('contains at least 10 predefined layouts', () => {
      expect(layouts.length).toBeGreaterThanOrEqual(10);
    });

    it('ensures every layout has valid required properties', () => {
      layouts.forEach((layout) => {
        expect(layout.id).toBeTruthy();
        expect(layout.name).toBeTruthy();
        expect(layout.category).toBeTruthy();
        expect(['left', 'right', 'none', 'both']).toContain(layout.sidebarPosition);
        expect(Array.isArray(layout.sectionOrder)).toBe(true);
        expect(layout.sectionOrder.length).toBeGreaterThan(0);
      });
    });

    it('retrieves specific layout by ID correctly', () => {
      const atsLayout = getLayout('single-column-ats');
      expect(atsLayout).not.toBeUndefined();
      expect(atsLayout?.name).toBe('Single Column ATS');
    });

    it('throws error for non-existent layout ID', () => {
      expect(() => getLayout('non-existent-layout-id')).toThrow();
    });
  });

  describe('Theme Configurations (data/themes.ts)', () => {
    it('contains at least 10 predefined color themes', () => {
      expect(themes.length).toBeGreaterThanOrEqual(10);
    });

    it('ensures every theme defines primary, secondary, text, background, and font properties', () => {
      themes.forEach((theme) => {
        expect(theme.id).toBeTruthy();
        expect(theme.name).toBeTruthy();
        expect(theme.primary).toBeTruthy();
        expect(theme.background).toBeTruthy();
        expect(theme.text).toBeTruthy();
        expect(theme.fontFamily).toBeTruthy();
      });
    });

    it('retrieves specific theme by ID correctly', () => {
      const modernBlue = getTheme('modern-blue');
      expect(modernBlue).not.toBeUndefined();
      expect(modernBlue?.name).toBe('Modern Blue');
    });
  });

  describe('Dynamic Template Generation System (lib/generateTemplates.ts)', () => {
    it('generates non-empty template configurations combining layouts and themes', () => {
      const generated = generateTemplates();
      expect(generated.length).toBeGreaterThan(0);
      expect(generated.length).toBe(layouts.length * themes.length);
    });

    it('ensures every generated template has valid composite ID, name, layout, and theme objects', () => {
      const generated = generateTemplates();
      const first = generated[0];

      expect(first.id).toBeTruthy();
      expect(first.name).toBeTruthy();
      expect(first.layout).not.toBeUndefined();
      expect(first.theme).not.toBeUndefined();
      expect(first.sectionVariants).not.toBeUndefined();
    });
  });
});
