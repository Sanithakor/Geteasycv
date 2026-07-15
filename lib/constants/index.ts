/**
 * Application Constants
 */

// ============================================
// APP
// ============================================

export const APP_NAME = 'ResumePro';
export const APP_VERSION = '1.0.0';
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// ============================================
// SUBSCRIPTION PLANS
// ============================================

export const SUBSCRIPTION_PLANS = {
  FREE: {
    id: 'free',
    name: 'Free',
    tier: 'FREE' as const,
    monthlyPrice: 0,
    maxResumes: 1,
    maxStorage: 104857600, // 100MB
    maxAITokens: 0,
    features: [
      '1 Resume',
      'Basic Templates',
      '100MB Storage',
      'Email Support',
    ],
  },
  PRO: {
    id: 'pro',
    name: 'Pro',
    tier: 'PRO' as const,
    monthlyPrice: 999, // $9.99 in cents
    yearlyPrice: 9990, // $99.90 in cents
    maxResumes: 5,
    maxStorage: 1073741824, // 1GB
    maxAITokens: 10000,
    features: [
      '5 Resumes',
      'All Templates',
      '1GB Storage',
      'AI Assistant',
      'Cover Letters',
      'Priority Support',
    ],
  },
  BUSINESS: {
    id: 'business',
    name: 'Business',
    tier: 'BUSINESS' as const,
    monthlyPrice: 1999, // $19.99 in cents
    yearlyPrice: 19990, // $199.90 in cents
    maxResumes: 999,
    maxStorage: 5368709120, // 5GB
    maxAITokens: 999999,
    features: [
      'Unlimited Resumes',
      'Premium Templates',
      '5GB Storage',
      'Unlimited AI',
      'Team Collaboration',
      'Priority Support',
      'Analytics',
      'Custom Domain',
    ],
  },
};

// ============================================
// STORAGE LIMITS
// ============================================

export const STORAGE_LIMITS = {
  FREE: 100 * 1024 * 1024, // 100MB
  PRO: 1 * 1024 * 1024 * 1024, // 1GB
  BUSINESS: 5 * 1024 * 1024 * 1024, // 5GB
};

export const FILE_UPLOAD_LIMITS = {
  maxFileSize: 10 * 1024 * 1024, // 10MB
  allowedFormats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
};

// ============================================
// TEMPLATE CATEGORIES
// ============================================

export const TEMPLATE_CATEGORIES = [
  'MODERN',
  'MINIMAL',
  'CREATIVE',
  'PROFESSIONAL',
  'ATS_FRIENDLY',
  'EXECUTIVE',
  'STARTUP',
  'DESIGN',
  'LUXURY',
  'GLASSMORPHISM',
] as const;

export const CATEGORY_LABELS: Record<string, string> = {
  MODERN: 'Modern',
  MINIMAL: 'Minimal',
  CREATIVE: 'Creative',
  PROFESSIONAL: 'Professional',
  ATS_FRIENDLY: 'ATS Friendly',
  EXECUTIVE: 'Executive',
  STARTUP: 'Startup',
  DESIGN: 'Design',
  LUXURY: 'Luxury',
  GLASSMORPHISM: 'Glassmorphism',
};

// ============================================
// COLORS & THEMES
// ============================================

export const DEFAULT_THEME = {
  primary: '#4F46E5',
  secondary: '#06B6D4',
  accent: '#F59E0B',
  background: '#FFFFFF',
  foreground: '#000000',
};

export const THEME_MODES = ['light', 'dark', 'auto'] as const;

// ============================================
// EXPORT FORMATS
// ============================================

export const EXPORT_FORMATS = {
  PDF: 'pdf' as const,
  DOCX: 'docx' as const,
  PNG: 'png' as const,
  JSON: 'json' as const,
};

export const EXPORT_FORMAT_LABELS: Record<string, string> = {
  pdf: 'PDF',
  docx: 'Word (.docx)',
  png: 'Image (PNG)',
  json: 'JSON',
};

export const PAGE_SIZES = {
  LETTER: 'letter',
  A4: 'a4',
} as const;

// ============================================
// AI MODELS & TASKS
// ============================================

export const AI_MODELS = ['OPENAI', 'CLAUDE', 'GEMINI'] as const;

export const AI_TASKS = {
  REWRITE: 'Rewrite',
  IMPROVE: 'Improve',
  GENERATE_SUMMARY: 'Generate Summary',
  GENERATE_SKILLS: 'Generate Skills',
  GENERATE_COVER_LETTER: 'Generate Cover Letter',
  TRANSLATE: 'Translate',
  GRAMMAR_CHECK: 'Grammar Check',
} as const;

export const AI_TOKENS_PER_TASK: Record<string, number> = {
  REWRITE: 100,
  IMPROVE: 150,
  GENERATE_SUMMARY: 200,
  GENERATE_SKILLS: 300,
  GENERATE_COVER_LETTER: 500,
  TRANSLATE: 200,
  GRAMMAR_CHECK: 50,
};

// ============================================
// USER ROLES
// ============================================

export const USER_ROLES = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  ADMIN: 'ADMIN',
  MANAGER: 'MANAGER',
  SUPPORT: 'SUPPORT',
  USER: 'USER',
} as const;

export const ROLE_LABELS: Record<string, string> = {
  SUPER_ADMIN: 'Super Admin',
  ADMIN: 'Admin',
  MANAGER: 'Manager',
  SUPPORT: 'Support',
  USER: 'User',
};

// ============================================
// PAGINATION
// ============================================

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
};

// ============================================
// CACHE DURATIONS (in seconds)
// ============================================

export const CACHE_DURATIONS = {
  SHORT: 5 * 60, // 5 minutes
  MEDIUM: 30 * 60, // 30 minutes
  LONG: 24 * 60 * 60, // 24 hours
  USER: 60, // 1 minute for user data
  TEMPLATES: 24 * 60 * 60, // 24 hours for templates
};

// ============================================
// API STATUS CODES
// ============================================

export const API_ERRORS = {
  UNAUTHORIZED: {
    code: 'UNAUTHORIZED',
    message: 'You are not authorized to perform this action',
    status: 401,
  },
  FORBIDDEN: {
    code: 'FORBIDDEN',
    message: 'Access forbidden',
    status: 403,
  },
  NOT_FOUND: {
    code: 'NOT_FOUND',
    message: 'Resource not found',
    status: 404,
  },
  CONFLICT: {
    code: 'CONFLICT',
    message: 'Resource already exists',
    status: 409,
  },
  RATE_LIMITED: {
    code: 'RATE_LIMITED',
    message: 'Too many requests. Please try again later',
    status: 429,
  },
  INVALID_INPUT: {
    code: 'INVALID_INPUT',
    message: 'Invalid input provided',
    status: 400,
  },
  SERVER_ERROR: {
    code: 'SERVER_ERROR',
    message: 'Internal server error',
    status: 500,
  },
};

// ============================================
// ACTIVITY ACTIONS
// ============================================

export const ACTIVITY_ACTIONS = {
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
  DOWNLOAD: 'DOWNLOAD',
  SHARE: 'SHARE',
  VIEW: 'VIEW',
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
} as const;

// ============================================
// NOTIFICATION TYPES
// ============================================

export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
} as const;

// ============================================
// VALIDATION PATTERNS
// ============================================

export const VALIDATION_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^\+?[\d\s\-()]{10,}$/,
  URL: /^https?:\/\/[^\s]+$/,
  SLUG: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
};

// ============================================
// TIME FORMATS
// ============================================

export const TIME_FORMATS = {
  DISPLAY: 'MMM d, yyyy',
  DISPLAY_TIME: 'MMM d, yyyy h:mm a',
  ISO: "yyyy-MM-dd'T'HH:mm:ss.SSSxxx",
};

// ============================================
// FEATURE FLAGS
// ============================================

export const FEATURE_FLAGS = {
  AI_ENABLED: process.env.NEXT_PUBLIC_AI_ENABLED === 'true',
  PAYMENTS_ENABLED: process.env.NEXT_PUBLIC_PAYMENTS_ENABLED === 'true',
  TEAM_COLLABORATION: process.env.NEXT_PUBLIC_TEAM_COLLABORATION === 'true',
  ANALYTICS_ENABLED: process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === 'true',
  CMS_ENABLED: process.env.NEXT_PUBLIC_CMS_ENABLED === 'true',
};
