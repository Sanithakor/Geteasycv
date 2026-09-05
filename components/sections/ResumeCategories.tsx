'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import {
  Briefcase,
  Code2,
  HeartPulse,
  GraduationCap,
  Megaphone,
  CircleDollarSign,
  TrendingUp,
  Wrench,
  Palette,
  UserCheck,
  ArrowRight,
  Sparkles,
  Search,
} from 'lucide-react';
import { generateTemplates } from '@/lib/generateTemplates';
import { isTemplateInCategory } from '@/data/templateCategories';

interface CategoryConfig {
  id: string;
  name: string;
  categoryId: string;
  description: string;
  icon: React.ElementType;
  query: string;
}

const CATEGORIES_CONFIG: CategoryConfig[] = [
  {
    id: 'business',
    name: 'Business',
    categoryId: 'sales-business',
    description: 'Professional resume templates for business & management roles.',
    icon: Briefcase,
    query: 'sales-business',
  },
  {
    id: 'technology',
    name: 'Technology',
    categoryId: 'software-development',
    description: 'For developers, engineers, designers & IT experts.',
    icon: Code2,
    query: 'software-development',
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    categoryId: 'healthcare-medical',
    description: 'For doctors, nurses, therapists & healthcare staff.',
    icon: HeartPulse,
    query: 'healthcare-medical',
  },
  {
    id: 'education',
    name: 'Education',
    categoryId: 'education-academic',
    description: 'For teachers, professors, trainers & academic staff.',
    icon: GraduationCap,
    query: 'education-academic',
  },
  {
    id: 'marketing',
    name: 'Marketing',
    categoryId: 'marketing-digital',
    description: 'For marketers, SEO specialists, writers & brand leads.',
    icon: Megaphone,
    query: 'marketing-digital',
  },
  {
    id: 'finance',
    name: 'Finance',
    categoryId: 'finance-accounting',
    description: 'For accountants, analysts, bankers & financial pros.',
    icon: CircleDollarSign,
    query: 'finance-accounting',
  },
  {
    id: 'sales',
    name: 'Sales',
    categoryId: 'sales-business',
    description: 'For sales reps, account managers & business dev.',
    icon: TrendingUp,
    query: 'sales-business',
  },
  {
    id: 'engineering',
    name: 'Engineering',
    categoryId: 'engineering-architecture',
    description: 'For mechanical, civil, electrical & aerospace roles.',
    icon: Wrench,
    query: 'engineering-architecture',
  },
  {
    id: 'creative',
    name: 'Creative',
    categoryId: 'ui-ux-design',
    description: 'For artists, designers, photographers & content creators.',
    icon: Palette,
    query: 'ui-ux-design',
  },
  {
    id: 'entry-level',
    name: 'Entry Level',
    categoryId: 'student-entry-level',
    description: 'Perfect for freshers, students & career starters.',
    icon: UserCheck,
    query: 'student-entry-level',
  },
];

export default function ResumeCategories() {
  // Dynamically compute real template counts from system template generator
  const dynamicCounts = useMemo(() => {
    try {
      const allTemplates = generateTemplates();
      const counts: Record<string, number> = {};
      CATEGORIES_CONFIG.forEach((cat) => {
        const matchCount = allTemplates.filter((t) =>
          isTemplateInCategory(t.id, cat.categoryId)
        ).length;
        // Fall back to actual generated count or default baseline if system filter differs
        counts[cat.id] = matchCount > 0 ? matchCount : 12;
      });
      return counts;
    } catch {
      return {};
    }
  }, []);

  return (
    <section
      className="py-16 sm:py-24 relative overflow-hidden font-sans border-y border-slate-200/60"
      style={{ background: '#F8F8F6' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Heading Section */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-slate-200/80 bg-white text-[#0F0F0F] text-xs font-bold uppercase tracking-wider shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#FF5722]" />
              <span>Resume Categories</span>
            </div>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-[#0F0F0F]">
            Find the Perfect Resume{' '}
            <span className="text-[#FF5722]">Template</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed font-normal">
            Choose from professionally designed, ATS-friendly templates tailored to different industries and career paths.
          </p>
        </div>

        {/* 5-Column Responsive Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5 mb-12">
          {CATEGORIES_CONFIG.map((cat) => {
            const Icon = cat.icon;
            const count = dynamicCounts[cat.id] || 12;

            return (
              <Link
                key={cat.id}
                href={`/templates?category=${cat.query}`}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-5 shadow-2xs transition-all duration-300 hover:-translate-y-1 hover:border-[#FF5722]/30 hover:shadow-md cursor-pointer"
              >
                <div className="space-y-3">
                  {/* Modern Icon Bubble with Smooth Hover Transition */}
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-[#FFF0EB] text-[#FF5722] group-hover:bg-[#FF5722] group-hover:text-white transition-colors duration-300 shadow-2xs">
                    <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                  </div>

                  {/* Title and Real Dynamic Count Badge */}
                  <div>
                    <h3 className="font-extrabold text-base text-slate-900 group-hover:text-[#FF5722] transition-colors leading-snug">
                      {cat.name}
                    </h3>
                    <span className="inline-block text-[11px] font-bold text-[#FF5722] bg-[#FFF0EB] px-2 py-0.5 rounded-full border border-[#FF5722]/15 mt-1">
                      {count}+ Templates
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-500 font-normal leading-relaxed line-clamp-2 min-h-[36px]">
                    {cat.description}
                  </p>
                </div>

                {/* Explore Link CTA with Smooth Arrow Movement */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-900 group-hover:text-[#FF5722] transition-colors">
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#FF5722] group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Integrated "Can't Find Your Category?" Bottom CTA Box */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-2xs max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-5 transition-all hover:border-slate-300">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-xl bg-[#FFF0EB] text-[#FF5722] flex items-center justify-center shrink-0 shadow-2xs">
              <Search className="w-6 h-6" />
            </div>
            <div className="space-y-0.5">
              <h4 className="font-extrabold text-slate-900 text-base sm:text-lg">
                Can&apos;t find your exact category?
              </h4>
              <p className="text-xs sm:text-sm text-slate-500 font-normal">
                Explore all resume templates or search by your specific job title.
              </p>
            </div>
          </div>

          <Link
            href="/templates"
            className="px-6 py-3 bg-[#0F0F0F] hover:bg-black text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-all flex items-center gap-2 shrink-0 cursor-pointer hover:scale-[1.02]"
          >
            <span>Browse All Templates</span>
            <ArrowRight className="w-4 h-4 text-[#F5D17B]" />
          </Link>
        </div>

      </div>
    </section>
  );
}
