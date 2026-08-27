"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, FileText, Pencil, Eye, Download, ArrowRight } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    { num: 1, icon: FileText,  title: "Choose Template",    description: "Pick from 150+ ATS-friendly templates designed by professionals.", accent: '#BAC7FE' },
    { num: 2, icon: Pencil,    title: "Build Your Resume",  description: "Add your information with our easy builder and AI-powered suggestions.", accent: '#F5D17B', featured: true },
    { num: 3, icon: Eye,       title: "Preview & Optimize", description: "Preview in real-time and get ATS score to optimize your resume.", accent: '#D0B9EF' },
    { num: 4, icon: Download,  title: "Download & Apply",   description: "Download your resume and start applying with confidence.", accent: '#58C09D' },
  ];

  return (
    <section
      className="py-16 sm:py-24 overflow-hidden font-sans"
      style={{
        background: '#F8F8F6',
        borderTop: '1px solid rgba(15,15,15,0.06)',
        borderBottom: '1px solid rgba(15,15,15,0.06)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="flex justify-center mb-5">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-slate-200/80 bg-white text-[#0F0F0F] text-xs font-bold uppercase tracking-wider shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#F3645C]" />
            <span>Easy Process</span>
          </div>
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight max-w-3xl mx-auto mb-4 text-[#0F0F0F]">
          We make things{" "}
          <span style={{ color: '#F3645C' }}>easy</span>
          <br />
          for your{" "}
          <span style={{ color: '#F3645C' }}>career</span>
        </h2>

        <p className="text-sm sm:text-base lg:text-lg text-slate-600 max-w-xl mx-auto leading-relaxed mb-16 sm:mb-20 font-normal">
          Create professional resumes in minutes with our simple, step-by-step process.
        </p>

        {/* Steps */}
        <div className="relative max-w-6xl mx-auto mb-16">
          {/* Connector line */}
          <div className="hidden lg:block absolute top-[22px] left-[11%] right-[11%] h-[2px] z-0" style={{ background: 'rgba(15,15,15,0.08)' }} />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6 relative z-10">
            {steps.map((item) => {
              const IconComponent = item.icon;
              return (
                <div key={item.num} className="flex flex-col items-center text-center group">
                  {/* Number badge */}
                  <div
                    className="w-11 h-11 rounded-xl font-extrabold text-sm flex items-center justify-center shadow-2xs mx-auto z-10 relative transform group-hover:scale-110 transition-transform"
                    style={{
                      background: item.featured ? '#0F0F0F' : '#FFFFFF',
                      color: item.featured ? '#FFFFFF' : '#0F0F0F',
                      border: item.featured ? 'none' : '1px solid rgba(15,15,15,0.12)',
                    }}
                  >
                    0{item.num}
                  </div>

                  {/* Dashed connector */}
                  <div className="w-[2px] h-6 border-l-2 border-dashed mx-auto my-2" style={{ borderColor: item.accent }} />

                  {/* Icon box */}
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto shadow-2xs group-hover:scale-105 transition-transform"
                    style={{ background: item.accent }}
                  >
                    <IconComponent className="w-7 h-7 text-[#0F0F0F]" />
                  </div>

                  <h3 className="text-base sm:text-lg font-bold mt-4 mb-2 text-slate-900 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal max-w-[250px] mx-auto">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <Link
          href="/templates"
          className="px-8 py-4 text-white font-bold rounded-xl shadow-md inline-flex items-center gap-2.5 transition-all transform hover:scale-105 hover:bg-[#262626] text-sm sm:text-base"
          style={{ background: '#0F0F0F' }}
        >
          <span>Start Building Free</span>
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </section>
  );
}
