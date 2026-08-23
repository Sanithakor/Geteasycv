"use client";

import React, { useState } from "react";
import Navigation from "@/components/Navigation";
import ReadyToBuild from "@/components/sections/ReadyToBuild";
import Footer from "@/components/Footer";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle,
  AlertTriangle,
  FileSearch,
  Sparkles,
  ArrowRight,
  BarChart3,
  Search,
} from "lucide-react";

export default function ATSCheckerPage() {
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
      <main className="min-h-screen bg-[#F8FAFC] font-sans py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Modern Hero Banner Card */}
          <section className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#EEF2FF] via-[#F0F4FF] to-[#F5F3FF] p-8 sm:p-12 border border-[#FF5722]/40 overflow-hidden shadow-xs text-center max-w-5xl mx-auto">
            {/* Background Dot Matrix */}
            <div className="absolute right-8 top-8 hidden lg:block opacity-25 pointer-events-none">
              <div className="grid grid-cols-6 gap-2.5">
                {Array.from({ length: 36 }).map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#FF5722]"></div>
                ))}
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 border border-[#FF5722]/30 text-[#FF5722] text-xs font-bold uppercase tracking-wider mb-6 shadow-2xs backdrop-blur-xs">
              <ShieldCheck className="w-4 h-4 text-[#FF5722]" />
              <span>ATS RESUME CHECKER</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4 max-w-3xl mx-auto">
              Pass Applicant Tracking Systems (ATS)
            </h1>
            <p className="text-slate-600 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed font-medium mb-6">
              Scan your resume against ATS algorithms to ensure 100% readability, keyword optimization, and correct formatting.
            </p>
          </section>

          {/* Interactive Scan Preview Card */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-2xs max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-8">
              <h3 className="font-bold text-slate-900 text-xl sm:text-2xl">
                Test Your Resume ATS Score
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm max-w-lg mx-auto font-medium">
                Try our instant scanner simulation to check formatting, section headings, and ATS compatibility.
              </p>

              <button
                onClick={handleSimulateScan}
                disabled={analyzing}
                className="px-8 py-4 bg-[#FF5722] hover:bg-[#E64A19] disabled:opacity-50 text-white font-bold rounded-xl shadow-md shadow-[#FF5722]/20 inline-flex items-center gap-2 transition-all cursor-pointer text-sm"
              >
                {analyzing ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin" />
                    <span>Scanning Resume Structure...</span>
                  </>
                ) : (
                  <>
                    <FileSearch className="w-4 h-4" />
                    <span>Run Free ATS Compatibility Scan</span>
                  </>
                )}
              </button>
            </div>

            {/* Scan Results Demo */}
            {scanned && (
              <div className="p-6 bg-[#F8FAFC] border border-slate-200/80 rounded-2xl space-y-6 text-left animate-fadeIn">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
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
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
                      EXCELLENT
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 bg-white rounded-xl border border-slate-200/80 space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-emerald-600">
                      <CheckCircle className="w-4 h-4" />
                      <span>Parseable Layout</span>
                    </div>
                    <p className="text-slate-600 text-[11px] font-medium">
                      Single column layout parses correctly without text overlap.
                    </p>
                  </div>

                  <div className="p-4 bg-white rounded-xl border border-slate-200/80 space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-emerald-600">
                      <CheckCircle className="w-4 h-4" />
                      <span>Standard Headings</span>
                    </div>
                    <p className="text-slate-600 text-[11px] font-medium">
                      Recognized headings: Experience, Education, Skills, Summary.
                    </p>
                  </div>

                  <div className="p-4 bg-white rounded-xl border border-slate-200/80 space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-amber-600">
                      <AlertTriangle className="w-4 h-4" />
                      <span>Metric Density</span>
                    </div>
                    <p className="text-slate-600 text-[11px] font-medium">
                      Add 2-3 extra quantitative metrics (%, $) to boost recruiter score.
                    </p>
                  </div>
                </div>

                <div className="pt-2 text-center">
                  <Link
                    href="/editor"
                    className="inline-flex items-center gap-2 text-xs font-bold text-white bg-[#0F0F0F] hover:bg-slate-800 px-6 py-3 rounded-xl shadow-md transition-all cursor-pointer"
                  >
                    <span>Fix Resume in Live Builder</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Value Props */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 space-y-2 text-left shadow-2xs hover:shadow-xl transition-all">
              <div className="w-10 h-10 rounded-xl bg-[#FFF0EB] text-[#FF5722] flex items-center justify-center font-bold mb-3 border border-[#FF5722]/20">
                1
              </div>
              <h4 className="font-bold text-slate-900 text-base">Parseability Check</h4>
              <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed">
                We verify that your text, contact info, and dates can be correctly parsed into database fields by ATS software.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 space-y-2 text-left shadow-2xs hover:shadow-xl transition-all">
              <div className="w-10 h-10 rounded-xl bg-[#FFF0EB] text-[#FF5722] flex items-center justify-center font-bold mb-3 border border-[#FF5722]/20">
                2
              </div>
              <h4 className="font-bold text-slate-900 text-base">Keyword Matching</h4>
              <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed">
                Cross-reference your hard and soft skills with the target job posting to catch missing high-value keywords.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 space-y-2 text-left shadow-2xs hover:shadow-xl transition-all">
              <div className="w-10 h-10 rounded-xl bg-[#FFF0EB] text-[#FF5722] flex items-center justify-center font-bold mb-3 border border-[#FF5722]/20">
                3
              </div>
              <h4 className="font-bold text-slate-900 text-base">Format Validation</h4>
              <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed">
                Ensure fonts, margins, bullet points, and section spacing strictly adhere to recruiter best practices.
              </p>
            </div>
          </div>

        </div>
      </main>
      <ReadyToBuild />
      <Footer />
    </>
  );
}
