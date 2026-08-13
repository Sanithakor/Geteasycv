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

const getApiBaseUrl = () => {
  if (typeof window !== 'undefined') {
    return '/api';
  }
  let url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  url = url.replace(/['"]/g, '');
  if (url.endsWith('/')) {
    url = url.slice(0, -1);
  }
  if (!url.endsWith('/api')) {
    url = `${url}/api`;
  }
  return url;
};

const API_BASE_URL = getApiBaseUrl();

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      _hydrated: typeof window !== 'undefined',

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
            throw new Error(errorData.error || errorData.message || 'Login failed');
          }

          const data: AuthResponse = await response.json();
          
          const user = {
            ...data.user,
            tier: (data.user as any).subscriptionTier ?? (data.user as any).tier ?? 'free',
          } as User;
          delete (user as any).subscriptionTier;

          set({
            user,
            token: data.token,
            isAuthenticated: true,
            isLoading: false,
            _hydrated: true,
          });
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Login failed';
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
            throw new Error(errorData.error || errorData.message || 'Signup failed');
          }

          const data: AuthResponse & { user: { subscriptionTier?: string } } = await response.json();

          const user = {
            ...data.user,
            tier: (data.user as any).subscriptionTier ?? (data.user as any).tier ?? 'free',
          } as User;
          delete (user as any).subscriptionTier;

          set({
            user,
            token: data.token,
            isAuthenticated: true,
            isLoading: false,
            _hydrated: true,
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
            _hydrated: true,
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
            _hydrated: true,
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

      // Logout user
      logout: async () => {
        set({ isLoading: true });
        try {
          await fetch(`${API_BASE_URL}/auth/logout`, {
            method: 'POST',
          });
        } catch (error) {
          console.error('Logout API call failed:', error);
        } finally {
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
            _hydrated: true,
          });
        }
      },

      // Refresh authentication token
      refreshToken: async () => {
        const currentToken = get().token;
        if (!currentToken) return;

        try {
          const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${currentToken}`,
            },
          });

          if (response.ok) {
            const data: AuthResponse = await response.json();
            set({
              token: data.token,
              user: data.user,
            });
          }
        } catch (error) {
          console.error('Token refresh failed:', error);
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
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHydrated(true);
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
