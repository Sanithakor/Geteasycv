"use client";

import React from "react";
import Link from "next/link";
import { FileDown, FileType, Share2, CheckCircle2 } from "lucide-react";

export default function ExportSection() {
  const exportOptions = [
    {
      icon: FileDown,
      title: "PDF Export",
      description: "Industry-standard format accepted everywhere",
      color: "from-red-500 to-orange-500",
      bgColor: "bg-red-50",
      iconColor: "text-red-600",
    },
    {
      icon: FileType,
      title: "DOCX Export",
      description: "Editable Microsoft Word format for flexibility",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      icon: Share2,
      title: "Share Link",
      description: "Generate shareable link for online portfolios",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
    },
  ];

  const formatFeatures = [
    "Perfect formatting maintained across all formats",
    "High-quality output optimized for printing",
    "ATS-compatible structure preserved",
    "Custom fonts and colors included",
  ];

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full mb-6">
            <FileDown className="w-4 h-4 text-slate-600" />
            <span className="text-sm font-bold text-slate-600 uppercase tracking-wider">
              Export Options
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6">
            Export in{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Any Format
            </span>
          </h2>

          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Download your resume as PDF or DOCX, or share it online with a custom link
          </p>
        </div>

        {/* Export Options Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {exportOptions.map((option, idx) => {
            const IconComponent = option.icon;
            return (
              <div
                key={idx}
                className={`${option.bgColor} rounded-2xl p-8 border border-slate-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group`}
              >
                {/* Icon */}
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${option.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}
                >
                  <IconComponent className="w-8 h-8 text-white" />
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {option.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {option.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Format Features */}
        <div className="bg-gradient-to-br from-slate-50 to-purple-50 rounded-2xl border border-slate-200 p-8 lg:p-10">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left: Features List */}
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-6">
                Perfect Formatting Guaranteed
              </h3>
              <div className="space-y-4">
                {formatFeatures.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                    </div>
                    <p className="text-slate-700 leading-relaxed">{feature}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Visual Demo */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 transform rotate-2 hover:rotate-0 transition-transform">
                {/* Mock Document */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                    <div className="text-xs font-medium text-slate-500">
                      Ready to Export
                    </div>
                  </div>

                  <div className="h-4 bg-slate-900 rounded w-2/3"></div>
                  <div className="h-2 bg-slate-200 rounded w-full"></div>
                  <div className="h-2 bg-slate-200 rounded w-5/6"></div>
                  
                  <div className="pt-2 space-y-2">
                    <div className="h-3 bg-purple-200 rounded w-1/2"></div>
                    <div className="h-2 bg-slate-100 rounded w-full"></div>
                    <div className="h-2 bg-slate-100 rounded w-full"></div>
                  </div>

                  {/* Export Buttons */}
                  <div className="flex gap-2 pt-3">
                    <div className="flex-1 h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded flex items-center justify-center text-white text-xs font-bold">
                      PDF
                    </div>
                    <div className="flex-1 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded flex items-center justify-center text-white text-xs font-bold">
                      DOCX
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-3 -right-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full shadow-lg text-sm font-bold">
                ✓ Format Preserved
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <Link
            href="/editor"
            className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl"
          >
            Start Creating Now
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
