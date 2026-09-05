'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, CheckCircle2, Star, ShieldCheck } from 'lucide-react';

export default function ReadyToBuild({
  title = "Ready to Build Your Perfect Resume?",
  subtitle = "Join over 40,000 ambitious professionals who landed interviews at Google, Amazon, Microsoft, and leading companies.",
  buttonText = "Create My Resume Now",
  buttonHref = "/templates",
  secondaryButtonText = "Explore 150+ Templates",
  secondaryButtonHref = "/templates",
  badgeText,
  imageSrc = "/images/cta-laptop-mockup.jpg",
}: {
  title?: string | React.ReactNode;
  subtitle?: string;
  buttonText?: string;
  buttonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
  badgeText?: string;
  imageSrc?: string;
}) {
  return (
    <section className="py-16 sm:py-24 font-sans bg-[#F8F8F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Luxury Obsidian Card Container */}
        <div className="relative overflow-hidden rounded-[28px] sm:rounded-[36px] bg-gradient-to-br from-[#0B0F19] via-[#0F172A] to-[#0A0D17] border border-slate-800/80 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.35)]">
          
          {/* Ambient Lighting Mesh */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-violet-600/20 via-indigo-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-96 h-96 bg-gradient-to-tr from-sky-500/10 via-emerald-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Grid pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, #FFFFFF 1px, transparent 0)',
              backgroundSize: '24px 24px',
            }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-12 p-8 sm:p-12 lg:p-16 relative z-10">
            
            {/* Left Column: 3D Mockup with Floating Proof Badges */}
            <div className="lg:col-span-5 flex items-center justify-center order-2 lg:order-1">
              <div className="relative w-full max-w-[440px] group">
                
                {/* Floating Glow behind image */}
                <div className="absolute -inset-1.5 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition duration-700" />

                {/* Main Mockup Frame */}
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-900 shadow-2xl">
                  <img
                    src={imageSrc}
                    alt="GetEasyCV Editor Mockup"
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                  />

                  {/* Gradient bottom overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />

                  {/* Micro badge on image */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700/60 flex items-center gap-1.5 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-bold text-slate-200 uppercase tracking-wider">
                      Live AI Preview
                    </span>
                  </div>
                </div>

                {/* Floating Bottom Card */}
                <div className="absolute -bottom-4 -right-3 sm:-right-4 px-3.5 py-2 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80 shadow-xl flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <div className="text-[10px] font-extrabold text-white leading-none">
                      ATS Verified
                    </div>
                    <div className="text-[9px] text-emerald-400 font-semibold mt-0.5">
                      98% Pass Rate
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Column: High-Impact Typography & Conversion Actions */}
            <div className="lg:col-span-7 space-y-5 text-center lg:text-left order-1 lg:order-2">
              
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/80 text-xs font-bold text-slate-200 shadow-sm">
                <div className="flex items-center text-amber-400">
                  <Star className="w-3 h-3 fill-amber-400" />
                  <Star className="w-3 h-3 fill-amber-400" />
                  <Star className="w-3 h-3 fill-amber-400" />
                  <Star className="w-3 h-3 fill-amber-400" />
                  <Star className="w-3 h-3 fill-amber-400" />
                </div>
                <span className="text-slate-300">
                  {badgeText || '4.9/5 Rating by 40,000+ Job Seekers'}
                </span>
              </div>

              {/* Headline */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
                {typeof title === 'string' ? (
                  <>
                    Ready to Build Your{' '}
                    <span style={{ color: '#F5D17B' }}>
                      Perfect Resume?
                    </span>
                  </>
                ) : (
                  title
                )}
              </h2>

              {/* Subtitle */}
              <p className="text-sm sm:text-base lg:text-lg text-slate-300 font-normal leading-relaxed max-w-xl mx-auto lg:mx-0">
                {subtitle}
              </p>

              {/* Guarantees / Checklist */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2 pt-1 text-xs text-slate-300 font-medium">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Free PDF download included</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>100% ATS compliant format</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start items-center">
                <Link
                  href={buttonHref}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-extrabold text-xs sm:text-sm text-slate-950 bg-white hover:bg-slate-100 shadow-[0_0_25px_rgba(255,255,255,0.2)] hover:shadow-[0_0_35px_rgba(255,255,255,0.35)] transition-all hover:scale-102 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" style={{ color: '#F3645C' }} />
                  <span>{buttonText}</span>
                  <ArrowRight className="w-4 h-4 text-slate-950" />
                </Link>

                {secondaryButtonText && (
                  <Link
                    href={secondaryButtonHref}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-bold text-xs sm:text-sm text-white bg-slate-800/80 hover:bg-slate-700/90 border border-slate-700/80 shadow-md transition-all hover:scale-102 cursor-pointer"
                  >
                    <span>{secondaryButtonText}</span>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </Link>
                )}
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
