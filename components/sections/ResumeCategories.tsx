'use client';

import React from 'react';
import Link from 'next/link';
import { Briefcase, Code2, HeartPulse, GraduationCap, Megaphone, CircleDollarSign, ShoppingCart, Wrench, Palette, User, Star, ArrowRight, FileText } from 'lucide-react';

const ACCENT_CYCLE = ['#BAC7FE','#D0B9EF','#FEE1CF','#F5D17B','#58C09D33','#BAC7FE','#D0B9EF','#FEE1CF','#F5D17B','#58C09D33'];

const CATEGORIES = [
  { id: 'business',    name: 'Business',    count: '120+ Templates', description: 'For managers, analysts, consultants & executives',          icon: Briefcase,        query: 'business'     },
  { id: 'technology',  name: 'Technology',  count: '150+ Templates', description: 'For developers, engineers, designers & IT professionals',    icon: Code2,            query: 'technology'   },
  { id: 'healthcare',  name: 'Healthcare',  count: '90+ Templates',  description: 'For doctors, nurses, therapists & healthcare staff',        icon: HeartPulse,       query: 'healthcare'   },
  { id: 'education',   name: 'Education',   count: '80+ Templates',  description: 'For teachers, professors, trainers & academic experts',     icon: GraduationCap,    query: 'education'    },
  { id: 'marketing',   name: 'Marketing',   count: '100+ Templates', description: 'For marketers, SEO experts, content writers & more',       icon: Megaphone,        query: 'marketing'    },
  { id: 'finance',     name: 'Finance',     count: '110+ Templates', description: 'For accountants, analysts, bankers & financial experts',    icon: CircleDollarSign, query: 'finance'      },
  { id: 'sales',       name: 'Sales',       count: '70+ Templates',  description: 'For sales reps, account managers & business dev.',        icon: ShoppingCart,     query: 'sales'        },
  { id: 'engineering', name: 'Engineering', count: '130+ Templates', description: 'For mechanical, civil, electrical & aerospace eng.',       icon: Wrench,           query: 'engineering'  },
  { id: 'creative',    name: 'Creative',    count: '90+ Templates',  description: 'For artists, designers, photographers & writers',         icon: Palette,          query: 'creative'     },
  { id: 'entry-level', name: 'Entry Level', count: '60+ Templates',  description: 'Perfect for freshers and career starters',               icon: User,             query: 'entry-level'  },
];

export default function ResumeCategories() {
  return (
    <section className="py-16 sm:py-20 relative overflow-hidden" style={{ background: '#F8F8F6' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center justify-center gap-3 mb-3">
            <span className="w-6 h-[1.5px] rounded-full" style={{ background: '#BAC7FE' }} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#333333' }}>Resume Categories</span>
            <span className="w-6 h-[1.5px] rounded-full" style={{ background: '#BAC7FE' }} />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight mb-4" style={{ color: '#0F0F0F' }}>
            Find the Perfect Resume for Your Career
          </h2>
          <p className="text-base sm:text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: '#333333' }}>
            Choose from a wide range of professional resume templates designed for every industry.
          </p>
          <div className="w-12 h-1 rounded-full mx-auto mt-5" style={{ background: '#F3645C' }} />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5 mb-8">
          {CATEGORIES.map((cat, i) => {
            const Icon = cat.icon;
            const accent = ACCENT_CYCLE[i % ACCENT_CYCLE.length];
            return (
              <Link key={cat.id} href={`/templates?category=${cat.query}`}
                className="group bg-white rounded-2xl p-6 border hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center cursor-pointer relative overflow-hidden hover:-translate-y-1"
                style={{ borderColor: 'rgba(15,15,15,0.08)' }}>
                <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                  style={{ background: accent }}>
                  <Icon className="w-6 h-6" style={{ color: '#0F0F0F' }} />
                </div>
                <h3 className="font-bold text-base mb-1 transition-colors" style={{ color: '#0F0F0F' }}>{cat.name}</h3>
                <span className="text-xs sm:text-sm font-bold mt-0 mb-2" style={{ color: '#F3645C' }}>{cat.count}</span>
                <p className="text-xs leading-relaxed max-w-[190px]" style={{ color: '#333333' }}>{cat.description}</p>
              </Link>
            );
          })}
        </div>

        {/* Banner */}
        <div className="rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-5xl mx-auto mb-10 shadow-sm"
          style={{ background: '#BAC7FE', border: '1px solid rgba(15,15,15,0.08)' }}>
          <div className="flex items-center gap-3.5 text-center sm:text-left">
            <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-md"
              style={{ background: '#0F0F0F' }}>
              <Star className="w-5 h-5 fill-white text-white" />
            </div>
            <div>
              <h4 className="font-bold text-sm sm:text-base" style={{ color: '#0F0F0F' }}>Can't find your category?</h4>
              <p className="text-xs sm:text-sm" style={{ color: '#333333' }}>We have templates for every profession and custom roles.</p>
            </div>
          </div>
          <Link href="/templates"
            className="font-bold text-sm flex items-center gap-1.5 transition-colors shrink-0"
            style={{ color: '#0F0F0F' }}>
            Browse All Templates <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* CTA */}
        <div className="flex justify-center">
          <Link href="/templates"
            className="text-white font-bold px-8 py-3.5 rounded-xl shadow-lg flex items-center gap-2.5 transition-all active:scale-95 text-sm sm:text-base hover:opacity-90"
            style={{ background: '#0F0F0F' }}>
            <FileText className="w-4 h-4" style={{ color: '#F5D17B' }} />
            Explore All Templates
          </Link>
        </div>
      </div>
    </section>
  );
}
