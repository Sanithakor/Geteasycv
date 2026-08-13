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
      <main className="min-h-screen bg-slate-50 font-sans py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-xs font-bold uppercase tracking-wider mb-4">
              <ShieldCheck className="w-4 h-4 text-purple-600" />
              <span>ATS RESUME CHECKER</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight mb-4">
              Pass Applicant Tracking Systems (ATS)
            </h1>
            <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto">
              Scan your resume against ATS algorithms to ensure 100% readability, keyword optimization, and correct formatting.
            </p>
          </div>

          {/* Interactive Scan Preview Card */}
          <div className="bg-white rounded-md border border-slate-200/80 p-6 sm:p-10 shadow-xs mb-16 max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-8">
              <h3 className="font-bold text-slate-900 text-xl">
                Test Your Resume ATS Score
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm max-w-lg mx-auto">
                Try our instant scanner simulation to check formatting, section headings, and ATS compatibility.
              </p>

              <button
                onClick={handleSimulateScan}
                disabled={analyzing}
                className="px-8 py-3.5 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-bold rounded-md shadow-lg shadow-purple-500/20 inline-flex items-center gap-2 transition-all cursor-pointer text-sm"
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
              <div className="p-6 bg-slate-50 border border-slate-200/80 rounded-md space-y-6 text-left animate-fadeIn">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
                  <div>
                    <h4 className="font-bold text-slate-900 text-base">
                      Scan Summary Report
                    </h4>
                    <p className="text-xs text-slate-500">
                      Scanned against top recruiters ATS standards (Workday, Greenhouse, Lever)
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-emerald-600">
                      96 / 100
                    </span>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
                      EXCELLENT
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 bg-white rounded-md border border-slate-200/80 space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-emerald-600">
                      <CheckCircle className="w-4 h-4" />
                      <span>Parseable Layout</span>
                    </div>
                    <p className="text-slate-600 text-[11px]">
                      Single column layout parses correctly without text overlap.
                    </p>
                  </div>

                  <div className="p-4 bg-white rounded-md border border-slate-200/80 space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-emerald-600">
                      <CheckCircle className="w-4 h-4" />
                      <span>Standard Headings</span>
                    </div>
                    <p className="text-slate-600 text-[11px]">
                      Recognized headings: Experience, Education, Skills, Summary.
                    </p>
                  </div>

                  <div className="p-4 bg-white rounded-md border border-slate-200/80 space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-amber-600">
                      <AlertTriangle className="w-4 h-4" />
                      <span>Keyword Boost</span>
                    </div>
                    <p className="text-slate-600 text-[11px]">
                      Add 2-3 additional technical skills to maximize match score.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-white rounded-md border border-slate-200/80 p-6 text-left shadow-xs">
              <div className="w-10 h-10 rounded-md bg-purple-100 text-purple-600 flex items-center justify-center mb-4">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-base mb-2">
                Real-Time ATS Score
              </h4>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Get an instant overall score breakdown as you type in the editor, ensuring your resume passes screening filters.
              </p>
            </div>

            <div className="bg-white rounded-md border border-slate-200/80 p-6 text-left shadow-xs">
              <div className="w-10 h-10 rounded-md bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                <CheckCircle className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-base mb-2">
                Formatting Safety Check
              </h4>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Automatically detects unparseable elements like tables, custom graphics, or non-standard fonts before exporting.
              </p>
            </div>

            <div className="bg-white rounded-md border border-slate-200/80 p-6 text-left shadow-xs">
              <div className="w-10 h-10 rounded-md bg-amber-100 text-amber-600 flex items-center justify-center mb-4">
                <Search className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-base mb-2">
                Keyword Density Analysis
              </h4>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Identifies missing high-impact industry keywords so recruiters can easily find your profile.
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
