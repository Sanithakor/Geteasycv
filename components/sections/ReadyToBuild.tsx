'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function ReadyToBuild({
  title = "Ready to Build Your Perfect Resume?",
  subtitle = "Join thousands of job seekers who trust GetEasyCV AI.",
  buttonText = "Create My Resume Now",
  buttonHref = "/templates",
  secondaryButtonText = "Explore Templates",
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
    <section className="py-12 sm:py-16 font-sans bg-[#F8F8F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="relative overflow-hidden rounded-[24px] sm:rounded-[32px] border border-white/60 shadow-lg"
          style={{
            background: "linear-gradient(110deg, #D4C3F3 0%, #C7B7EE 35%, #BAC7FE 70%, #CEBEF2 100%)",
          }}
        >
          {/* Ambient subtle glow effects */}
          <div
            className="absolute top-0 right-1/4 w-80 h-80 rounded-full opacity-40 pointer-events-none"
            style={{ background: "#FFFFFF", filter: "blur(80px)" }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-6 sm:gap-10 p-6 sm:p-10 lg:p-12 relative z-10">
            
            {/* Left Column: 3D Laptop Preview Illustration */}
            <div className="lg:col-span-5 flex items-center justify-center">
              <div className="relative w-full max-w-[460px] aspect-[16/10] rounded-2xl overflow-hidden shadow-xl border border-white/40 group">
                <img
                  src={imageSrc}
                  alt="Resume Builder Preview"
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                />
                {/* Floating sparkle icons */}
                <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/70 backdrop-blur-xs flex items-center justify-center shadow-xs">
                  <Sparkles className="w-4 h-4 text-[#F5D17B]" />
                </div>
              </div>
            </div>

            {/* Right Column: Title, Subtitle, CTA Buttons */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-5 text-center lg:text-left">
              {badgeText && (
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/80 backdrop-blur-xs border border-white text-[11px] font-extrabold uppercase tracking-wider text-[#0F0F0F] shadow-2xs">
                  <Sparkles className="w-3.5 h-3.5 text-[#F3645C]" />
                  <span>{badgeText}</span>
                </div>
              )}

              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-[#0F0F0F] tracking-tight leading-tight">
                {title}
              </h2>

              <p className="text-sm sm:text-base lg:text-lg text-slate-700 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
                {subtitle}
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start items-center">
                <Link
                  href={buttonHref}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-[#0F0F0F] hover:bg-[#262626] shadow-md transition-all hover:scale-103 cursor-pointer"
                >
                  <span>{buttonText}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                {secondaryButtonText && (
                  <Link
                    href={secondaryButtonHref}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-[#0F0F0F] bg-white hover:bg-slate-50 border border-white/80 shadow-md transition-all hover:scale-103 cursor-pointer"
                  >
                    <span>{secondaryButtonText}</span>
                    <ArrowRight className="w-4 h-4 text-slate-500" />
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
