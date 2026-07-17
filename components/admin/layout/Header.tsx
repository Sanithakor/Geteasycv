/**
 * Redesigned Admin Header matching mock dashboard layout
 */

'use client';

import React from 'react';
import { Menu, Search, Bell, LogOut, Plus, Settings, User } from 'lucide-react';
import { useAuthStore } from '@/lib/store/authStore';
import Link from 'next/link';

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const { user, logout } = useAuthStore();
  const [showUserMenu, setShowUserMenu] = React.useState(false);
  const [showNotifications, setShowNotifications] = React.useState(false);
  const [showCreateDropdown, setShowCreateDropdown] = React.useState(false);

  React.useEffect(() => {
    // Force light theme strictly
    document.documentElement.classList.remove('dark');
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', 'light');
    }
  }, []);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur flex-shrink-0">
      <div className="flex items-center justify-between px-6 h-16">
        {/* Left side */}
        <div className="flex items-center gap-4 flex-1">
          {/* Mobile menu toggle button */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-slate-50 rounded-lg text-slate-600 hover:text-slate-900 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Search bar */}
          <div className="hidden md:flex flex-1 max-w-sm">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search anything..."
                className="w-full pl-10 pr-16 py-1.5 rounded-[20px] border border-slate-200/80 bg-slate-50/50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500/25 focus:border-violet-500 text-sm transition-all"
              />
              <div className="absolute right-3.5 top-1/2 transform -translate-y-1/2 bg-white border border-slate-200/60 rounded px-1.5 py-0.5 text-[9px] font-bold text-slate-400 font-mono shadow-sm">
                Ctrl + K
              </div>
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Quick Create Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowCreateDropdown(!showCreateDropdown)}
              className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white rounded-xl font-semibold text-sm shadow-sm transition-all hover:shadow-violet-100 hover:scale-[1.01]"
            >
              <Plus className="w-4 h-4" />
              <span>Create New</span>
            </button>

            {showCreateDropdown && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowCreateDropdown(false)} />
                <div className="absolute right-0 mt-2 w-48 rounded-[20px] border border-slate-200 bg-white p-1.5 shadow-xl z-20">
                  <Link
                    href="/admin/users/new"
                    onClick={() => setShowCreateDropdown(false)}
                    className="block w-full rounded-lg px-3 py-2 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Add User
                  </Link>
                  <Link
                    href="/admin/templates/new"
                    onClick={() => setShowCreateDropdown(false)}
                    className="block w-full rounded-lg px-3 py-2 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Add Template
                  </Link>
                  <Link
                    href="/admin/blog"
                    onClick={() => setShowCreateDropdown(false)}
                    className="block w-full rounded-lg px-3 py-2 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Create Blog Post
                  </Link>
                </div>
              </>
            )}
          </div>

          {/* Notifications bell button */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 hover:bg-slate-50 rounded-xl text-slate-500 hover:text-slate-800 transition-colors relative"
            >
              <Bell className="w-[21px] h-[21px]" />
              <span className="absolute top-1.5 right-1.5 min-w-[15px] h-3.5 px-1 bg-red-500 text-white rounded-full text-[8px] font-black flex items-center justify-center border border-white">
                8
              </span>
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowNotifications(false)} />
                <div className="absolute right-0 mt-2 w-80 rounded-[20px] border border-slate-200 bg-white shadow-xl z-20 overflow-hidden">
                  <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                    <h3 className="font-bold text-slate-900">Notifications</h3>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-violet-50 text-violet-600">8 New</span>
                  </div>
                  <div className="p-2 max-h-80 overflow-y-auto space-y-1">
                    <NotificationItem icon="👤" title="New User Registered" message="sarah.jones@example.com joined" time="3 mins ago" />
                    <NotificationItem icon="💳" title="Subscription Upgraded" message="Mike upgraded to Premium Yearly" time="15 mins ago" />
                    <NotificationItem icon="📄" title="New Resume Created" message="ATS Modern layout was used" time="1 hour ago" />
                    <NotificationItem icon="💵" title="Payment Successful" message="Received $29.00 from Lisa Anderson" time="3 hours ago" />
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Divider */}
          <div className="h-6 w-px bg-slate-200 mx-1" />

          {/* User profile dropdown button */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="w-9 h-9 rounded-full overflow-hidden border border-slate-200 flex-shrink-0 shadow-sm hover:ring-2 hover:ring-violet-100 transition-all"
            >
              <img src="https://i.pravatar.cc/100?img=68" alt="Profile" className="w-full h-full object-cover" />
            </button>

            {/* User Dropdown */}
            {showUserMenu && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowUserMenu(false)} />
                <div className="absolute right-0 mt-2 w-48 rounded-[20px] border border-slate-200 bg-white p-1.5 shadow-xl z-20">
                  <div className="px-3 py-2 border-b border-slate-100">
                    <p className="text-sm font-bold text-slate-900">{user?.name || 'John Admin'}</p>
                    <p className="text-[11px] text-slate-400 truncate">{user?.email || 'admin@geteasycv.com'}</p>
                  </div>
                  <div className="p-1 space-y-[2px]">
                    <Link
                      href="/admin/profile"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      <User className="w-4 h-4 text-slate-400" />
                      <span>My Profile</span>
                    </Link>
                    <Link
                      href="/admin/settings"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      <Settings className="w-4 h-4 text-slate-400" />
                      <span>Settings</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="w-4 h-4 text-red-400" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

function NotificationItem({
  icon,
  title,
  message,
  time,
}: {
  icon: string;
  title: string;
  message: string;
  time: string;
}) {
  return (
    <div className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
      <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-sm flex-shrink-0">{icon}</div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-bold text-slate-800 truncate">{title}</p>
        <p className="text-[11px] text-slate-500 truncate mt-0.5">{message}</p>
        <span className="block text-[9px] text-slate-400 mt-1 font-semibold">{time}</span>
      </div>
    </div>
  );
}
