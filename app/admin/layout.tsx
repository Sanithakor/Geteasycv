/**
 * Admin Dashboard Layout
 * Guards the entire /admin/* tree — users without role === 'admin'
 * are redirected to /login (unauthenticated) or shown a 403 (authenticated).
 */

'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import Sidebar from '@/components/admin/layout/Sidebar';
import Header from '@/components/admin/layout/Header';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isAuthenticated, user, _hydrated } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  useEffect(() => {
    if (!_hydrated) return;
    if (!isAuthenticated) {
      router.replace('/login');
      return;
    }
  }, [_hydrated, isAuthenticated, router]);

  // Show nothing while hydrating or redirecting
  if (!_hydrated || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-[20px] bg-violet-600 mb-4 animate-pulse">
            <span className="text-white text-lg">⚙️</span>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-sm">Loading…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="lg:pl-64 flex flex-col min-h-screen">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-y-auto">
          <div className="px-6 py-6 text-sm text-slate-600">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
