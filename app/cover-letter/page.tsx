import React from "react";
import Navigation from "@/components/Navigation";
import ReadyToBuild from "@/components/sections/ReadyToBuild";
import Footer from "@/components/Footer";
import Link from "next/link";
import {
  FileCode,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Wand2,
  Download,
  Palette,
  ShieldCheck,
} from "lucide-react";

export default function CoverLetterPage() {
  const features = [
    {
      icon: Palette,
      title: "Matching Resume Templates",
      description:
        "Ensure your cover letter matches your resume design perfectly with identical fonts, colors, and headers.",
    },
    {
      icon: Wand2,
      title: "AI-Powered Writing Assistant",
      description:
        "Generate tailored opening statements and impact-driven body paragraphs matched to the job description.",
    },
    {
      icon: Download,
      title: "One-Click PDF Export",
      description:
        "Download print-ready PDF cover letters with perfect formatting and typography.",
    },
    {
      icon: ShieldCheck,
      title: "ATS-Friendly Formatting",
      description:
        "Clean single-column layouts that pass applicant tracking system scanners smoothly.",
    },
  ];

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
              <FileCode className="w-4 h-4 text-[#FF5722]" />
              <span>COVER LETTER BUILDER</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4 max-w-3xl mx-auto">
              Write a Cover Letter That Gets You Hired
            </h1>
            <p className="text-slate-600 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed font-medium mb-8">
              Pair your resume with a matching, professional cover letter. Powered by AI content suggestions and expert formatting.
            </p>

            <div className="flex justify-center gap-4">
              <Link
                href="/editor"
                className="px-8 py-4 bg-[#FF5722] hover:bg-[#E64A19] text-white font-bold rounded-xl shadow-md shadow-[#FF5722]/20 inline-flex items-center gap-2 transition-all text-sm cursor-pointer"
              >
                <span>Create Cover Letter Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </section>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {features.map((feat, idx) => {
              const IconComp = feat.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs hover:shadow-xl transition-all duration-300 text-left flex flex-col items-start hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#FFF0EB] text-[#FF5722] flex items-center justify-center mb-5 shrink-0 border border-[#FF5722]/20">
                    <IconComp className="w-6 h-6 text-[#FF5722]" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base mb-2">
                    {feat.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                    {feat.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Preview Showcase Card */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 p-8 sm:p-12 shadow-2xs max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 text-left space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#FF5722] bg-[#FFF0EB] px-3 py-1 rounded-full border border-[#FF5722]/30">
                Seamless Integration
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Perfect Visual Match with Your Resume
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
                Choose any template design from our resume library and get a matching cover letter automatically configured with identical colors, margins, headers, and typography.
              </p>
              <ul className="space-y-2.5 pt-2">
                {[
                  "Identical header & color scheme matching",
                  "AI-assisted opening statement generator",
                  "Pre-formatted single-page layout",
                  "High-res PDF export without watermarks",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-[#FF5722] shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-6 bg-slate-50 border border-slate-200/80 rounded-md p-6 shadow-inner text-left font-serif space-y-3 text-xs text-slate-700">
              <div className="border-b border-slate-200 pb-3 font-sans">
                <h4 className="font-bold text-slate-900 text-sm">Alex Johnson</h4>
                <p className="text-[11px] text-purple-600 font-medium">Senior Full Stack Developer</p>
              </div>
              <p className="text-slate-500 text-[10px]">Dear Hiring Team,</p>
              <p className="leading-normal">
                I am writing to express my strong interest in the Senior Full Stack Engineer position at your company. With over 6 years of experience engineering high-performance web applications using React, Node.js, and TypeScript, I am confident in my ability to contribute immediately to your product team.
              </p>
              <p className="leading-normal">
                In my previous role, I led the redesign of a core customer application that improved user conversion by 40% and reduced API response latency by 120ms...
              </p>
              <p className="text-slate-500 text-[10px] pt-2">Sincerely,</p>
              <p className="font-sans font-bold text-slate-900 text-xs">Alex Johnson</p>
            </div>
          </div>
        </div>
      </main>
      <ReadyToBuild />
      <Footer />
    </>
  );
}
