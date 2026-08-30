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
  Target,
  ShieldCheck,
  FileText,
  Users,
  Award,
} from "lucide-react";

export default function AboutClientContent() {
  return (
    <>
      <Navigation />

      <main className="font-sans min-h-screen bg-[#F8F8F6]">
        <InnerBanner
          badge="Our Mission & Story"
          badgeIcon={Sparkles}
          pageType="about"
          breadcrumbs={[{ label: "About Us", href: "/about" }]}
          title="Empowering Job Seekers to Build"
          highlightText="Recruiter-Ready Resumes"
          titleSuffix="Worldwide"
          description="GetEasyCV was built with a simple goal: eliminate formatting frustration and give every professional access to clean, ATS-compliant resumes."
          primaryAction={{
            label: "Create Your Resume Now",
            href: "/templates",
          }}
          secondaryAction={{
            label: "Explore ATS Checker",
            href: "/ats-checker",
          }}
          features={[
            "100% ATS Optimized",
            "Privacy-First Storage",
            "Instant Vector PDF Export",
          ]}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 py-16 sm:py-24">
          <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-12 shadow-sm max-w-4xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-orange-50 text-[#FF5722] rounded-full text-xs font-bold uppercase tracking-wider">
              <Target className="w-4 h-4" />
              <span>Why GetEasyCV?</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Solving the Frustration of Traditional Resume Builders
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Traditional resume builders force users into rigid templates, lock basic features behind paywalls after hours of work, or produce broken PDF layouts that fail Applicant Tracking System (ATS) scans.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              At GetEasyCV, we built a modern resume platform from the ground up with real-time vector PDF export, ATS-tested typography, and transparent pricing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#FF5722] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">ATS Compliance First</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Every layout is designed to preserve text hierarchy and clean character encoding across ATS parsers.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Vector PDF & Word Export</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Export clean, selectable text documents without low-res image blur or browser printing artifacts.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">User-Focused Privacy</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Your personal data and resume content belong to you. We never sell your personal information.
              </p>
            </div>
          </div>
        </div>

        <FAQ
          items={ABOUT_FAQS}
          badge="Company FAQs"
          title="Frequently Asked"
          highlightText="Questions"
          subtitle="Learn more about our team, platform technology, and mission."
          showContactCta={true}
          bgStyle="#FFFFFF"
        />

        <ReadyToBuild />
      </main>
      <Footer />
    </>
  );
}
