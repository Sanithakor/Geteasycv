'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import UserProfileDropdown from '@/components/auth/UserProfileDropdown';
import {
  LayoutDashboard,
  FileText,
  LayoutTemplate,
  User as UserIcon,
  CreditCard,
  Download,
  Settings,
  ShieldCheck,
  LogOut,
  Menu,
  X,
  Plus,
  MoreVertical,
  Sparkles
} from 'lucide-react';

interface UserLayoutProps {
  children: React.ReactNode;
}

const USER_NAV_ITEMS = [
  { title: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { title: 'My Resumes', href: '/my-resumes', icon: FileText },
  { title: 'Templates', href: '/templates', icon: LayoutTemplate },
  { title: 'Profile', href: '/profile', icon: UserIcon },
  { title: 'Subscription', href: '/subscription', icon: CreditCard },
  { title: 'Downloads', href: '/dashboard/downloads', icon: Download },
  { title: 'Settings', href: '/settings', icon: Settings },
];

export default function UserLayout({ children }: UserLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, user, logout, _hydrated } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showFooterMenu, setShowFooterMenu] = useState(false);

  useEffect(() => {
    if (!_hydrated) return;
    if (!isAuthenticated) {
      router.replace('/login');
    }
  }, [_hydrated, isAuthenticated, router]);

  if (!_hydrated || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-700">
        <div className="text-center">
          <div className="w-12 h-12 rounded-2xl bg-teal-600 flex items-center justify-center mx-auto mb-4 animate-pulse">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <p className="text-slate-600 text-sm font-semibold">Loading user session…</p>
        </div>
      </div>
    );
  }

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  const isNavActive = (href: string) => {
    if (href === '/dashboard') return pathname === '/dashboard';
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 lg:hidden z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Light Theme Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-white border-r border-slate-200/80 flex flex-col z-50 lg:z-30 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo Section */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-slate-100 flex-shrink-0">
          <Link href="/" className="flex items-center gap-2 group" title="Go to Homepage">
            <img src="/logo.png" alt="GetEasyCV" className="h-10 w-auto object-contain transition-transform group-hover:scale-105" />
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sidebar Tabs */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          <div className="px-3 py-1.5 text-[10px] font-extrabold tracking-widest text-slate-400 uppercase">
            Navigation
          </div>

          {USER_NAV_ITEMS.map((item) => {
            const active = isNavActive(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  active
                    ? 'bg-teal-50 text-teal-700 shadow-sm border border-teal-100'
                    : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-teal-600' : 'text-slate-400'}`} />
                <span className="truncate">{item.title}</span>
              </Link>
            );
          })}

          {/* Admin Control Panel link if Admin */}
          {user?.role === 'admin' && (
            <div className="pt-4 mt-4 border-t border-slate-100">
              <div className="px-3 py-1 text-[10px] font-extrabold tracking-widest text-slate-400 uppercase">
                Admin Privilege
              </div>
              <Link
                href="/admin"
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-bold text-violet-700 bg-violet-50 hover:bg-violet-100 transition-all border border-violet-100"
              >
                <ShieldCheck className="w-4 h-4 text-violet-600" />
                <span className="truncate">Admin Control Panel</span>
              </Link>
            </div>
          )}
        </div>

        {/* Create Resume Quick Action */}
        <div className="p-4 border-t border-slate-100">
          <Link
            href="/templates"
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Resume</span>
          </Link>
        </div>

        {/* Sidebar Footer User Info */}
        <div className="border-t border-slate-100 p-4 flex items-center justify-between gap-3 bg-white flex-shrink-0 relative">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-9 h-9 rounded-full overflow-hidden bg-teal-100 text-teal-800 flex-shrink-0 border border-teal-200 flex items-center justify-center font-bold text-sm">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                user?.name?.[0]?.toUpperCase() || 'U'
              )}
            </div>
            <div className="min-w-0">
              <span className="block text-sm font-bold text-slate-900 truncate">
                {user?.name || 'User'}
              </span>
              <span className="block text-[11px] font-semibold text-slate-500 capitalize truncate">
                {user?.tier || (user as any)?.subscriptionTier || 'Free Plan'}
              </span>
            </div>
          </div>

          <div className="relative">
            <button
              onClick={() => setShowFooterMenu(!showFooterMenu)}
              className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700 transition-colors"
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            {showFooterMenu && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowFooterMenu(false)} />
                <div className="absolute right-0 bottom-full mb-2 w-48 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-xl z-20 space-y-1">
                  <Link
                    href="/profile"
                    onClick={() => setShowFooterMenu(false)}
                    className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    <UserIcon className="w-4 h-4 text-slate-400" />
                    <span>My Profile</span>
                  </Link>
                  <Link
                    href="/settings"
                    onClick={() => setShowFooterMenu(false)}
                    className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    <Settings className="w-4 h-4 text-slate-400" />
                    <span>Settings</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm font-semibold text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="w-4 h-4 text-red-400" />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </aside>

      {/* Main Layout Area */}
      <div className="lg:pl-64 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="h-16 shrink-0 flex items-center justify-between px-6 bg-white border-b border-slate-200/80 sticky top-0 z-20 shadow-xs">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-teal-600 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-100">
                User Dashboard
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/templates"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Resume</span>
            </Link>

            {user?.role === 'admin' && (
              <Link
                href="/admin"
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-violet-50 text-violet-700 border border-violet-100 hover:bg-violet-100 text-xs font-bold transition-all"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-violet-600" />
                <span>Admin Panel</span>
              </Link>
            )}

            <UserProfileDropdown />
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6 sm:p-8">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
