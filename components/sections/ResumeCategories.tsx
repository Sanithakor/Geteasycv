'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Briefcase,
  Code2,
  HeartPulse,
  GraduationCap,
  Megaphone,
  CircleDollarSign,
  ShoppingCart,
  Wrench,
  Palette,
  User,
  Star,
  ArrowRight,
  Sparkles,
  Layers,
} from 'lucide-react';

interface CategoryItem {
  id: string;
  name: string;
  count: string;
  description: string;
  icon: React.ElementType;
  query: string;
  accentColor: string;
  iconBg: string;
  iconColor: string;
  badgeBg: string;
  badgeColor: string;
  group: 'business' | 'tech' | 'creative' | 'general';
}

const CATEGORIES: CategoryItem[] = [
  {
    id: 'business',
    name: 'Business & Management',
    count: '120+ Templates',
    description: 'Executive leaders, operations, consultants & business analysts',
    icon: Briefcase,
    query: 'business',
    accentColor: '#6366F1',
    iconBg: 'bg-indigo-50/80',
    iconColor: 'text-indigo-600',
    badgeBg: 'bg-indigo-50',
    badgeColor: 'text-indigo-700',
    group: 'business',
  },
  {
    id: 'technology',
    name: 'Tech & Software',
    count: '150+ Templates',
    description: 'Full-stack engineers, cloud architects, DevOps & IT leads',
    icon: Code2,
    query: 'technology',
    accentColor: '#0284C7',
    iconBg: 'bg-sky-50/80',
    iconColor: 'text-sky-600',
    badgeBg: 'bg-sky-50',
    badgeColor: 'text-sky-700',
    group: 'tech',
  },
  {
    id: 'healthcare',
    name: 'Healthcare & Medicine',
    count: '90+ Templates',
    description: 'Physicians, registered nurses, therapists & clinical specialists',
    icon: HeartPulse,
    query: 'healthcare',
    accentColor: '#E11D48',
    iconBg: 'bg-rose-50/80',
    iconColor: 'text-rose-600',
    badgeBg: 'bg-rose-50',
    badgeColor: 'text-rose-700',
    group: 'general',
  },
  {
    id: 'finance',
    name: 'Finance & Banking',
    count: '110+ Templates',
    description: 'Chartered accountants, investment bankers & risk analysts',
    icon: CircleDollarSign,
    query: 'finance',
    accentColor: '#059669',
    iconBg: 'bg-emerald-50/80',
    iconColor: 'text-emerald-600',
    badgeBg: 'bg-emerald-50',
    badgeColor: 'text-emerald-700',
    group: 'business',
  },
  {
    id: 'marketing',
    name: 'Marketing & Growth',
    count: '100+ Templates',
    description: 'Growth marketers, content strategists, SEO & brand directors',
    icon: Megaphone,
    query: 'marketing',
    accentColor: '#EA580C',
    iconBg: 'bg-orange-50/80',
    iconColor: 'text-orange-600',
    badgeBg: 'bg-orange-50',
    badgeColor: 'text-orange-700',
    group: 'business',
  },
  {
    id: 'engineering',
    name: 'Engineering & Hardware',
    count: '130+ Templates',
    description: 'Mechanical, electrical, civil, biomedical & robotics engineers',
    icon: Wrench,
    query: 'engineering',
    accentColor: '#4F46E5',
    iconBg: 'bg-blue-50/80',
    iconColor: 'text-blue-600',
    badgeBg: 'bg-blue-50',
    badgeColor: 'text-blue-700',
    group: 'tech',
  },
  {
    id: 'creative',
    name: 'Design & Creative',
    count: '90+ Templates',
    description: 'UI/UX designers, art directors, 3D artists & copywriters',
    icon: Palette,
    query: 'creative',
    accentColor: '#9333EA',
    iconBg: 'bg-purple-50/80',
    iconColor: 'text-purple-600',
    badgeBg: 'bg-purple-50',
    badgeColor: 'text-purple-700',
    group: 'creative',
  },
  {
    id: 'sales',
    name: 'Sales & Business Dev',
    count: '70+ Templates',
    description: 'Enterprise account executives, SDRs & client partners',
    icon: ShoppingCart,
    query: 'sales',
    accentColor: '#D97706',
    iconBg: 'bg-amber-50/80',
    iconColor: 'text-amber-600',
    badgeBg: 'bg-amber-50',
    badgeColor: 'text-amber-700',
    group: 'business',
  },
  {
    id: 'education',
    name: 'Education & Academia',
    count: '80+ Templates',
    description: 'Professors, K-12 instructors, academic researchers & coaches',
    icon: GraduationCap,
    query: 'education',
    accentColor: '#0D9488',
    iconBg: 'bg-teal-50/80',
    iconColor: 'text-teal-600',
    badgeBg: 'bg-teal-50',
    badgeColor: 'text-teal-700',
    group: 'general',
  },
  {
    id: 'entry-level',
    name: 'Entry-Level & Students',
    count: '60+ Templates',
    description: 'College graduates, interns, career switchers & junior talent',
    icon: User,
    query: 'entry-level',
    accentColor: '#2563EB',
    iconBg: 'bg-cyan-50/80',
    iconColor: 'text-cyan-600',
    badgeBg: 'bg-cyan-50',
    badgeColor: 'text-cyan-700',
    group: 'general',
  },
];

export default function ResumeCategories() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'business' | 'tech' | 'creative' | 'general'>('all');

  const filteredCategories = activeFilter === 'all'
    ? CATEGORIES
    : CATEGORIES.filter((c) => c.group === activeFilter);

  return (
    <section className="py-20 sm:py-28 relative overflow-hidden font-sans bg-[#F8F8F6]">
      {/* Subtle modern ambient background mesh */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none overflow-hidden opacity-60">
        <div className="absolute -top-24 left-1/4 w-96 h-96 rounded-full bg-violet-200/40 blur-3xl" />
        <div className="absolute -top-12 right-1/4 w-96 h-96 rounded-full bg-sky-200/40 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/80 shadow-xs mb-5">
            <Sparkles className="w-3.5 h-3.5 text-violet-600" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Industry-Specific Templates
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight mb-4">
            Find the Perfect Resume for Your{' '}
            <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-sky-600 bg-clip-text text-transparent">
              Career Path
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Choose from a comprehensive library of ATS-parsed, recruiter-approved resume layouts tailored for distinct industries and career stages.
          </p>

          {/* Quick Filter Pill Controls */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-6">
            {[
              { id: 'all', label: 'All Industries (150+)' },
              { id: 'business', label: 'Business & Finance' },
              { id: 'tech', label: 'Tech & Engineering' },
              { id: 'creative', label: 'Creative & Media' },
              { id: 'general', label: 'Healthcare & Academia' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFilter(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  activeFilter === tab.id
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Categories Grid (2 rows of 5 on desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5 mb-12">
          {filteredCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.id}
                href={`/templates?category=${cat.query}`}
                className="group relative bg-white rounded-2xl p-5 border border-slate-200/90 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.04)] hover:shadow-xl hover:border-violet-300 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between text-left overflow-hidden"
              >
                {/* Subtle top indicator bar on hover */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: cat.accentColor }}
                />

                <div>
                  {/* Icon & Count Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center border border-slate-100 shadow-2xs group-hover:scale-110 transition-transform duration-300 ${cat.iconBg}`}
                    >
                      <Icon className={`w-5 h-5 ${cat.iconColor}`} />
                    </div>

                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${cat.badgeBg} ${cat.badgeColor}`}
                    >
                      {cat.count}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug mb-1.5 group-hover:text-violet-600 transition-colors">
                    {cat.name}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                    {cat.description}
                  </p>
                </div>

                {/* Footer Link */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-600 group-hover:text-violet-600 transition-colors">
                  <span>Explore templates</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 text-slate-400 group-hover:text-violet-600" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Standard Premium Bottom Banner */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm max-w-5xl mx-auto mb-10 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-80 h-full bg-gradient-to-l from-violet-50 to-transparent pointer-events-none" />

          <div className="flex items-center gap-4 text-center sm:text-left relative z-10">
            <div className="w-12 h-12 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center shrink-0 shadow-md">
              <Star className="w-6 h-6 fill-amber-400" />
            </div>
            <div>
              <h4 className="font-bold text-base sm:text-lg text-slate-900 leading-snug mb-1">
                Looking for a specialized or custom job title?
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 font-normal">
                Every template is 100% modular. Customize sections, headers, and bullet formats for any niche role in seconds.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 relative z-10 w-full sm:w-auto">
            <Link
              href="/templates"
              className="w-full sm:w-auto text-center px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Layers className="w-4 h-4 text-slate-600" />
              <span>Browse All 150+ Templates</span>
            </Link>
          </div>
        </div>

        {/* Global CTA Button */}
        <div className="flex justify-center">
          <Link
            href="/templates"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl text-white font-bold text-sm bg-slate-900 hover:bg-slate-800 shadow-md hover:shadow-lg transition-all hover:scale-102 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Explore All Resume Categories</span>
            <ArrowRight className="w-4 h-4 text-slate-400" />
          </Link>
        </div>
      </div>
    </section>
  );
}

