"use client";

import React from "react";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import InnerBanner from "@/components/InnerBanner";
import ReadyToBuild from "@/components/sections/ReadyToBuild";
import FAQ from "@/components/FAQ";
import { ABOUT_FAQS } from "@/data/faqs";
import Footer from "@/components/Footer";
import {
  Sparkles,
  CheckCircle2,
  XCircle,
  Target,
  ShieldCheck,
  FileText,
  Users,
  Award,
  ArrowRight,
  TrendingUp,
  Cpu,
  Lock,
  Zap,
  Globe2,
  Layers,
  HeartHandshake,
  Check,
} from "lucide-react";

export default function AboutClientContent() {
  return (
    <>
      <Navigation />

      <main className="font-sans min-h-screen bg-[#F8F8F6]">
        {/* Hero Section using InnerBanner */}
        <InnerBanner
          badge="Our Mission & Engineering Story"
          badgeIcon={Sparkles}
          pageType="about"
          variant="split"
          breadcrumbs={[{ label: "About Us", href: "/about" }]}
          title="Empowering Candidates to Land"
          highlightText="Recruiter-Ready Roles"
          titleSuffix="Worldwide"
          description="We founded GetEasyCV to eliminate the frustration of legacy resume builders. No surprise paywalls after two hours of typing, no broken PDF layouts, and zero ATS parsing failures."
          primaryAction={{
            label: "Create Your Resume Now",
            href: "/templates",
          }}
          secondaryAction={{
            label: "Explore ATS Checker",
            href: "/ats-checker",
          }}
          features={[
            "100% Vector PDF Fidelity",
            "Privacy-First Data Architecture",
            "Tested on Fortune 500 ATS Parsers",
          ]}
        />

        {/* 1. KEY IMPACT METRICS BAR */}
        <section className="py-12 bg-white border-y border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {[
                {
                  metric: "40,000+",
                  label: "Resumes & CVs Built",
                  desc: "Downloaded and submitted to global employers",
                  color: "text-slate-900",
                },
                {
                  metric: "98.6%",
                  label: "ATS Parse Pass Rate",
                  desc: "Verified on Workday, Greenhouse & Lever",
                  color: "text-emerald-600",
                },
                {
                  metric: "150+",
                  label: "Recruiter-Tested Templates",
                  desc: "Modular designs for all career trajectories",
                  color: "text-violet-600",
                },
                {
                  metric: "120+",
                  label: "Countries Supported",
                  desc: "North American, European & global standards",
                  color: "text-sky-600",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200/70 text-center sm:text-left space-y-1.5"
                >
                  <div className={`text-3xl sm:text-4xl font-black tracking-tight ${stat.color}`}>
                    {stat.metric}
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900">
                    {stat.label}
                  </div>
                  <div className="text-[11px] text-slate-500 leading-snug">
                    {stat.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 2. THE PROBLEM WE SOLVE: Legacy Builders vs GetEasyCV */}
        <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-xs font-bold uppercase tracking-wider mb-4">
              <Target className="w-3.5 h-3.5" />
              <span>The Problem in Job Search</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Why Traditional Resume Builders{' '}
              <span className="bg-gradient-to-r from-rose-500 to-violet-600 bg-clip-text text-transparent">
                Fail Job Seekers
              </span>
            </h2>
            <p className="text-base text-slate-600 mt-3 max-w-2xl mx-auto leading-relaxed">
              Job hunting is stressful enough without deceptive software. Here is how GetEasyCV fixes the industry&apos;s most frustrating design and ethical flaws.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-stretch">
            {/* The Old Way (Legacy Builders) */}
            <div className="bg-white rounded-3xl p-8 border border-rose-200/80 shadow-xs space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-rose-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center font-black text-sm">
                      ✕
                    </div>
                    <h3 className="font-extrabold text-lg text-slate-900">
                      Traditional Online Builders
                    </h3>
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                    Outdated & Predatory
                  </span>
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-slate-600">
                  {[
                    "Deceptive Paywall Traps: Free to create, but forces a costly subscription after hours of typing.",
                    "Pixelated Raster Images: Exported PDFs are often rasterized HTML screenshots that ATS machines can't read.",
                    "Layout Breakdowns: Adding a single sentence shoves headers awkwardly onto blank second pages.",
                    "Cluttered Unreadable Designs: Multi-column sidebars, decorative graphics, and star ratings that trip ATS scanners.",
                    "Data Monetization: Sells applicant contact details and job-seeking status to aggressive third-party headhunters.",
                  ].map((flaw, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{flaw}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-rose-50/60 border border-rose-200/60 text-xs text-rose-800 font-medium">
                Result: High candidate frustration, distorted documents, and automatic rejections from automated filters.
              </div>
            </div>

            {/* The GetEasyCV Solution */}
            <div className="bg-white rounded-3xl p-8 border border-emerald-300 shadow-md space-y-6 flex flex-col justify-between ring-1 ring-emerald-500/20">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-emerald-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-sm">
                      ✓
                    </div>
                    <h3 className="font-extrabold text-lg text-slate-900">
                      The GetEasyCV Engineering Standard
                    </h3>
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                    Transparent & ATS-First
                  </span>
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-slate-700">
                  {[
                    "Honest Transparent Access: Truly build and download real vector PDF resumes with zero surprise traps.",
                    "Pure Vector PDF Architecture: 300 DPI text layer with embedded fonts and guaranteed selectable text.",
                    "Smart Pagination Engine: Mathematically calculated spacing prevents awkward orphan headers automatically.",
                    "Recruiter-Approved Formats: Verified single & two-column layouts tested against Workday, Greenhouse & Lever.",
                    "Strict Privacy-First Security: You own 100% of your career data. We never sell or share user profiles.",
                  ].map((perk, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-relaxed font-medium">{perk}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 font-bold">
                Result: Professional, recruiter-ready resumes that pass ATS parsing algorithms with 98.6% accuracy.
              </div>
            </div>
          </div>
        </section>

        {/* 3. OUR 4 FOUNDATIONAL PILLARS */}
        <section className="py-16 sm:py-20 bg-white border-y border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-800 border border-slate-200 text-xs font-bold uppercase tracking-wider mb-4">
                <ShieldCheck className="w-3.5 h-3.5 text-violet-600" />
                <span>Our Principles</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Four Pillars That Guide Everything We Build
              </h2>
              <p className="text-base text-slate-600 mt-3 max-w-2xl mx-auto leading-relaxed">
                From our real-time rendering algorithms to our privacy policies, these non-negotiable standards define our platform.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: ShieldCheck,
                  title: "1. ATS Compliance",
                  tag: "Algorithms First",
                  desc: "We test every font, margin, and delimiter against leading ATS systems so your qualifications are never lost in transit.",
                  iconBg: "bg-emerald-50 text-emerald-600 border-emerald-100",
                },
                {
                  icon: FileText,
                  title: "2. Vector Fidelity",
                  tag: "Crystal-Clear 300 DPI",
                  desc: "Documents render crisp and sharp at any scale. No blurred text, no pixelated artifacts, and true vector export.",
                  iconBg: "bg-blue-50 text-blue-600 border-blue-100",
                },
                {
                  icon: Lock,
                  title: "3. Total Privacy",
                  tag: "Zero Data Brokerage",
                  desc: "Your employment history and contact info belong exclusively to you. We do not sell user data to advertising or recruiting networks.",
                  iconBg: "bg-violet-50 text-violet-600 border-violet-100",
                },
                {
                  icon: HeartHandshake,
                  title: "4. Honest Access",
                  tag: "No Dark Patterns",
                  desc: "We believe everyone deserves access to a job-winning resume without deceptive countdown clocks or bait-and-switch billing.",
                  iconBg: "bg-amber-50 text-amber-600 border-amber-100",
                },
              ].map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={pillar.title}
                    className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center border shadow-2xs ${pillar.iconBg}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-600">
                          {pillar.tag}
                        </span>
                      </div>
                      <h3 className="font-bold text-base text-slate-900 mb-2">
                        {pillar.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {pillar.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 4. HOW GETEASYCV IS ENGINEERED */}
        <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-14 shadow-2xl relative overflow-hidden">
            {/* Ambient Lighting */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-sky-600/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl mb-12">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-xs font-bold uppercase tracking-wider text-violet-300 mb-4">
                <Cpu className="w-3.5 h-3.5" />
                <span>Modern Technology Stack</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
                Engineered for Speed, Reliability, and Career Mobility
              </h2>
              <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
                Behind GetEasyCV is a modern web architecture designed for sub-second live rendering, real-time font sub-setting, and contextual AI rewriting.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
              <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-violet-500/20 text-violet-300 flex items-center justify-center border border-violet-500/30">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-white">
                  Reactive Edge Rendering
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Every character change updates the print canvas in under 16ms without page reloads or lagging server round-trips.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-300 flex items-center justify-center border border-sky-500/30">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-white">
                  Deterministic Pagination
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Our custom DOM geometry calculator calculates precise page boundaries to eliminate awkward single-line breaks.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center border border-emerald-500/30">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-white">
                  Contextual AI Copilot
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Trained on tens of thousands of accepted resume bullets to suggest high-impact action verbs and quantified achievements.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. COMPANY TIMELINE & JOURNEY */}
        <section className="py-16 sm:py-20 bg-white border-y border-slate-200/80">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-800 border border-slate-200 text-xs font-bold uppercase tracking-wider mb-4">
                <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
                <span>Our Journey</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                The Path to 40,000+ Resumes
              </h2>
            </div>

            <div className="space-y-6 sm:space-y-8 relative before:absolute before:inset-0 before:left-8 sm:before:left-1/2 before:-translate-x-1/2 before:h-full before:w-0.5 before:bg-slate-200">
              {[
                {
                  year: "2023",
                  title: "Founded out of Frustration",
                  desc: "Started as an internal open-source tool after our founding team watched friends spend hours building resumes only to be blocked by sudden paywalls.",
                },
                {
                  year: "2024",
                  title: "Vector PDF & 50 Templates",
                  desc: "Launched our proprietary vector PDF compiler, ensuring zero font shifts and crystal-clear print quality across any device.",
                },
                {
                  year: "2025",
                  title: "AI Bullet Optimization & Global Scale",
                  desc: "Introduced smart AI content analysis to help candidates quantify achievements, passing 25,000 active resume downloads.",
                },
                {
                  year: "2026",
                  title: "International CV Formats & Verified ATS",
                  desc: "Crossed 40,000+ resumes, launched international multi-page CV layouts, and verified 98.6% parse rates across Fortune 500 ATS systems.",
                },
              ].map((milestone, idx) => (
                <div
                  key={milestone.year}
                  className={`relative flex flex-col sm:flex-row items-start ${
                    idx % 2 === 0 ? "sm:flex-row-reverse" : ""
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-8 sm:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs shadow-md z-10 border-4 border-white">
                    {idx + 1}
                  </div>

                  {/* Content Box */}
                  <div className="ml-16 sm:ml-0 sm:w-1/2 sm:px-8">
                    <div className="bg-slate-50/90 p-6 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md transition-all">
                      <span className="text-xs font-black text-violet-600 uppercase tracking-wider">
                        {milestone.year}
                      </span>
                      <h3 className="font-extrabold text-base text-slate-900 mt-1 mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {milestone.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. OUR COMMITMENT TO CANDIDATES */}
        <section className="py-16 sm:py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-sm text-center space-y-6">
            <div className="w-12 h-12 rounded-2xl bg-violet-50 text-violet-600 flex items-center justify-center mx-auto shadow-2xs">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              A Personal Commitment to Every Job Seeker
            </h3>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
              “Finding your next career milestone should be about presenting your talent, not battling formatted margins or predatory subscription traps. We promise to keep GetEasyCV fast, honest, and relentlessly focused on your career success.”
            </p>
            <div className="pt-2">
              <div className="font-bold text-slate-900 text-sm">
                The GetEasyCV Product & Engineering Team
              </div>
              <div className="text-xs text-slate-500">
                Crafting tools for job seekers across 120+ countries
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FAQ
          items={ABOUT_FAQS}
          badge="Company & Security FAQs"
          title="Frequently Asked"
          highlightText="Questions"
          subtitle="Everything you need to know about our technology, data security, and platform standards."
          showContactCta={true}
          bgStyle="#F8F8F6"
        />

        {/* Canonical ReadyToBuild CTA */}
        <ReadyToBuild
          title="Ready to Build Your Recruiter-Approved Resume?"
          subtitle="Join over 40,000 ambitious professionals who landed interviews at top global companies."
          buttonText="Create My Resume Free"
          buttonHref="/templates"
          secondaryButtonText="Explore 150+ Templates"
          secondaryButtonHref="/templates"
        />
      </main>
      <Footer />
    </>
  );
}
