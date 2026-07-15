// Section variant configurations
// Variants control the visual style of each section

import { Theme } from '../../../data/themes';

export type HeaderVariant = 'centered' | 'split' | 'banner' | 'minimal';
export type ExperienceVariant = 'timeline' | 'cards' | 'bordered' | 'compact';
export type SkillsVariant = 'tags' | 'progress-bars' | 'circles' | 'pills';
export type ProjectsVariant = 'cards' | 'grid' | 'portfolio';
export type EducationVariant = 'cards' | 'list' | 'compact';
export type CertificationsVariant = 'cards' | 'list' | 'badges';
export type LanguagesVariant = 'tags' | 'flags' | 'progress';
export type SummaryVariant = 'standard' | 'highlight' | 'minimal';
export type ContactVariant = 'list' | 'cards' | 'icons';
export type AwardsVariant = 'cards' | 'list' | 'badges';

export type SectionVariants = {
  header: HeaderVariant;
  experience: ExperienceVariant;
  skills: SkillsVariant;
  projects: ProjectsVariant;
  education: EducationVariant;
  certifications: CertificationsVariant;
  languages: LanguagesVariant;
  summary: SummaryVariant;
  contact: ContactVariant;
  awards: AwardsVariant;
};

// Get theme-based styles
export const getThemeStyles = (theme: Theme) => ({
  primary: theme.primary,
  background: theme.background,
  backgroundAlt: theme.backgroundAlt,
  text: theme.text,
  textSecondary: theme.textSecondary,
  textMuted: theme.textMuted,
  border: theme.border,
  fontFamily: theme.fontFamily,
  fontFamilyHeading: theme.fontFamilyHeading,
  borderRadius: theme.borderRadius,
  shadowStyle: theme.shadowStyle,
  shadowColor: theme.shadowColor,
  dividerStyle: theme.dividerStyle,
  sectionStyle: theme.sectionStyle,
  spacing: theme.spacing,
  gradient: theme.gradient,
});

// Get shadow style based on theme
export const getShadowStyle = (theme: Theme): string => {
  switch (theme.shadowStyle) {
    case 'soft':
      return `0 4px 6px -1px ${theme.shadowColor}, 0 2px 4px -1px ${theme.shadowColor}`;
    case 'medium':
      return `0 10px 15px -3px ${theme.shadowColor}, 0 4px 6px -2px ${theme.shadowColor}`;
    case 'hard':
      return `0 20px 25px -5px ${theme.shadowColor}, 0 10px 10px -5px ${theme.shadowColor}`;
    case 'glass':
      return `0 8px 32px 0 ${theme.shadowColor}`;
    case 'none':
    default:
      return 'none';
  }
};

// Get glassmorphism style
export const getGlassStyle = (theme: Theme) => ({
  background: theme.secondary,
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  border: `1px solid ${theme.border}`,
  boxShadow: getShadowStyle(theme),
});

// Get divider style based on theme
export const getDividerStyle = (theme: Theme): string => {
  switch (theme.dividerStyle) {
    case 'solid':
      return `1px solid ${theme.border}`;
    case 'dashed':
      return `1px dashed ${theme.border}`;
    case 'dotted':
      return `1px dotted ${theme.border}`;
    case 'gradient':
      return `1px solid transparent`;
    case 'none':
    default:
      return 'none';
  }
};

// Get gradient divider
export const getGradientDivider = (theme: Theme): string => {
  return `linear-gradient(90deg, ${theme.primary} 0%, ${theme.secondary} 100%)`;
};

// Get spacing based on theme
export const getSpacing = (theme: Theme): string => {
  switch (theme.spacing) {
    case 'compact':
      return '0.5rem';
    case 'relaxed':
      return '1.5rem';
    case 'normal':
    default:
      return '1rem';
  }
};

// Get card styles based on theme
export const getCardStyles = (theme: Theme) => ({
  backgroundColor: theme.background,
  borderRadius: theme.borderRadius,
  boxShadow: getShadowStyle(theme),
  border: `1px solid ${theme.border}`,
});

// Get bordered section style
export const getBorderedSectionStyle = (theme: Theme) => ({
  border: `1px solid ${theme.border}`,
  borderRadius: theme.borderRadius,
  padding: getSpacing(theme),
});

// Get typography styles based on theme
export const getTypographyStyles = (theme: Theme) => ({
  fontFamily: theme.fontFamily,
  color: theme.text,
  headingColor: theme.primary,
});

// Get gradient text style
export const getGradientText = (theme: Theme) => ({
  background: `linear-gradient(${theme.gradient.direction}, ${theme.gradient.start}, ${theme.gradient.end})`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
});

// Get pill button style
export const getPillStyle = (theme: Theme) => ({
  background: `linear-gradient(${theme.gradient.direction}, ${theme.gradient.start}15, ${theme.gradient.end}15)`,
  border: `1px solid ${theme.primary}30`,
  borderRadius: '9999px',
  padding: '0.25rem 0.75rem',
  fontSize: '0.75rem',
  color: theme.primary,
});