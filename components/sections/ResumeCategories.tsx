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
  Sparkles,
} from 'lucide-react';

interface CategoryItem {
  id: string;
  name: string;
  count: string;
  description: string;
  icon: React.ElementType;
  query: string;
  bgColor: string;
  borderColor: string;
}

const CATEGORIES: CategoryItem[] = [
  {
    id: 'business',
    name: 'Business',
    count: '120+ Templates',
    description: 'For managers, analysts, consultants & executives',
    icon: Briefcase,
    query: 'business',
    bgColor: '#FFE0CF',
    borderColor: 'rgba(255, 95, 95, 0.18)',
  },
  {
    id: 'technology',
    name: 'Technology',
    count: '150+ Templates',
    description: 'For developers, engineers, designers & IT experts',
    icon: Code2,
    query: 'technology',
    bgColor: '#B5C3F7',
    borderColor: 'rgba(181, 195, 247, 0.45)',
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    count: '90+ Templates',
    description: 'For doctors, nurses, therapists & healthcare staff',
    icon: HeartPulse,
    query: 'healthcare',
    bgColor: '#C9AFE8',
    borderColor: 'rgba(201, 175, 232, 0.45)',
  },
  {
    id: 'education',
    name: 'Education',
    count: '80+ Templates',
    description: 'For teachers, professors, trainers & academic staff',
    icon: GraduationCap,
    query: 'education',
    bgColor: '#FFE0CF',
    borderColor: 'rgba(255, 95, 95, 0.18)',
  },
  {
    id: 'marketing',
    name: 'Marketing',
    count: '100+ Templates',
    description: 'For marketers, SEO specialists, writers & brand leads',
    icon: Megaphone,
    query: 'marketing',
    bgColor: '#B5C3F7',
    borderColor: 'rgba(181, 195, 247, 0.45)',
  },
  {
    id: 'finance',
    name: 'Finance',
    count: '110+ Templates',
    description: 'For accountants, analysts, bankers & financial pros',
    icon: CircleDollarSign,
    query: 'finance',
    bgColor: '#C9AFE8',
    borderColor: 'rgba(201, 175, 232, 0.45)',
  },
  {
    id: 'sales',
    name: 'Sales',
    count: '70+ Templates',
    description: 'For sales reps, account managers & business dev.',
    icon: ShoppingCart,
    query: 'sales',
    bgColor: '#FFE0CF',
    borderColor: 'rgba(255, 95, 95, 0.18)',
  },
  {
    id: 'engineering',
    name: 'Engineering',
    count: '130+ Templates',
    description: 'For mechanical, civil, electrical & aerospace roles',
    icon: Wrench,
    query: 'engineering',
    bgColor: '#B5C3F7',
    borderColor: 'rgba(181, 195, 247, 0.45)',
  },
  {
    id: 'creative',
    name: 'Creative',
    count: '90+ Templates',
    description: 'For artists, designers, photographers & content creators',
    icon: Palette,
    query: 'creative',
    bgColor: '#C9AFE8',
    borderColor: 'rgba(201, 175, 232, 0.45)',
  },
  {
    id: 'entry-level',
    name: 'Entry Level',
    count: '60+ Templates',
    description: 'Perfect for freshers, students & career starters',
    icon: User,
    query: 'entry-level',
    bgColor: '#FFE0CF',
    borderColor: 'rgba(255, 95, 95, 0.18)',
  },
];

export default function ResumeCategories() {
  return (
    <section
      className="py-16 sm:py-24 relative overflow-hidden font-sans"
      style={{ background: '#F8F8F6' }}
    >
      {/* Soft ambient blur accents matching reference palette */}
      <div
        className="absolute -top-16 left-1/4 w-96 h-96 rounded-full opacity-35 pointer-events-none"
        style={{ background: '#B5C3F7', filter: 'blur(90px)' }}
      />
      <div
        className="absolute -bottom-16 right-1/4 w-96 h-96 rounded-full opacity-30 pointer-events-none"
        style={{ background: '#C9AFE8', filter: 'blur(90px)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          {/* Badge */}
          <div className="flex justify-center mb-4">
            <div
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wider shadow-2xs"
              style={{
                background: '#FFFFFF',
                borderColor: 'rgba(17,17,17,0.10)',
                color: '#111111',
              }}
            >
              <Sparkles className="w-3.5 h-3.5" style={{ color: '#FF5F5F' }} />
              <span>Resume Categories</span>
            </div>
          </div>

          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-4"
            style={{ color: '#111111' }}
          >
            Find the Perfect Resume for Your{' '}
            <span style={{ color: '#FF5F5F' }}>Career</span>
          </h2>

          <p
            className="text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: '#333333' }}
          >
            Choose from a wide range of professional, ATS-friendly resume templates tailored for every industry.
          </p>
        </div>

        {/* 5-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5 mb-10">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.id}
                href={`/templates?category=${cat.query}`}
                className="group rounded-2xl p-5 sm:p-6 border transition-all duration-300 flex flex-col items-center text-center justify-between relative overflow-hidden shadow-2xs hover:shadow-md hover:-translate-y-1"
                style={{
                  background: cat.bgColor,
                  borderColor: cat.borderColor,
                }}
              >
                <div className="flex flex-col items-center w-full">
                  {/* Rounded-square icon container */}
                  <div
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-105 shadow-2xs"
                    style={{ background: '#111111' }}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  <h3
                    className="font-bold text-base sm:text-lg mb-1 leading-snug tracking-tight"
                    style={{ color: '#111111' }}
                  >
                    {cat.name}
                  </h3>

                  <span
                    className="text-xs font-bold mb-2.5 px-2.5 py-0.5 rounded-full"
                    style={{
                      background: 'rgba(17, 17, 17, 0.08)',
                      color: '#111111',
                    }}
                  >
                    {cat.count}
                  </span>

                  <p
                    className="text-xs leading-relaxed font-normal"
                    style={{ color: '#2B2B2B' }}
                  >
                    {cat.description}
                  </p>
                </div>

                {/* Subtle hover indicator */}
                <div
                  className="mt-4 pt-3 border-t w-full flex items-center justify-center gap-1 text-[11px] font-bold opacity-75 group-hover:opacity-100 transition-opacity"
                  style={{
                    borderColor: 'rgba(17, 17, 17, 0.08)',
                    color: '#111111',
                  }}
                >
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Banner */}
        <div
          className="rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-5xl mx-auto mb-10 border shadow-2xs"
          style={{
            background: '#FFE0CF',
            borderColor: 'rgba(255, 95, 95, 0.20)',
          }}
        >
          <div className="flex items-center gap-3.5 text-center sm:text-left">
            <div
              className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 shadow-2xs"
              style={{ background: '#111111' }}
            >
              <Star className="w-5 h-5 text-white fill-white" />
            </div>
            <div>
              <h4
                className="font-bold text-sm sm:text-base leading-snug"
                style={{ color: '#111111' }}
              >
                Can&apos;t find your exact category?
              </h4>
              <p className="text-xs sm:text-sm font-normal" style={{ color: '#333333' }}>
                We offer versatile templates built for any profession or custom job title.
              </p>
            </div>
          </div>
          <Link
            href="/templates"
            className="font-bold text-xs sm:text-sm flex items-center gap-1.5 px-4 py-2 rounded-xl transition-all hover:bg-white/60 shrink-0"
            style={{
              background: '#FFFFFF',
              color: '#111111',
              border: '1px solid rgba(17, 17, 17, 0.10)',
            }}
          >
            Browse All Templates <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* CTA */}
        <div className="flex justify-center">
          <Link
            href="/templates"
            className="text-white font-bold px-8 py-3.5 rounded-xl shadow-md flex items-center gap-2.5 transition-all active:scale-95 text-xs sm:text-sm hover:opacity-90 hover:scale-105"
            style={{ background: '#111111' }}
          >
            <Sparkles className="w-4 h-4" style={{ color: '#FF5F5F' }} />
            <span>Explore All Templates</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
