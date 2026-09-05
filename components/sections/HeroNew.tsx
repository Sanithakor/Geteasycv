"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, FileCheck, Zap } from "lucide-react";

export default function HeroNew() {
  const [downloadCount, setDownloadCount] = useState<number>(0);

  useEffect(() => {
    fetch('/api/templates/download')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && typeof data.totalDownloads === 'number') {
          setDownloadCount(data.totalDownloads);
        }
      })
      .catch(() => {});
  }, []);

  const badgeText = downloadCount > 0 
    ? `${downloadCount.toLocaleString()}+ CVs Downloaded` 
    : '10,000+ CVs Downloaded';

  return (
    <section className="relative overflow-hidden py-16 sm:py-24 lg:py-28" style={{ background: '#F8F8F6' }}>
      {/* Soft decorative blobs */}
      <div className="pointer-events-none absolute top-0 left-0 w-80 h-80 rounded-full opacity-40" style={{ background: '#BAC7FE', filter: 'blur(80px)' }} />
      <div className="pointer-events-none absolute top-0 right-0 w-72 h-72 rounded-full opacity-30" style={{ background: '#D0B9EF', filter: 'blur(80px)' }} />
      <div className="pointer-events-none absolute bottom-0 left-1/2 w-72 h-72 rounded-full opacity-25" style={{ background: '#FEE1CF', filter: 'blur(80px)' }} />

      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text + CTAs */}
          <div className="text-center lg:text-left">
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border shadow-sm mb-6"
              style={{ background: '#FFFFFF', borderColor: 'rgba(15,15,15,0.12)' }}>
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#58C09D' }} />
              <span className="text-sm font-semibold" style={{ color: '#333333' }}>
                {badgeText}
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6" style={{ color: '#0F0F0F' }}>
              Build an ATS Resume That{" "}
              <span className="relative inline-block">
                <span style={{ color: '#F3645C' }}>Recruiters Read</span>
                <span className="absolute -bottom-1 left-0 right-0 h-1 rounded-full" style={{ background: '#F5D17B' }} />
              </span>
            </h1>

            <p className="text-lg sm:text-xl mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed" style={{ color: '#333333' }}>
              Select from 100+ recruiter-tested templates, resolve formatting bugs automatically, and download a high-res PDF ready for submission.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
              <Link
                href="/templates"
                className="group px-8 py-4 rounded-xl font-bold text-white transition-all shadow-lg flex items-center justify-center gap-2 hover:opacity-90"
                style={{ background: '#0F0F0F' }}
              >
                Browse Templates
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/editor"
                className="px-8 py-4 rounded-xl font-semibold transition-all border flex items-center justify-center gap-2 hover:opacity-90"
                style={{ background: '#FFFFFF', borderColor: 'rgba(15,15,15,0.15)', color: '#333333' }}
              >
                Start Building
              </Link>
            </div>

            {/* Trust signals */}
            <div className="flex flex-wrap gap-5 justify-center lg:justify-start text-sm">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#D0B9EF' }}>
                  <Sparkles className="w-4 h-4" style={{ color: '#0F0F0F' }} />
                </div>
                <span className="font-medium" style={{ color: '#333333' }}>AI-Powered</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#58C09D33' }}>
                  <FileCheck className="w-4 h-4" style={{ color: '#58C09D' }} />
                </div>
                <span className="font-medium" style={{ color: '#333333' }}>ATS-Friendly</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#BAC7FE' }}>
                  <Zap className="w-4 h-4" style={{ color: '#0F0F0F' }} />
                </div>
                <span className="font-medium" style={{ color: '#333333' }}>Live Preview</span>
              </div>
            </div>
          </div>

          {/* Right: Resume mock */}
          <div className="relative">
            <div className="relative bg-white rounded-2xl shadow-2xl border p-6 transform rotate-1 hover:rotate-0 transition-transform duration-300"
              style={{ borderColor: 'rgba(15,15,15,0.10)' }}>
              <div className="space-y-4">
                {/* Window chrome */}
                <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: 'rgba(15,15,15,0.08)' }}>
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="text-xs font-medium" style={{ color: '#9ca3af' }}>Resume Editor</div>
                </div>

                {/* Resume preview card */}
                <div className="rounded-xl overflow-hidden shadow-sm border grid grid-cols-[135px_1fr] sm:grid-cols-[165px_1fr] text-left"
                  style={{ borderColor: 'rgba(15,15,15,0.10)' }}>
                  {/* Sidebar */}
                  <div className="p-3 sm:p-4 flex flex-col items-center text-center select-none" style={{ background: '#0F0F0F' }}>
                    <img
                      src="/default-avatar.jpg"
                      alt="Sarah Johnson"
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-white/30 object-cover shadow-sm mb-2 mt-0.5"
                      onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop'; }}
                    />
                    <h3 className="text-xs sm:text-sm font-extrabold text-white leading-tight">Sarah Johnson</h3>
                    <p className="text-[8px] sm:text-[9.5px] font-medium mt-0.5 leading-snug" style={{ color: '#BAC7FE' }}>Senior Full Stack Engineer</p>

                    <div className="w-full text-left mt-3 pt-2 border-t border-white/10">
                      <h4 className="text-[7.5px] sm:text-[8.5px] font-extrabold text-white uppercase tracking-wider mb-1.5">CONTACT</h4>
                      <div className="space-y-1 text-[7px] sm:text-[8px] font-normal leading-tight break-all" style={{ color: 'rgba(255,255,255,0.75)' }}>
                        <p className="truncate">sarah.johnson@email.com</p>
                        <p>+1 (555) 123-4567</p>
                        <p>San Francisco, CA</p>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-3 sm:p-4 space-y-2.5 bg-white text-left select-none">
                    <div>
                      <h4 className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider mb-1" style={{ color: '#F3645C' }}>
                        PROFESSIONAL SUMMARY
                      </h4>
                      <p className="text-[7px] sm:text-[8px] leading-relaxed" style={{ color: '#333333' }}>
                        Results-driven Senior Full Stack Engineer with 8+ years of experience building enterprise web applications used by millions.
                      </p>
                    </div>
                    <div className="pt-0.5">
                      <h4 className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider mb-1 border-t pt-2" style={{ color: '#F3645C', borderColor: 'rgba(15,15,15,0.08)' }}>
                        EXPERIENCE
                      </h4>
                      <div className="flex items-baseline justify-between">
                        <span className="text-[8px] sm:text-[9px] font-bold" style={{ color: '#0F0F0F' }}>Senior Full Stack Engineer</span>
                        <span className="text-[7px] sm:text-[7.5px] font-medium" style={{ color: '#9ca3af' }}>Mar 2021 – Present</span>
                      </div>
                      <span className="text-[7.5px] font-semibold" style={{ color: '#58C09D' }}>TechCorp Inc.</span>
                    </div>
                  </div>
                </div>

                {/* Live indicator */}
                <div className="flex items-center gap-2 pt-2">
                  <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#58C09D' }} />
                  <span className="text-xs font-medium" style={{ color: '#58C09D' }}>Live Preview Active</span>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -top-4 right-0 sm:-right-4 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-lg text-xs sm:text-sm font-bold text-white transform rotate-6 sm:rotate-12 pointer-events-none"
              style={{ background: '#F3645C' }}>
              ⚡ Instant Updates
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
