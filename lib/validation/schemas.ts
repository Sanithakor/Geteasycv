/**
 * Zod Validation Schemas for Resume Builder SaaS
 */

import { z } from 'zod';

// ============================================
// AUTH SCHEMAS
// ============================================

export const LoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type LoginInput = z.infer<typeof LoginSchema>;

export const RegisterSchema = z
  .object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
    name: z.string().min(2, 'Name must be at least 2 characters'),
    terms: z.boolean().refine((val) => val === true, 'You must accept the terms'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type RegisterInput = z.infer<typeof RegisterSchema>;

// ============================================
// RESUME SCHEMAS
// ============================================

export const PersonalInfoSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(10, 'Invalid phone number'),
  location: z.string().min(1, 'Location is required'),
  website: z.string().url().optional().or(z.literal('')),
  linkedin: z.string().url().optional().or(z.literal('')),
  github: z.string().url().optional().or(z.literal('')),
  avatar: z.string().url().optional().or(z.literal('')),
});

export const ExperienceItemSchema = z.object({
  id: z.string(),
  company: z.string().min(1, 'Company name is required'),
  position: z.string().min(1, 'Position is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional(),
  current: z.boolean().default(false),
  description: z.string().optional(),
  achievements: z.array(z.string()).default([]),
  location: z.string().optional(),
});

export const EducationItemSchema = z.object({
  id: z.string(),
  institution: z.string().min(1, 'Institution name is required'),
  degree: z.string().min(1, 'Degree is required'),
  field: z.string().min(1, 'Field of study is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  gpa: z.string().optional(),
  honors: z.array(z.string()).optional(),
});

export const SkillItemSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Skill name is required'),
  level: z.number().min(1).max(100),
  category: z.enum(['technical', 'soft', 'language', 'tool']),
});

export const ResumeContentSchema = z.object({
  personal: PersonalInfoSchema,
  summary: z.string().optional(),
  experience: z.array(ExperienceItemSchema),
  education: z.array(EducationItemSchema),
  skills: z.array(SkillItemSchema),
  projects: z.array(z.any()).optional(),
  certifications: z.array(z.any()).optional(),
  languages: z.array(z.any()).optional(),
  awards: z.array(z.any()).optional(),
});

export const CreateResumeSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  description: z.string().optional(),
  templateId: z.string().min(1, 'Template is required'),
  content: ResumeContentSchema.optional(),
});

export const UpdateResumeSchema = CreateResumeSchema.partial();

export type CreateResumeInput = z.infer<typeof CreateResumeSchema>;
export type UpdateResumeInput = z.infer<typeof UpdateResumeSchema>;

// ============================================
// TEMPLATE SCHEMAS
// ============================================

export const TemplateLayoutSchema = z.object({
  id: z.string(),
  name: z.string(),
  columns: z.number().min(1).max(3),
  sections: z.array(z.string()),
  spacing: z.enum(['compact', 'normal', 'relaxed']),
});

export const TemplateThemeSchema = z.object({
  id: z.string(),
  primary: z.string().regex(/^#[0-9a-f]{6}$/i, 'Invalid color'),
  secondary: z.string().regex(/^#[0-9a-f]{6}$/i, 'Invalid color'),
  background: z.string().regex(/^#[0-9a-f]{6}$/i, 'Invalid color'),
  text: z.string().regex(/^#[0-9a-f]{6}$/i, 'Invalid color'),
  accent: z.string().regex(/^#[0-9a-f]{6}$/i, 'Invalid color'),
  fontFamily: z.string(),
  headingFontFamily: z.string(),
  borderRadius: z.string(),
  shadowStyle: z.enum(['soft', 'medium', 'hard', 'none']),
});

export const CreateTemplateSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  slug: z.string().min(1, 'Slug is required'),
  description: z.string().optional(),
  category: z.enum([
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
  ]),
  thumbnail: z.string().url(),
  layout: TemplateLayoutSchema,
  theme: TemplateThemeSchema,
  featured: z.boolean().optional(),
  premium: z.enum(['FREE', 'PREMIUM']).optional(),
});

export type CreateTemplateInput = z.infer<typeof CreateTemplateSchema>;

// ============================================
// AI SCHEMAS
// ============================================

export const AIRequestSchema = z.object({
  model: z.enum(['OPENAI', 'CLAUDE', 'GEMINI']),
  taskType: z.enum([
    'REWRITE',
    'IMPROVE',
    'GENERATE_SUMMARY',
    'GENERATE_SKILLS',
    'GENERATE_COVER_LETTER',
    'TRANSLATE',
    'GRAMMAR_CHECK',
  ]),
  input: z.string().min(1, 'Input is required').max(10000),
  context: z.string().optional(),
  temperature: z.number().min(0).max(1).optional(),
  maxTokens: z.number().min(100).max(2000).optional(),
});

export type AIRequestInput = z.infer<typeof AIRequestSchema>;

// ============================================
// USER SCHEMAS
// ============================================

export const UpdateUserProfileSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  avatar: z.string().url().optional(),
  preferences: z.object({
    theme: z.enum(['light', 'dark', 'auto']).optional(),
    language: z.string().optional(),
    emailNotifications: z.boolean().optional(),
    autoSave: z.boolean().optional(),
  }).optional(),
});

export type UpdateUserProfileInput = z.infer<typeof UpdateUserProfileSchema>;

// ============================================
// SUBSCRIPTION SCHEMAS
// ============================================

export const SubscribeSchema = z.object({
  planId: z.string().min(1, 'Plan is required'),
  paymentMethodId: z.string().optional(),
  billingCycle: z.enum(['monthly', 'yearly']).optional(),
});

export type SubscribeInput = z.infer<typeof SubscribeSchema>;

// ============================================
// ADMIN SCHEMAS
// ============================================

export const AdminUserSchema = z.object({
  id: z.string().optional(),
  email: z.string().email(),
  name: z.string().min(2),
  role: z.enum(['SUPER_ADMIN', 'ADMIN', 'MANAGER', 'SUPPORT', 'USER']),
  status: z.enum(['ACTIVE', 'SUSPENDED', 'BANNED', 'DELETED']),
  credits: z.number().optional(),
  storage: z.number().optional(),
});

export type AdminUserInput = z.infer<typeof AdminUserSchema>;

export const AdminSettingsSchema = z.object({
  key: z.string().min(1),
  value: z.any(),
  description: z.string().optional(),
});

export type AdminSettingsInput = z.infer<typeof AdminSettingsSchema>;

// ============================================
// PAGINATION SCHEMAS
// ============================================

export const PaginationSchema = z.object({
  page: z.number().min(1).default(1),
  pageSize: z.number().min(1).max(100).default(20),
  sort: z.string().optional(),
  order: z.enum(['asc', 'desc']).optional(),
});

export type PaginationInput = z.infer<typeof PaginationSchema>;

// ============================================
// EXPORT SCHEMAS
// ============================================

export const ExportSchema = z.object({
  format: z.enum(['pdf', 'docx', 'png', 'json']),
  filename: z.string().optional(),
  theme: z.enum(['light', 'dark']).optional(),
  pageSize: z.enum(['letter', 'a4']).optional(),
});

export type ExportInput = z.infer<typeof ExportSchema>;

// ============================================
// COUPON SCHEMAS
// ============================================

export const ApplyCouponSchema = z.object({
  code: z.string().min(1, 'Coupon code is required'),
});

export type ApplyCouponInput = z.infer<typeof ApplyCouponSchema>;

export const CreateCouponSchema = z.object({
  code: z.string().min(3).max(20),
  type: z.enum(['percentage', 'fixed']),
  value: z.number().min(1),
  maxUses: z.number().optional(),
  expiresAt: z.string().optional(),
});

export type CreateCouponInput = z.infer<typeof CreateCouponSchema>;

// ============================================
// MEDIA LIBRARY SCHEMAS
// ============================================

export const MediaUploadSchema = z.object({
  type: z.enum(['IMAGE', 'ICON', 'LOGO', 'PATTERN', 'BACKGROUND', 'FONT']),
  name: z.string().min(1),
  description: z.string().optional(),
  file: z.instanceof(File),
});

export type MediaUploadInput = z.infer<typeof MediaUploadSchema>;
