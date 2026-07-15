/**
 * Zustand Resume Store
 * Global resume editor state management
 */

import { create } from 'zustand';
import { Resume, ResumeContent } from '@/lib/types';

interface ResumeEditorState {
  // State
  currentResume: Resume | null;
  isDirty: boolean;
  isAutoSaving: boolean;
  lastSaved: Date | null;
  selectedSection: string | null;
  zoomLevel: number;
  showGrid: boolean;
  showRulers: boolean;
  undoStack: ResumeContent[];
  redoStack: ResumeContent[];

  // Actions
  setCurrentResume: (resume: Resume | null) => void;
  updateContent: (content: Partial<ResumeContent>) => void;
  setIsDirty: (dirty: boolean) => void;
  setIsAutoSaving: (saving: boolean) => void;
  setLastSaved: (date: Date) => void;
  setSelectedSection: (section: string | null) => void;
  setZoomLevel: (level: number) => void;
  toggleGrid: () => void;
  toggleRulers: () => void;
  undo: () => void;
  redo: () => void;
  clearHistory: () => void;
  reset: () => void;
}

export const useResumeStore = create<ResumeEditorState>((set) => ({
  // State
  currentResume: null,
  isDirty: false,
  isAutoSaving: false,
  lastSaved: null,
  selectedSection: null,
  zoomLevel: 100,
  showGrid: false,
  showRulers: false,
  undoStack: [],
  redoStack: [],

  // Actions
  setCurrentResume: (resume) =>
    set({
      currentResume: resume,
      isDirty: false,
      undoStack: [],
      redoStack: [],
    }),

  updateContent: (content) =>
    set((state) => {
      if (!state.currentResume) return state;

      const newResume = {
        ...state.currentResume,
        content: {
          ...state.currentResume.content,
          ...content,
        },
      };

      return {
        currentResume: newResume,
        isDirty: true,
        redoStack: [], // Clear redo stack on new change
      };
    }),

  setIsDirty: (dirty) => set({ isDirty: dirty }),
  setIsAutoSaving: (saving) => set({ isAutoSaving: saving }),
  setLastSaved: (date) => set({ lastSaved: date }),
  setSelectedSection: (section) => set({ selectedSection: section }),

  setZoomLevel: (level) =>
    set({
      zoomLevel: Math.max(50, Math.min(200, level)),
    }),

  toggleGrid: () =>
    set((state) => ({
      showGrid: !state.showGrid,
    })),

  toggleRulers: () =>
    set((state) => ({
      showRulers: !state.showRulers,
    })),

  undo: () =>
    set((state) => {
      if (!state.currentResume || state.undoStack.length === 0) {
        return state;
      }

      const previousContent = state.undoStack[state.undoStack.length - 1];
      const newUndoStack = state.undoStack.slice(0, -1);

      return {
        currentResume: {
          ...state.currentResume,
          content: previousContent,
        },
        undoStack: newUndoStack,
        redoStack: [...state.redoStack, state.currentResume.content],
      };
    }),

  redo: () =>
    set((state) => {
      if (!state.currentResume || state.redoStack.length === 0) {
        return state;
      }

      const nextContent = state.redoStack[state.redoStack.length - 1];
      const newRedoStack = state.redoStack.slice(0, -1);

      return {
        currentResume: {
          ...state.currentResume,
          content: nextContent,
        },
        redoStack: newRedoStack,
        undoStack: [...state.undoStack, state.currentResume.content],
      };
    }),

  clearHistory: () =>
    set({
      undoStack: [],
      redoStack: [],
    }),

  reset: () =>
    set({
      currentResume: null,
      isDirty: false,
      isAutoSaving: false,
      lastSaved: null,
      selectedSection: null,
      zoomLevel: 100,
      showGrid: false,
      showRulers: false,
      undoStack: [],
      redoStack: [],
    }),
}));
