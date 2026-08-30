"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Check,
  CheckCircle2,
  FileText,
  Gauge,
  Lightbulb,
  Sparkles,
  Target,
  Wand2,
  Zap,
  ShieldCheck,
  RefreshCw,
  Download,
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import InnerBanner from "@/components/InnerBanner";
import ReadyToBuild from "@/components/sections/ReadyToBuild";

const features = [
  {
    title: "AI Resume Writer",
    description: "Create professional resume content in seconds with AI-powered writing assistance.",
    icon: Wand2,
    accent: "#BAC7FE",
  },
  {
    title: "Smart Content Generation",
    description: "Generate summaries, work experience, and achievements tailored to your job role.",
    icon: Sparkles,
    accent: "#58C09D",
  },
  {
    title: "Resume Improvement",
    description: "Get real-time feedback and suggestions to polish your existing resume content.",
    icon: Lightbulb,
    accent: "#F5D17B",
  },
  {
    title: "Job-Tailored Content",
    description: "Match your resume with specific job descriptions for maximum recruiter impact.",
    icon: Target,
    accent: "#D0B9EF",
  },
  {
    title: "ATS Optimization",
    description: "Ensure your resume passes Applicant Tracking Systems with keyword suggestions.",
    icon: Gauge,
    accent: "#FEE1CF",
  },
  {
    title: "Multi-Role Adaptability",
    description: "Easily adapt your resume for different job titles, industries, and experience levels.",
    icon: Bot,
    accent: "#58C09D",
  },
];

const DEMO_PROMPTS = [
  {
    role: "Senior Full Stack Engineer",
    original: "Worked on React and Node.js web applications for company clients.",
    improved: "Architected and deployed high-concurrency microservices in Node.js and React, improving API throughput by 40% and serving 1.5M+ active users.",
  },
  {
    role: "Product Marketing Manager",
    original: "Responsible for managing social media accounts and marketing campaigns.",
    improved: "Spearheaded multi-channel acquisition campaign across paid search and social, driving 25,000+ new user signups and reducing CAC by 18%.",
  },
  {
    role: "Financial Analyst",
    original: "Prepared monthly accounting reports and checked budget spreadsheets.",
    improved: "Directed monthly financial auditing for 12 corporate entities, identifying $65K in operational cost redundancies while ensuring 100% GAAP compliance.",
  },
];

export default function AiFeaturesClientContent() {
  const [activePromptIdx, setActivePromptIdx] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);

  const activeDemo = DEMO_PROMPTS[activePromptIdx];

  const handleRunDemo = (idx: number) => {
    setIsGenerating(true);
    setActivePromptIdx(idx);
    setTimeout(() => {
      setIsGenerating(false);
    }, 800);
  };

  return (
    <>
      <Navigation />

      <main className="min-h-screen bg-[#F8F8F6] text-[#0F0F0F] font-sans">
        <InnerBanner
          badge="AI Resume Assistant"
          badgeIcon={Sparkles}
          pageType="ai-features"
          breadcrumbs={[{ label: "AI Features", href: "/ai-features" }]}
          title="Supercharge Your Resume with"
          highlightText="AI Intelligence"
          titleSuffix="in Seconds"
          description="Write recruiter-ready bullet points, tailor your summary to job descriptions, and pass ATS scans automatically with GetEasyCV AI."
          primaryAction={{
            label: "Try AI Resume Builder Free",
            href: "/templates",
          }}
          secondaryAction={{
            label: "Check ATS Score",
            href: "/ats-checker",
          }}
          features={[
            "Instant Bullet Generator",
            "Job Description Matcher",
            "100% ATS Compatible",
          ]}
        />

        <div className="marketing-container py-12 sm:py-16 space-y-16">
          <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#FF5722] bg-orange-50 px-3 py-1 rounded-full border border-orange-100">
                  Interactive AI Demo
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-2">
                  See AI Bullet Enhancement in Action
                </h2>
              </div>

              <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
                {DEMO_PROMPTS.map((p, idx) => (
                  <button
                    key={p.role}
                    onClick={() => handleRunDemo(idx)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                      activePromptIdx === idx
                        ? "bg-[#0F0F0F] text-white shadow-sm"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {p.role.split(" ")[0]}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
                <span className="text-[11px] font-bold uppercase text-slate-400">
                  Original Draft
                </span>
                <p className="text-xs text-slate-700 font-medium leading-relaxed">
                  "{activeDemo.original}"
                </p>
              </div>

              <div className="p-5 bg-emerald-50/60 rounded-2xl border border-emerald-200/80 space-y-2 relative">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase text-emerald-800 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    AI Enhanced Version
                  </span>
                  {isGenerating && (
                    <RefreshCw className="w-3.5 h-3.5 text-emerald-600 animate-spin" />
                  )}
                </div>
                <p className="text-xs text-emerald-950 font-semibold leading-relaxed">
                  "{activeDemo.improved}"
                </p>
              </div>
            </div>

            <div className="pt-2 text-center">
              <Link
                href="/editor"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#FF5722] hover:bg-[#E64A19] text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
              >
                <span>Use AI Builder Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="space-y-8">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                AI Tools Built for Career Success
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Explore every AI capability built into GetEasyCV.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feat) => {
                const Icon = feat.icon;
                return (
                  <div
                    key={feat.title}
                    className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3 hover:shadow-md transition-shadow"
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shadow-2xs"
                      style={{ background: feat.accent }}
                    >
                      <Icon className="w-5 h-5 text-[#0F0F0F]" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-base">
                      {feat.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-normal leading-relaxed">
                      {feat.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <ReadyToBuild />
      </main>

      <Footer />
    </>
  );
}
