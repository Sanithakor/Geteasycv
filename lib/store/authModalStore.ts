'use client';

/**
 * Auth Modal Store (Zustand)s
 * Controls the global login/signup modal visibility and active tab.
 */

import { create } from 'zustand';

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

  openLogin: (redirectTo = '/dashboard') =>
    set({ isOpen: true, tab: 'login', redirectTo }),

  openSignup: (redirectTo = '/dashboard') =>
    set({ isOpen: true, tab: 'signup', redirectTo }),

  close: () => set({ isOpen: false }),

  setTab: (tab) => set({ tab }),
}));
