'use client';

import React from 'react';
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
  FileText
} from 'lucide-react';

interface CategoryItem {
  id: string;
  name: string;
  count: string;
  description: string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  countColor: string;
  query: string;
}

const CATEGORIES: CategoryItem[] = [
  {
    id: 'business',
    name: 'Business',
    count: '120+ Templates',
    description: 'For managers, analysts, consultants & executives',
    icon: Briefcase,
    iconBg: 'bg-purple-100/80',
    iconColor: 'text-purple-600',
    countColor: 'text-purple-600',
    query: 'business',
  },
  {
    id: 'technology',
    name: 'Technology',
    count: '150+ Templates',
    description: 'For developers, engineers, designers & IT professionals',
    icon: Code2,
    iconBg: 'bg-emerald-100/80',
    iconColor: 'text-emerald-600',
    countColor: 'text-emerald-600',
    query: 'technology',
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    count: '90+ Templates',
    description: 'For doctors, nurses, therapists & healthcare staff',
    icon: HeartPulse,
    iconBg: 'bg-sky-100/80',
    iconColor: 'text-sky-600',
    countColor: 'text-sky-600',
    query: 'healthcare',
  },
  {
    id: 'education',
    name: 'Education',
    count: '80+ Templates',
    description: 'For teachers, professors, trainers & academic experts',
    icon: GraduationCap,
    iconBg: 'bg-orange-100/80',
    iconColor: 'text-orange-600',
    countColor: 'text-orange-600',
    query: 'education',
  },
  {
    id: 'marketing',
    name: 'Marketing',
    count: '100+ Templates',
    description: 'For marketers, SEO experts, content writers & more',
    icon: Megaphone,
    iconBg: 'bg-pink-100/80',
    iconColor: 'text-pink-600',
    countColor: 'text-pink-600',
    query: 'marketing',
  },
  {
    id: 'finance',
    name: 'Finance',
    count: '110+ Templates',
    description: 'For accountants, analysts, bankers & financial experts',
    icon: CircleDollarSign,
    iconBg: 'bg-cyan-100/80',
    iconColor: 'text-cyan-600',
    countColor: 'text-cyan-600',
    query: 'finance',
  },
  {
    id: 'sales',
    name: 'Sales',
    count: '70+ Templates',
    description: 'For sales reps, account managers & business dev.',
    icon: ShoppingCart,
    iconBg: 'bg-indigo-100/80',
    iconColor: 'text-indigo-600',
    countColor: 'text-indigo-600',
    query: 'sales',
  },
  {
    id: 'engineering',
    name: 'Engineering',
    count: '130+ Templates',
    description: 'For mechanical, civil, electrical & aerospace eng.',
    icon: Wrench,
    iconBg: 'bg-amber-100/80',
    iconColor: 'text-amber-600',
    countColor: 'text-amber-600',
    query: 'engineering',
  },
  {
    id: 'creative',
    name: 'Creative',
    count: '90+ Templates',
    description: 'For artists, designers, photographers & writers',
    icon: Palette,
    iconBg: 'bg-purple-100/80',
    iconColor: 'text-purple-600',
    countColor: 'text-purple-600',
    query: 'creative',
  },
  {
    id: 'entry-level',
    name: 'Entry Level',
    count: '60+ Templates',
    description: 'Perfect for freshers and career starters',
    icon: User,
    iconBg: 'bg-teal-100/80',
    iconColor: 'text-teal-600',
    countColor: 'text-teal-600',
    query: 'entry-level',
  },
];

export default function ResumeCategories() {
  return (
    <section className="py-16 sm:py-20 bg-slate-50/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center justify-center gap-3 mb-3">
            <span className="w-6 h-[1.5px] bg-violet-400/60 rounded-full"></span>
            <span className="text-xs sm:text-5 font-bold uppercase tracking-widest text-violet-600">
              Resume Categories
            </span>
            <span className="w-6 h-[1.5px] bg-violet-400/60 rounded-full"></span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-tight mb-4">
            Find the Perfect Resume for Your Career
          </h2>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Choose from a wide range of professional resume templates<br className="hidden sm:block" />
            designed for every industry and experience level.
          </p>

          <div className="w-12 h-1 bg-violet-600 rounded-full mx-auto mt-5"></div>
        </div>

        {/* Categories Grid (5 columns on desktop, 2-3 on tablet, 1 on mobile) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5 mb-8">
          {CATEGORIES.map((cat) => {
            const IconComponent = cat.icon;
            return (
              <Link
                key={cat.id}
                href={`/templates?category=${cat.query}`}
                className="group bg-white rounded-md p-6 border border-slate-200/70 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center cursor-pointer relative overflow-hidden"
              >
                {/* Icon Container */}
                <div className={`w-14 h-14 rounded-full ${cat.iconBg} flex items-center justify-center mb-4 `}>
                  <IconComponent className={`w-6 h-6 ${cat.iconColor}`} />
                </div>

                {/* Title */}
                <h3 className="font-bold text-slate-900 text-base group-hover:text-violet-600 transition-colors">
                  {cat.name}
                </h3>

                {/* Template Count */}
                <span className={`text-xs sm:text-sm font-bold mt-1 mb-2 ${cat.countColor}`}>
                  {cat.count}
                </span>

                {/* Description */}
                <p className="text-slate-500 text-xs leading-relaxed max-w-[190px]">
                  {cat.description}
                </p>
              </Link>
            );
          })}
        </div>

        {/* Bottom Banner Card */}
        <div className="bg-violet-50/70 border border-violet-100/90 rounded-md p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-5xl mx-auto mb-10 shadow-2xs">
          <div className="flex items-center gap-3.5 text-center sm:text-left">
            <div className="w-10 h-10 rounded-full bg-violet-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-violet-500/20">
              <Star className="w-5 h-5 fill-white text-white" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                Can't find your category?
              </h4>
              <p className="text-xs sm:text-sm text-slate-500">
                We have templates for every profession and custom roles.
              </p>
            </div>
          </div>

          <Link
            href="/templates"
            className="text-violet-700 hover:text-violet-900 font-bold text-sm flex items-center gap-1.5 group transition-colors cursor-pointer shrink-0"
          >
            <span>Browse All Templates</span>
            <ArrowRight className="w-4 h-4 hover:translate-x-1" />
          </Link>
        </div>

        {/* Main CTA Button */}
        <div className="flex justify-center">
          <Link
            href="/templates"
            className="bg-violet-600 hover:bg-violet-700 text-white font-bold px-8 py-3.5 rounded-md shadow-lg shadow-violet-600/25 flex items-center gap-2.5 transition-all active:scale-95 text-sm sm:text-base cursor-pointer"
          >
            <FileText className="w-4 h-4 text-violet-200" />
            <span>Explore All Templates</span>
          </Link>
        </div>

      </div>
    </section>
  );
}
