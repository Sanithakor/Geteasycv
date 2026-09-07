'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Star, Zap, FileText, ShieldCheck } from 'lucide-react';

interface ReadyToBuildProps {
  title?: string | React.ReactNode;
  subtitle?: string;
  buttonText?: string;
  buttonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
  badgeText?: string;
  imageSrc?: string;
  containerBg?: string;
}

export default function ReadyToBuild({
  title = "Ready to Build Your Perfect Resume?",
  subtitle = "Join over 40,000 ambitious professionals who landed interviews at Google, Amazon, Microsoft, and leading companies.",
  buttonText = "Create My Resume Now",
  buttonHref = "/templates",
  secondaryButtonText = "Explore 150+ Templates",
  secondaryButtonHref = "/templates",
  badgeText = "4.9/5 Rating by 40,000+ Job Seekers",
  imageSrc = "/images/cta-rocket-perfect.png",
  containerBg = "#F8F9FA",
}: ReadyToBuildProps) {
  const renderTitle = () => {
    if (typeof title !== 'string') return title;

    if (title.includes('Perfect Resume?')) {
      return (
        <>
          Ready to Build Your <span className="text-[#FF4D5A]">Perfect</span>
          <br className="hidden sm:inline" />
          <span className="text-[#FF4D5A]">Resume?</span>
        </>
      );
    }

    if (title.includes('Recruiter-Ready Resume?')) {
      return (
        <>
          Ready to Build Your <span className="text-[#FF4D5A]">Recruiter-Ready</span>
          <br className="hidden sm:inline" />
          <span className="text-[#FF4D5A]">Resume?</span>
        </>
      );
    }

    return title;
  };

  return (
    <section className="py-10 sm:py-14 lg:py-16 font-sans" style={{ backgroundColor: containerBg }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Crisp White Card Container */}
        <div className="relative overflow-hidden rounded-[28px] sm:rounded-[36px] lg:rounded-[40px] bg-white border border-slate-100 shadow-[0_15px_50px_-10px_rgba(0,0,0,0.06)] p-6 sm:p-8 lg:p-10">
          
          {/* Top-Right Calligraphy Slogan ("Dream. Prepare. Achieve.") */}
          <div className="hidden sm:block absolute top-5 right-6 lg:top-7 lg:right-10 pointer-events-none select-none z-10">
            <img
              src="/images/cta-dream-slogan.png"
              alt="Dream. Prepare. Achieve."
              className="w-18 lg:w-22 h-auto object-contain opacity-95"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-6 lg:gap-10 relative z-10">
            
            {/* Left Column: 3D Rocket Artwork Box */}
            <div className="lg:col-span-5 flex items-center justify-center order-2 lg:order-1">
              <div className="relative w-full max-w-[460px] group">
                <div className="relative rounded-[22px] sm:rounded-[26px] overflow-hidden group-hover:scale-[1.015] transition-transform duration-700">
                  <img
                    src={imageSrc}
                    alt="Ready to Build Your Perfect Resume"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Right Column: High-Impact Typography, Guarantees & Actions */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-5 text-center lg:text-left order-1 lg:order-2">
              
              {/* Trust Rating Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50/60 border border-amber-200/60 text-xs font-semibold text-slate-700 shadow-xs">
                <div className="flex items-center text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                </div>
                <span className="text-slate-600 font-medium">
                  {badgeText}
                </span>
              </div>

              {/* Headline */}
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] xl:text-[46px] font-extrabold text-[#0F172A] tracking-tight leading-[1.15]">
                {renderTitle()}
              </h2>

              {/* Subtitle */}
              <p className="text-sm sm:text-[15px] lg:text-base text-slate-500 font-normal leading-relaxed max-w-xl mx-auto lg:mx-0">
                {subtitle}
              </p>

              {/* 3 Guarantees / Highlights Row */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2.5 pt-0.5">
                {/* Item 1 */}
                <div className="flex items-center gap-2 text-left">
                  <div className="w-6 h-6 rounded-full bg-[#FFF1F2] flex items-center justify-center text-[#FF4D5A] shrink-0">
                    <Zap className="w-3.5 h-3.5 fill-[#FF4D5A]" />
                  </div>
                  <span className="text-xs font-medium text-slate-600">
                    No credit card required
                  </span>
                </div>

                {/* Item 2 */}
                <div className="flex items-center gap-2 text-left">
                  <div className="w-6 h-6 rounded-full bg-[#FFF1F2] flex items-center justify-center text-[#FF4D5A] shrink-0">
                    <FileText className="w-3.5 h-3.5 text-[#FF4D5A]" />
                  </div>
                  <span className="text-xs font-medium text-slate-600">
                    Free PDF download included
                  </span>
                </div>

                {/* Item 3 */}
                <div className="flex items-center gap-2 text-left">
                  <div className="w-6 h-6 rounded-full bg-[#FFF1F2] flex items-center justify-center text-[#FF4D5A] shrink-0">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#FF4D5A]" />
                  </div>
                  <span className="text-xs font-medium text-slate-600">
                    100% ATS compliant format
                  </span>
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="pt-1.5 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start items-center">
                {/* Primary Coral/Red CTA */}
                <Link
                  href={buttonHref}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-[#FF4D5A] hover:bg-[#EE3B48] active:bg-[#DE283A] shadow-[0_6px_20px_rgba(255,77,90,0.35)] hover:shadow-[0_8px_25px_rgba(255,77,90,0.45)] transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-white fill-white" />
                  <span>{buttonText}</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </Link>

                {/* Secondary White CTA */}
                {secondaryButtonText && (
                  <Link
                    href={secondaryButtonHref}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-slate-800 bg-white hover:bg-slate-50 border border-slate-200 shadow-xs hover:border-slate-300 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                  >
                    <span>{secondaryButtonText}</span>
                    <ArrowRight className="w-4 h-4 text-slate-600" />
                  </Link>
                )}
              </div>

              {/* Social Proof Avatars Bar */}
              <div className="pt-2 flex items-center justify-center lg:justify-start gap-3">
                <img
                  src="/images/cta-avatars.png"
                  alt="40,000+ happy job seekers"
                  className="h-8 w-auto object-contain"
                />
                <div className="h-6 w-[1px] bg-slate-200" />
                <div className="text-left text-xs leading-tight">
                  <span className="font-bold text-slate-800">Trusted by 40,000+ job seekers</span>
                  <br />
                  <span className="text-[11px] text-slate-500">to build a brighter future</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
