"use client";

import React, { useState } from "react";
import Navigation from "@/components/Navigation";
import InnerBanner from "@/components/InnerBanner";
import ReadyToBuild from "@/components/sections/ReadyToBuild";
import FAQ from "@/components/FAQ";
import { ATS_FAQS } from "@/data/faqs";
import Footer from "@/components/Footer";
import Link from "next/link";
import {
  ShieldCheck,
  Check,
  AlertTriangle,
  FileText,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export default function AtsCheckerClientContent() {
  const [analyzing, setAnalyzing] = useState(false);
  const [scanned, setScanned] = useState(false);

  const handleSimulateScan = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setScanned(true);
    }, 1500);
  };

  return (
    <>
      <Navigation />
      <main className="font-sans min-h-screen bg-[#F8F8F6]">
        <InnerBanner
          badge="ATS Resume Checker"
          badgeIcon={ShieldCheck}
          pageType="ats-checker"
          breadcrumbs={[{ label: "ATS Checker", href: "/ats-checker" }]}
          title="Pass Applicant Tracking Systems"
          highlightText="(ATS)"
          titleSuffix="with Confidence"
          description="Scan your resume against ATS algorithms to ensure 100% readability, keyword optimization, and correct formatting before you apply."
          primaryAction={{
            label: "Create ATS-Ready Resume",
            href: "/templates",
          }}
          secondaryAction={{
            label: "Explore AI Features",
            href: "/ai-features",
          }}
          features={[
            "100% ATS Readable",
            "Keyword Optimization",
            "Instant Parser Feedback",
          ]}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10 py-16 sm:py-24">
          <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-12 shadow-sm max-w-4xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-slate-200/80 bg-white text-[#0F0F0F] text-xs font-bold uppercase tracking-wider shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5 text-[#58C09D]" />
              <span>INSTANT DIAGNOSTIC</span>
            </div>

            <h2 className="font-extrabold text-slate-900 text-2xl sm:text-3xl md:text-4xl tracking-tight">
              Test Your Resume ATS Score
            </h2>

            <p className="text-slate-600 text-xs sm:text-sm max-w-lg mx-auto font-normal leading-relaxed">
              Try our instant scanner simulation to check formatting, section headings, and recruiter ATS compatibility.
            </p>

            <div className="pt-2">
              <button
                onClick={handleSimulateScan}
                disabled={analyzing}
                className="px-6 sm:px-8 py-3.5 bg-[#0F0F0F] hover:bg-black disabled:opacity-50 text-white font-bold rounded-xl shadow-md inline-flex items-center gap-2.5 transition-all cursor-pointer text-xs sm:text-sm"
              >
                {analyzing ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin text-[#F5D17B]" />
                    <span>Scanning Resume Structure...</span>
                  </>
                ) : (
                  <>
                    <FileText className="w-4 h-4 text-[#F5D17B]" />
                    <span>Run Free ATS Compatibility Scan</span>
                  </>
                )}
              </button>
            </div>

            {scanned && (
              <div className="mt-8 p-6 sm:p-8 bg-[#F8F8F6] border border-slate-200/90 rounded-2xl space-y-6 text-left animate-in fade-in">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
                  <div>
                    <h4 className="font-bold text-slate-900 text-base">
                      Scan Summary Report
                    </h4>
                    <p className="text-xs text-slate-500 font-medium">
                      Scanned against top recruiters ATS standards (Workday, Greenhouse, Lever)
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-extrabold text-emerald-600">
                      96 / 100
                    </span>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-3 py-1 rounded-full">
                      EXCELLENT
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 bg-white rounded-xl border border-slate-200/80 space-y-1.5 shadow-2xs">
                    <div className="flex items-center gap-1.5 font-bold text-emerald-700">
                      <div
                        className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                        style={{ background: "rgba(88,192,157,0.2)" }}
                      >
                        <Check className="h-2.5 w-2.5 text-emerald-600 stroke-[3]" />
                      </div>
                      <span>Parseable Layout</span>
                    </div>
                    <p className="text-slate-600 text-[11px] font-normal leading-relaxed">
                      Single column layout parses correctly without text overlap or missed fields.
                    </p>
                  </div>

                  <div className="p-4 bg-white rounded-xl border border-slate-200/80 space-y-1.5 shadow-2xs">
                    <div className="flex items-center gap-1.5 font-bold text-emerald-700">
                      <div
                        className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                        style={{ background: "rgba(88,192,157,0.2)" }}
                      >
                        <Check className="h-2.5 w-2.5 text-emerald-600 stroke-[3]" />
                      </div>
                      <span>Standard Headings</span>
                    </div>
                    <p className="text-slate-600 text-[11px] font-normal leading-relaxed">
                      Recognized headings: Experience, Education, Skills, Summary verified.
                    </p>
                  </div>

                  <div className="p-4 bg-white rounded-xl border border-slate-200/80 space-y-1.5 shadow-2xs">
                    <div className="flex items-center gap-1.5 font-bold text-amber-700">
                      <AlertTriangle className="w-4 h-4 text-amber-500" />
                      <span>Metric Density</span>
                    </div>
                    <p className="text-slate-600 text-[11px] font-normal leading-relaxed">
                      Add 2-3 extra quantitative metrics (%, $) to boost recruiter score.
                    </p>
                  </div>
                </div>

                <div className="pt-2 text-center">
                  <Link
                    href="/editor"
                    className="inline-flex items-center gap-2 text-xs font-bold text-white bg-[#0F0F0F] hover:bg-black px-6 py-3 rounded-xl shadow-md transition-all cursor-pointer"
                  >
                    <span>Fix Resume in Live Builder</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 p-6 sm:p-7 space-y-3 text-left shadow-xs hover:shadow-md transition-all">
              <div className="w-9 h-7 rounded-lg bg-[#BAC7FE] text-[#0F0F0F] font-extrabold text-xs flex items-center justify-center shadow-2xs">
                01
              </div>
              <h3 className="font-extrabold text-slate-900 text-base">
                Parseability Check
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm font-normal leading-relaxed">
                We verify that your text, contact info, and dates can be correctly parsed into database fields by ATS software.
              </p>
            </div>

            <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 p-6 sm:p-7 space-y-3 text-left shadow-xs hover:shadow-md transition-all">
              <div className="w-9 h-7 rounded-lg bg-[#F5D17B] text-[#0F0F0F] font-extrabold text-xs flex items-center justify-center shadow-2xs">
                02
              </div>
              <h3 className="font-extrabold text-slate-900 text-base">
                Keyword Matching
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm font-normal leading-relaxed">
                Cross-reference your hard and soft skills with the target job posting to catch missing high-value keywords.
              </p>
            </div>

            <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 p-6 sm:p-7 space-y-3 text-left shadow-xs hover:shadow-md transition-all">
              <div className="w-9 h-7 rounded-lg bg-[#58C09D] text-white font-extrabold text-xs flex items-center justify-center shadow-2xs">
                03
              </div>
              <h3 className="font-extrabold text-slate-900 text-base">
                Format Validation
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm font-normal leading-relaxed">
                Ensure fonts, margins, bullet points, and section spacing strictly adhere to recruiter best practices.
              </p>
            </div>
          </div>
        </div>

        <FAQ
          items={ATS_FAQS}
          badge="ATS Diagnostic FAQs"
          title="Frequently Asked"
          highlightText="Questions"
          subtitle="Everything you need to know about ATS screening algorithms, scoring, and formatting rules."
          showContactCta={true}
          bgStyle="#FFFFFF"
        />

        <ReadyToBuild />
      </main>
      <Footer />
    </>
  );
}
