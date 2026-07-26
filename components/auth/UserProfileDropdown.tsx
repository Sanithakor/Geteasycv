'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import {
  LayoutDashboard,
  FileText,
  User as UserIcon,
  Settings,
  LogOut,
  ChevronDown
} from 'lucide-react';

export default function UserProfileDropdown() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    setOpen(false);
    await logout();
    router.push('/login');
  };

  const dashboardPath = user?.role === 'admin' ? '/admin' : '/dashboard';
  const initial = user?.name?.[0]?.toUpperCase() || 'U';
  const tierName = user?.role === 'admin' ? 'ADMIN' : (user?.tier || (user as any)?.subscriptionTier || 'FREE').toUpperCase();

  // Extract First Name and restrict to max 8 characters
  const rawFirstName = user?.name ? user.name.trim().split(' ')[0] : 'Account';
  const firstNameDisplay = rawFirstName.length > 8 ? rawFirstName.slice(0, 8) : rawFirstName;

  return (
    <div className="relative inline-block text-left">
      {/* Top Profile Pill Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-slate-800 hover:bg-slate-50 transition-all shadow-xs focus:outline-none cursor-pointer"
      >
        <div className="w-7 h-7 rounded-full bg-teal-600 text-white font-bold text-xs flex items-center justify-center flex-shrink-0">
          {initial}
        </div>
        <span className="text-xs font-bold text-slate-800 truncate">
          {firstNameDisplay}
        </span>
        <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
      </button>

      {/* Dropdown Menu Card */}
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 mt-2 w-64 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl z-50 animate-in fade-in zoom-in-95 duration-150">
            {/* Header User Info */}
            <div className="px-2 py-1">
              <p className="text-sm font-bold text-slate-900 truncate">{user?.name || 'User'}</p>
              <p className="text-xs text-slate-500 truncate mt-0.5">{user?.email || ''}</p>
              <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-teal-50 text-teal-700 border border-teal-200">
                {tierName}
              </span>
            </div>

            <div className="border-t border-slate-100 my-2" />

            {/* Menu Links */}
            <div className="space-y-0.5">
              <Link
                href={dashboardPath}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-3 py-2 text-xs font-bold text-slate-700 hover:text-slate-950 hover:bg-slate-50 rounded-xl transition-colors"
              >
                <LayoutDashboard className="w-4 h-4 text-slate-400" />
                <span>Go to Dashboard</span>
              </Link>

              <Link
                href="/my-resumes"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-3 py-2 text-xs font-bold text-slate-700 hover:text-slate-950 hover:bg-slate-50 rounded-xl transition-colors"
              >
                <FileText className="w-4 h-4 text-slate-400" />
                <span>My Resumes</span>
              </Link>

              <Link
                href="/profile"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-3 py-2 text-xs font-bold text-slate-700 hover:text-slate-950 hover:bg-slate-50 rounded-xl transition-colors"
              >
                <UserIcon className="w-4 h-4 text-slate-400" />
                <span>My Profile</span>
              </Link>

              <Link
                href="/settings"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-3 py-2 text-xs font-bold text-slate-700 hover:text-slate-950 hover:bg-slate-50 rounded-xl transition-colors"
              >
                <Settings className="w-4 h-4 text-slate-400" />
                <span>Settings</span>
              </Link>

              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50 rounded-xl transition-colors"
              >
                <LogOut className="w-4 h-4 text-red-500" />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
