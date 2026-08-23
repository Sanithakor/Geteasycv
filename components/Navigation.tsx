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

function OpenAuthWatcher() {
  const searchParams = useSearchParams();
  const { openLogin, openSignup } = useAuthModalStore();

  useEffect(() => {
    const param = searchParams.get('openAuth');
    if (!param) return;
    const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
    if (param === 'signup') openSignup(callbackUrl);
    else openLogin(callbackUrl);
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
    <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur-xl" style={{ borderColor: 'rgba(15,15,15,0.10)' }}>
      <Suspense fallback={null}>
        <OpenAuthWatcher />
      </Suspense>

      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <img src="/logo.svg" alt="GetEasyCV" className="h-10 w-auto object-contain" />
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href) && pathname !== '/';
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                  active
                    ? 'text-[#0F0F0F]'
                    : 'text-[#333333] hover:text-[#0F0F0F]'
                }`}
                style={active ? { background: '#F5D17B' } : undefined}
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Auth buttons */}
        <div className="hidden items-center gap-3 sm:flex">
          {_hydrated && isAuthenticated ? (
            <UserProfileDropdown />
          ) : (
            <button
              type="button"
              onClick={() => openLogin()}
              className="rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-all hover:opacity-90 cursor-pointer shadow-sm"
              style={{ background: '#0F0F0F' }}
            >
              Sign In
            </button>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-xl border text-[#0F0F0F] lg:hidden transition-colors"
          style={{ borderColor: 'rgba(15,15,15,0.15)', background: '#FFFFFF' }}
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="border-t bg-white p-4 shadow-xl lg:hidden space-y-3" style={{ borderColor: 'rgba(15,15,15,0.08)' }}>
          <div className="grid gap-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-semibold text-[#333333] hover:text-[#0F0F0F] transition-colors"
                style={{ background: 'transparent' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#F8F8F6')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t flex flex-col gap-2" style={{ borderColor: 'rgba(15,15,15,0.08)' }}>
            {_hydrated && isAuthenticated ? (
              <>
                <Link
                  href={dashboardPath}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-center text-sm font-bold text-white"
                  style={{ background: '#0F0F0F' }}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Go to Dashboard</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="rounded-xl border px-4 py-2.5 text-center text-sm font-semibold text-[#F3645C]"
                  style={{ borderColor: '#F3645C', background: 'rgba(243,100,92,0.06)' }}
                >
                  Log Out
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => { setOpen(false); openLogin(); }}
                className="w-full rounded-xl px-4 py-3 text-center text-sm font-bold text-white"
                style={{ background: '#0F0F0F' }}
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
