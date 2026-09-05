'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { useAuthModalStore } from '@/lib/store/authModalStore';
import UserProfileDropdown from '@/components/auth/UserProfileDropdown';
import { Menu, X, LayoutDashboard } from 'lucide-react';

interface NavItem {
  name: string;
  href: string;
  highlight?: boolean;
}

const navItems: NavItem[] = [
  { name: 'Resume Builder', href: '/editor', highlight: true },
  { name: 'About us', href: '/about' },
  { name: 'Resume Templates', href: '/templates' },
  { name: 'Cover Letter Builder', href: '/cover-letter' },
  { name: 'Pricing & Plans', href: '/pricing' },
  { name: 'Contact us', href: '/contact' },
];

function OpenAuthWatcher() {
  const searchParams = useSearchParams();
  const { openLogin, openSignup } = useAuthModalStore();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    const param = searchParams.get('openAuth');
    if (!param) return;

    if (isAuthenticated) {
      const url = new URL(window.location.href);
      url.searchParams.delete('openAuth');
      url.searchParams.delete('callbackUrl');
      window.history.replaceState({}, '', url.toString());
      return;
    }

    const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
    if (param === 'signup') openSignup(callbackUrl);
    else openLogin(callbackUrl);
    const url = new URL(window.location.href);
    url.searchParams.delete('openAuth');
    url.searchParams.delete('callbackUrl');
    window.history.replaceState({}, '', url.toString());
  }, [searchParams, openLogin, openSignup, isAuthenticated]);

  return null;
}

function AuthHeartbeat() {
  const { isAuthenticated, token } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) return;

    const sendHeartbeat = async () => {
      try {
        await fetch('/api/users/heartbeat', {
          method: 'POST',
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
      } catch {}
    };

    sendHeartbeat();
    const interval = setInterval(sendHeartbeat, 120000);
    return () => clearInterval(interval);
  }, [isAuthenticated, token]);

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
      <AuthHeartbeat />

      <nav className="mx-auto flex h-16 max-w-[1340px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 font-sans">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <img src="/logo.svg" alt="GetEasyCV" className="h-9 sm:h-10 w-auto object-contain" />
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden items-center gap-1.5 lg:flex">
          {navItems.map((item) => {
            const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href) && pathname !== '/';

            if (item.highlight) {
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="rounded-full px-4 py-2 text-sm font-bold text-white transition-all hover:opacity-90 shadow-2xs mr-1"
                  style={{ background: '#F3645C' }}
                >
                  ⚡ {item.name}
                </Link>
              );
            }

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                  active
                    ? 'text-[#0F0F0F] font-bold'
                    : 'text-slate-700 hover:text-[#0F0F0F] hover:bg-slate-100/70'
                }`}
                style={active ? { background: '#F5D17B' } : undefined}
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Auth buttons */}
        <div className="hidden items-center gap-3 sm:flex min-h-[40px]">
          {!_hydrated ? (
            <div className="h-10 w-24 rounded-full bg-slate-100 animate-pulse" />
          ) : isAuthenticated ? (
            <UserProfileDropdown />
          ) : (
            <button
              type="button"
              onClick={() => openLogin(pathname)}
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
                className={`rounded-xl px-4 py-3 text-sm font-semibold transition-colors flex items-center justify-between ${
                  item.highlight
                    ? 'text-white font-bold'
                    : 'text-[#333333] hover:text-[#0F0F0F] hover:bg-[#F8F8F6]'
                }`}
                style={item.highlight ? { background: '#F3645C' } : undefined}
              >
                <span>{item.name}</span>
                {item.highlight && <span className="text-[10px] uppercase font-bold bg-white/25 px-2 py-0.5 rounded-full">Popular</span>}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t flex flex-col gap-2" style={{ borderColor: 'rgba(15,15,15,0.08)' }}>
            {!_hydrated ? (
              <div className="h-10 w-full rounded-xl bg-slate-100 animate-pulse" />
            ) : isAuthenticated ? (
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
                onClick={() => { setOpen(false); openLogin(pathname); }}
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
