import React from "react";
import Navigation from "@/components/Navigation";
import Link from "next/link";
import {
  Sparkles,
  Wand2,
  FileText,
  TrendingUp,
  Brain,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export const metadata = {
  title: "AI Resume Features - GetEasyCV",
  description:
    "Supercharge your resume writing with AI summary generation, smart action verb suggestions, and automated achievement rewriting.",
};

export default function AIFeaturesPage() {
  const aiTools = [
    {
      icon: Wand2,
      title: "AI Professional Summary Generator",
      description:
        "Input your job title and years of experience to instantly receive 3 tailored, high-impact summary paragraphs.",
    },
    {
      icon: TrendingUp,
      title: "Bullet Point Achievement Rewriter",
      description:
        "Transform generic duty lists into quantified, metric-driven achievements using industry action verbs.",
    },
    {
      icon: Brain,
      title: "Smart Skill Recommender",
      description:
        "Analyzes your target job role and suggests top technical and soft skills demanded by recruiters.",
    },
    {
      icon: Sparkles,
      title: "Real-Time Resume Score Optimizer",
      description:
        "Calculates an instant resume strength score with step-by-step guidance to reach 95%+ ATS optimization.",
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
              <Sparkles className="w-4 h-4 text-[#FF5722]" />
              <span>AI-POWERED RESUME BUILDER</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4 max-w-3xl mx-auto">
              Build a Professional Resume 10x Faster with AI
            </h1>
            <p className="text-slate-600 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed font-medium mb-8">
              Our intelligent AI writing tools help you articulate your career achievements, choose high-impact keywords, and bypass writer's block.
            </p>

            <div className="flex justify-center gap-4">
              <Link
                href="/editor"
                className="px-8 py-4 bg-[#FF5722] hover:bg-[#E64A19] text-white font-bold rounded-xl shadow-md shadow-[#FF5722]/20 inline-flex items-center gap-2 transition-all text-sm cursor-pointer"
              >
                <span>Try AI Builder Free</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </section>

          {/* AI Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {aiTools.map((tool, idx) => {
              const ToolIcon = tool.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200/80 p-8 shadow-2xs hover:shadow-xl transition-all duration-300 text-left flex items-start gap-5 hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#FFF0EB] text-[#FF5722] flex items-center justify-center shrink-0 border border-[#FF5722]/20">
                    <ToolIcon className="w-6 h-6 text-[#FF5722]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg mb-2">
                      {tool.title}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                      {tool.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Demonstration Card */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 p-8 sm:p-12 shadow-2xs max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 text-left space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#FF5722] bg-[#FFF0EB] px-3 py-1 rounded-full border border-[#FF5722]/30">
                BEFORE &amp; AFTER AI ENHANCEMENT
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Turn Generic Bullets Into Quantified Achievements
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
                Our AI rewriter turns plain bullet points like "Responsible for managing project budget" into quantified accomplishments recruiters notice instantly.
              </p>
              <ul className="space-y-2.5 pt-2">
                {[
                  "Action-oriented industry verbs",
                  "Automated metric & percentage suggestions",
                  "ATS keyword density optimization",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-[#FF5722] shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-6 space-y-4">
              <div className="p-5 rounded-2xl bg-red-50/60 border border-red-200/80 text-left space-y-1">
                <span className="text-[10px] font-bold text-red-600 uppercase tracking-wider">Original Input</span>
                <p className="text-xs text-slate-700 font-medium">
                  "Handled customer support calls and resolved user complaints."
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 text-left space-y-1">
                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">AI Rewritten Output</span>
                <p className="text-xs text-slate-900 font-semibold">
                  "Resolved 45+ daily customer inquiries with a 98.5% first-contact satisfaction rate, reducing escalated tickets by 30%."
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
