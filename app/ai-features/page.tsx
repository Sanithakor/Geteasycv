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
      <main className="min-h-screen bg-slate-50 font-sans py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>AI-POWERED RESUME BUILDER</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight mb-4">
              Build a Professional Resume 10x Faster with AI
            </h1>
            <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto">
              Our intelligent AI writing tools help you articulate your career achievements, choose high-impact keywords, and bypass writer's block.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link
                href="/editor"
                className="px-8 py-3.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-md shadow-lg shadow-purple-500/20 inline-flex items-center gap-2 transition-all text-sm cursor-pointer"
              >
                <span>Try AI Builder Free</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* AI Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {aiTools.map((tool, idx) => {
              const ToolIcon = tool.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-md border border-slate-200/80 p-8 shadow-xs hover:shadow-lg transition-all text-left flex items-start gap-5"
                >
                  <div className="w-12 h-12 rounded-md bg-purple-100/80 text-purple-600 flex items-center justify-center shrink-0">
                    <ToolIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg mb-2">
                      {tool.title}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      {tool.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Demonstration Card */}
          <div className="bg-white rounded-md border border-slate-200/80 p-8 sm:p-12 shadow-xs mb-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 text-left space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-600">
                BEFORE &amp; AFTER AI ENHANCEMENT
              </span>
              <h2 className="text-3xl font-bold text-slate-900">
                Turn Generic Bullets Into Quantified Achievements
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Recruiters spend 6 seconds reviewing a resume. AI formatting ensures every line highlights metrics, scope, and strategic outcomes.
              </p>

              <div className="space-y-2 text-xs sm:text-sm text-slate-700">
                <div className="p-3 bg-red-50/60 border border-red-100 rounded-md text-red-800 flex items-center gap-2">
                  <span className="font-bold text-xs">BEFORE:</span>
                  <span>"Responsible for managing company website and adding features."</span>
                </div>
                <div className="p-3 bg-emerald-50/60 border border-emerald-100 rounded-md text-emerald-800 flex items-center gap-2 font-medium">
                  <span className="font-bold text-xs">AFTER AI:</span>
                  <span>"Engineered responsive React features for 50k+ active users, increasing session duration by 25%."</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-slate-900 text-white rounded-md p-6 text-left font-mono text-xs space-y-3 shadow-xl">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-3 text-slate-400">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>AI Enhancement Prompt</span>
              </div>
              <p className="text-purple-300">&gt; Generating tailored bullet points for Senior Software Engineer...</p>
              <p className="text-slate-300">✓ Optimization score: 98%</p>
              <p className="text-emerald-400">✓ Keywords matched: React, TypeScript, Next.js, Performance Optimization</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
