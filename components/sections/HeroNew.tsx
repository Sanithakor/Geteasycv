"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, FileCheck, Zap } from "lucide-react";

export default function HeroNew() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-[#FF570F]/30 to-[#FFF0EB]/40 py-16 sm:py-24 lg:py-28">
      {/* Trust signals near hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Hero Text + CTAs */}
          <div className="text-center lg:text-left">
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm border border-[#FFD4C2] mb-6">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-sm font-semibold text-slate-700">
                150+ ATS-Friendly Templates
              </span>
            </div>

            {/* Headline - max 12 words */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
              Create Your Perfect Resume{" "}
              <span className="bg-gradient-to-r from-[#FF570F] via-[#FF570F] to-[#E04800] bg-clip-text text-transparent">
                in Minutes
              </span>
            </h1>

            {/* Supporting copy - max 30 words */}
            <p className="text-lg sm:text-xl text-slate-600 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Professional templates with AI-powered assistance. Build, customize, and export your resume instantly.
            </p>

            {/* Two CTAs: Primary and Secondary */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
              <Link
                href="/templates"
                className="group px-8 py-4 bg-gradient-to-r from-[#FF570F] to-[#E04800] hover:from-[#E04800] hover:to-[#E04800] text-white rounded-xl font-semibold transition-all shadow-lg shadow-[#FF570F]/25 hover:shadow-xl hover:shadow-[#FF570F]/25 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                Browse Templates
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/editor"
                className="px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 rounded-xl font-semibold transition-all shadow-md border border-slate-200 hover:border-slate-300 flex items-center justify-center gap-2"
              >
                Start Building
              </Link>
            </div>

            {/* Trust signals - 3 elements */}
            <div className="flex flex-wrap gap-6 justify-center lg:justify-start text-sm">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#FFF0EB] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-[#FF570F]" />
                </div>
                <span className="text-slate-600 font-medium">AI-Powered</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                  <FileCheck className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-slate-600 font-medium">ATS-Friendly</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-slate-600 font-medium">Live Preview</span>
              </div>
            </div>
          </div>

          {/* Right: Live Preview Mockup */}
          <div className="relative">
            <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 transform rotate-1 hover:rotate-0 transition-transform duration-300">
              {/* Mock Editor Interface */}
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="text-xs font-medium text-slate-500">Resume Editor</div>
                </div>

                {/* Mock Content: Purple Sidebar Reference Resume Preview */}
                <div className="rounded-xl overflow-hidden shadow-sm border border-[#FFD4C2] bg-white grid grid-cols-[135px_1fr] sm:grid-cols-[165px_1fr] text-left">
                  {/* Left Column (Purple Sidebar) */}
                  <div className="bg-[#FF570F] text-white p-3 sm:p-4 flex flex-col items-center text-center select-none">
                    <img 
                      src="/default-avatar.jpg" 
                      alt="Sarah Johnson" 
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-white/90 object-cover shadow-sm mb-2 mt-0.5" 
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop';
                      }}
                    />
                    <h3 className="text-xs sm:text-sm font-extrabold text-white leading-tight">Sarah Johnson</h3>
                    <p className="text-[8px] sm:text-[9.5px] text-[#FFF0EB] font-medium mt-0.5 leading-snug">Senior Full Stack Engineer</p>

                    <div className="w-full text-left mt-3 pt-2 border-t border-white/20">
                      <h4 className="text-[7.5px] sm:text-[8.5px] font-extrabold text-white uppercase tracking-wider mb-1.5">CONTACT</h4>
                      <div className="space-y-1 text-[7px] sm:text-[8px] text-white/90 font-normal leading-tight break-all">
                        <p className="truncate">sarah.johnson@email.com</p>
                        <p>+1 (555) 123-4567</p>
                        <p>San Francisco, CA</p>
                        <p className="truncate">https://sarahjohnson.dev</p>
                        <p className="truncate">https://linkedin.com/in/sarahjohnson</p>
                      </div>
                    </div>
                  </div>

                  {/* Right Column (White Content Area) */}
                  <div className="p-3 sm:p-4 space-y-2.5 bg-white text-left select-none">
                    {/* Section 1: Professional Summary */}
                    <div>
                      <h4 className="text-[9px] sm:text-[10px] font-extrabold text-[#FF570F] uppercase tracking-wider mb-1">
                        PROFESSIONAL SUMMARY
                      </h4>
                      <p className="text-[7px] sm:text-[8px] text-slate-700 leading-relaxed">
                        Results-driven Senior Full Stack Engineer with 8+ years of experience designing, building, and scaling enterprise web applications used by millions of users worldwide. Deep expertise in React, TypeScript, Node.js, and cloud infrastructure. Proven track record of leading cross-functional teams, driving architectural decisions, and delivering measurable business impact. Passionate about clean code, developer experience, and building products that make a real difference.
                      </p>
                    </div>

                    {/* Section 2: Experience */}
                    <div className="pt-0.5">
                      <div className="flex items-center gap-1 text-[9px] sm:text-[10px] font-extrabold text-[#FF570F] uppercase tracking-wider mb-1 border-t border-slate-100 pt-2">
                        <svg className="w-2.5 h-2.5 text-[#FF570F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span>EXPERIENCE</span>
                      </div>

                      <div>
                        <div className="flex items-baseline justify-between">
                          <span className="text-[8px] sm:text-[9px] font-bold text-slate-900">Senior Full Stack Engineer</span>
                          <span className="text-[7px] sm:text-[7.5px] text-slate-400 font-medium">Mar 2021 - Present</span>
                        </div>
                        <div className="flex items-baseline justify-between text-[7.5px] sm:text-[8.5px]">
                          <span className="font-semibold text-[#FF570F]">TechCorp Inc.</span>
                          <span className="text-slate-400">San Francisco, CA</span>
                        </div>
                        <p className="text-[7px] sm:text-[7.5px] text-slate-600 mt-0.5 leading-snug">
                          Lead engineer on a platform serving 2M+ active users, owning the full product lifecycle from architecture to deployment across web and API layers.
                        </p>
                        <ul className="mt-1 space-y-0.5 text-[6.5px] sm:text-[7.5px] text-slate-600 pl-1 leading-tight">
                          <li className="flex items-start gap-1">
                            <span className="text-[#FF570F] font-bold text-[8px]">•</span>
                            <span>Reduced average page load time by 42% via code-splitting, lazy loading, and CDN optimization — directly improving user retention by 18%</span>
                          </li>
                          <li className="flex items-start gap-1">
                            <span className="text-[#FF570F] font-bold text-[8px]">•</span>
                            <span>Architected a microservices migration from a monolith, enabling independent deployments and cutting release cycles from 2 weeks to daily</span>
                          </li>
                          <li className="flex items-start gap-1">
                            <span className="text-[#FF570F] font-bold text-[8px]">•</span>
                            <span>Led a team of 6 engineers through agile sprints, code reviews, and quarterly OKR planning</span>
                          </li>
                          <li className="flex items-start gap-1">
                            <span className="text-[#FF570F] font-bold text-[8px]">•</span>
                            <span>Introduced infrastructure-as-code using Terraform and GitHub Actions, reducing manual...</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Live indicator */}
                <div className="flex items-center gap-2 pt-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium text-green-600">Live Preview Active</span>
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -top-4 -right-4 bg-gradient-to-br from-[#FF570F] to-[#E04800] text-white px-4 py-2 rounded-full shadow-lg text-sm font-bold transform rotate-12">
              ⚡ Instant Updates
            </div>
          </div>
        </div>
      </div>

      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#FF8C5A] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFB347] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-[#FF8C5A] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
    </section>
  );
}
