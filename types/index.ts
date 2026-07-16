/**
 * Type Definitions for Resume Builder SaaS
 * Centralized type definitions for entire application
 */

// ============================================================================
// AUTH TYPES
// ============================================================================

export type UserRole = 'user' | 'admin' | 'editor' | 'support';
export type SubscriptionTier = 'free' | 'pro' | 'premium';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: UserRole;
  tier: SubscriptionTier;
  // JSON.parse / fetch responses always deserialize dates as ISO strings.
  // Using `Date` here was a TypeScript lie — calling Date methods on these
  // would throw at runtime. Parse to Date at the call site if needed.
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload {
  email: string;
  password: string;
  name: string;
}

export interface OAuthPayload {
  provider: 'google' | 'github';
  token: string;
  profile: {
    id: string;
    email: string;
    name: string;
    avatar?: string;
  };
}

// ============================================================================
// RESUME TYPES
// ============================================================================

export type ResumeStatus = 'draft' | 'published' | 'archived';

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
  endDate?: string;
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
  endDate?: string;
  gpa?: string;
  honors?: string[];
}

export interface SkillItem {
  id: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  category?: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link?: string;
  startDate?: string;
  endDate?: string;
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiryDate?: string;
  link?: string;
}

export interface LanguageItem {
  id: string;
  name: string;
  proficiency: 'native' | 'fluent' | 'professional' | 'basic';
}

export interface ResumeSections {
  personal: PersonalInfo;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: SkillItem[];
  projects?: ProjectItem[];
  certifications?: CertificationItem[];
  languages?: LanguageItem[];
  summary?: string;
  awards?: string[];
  references?: string[];
}

export interface Resume {
  id: string;
  userId: string;
  title: string;
  slug: string;
  templateId: string;
  content: ResumeSections;
  status: ResumeStatus;
  isPublic: boolean;
  shareToken?: string;
  downloads: number;
  views: number;
  version: number;
  createdAt: string;
  updatedAt: string;
}

export interface ResumeCreatePayload {
  title: string;
  templateId: string;
  content?: Partial<ResumeSections>;
}

export interface ResumeUpdatePayload {
  title?: string;
  content?: Partial<ResumeSections>;
  status?: ResumeStatus;
  isPublic?: boolean;
}

// ============================================================================
// TEMPLATE TYPES
// ============================================================================

export type LayoutType = 
  | 'single-column'
  | 'sidebar-left'
  | 'sidebar-right'
  | 'two-column'
  | 'timeline'
  | 'bento'
  | 'minimal';

export type BlockType = 
  | 'header'
  | 'summary'
  | 'experience'
  | 'education'
  | 'skills'
  | 'projects'
  | 'certifications'
  | 'languages'
  | 'custom';

export interface BlockConfig {
  id: string;
  type: BlockType;
  label: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  visible: boolean;
  styling: {
    padding: string;
    margin: string;
    backgroundColor?: string;
    borderColor?: string;
    borderRadius?: string;
    shadow?: string;
  };
}

export interface ThemeConfig {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  fontFamily: string;
  fontSize: number;
  lineHeight: number;
}

export interface Template {
  id: string;
  name: string;
  slug: string;
  category: string;
  layout: LayoutType;
  blocks: BlockConfig[];
  theme: ThemeConfig;
  thumbnail: string;
  preview?: string;
  isPremium: boolean;
  isATS: boolean;
  isRTL: boolean;
  downloads: number;
  uses: number;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

// ============================================================================
// SUBSCRIPTION & PAYMENT TYPES
// ============================================================================

export type PlanName = 'free' | 'pro' | 'premium';
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';

export interface Plan {
  id: string;
  name: PlanName;
  price: number;
  currency: string;
  billing: 'monthly' | 'annual';
  features: string[];
  limits: {
    resumes: number;
    templates: number;
    storage: number; // MB
    aiCredits: number;
    downloads: number;
  };
}

export interface Subscription {
  id: string;
  userId: string;
  plan: PlanName;
  status: 'active' | 'canceled' | 'expired' | 'paused';
  stripeId?: string;
  currentPeriodStart?: string;
  currentPeriodEnd?: string;
  canceledAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Payment {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  description?: string;
  stripePaymentId?: string;
  invoiceUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Coupon {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  maxUses?: number;
  currentUses: number;
  validFrom: string;
  validUntil: string;
  active: boolean;
}

// ============================================================================
// AI TYPES
// ============================================================================

export type AIProvider = 'openai' | 'claude' | 'gemini';

export interface AIRequest {
  type: 'improve' | 'rewrite' | 'summarize' | 'generate' | 'translate';
  content: string;
  context?: string;
  language?: string;
}

export interface AIResponse {
  content: string;
  usage: {
    inputTokens: number;
    outputTokens: number;
  };
  provider: AIProvider;
}

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
  };
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// ============================================================================
// UI STATE TYPES
// ============================================================================

export interface LoadingState {
  isLoading: boolean;
  error?: string;
}

export interface PaginationState {
  page: number;
  limit: number;
  total: number;
}

export interface FilterState {
  search?: string;
  category?: string;
  status?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// ============================================================================
// ANALYTICS TYPES
// ============================================================================

export interface Analytics {
  totalUsers: number;
  premiumUsers: number;
  freeUsers: number;
  totalResumes: number;
  totalTemplates: number;
  totalDownloads: number;
  totalRevenue: number;
  activeSubscriptions: number;
  churnRate: number;
}

export interface UserAnalytics {
  userId: string;
  resumesCreated: number;
  resumesDownloaded: number;
  lastActive: string;
  templatePreferences: string[];
}

// ============================================================================
// ADMIN TYPES
// ============================================================================

export interface AdminStats {
  users: {
    total: number;
    active: number;
    newThisMonth: number;
  };
  revenue: {
    total: number;
    thisMonth: number;
    thisYear: number;
  };
  resumes: {
    total: number;
    downloads: number;
    averageRating: number;
  };
}

// ============================================================================
// ERROR TYPES
// ============================================================================

export class AppError extends Error {
  constructor(
    public code: string,
    public statusCode: number,
    message: string
  ) {
    super(message);
    this.name = 'AppError';
  }
}

// ============================================================================
// VALIDATION SCHEMAS
// ============================================================================

export interface ValidationError {
  field: string;
  message: string;
}
