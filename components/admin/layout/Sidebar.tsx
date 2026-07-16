'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ChevronDown, X } from 'lucide-react';
import { useAuthStore } from '@/lib/store/authStore';
import {
  BarChartIcon,
  UsersIcon,
  FileTextIcon,
  PaletteIcon,
  ImageIcon,
  TrendingUpIcon,
  CreditCardIcon,
  HelpCircleIcon,
  BookOpenIcon,
  SettingsIcon,
  LogOutIcon,
} from '@/components/icons';

interface MenuItemConfig {
  title: string;
  icon: React.ReactNode;
  href?: string;
  submenu?: { title: string; href: string }[];
}

const MENU_ITEMS: MenuItemConfig[] = [
  {
    title: 'Dashboard',
    icon: <BarChartIcon className="w-5 h-5" />,
    href: '/admin',
  },
  {
    title: 'Users',
    icon: <UsersIcon className="w-5 h-5" />,
    submenu: [
      { title: 'All Users',          href: '/admin/users' },
      { title: 'Create User',        href: '/admin/users/new' },
      { title: 'Roles & Permissions', href: '/admin/roles' },
    ],
  },
  {
    title: 'Resume Templates',
    icon: <FileTextIcon className="w-5 h-5" />,
    submenu: [
      { title: 'Templates',        href: '/admin/templates' },
      { title: 'Categories',       href: '/admin/template-categories' },
      { title: 'Create Template',  href: '/admin/templates/new' },
    ],
  },
  {
    title: 'Template Builder',
    icon: <PaletteIcon className="w-5 h-5" />,
    submenu: [
      { title: 'Sections',     href: '/admin/sections' },
      { title: 'Themes',       href: '/admin/themes' },
      { title: 'AI Settings',  href: '/admin/ai-settings' },
    ],
  },
  {
    title: 'Media Library',
    icon: <ImageIcon className="w-5 h-5" />,
    href: '/admin/media',
  },
  {
    title: 'Analytics',
    icon: <TrendingUpIcon className="w-5 h-5" />,
    submenu: [
      { title: 'Overview',   href: '/admin/analytics' },
      { title: 'Revenue',    href: '/admin/analytics/revenue' },
      { title: 'Users',      href: '/admin/analytics/users' },
      { title: 'Templates',  href: '/admin/analytics/templates' },
    ],
  },
  {
    title: 'Subscriptions',
    icon: <CreditCardIcon className="w-5 h-5" />,
    submenu: [
      { title: 'Plans',     href: '/admin/subscriptions' },
      { title: 'Payments',  href: '/admin/payments' },
      { title: 'Invoices',  href: '/admin/invoices' },
      { title: 'Coupons',   href: '/admin/coupons' },
    ],
  },
  {
    title: 'Support',
    icon: <HelpCircleIcon className="w-5 h-5" />,
    submenu: [
      { title: 'Tickets',          href: '/admin/support' },
      { title: 'FAQs',             href: '/admin/faqs' },
      { title: 'Email Templates',  href: '/admin/email-templates' },
    ],
  },
  {
    title: 'Content',
    icon: <BookOpenIcon className="w-5 h-5" />,
    submenu: [
      { title: 'Blog',            href: '/admin/blog' },
      { title: 'Email Campaigns', href: '/admin/campaigns' },
      { title: 'Notifications',   href: '/admin/notifications' },
    ],
  },
  {
    title: 'Settings',
    icon: <SettingsIcon className="w-5 h-5" />,
    submenu: [
      { title: 'General',        href: '/admin/settings' },
      { title: 'API Keys',       href: '/admin/api-keys' },
      { title: 'Activity Logs',  href: '/admin/activity-logs' },
      { title: 'System',         href: '/admin/system' },
    ],
  },
];

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function Sidebar({ open, setOpen }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuthStore();
  const [expandedMenu, setExpandedMenu] = React.useState<string | null>(null);

  // Auto-expand the parent group whose child matches the current route.
  React.useEffect(() => {
    const activeParent = MENU_ITEMS.find(
      (item) => item.submenu?.some((sub) => pathname.startsWith(sub.href))
    );
    if (activeParent) setExpandedMenu(activeParent.title);
  }, [pathname]);

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  const isMenuActive = (item: MenuItemConfig) => {
    if (item.href) {
      return item.href === '/admin' ? pathname === '/admin' : pathname.startsWith(item.href);
    }
    return item.submenu?.some((sub) => pathname.startsWith(sub.href));
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
            <div key={item.title}>
              {item.submenu ? (
                <button
                  onClick={() => setExpandedMenu(expandedMenu === item.title ? null : item.title)}
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
        <div className="border-t border-slate-200 dark:border-slate-700 p-4 space-y-2 flex-shrink-0">
          <Link
            href="/admin/settings"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-all"
          >
            <SettingsIcon className="w-4 h-4" />
            <span>Settings</span>
          </Link>
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
