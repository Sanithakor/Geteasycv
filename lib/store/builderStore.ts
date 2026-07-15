/**
 * Resume Builder State Management (Zustand)
 * Handles resume editor state, undo/redo, autosave
 */

import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { Resume, ResumeSections, Template } from '../../types';

interface EditorState {
  // Current resume
  resume: Resume | null;
  template: Template | null;

  // Editor state
  selectedBlockId: string | null;
  isDragging: boolean;
  isEditing: boolean;
  zoom: number;

  // Undo/Redo
  history: ResumeSections[];
  historyIndex: number;
  maxHistory: number;

  // UI state
  activeTab: 'edit' | 'preview' | 'export';
  showGrid: boolean;
  showRulers: boolean;
  isDarkMode: boolean;

  // Autosave
  lastSavedAt: Date | null;
  isDirty: boolean;
  isSaving: boolean;

  // Actions
  setResume: (resume: Resume, template: Template) => void;
  updateContent: (content: Partial<ResumeSections>) => void;
  setSelectedBlock: (blockId: string | null) => void;
  setDragging: (isDragging: boolean) => void;
  setEditing: (isEditing: boolean) => void;
  setZoom: (zoom: number) => void;
  setActiveTab: (tab: 'edit' | 'preview' | 'export') => void;
  toggleGrid: () => void;
  toggleRulers: () => void;
  toggleDarkMode: () => void;
  undo: () => void;
  redo: () => void;
  clearHistory: () => void;
  markSaved: () => void;
  markDirty: () => void;
  setSaving: (isSaving: boolean) => void;
  reset: () => void;
}

const MAX_HISTORY = 50;

const createInitialHistory = (content: ResumeSections): ResumeSections[] => [
  {
    personal: content.personal || {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      location: '',
    },
    experience: content.experience || [],
    education: content.education || [],
    skills: content.skills || [],
    projects: content.projects,
    certifications: content.certifications,
    languages: content.languages,
    summary: content.summary,
  },
];

export const useBuilderStore = create<EditorState>()(
  immer((set, get) => ({
    // Initial state
    resume: null,
    template: null,
    selectedBlockId: null,
    isDragging: false,
    isEditing: false,
    zoom: 100,
    history: [],
    historyIndex: -1,
    maxHistory: MAX_HISTORY,
    activeTab: 'edit',
    showGrid: false,
    showRulers: false,
    isDarkMode: false,
    lastSavedAt: null,
    isDirty: false,
    isSaving: false,

    // Set resume and template
    setResume: (resume: Resume, template: Template) => {
      set((state) => {
        state.resume = resume;
        state.template = template;
        state.history = createInitialHistory(resume.content);
        state.historyIndex = 0;
        state.isDirty = false;
        state.selectedBlockId = null;
      });
    },

    // Update resume content
    updateContent: (content: Partial<ResumeSections>) => {
      set((state) => {
        if (!state.resume) return;

        // Update resume
        state.resume.content = {
          ...state.resume.content,
          ...content,
        };

        // Add to history
        const newHistory = state.history.slice(0, state.historyIndex + 1);
        newHistory.push(state.resume.content);

        if (newHistory.length > state.maxHistory) {
          newHistory.shift();
        }

        state.history = newHistory;
        state.historyIndex = newHistory.length - 1;
        state.isDirty = true;
      });
    },

    // Select block
    setSelectedBlock: (blockId: string | null) => {
      set((state) => {
        state.selectedBlockId = blockId;
      });
    },

    // Set dragging
    setDragging: (isDragging: boolean) => {
      set((state) => {
        state.isDragging = isDragging;
      });
    },

    // Set editing
    setEditing: (isEditing: boolean) => {
      set((state) => {
        state.isEditing = isEditing;
      });
    },

    // Set zoom level
    setZoom: (zoom: number) => {
      set((state) => {
        state.zoom = Math.max(50, Math.min(200, zoom)); // Clamp between 50-200%
      });
    },

    // Set active tab
    setActiveTab: (tab: 'edit' | 'preview' | 'export') => {
      set((state) => {
        state.activeTab = tab;
      });
    },

    // Toggle grid
    toggleGrid: () => {
      set((state) => {
        state.showGrid = !state.showGrid;
      });
    },

    // Toggle rulers
    toggleRulers: () => {
      set((state) => {
        state.showRulers = !state.showRulers;
      });
    },

    // Toggle dark mode
    toggleDarkMode: () => {
      set((state) => {
        state.isDarkMode = !state.isDarkMode;
      });
    },

    // Undo
    undo: () => {
      set((state) => {
        if (state.historyIndex > 0) {
          state.historyIndex--;
          if (state.resume) {
            state.resume.content = state.history[state.historyIndex];
          }
        }
      });
    },

    // Redo
    redo: () => {
      set((state) => {
        if (state.historyIndex < state.history.length - 1) {
          state.historyIndex++;
          if (state.resume) {
            state.resume.content = state.history[state.historyIndex];
          }
        }
      });
    },

    // Clear history
    clearHistory: () => {
      set((state) => {
        if (state.resume) {
          state.history = [state.resume.content];
          state.historyIndex = 0;
        }
      });
    },

    // Mark as saved
    markSaved: () => {
      set((state) => {
        state.isDirty = false;
        state.lastSavedAt = new Date();
        state.isSaving = false;
      });
    },

    // Mark as dirty
    markDirty: () => {
      set((state) => {
        state.isDirty = true;
      });
    },

    // Set saving state
    setSaving: (isSaving: boolean) => {
      set((state) => {
        state.isSaving = isSaving;
      });
    },

    // Reset to initial state
    reset: () => {
      set({
        resume: null,
        template: null,
        selectedBlockId: null,
        isDragging: false,
        isEditing: false,
        zoom: 100,
        history: [],
        historyIndex: -1,
        activeTab: 'edit',
        showGrid: false,
        showRulers: false,
        isDarkMode: false,
        lastSavedAt: null,
        isDirty: false,
        isSaving: false,
      });
    },
  }))
);

// Export typed hooks
export const useBuilder = () => useBuilderStore((state) => state);
export const useBuilderResume = () => useBuilderStore((state) => state.resume);
export const useBuilderTemplate = () => useBuilderStore((state) => state.template);
export const useBuilderCanUndo = () => useBuilderStore((state) => state.historyIndex > 0);
export const useBuilderCanRedo = () => 
  useBuilderStore((state) => state.historyIndex < state.history.length - 1);
export const useBuilderIsDirty = () => useBuilderStore((state) => state.isDirty);
