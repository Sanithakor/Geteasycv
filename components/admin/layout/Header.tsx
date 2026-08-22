/**
 * Redesigned Admin Header matching mock dashboard layout
 */

'use client';

import React from 'react';
import { Menu, Search, Bell, LogOut, Plus, Settings, User } from 'lucide-react';
import { useAuthStore } from '@/lib/store/authStore';
import UserProfileDropdown from '@/components/auth/UserProfileDropdown';
import Link from 'next/link';

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const { user, logout } = useAuthStore();
  const [showUserMenu, setShowUserMenu] = React.useState(false);
  const [showNotifications, setShowNotifications] = React.useState(false);
  const [showCreateDropdown, setShowCreateDropdown] = React.useState(false);

  const [notifications, setNotifications] = React.useState<any[]>([]);
  const [unreadCount, setUnreadCount] = React.useState(0);

  const fetchNotifications = React.useCallback(async () => {
    try {
      const res = await fetch('/api/notifications');
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setNotifications(data.data);
        setUnreadCount(data.unreadCount || 0);
      }
    } catch (e) {
      console.warn('Error fetching notifications:', e);
    }
  }, []);

  React.useEffect(() => {
    // Force light theme strictly
    document.documentElement.classList.remove('dark');
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', 'light');
    }
    fetchNotifications();

    const interval = setInterval(fetchNotifications, 15000);
    return () => clearInterval(interval);
  }, [fetchNotifications]);

  const handleMarkAllRead = async () => {
    try {
      await fetch('/api/notifications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: 'all' }),
      });
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
      setUnreadCount(0);
    } catch (e) {
      console.error(e);
    }
  };

  const handleMarkItemRead = async (id: string) => {
    try {
      await fetch('/api/notifications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      setNotifications(prev =>
        prev.map(n => (n.id === id ? { ...n, isRead: true } : n))
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (e) {
      console.error(e);
    }
  };

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
            className="lg:hidden p-2 hover:bg-slate-50 rounded-md text-slate-600 hover:text-slate-900 transition-colors"
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
                className="w-full pl-10 pr-16 py-1.5 rounded-[20px] border border-slate-200/80 bg-slate-50/50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FF570F]/25 focus:border-[#FF570F] text-sm transition-all"
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
              className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-[#FF570F] to-[#E04800] hover:from-violet-700 hover:to-[#E04800] text-white rounded-md font-semibold text-sm shadow-sm transition-all hover:shadow-violet-100"
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
                    className="block w-full rounded-md px-3 py-2 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Add User
                  </Link>
                  <Link
                    href="/admin/templates/new"
                    onClick={() => setShowCreateDropdown(false)}
                    className="block w-full rounded-md px-3 py-2 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Add Template
                  </Link>
                  <Link
                    href="/admin/blog"
                    onClick={() => setShowCreateDropdown(false)}
                    className="block w-full rounded-md px-3 py-2 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50"
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
              className="p-2 hover:bg-slate-50 rounded-md text-slate-500 hover:text-slate-800 transition-colors relative"
            >
              <Bell className="w-[21px] h-[21px]" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 min-w-[15px] h-3.5 px-1 bg-red-500 text-white rounded-full text-[8px] font-bold flex items-center justify-center border border-white">
                  {unreadCount > 99 ? '99+' : unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowNotifications(false)} />
                <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-[20px] border border-slate-200 bg-white shadow-xl z-20 overflow-hidden">
                  <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-slate-900">Notifications</h3>
                      {unreadCount > 0 && (
                        <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-[#FFF0EB] text-violet-700">
                          {unreadCount} New
                        </span>
                      )}
                    </div>
                    {unreadCount > 0 && (
                      <button
                        onClick={handleMarkAllRead}
                        className="text-[11px] font-semibold text-[#FF570F] hover:text-[#E04800] transition-colors"
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>

                  <div className="p-2 max-h-80 overflow-y-auto space-y-1">
                    {notifications.length === 0 ? (
                      <div className="p-6 text-center text-slate-400 text-xs font-medium">
                        No notifications yet
                      </div>
                    ) : (
                      notifications.map(n => (
                        <NotificationItem
                          key={n.id}
                          icon={getNotificationIcon(n.type)}
                          title={n.title}
                          message={n.message}
                          time={formatTimeAgo(n.createdAt)}
                          isRead={n.isRead}
                          onClick={() => handleMarkItemRead(n.id)}
                        />
                      ))
                    )}
                  </div>

                  <div className="p-2 border-t border-slate-100 bg-slate-50/30 text-center">
                    <Link
                      href="/admin/notifications"
                      onClick={() => setShowNotifications(false)}
                      className="text-xs font-bold text-[#FF570F] hover:text-[#E04800] transition-colors block py-1"
                    >
                      View All Notifications →
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Divider */}
          <div className="h-6 w-px bg-slate-200 mx-1" />

          {/* Unified User profile dropdown button */}
          <UserProfileDropdown />
        </div>
      </div>
    </header>
  );
}

function getNotificationIcon(type: string) {
  switch (type) {
    case 'user_signup':
      return '👤';
    case 'subscription':
      return '💳';
    case 'resume_created':
      return '📄';
    case 'payment':
      return '💵';
    case 'warning':
      return '⚠️';
    case 'promo':
      return '🎉';
    default:
      return '🔔';
  }
}

function formatTimeAgo(dateInput: any) {
  if (!dateInput) return 'Recently';
  const date = new Date(dateInput);
  const diffMs = Date.now() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
}

function NotificationItem({
  icon,
  title,
  message,
  time,
  isRead,
  onClick,
}: {
  icon: string;
  title: string;
  message: string;
  time: string;
  isRead?: boolean;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`flex items-start gap-3 p-2.5 rounded-md transition-colors cursor-pointer ${
        isRead ? 'hover:bg-slate-50' : 'bg-[#FFF8F5]/40 hover:bg-[#FFF8F5]/70 border border-[#FF570F]/50'
      }`}
    >
      <div className="w-8 h-8 rounded-md bg-slate-100 flex items-center justify-center text-sm flex-shrink-0 shadow-2xs">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-1">
          <p className={`text-xs font-bold truncate ${isRead ? 'text-slate-800' : 'text-slate-900'}`}>
            {title}
          </p>
          {!isRead && <span className="w-2 h-2 rounded-full bg-[#FF570F] shrink-0"></span>}
        </div>
        <p className="text-[11px] text-slate-500 truncate mt-0.5">{message}</p>
        <span className="block text-[9px] text-slate-400 mt-1 font-semibold">{time}</span>
      </div>
    </div>
  );
}

