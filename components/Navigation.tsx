'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { useAuthModalStore } from '@/lib/store/authModalStore';
import UserProfileDropdown from '@/components/auth/UserProfileDropdown';
import { Menu, X, LayoutDashboard } from 'lucide-react';

const navItems = [
  { name: 'Home',         href: '/' },
  { name: 'Templates',    href: '/templates' },
  { name: 'Cover Letter', href: '/cover-letter' },
  { name: 'ATS Checker',  href: '/ats-checker' },
  { name: 'AI Features',  href: '/ai-features' },
  { name: 'Pricing',      href: '/pricing' },
];

/**
 * Small inner component that reads ?openAuth and ?callbackUrl and fires the modal.
 * Wrapped in Suspense in the parent so pages without Suspense boundaries don't break.
 */
function OpenAuthWatcher() {
  const searchParams = useSearchParams();
  const { openLogin, openSignup } = useAuthModalStore();

  useEffect(() => {
    const param = searchParams.get('openAuth');
    if (!param) return;

    // Respect callbackUrl so post-login redirect goes to the right place
    const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';

    if (param === 'signup') openSignup(callbackUrl);
    else openLogin(callbackUrl);

    // Strip auth params from URL without a full navigation
    const url = new URL(window.location.href);
    url.searchParams.delete('openAuth');
    url.searchParams.delete('callbackUrl');
    window.history.replaceState({}, '', url.toString());
  }, [searchParams, openLogin, openSignup]);

  return null;
}

export default function Navigation() {
  const pathname = usePathname();
  const router   = useRouter();
  const { isAuthenticated, user, logout, _hydrated } = useAuthStore();
  const { openLogin, openSignup } = useAuthModalStore();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    setOpen(false);
    await logout();
    router.push('/');
  };

  const dashboardPath = user?.role === 'admin' ? '/admin' : '/dashboard';

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
      {/* Watches for ?openAuth query param and fires the modal */}
      <Suspense fallback={null}>
        <OpenAuthWatcher />
      </Suspense>

      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <img src="/logo.svg" alt="GetEasyCV" className="h-10 w-auto object-contain" />
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const active =
              item.href === '/'
                ? pathname === '/'
                : pathname.startsWith(item.href) && pathname !== '/';
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  active
                    ? 'bg-teal-50 text-teal-700'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Right: auth buttons or user dropdown */}
        <div className="hidden items-center gap-3 sm:flex">
          {_hydrated && isAuthenticated ? (
            <UserProfileDropdown />
          ) : (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => openLogin()}
                className="rounded-full px-4 py-2 text-sm font-semibold text-slate-700 hover:text-slate-950 transition-colors cursor-pointer"
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => openSignup()}
                className="rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-slate-200 transition hover:bg-slate-800 cursor-pointer"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-md border border-slate-200 bg-white text-slate-700 lg:hidden"
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      {open && (
        <div className="border-t border-slate-100 bg-white p-4 shadow-xl lg:hidden space-y-3">
          <div className="grid gap-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            {_hydrated && isAuthenticated ? (
              <>
                <Link
                  href={dashboardPath}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-md bg-slate-950 px-4 py-3 text-center text-sm font-semibold text-white"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Go to Dashboard</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="rounded-md border border-red-200 bg-red-50 px-4 py-2.5 text-center text-sm font-semibold text-red-600"
                >
                  Log Out
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => { setOpen(false); openLogin(); }}
                  className="rounded-md border border-slate-200 bg-white px-4 py-3 text-center text-sm font-semibold text-slate-800"
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => { setOpen(false); openSignup(); }}
                  className="rounded-md bg-slate-950 px-4 py-3 text-center text-sm font-semibold text-white"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
