// Template Category System
// Maps templates to professional categories for enhanced filtering

export type TemplateCategory = {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  popularFor: string[];
  templateIds: string[];
  isActive: boolean;
  sortOrder: number;
  experienceLevel: ('fresher' | 'mid-level' | 'senior' | 'executive')[];
  industries: string[];
  styles: ('modern' | 'minimal' | 'creative' | 'professional' | 'ats-friendly')[];
};

export type ExperienceLevel = {
  id: 'fresher' | 'mid-level' | 'senior' | 'executive';
  name: string;
  description: string;
};

export type StyleCategory = {
  id: 'modern' | 'minimal' | 'creative' | 'professional' | 'ats-friendly';
  name: string;
  description: string;
};

export const experienceLevels: ExperienceLevel[] = [
  {
    id: 'fresher',
    name: 'Fresher / Entry Level',
    description: '0-2 years of experience'
  },
  {
    id: 'mid-level',
    name: 'Mid Level',
    description: '2-5 years of experience'
  },
  {
    id: 'senior',
    name: 'Senior Level',
    description: '5-10 years of experience'
  },
  {
    id: 'executive',
    name: 'Executive / Leadership',
    description: '10+ years with leadership experience'
  }
];

export const styleCategories: StyleCategory[] = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Contemporary designs with latest trends'
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean, simple, and focused layouts'
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Bold, artistic designs for creative roles'
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Traditional, corporate-friendly designs'
  },
  {
    id: 'ats-friendly',
    name: 'ATS-Friendly',
    description: 'Optimized for applicant tracking systems'
  }
];

// Template categories that map to resume categories and industries
export const templateCategories: TemplateCategory[] = [
  {
    id: 'software-development',
    name: 'Software Development',
    description: 'Templates optimized for software engineers and developers',
    icon: '💻',
    color: '#4F46E5',
    popularFor: [
      'Software Engineer',
      'Full Stack Developer',
      'Frontend Developer',
      'Backend Developer',
      'DevOps Engineer',
      'Mobile Developer'
    ],
    templateIds: [
      'sidebar-left-modern-blue',
      'sidebar-left-startup-green',
      'sidebar-left-cyan-tech',
      'two-column-split-modern-blue',
      'bento-grid-modern-blue',
      'dashboard-modern-blue',
      'single-column-ats-minimal-neutral',
      'compact-ats-minimal-neutral',
      'glassmorphism-modern-blue',
      'startup-style-startup-green'
    ],
    isActive: true,
    sortOrder: 1,
    experienceLevel: ['fresher', 'mid-level', 'senior'],
    industries: ['Technology', 'Software', 'Internet', 'Gaming', 'Fintech'],
    styles: ['modern', 'ats-friendly', 'professional']
  },
  {
    id: 'ui-ux-design',
    name: 'UI/UX Design',
    description: 'Creative templates for designers and design professionals',
    icon: '🎨',
    color: '#EC4899',
    popularFor: [
      'UI/UX Designer',
      'Product Designer',
      'Graphic Designer',
      'Visual Designer',
      'Design Systems Designer'
    ],
    templateIds: [
      'creative-designer-creative-orange',
      'portfolio-hybrid-rose-red',
      'magazine-luxury-purple',
      'editorial-rose-red',
      'glassmorphism-glass-gradient',
      'bento-grid-creative-orange',
      'luxury-minimal-luxury-purple',
      'gradient-accent-glass-gradient'
    ],
    isActive: true,
    sortOrder: 2,
    experienceLevel: ['fresher', 'mid-level', 'senior'],
    industries: ['Design', 'Technology', 'Media', 'Advertising', 'Entertainment'],
    styles: ['creative', 'modern', 'minimal']
  },
  {
    id: 'marketing-digital',
    name: 'Marketing & Digital',
    description: 'Templates for marketing professionals and growth specialists',
    icon: '📈',
    color: '#10B981',
    popularFor: [
      'Digital Marketing Manager',
      'Growth Marketing Manager',
      'Content Marketing Specialist',
      'Social Media Manager',
      'Brand Manager'
    ],
    templateIds: [
      'sidebar-right-startup-green',
      'two-column-split-startup-green',
      'dashboard-startup-green',
      'modern-card-startup-green',
      'magazine-creative-orange',
      'editorial-creative-orange',
      'gradient-accent-startup-green',
      'single-column-ats-startup-green'
    ],
    isActive: true,
    sortOrder: 3,
    experienceLevel: ['fresher', 'mid-level', 'senior'],
    industries: ['Marketing', 'Advertising', 'E-commerce', 'Media', 'Technology'],
    styles: ['modern', 'creative', 'professional']
  },
  {
    id: 'sales-business',
    name: 'Sales & Business Development',
    description: 'Professional templates for sales and business professionals',
    icon: '🤝',
    color: '#F59E0B',
    popularFor: [
      'Sales Manager',
      'Business Development Manager',
      'Account Executive',
      'Sales Representative',
      'Account Manager'
    ],
    templateIds: [
      'executive-dark-executive',
      'sidebar-left-gold-luxury',
      'two-column-split-gold-luxury',
      'dashboard-gold-luxury',
      'premium-dark-dark-executive',
      'single-column-ats-gold-luxury',
      'compact-ats-gold-luxury',
      'modern-card-gold-luxury'
    ],
    isActive: true,
    sortOrder: 4,
    experienceLevel: ['fresher', 'mid-level', 'senior', 'executive'],
    industries: ['Sales', 'Business', 'Finance', 'Real Estate', 'Insurance'],
    styles: ['professional', 'ats-friendly', 'modern']
  },
  {
    id: 'finance-accounting',
    name: 'Finance & Accounting',
    description: 'Conservative templates for finance and accounting roles',
    icon: '💰',
    color: '#6366F1',
    popularFor: [
      'Financial Analyst',
      'Accountant',
      'Investment Manager',
      'Finance Manager',
      'CFO'
    ],
    templateIds: [
      'executive-gold-luxury',
      'single-column-ats-minimal-neutral',
      'compact-ats-minimal-neutral',
      'sidebar-left-minimal-neutral',
      'two-column-split-minimal-neutral',
      'premium-dark-dark-executive',
      'dashboard-modern-blue'
    ],
    isActive: true,
    sortOrder: 5,
    experienceLevel: ['mid-level', 'senior', 'executive'],
    industries: ['Finance', 'Banking', 'Investment', 'Accounting', 'Insurance'],
    styles: ['professional', 'ats-friendly', 'minimal']
  },
  {
    id: 'data-science',
    name: 'Data Science & Analytics',
    description: 'Technical templates for data professionals and analysts',
    icon: '📊',
    color: '#06B6D4',
    popularFor: [
      'Data Scientist',
      'Data Analyst',
      'Machine Learning Engineer',
      'Business Analyst',
      'Research Analyst'
    ],
    templateIds: [
      'dashboard-cyan-tech',
      'sidebar-left-cyan-tech',
      'bento-grid-cyan-tech',
      'two-column-split-cyan-tech',
      'modern-card-cyan-tech',
      'single-column-ats-cyan-tech',
      'glassmorphism-cyan-tech'
    ],
    isActive: true,
    sortOrder: 6,
    experienceLevel: ['fresher', 'mid-level', 'senior'],
    industries: ['Technology', 'Consulting', 'Finance', 'Healthcare', 'Research'],
    styles: ['modern', 'professional', 'ats-friendly']
  },
  {
    id: 'healthcare-medical',
    name: 'Healthcare & Medical',
    description: 'Professional templates for healthcare professionals',
    icon: '🏥',
    color: '#059669',
    popularFor: [
      'Doctor',
      'Nurse',
      'Healthcare Administrator',
      'Medical Researcher',
      'Pharmacist'
    ],
    templateIds: [
      'single-column-ats-minimal-neutral',
      'compact-ats-minimal-neutral',
      'sidebar-left-minimal-neutral',
      'executive-minimal-neutral',
      'two-column-split-minimal-neutral',
      'modern-card-minimal-neutral'
    ],
    isActive: true,
    sortOrder: 7,
    experienceLevel: ['fresher', 'mid-level', 'senior', 'executive'],
    industries: ['Healthcare', 'Medical', 'Pharmaceutical', 'Biotechnology'],
    styles: ['professional', 'ats-friendly', 'minimal']
  },
  {
    id: 'education-research',
    name: 'Education & Research',
    description: 'Academic templates for educators and researchers',
    icon: '🎓',
    color: '#8B5CF6',
    popularFor: [
      'Teacher',
      'Professor',
      'Research Scientist',
      'Academic Administrator',
      'Education Specialist'
    ],
    templateIds: [
      'single-column-ats-minimal-neutral',
      'sidebar-left-minimal-neutral',
      'executive-luxury-purple',
      'luxury-minimal-luxury-purple',
      'editorial-luxury-purple',
      'two-column-split-minimal-neutral'
    ],
    isActive: true,
    sortOrder: 8,
    experienceLevel: ['fresher', 'mid-level', 'senior', 'executive'],
    industries: ['Education', 'Research', 'Academia', 'Non-profit'],
    styles: ['professional', 'minimal', 'ats-friendly']
  },
  {
    id: 'project-management',
    name: 'Project Management',
    description: 'Organized templates for project managers and coordinators',
    icon: '📋',
    color: '#7C3AED',
    popularFor: [
      'Project Manager',
      'Program Manager',
      'Scrum Master',
      'Product Manager',
      'Operations Manager'
    ],
    templateIds: [
      'dashboard-modern-blue',
      'executive-modern-blue',
      'sidebar-left-modern-blue',
      'two-column-split-modern-blue',
      'bento-grid-modern-blue',
      'modern-card-modern-blue',
      'single-column-ats-modern-blue'
    ],
    isActive: true,
    sortOrder: 9,
    experienceLevel: ['mid-level', 'senior', 'executive'],
    industries: ['Technology', 'Construction', 'Consulting', 'Manufacturing'],
    styles: ['professional', 'modern', 'ats-friendly']
  },
  {
    id: 'executive-leadership',
    name: 'Executive & Leadership',
    description: 'Premium templates for C-level and senior leadership roles',
    icon: '👔',
    color: '#B8860B',
    popularFor: [
      'CEO',
      'CTO',
      'VP',
      'Director',
      'Senior Manager',
      'Department Head'
    ],
    templateIds: [
      'executive-gold-luxury',
      'luxury-minimal-gold-luxury',
      'premium-dark-dark-executive',
      'executive-dark-executive',
      'sidebar-left-gold-luxury',
      'editorial-gold-luxury'
    ],
    isActive: true,
    sortOrder: 10,
    experienceLevel: ['executive'],
    industries: ['All Industries'],
    styles: ['professional', 'minimal']
  },
  {
    id: 'creative-arts',
    name: 'Creative & Arts',
    description: 'Artistic templates for creative professionals and artists',
    icon: '🎭',
    color: '#F97316',
    popularFor: [
      'Artist',
      'Photographer',
      'Writer',
      'Creative Director',
      'Content Creator'
    ],
    templateIds: [
      'creative-designer-creative-orange',
      'portfolio-hybrid-creative-orange',
      'magazine-creative-orange',
      'editorial-creative-orange',
      'glassmorphism-glass-gradient',
      'gradient-accent-creative-orange'
    ],
    isActive: true,
    sortOrder: 11,
    experienceLevel: ['fresher', 'mid-level', 'senior'],
    industries: ['Entertainment', 'Media', 'Publishing', 'Advertising'],
    styles: ['creative', 'modern']
  },
  {
    id: 'student-entry-level',
    name: 'Student & Entry Level',
    description: 'Clean templates perfect for students and new graduates',
    icon: '🎒',
    color: '#06B6D4',
    popularFor: [
      'Student',
      'Recent Graduate',
      'Intern',
      'Entry Level Professional'
    ],
    templateIds: [
      'single-column-ats-modern-blue',
      'single-column-ats-startup-green',
      'compact-ats-modern-blue',
      'sidebar-left-modern-blue',
      'centered-modern-blue',
      'modern-card-startup-green',
      'two-column-split-modern-blue'
    ],
    isActive: true,
    sortOrder: 12,
    experienceLevel: ['fresher'],
    industries: ['All Industries'],
    styles: ['modern', 'ats-friendly', 'professional']
  }
];

// Utility functions
export const getTemplateCategory = (id: string): TemplateCategory | undefined => {
  return templateCategories.find(cat => cat.id === id);
};

export const getActiveCategoriesForTemplates = (): TemplateCategory[] => {
  return templateCategories.filter(cat => cat.isActive).sort((a, b) => a.sortOrder - b.sortOrder);
};

export const getCategoriesForExperienceLevel = (level: ExperienceLevel['id']): TemplateCategory[] => {
  return templateCategories.filter(cat => cat.experienceLevel.includes(level));
};

export const getCategoriesForStyle = (style: StyleCategory['id']): TemplateCategory[] => {
  return templateCategories.filter(cat => cat.styles.includes(style));
};

export const getTemplateIdsForCategory = (categoryId: string): string[] => {
  const category = getTemplateCategory(categoryId);
  return category ? category.templateIds : [];
};

export const getAllIndustries = (): string[] => {
  const industries = new Set<string>();
  templateCategories.forEach(cat => {
    cat.industries.forEach(industry => industries.add(industry));
  });
  return Array.from(industries).sort();
};

// Function to check if a template belongs to specific categories
export const isTemplateInCategory = (templateId: string, categoryId: string): boolean => {
  const category = getTemplateCategory(categoryId);
  return category ? category.templateIds.includes(templateId) : false;
};

// Function to get all categories a template belongs to
export const getCategoriesForTemplate = (templateId: string): TemplateCategory[] => {
  return templateCategories.filter(cat => cat.templateIds.includes(templateId));
};