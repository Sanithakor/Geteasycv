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
    if (!isHydrated) return;
    
    if (isAuthenticated) {
      const targetPath = user?.role === 'admin' ? '/admin' : '/dashboard';
      router.push(targetPath);
    }
  }, [isAuthenticated, user, isHydrated, router]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-4 sm:p-6">
      {/* Main Card */}
      <div className="w-full max-w-[480px] bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-6 sm:p-10 my-auto">
        <LoginForm />
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
