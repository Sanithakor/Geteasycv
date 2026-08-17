/**
 * Login Page
 * User authentication with callback URL redirection support
 */

'use client';

import React, { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore, useAuthHydrated } from '@/lib/store/authStore';
import LoginForm from '@/components/auth/LoginForm';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || searchParams.get('redirectTo') || '/dashboard';
  const isHydrated = useAuthHydrated();
  const { isAuthenticated, user } = useAuthStore();

  // Redirect if already authenticated
  useEffect(() => {
    if (!isHydrated) return;

    if (isAuthenticated) {
      const targetPath = user?.role === 'admin' ? '/admin' : callbackUrl;
      router.push(targetPath);
    }
  }, [isAuthenticated, user, isHydrated, router, callbackUrl]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-4 sm:p-6">
      {/* Main Card */}
      <div className="w-full max-w-[480px] bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-6 sm:p-10 my-auto">
        <LoginForm redirectTo={callbackUrl} />
      </div>

      {/* Legal Footer */}
      <p className="mt-6 text-center text-xs text-slate-400 font-medium">
        By logging in, you agree to our{' '}
        <Link href="/terms" className="text-slate-600 font-semibold hover:underline">
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link href="/privacy" className="text-slate-600 font-semibold hover:underline">
          Privacy Policy
        </Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center text-slate-500 font-semibold text-sm">
        Loading login...
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}
