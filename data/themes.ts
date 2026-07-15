// Premium Theme configuration for CV templates
// Themes control colors, fonts, spacing, shadows, and visual styling

export type Theme = {
  id: string;
  name: string;
  description: string;
  primary: string;
  secondary: string;
  background: string;
  backgroundAlt: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  border: string;
  fontFamily: string;
  fontFamilyHeading: string;
  borderRadius: string;
  shadowStyle: 'soft' | 'medium' | 'hard' | 'none' | 'glass';
  shadowColor: string;
  dividerStyle: 'solid' | 'dashed' | 'dotted' | 'gradient' | 'none';
  sectionStyle: 'cards' | 'bordered' | 'minimal' | 'glass';
  spacing: 'compact' | 'normal' | 'relaxed';
  gradient: {
    start: string;
    end: string;
    direction: string;
  };
};

export const themes: Theme[] = [
  {
    id: 'modern-blue',
    name: 'Modern Blue',
    description: 'Professional blue theme with clean lines and modern typography',
    primary: '#4F46E5',
    secondary: '#EEF2FF',
    background: '#FFFFFF',
    backgroundAlt: '#F8FAFC',
    text: '#111827',
    textSecondary: '#4B5563',
    textMuted: '#9CA3AF',
    border: '#E2E8F0',
    fontFamily: 'Inter',
    fontFamilyHeading: 'Poppins',
    borderRadius: '16px',
    shadowStyle: 'soft',
    shadowColor: 'rgba(79, 70, 229, 0.08)',
    dividerStyle: 'solid',
    sectionStyle: 'cards',
    spacing: 'normal',
    gradient: {
      start: '#4F46E5',
      end: '#7C3AED',
      direction: '135deg',
    },
  },
  {
    id: 'luxury-purple',
    name: 'Luxury Purple',
    description: 'Elegant purple theme with sophisticated styling',
    primary: '#8B5CF6',
    secondary: '#F5F3FF',
    background: '#FFFFFF',
    backgroundAlt: '#FAF8FF',
    text: '#1F2937',
    textSecondary: '#6B7280',
    textMuted: '#9CA3AF',
    border: '#EDE9FE',
    fontFamily: 'Inter',
    fontFamilyHeading: 'Playfair Display',
    borderRadius: '20px',
    shadowStyle: 'medium',
    shadowColor: 'rgba(139, 92, 246, 0.12)',
    dividerStyle: 'gradient',
    sectionStyle: 'glass',
    spacing: 'relaxed',
    gradient: {
      start: '#8B5CF6',
      end: '#A855F7',
      direction: '135deg',
    },
  },
  {
    id: 'startup-green',
    name: 'Startup Green',
    description: 'Fresh green theme perfect for tech and startup roles',
    primary: '#10B981',
    secondary: '#ECFDF5',
    background: '#FFFFFF',
    backgroundAlt: '#F0FDF4',
    text: '#111827',
    textSecondary: '#6B7280',
    textMuted: '#9CA3AF',
    border: '#A7F3D0',
    fontFamily: 'Inter',
    fontFamilyHeading: 'Inter',
    borderRadius: '12px',
    shadowStyle: 'soft',
    shadowColor: 'rgba(16, 185, 129, 0.1)',
    dividerStyle: 'solid',
    sectionStyle: 'bordered',
    spacing: 'compact',
    gradient: {
      start: '#10B981',
      end: '#059669',
      direction: '90deg',
    },
  },
  {
    id: 'dark-executive',
    name: 'Dark Executive',
    description: 'Sophisticated dark theme for executive positions',
    primary: '#F59E0B',
    secondary: '#1F2937',
    background: '#1F2937',
    backgroundAlt: '#111827',
    text: '#F9FAFB',
    textSecondary: '#9CA3AF',
    textMuted: '#6B7280',
    border: '#374151',
    fontFamily: 'Inter',
    fontFamilyHeading: 'Inter',
    borderRadius: '8px',
    shadowStyle: 'hard',
    shadowColor: 'rgba(0, 0, 0, 0.4)',
    dividerStyle: 'solid',
    sectionStyle: 'minimal',
    spacing: 'compact',
    gradient: {
      start: '#F59E0B',
      end: '#D97706',
      direction: '135deg',
    },
  },
  {
    id: 'creative-orange',
    name: 'Creative Orange',
    description: 'Vibrant orange theme for creative professionals',
    primary: '#F97316',
    secondary: '#FFF7ED',
    background: '#FFFFFF',
    backgroundAlt: '#FFFAF0',
    text: '#1F2937',
    textSecondary: '#6B7280',
    textMuted: '#9CA3AF',
    border: '#FED7AA',
    fontFamily: 'Inter',
    fontFamilyHeading: 'Poppins',
    borderRadius: '24px',
    shadowStyle: 'medium',
    shadowColor: 'rgba(249, 115, 22, 0.15)',
    dividerStyle: 'dashed',
    sectionStyle: 'cards',
    spacing: 'relaxed',
    gradient: {
      start: '#F97316',
      end: '#EA580C',
      direction: '135deg',
    },
  },
  {
    id: 'rose-red',
    name: 'Rose Red',
    description: 'Elegant rose red theme with modern appeal',
    primary: '#E11D48',
    secondary: '#FFF1F2',
    background: '#FFFFFF',
    backgroundAlt: '#FFF5F5',
    text: '#111827',
    textSecondary: '#6B7280',
    textMuted: '#9CA3AF',
    border: '#FECDD3',
    fontFamily: 'Inter',
    fontFamilyHeading: 'Playfair Display',
    borderRadius: '16px',
    shadowStyle: 'soft',
    shadowColor: 'rgba(225, 29, 72, 0.1)',
    dividerStyle: 'solid',
    sectionStyle: 'glass',
    spacing: 'normal',
    gradient: {
      start: '#E11D48',
      end: '#BE123C',
      direction: '135deg',
    },
  },
  {
    id: 'cyan-tech',
    name: 'Cyan Tech',
    description: 'Modern cyan theme for tech professionals',
    primary: '#06B6D4',
    secondary: '#ECFEFF',
    background: '#FFFFFF',
    backgroundAlt: '#F0FDFA',
    text: '#111827',
    textSecondary: '#6B7280',
    textMuted: '#9CA3AF',
    border: '#A5F3FC',
    fontFamily: 'Inter',
    fontFamilyHeading: 'Inter',
    borderRadius: '12px',
    shadowStyle: 'soft',
    shadowColor: 'rgba(6, 182, 212, 0.1)',
    dividerStyle: 'solid',
    sectionStyle: 'bordered',
    spacing: 'compact',
    gradient: {
      start: '#06B6D4',
      end: '#0891B2',
      direction: '90deg',
    },
  },
  {
    id: 'minimal-neutral',
    name: 'Minimal Neutral',
    description: 'Clean neutral theme for minimalist preferences',
    primary: '#374151',
    secondary: '#F9FAFB',
    background: '#FFFFFF',
    backgroundAlt: '#FAFAFA',
    text: '#111827',
    textSecondary: '#6B7280',
    textMuted: '#9CA3AF',
    border: '#E5E7EB',
    fontFamily: 'Inter',
    fontFamilyHeading: 'Inter',
    borderRadius: '4px',
    shadowStyle: 'none',
    shadowColor: 'transparent',
    dividerStyle: 'solid',
    sectionStyle: 'minimal',
    spacing: 'compact',
    gradient: {
      start: '#374151',
      end: '#1F2937',
      direction: '90deg',
    },
  },
  {
    id: 'glass-gradient',
    name: 'Glass Gradient',
    description: 'Modern glassmorphism theme with gradient effects',
    primary: '#6366F1',
    secondary: 'rgba(255, 255, 255, 0.7)',
    background: 'linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 50%, #C7D2FE 100%)',
    backgroundAlt: 'rgba(255, 255, 255, 0.5)',
    text: '#1F2937',
    textSecondary: '#4B5563',
    textMuted: '#9CA3AF',
    border: 'rgba(255, 255, 255, 0.3)',
    fontFamily: 'Inter',
    fontFamilyHeading: 'Poppins',
    borderRadius: '24px',
    shadowStyle: 'glass',
    shadowColor: 'rgba(99, 102, 241, 0.15)',
    dividerStyle: 'gradient',
    sectionStyle: 'glass',
    spacing: 'relaxed',
    gradient: {
      start: '#6366F1',
      end: '#8B5CF6',
      direction: '135deg',
    },
  },
  {
    id: 'gold-luxury',
    name: 'Gold Luxury',
    description: 'Premium gold theme for executive and luxury positions',
    primary: '#B8860B',
    secondary: '#FFFCF5',
    background: '#FFFFFF',
    backgroundAlt: '#FFFCF5',
    text: '#1C1917',
    textSecondary: '#78716C',
    textMuted: '#A8A29E',
    border: '#F5F5DC',
    fontFamily: 'Playfair Display',
    fontFamilyHeading: 'Playfair Display',
    borderRadius: '4px',
    shadowStyle: 'medium',
    shadowColor: 'rgba(184, 134, 11, 0.15)',
    dividerStyle: 'solid',
    sectionStyle: 'bordered',
    spacing: 'compact',
    gradient: {
      start: '#B8860B',
      end: '#D97706',
      direction: '135deg',
    },
  },
];

export const getTheme = (id: string): Theme => {
  const theme = themes.find((t) => t.id === id);
  if (!theme) {
    throw new Error(`Theme with id "${id}" not found`);
  }
  return theme;
};

export const getAllThemes = (): Theme[] => themes;