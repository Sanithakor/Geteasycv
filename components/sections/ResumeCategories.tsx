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
  group: 'business' | 'tech' | 'creative' | 'general';
}

const CATEGORIES: CategoryItem[] = [
  {
    id: 'business',
    name: 'Business & Management',
    count: '120+ Templates',
    description: 'Executive leaders, operations, strategy consultants & business analysts',
    icon: Briefcase,
    query: 'business',
    accentColor: '#0F0F0F',
    iconBg: '#F5D17B',
    group: 'business',
  },
  {
    id: 'technology',
    name: 'Tech & Software',
    count: '150+ Templates',
    description: 'Full-stack engineers, cloud architects, DevOps & technical team leads',
    icon: Code2,
    query: 'technology',
    accentColor: '#0F0F0F',
    iconBg: '#BAC7FE',
    group: 'tech',
  },
  {
    id: 'healthcare',
    name: 'Healthcare & Medicine',
    count: '90+ Templates',
    description: 'Physicians, registered nurses, therapists & clinical care specialists',
    icon: HeartPulse,
    query: 'healthcare',
    accentColor: '#0F0F0F',
    iconBg: '#FEE1CF',
    group: 'general',
  },
  {
    id: 'finance',
    name: 'Finance & Banking',
    count: '110+ Templates',
    description: 'Financial analysts, chartered accountants, bankers & risk auditors',
    icon: CircleDollarSign,
    query: 'finance',
    accentColor: '#0F0F0F',
    iconBg: '#58C09D',
    group: 'business',
  },
  {
    id: 'marketing',
    name: 'Marketing & Growth',
    count: '100+ Templates',
    description: 'Growth marketers, content strategists, SEO experts & brand directors',
    icon: Megaphone,
    query: 'marketing',
    accentColor: '#0F0F0F',
    iconBg: '#F5D17B',
    group: 'business',
  },
  {
    id: 'engineering',
    name: 'Engineering & Hardware',
    count: '130+ Templates',
    description: 'Mechanical, electrical, civil, aerospace & robotics engineers',
    icon: Wrench,
    query: 'engineering',
    accentColor: '#0F0F0F',
    iconBg: '#BAC7FE',
    group: 'tech',
  },
  {
    id: 'creative',
    name: 'Design & Creative',
    count: '90+ Templates',
    description: 'UI/UX designers, art directors, 3D illustrators & brand copywriters',
    icon: Palette,
    query: 'creative',
    accentColor: '#0F0F0F',
    iconBg: '#D0B9EF',
    group: 'creative',
  },
  {
    id: 'sales',
    name: 'Sales & Business Dev',
    count: '70+ Templates',
    description: 'Enterprise account executives, SDR managers & client partnership leads',
    icon: ShoppingCart,
    query: 'sales',
    accentColor: '#0F0F0F',
    iconBg: '#F5D17B',
    group: 'business',
  },
  {
    id: 'education',
    name: 'Education & Academia',
    count: '80+ Templates',
    description: 'Professors, academic researchers, K-12 educators & curriculum leads',
    icon: GraduationCap,
    query: 'education',
    accentColor: '#0F0F0F',
    iconBg: '#D0B9EF',
    group: 'general',
  },
  {
    id: 'entry-level',
    name: 'Entry-Level & Students',
    count: '60+ Templates',
    description: 'College graduates, interns, career switchers & early-career talent',
    icon: User,
    query: 'entry-level',
    accentColor: '#0F0F0F',
    iconBg: '#58C09D',
    group: 'general',
  },
];

export default function ResumeCategories() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'business' | 'tech' | 'creative' | 'general'>('all');

  const filteredCategories = activeFilter === 'all'
    ? CATEGORIES
    : CATEGORIES.filter((c) => c.group === activeFilter);

  return (
    <section className="py-16 sm:py-24 relative overflow-hidden font-sans bg-[#F8F8F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border shadow-2xs mb-4"
            style={{ borderColor: 'rgba(15,15,15,0.10)' }}>
            <Sparkles className="w-3.5 h-3.5" style={{ color: '#F3645C' }} />
            <span className="text-xs font-bold uppercase tracking-wider text-[#0F0F0F]">
              Industry-Specific Templates
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0F0F0F] leading-tight mb-4">
            Find the Perfect Resume for Your{' '}
            <span style={{ color: '#F3645C' }}>Career Path</span>
          </h2>

          <p className="text-sm sm:text-base lg:text-lg text-[#333333] leading-relaxed max-w-2xl mx-auto">
            Explore 150+ ATS-parsed, recruiter-approved resume layouts tailored for distinct industries, executive tracks, and career stages.
          </p>

          {/* Filter Pills */}
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
                    ? 'bg-[#0F0F0F] text-white shadow-sm'
                    : 'bg-white text-[#333333] border border-slate-200 hover:bg-slate-50 hover:text-[#0F0F0F]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Categories Grid (Responsive: 1 col on mobile, 2 on sm, 3 on md, 5 on lg) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5 mb-12">
          {filteredCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.id}
                href={`/templates?category=${cat.query}`}
                className="group relative bg-white rounded-2xl p-5 border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between text-left overflow-hidden cursor-pointer"
                style={{ borderColor: 'rgba(15,15,15,0.08)' }}
              >
                {/* Accent indicator line */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: '#F3645C' }}
                />

                <div>
                  {/* Icon & Count Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center border border-black/5 shadow-2xs group-hover:scale-105 transition-transform duration-300"
                      style={{ background: cat.iconBg }}
                    >
                      <Icon className="w-5 h-5 text-[#0F0F0F]" />
                    </div>

                    <span
                      className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700"
                    >
                      {cat.count}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-[#0F0F0F] text-sm sm:text-base leading-snug mb-1.5 group-hover:text-[#F3645C] transition-colors">
                    {cat.name}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-[#666666] leading-relaxed line-clamp-2">
                    {cat.description}
                  </p>
                </div>

                {/* Footer Link */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#333333] group-hover:text-[#F3645C] transition-colors">
                  <span>Explore templates</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 text-slate-400 group-hover:text-[#F3645C]" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Standard Premium Bottom Banner */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border shadow-sm max-w-5xl mx-auto mb-10 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden"
          style={{ borderColor: 'rgba(15,15,15,0.08)' }}>
          <div className="flex items-center gap-4 text-center sm:text-left relative z-10">
            <div className="w-12 h-12 rounded-xl bg-[#0F0F0F] text-[#F5D17B] flex items-center justify-center shrink-0 shadow-md">
              <Star className="w-6 h-6 fill-[#F5D17B]" />
            </div>
            <div>
              <h4 className="font-bold text-base sm:text-lg text-[#0F0F0F] leading-snug mb-1">
                Looking for a specialized or custom job title?
              </h4>
              <p className="text-xs sm:text-sm text-[#555555] font-normal leading-relaxed">
                Every template is 100% modular. Customize sections, reorder bullet points, and choose from modern font pairings in seconds.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 relative z-10 w-full sm:w-auto">
            <Link
              href="/templates"
              className="w-full sm:w-auto text-center px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-[#0F0F0F] bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center gap-2 cursor-pointer"
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
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl text-white font-bold text-sm bg-[#0F0F0F] hover:bg-black shadow-md hover:shadow-lg transition-all hover:scale-102 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#F5D17B]" />
            <span>Explore All Resume Categories</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </Link>
        </div>
      </div>
    </section>
  );
}

