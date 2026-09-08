'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { useAuthModalStore } from '@/lib/store/authModalStore';
import UserProfileDropdown from '@/components/auth/UserProfileDropdown';
import {
  Menu,
  X,
  LayoutDashboard,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  LayoutTemplate,
  CheckCircle2,
  Briefcase,
  FileText,
  Code2,
  Users,
  PenTool,
  Mail,
  ArrowRight,
  Zap,
  Wand2,
  FileCheck2,
} from 'lucide-react';

interface SubNavItem {
  name: string;
  description: string;
  href: string;
  badge?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface NavItem {
  name: string;
  href: string;
  highlight?: boolean;
  dropdown?: SubNavItem[];
}

const navItems: NavItem[] = [
  {
    name: 'Resume Builder',
    href: '/editor',
    highlight: true,
    dropdown: [
      {
        name: 'AI Resume Builder',
        description: 'Build your CV step-by-step with live AI suggestions',
        href: '/editor',
        badge: 'Popular',
        icon: Sparkles,
      },
      {
        name: 'ATS Resume Builder',
        description: 'Optimized formatting guaranteed to pass ATS filters',
        href: '/ats-resume-builder',
        icon: FileCheck2,
      },
      {
        name: 'ATS Resume Checker',
        description: 'Scan & score your existing resume for interview readiness',
        href: '/ats-checker',
        badge: 'Free',
        icon: ShieldCheck,
      },
      {
        name: 'AI Career Tools',
        description: 'Summary generator, bullet improver & job matcher',
        href: '/ai-features',
        icon: Wand2,
      },
    ],
  },
  {
    name: 'Resume Templates',
    href: '/templates',
    dropdown: [
      {
        name: 'All Resume Templates',
        description: 'Browse 150+ professionally designed templates',
        href: '/templates',
        icon: LayoutTemplate,
      },
      {
        name: 'ATS-Friendly Templates',
        description: 'Minimalist single-column layouts for maximum parse rate',
        href: '/templates',
        badge: 'Top Pick',
        icon: CheckCircle2,
      },
      {
        name: 'Modern & Executive',
        description: 'Polished corporate layouts for managers & leadership',
        href: '/templates',
        icon: Briefcase,
      },
    ],
  },
  {
    name: 'Resume Examples',
    href: '/resume-examples',
    dropdown: [
      {
        name: 'All Resume Examples',
        description: 'Explore verified resumes across 50+ career roles',
        href: '/resume-examples',
        icon: FileText,
      },
      {
        name: 'Software Engineer',
        description: 'Technical resume with skills, tech stack & impact',
        href: '/resume-examples/software-engineer',
        icon: Code2,
      },
      {
        name: 'Frontend Developer',
        description: 'UI/UX & web development focused experience',
        href: '/resume-examples/frontend-developer',
        icon: Zap,
      },
      {
        name: 'Project & Product Manager',
        description: 'Leadership, metrics, roadmap & agile execution',
        href: '/resume-examples/project-manager',
        icon: Users,
      },
    ],
  },
  {
    name: 'Cover Letter Builder',
    href: '/cover-letter',
    dropdown: [
      {
        name: 'Cover Letter Generator',
        description: 'Write tailored cover letters for any job in seconds',
        href: '/cover-letter/editor',
        badge: 'AI Powered',
        icon: PenTool,
      },
      {
        name: 'Cover Letter Templates',
        description: 'Matching templates that pair seamlessly with your CV',
        href: '/cover-letter',
        icon: Mail,
      },
    ],
  },
  {
    name: 'Pricing & Plans',
    href: '/pricing',
  },
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
  const { openLogin } = useAuthModalStore();
  
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  const handleMouseEnter = (name: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(name);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  const handleLogout = async () => {
    setMobileOpen(false);
    await logout();
    router.push('/');
  };

  const dashboardPath = user?.role === 'admin' ? '/admin' : '/dashboard';

  return (
    <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur-xl transition-all duration-200" style={{ borderColor: 'rgba(15,15,15,0.08)' }}>
      <Suspense fallback={null}>
        <OpenAuthWatcher />
      </Suspense>
      <AuthHeartbeat />

      <nav className="mx-auto flex h-16 max-w-[1340px] items-center justify-between gap-3 px-4 sm:px-6 lg:px-8 font-sans">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group shrink-0" title="GetEasyCV - Home">
          <img src="/logo.svg" alt="GetEasyCV" className="h-8 sm:h-9 w-auto object-contain transition-transform group-hover:scale-[1.02]" />
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden items-center gap-1 xl:gap-1.5 lg:flex">
          {navItems.map((item) => {
            const isCurrentActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href) && pathname !== '/';
            const isDropdownOpen = activeDropdown === item.name;

            if (item.highlight) {
              return (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(item.name)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs xl:text-sm font-bold text-white transition-all hover:opacity-95 shadow-2xs mr-0.5"
                    style={{ background: '#F3645C' }}
                  >
                    <Sparkles className="w-3.5 h-3.5 fill-white text-white" />
                    <span>{item.name}</span>
                    {item.dropdown && (
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    )}
                  </Link>

                  {/* Dropdown Menu */}
                  {item.dropdown && isDropdownOpen && (
                    <div
                      className="absolute top-full left-0 pt-2.5 z-50 w-80 animate-in fade-in slide-in-from-top-1 duration-150"
                      onMouseEnter={() => handleMouseEnter(item.name)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="rounded-2xl bg-white p-2.5 shadow-2xl border border-slate-100 ring-1 ring-black/5 space-y-1">
                        {item.dropdown.map((subItem) => {
                          const IconComp = subItem.icon;
                          return (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="group flex items-start gap-3 rounded-xl p-2.5 transition-all hover:bg-slate-50"
                            >
                              {IconComp && (
                                <div className="mt-0.5 w-8 h-8 rounded-lg bg-rose-50 border border-rose-100 flex items-center justify-center text-[#F3645C] shrink-0 group-hover:bg-[#F3645C] group-hover:text-white transition-colors">
                                  <IconComp className="w-4 h-4" />
                                </div>
                              )}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-1.5">
                                  <span className="text-xs font-bold text-slate-900 group-hover:text-[#F3645C] transition-colors">
                                    {subItem.name}
                                  </span>
                                  {subItem.badge && (
                                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-rose-100 text-[#F3645C]">
                                      {subItem.badge}
                                    </span>
                                  )}
                                </div>
                                <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                                  {subItem.description}
                                </p>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.dropdown ? handleMouseEnter(item.name) : undefined}
                onMouseLeave={item.dropdown ? handleMouseLeave : undefined}
              >
                <Link
                  href={item.href}
                  className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs xl:text-sm font-semibold transition-all ${
                    isCurrentActive
                      ? 'text-[#0F0F0F] font-bold'
                      : 'text-slate-700 hover:text-[#0F0F0F] hover:bg-slate-100/70'
                  }`}
                  style={isCurrentActive ? { background: '#F5D17B' } : undefined}
                >
                  <span>{item.name}</span>
                  {item.dropdown && (
                    <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180 text-slate-900' : ''}`} />
                  )}
                </Link>

                {/* Dropdown Menu */}
                {item.dropdown && isDropdownOpen && (
                  <div
                    className="absolute top-full left-0 pt-2.5 z-50 w-72 animate-in fade-in slide-in-from-top-1 duration-150"
                    onMouseEnter={() => handleMouseEnter(item.name)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="rounded-2xl bg-white p-2.5 shadow-2xl border border-slate-100 ring-1 ring-black/5 space-y-1">
                      {item.dropdown.map((subItem) => {
                        const IconComp = subItem.icon;
                        return (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="group flex items-start gap-3 rounded-xl p-2.5 transition-all hover:bg-slate-50"
                          >
                            {IconComp && (
                              <div className="mt-0.5 w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700 shrink-0 group-hover:bg-[#0F0F0F] group-hover:text-white transition-colors">
                                <IconComp className="w-3.5 h-3.5" />
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1.5">
                                <span className="text-xs font-bold text-slate-900 group-hover:text-[#0F0F0F] transition-colors">
                                  {subItem.name}
                                </span>
                                {subItem.badge && (
                                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-amber-100 text-amber-800">
                                    {subItem.badge}
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                                {subItem.description}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* User Auth Action (Desktop) */}
        <div className="hidden items-center gap-3 sm:flex min-h-[40px]">
          {!_hydrated ? (
            <div className="h-9 w-20 rounded-full bg-slate-100 animate-pulse" />
          ) : isAuthenticated ? (
            <UserProfileDropdown />
          ) : (
            <button
              type="button"
              onClick={() => openLogin(pathname)}
              className="rounded-full px-5 py-2 text-xs xl:text-sm font-bold text-white transition-all hover:opacity-90 cursor-pointer shadow-sm active:scale-95"
              style={{ background: '#0F0F0F' }}
            >
              Sign In
            </button>
          )}
        </div>

        {/* Mobile hamburger button */}
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-xl border text-[#0F0F0F] lg:hidden transition-colors"
          style={{ borderColor: 'rgba(15,15,15,0.15)', background: '#FFFFFF' }}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="border-t bg-white p-4 shadow-2xl lg:hidden space-y-4 max-h-[calc(100vh-64px)] overflow-y-auto animate-in slide-in-from-top-2 duration-200" style={{ borderColor: 'rgba(15,15,15,0.08)' }}>
          
          {/* Quick Action Top Button */}
          <Link
            href="/editor"
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl text-white font-bold text-sm shadow-md"
            style={{ background: '#F3645C' }}
          >
            <Sparkles className="w-4 h-4 fill-white" />
            <span>Create My Resume Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          {/* Navigation Links Group */}
          <div className="grid gap-1">
            {navItems.map((item) => {
              const isCurrentActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href) && pathname !== '/';
              const isExpanded = expandedMobile === item.name;

              return (
                <div key={item.name} className="rounded-xl overflow-hidden">
                  <div className="flex items-center justify-between">
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex-1 px-3.5 py-2.5 text-sm font-bold transition-colors ${
                        isCurrentActive
                          ? 'text-[#0F0F0F] bg-amber-50 font-extrabold'
                          : 'text-slate-800 hover:bg-slate-50'
                      }`}
                    >
                      {item.name}
                    </Link>

                    {item.dropdown && (
                      <button
                        type="button"
                        onClick={() => setExpandedMobile(isExpanded ? null : item.name)}
                        className="px-3 py-2.5 text-slate-400 hover:text-slate-900"
                        aria-label={`Expand ${item.name} menu`}
                      >
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                      </button>
                    )}
                  </div>

                  {/* Mobile Dropdown Sub-links */}
                  {item.dropdown && isExpanded && (
                    <div className="pl-4 pr-2 pb-2 space-y-1 bg-slate-50/80 rounded-b-xl border-t border-slate-100">
                      {item.dropdown.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center justify-between py-2 px-2.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-white"
                        >
                          <span>{sub.name}</span>
                          {sub.badge && (
                            <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-rose-100 text-[#F3645C]">
                              {sub.badge}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quick Resource Links on Mobile */}
          <div className="pt-2 border-t border-slate-100">
            <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Resources & Support
            </p>
            <div className="grid grid-cols-2 gap-1 text-xs font-semibold text-slate-600">
              <Link href="/how-it-works" onClick={() => setMobileOpen(false)} className="px-3 py-2 rounded-lg hover:bg-slate-50">
                How It Works
              </Link>
              <Link href="/blog" onClick={() => setMobileOpen(false)} className="px-3 py-2 rounded-lg hover:bg-slate-50">
                Career Blog
              </Link>
              <Link href="/faq" onClick={() => setMobileOpen(false)} className="px-3 py-2 rounded-lg hover:bg-slate-50">
                FAQs
              </Link>
              <Link href="/reviews" onClick={() => setMobileOpen(false)} className="px-3 py-2 rounded-lg hover:bg-slate-50">
                Reviews
              </Link>
            </div>
          </div>

          {/* Auth Button on Mobile */}
          <div className="pt-2 border-t flex flex-col gap-2" style={{ borderColor: 'rgba(15,15,15,0.08)' }}>
            {!_hydrated ? (
              <div className="h-10 w-full rounded-xl bg-slate-100 animate-pulse" />
            ) : isAuthenticated ? (
              <>
                <Link
                  href={dashboardPath}
                  onClick={() => setMobileOpen(false)}
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
                onClick={() => { setMobileOpen(false); openLogin(pathname); }}
                className="w-full rounded-xl px-4 py-3 text-center text-sm font-bold text-white shadow-sm"
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

