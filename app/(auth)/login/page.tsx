'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore, useAuthHydrated } from '@/lib/store/authStore';
import LoginForm from '@/components/auth/LoginForm';

export default function LoginPage() {
  const router = useRouter();
  const isHydrated = useAuthHydrated();
  const { isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    if (!isHydrated) return;
    if (isAuthenticated) {
      router.push(user?.role === 'admin' ? '/admin' : '/dashboard');
    }
  }, [isAuthenticated, user, isHydrated, router]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50 flex flex-col items-center justify-center p-4">
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-violet-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-7">
          <Link href="/" className="inline-flex items-center justify-center mb-3 group" title="Homepage">
            <img src="/logo.png" alt="GetEasyCV" className="h-11 w-auto object-contain transition-transform group-hover:scale-105" />
          </Link>
          <h1 className="text-2xl font-black text-slate-900">Welcome back</h1>
          <p className="mt-1 text-sm text-slate-500">Sign in to continue building your resume</p>
        </div>

        <LoginForm />

        <p className="mt-5 text-center text-xs text-slate-400">
          By signing in you agree to our{' '}
          <Link href="/terms" className="text-violet-600 hover:underline font-semibold">Terms</Link>
          {' '}and{' '}
          <Link href="/privacy" className="text-violet-600 hover:underline font-semibold">Privacy Policy</Link>
        </p>
      </div>
    </div>
  );
}
