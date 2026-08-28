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
    description: "Get AI suggestions to enhance clarity, impact, and overall resume quality.",
    icon: Lightbulb,
    accent: "#F5D17B",
  },
  {
    title: "ATS Score & Analysis",
    description: "Analyze your resume for ATS compatibility and get a match score instantly.",
    icon: Gauge,
    accent: "#D0B9EF",
  },
  {
    title: "Keyword Optimization",
    description: "Find and add the right keywords to pass ATS scans and get noticed by recruiters.",
    icon: Target,
    accent: "#BAC7FE",
  },
  {
    title: "Grammar & Writing Check",
    description: "AI checks grammar, tone, clarity, and issues for a polished resume.",
    icon: FileText,
    accent: "#FEE1CF",
  },
  {
    title: "Role-Based Suggestions",
    description: "Receive personalized content suggestions based on your industry and job role.",
    icon: Bot,
    accent: "#58C09D",
  },
  {
    title: "Multiple Format Export",
    description: "Download your resume in PDF, DOCX, or shareable link with one click.",
    icon: Zap,
    accent: "#F5D17B",
  },
];

const benefits = [
  { title: "Save Time", description: "Build your resume in minutes, not hours.", icon: Zap, bg: "#FEE1CF" },
  { title: "Professional Quality", description: "AI ensures high-impact and polished bullet points.", icon: Sparkles, bg: "#BAC7FE" },
  { title: "Higher Shortlist Rate", description: "ATS-friendly resumes get you 3x more recruiter calls.", icon: Target, bg: "#F5D17B" },
  { title: "Tailored for You", description: "Personalized suggestions that match your career goals.", icon: Bot, bg: "#D0B9EF" },
  { title: "100% Private & Secure", description: "Your personal data is encrypted and protected.", icon: ShieldCheck, bg: "#58C09D" },
];

const steps = [
  {
    num: 1,
    icon: FileText,
    title: "Add Your Details",
    description: "Enter your background, skills, and target job title.",
    accent: "#BAC7FE",
  },
  {
    num: 2,
    icon: Wand2,
    title: "AI Generates Content",
    description: "AI crafts high-impact summaries and quantified bullet points.",
    accent: "#F5D17B",
    featured: true,
  },
  {
    num: 3,
    icon: Gauge,
    title: "Optimize & Analyze",
    description: "Review ATS score breakdown and fine-tune suggestions.",
    accent: "#D0B9EF",
  },
  {
    num: 4,
    icon: Download,
    title: "Download & Apply",
    description: "Export clean PDF/DOCX files and apply with confidence.",
    accent: "#58C09D",
  },
];

function ResumeArtwork() {
  return (
    <div className="relative mx-auto h-[290px] w-full max-w-[480px] sm:h-[340px]">
      {/* ATS Score Card */}
      <div className="absolute left-1 sm:left-2 top-8 w-[150px] sm:w-[210px] rounded-2xl border border-slate-200/90 bg-white p-3 sm:p-4 shadow-xl">
        <div className="mb-2 sm:mb-3 flex justify-between text-[11px] sm:text-xs font-bold text-slate-800">
          AI Score <span className="text-slate-400">•••</span>
        </div>
        <div className="mx-auto grid h-12 w-12 sm:h-16 sm:w-16 place-items-center rounded-full border-4 border-emerald-400 text-base sm:text-xl font-extrabold text-emerald-600">
          96%
        </div>
        <p className="mt-1.5 sm:mt-2 text-center text-[10px] sm:text-xs font-bold text-emerald-600">
          Excellent ATS Match!
        </p>
        <div className="mt-2 sm:mt-3 space-y-1 sm:space-y-1.5 text-[9.5px] sm:text-[11px] text-slate-600 font-medium">
          {["Clear Structure", "Relevant Skills", "Strong Verbs"].map((item) => (
            <div key={item} className="flex items-center gap-1.5">
              <Check className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-emerald-500 shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Mini Resume Card */}
      <div className="absolute right-1 sm:right-2 top-0 w-[150px] sm:w-[220px] rounded-2xl border border-slate-200/90 bg-white p-3 sm:p-4 shadow-xl">
        <div className="flex items-center gap-2">
          <div className="grid h-7 w-7 sm:h-8 sm:w-8 place-items-center rounded-full bg-[#BAC7FE] text-[10px] sm:text-xs font-bold text-slate-900">
            JW
          </div>
          <div>
            <b className="block text-[10px] sm:text-xs text-slate-900 leading-tight">Jessica Williams</b>
            <span className="text-[8.5px] sm:text-[10px] text-slate-500 font-medium">Marketing Lead</span>
          </div>
        </div>
        <p className="mt-3 sm:mt-4 text-[9.5px] sm:text-[11px] font-bold text-slate-900">Summary</p>
        <div className="mt-1 space-y-1 sm:space-y-1.5">
          <div className="h-1.5 sm:h-2 rounded bg-slate-200 w-full" />
          <div className="h-1.5 sm:h-2 rounded bg-slate-200 w-5/6" />
          <div className="h-1.5 sm:h-2 rounded bg-slate-200 w-4/6" />
        </div>
        <p className="mt-2.5 sm:mt-3.5 text-[9.5px] sm:text-[11px] font-bold text-slate-900">Experience</p>
        <div className="mt-1 space-y-1 sm:space-y-1.5">
          <div className="h-1.5 sm:h-2 rounded bg-[#BAC7FE] w-full" />
          <div className="h-1.5 sm:h-2 rounded bg-[#BAC7FE] w-3/4" />
        </div>
      </div>

      {/* Floating AI Robot Badge */}
      <div className="absolute right-0 top-24 grid h-12 w-12 sm:h-16 sm:w-16 place-items-center rounded-2xl bg-[#0F0F0F] text-white shadow-xl sm:right-2">
        <Bot className="h-6 w-6 sm:h-8 sm:w-8 text-[#F5D17B]" />
      </div>
    </div>
  );
}

export default function AIFeaturesPage() {
  const [text, setText] = useState(
    "Managed a marketing team and increased customer engagement across social channels."
  );
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const improve = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const response = await fetch("/api/ai/resume-improve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: text, action: "improve_bullet" }),
      });
      const data = await response.json();
      setResult(
        data.data?.suggestion ||
          "Spearheaded a 7-person digital marketing team, orchestrating multi-channel campaigns that generated a 42% increase in customer engagement and \$1.2M in pipeline revenue."
      );
    } catch {
      setResult(
        "Spearheaded a 7-person digital marketing team, orchestrating multi-channel campaigns that generated a 42% increase in customer engagement and \$1.2M in pipeline revenue."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white text-[#0F0F0F] font-sans">
        {/* Banner */}
        <InnerBanner
          badge="AI POWERED FEATURES"
          badgeIcon={Sparkles}
          breadcrumbs={[{ label: "AI Features", href: "/ai-features" }]}
          title="Build Smarter Resumes with the"
          highlightText="Power of AI"
          description="GetEasyCV AI helps you create, improve, and optimize your resume with intelligent suggestions, real-time content generation, and ATS-friendly analysis."
          primaryAction={{
            label: "Start Building Free",
            href: "/editor",
          }}
          secondaryAction={{
            label: "Explore Templates",
            href: "/templates",
          }}
          features={[
            "Trusted by 50,000+ users",
            "AI-Powered Content",
            "100% ATS Friendly",
          ]}
          pageType="ai-features"
        />

        {/* Features Grid */}
        <section className="py-16 sm:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-slate-200/80 bg-white text-[#0F0F0F] text-xs font-bold uppercase tracking-wider shadow-2xs mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#F3645C]" />
              <span>Comprehensive Toolkit</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0F0F0F] mb-4">
              AI-Powered Resume <span style={{ color: "#F3645C" }}>Features</span>
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-slate-600 max-w-2xl mx-auto mb-14 leading-relaxed font-normal">
              Everything you need to create a job-winning resume with intelligent, recruiter-backed AI assistance.
            </p>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 text-left">
              {features.map((item) => {
                const IconComponent = item.icon;
                return (
                  <article
                    className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
                    key={item.title}
                  >
                    <div>
                      <div
                        className="grid h-12 w-12 place-items-center rounded-xl mb-4 shadow-2xs group-hover:scale-105 transition-transform"
                        style={{ background: item.accent }}
                      >
                        <IconComponent className="h-6 w-6 text-[#0F0F0F]" />
                      </div>
                      <h3 className="text-base font-bold text-slate-900 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                        {item.description}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Live Interactive AI Assistant Demo */}
        <section
          className="py-16 sm:py-24 font-sans"
          style={{
            background: "#F8F8F6",
            borderTop: "1px solid rgba(15,15,15,0.06)",
            borderBottom: "1px solid rgba(15,15,15,0.06)",
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="space-y-6 text-left">
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-slate-200/80 bg-white text-[#0F0F0F] text-xs font-bold uppercase tracking-wider shadow-2xs">
                  <Sparkles className="w-3.5 h-3.5 text-[#F3645C]" />
                  <span>Interactive Live Demo</span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0F0F0F] leading-tight">
                  AI That Writes.
                  <br />
                  <span style={{ color: "#F3645C" }}>You Get Hired.</span>
                </h2>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                  Our AI understands your background and target job role to generate powerful, quantified bullet points that immediately grab recruiters&apos; attention.
                </p>

                <ul className="space-y-3 pt-2 text-xs sm:text-sm font-semibold text-slate-800">
                  {[
                    "Transform ordinary descriptions into quantified wins",
                    "Keyword-matched for Applicant Tracking Systems",
                    "Customized for entry, mid, and executive levels",
                    "Instant 1-click apply to your active resume",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2.5">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ background: "rgba(88,192,157,0.15)" }}>
                        <Check className="h-3.5 w-3.5 text-[#58C09D]" />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-2">
                  <Link
                    href="/editor"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#0F0F0F] hover:bg-[#262626] px-6 py-3.5 text-xs sm:text-sm font-bold text-white shadow-md transition-all"
                  >
                    <Wand2 className="h-4 w-4 text-[#F5D17B]" />
                    <span>Try Full AI Builder Now</span>
                  </Link>
                </div>
              </div>

              {/* Interactive Tool Card */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xl text-left">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-[#D0B9EF] flex items-center justify-center text-[#0F0F0F] shadow-2xs">
                      <Sparkles className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="font-bold text-sm text-slate-900 block">AI Bullet Point Enhancer</span>
                      <span className="text-[11px] text-slate-500 font-medium">Real-time resume optimizer</span>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-[#58C09D] bg-emerald-50 border border-emerald-200/80 px-2.5 py-0.5 rounded-full">
                    Live Demo
                  </span>
                </div>

                <div className="mt-5 space-y-2">
                  <label className="block text-xs font-bold text-slate-700">
                    Enter a basic bullet point to improve:
                  </label>
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    rows={3}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/70 p-3.5 text-xs sm:text-sm font-medium text-slate-900 outline-none focus:border-[#F3645C] focus:bg-white transition-all resize-none shadow-2xs"
                  />
                </div>

                {result && (
                  <div className="mt-4 rounded-xl border border-emerald-200/80 bg-emerald-50/60 p-4 animate-fadeIn">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 mb-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                      <span>AI Enhanced Version:</span>
                    </div>
                    <p className="text-xs sm:text-sm font-semibold text-slate-900 leading-relaxed">
                      {result}
                    </p>
                  </div>
                )}

                <div className="mt-5 flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={improve}
                    disabled={loading}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 px-4 py-2.5 text-xs font-bold text-slate-800 shadow-2xs transition-all cursor-pointer"
                  >
                    <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
                    <span>{loading ? "Optimizing..." : "Improve with AI"}</span>
                  </button>

                  <Link
                    href="/editor"
                    className="inline-flex items-center gap-1.5 rounded-xl bg-[#0F0F0F] hover:bg-[#262626] px-5 py-2.5 text-xs font-bold text-white shadow-sm transition-all"
                  >
                    <span>Use in Resume</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ATS Analysis Section */}
        <section className="py-16 sm:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              {/* Left Column: ATS Score Gauge Mockup */}
              <div className="mx-auto w-full max-w-[420px] rounded-2xl border border-slate-200/90 bg-white p-7 shadow-xl text-left">
                <div className="flex justify-between items-center text-xs font-bold text-slate-900 border-b border-slate-100 pb-3">
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#58C09D]" />
                    <span>ATS Match Analysis</span>
                  </span>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-full">
                    96% MATCH
                  </span>
                </div>

                <div className="mt-6 flex items-center gap-6">
                  <div className="grid h-24 w-24 place-items-center rounded-full border-8 border-emerald-400 text-2xl font-extrabold text-emerald-600 shrink-0 shadow-inner">
                    96%
                  </div>
                  <div className="space-y-1.5">
                    <b className="text-sm text-emerald-700 font-bold block">Excellent ATS Score</b>
                    <p className="text-xs text-slate-500 font-medium">Ready for enterprise recruiter scan</p>
                    <div className="pt-2 space-y-1.5 text-xs text-slate-700 font-medium">
                      {["Skills & Keyword Density", "Parseable Single Column", "Standard Section Headings"].map((item) => (
                        <div key={item} className="flex items-center gap-1.5">
                          <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0" style={{ background: "rgba(88,192,157,0.2)" }}>
                            <Check className="h-2.5 w-2.5 text-emerald-600 stroke-[3]" />
                          </div>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 space-y-2">
                  <div className="flex justify-between text-[11px] font-semibold text-slate-600">
                    <span>Parsing Accuracy</span>
                    <span className="text-slate-900 font-bold">100%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full rounded-full bg-[#58C09D] w-full" />
                  </div>
                </div>
              </div>

              {/* Right Column: ATS Text */}
              <div className="space-y-6 text-left">
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-slate-200/80 bg-white text-[#0F0F0F] text-xs font-bold uppercase tracking-wider shadow-2xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#58C09D]" />
                  <span>ATS Optimization</span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0F0F0F] leading-tight">
                  ATS Analysis.{" "}
                  <span style={{ color: "#F3645C" }}>Higher Callback Rate.</span>
                </h2>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                  Over 75% of resumes are rejected by automated ATS filters before a human recruiter sees them. GetEasyCV ensures your resume gets passed straight to the hiring manager.
                </p>

                <ul className="space-y-3 pt-2 text-xs sm:text-sm font-semibold text-slate-800">
                  {[
                    "Real-time ATS score calculation",
                    "Missing keyword detection based on target job description",
                    "Section-by-section formatting verification",
                    "Instant 1-click keyword insertion",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2.5">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ background: "rgba(88,192,157,0.15)" }}>
                        <Check className="h-3.5 w-3.5 text-[#58C09D]" />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-2">
                  <Link
                    href="/ats-checker"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#0F0F0F] hover:bg-[#262626] px-6 py-3.5 text-xs sm:text-sm font-bold text-white shadow-md transition-all"
                  >
                    <span>Check Your ATS Score Free</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4 Simple Steps Section */}
        <section
          className="py-16 sm:py-24 overflow-hidden font-sans"
          style={{ background: "#FEE1CF" }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex justify-center mb-5">
              <div
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wider shadow-sm"
                style={{
                  background: "#FFFFFF",
                  borderColor: "rgba(15,15,15,0.15)",
                  color: "#0F0F0F",
                }}
              >
                <Sparkles className="w-3.5 h-3.5" style={{ color: "#F3645C" }} />
                <span>EASY PROCESS</span>
              </div>
            </div>

            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight max-w-3xl mx-auto mb-4"
              style={{ color: "#0F0F0F" }}
            >
              Create Your Perfect Resume in{" "}
              <span style={{ color: "#F3645C" }}>4 Simple Steps</span>
            </h2>

            <p
              className="text-sm sm:text-base lg:text-lg max-w-xl mx-auto leading-relaxed mb-16 sm:mb-20"
              style={{ color: "#333333" }}
            >
              Our intelligent builder guides you from blank page to job-ready resume in minutes.
            </p>

            {/* Steps with Connectors */}
            <div className="relative max-w-6xl mx-auto mb-16">
              {/* Connector line */}
              <div
                className="hidden lg:block absolute top-[22px] left-[11%] right-[11%] h-[2px] z-0"
                style={{ background: "rgba(15,15,15,0.12)" }}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6 relative z-10">
                {steps.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <div
                      key={item.num}
                      className="flex flex-col items-center text-center group"
                    >
                      {/* Number badge */}
                      <div
                        className="w-11 h-11 rounded-full font-extrabold text-sm flex items-center justify-center shadow-md mx-auto z-10 relative transform group-hover:scale-110 transition-transform"
                        style={{
                          background: item.featured ? "#0F0F0F" : "#FFFFFF",
                          color: item.featured ? "#FFFFFF" : "#0F0F0F",
                          border: item.featured
                            ? "none"
                            : "2px solid rgba(15,15,15,0.15)",
                        }}
                      >
                        {item.num}
                      </div>

                      {/* Dashed connector */}
                      <div
                        className="w-[2px] h-6 border-l-2 border-dashed mx-auto my-1.5"
                        style={{ borderColor: item.accent }}
                      />

                      {/* Icon box */}
                      <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto shadow-sm group-hover:scale-105 transition-transform"
                        style={{ background: item.accent }}
                      >
                        <IconComponent
                          className="w-7 h-7"
                          style={{ color: "#0F0F0F" }}
                        />
                      </div>

                      <h3
                        className="text-base sm:text-lg font-bold mt-4 mb-2 transition-colors"
                        style={{ color: "#0F0F0F" }}
                      >
                        {item.title}
                      </h3>
                      <p
                        className="text-xs sm:text-sm leading-relaxed font-normal max-w-[250px] mx-auto"
                        style={{ color: "#333333" }}
                      >
                        {item.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CTA */}
            <Link
              href="/editor"
              className="px-8 py-4 text-white font-bold rounded-xl shadow-lg inline-flex items-center gap-2.5 transition-all transform hover:scale-105 hover:opacity-90 text-sm sm:text-base"
              style={{ background: "#0F0F0F" }}
            >
              <span>Start Building Free</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>

        {/* Benefits Grid */}
        <section className="py-16 sm:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-slate-200/80 bg-white text-[#0F0F0F] text-xs font-bold uppercase tracking-wider shadow-2xs mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#F3645C]" />
              <span>Why GetEasyCV AI</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0F0F0F] mb-4">
              Benefits That Help You Get Ahead
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-slate-600 max-w-xl mx-auto mb-14 font-normal">
              Designed with feedback from leading hiring managers and talent recruiters.
            </p>

            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 text-center">
              {benefits.map((b) => {
                const Icon = b.icon;
                return (
                  <div
                    key={b.title}
                    className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col items-center group"
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-2xs group-hover:scale-105 transition-transform"
                      style={{ background: b.bg }}
                    >
                      <Icon className="h-6 w-6 text-[#0F0F0F]" />
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-1.5">
                      {b.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {b.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Canonical ReadyToBuild CTA */}
        <ReadyToBuild
          title="Ready to Build Your AI-Powered Resume?"
          subtitle="Join thousands of job seekers who built their dream careers with GetEasyCV AI."
          buttonText="Start Building Free"
          buttonHref="/editor"
        />
      </main>
      <Footer />
    </>
  );
}

