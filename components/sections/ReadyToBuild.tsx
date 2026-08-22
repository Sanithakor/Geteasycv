'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function ReadyToBuild({ title = "Ready to Build Your Resume?", subtitle = "Join thousands of job seekers who landed their dream jobs with GetEasyCV.", buttonText = "Get Started for Free", buttonHref = "/templates" }: { title?: string; subtitle?: string; buttonText?: string; buttonHref?: string }) {
  return (
    <section className="py-12 sm:py-16 bg-gradient-to-r from-[#FF570F] via-[#FF570F] to-[#FF570F] text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-4 text-center relative z-10 space-y-5">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/20 text-xs font-bold uppercase tracking-wider text-violet-100">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Start Building Today</span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight">
          {title}
        </h2>
        
        <p className="text-sm sm:text-base md:text-lg text-violet-100 max-w-xl mx-auto font-medium leading-relaxed">
          {subtitle}
        </p>

        <div className="pt-1 flex justify-center">
          <Link
            href={buttonHref}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-violet-700 hover:bg-slate-50 rounded-md font-bold text-xs sm:text-sm transition-all shadow-lg shadow-[#FF570F]/25 cursor-pointer"
          >
            <span>{buttonText}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
