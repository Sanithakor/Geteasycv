'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { X } from 'lucide-react';
import { useAuthStore } from '@/lib/store/authStore';
import {
  HomeIcon,
  FileTextIcon,
  EditIcon,
  PaletteIcon,
  UserIcon,
  SettingsIcon,
  LogOutIcon,
} from '@/components/icons';

const MENU_ITEMS = [
  { title: 'Dashboard',       icon: <HomeIcon className="w-5 h-5" />,     href: '/dashboard' },
  { title: 'My Resumes',      icon: <FileTextIcon className="w-5 h-5" />, href: '/my-resumes' },
  { title: 'Resume Builder',  icon: <EditIcon className="w-5 h-5" />,     href: '/editor' },
  { title: 'Templates',       icon: <PaletteIcon className="w-5 h-5" />,  href: '/templates' },
  { title: 'Profile',         icon: <UserIcon className="w-5 h-5" />,     href: '/profile' },
  { title: 'Settings',        icon: <SettingsIcon className="w-5 h-5" />, href: '/settings' },
];

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function Sidebar({ open, setOpen }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuthStore();

  const isMenuActive = (href: string) => {
    if (href === '/dashboard') return pathname === '/dashboard';
    return pathname.startsWith(href);
  };

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/50 lg:hidden z-40" onClick={() => setOpen(false)} />
      )}

      <div
        className={`fixed left-0 top-0 h-screen w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 transform transition-transform duration-300 ease-in-out z-50 lg:z-0 flex flex-col ${
          open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-200 dark:border-slate-700 flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
              <span className="text-white font-bold text-sm">CV</span>
            </div>
            <span className="font-bold text-slate-900 dark:text-white hidden sm:inline">GetEasyCV</span>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="lg:hidden p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {MENU_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-all ${
                isMenuActive(item.href)
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50'
              }`}
            >
              {item.icon}
              <span>{item.title}</span>
            </Link>
          ))}
        </nav>

        {/* Bottom: Upgrade + Logout */}
        <div className="border-t border-slate-200 dark:border-slate-700 p-4 space-y-3 flex-shrink-0">
          <div className="rounded-lg bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-4">
            <p className="text-sm font-semibold text-slate-900 dark:text-white mb-2">⭐ Upgrade to Pro</p>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">Unlock premium templates and features</p>
            <Link
              href="/pricing"
              className="inline-block w-full text-center px-3 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg text-sm font-medium transition-all"
            >
              Upgrade Now
            </Link>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
          >
            <LogOutIcon className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
}
