/**
 * In-memory resume store to ensure persistence across API requests
 * during session and database fallback modes with strict user isolation.
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

export function getStoreResumes(userId?: string): ResumeStoreItem[] {
  const items = Array.from(store.values());
  if (userId) {
    return items.filter(r => r.userId === userId);
  }
  return items;
}

export function getStoreResumeById(id: string, userId?: string): ResumeStoreItem | undefined {
  const item = store.get(id);
  if (!item) return undefined;
  if (userId && item.userId && item.userId !== userId && !item.isPublic) {
    return undefined;
  }
  return item;
}

export function saveStoreResume(item: ResumeStoreItem): ResumeStoreItem {
  store.set(item.id, item);
  return item;
}

export function updateStoreResume(id: string, userId: string, updateData: Partial<ResumeStoreItem>): ResumeStoreItem | undefined {
  const existing = store.get(id);
  if (existing && existing.userId && existing.userId !== userId) {
    return undefined; // Prevent unauthorized update (BOLA/IDOR protection)
  }

  if (!existing) {
    const newItem: ResumeStoreItem = {
      id,
      userId: userId || 'guest',
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

export function deleteStoreResume(id: string, userId?: string): boolean {
  const existing = store.get(id);
  if (!existing) return false;
  if (userId && existing.userId && existing.userId !== userId) {
    return false; // Prevent unauthorized deletion (BOLA/IDOR protection)
  }
  return store.delete(id);
}
