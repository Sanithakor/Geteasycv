import { describe, it, expect, beforeEach } from 'vitest';
import { useBuilderStore } from '@/lib/store/builderStore';
import type { Resume, Template } from '@/types';

const mockTemplate: Template = {
  id: 'template-1',
  name: 'CTS Modern',
  slug: 'cts-modern',
  category: 'Modern',
  layout: 'single-column',
  blocks: [],
  theme: {
    id: 'theme-1',
    name: 'Default',
    primary: '#1E3A8A',
    secondary: '#475569',
    accent: '#F3645C',
    background: '#FFFFFF',
    text: '#0F172A',
    fontFamily: 'Roboto',
    fontSize: 14,
    lineHeight: 1.5,
  },
  thumbnail: '/thumbs/1.png',
  isPremium: false,
  isATS: true,
  isRTL: false,
  downloads: 0,
  uses: 0,
  rating: 5.0,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const mockResume: Resume = {
  id: 'res-1',
  userId: 'user-1',
  title: 'Software Engineer',
  slug: 'software-engineer',
  templateId: 'template-1',
  content: {
    personal: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phone: '+1 234 567 890',
      location: 'San Francisco, CA',
    },
    experience: [],
    education: [],
    skills: [],
  },
  status: 'draft',
  isPublic: false,
  downloads: 0,
  views: 0,
  version: 1,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

describe('Resume Builder Store (UseBuilderStore)', () => {
  beforeEach(() => {
    useBuilderStore.getState().reset();
  });

  it('initializes resume and template correctly', () => {
    useBuilderStore.getState().setResume(mockResume, mockTemplate);
    const state = useBuilderStore.getState();
    expect(state.resume).not.toBeNull();
    expect(state.resume?.content.personal.firstName).toBe('John');
    expect(state.history.length).toBe(1);
  });

  it('maintains immutable history snapshots when updating content', () => {
    useBuilderStore.getState().setResume(mockResume, mockTemplate);

    // Update 1: Change firstname to 'Alice'
    useBuilderStore.getState().updateContent({
      personal: { ...mockResume.content.personal, firstName: 'Alice' },
    });

    // Update 2: Change firstname to 'Bob'
    useBuilderStore.getState().updateContent({
      personal: { ...mockResume.content.personal, firstName: 'Bob' },
    });

    let state = useBuilderStore.getState();
    expect(state.resume?.content.personal.firstName).toBe('Bob');

    // Undo 1 step - should restore 'Alice'
    useBuilderStore.getState().undo();
    state = useBuilderStore.getState();
    expect(state.resume?.content.personal.firstName).toBe('Alice');

    // Undo 2nd step - should restore original 'John'
    useBuilderStore.getState().undo();
    state = useBuilderStore.getState();
    expect(state.resume?.content.personal.firstName).toBe('John');

    // Redo 1 step - should return to 'Alice'
    useBuilderStore.getState().redo();
    state = useBuilderStore.getState();
    expect(state.resume?.content.personal.firstName).toBe('Alice');
  });

  it('accurately reports canUndo and canRedo booleans', () => {
    useBuilderStore.getState().setResume(mockResume, mockTemplate);
    expect(useBuilderStore.getState().historyIndex > 0).toBe(false);

    useBuilderStore.getState().updateContent({
      personal: { ...mockResume.content.personal, firstName: 'Sarah' },
    });
    expect(useBuilderStore.getState().historyIndex > 0).toBe(true);
  });
});
