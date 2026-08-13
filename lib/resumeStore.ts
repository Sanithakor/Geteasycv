/**
 * In-memory resume store to ensure persistence across API requests
 * during session and database fallback modes. Updated.
 */

export interface ResumeStoreItem {
  id: string;
  userId: string;
  title: string;
  slug: string;
  templateId: string;
  status: string;
  isPublic?: boolean;
  downloads: number;
  views: number;
  updatedAt: string;
  createdAt: string;
  summary?: string;
  personal?: any;
  experience?: any[];
  education?: any[];
  skills?: any[];
  projects?: any[];
  certifications?: any[];
  languages?: any[];
  cvData?: any;
  customTheme?: any;
  selectedLayout?: any;
  sectionVariants?: any;
  sectionOrder?: any[];
  template?: {
    id: string;
    name: string;
    thumbnail: string | null;
  };
}

// Global persistent store across hot reloads in development
const globalForResumeStore = globalThis as unknown as {
  inMemoryResumes: Map<string, ResumeStoreItem> | undefined;
};

const store = globalForResumeStore.inMemoryResumes ?? new Map<string, ResumeStoreItem>();
if (process.env.NODE_ENV !== 'production') {
  globalForResumeStore.inMemoryResumes = store;
}

// Initialize with sample mock entries if empty
if (store.size === 0) {
  store.set('mock-resume-1', {
    id: 'mock-resume-1',
    userId: 'mock-user-1',
    title: 'Senior Software Engineer Resume',
    slug: 'senior-software-engineer-resume',
    templateId: 'sidebar-left-modern-blue',
    status: 'published',
    downloads: 14,
    views: 45,
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    personal: {
      firstName: 'John',
      lastName: 'Doe',
      title: 'Senior Software Engineer',
      email: 'john.doe@example.com',
      phone: '+1 555 123 4567',
      location: 'San Francisco, CA',
      website: 'portfolio.com',
      linkedin: 'linkedin.com/in/john-doe',
    },
    summary: 'Senior full-stack engineer with 8+ years of experience designing and developing highly scalable SaaS solutions...',
    template: {
      id: 'sidebar-left-modern-blue',
      name: 'Sidebar Left Modern Blue',
      thumbnail: null,
    },
  });

  store.set('mock-resume-2', {
    id: 'mock-resume-2',
    userId: 'mock-user-1',
    title: 'UX/UI Designer Portfolio CV',
    slug: 'ux-ui-designer-portfolio-cv',
    templateId: 'creative-designer-creative-orange',
    status: 'draft',
    downloads: 8,
    views: 22,
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    personal: {
      firstName: 'Emily',
      lastName: 'Clark',
      title: 'UX/UI Designer',
      email: 'emily.clark@example.com',
      phone: '+1 555 987 6543',
      location: 'New York, NY',
      website: 'emilydesign.com',
      linkedin: 'linkedin.com/in/emily-clark',
    },
    summary: 'Creative and detail-oriented UX/UI designer with 5+ years of experience designing mobile and desktop applications...',
    template: {
      id: 'creative-designer-creative-orange',
      name: 'Creative Designer',
      thumbnail: null,
    },
  });
}

export function getStoreResumes(userId?: string): ResumeStoreItem[] {
  const items = Array.from(store.values());
  if (userId) {
    return items.filter(r => r.userId === userId || r.userId === 'mock-user-1');
  }
  return items;
}

export function getStoreResumeById(id: string): ResumeStoreItem | undefined {
  return store.get(id);
}

export function saveStoreResume(item: ResumeStoreItem): ResumeStoreItem {
  store.set(item.id, item);
  return item;
}

export function updateStoreResume(id: string, userId: string, updateData: Partial<ResumeStoreItem>): ResumeStoreItem | undefined {
  const existing = store.get(id);
  if (!existing) {
    const newItem: ResumeStoreItem = {
      id,
      userId: userId || 'mock-user-1',
      title: updateData.title || 'Untitled Resume',
      slug: updateData.slug || ('resume-' + Date.now()),
      templateId: updateData.templateId || 'sidebar-left-modern-blue',
      status: updateData.status || 'draft',
      downloads: updateData.downloads || 0,
      views: updateData.views || 0,
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      ...updateData,
    };
    store.set(id, newItem);
    return newItem;
  }

  const updated: ResumeStoreItem = {
    ...existing,
    ...updateData,
    updatedAt: new Date().toISOString(),
    template: {
      id: updateData.templateId || existing.templateId,
      name: (updateData.templateId || existing.templateId).replace(/-/g, ' '),
      thumbnail: null,
    },
  };

  store.set(id, updated);
  return updated;
}

export function deleteStoreResume(id: string): boolean {
  return store.delete(id);
}
