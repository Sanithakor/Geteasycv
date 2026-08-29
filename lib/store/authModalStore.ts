'use client';

/**
 * Auth Modal Store (Zustand)
 * Controls the global login/signup modal visibility and active tab.
 */

import { create } from 'zustand';
import { useAuthStore } from './authStore';

export type AuthModalTab = 'login' | 'signup';

interface AuthModalState {
  isOpen: boolean;
  tab: AuthModalTab;
  redirectTo: string;
  openLogin: (redirectTo?: string) => void;
  openSignup: (redirectTo?: string) => void;
  close: () => void;
  setTab: (tab: AuthModalTab) => void;
}

export const useAuthModalStore = create<AuthModalState>((set) => ({
  isOpen: false,
  tab: 'login',
  redirectTo: '/dashboard',

  openLogin: (redirectTo = '/dashboard') => {
    if (typeof window !== 'undefined') {
      const { isAuthenticated } = useAuthStore.getState();
      if (isAuthenticated) return;
    }
    set({ isOpen: true, tab: 'login', redirectTo });
  },

  openSignup: (redirectTo = '/dashboard') => {
    if (typeof window !== 'undefined') {
      const { isAuthenticated } = useAuthStore.getState();
      if (isAuthenticated) return;
    }
    set({ isOpen: true, tab: 'signup', redirectTo });
  },

  close: () => set({ isOpen: false }),

  setTab: (tab) => set({ tab }),
}));
