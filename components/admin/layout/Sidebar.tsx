/**
 * Admin Sidebar Navigation
 * Modern collapsible sidebar with menu items
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, X } from 'lucide-react';

interface MenuItemConfig {
  title: string;
  icon: React.ReactNode;
  href?: string;
  submenu?: { title: string; href: string }[];
}

const MENU_ITEMS: MenuItemConfig[] = [
  {
    title: 'Dashboard',
    icon: <BarChart3 className="w-5 h-5" />,
    href: '/admin',
  },
  {
    title: 'Users',
    icon: <Users className="w-5 h-5" />,
    submenu: [
      { title: 'All Users', href: '/admin/users' },
      { title: 'Create User', href: '/admin/users/new' },
      { title: 'Roles & Permissions', href: '/admin/roles' },
    ],
  },
  {
    title: 'Resume Templates',
    icon: <FileText className="w-5 h-5" />,
    submenu: [
      { title: 'Templates', href: '/admin/templates' },
      { title: 'Categories', href: '/admin/template-categories' },
      { title: 'Create Template', href: '/admin/templates/new' },
    ],
  },
  {
    title: 'Template Builder',
    icon: <Palette className="w-5 h-5" />,
    submenu: [
      { title: 'Sections', href: '/admin/sections' },
      { title: 'Themes', href: '/admin/themes' },
      { title: 'AI Settings', href: '/admin/ai-settings' },
    ],
  },
  {
    title: 'Media Library',
    icon: <Image className="w-5 h-5" />,
    href: '/admin/media',
  },
  {
    title: 'Analytics',
    icon: <TrendingUp className="w-5 h-5" />,
    submenu: [
      { title: 'Overview', href: '/admin/analytics' },
      { title: 'Revenue', href: '/admin/analytics/revenue' },
      { title: 'Users', href: '/admin/analytics/users' },
      { title: 'Templates', href: '/admin/analytics/templates' },
    ],
  },
  {
    title: 'Subscriptions',
    icon: <CreditCard className="w-5 h-5" />,
    submenu: [
      { title: 'Plans', href: '/admin/subscriptions' },
      { title: 'Payments', href: '/admin/payments' },
      { title: 'Invoices', href: '/admin/invoices' },
      { title: 'Coupons', href: '/admin/coupons' },
    ],
  },
  {
    title: 'Support',
    icon: <HelpCircle className="w-5 h-5" />,
    submenu: [
      { title: 'Tickets', href: '/admin/support' },
      { title: 'FAQs', href: '/admin/faqs' },
      { title: 'Email Templates', href: '/admin/email-templates' },
    ],
  },
  {
    title: 'Content',
    icon: <BookOpen className="w-5 h-5" />,
    submenu: [
      { title: 'Blog', href: '/admin/blog' },
      { title: 'Email Campaigns', href: '/admin/campaigns' },
      { title: 'Notifications', href: '/admin/notifications' },
    ],
  },
  {
    title: 'Settings',
    icon: <Settings className="w-5 h-5" />,
    submenu: [
      { title: 'General', href: '/admin/settings' },
      { title: 'API Keys', href: '/admin/api-keys' },
      { title: 'Activity Logs', href: '/admin/activity-logs' },
      { title: 'System', href: '/admin/system' },
    ],
  },
];

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function Sidebar({ open, setOpen }: SidebarProps) {
  const pathname = usePathname();
  const [expandedMenu, setExpandedMenu] = React.useState<string | null>(null);

  const isMenuActive = (item: MenuItemConfig) => {
    if (item.href) return pathname.startsWith(item.href);
    return item.submenu?.some((sub) => pathname.startsWith(sub.href));
  };

  return (
    <>
      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-screen w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 transform transition-transform duration-300 ease-in-out z-50 lg:z-0 ${
          open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
              <span className="text-white font-bold text-sm">RC</span>
            </div>
            <span className="font-bold text-slate-900 dark:text-white hidden sm:inline">
              Resume Co
            </span>
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
            <div key={item.title}>
              {item.submenu ? (
                <button
                  onClick={() =>
                    setExpandedMenu(
                      expandedMenu === item.title ? null : item.title
                    )
                  }
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-medium transition-all ${
                    isMenuActive(item)
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span>{item.title}</span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      expandedMenu === item.title ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              ) : (
                <Link
                  href={item.href || '#'}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-all ${
                    isMenuActive(item)
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50'
                  }`}
                >
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              )}

              {/* Submenu */}
              {item.submenu && expandedMenu === item.title && (
                <div className="mt-1 space-y-1 pl-2 border-l-2 border-slate-200 dark:border-slate-700">
                  {item.submenu.map((subitem) => (
                    <Link
                      key={subitem.href}
                      href={subitem.href}
                      onClick={() => setOpen(false)}
                      className={`block px-3 py-2 text-sm rounded-lg transition-all ${
                        pathname === subitem.href
                          ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-semibold'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50'
                      }`}
                    >
                      {subitem.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-slate-200 dark:border-slate-700 p-4 space-y-2">
          <Link
            href="/admin/settings"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-all"
          >
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </Link>
          <button
            onClick={() => {
              // Logout logic here
            }}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
}

// Icons component
function BarChart3(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
      />
    </svg>
  );
}

function Users(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 4.354a4 4 0 110 8.048M12 4.354a4 4 0 100 8.048m0-8.048h.02M12 12c4.418 0 8 1.79 8 4v2H4v-2c0-2.21 3.582-4 8-4z"
      />
    </svg>
  );
}

function FileText(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  );
}

function Palette(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
      />
    </svg>
  );
}

function Image(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  );
}

function TrendingUp(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
      />
    </svg>
  );
}

function CreditCard(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 10h18M7 15h.01M11 15h.01M15 15h.01M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
      />
    </svg>
  );
}

function HelpCircle(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

function BookOpen(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 6.253v13m0-13C6.5 6.253 2 10.998 2 17.25m20-11.002c5.5.5 9 5.245 9 11.247M21 11.002v10.5a1.5 1.5 0 01-1.5 1.5H3.5A1.5 1.5 0 012 21.502v-10.5"
      />
    </svg>
  );
}

function Settings(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
}

function LogOut(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
      />
    </svg>
  );
}
