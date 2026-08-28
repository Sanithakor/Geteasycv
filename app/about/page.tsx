"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import InnerBanner from "@/components/InnerBanner";
import ReadyToBuild from "@/components/sections/ReadyToBuild";
import FAQ from "@/components/FAQ";
import { ABOUT_FAQS } from "@/data/faqs";
import Footer from "@/components/Footer";
import {
  Sparkles,
  Check,
  CheckCircle2,
  Target,
  ShieldCheck,
  FileText,
  Users,
  Award,
  Headphones,
  Zap,
  LayoutTemplate,
  Lightbulb,
  Search,
  Bot,
  ArrowRight,
  Gem,
  Building,
  RotateCw,
  Globe2,
  TrendingUp,
  Flame,
  CheckSquare2,
} from "lucide-react";

export default function AboutPage() {
  // Stats Data (5 Cards)
  const stats = [
    {
      value: "50,000+",
      label: "Resumes & Letters Created",
      icon: FileText,
      bg: "bg-[#D0B9EF]/30 text-[#7353B6]",
    },
    {
      value: "96%",
      label: "Average ATS Match Rate",
      icon: ShieldCheck,
      bg: "bg-[#DDF4EA] text-[#319675]",
    },
    {
      value: "3.5x",
      label: "More Interview Callbacks",
      icon: Award,
      bg: "bg-[#FFF6D9] text-[#B88714]",
    },
    {
      value: "120+",
      label: "Countries Supported",
      icon: Globe2,
      bg: "bg-[#FFE0CF] text-[#F3645C]",
    },
    {
      value: "24/7",
      label: "AI Writing & Career Tools",
      icon: Zap,
      bg: "bg-[#BAC7FE]/40 text-[#4361EE]",
    },
  ];

  // Story Timeline Steps
  const storySteps = [
    {
      number: "1",
      title: "The Problem",
      description:
        "Job seekers struggled with confusing formatting tools, generic templates, and low ATS scan pass rates.",
      icon: Search,
      color: "bg-[#D0B9EF]/30 text-[#7353B6] border-[#D0B9EF]",
    },
    {
      number: "2",
      title: "The Innovation",
      description:
        "We engineered an AI engine trained on thousands of recruiter-approved resumes to write role-specific bullet points.",
      icon: Lightbulb,
      color: "bg-[#FFF6D9] text-[#B88714] border-[#F5D17B]",
    },
    {
      number: "3",
      title: "The Platform",
      description:
        "GetEasyCV launched with real-time ATS scoring, live bullet point enhancement, and export-ready document templates.",
      icon: ShieldCheck,
      color: "bg-[#DDF4EA] text-[#319675] border-[#58C09D]",
    },
    {
      number: "4",
      title: "The Impact",
      description:
        "Helping over 50,000 ambitious professionals land job interviews across tech, finance, marketing, and healthcare.",
      icon: Sparkles,
      color: "bg-[#FFE0CF] text-[#F3645C] border-[#F3645C]",
    },
  ];

  // Core Value Cards
  const coreValues = [
    {
      title: "User-First Empowerment",
      description:
        "Every tool, template, and suggestion is designed to give job seekers an undeniable edge in hiring pipelines.",
      icon: Users,
      bg: "bg-[#DDF4EA] text-[#319675]",
    },
    {
      title: "Algorithmic Precision",
      description:
        "Templates are engineered to comply with enterprise ATS parsers like Workday, Greenhouse, Taleo, and Lever.",
      icon: ShieldCheck,
      bg: "bg-[#BAC7FE]/40 text-[#4361EE]",
    },
    {
      title: "Intelligent Simplicity",
      description:
        "We remove the guesswork from resume writing. Polish your entire professional profile in less than 10 minutes.",
      icon: Zap,
      bg: "bg-[#FFF6D9] text-[#B88714]",
    },
    {
      title: "Design Craftsmanship",
      description:
        "Visual hierarchy, typography, and spacing curated by top career coaches and human resources executives.",
      icon: LayoutTemplate,
      bg: "bg-[#FFE0CF] text-[#F3645C]",
    },
  ];

  // Team Members
  const team = [
    {
      name: "Sophia Lee",
      role: "CEO & Co-Founder",
      bio: "Former Executive Recruiter & Career Strategist",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=500&auto=format&fit=crop",
      linkedin: "https://linkedin.com",
    },
    {
      name: "James Carter",
      role: "CTO & Co-Founder",
      bio: "AI Engineer & Natural Language Processing Specialist",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=500&auto=format&fit=crop",
      linkedin: "https://linkedin.com",
    },
    {
      name: "Emily Chen",
      role: "Head of Product",
      bio: "Product Leader passionate about human-centered design",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=500&auto=format&fit=crop",
      linkedin: "https://linkedin.com",
    },
    {
      name: "Daniel Smith",
      role: "Lead ATS Architect",
      bio: "Specializing in document parsing & enterprise HR tech",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=500&auto=format&fit=crop",
      linkedin: "https://linkedin.com",
    },
  ];

  return (
    <>
      <Navigation />

      <main className="min-h-screen bg-[#F8F8F6] text-[#0F0F0F] font-sans">
        {/* ========================================================================= */}
        {/* SECTION 1: HERO BANNER                                                    */}
        {/* ========================================================================= */}
        <InnerBanner
          badge="ABOUT GETEASYCV"
          badgeIcon={Building}
          breadcrumbs={[{ label: "About Us", href: "/about" }]}
          title="Empowering Careers with"
          highlightText="Smart AI & Design"
          titleSuffix=""
          description="We are on a mission to help every professional build standout, ATS-optimized resumes and cover letters that open doors to dream career opportunities."
          primaryAction={{
            label: "Create My Resume",
            href: "/templates",
          }}
          secondaryAction={{
            label: "Explore Features",
            href: "/cover-letter",
          }}
          features={[
            "Trusted by 50,000+ Job Seekers",
            "96% Verified ATS Pass Rate",
            "Enterprise Recruiter Approved",
          ]}
          pageType="about"
        />

        {/* ========================================================================= */}
        {/* SECTION 2: STAT METRICS BAR (5 CARDS)                                     */}
        {/* ========================================================================= */}
        <section className="py-12 sm:py-16 bg-[#FFFFFF] border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
              {stats.map((item, idx) => {
                const StatIcon = item.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 text-center shadow-2xs hover:shadow-md transition-all flex flex-col items-center justify-center space-y-3"
                  >
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center ${item.bg}`}
                    >
                      <StatIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-2xl sm:text-3xl font-extrabold text-[#0F0F0F] tracking-tight">
                        {item.value}
                      </div>
                      <div className="text-xs font-semibold text-[#666666] mt-0.5">
                        {item.label}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 3: CORE PRODUCT & INNOVATION PILLARS (REFERENCE IMAGES 1, 3, 4)   */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-24 bg-[#F8F8F6]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#0F0F0F]/10 bg-white text-[#0F0F0F] text-xs font-bold uppercase tracking-wider shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[#F3645C]" />
                <span>INNOVATION & TECHNOLOGY</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0F0F0F]">
                Engineered for Recruiter Impact & ATS Success
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed font-normal">
                GetEasyCV combines natural language intelligence with strict applicant tracking system compliance to maximize your interview conversion rate.
              </p>
            </div>

            {/* 2-Column Innovation Grid */}
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-10">
              
              {/* ------------------------------------------------------------------- */}
              {/* PILLAR CARD 1: AI BULLET POINT ENHANCER (Reference Image 3)         */}
              {/* ------------------------------------------------------------------- */}
              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm flex flex-col justify-between space-y-6">
                <div>
                  {/* Card Header matching Reference Image 3 */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#D0B9EF] text-[#7C3AED] flex items-center justify-center shadow-xs">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-base font-extrabold text-slate-900 leading-tight">
                          AI Bullet Point Enhancer
                        </h3>
                        <p className="text-xs text-slate-500 font-medium">
                          Real-time resume optimizer
                        </p>
                      </div>
                    </div>
                    <span className="rounded-full bg-[#DDF4EA] text-[#319675] px-3 py-1 text-xs font-bold uppercase tracking-wider">
                      Live Demo
                    </span>
                  </div>

                  {/* Input Demonstration Box */}
                  <div className="mt-5 space-y-2">
                    <label className="text-xs font-bold text-slate-700 block">
                      Enter a basic bullet point to improve:
                    </label>
                    <div className="rounded-xl border border-slate-200/90 bg-[#FAFAF9] p-4 text-xs font-medium text-slate-800 leading-relaxed">
                      Managed a marketing team and increased customer engagement across social channels.
                    </div>
                  </div>
                </div>

                {/* Bottom Action Buttons */}
                <div className="flex items-center justify-end gap-3 pt-2">
                  <div className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-800 shadow-2xs hover:bg-slate-50 transition-all">
                    <RotateCw className="w-3.5 h-3.5 text-slate-600" />
                    <span>Improve with AI</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 rounded-xl bg-[#0F0F0F] px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-black transition-all">
                    <span>Use in Resume</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

              {/* ------------------------------------------------------------------- */}
              {/* PILLAR CARD 2: ATS MATCH ANALYSIS (Reference Image 4)               */}
              {/* ------------------------------------------------------------------- */}
              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm flex flex-col justify-between space-y-6">
                <div>
                  {/* Card Header matching Reference Image 4 */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-2 text-slate-900">
                      <ShieldCheck className="w-5 h-5 text-[#319675]" />
                      <h3 className="text-base font-extrabold leading-tight">
                        ATS Match Analysis
                      </h3>
                    </div>
                    <span className="rounded-full bg-[#DDF4EA] text-[#319675] px-3 py-1 text-xs font-bold uppercase tracking-wider">
                      96% MATCH
                    </span>
                  </div>

                  {/* Middle Circular Gauge + Checklist */}
                  <div className="mt-6 flex flex-col sm:flex-row items-center gap-6">
                    {/* 96% Radial Progress Meter */}
                    <div className="relative w-28 h-28 rounded-full border-8 border-[#58C09D] flex items-center justify-center shrink-0">
                      <span className="text-2xl font-black text-slate-900 tracking-tight">
                        96%
                      </span>
                    </div>

                    {/* Score Details & Checklist */}
                    <div className="space-y-2.5 text-center sm:text-left">
                      <div>
                        <h4 className="text-sm font-extrabold text-[#0D7355]">
                          Excellent ATS Score
                        </h4>
                        <p className="text-xs text-slate-500 font-medium">
                          Ready for enterprise recruiter scan
                        </p>
                      </div>

                      <ul className="space-y-1.5 text-xs font-semibold text-slate-700">
                        <li className="flex items-center justify-center sm:justify-start gap-2">
                          <Check className="w-3.5 h-3.5 text-[#319675]" />
                          <span>Skills & Keyword Density</span>
                        </li>
                        <li className="flex items-center justify-center sm:justify-start gap-2">
                          <Check className="w-3.5 h-3.5 text-[#319675]" />
                          <span>Parseable Single Column</span>
                        </li>
                        <li className="flex items-center justify-center sm:justify-start gap-2">
                          <Check className="w-3.5 h-3.5 text-[#319675]" />
                          <span>Standard Section Headings</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Bottom Parsing Accuracy Bar */}
                <div className="pt-4 border-t border-slate-100 space-y-1.5">
                  <div className="flex justify-between text-xs font-bold text-slate-700">
                    <span>Parsing Accuracy</span>
                    <span className="text-slate-900 font-extrabold">100%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full w-full bg-[#58C09D] rounded-full" />
                  </div>
                </div>
              </div>

              {/* ------------------------------------------------------------------- */}
              {/* PILLAR CARD 3: PERFECT FORMATTING GUARANTEED (Reference Image 1)    */}
              {/* ------------------------------------------------------------------- */}
              <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-sm">
                <div className="grid lg:grid-cols-12 gap-8 sm:gap-12 items-center">
                  
                  {/* Left Column: Text & Checklist */}
                  <div className="lg:col-span-6 space-y-6">
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F0F0F] tracking-tight">
                        Perfect Formatting Guaranteed
                      </h3>
                      <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                        Never worry about broken margins, misaligned bullet points, or unparseable columns.
                      </p>
                    </div>

                    <ul className="space-y-3.5 text-xs sm:text-sm font-semibold text-slate-800">
                      {[
                        "Perfect formatting maintained across all formats",
                        "High-quality output optimized for printing",
                        "ATS-compatible structure preserved",
                        "Custom fonts and colors included",
                      ].map((item) => (
                        <li key={item} className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded-full bg-[#DDF4EA] flex items-center justify-center shrink-0">
                            <Check className="w-3 h-3 text-[#319675] stroke-[2.5]" />
                          </div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right Column: Visual Export Window Mockup (Reference Image 1) */}
                  <div className="lg:col-span-6 flex justify-center">
                    <div className="relative w-full max-w-[420px] bg-white rounded-2xl border border-slate-200 shadow-xl p-5 space-y-4">
                      {/* Window Header */}
                      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                        <div className="flex gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#FF605C]" />
                          <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD44]" />
                          <span className="w-2.5 h-2.5 rounded-full bg-[#00CA4E]" />
                        </div>
                        <span className="text-[11px] font-medium text-slate-400">
                          Ready to Export
                        </span>
                      </div>

                      {/* Mockup Layout Lines */}
                      <div className="space-y-2.5 py-1">
                        <div className="h-4 w-4/5 bg-[#0F0F0F] rounded-md" />
                        <div className="h-2 w-full bg-slate-200 rounded" />
                        <div className="h-2.5 w-3/5 bg-[#F3645C] rounded-md" />
                        <div className="h-2 w-5/6 bg-slate-200 rounded" />
                        <div className="h-2 w-4/6 bg-slate-200 rounded" />
                      </div>

                      {/* PDF & DOCX Dual Action Buttons */}
                      <div className="grid grid-cols-2 gap-3 pt-2">
                        <div className="rounded-xl bg-[#F3645C] py-2.5 text-center text-xs font-bold text-white shadow-xs">
                          PDF
                        </div>
                        <div className="rounded-xl bg-[#0F0F0F] py-2.5 text-center text-xs font-bold text-white shadow-xs">
                          DOCX
                        </div>
                      </div>

                      {/* Floating Format Preserved Badge */}
                      <div className="absolute -bottom-3 -right-2 sm:-right-4 rounded-full bg-[#58C09D] px-3 py-1 text-[11px] font-bold text-white shadow-md flex items-center gap-1">
                        <Check className="w-3 h-3 stroke-[3]" />
                        <span>Format Preserved</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 4: OUR STORY / BUILT TO SOLVE A REAL PROBLEM                      */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-20 lg:py-24 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#0F0F0F]/10 bg-[#FFE0CF] text-[#0F0F0F] text-xs font-bold uppercase tracking-wider mb-4">
                <span>OUR STORY</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0F0F0F] mb-4">
                Built to Solve a Real Problem
              </h2>
              <p className="text-sm sm:text-base text-[#666666] leading-relaxed max-w-2xl mx-auto font-medium">
                We noticed how hard it was for qualified candidates to get past automated hiring filters. Complex tools and outdated templates were getting in the way. GetEasyCV was born to bridge that gap.
              </p>
            </div>

            {/* 2-Column Story Grid */}
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Left Column: Device Mockup Illustration */}
              <div className="lg:col-span-6 flex justify-center">
                <div className="relative w-full max-w-md bg-[#F8F8F6] rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-md">
                  {/* Laptop Mockup Visual */}
                  <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 sm:p-5 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-md bg-[#0F0F0F] text-white flex items-center justify-center font-bold text-[10px]">
                          G
                        </div>
                        <span className="text-xs font-extrabold text-slate-900">
                          GetEasyCV
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-[#58C09D] bg-[#DDF4EA] px-2 py-0.5 rounded-full">
                        Live Sync
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-1">
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
                        <span className="text-[9px] font-bold text-slate-500">
                          ATS Score
                        </span>
                        <div className="text-lg font-black text-[#319675]">
                          96/100
                        </div>
                        <div className="text-[8px] text-slate-400">
                          Top Recruiter Tier
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
                        <span className="text-[9px] font-bold text-slate-500">
                          Template
                        </span>
                        <div className="text-sm font-bold text-slate-900 truncate">
                          Modern Executive
                        </div>
                        <div className="text-[8px] text-[#F3645C] font-semibold">
                          ATS Verified ✓
                        </div>
                      </div>
                    </div>

                    <div className="rounded-xl border border-slate-100 p-3 space-y-2 bg-slate-50/50">
                      <div className="h-2 w-3/4 bg-slate-200 rounded" />
                      <div className="h-2 w-full bg-slate-100 rounded" />
                      <div className="h-2 w-5/6 bg-slate-100 rounded" />
                    </div>
                  </div>

                  {/* Floating Analytics Card */}
                  <div className="absolute -bottom-4 -right-2 sm:-right-4 bg-white rounded-2xl border border-slate-200 p-3.5 shadow-xl flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#FFF6D9] text-[#B88714] flex items-center justify-center font-bold">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-extrabold text-slate-900">
                        3.5x More Calls
                      </div>
                      <div className="text-[10px] text-slate-500 font-medium">
                        Average Interview Rate
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Timeline Steps */}
              <div className="lg:col-span-6 space-y-6 relative">
                {/* Vertical connecting line */}
                <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-slate-200 hidden sm:block" />

                {storySteps.map((step) => {
                  const StepIcon = step.icon;
                  return (
                    <div
                      key={step.title}
                      className="relative flex items-start gap-4 sm:gap-5 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-md transition-all z-10"
                    >
                      {/* Icon Circle */}
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${step.color} font-bold`}
                      >
                        <StepIcon className="w-5 h-5" />
                      </div>

                      {/* Content */}
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-[#0F0F0F] mb-1">
                          {step.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#666666] leading-relaxed font-normal">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 5: MISSION & CORE VALUES (SPLIT CARDS)                            */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-20 lg:py-24 bg-[#F8F8F6] border-b border-slate-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8 items-stretch">
              {/* Left Card: Our Mission */}
              <div className="bg-[#FFF8F5] rounded-3xl border border-[#FFD4C2]/70 p-8 sm:p-10 shadow-sm flex flex-col justify-between relative overflow-hidden">
                <div className="space-y-4 relative z-10">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFE0CF] text-[#0F0F0F] text-xs font-bold uppercase tracking-wider">
                    <span>OUR MISSION</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F0F0F] tracking-tight leading-tight">
                    Empower 1 Million+ Career Journeys
                  </h3>

                  <p className="text-xs sm:text-sm text-[#666666] leading-relaxed font-normal">
                    Our mission is to make professional resume building accessible, intelligent, and confidence-boosting for professionals worldwide.
                  </p>
                </div>

                <div className="mt-8 flex justify-end">
                  <div className="w-20 h-20 rounded-full bg-white/80 border border-[#FFD4C2] flex items-center justify-center shadow-xs">
                    <Target className="w-10 h-10 text-[#F3645C]" />
                  </div>
                </div>
              </div>

              {/* Right Card: Our Values */}
              <div className="bg-[#F2FAF6] rounded-3xl border border-[#C7EDDB] p-8 sm:p-10 shadow-sm flex flex-col justify-between relative overflow-hidden">
                <div className="space-y-4 relative z-10">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DDF4EA] text-[#319675] text-xs font-bold uppercase tracking-wider">
                    <span>OUR VALUES</span>
                  </div>

                  <ul className="space-y-3 pt-2">
                    {[
                      "Candidate success is our singular north star",
                      "Innovation through verified AI and recruiter science",
                      "Absolute data privacy and encrypted storage",
                      "Continuous platform optimization for hiring trends",
                    ].map((val) => (
                      <li
                        key={val}
                        className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-[#0F0F0F]"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#319675] shrink-0" />
                        <span>{val}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 flex justify-end">
                  <div className="w-20 h-20 rounded-full bg-white/80 border border-[#C7EDDB] flex items-center justify-center shadow-xs">
                    <Gem className="w-10 h-10 text-[#319675]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 6: MEET THE TEAM / THE LEADERSHIP BEHIND GETEASYCV                */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-20 lg:py-24 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#0F0F0F]/10 bg-[#FFE0CF] text-[#0F0F0F] text-xs font-bold uppercase tracking-wider mb-4">
                <span>MEET THE TEAM</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0F0F0F] mb-3">
                The People Behind GetEasyCV
              </h2>
              <p className="text-sm sm:text-base text-[#666666] leading-relaxed font-medium">
                A passionate team of career advisors, engineers, and UX architects dedicated to your professional success.
              </p>
            </div>

            {/* Team Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-6xl mx-auto">
              {team.map((member, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200/80 p-6 text-center shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-between"
                >
                  <div className="flex flex-col items-center">
                    {/* Member Photo */}
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden mb-4 border-2 border-slate-100 shadow-sm bg-slate-100">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=500&auto=format&fit=crop";
                        }}
                      />
                    </div>

                    {/* Name & Role */}
                    <h3 className="text-base sm:text-lg font-bold text-[#0F0F0F]">
                      {member.name}
                    </h3>
                    <p className="text-xs font-semibold text-[#F3645C] mt-0.5">
                      {member.role}
                    </p>
                    <p className="text-[11px] text-slate-500 font-medium mt-1 leading-normal">
                      {member.bio}
                    </p>
                  </div>

                  {/* LinkedIn Icon Badge */}
                  <div className="pt-4 mt-4 border-t border-slate-100 w-full flex justify-center">
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200 hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] text-slate-600 font-bold text-xs flex items-center justify-center transition-colors cursor-pointer"
                      title={`Connect with ${member.name}`}
                    >
                      in
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 7: ABOUT GETEASYCV FAQ SECTION                                   */}
        {/* ========================================================================= */}
        <FAQ
          items={ABOUT_FAQS}
          badge="About GetEasyCV FAQs"
          title="Frequently Asked"
          highlightText="Questions"
          subtitle="Learn more about our mission, template engineering, and data privacy commitments."
          showContactCta={true}
          bgStyle="#F8F8F6"
        />

        {/* ========================================================================= */}
        {/* SECTION 8: READY TO BUILD CALL-TO-ACTION                                 */}
        {/* ========================================================================= */}
        <ReadyToBuild
          title="Ready to Build Your Future?"
          subtitle="Join thousands of professionals advancing their careers with GetEasyCV."
          buttonText="Create My Resume Now"
          buttonHref="/templates"
        />
      </main>

      <Footer />
    </>
  );
}