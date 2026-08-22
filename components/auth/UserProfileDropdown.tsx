'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { LayoutDashboard, FileText, User as UserIcon, Settings, LogOut, ChevronDown } from 'lucide-react';

const TIER_COLORS: Record<string, { bg: string; text: string }> = {
  ADMIN:   { bg: '#0F0F0F',    text: '#F5D17B' },
  PRO:     { bg: '#BAC7FE',    text: '#0F0F0F' },
  PREMIUM: { bg: '#D0B9EF',    text: '#0F0F0F' },
  FREE:    { bg: '#F8F8F6',    text: '#333333' },
};

export default function UserProfileDropdown() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    setOpen(false);
    await logout();
    router.push('/');
  };

  const dashboardPath = user?.role === 'admin' ? '/admin' : '/dashboard';
  const initial = user?.name?.[0]?.toUpperCase() || 'U';
  const tierKey = user?.role === 'admin' ? 'ADMIN' : (user?.tier || (user as any)?.subscriptionTier || 'FREE').toUpperCase();
  const tierStyle = TIER_COLORS[tierKey] || TIER_COLORS.FREE;

  const rawFirstName = user?.name ? user.name.trim().split(' ')[0] : 'Account';
  const firstName = rawFirstName.length > 8 ? rawFirstName.slice(0, 8) : rawFirstName;

  const menuLinks = [
    { href: dashboardPath,  label: 'Go to Dashboard', Icon: LayoutDashboard },
    { href: '/my-resumes',  label: 'My Resumes',       Icon: FileText         },
    { href: '/profile',     label: 'My Profile',       Icon: UserIcon         },
    { href: '/settings',    label: 'Settings',         Icon: Settings         },
  ];

  return (
    <div className="relative inline-block text-left">
      {/* Pill trigger */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2.5 rounded-full border px-3 py-1.5 transition-all focus:outline-none cursor-pointer"
        style={{ background: '#FFFFFF', borderColor: 'rgba(15,15,15,0.12)', color: '#0F0F0F' }}
      >
        <div className="w-7 h-7 rounded-full font-bold text-xs flex items-center justify-center flex-shrink-0"
          style={{ background: '#0F0F0F', color: '#F5D17B' }}>
          {initial}
        </div>
        <span className="text-xs font-bold truncate" style={{ color: '#0F0F0F' }}>{firstName}</span>
        <ChevronDown className="w-3.5 h-3.5" style={{ color: '#9ca3af' }} />
      </button>

      {/* Dropdown */}
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 mt-2 w-64 rounded-2xl border bg-white p-3 shadow-xl z-50 animate-in fade-in zoom-in-95 duration-150"
            style={{ borderColor: 'rgba(15,15,15,0.10)' }}>

            {/* User info */}
            <div className="px-2 py-1">
              <p className="text-sm font-bold truncate" style={{ color: '#0F0F0F' }}>{user?.name || 'User'}</p>
              <p className="text-xs truncate mt-0.5" style={{ color: '#9ca3af' }}>{user?.email || ''}</p>
              <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide"
                style={{ background: tierStyle.bg, color: tierStyle.text }}>
                {tierKey}
              </span>
            </div>

            <div className="my-2" style={{ borderTop: '1px solid rgba(15,15,15,0.08)' }} />

            {/* Links */}
            <div className="space-y-0.5">
              {menuLinks.map(({ href, label, Icon }) => (
                <Link key={href} href={href} onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-3 py-2 text-xs font-bold rounded-xl transition-colors"
                  style={{ color: '#333333' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#F8F8F6'; (e.currentTarget as HTMLElement).style.color = '#0F0F0F'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#333333'; }}>
                  <Icon className="w-4 h-4" style={{ color: '#9ca3af' }} />
                  <span>{label}</span>
                </Link>
              ))}

              <button onClick={handleLogout}
                className="flex w-full items-center gap-3 px-3 py-2 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                style={{ color: '#F3645C' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(243,100,92,0.08)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}>
                <LogOut className="w-4 h-4" style={{ color: '#F3645C' }} />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
