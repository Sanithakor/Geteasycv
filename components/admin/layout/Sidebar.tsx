'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import {
  LayoutDashboard,
  Users,
  FileText,
  LayoutTemplate,
  FolderTree,
  Columns,
  Sparkles,
  Image,
  CreditCard,
  Coins,
  ShoppingCart,
  Ticket,
  BookOpen,
  Mail,
  Bell,
  LineChart,
  Activity,
  Settings,
  ShieldAlert,
  LogOut,
  MoreVertical,
  X
} from 'lucide-react';

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

interface SidebarLink {
  title: string;
  icon: React.ComponentType<any>;
  href: string;
}

interface SidebarGroup {
  groupName: string;
  items: SidebarLink[];
}

const SIDEBAR_GROUPS: SidebarGroup[] = [
  {
    groupName: 'MANAGEMENT',
    items: [
      { title: 'Users', icon: Users, href: '/admin/users' },
      { title: 'Resumes', icon: FileText, href: '/admin/resumes' },
      { title: 'Sections', icon: Columns, href: '/admin/sections' },
      { title: 'AI Content', icon: Sparkles, href: '/admin/ai-settings' },
      { title: 'Media Library', icon: Image, href: '/admin/media' },
    ]
  },
  {
    groupName: 'BILLING',
    items: [
      { title: 'Subscriptions', icon: CreditCard, href: '/admin/subscriptions' },
      { title: 'Payments', icon: Coins, href: '/admin/payments' },
      { title: 'Orders', icon: ShoppingCart, href: '/admin/invoices' },
      { title: 'Coupons', icon: Ticket, href: '/admin/coupons' },
    ]
  },
  {
    groupName: 'CONTENT',
    items: [
      { title: 'Blog Posts', icon: BookOpen, href: '/admin/blog' },
      { title: 'Email Templates', icon: Mail, href: '/admin/email-templates' },
      { title: 'Notifications', icon: Bell, href: '/admin/notifications' },
    ]
  },
  {
    groupName: 'SYSTEM',
    items: [
      { title: 'Analytics', icon: LineChart, href: '/admin/analytics' },
      { title: 'Activity Logs', icon: Activity, href: '/admin/activity-logs' },
      { title: 'Settings', icon: Settings, href: '/admin/settings' },
      { title: 'Roles & Permissions', icon: ShieldAlert, href: '/admin/roles' },
    ]
  }
];

export default function Sidebar({ open, setOpen }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout, user } = useAuthStore();
  const [showFooterMenu, setShowFooterMenu] = useState(false);

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  const isLinkActive = (href: string) => {
    if (href === '/admin') {
      return pathname === '/admin';
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div className="fixed inset-0 bg-slate-900/40 lg:hidden z-40" onClick={() => setOpen(false)} />
      )}

      <div
        className={`fixed left-0 top-0 h-screen w-64 bg-white border-r border-slate-200/80 flex flex-col z-50 lg:z-0 transform transition-transform duration-300 ease-in-out ${
          open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo Section */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-slate-100 flex-shrink-0">
          <Link href="/" className="flex items-center gap-2 group" title="Go to Homepage">
            <img src="/logo.svg" alt="GetEasyCV" className="h-10 w-auto object-contain" />
          </Link>
          <button
            onClick={() => setOpen(false)}
            className="lg:hidden p-1.5 hover:bg-slate-50 rounded-md text-slate-500 hover:text-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Navigation */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          {/* Dashboard Home Link (Standalone) */}
          <div className="px-3">
            <Link
              href="/admin"
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-bold transition-all ${
                pathname === '/admin'
                  ? 'bg-violet-50 text-violet-600'
                  : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50/80'
              }`}
            >
              <LayoutDashboard className={`w-[18px] h-[18px] ${pathname === '/admin' ? 'text-violet-600' : 'text-slate-500'}`} />
              <span>Dashboard</span>
            </Link>
          </div>

          {/* Grouped Links */}
          {SIDEBAR_GROUPS.map((group) => (
            <div key={group.groupName} className="space-y-1">
              <div className="px-6 py-1.5 text-[10px] font-bold tracking-widest text-slate-500 uppercase">
                {group.groupName}
              </div>
              <div className="px-3 space-y-[2px]">
                {group.items.map((item) => {
                  const active = isLinkActive(item.href);
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-semibold transition-all ${
                        active
                          ? 'bg-violet-50 text-violet-600'
                          : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50/80'
                      }`}
                    >
                      <Icon className={`w-[18px] h-[18px] ${active ? 'text-violet-600' : 'text-slate-500'}`} />
                      <span className="truncate">{item.title}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* User Profile Footer */}
        <div className="border-t border-slate-100 p-4 flex items-center justify-between gap-3 bg-white flex-shrink-0 relative">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-200 flex items-center justify-center font-bold text-slate-600">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name || 'User'} className="w-full h-full object-cover" />
              ) : (
                user?.name?.[0]?.toUpperCase() || 'A'
              )}
            </div>
            <div className="min-w-0">
              <span className="block text-sm font-bold text-slate-900 truncate">{user?.name || 'Admin User'}</span>
              <span className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider truncate">{user?.role || 'Admin'}</span>
            </div>
          </div>
          <div className="relative">
            <button
              onClick={() => setShowFooterMenu(!showFooterMenu)}
              className="p-1.5 hover:bg-slate-50 rounded-md text-slate-400 hover:text-slate-700 transition-colors"
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            {/* Dropdown Options */}
            {showFooterMenu && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowFooterMenu(false)} />
                <div className="absolute right-0 bottom-full mb-2 w-48 rounded-[20px] border border-slate-200/70 bg-white p-1.5 shadow-xl z-20 space-y-1">
                  <Link
                    href="/dashboard"
                    onClick={() => setShowFooterMenu(false)}
                    className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    <FileText className="w-4 h-4 text-slate-400" />
                    <span>User Dashboard</span>
                  </Link>
                  <Link
                    href="/admin/settings"
                    onClick={() => setShowFooterMenu(false)}
                    className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    <Settings className="w-4 h-4 text-slate-400" />
                    <span>Admin Settings</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-sm font-semibold text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="w-4 h-4 text-red-400" />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
