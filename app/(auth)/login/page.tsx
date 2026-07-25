/**
 * Login Page
 * User authentication
 */

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore, useAuthHydrated } from '../../../lib/store/authStore';
import LoginForm from '../../../components/auth/LoginForm';

export default function LoginPage() {
  const router = useRouter();
  const isHydrated = useAuthHydrated();
  const { isAuthenticated, user } = useAuthStore();

  // Redirect if already authenticated
  useEffect(() => {
    // Wait for Zustand to rehydrate from localStorage
    if (!isHydrated) {
      console.log('[LoginPage] Waiting for store hydration...');
      return;
    }

    console.log('[LoginPage] Store hydrated, checking auth state:', { isAuthenticated, role: user?.role });
    
    if (isAuthenticated) {
      const targetPath = user?.role === 'admin' ? '/admin' : '/dashboard';
      console.log(`[LoginPage] User is authenticated as ${user?.role || 'user'}, redirecting to ${targetPath}`);
      router.push(targetPath);
    }
  }, [isAuthenticated, user, isHydrated, router]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-950 flex flex-col items-center justify-center p-4">
      {/* Background Elements — needs `relative` on parent to contain `absolute` children */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 dark:bg-blue-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-200 dark:bg-indigo-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
      </div>

      {/* Container */}
      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center justify-center mb-4 group" title="Go to Homepage">
            <img src="/logo.png" alt="GetEasyCV" className="h-12 w-auto object-contain transition-transform group-hover:scale-105" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome Back</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Create your professional resume in minutes</p>
        </div>

        {/* Form */}
        <LoginForm />

        <p className="mt-8 text-center text-xs text-gray-500 dark:text-gray-400">
          By signing in, you agree to our{' '}
          <Link href="/terms" className="hover:underline">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href="/privacy" className="hover:underline">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}
