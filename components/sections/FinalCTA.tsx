"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";

export default function FinalCTA() {
  return (
    <section
      className="py-16 sm:py-24 relative overflow-hidden font-sans border-t border-[#0F0F0F]/10"
      style={{ background: 'linear-gradient(135deg, #FFF6F0 0%, #FEE1CF 50%, #FFE4D6 100%)' }}
    >
      {/* Accent blobs */}
      <div
        className="absolute top-0 left-10 w-72 h-72 rounded-full opacity-30 pointer-events-none"
        style={{ background: '#BAC7FE', filter: 'blur(70px)' }}
      />
      <div
        className="absolute bottom-0 right-10 w-72 h-72 rounded-full opacity-35 pointer-events-none"
        style={{ background: '#D0B9EF', filter: 'blur(70px)' }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        {/* Badge */}
        <div className="flex justify-center">
          <div
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wider shadow-2xs"
            style={{
              background: '#FFFFFF',
              borderColor: 'rgba(15,15,15,0.12)',
              color: '#0F0F0F',
            }}
          >
            <Sparkles className="w-3.5 h-3.5" style={{ color: '#F3645C' }} />
            <span>Get Started Today</span>
          </div>
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F0F0F] leading-tight tracking-tight">
          Ready to Land Your <span style={{ color: '#F3645C' }}>Dream Job?</span>
        </h2>

        {/* Supporting Text */}
        <p className="text-sm sm:text-base lg:text-lg text-[#333333] max-w-xl mx-auto font-normal leading-relaxed">
          Join thousands of job seekers building professional, ATS-ready resumes in minutes.
        </p>

        {/* CTAs */}
        <div className="pt-2 flex flex-col sm:flex-row gap-3.5 justify-center items-center">
          <Link
            href="/templates"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-white transition-all shadow-lg hover:opacity-90 hover:scale-105"
            style={{ background: '#0F0F0F' }}
          >
            <span>Browse Templates</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/editor"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-xs sm:text-sm border transition-all shadow-2xs hover:bg-white/80"
            style={{
              background: '#FFFFFF',
              borderColor: 'rgba(15,15,15,0.15)',
              color: '#0F0F0F',
            }}
          >
            Start Building Free
          </Link>
        </div>

        {/* Trust Elements */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-[#333333] font-semibold">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#58C09D]" />
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#58C09D]" />
            <span>Free ATS templates</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#58C09D]" />
            <span>100% Privacy protected</span>
          </div>
        </div>
      </div>
    </section>
  );
}
