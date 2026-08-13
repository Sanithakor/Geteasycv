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
      iconBg: "bg-purple-100 text-purple-600",
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
      <main className="min-h-screen bg-slate-50 font-sans py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-xs font-bold uppercase tracking-wider mb-4">
              <FileCode className="w-4 h-4 text-purple-600" />
              <span>COVER LETTER BUILDER</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight mb-3">
              Write a Cover Letter That Gets You Hired
            </h1>
            <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto">
              Pair your resume with a matching, professional cover letter. Powered by AI content suggestions and expert formatting.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link
                href="/editor"
                className="px-8 py-3.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-md shadow-lg shadow-purple-500/20 inline-flex items-center gap-2 transition-all text-sm cursor-pointer"
              >
                <span>Create Cover Letter Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {features.map((feat, idx) => {
              const IconComp = feat.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-md border border-slate-200/80 p-6 shadow-xs hover:shadow-lg transition-all text-left flex flex-col items-start"
                >
                  <div className="w-12 h-12 rounded-md bg-purple-100/70 text-purple-600 flex items-center justify-center mb-5 shrink-0">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base mb-2">
                    {feat.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Preview Showcase */}
          <div className="bg-white rounded-md border border-slate-200/80 p-8 sm:p-12 shadow-xs mb-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 text-left space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-600">
                AI SMART ASSISTANT
              </span>
              <h2 className="text-2xl font-bold text-slate-900">
                Personalized Opening &amp; Closing Statements
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Stuck on how to start? Input the target job title and company name, and our AI assistant writes custom, professional cover letter drafts tailored specifically to your background.
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Custom tone of voice (Professional, Enthusiastic, Creative)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Instant key skill highlighting matched to job posting</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Matching header design with your resume template</span>
                </li>
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
