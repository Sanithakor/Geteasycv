/**
 * Shared Types for Resume Builder SaaS
 * Used across frontend and backend
 */

// ============================================
// AUTH TYPES
// ============================================

export type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'MANAGER' | 'SUPPORT' | 'USER';
export type UserStatus = 'ACTIVE' | 'SUSPENDED' | 'BANNED' | 'DELETED';

export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  role: UserRole;
  status: UserStatus;
  subscriptionId?: string;
  credits: number;
  storage: number;
  storageUsed: number;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
}

export interface AuthToken {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  name: string;
}

export interface AuthResponse {
  user: User;
  tokens: AuthToken;
}

// ============================================
// SUBSCRIPTION TYPES
// ============================================

export type SubscriptionTier = 'FREE' | 'PRO' | 'BUSINESS';
export type SubscriptionStatus = 'ACTIVE' | 'CANCELLED' | 'PAST_DUE' | 'PAUSED';

export interface SubscriptionPlan {
  id: string;
  name: string;
  tier: SubscriptionTier;
  monthlyPrice: number;
  yearlyPrice?: number;
  maxResumes: number;
  maxStorage: number;
  maxAITokens: number;
  features: string[];
  active: boolean;
}

export interface Subscription {
  id: string;
  userId: string;
  planId: string;
  plan?: SubscriptionPlan;
  status: SubscriptionStatus;
  currentPeriodStart?: Date;
  currentPeriodEnd?: Date;
  cancelledAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'bank';
  last4: string;
  brand: string;
  expiryMonth: number;
  expiryYear: number;
}

// ============================================
// RESUME TYPES
// ============================================

export type ResumeStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  linkedin?: string;
  github?: string;
  avatar?: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  achievements: string[];
  location?: string;
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  honors?: string[];
}

export interface SkillItem {
  id: string;
  name: string;
  level: number; // 1-100
  category: 'technical' | 'soft' | 'language' | 'tool';
}

export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link?: string;
  achievements?: string[];
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiryDate?: string;
}

export interface LanguageItem {
  id: string;
  name: string;
  proficiency: 'native' | 'fluent' | 'professional' | 'basic';
}

export interface ResumeContent {
  personal: PersonalInfo;
  summary?: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: SkillItem[];
  projects?: ProjectItem[];
  certifications?: CertificationItem[];
  languages?: LanguageItem[];
  awards?: Array<{
    id: string;
    name: string;
    issuer: string;
    date: string;
  }>;
}

export interface Resume {
  id: string;
  userId: string;
  title: string;
  slug: string;
  description?: string;
  templateId: string;
  content: ResumeContent;
  status: ResumeStatus;
  published: boolean;
  archived: boolean;
  publicUrl?: string;
  isPublic: boolean;
  views: number;
  downloads: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ResumeVersion {
  id: string;
  resumeId: string;
  content: ResumeContent;
  versionNumber: number;
  createdAt: Date;
}

// ============================================
// TEMPLATE TYPES
// ============================================

export type TemplateCategory =
  | 'MODERN'
  | 'MINIMAL'
  | 'CREATIVE'
  | 'PROFESSIONAL'
  | 'ATS_FRIENDLY'
  | 'EXECUTIVE'
  | 'STARTUP'
  | 'DESIGN'
  | 'LUXURY'
  | 'GLASSMORPHISM';

export type TemplatePremium = 'FREE' | 'PREMIUM';

export interface TemplateLayout {
  id: string;
  name: string;
  columns: number;
  sections: string[];
  spacing: 'compact' | 'normal' | 'relaxed';
}

export interface TemplateTheme {
  id: string;
  primary: string;
  secondary: string;
  background: string;
  text: string;
  accent: string;
  fontFamily: string;
  headingFontFamily: string;
  borderRadius: string;
  shadowStyle: 'soft' | 'medium' | 'hard' | 'none';
}

export interface ResumeTemplate {
  id: string;
  name: string;
  slug: string;
  description?: string;
  category: TemplateCategory;
  thumbnail: string;
  layout: TemplateLayout;
  theme: TemplateTheme;
  defaultContent?: ResumeContent;
  active: boolean;
  featured: boolean;
  premium: TemplatePremium;
  atsFriendly: boolean;
  darkMode: boolean;
  lightMode: boolean;
  views: number;
  usageCount: number;
  rating?: number;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================
// AI TYPES
// ============================================

export type AIModel = 'OPENAI' | 'CLAUDE' | 'GEMINI';
export type AITaskType =
  | 'REWRITE'
  | 'IMPROVE'
  | 'GENERATE_SUMMARY'
  | 'GENERATE_SKILLS'
  | 'GENERATE_COVER_LETTER'
  | 'TRANSLATE'
  | 'GRAMMAR_CHECK';

export interface AIRequest {
  model: AIModel;
  taskType: AITaskType;
  input: string;
  context?: string;
  temperature?: number;
  maxTokens?: number;
}

export interface AIResponse {
  output: string;
  tokensUsed: number;
  cost: number;
  model: AIModel;
}

export interface AIUsage {
  id: string;
  userId: string;
  model: AIModel;
  taskType: AITaskType;
  tokensUsed: number;
  cost: number;
  createdAt: Date;
}

// ============================================
// PAYMENT TYPES
// ============================================

export type PaymentStatus = 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';

export interface Payment {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  description?: string;
  receiptUrl?: string;
  createdAt: Date;
}

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  clientSecret?: string;
}

// ============================================
// EXPORT TYPES
// ============================================

export type ExportFormat = 'pdf' | 'docx' | 'png' | 'json';

export interface ExportOptions {
  format: ExportFormat;
  filename: string;
  includeMetadata?: boolean;
  theme?: 'light' | 'dark';
  pageSize?: 'letter' | 'a4';
}

// ============================================
// ACTIVITY LOG TYPES
// ============================================

export type ActivityAction =
  | 'CREATE'
  | 'UPDATE'
  | 'DELETE'
  | 'DOWNLOAD'
  | 'SHARE'
  | 'VIEW'
  | 'LOGIN'
  | 'LOGOUT';

export interface ActivityLog {
  id: string;
  userId: string;
  action: ActivityAction;
  resource: string;
  resourceId?: string;
  changes?: Record<string, unknown>;
  ipAddress?: string;
  createdAt: Date;
}

// ============================================
// API RESPONSE TYPES
// ============================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
  meta?: {
    timestamp: Date;
    requestId: string;
  };
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// ============================================
// FORM TYPES
// ============================================

export interface FormError {
  field: string;
  message: string;
}

export interface FormState {
  loading: boolean;
  errors: FormError[];
  success: boolean;
  message?: string;
}

// ============================================
// SETTINGS TYPES
// ============================================

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  language: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  autoSave: boolean;
  autoSaveInterval: number; // in seconds
}

export interface SystemSettings {
  appName: string;
  appUrl: string;
  logoUrl: string;
  faviconUrl: string;
  primaryColor: string;
  secondaryColor: string;
  maintenanceMode: boolean;
  maintenanceMessage?: string;
}

// ============================================
// ANALYTICS TYPES
// ============================================

export interface AnalyticsMetrics {
  date: Date;
  value: number;
  label?: string;
}

export interface DashboardStats {
  totalUsers: number;
  premiumUsers: number;
  freeUsers: number;
  activeUsers: number;
  newUsers: number;
  totalRevenue: number;
  monthlyRecurringRevenue: number;
  totalResumes: number;
  totalDownloads: number;
  avgStorageUsage: number;
}

// ============================================
// VALIDATION TYPES
// ============================================

export interface ValidationError {
  field: string;
  message: string;
  code?: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
}
