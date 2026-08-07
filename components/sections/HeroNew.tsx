"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, FileCheck, Zap } from "lucide-react";

export default function HeroNew() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-purple-50/30 to-blue-50/40 py-16 sm:py-24 lg:py-28">
      {/* Trust signals near hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Hero Text + CTAs */}
          <div className="text-center lg:text-left">
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm border border-purple-100 mb-6">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-sm font-semibold text-slate-700">
                150+ ATS-Friendly Templates
              </span>
            </div>

            {/* Headline - max 12 words */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
              Create Your Perfect Resume{" "}
              <span className="bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 bg-clip-text text-transparent">
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
                className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl font-semibold transition-all shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transform hover:scale-105 flex items-center justify-center gap-2"
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
                <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-purple-600" />
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

                {/* Mock Content */}
                <div className="space-y-3">
                  <div className="h-8 bg-gradient-to-r from-slate-200 to-slate-100 rounded-lg w-3/4"></div>
                  <div className="h-4 bg-slate-100 rounded w-full"></div>
                  <div className="h-4 bg-slate-100 rounded w-5/6"></div>
                  <div className="h-4 bg-slate-100 rounded w-4/6"></div>
                  
                  <div className="pt-3 space-y-2">
                    <div className="h-6 bg-purple-100 rounded w-1/2"></div>
                    <div className="h-3 bg-slate-100 rounded w-full"></div>
                    <div className="h-3 bg-slate-100 rounded w-full"></div>
                    <div className="h-3 bg-slate-100 rounded w-3/4"></div>
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
            <div className="absolute -top-4 -right-4 bg-gradient-to-br from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-full shadow-lg text-sm font-bold transform rotate-12">
              ⚡ Instant Updates
            </div>
          </div>
        </div>
      </div>

      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
    </section>
  );
}
