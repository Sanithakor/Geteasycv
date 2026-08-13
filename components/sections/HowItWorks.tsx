"use client";

import React from "react";
import Link from "next/link";
import {
  LayoutTemplate,
  SquarePen,
  WandSparkles,
  Eye,
  Download,
  ShieldCheck,
  Rocket,
  Lock,
  Trophy,
  ArrowRight,
} from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      step: "01",
      numberColor: "text-purple-600 bg-purple-50 border-purple-100",
      icon: LayoutTemplate,
      iconBg: "bg-purple-100/80 text-[#7C3AED]",
      outerRing: "border-purple-100",
      title: "Choose a Template",
      description:
        "Browse professional, ATS-friendly templates designed by experts and pick the one that fits your style.",
      barColor: "bg-[#7C3AED]",
    },
    {
      step: "02",
      numberColor: "text-emerald-600 bg-emerald-50 border-emerald-100",
      icon: SquarePen,
      iconBg: "bg-emerald-100/80 text-emerald-600",
      outerRing: "border-emerald-100",
      title: "Fill in Your Details",
      description:
        "Add your personal information, work experience, education, skills, and achievements in minutes.",
      barColor: "bg-emerald-500",
    },
    {
      step: "03",
      numberColor: "text-amber-600 bg-amber-50 border-amber-100",
      icon: WandSparkles,
      iconBg: "bg-amber-100/80 text-amber-600",
      outerRing: "border-amber-100",
      title: "Customize & Optimize",
      description:
        "Personalize your resume with our smart suggestions and ensure it's ATS-friendly to beat the competition.",
      barColor: "bg-amber-500",
    },
    {
      step: "04",
      numberColor: "text-blue-600 bg-blue-50 border-blue-100",
      icon: Eye,
      iconBg: "bg-blue-100/80 text-blue-600",
      outerRing: "border-blue-100",
      title: "Preview Your Resume",
      description:
        "See your resume come to life. Preview it in real-time and make changes until it's perfect.",
      barColor: "bg-blue-500",
    },
    {
      step: "05",
      numberColor: "text-purple-600 bg-purple-50 border-purple-100",
      icon: Download,
      iconBg: "bg-purple-100/80 text-[#7C3AED]",
      outerRing: "border-purple-100",
      title: "Download & Apply",
      description:
        "Download your resume in PDF format and apply with confidence to your dream jobs.",
      barColor: "bg-[#7C3AED]",
    },
  ];

  const features = [
    {
      icon: ShieldCheck,
      iconBg: "bg-purple-100/70 text-[#7C3AED] border-purple-200/50",
      title: "ATS Friendly",
      titleColor: "text-purple-900",
      description: "Our templates are optimized to pass ATS scans.",
    },
    {
      icon: Rocket,
      iconBg: "bg-emerald-100/70 text-emerald-600 border-emerald-200/50",
      title: "Quick & Easy",
      titleColor: "text-emerald-900",
      description: "Create a professional resume in just a few minutes.",
    },
    {
      icon: Lock,
      iconBg: "bg-blue-100/70 text-blue-600 border-blue-200/50",
      title: "Secure & Private",
      titleColor: "text-blue-900",
      description: "Your data is 100% secure and confidential.",
    },
    {
      icon: Trophy,
      iconBg: "bg-amber-100/70 text-amber-600 border-amber-200/50",
      title: "Expert Designed",
      titleColor: "text-amber-900",
      description: "Professionally designed templates that get results.",
    },
  ];

  return (
    <section className="bg-gradient-to-b from-[#F8F7FF]/80 via-white to-[#F8F7FF]/60 py-12 sm:py-16 border-t border-purple-50/80 overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Top Badge */}
        <div className="flex justify-center mb-6">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#F3F0FF] border border-purple-100/80 text-xs font-bold tracking-wider text-[#7C3AED] uppercase shadow-2xs">
            HOW IT WORKS
          </span>
        </div>

        {/* Section Heading & Subtitle */}
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-3">
          How It Works
        </h2>
        <p className="text-gray-500 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          Creating your professional resume has never been easier. <br className="hidden sm:inline" />
          Follow these simple steps to land your dream job.
        </p>

        {/* Steps Container with Timeline */}
        <div className="relative mt-10 sm:mt-12 mb-10 sm:mb-12">
          {/* Dashed Timeline Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-[68px] left-[9%] right-[9%] h-0.5 border-t-2 border-dashed border-purple-200/70 z-0">
            {/* Step Connector Nodes */}
            <div className="absolute left-[20%] top-1/2 -translate-y-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-white border-2 border-purple-300"></div>
            <div className="absolute left-[40%] top-1/2 -translate-y-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-white border-2 border-purple-300"></div>
            <div className="absolute left-[60%] top-1/2 -translate-y-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-white border-2 border-purple-300"></div>
            <div className="absolute left-[80%] top-1/2 -translate-y-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-white border-2 border-purple-300"></div>
          </div>

          {/* 5 Step Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 relative z-10">
            {steps.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-md p-6 shadow-xs hover:shadow-xl border border-gray-100/90 flex flex-col items-center text-center transition-all duration-300 transform h-full group"
                >
                  {/* Step Number Badge */}
                  <span
                    className={`text-xs font-bold px-2.5 py-0.5 rounded-full border mb-4 shadow-2xs ${item.numberColor}`}
                  >
                    {item.step}
                  </span>

                  {/* Dual-Circle Icon Badge */}
          <div
                    className={`w-12 h-12 rounded-full bg-white shadow-md border ${item.outerRing} flex items-center justify-center mb-4 p-1 `}
                  >
                    <div
                      className={`w-full h-full rounded-full ${item.iconBg} flex items-center justify-center`}
                    >
                      <IconComponent className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-bold text-gray-900 text-sm mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mb-6 flex-1">
                    {item.description}
                  </p>

                  {/* Bottom Accent Bar */}
                  <div
                    className={`w-10 h-1 ${item.barColor} rounded-full mt-auto transition-all group-hover:w-14`}
                  ></div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Feature Strip */}
        <div className="bg-[#F9F8FE] border border-purple-100/80 rounded-md p-4 sm:p-5 shadow-2xs mb-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
            {features.map((feat, fIdx) => {
              const FeatIcon = feat.icon;
              return (
                <div key={fIdx} className="flex items-center gap-3.5 text-left">
                  <div
                    className={`w-12 h-12 rounded-full ${feat.iconBg} border flex items-center justify-center shrink-0 shadow-2xs`}
                  >
                    <FeatIcon className="w-5.5 h-5.5" />
                  </div>
                  <div>
                    <h4 className={`font-bold text-sm ${feat.titleColor} mb-0.5`}>
                      {feat.title}
                    </h4>
                    <p className="text-gray-500 text-xs leading-snug">
                      {feat.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Button & Decorative Arrow */}
        <div className="relative inline-flex items-center justify-center">
          <Link
            href="/editor"
            className="px-6 py-3 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold rounded-md shadow-lg shadow-purple-500/25 inline-flex items-center gap-2 transition-all cursor-pointer text-sm sm:text-base"
          >
            Create My Resume Now
            <ArrowRight className="w-5 h-5" />
          </Link>

          {/* Decorative Squiggly Pointing Arrow */}
          <svg
            className="w-12 h-12 text-purple-400/90 absolute left-full ml-3 top-1/2 -translate-y-1/2 hidden sm:block pointer-events-none transform -rotate-12"
            viewBox="0 0 50 50"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10 25 C 20 40, 35 35, 42 20" />
            <path d="M35 18 L 43 20 L 41 28" />
          </svg>
        </div>
      </div>
    </section>
  );
}
