"use client";

import React from "react";
import Link from "next/link";
import { Zap, Eye, Palette, Type } from "lucide-react";

export default function LiveEditingSection() {
  return (
    <section className="py-16 sm:py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Visual Demo - Editor + Preview */}
          <div className="order-2 lg:order-1">
            <div className="relative">
              {/* Editor Panel (Left) */}
              <div className="relative bg-white rounded-2xl shadow-xl border border-slate-200 p-6 z-10">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-200">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <span className="text-xs font-semibold text-slate-500">
                    Resume Editor
                  </span>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-medium text-slate-500 mb-1 block">
                      Job Title
                    </label>
                    <div className="h-8 bg-slate-100 rounded border border-slate-200 flex items-center px-3">
                      <span className="text-sm text-slate-600">
                        Senior Product Designer
                      </span>
                      <span className="ml-auto w-1 h-4 bg-purple-600 animate-pulse"></span>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-500 mb-1 block">
                      Description
                    </label>
                    <div className="h-20 bg-slate-100 rounded border border-slate-200 p-3 space-y-1">
                      <div className="h-2 bg-slate-300 rounded w-full"></div>
                      <div className="h-2 bg-slate-300 rounded w-5/6"></div>
                      <div className="h-2 bg-slate-300 rounded w-4/6"></div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="px-3 py-1.5 bg-purple-100 text-purple-600 text-xs font-medium rounded-lg flex items-center gap-1">
                      <Palette className="w-3 h-3" />
                      Colors
                    </button>
                    <button className="px-3 py-1.5 bg-slate-100 text-slate-600 text-xs font-medium rounded-lg flex items-center gap-1">
                      <Type className="w-3 h-3" />
                      Fonts
                    </button>
                  </div>
                </div>

                {/* Live Indicator */}
                <div className="mt-4 pt-3 border-t border-slate-200 flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium text-green-600">
                    Live Preview Active
                  </span>
                </div>
              </div>

              {/* Preview Panel (Right - Overlapped) */}
              <div className="absolute top-8 -right-8 lg:-right-12 w-48 bg-white rounded-lg shadow-2xl border border-slate-200 p-4 transform rotate-3 hover:rotate-0 transition-transform">
                <div className="space-y-2">
                  <div className="h-3 bg-purple-600 rounded w-2/3"></div>
                  <div className="h-2 bg-slate-200 rounded w-full"></div>
                  <div className="h-2 bg-slate-200 rounded w-5/6"></div>
                  <div className="h-2 bg-slate-200 rounded w-4/6"></div>
                  <div className="pt-2 space-y-1">
                    <div className="h-2 bg-purple-100 rounded w-1/2"></div>
                    <div className="h-1.5 bg-slate-100 rounded w-full"></div>
                    <div className="h-1.5 bg-slate-100 rounded w-full"></div>
                  </div>
                </div>
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-2 py-1 rounded shadow-lg">
                  ⚡ Updated
                </div>
              </div>

              {/* Connection Line Animation */}
              <div className="absolute top-1/2 left-full w-16 h-0.5 hidden lg:block">
                <div className="h-full bg-gradient-to-r from-purple-600 to-transparent animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Right: Explanation */}
          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-blue-200 mb-6">
              <Zap className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-bold text-blue-600 uppercase tracking-wider">
                Real-Time Preview
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
              See Changes{" "}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Instantly
              </span>
            </h2>

            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Every edit updates your resume in real-time. No waiting, no refreshing—just smooth,
              instant visual feedback as you build.
            </p>

            {/* Features List */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Zap className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">
                    Instant Visual Updates
                  </h3>
                  <p className="text-sm text-slate-600">
                    Changes appear immediately as you type—no lag, no waiting
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Eye className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">
                    All Templates Supported
                  </h3>
                  <p className="text-sm text-slate-600">
                    Live preview works with every single template in our collection
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <Palette className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">
                    Customize Everything
                  </h3>
                  <p className="text-sm text-slate-600">
                    Colors, fonts, spacing—see every customization in real-time
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <Link
              href="/editor"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl"
            >
              Try Live Editor
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
