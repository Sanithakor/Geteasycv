/**
 * Dashboard Layout
 * User dashboard with sidebar and header.
 *
 * Auth guard lives here so every child route is automatically protected.
 * Individual pages no longer need their own redirect-on-unauthenticated
 * logic, but they may still check `_hydrated` before rendering data to
 * avoid flashing unauthed content before the store rehydrates.
 */

'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import Sidebar from '@/components/dashboard/layout/Sidebar';
import Header from '@/components/dashboard/layout/Header';
import { FileText } from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isAuthenticated, _hydrated } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  // Single, layout-level auth guard.
  // All dashboard child routes inherit this protection automatically.
  useEffect(() => {
    if (!_hydrated) return; // wait for Zustand to rehydrate from localStorage
    if (!isAuthenticated) {
      router.replace('/login');
    }
  }, [_hydrated, isAuthenticated, router]);

  // Show a neutral loader while the store rehydrates or a redirect is in-flight.
  // This prevents a flash of dashboard chrome for unauthenticated visitors.
  if (!_hydrated || !isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-900">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-600 mb-4 animate-pulse">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-sm">Loading…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className="lg:pl-64 flex flex-col min-h-screen">
        {/* Header */}
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
