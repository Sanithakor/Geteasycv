/**
 * Authentication State Management (Zustand)
 * Handles user authentication, session, and authorization
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, AuthResponse, LoginPayload, SignupPayload } from '../../types';

interface AuthState {
  // State
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  _hydrated: boolean;

  // Actions
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  loginWithGoogle: (token: string) => Promise<void>;
  loginWithGithub: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  clearError: () => void;
  setHydrated: (hydrated: boolean) => void;

  // Selectors
  isAdmin: () => boolean;
  isPremium: () => boolean;
  canManageTemplate: () => boolean;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      _hydrated: false,

      // Login with email/password
      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Login failed');
          }

          const data: AuthResponse = await response.json();
          console.log('[AuthStore] Login successful, setting state:', {
            email: data.user.email,
            token: data.token?.substring(0, 20) + '...',
          });
          
          set({
            user: data.user,
            token: data.token,
            isAuthenticated: true,
            isLoading: false,
          });
          
          console.log('[AuthStore] State updated:', {
            isAuthenticated: get().isAuthenticated,
            user: get().user?.email,
          });
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Login failed';
          console.error('[AuthStore] Login error:', message);
          set({
            error: message,
            isLoading: false,
          });
          throw error;
        }
      },

      // Signup with email/password
      signup: async (email: string, password: string, name: string) => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetch(`${API_BASE_URL}/auth/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, name }),
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Signup failed');
          }

          const data: AuthResponse = await response.json();
          set({
            user: data.user,
            token: data.token,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Signup failed';
          set({
            error: message,
            isLoading: false,
          });
          throw error;
        }
      },

      // Login with Google OAuth
      loginWithGoogle: async (token: string) => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetch(`${API_BASE_URL}/auth/google`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token }),
          });

          if (!response.ok) {
            throw new Error('Google login failed');
          }

          const data: AuthResponse = await response.json();
          set({
            user: data.user,
            token: data.token,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Google login failed';
          set({
            error: message,
            isLoading: false,
          });
          throw error;
        }
      },

      // Login with GitHub OAuth
      loginWithGithub: async (token: string) => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetch(`${API_BASE_URL}/auth/github`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token }),
          });

          if (!response.ok) {
            throw new Error('GitHub login failed');
          }

          const data: AuthResponse = await response.json();
          set({
            user: data.user,
            token: data.token,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          const message = error instanceof Error ? error.message : 'GitHub login failed';
          set({
            error: message,
            isLoading: false,
          });
          throw error;
        }
      },

      // Logout
      logout: async () => {
        try {
          await fetch(`${API_BASE_URL}/auth/logout`, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${get().token}`,
            },
          });
        } catch (error) {
          console.error('Logout error:', error);
        } finally {
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            error: null,
          });
        }
      },

      // Refresh token
      refreshToken: async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${get().token}`,
            },
          });

          if (!response.ok) {
            throw new Error('Token refresh failed');
          }

          const data: AuthResponse = await response.json();
          set({
            token: data.token,
            user: data.user,
          });
        } catch (error) {
          set({
            token: null,
            user: null,
            isAuthenticated: false,
          });
          throw error;
        }
      },

      // Set user manually
      setUser: (user: User | null) => {
        set({
          user,
          isAuthenticated: user !== null,
        });
      },

      // Set token manually
      setToken: (token: string | null) => {
        set({ token });
      },

      // Clear error
      clearError: () => {
        set({ error: null });
      },

      // Set hydrated flag
      setHydrated: (hydrated: boolean) => {
        set({ _hydrated: hydrated });
      },

      // Selectors
      isAdmin: () => {
        const user = get().user;
        return user?.role === 'admin';
      },

      isPremium: () => {
        const user = get().user;
        return user?.tier === 'pro' || user?.tier === 'premium';
      },

      canManageTemplate: () => {
        const user = get().user;
        return user?.role === 'admin' || user?.role === 'editor';
      },
    }),
    {
      name: 'auth-store',
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        // Called when the store is rehydrated from storage
        if (state) {
          state.setHydrated(true);
          console.log('[AuthStore] Rehydrated from storage:', {
            isAuthenticated: state.isAuthenticated,
            user: state.user?.email,
          });
        }
      },
    }
  )
);

// Export typed hooks
export const useAuth = () => useAuthStore((state) => state);
export const useAuthToken = () => useAuthStore((state) => state.token);
export const useAuthUser = () => useAuthStore((state) => state.user);
export const useAuthIsAuthenticated = () => useAuthStore((state) => state.isAuthenticated);
export const useAuthHydrated = () => useAuthStore((state) => state._hydrated);
