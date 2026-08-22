'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function ReadyToBuild({
  title = "Ready to Build Your Resume?",
  subtitle = "Join thousands of job seekers who landed their dream jobs with GetEasyCV.",
  buttonText = "Get Started for Free",
  buttonHref = "/templates",
}: {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonHref?: string;
}) {
  return (
    <section className="py-12 sm:py-16 relative overflow-hidden" style={{ background: '#0F0F0F' }}>
      {/* Decorative dots */}
      <div className="absolute inset-0 opacity-5 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(#FFFFFF 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

      {/* Accent blobs */}
      <div className="absolute top-0 left-0 w-64 h-64 rounded-full opacity-15 pointer-events-none"
        style={{ background: '#BAC7FE', filter: 'blur(60px)' }} />
      <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full opacity-15 pointer-events-none"
        style={{ background: '#D0B9EF', filter: 'blur(60px)' }} />

      <div className="max-w-4xl mx-auto px-4 text-center relative z-10 space-y-5">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wider"
          style={{ background: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.15)', color: '#F5D17B' }}>
          <Sparkles className="w-3.5 h-3.5" style={{ color: '#F5D17B' }} />
          <span>Start Building Today</span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-tight" style={{ color: '#FFFFFF' }}>
          {title}
        </h2>

        <p className="text-sm sm:text-base md:text-lg max-w-xl mx-auto font-medium leading-relaxed" style={{ color: 'rgba(255,255,255,0.70)' }}>
          {subtitle}
        </p>

        <div className="pt-1 flex justify-center">
          <Link href={buttonHref}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-lg hover:opacity-90"
            style={{ background: '#F5D17B', color: '#0F0F0F' }}>
            <span>{buttonText}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
