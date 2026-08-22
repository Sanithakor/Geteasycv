"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, FileText, Pencil, Eye, Download, ArrowRight } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      num: 1,
      isHighlighted: false,
      icon: FileText,
      title: "Choose Template",
      description: "Pick from 150+ ATS-friendly templates designed by professionals.",
    },
    {
      num: 2,
      isHighlighted: true,
      icon: Pencil,
      title: "Build Your Resume",
      description: "Add your information with our easy builder and AI-powered suggestions.",
    },
    {
      num: 3,
      isHighlighted: false,
      icon: Eye,
      title: "Preview & Optimize",
      description: "Preview in real-time and get ATS score to optimize your resume.",
    },
    {
      num: 4,
      isHighlighted: false,
      icon: Download,
      title: "Download & Apply",
      description: "Download your resume and start applying with confidence.",
    },
  ];

  return (
    <section className="bg-gradient-to-b from-slate-50/60 via-white to-purple-50/20 py-16 sm:py-24 border-t border-[#FFD4C2]/60 overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Top Badge */}
        <div className="flex justify-center mb-5">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#FFF8F5] border border-[#FFD4C2] text-[#FF570F] text-xs font-bold uppercase tracking-wider shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#FF570F]" />
            <span>EASY PROCESS</span>
          </div>
        </div>

        {/* Main Headline */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight max-w-3xl mx-auto mb-4">
          We make things{" "}
          <span className="text-[#FF570F]">easy</span>
          <br />
          for your{" "}
          <span className="text-[#FF570F]">business</span>
        </h2>

        {/* Subtitle */}
        <p className="text-slate-600 text-sm sm:text-base lg:text-lg max-w-xl mx-auto leading-relaxed mb-16 sm:mb-20">
          Create professional resumes in minutes with our simple, step-by-step process.
        </p>

        {/* 4-Step Process Timeline Container */}
        <div className="relative max-w-6xl mx-auto mb-16">
          {/* Horizontal Timeline Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-[22px] left-[11%] right-[11%] h-[2px] bg-slate-200/90 z-0" />

          {/* 4 Steps Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6 relative z-10">
            {steps.map((item) => {
              const IconComponent = item.icon;
              return (
                <div key={item.num} className="flex flex-col items-center text-center group">
                  {/* Step Number Badge */}
                  {item.isHighlighted ? (
                    <div className="w-11 h-11 rounded-full bg-[#FF570F] text-white font-extrabold text-sm flex items-center justify-center shadow-lg shadow-[#FF570F]/25 mx-auto z-10 relative transform group-hover:scale-110 transition-transform">
                      {item.num}
                    </div>
                  ) : (
                    <div className="w-11 h-11 rounded-full bg-[#FFF0EB]/80 border-2 border-purple-200/80 text-slate-800 font-extrabold text-sm flex items-center justify-center mx-auto z-10 relative bg-white transform group-hover:scale-110 transition-transform">
                      {item.num}
                    </div>
                  )}

                  {/* Dashed Connecting Line Down to Icon */}
                  <div className={`w-[2px] h-6 border-l-2 border-dashed ${item.isHighlighted ? 'border-purple-400' : 'border-purple-200'} mx-auto my-1.5`} />

                  {/* Icon Box Container */}
                  <div className="w-16 h-16 rounded-2xl bg-[#FFF0EB]/60 border border-purple-200/50 text-[#FF570F] flex items-center justify-center mx-auto shadow-2xs group-hover:bg-[#FFF0EB] transition-colors">
                    <IconComponent className="w-7 h-7 text-[#FF570F]" />
                  </div>

                  {/* Step Title & Description */}
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-4 mb-2 group-hover:text-[#FF570F] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal max-w-[250px] mx-auto">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Button */}
        <div className="inline-flex items-center justify-center">
          <Link
            href="/templates"
            className="px-8 py-4 bg-gradient-to-r from-[#FF570F] to-[#E04800] hover:from-[#E04800] hover:to-[#E04800] text-white font-bold rounded-xl shadow-lg shadow-[#FF570F]/25 inline-flex items-center gap-2.5 transition-all transform hover:scale-105 cursor-pointer text-sm sm:text-base"
          >
            <span>Start Building Free</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
