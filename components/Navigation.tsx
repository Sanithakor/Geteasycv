'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Templates', href: '/templates' },
  { name: 'Features', href: '/#features' },
  { name: 'Pricing', href: '/#pricing' },
  { name: 'Resume Examples', href: '/templates?category=ATS%20Friendly' },
  { name: 'Contact', href: '/#contact' },
];

export default function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-slate-950 to-teal-700 text-sm font-black text-white shadow-lg shadow-teal-100">
            CV
          </span>
          <span className="text-lg font-bold tracking-tight text-slate-950">GetEasyCV</span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const active = item.href === '/' ? pathname === '/' : item.href.startsWith(pathname) && pathname !== '/';
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  active ? 'bg-teal-50 text-teal-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-3 sm:flex">
          <Link href="/templates" className="rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-slate-200 transition hover:-translate-y-0.5 hover:bg-slate-800">
            Start building
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white text-slate-700 lg:hidden"
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          <span className="text-xl leading-none">{open ? 'x' : '='}</span>
        </button>
      </nav>

      {open && (
        <div className="border-t border-slate-100 bg-white p-4 shadow-xl lg:hidden">
          <div className="grid gap-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/templates"
              onClick={() => setOpen(false)}
              className="rounded-2xl bg-slate-950 px-4 py-3 text-center text-sm font-semibold text-white"
            >
              Start building
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
