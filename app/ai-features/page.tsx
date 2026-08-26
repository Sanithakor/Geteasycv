"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Check,
  FileText,
  Gauge,
  Lightbulb,
  Sparkles,
  Target,
  Wand2,
  Zap,
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const features = [
  [
    "AI Resume Writer",
    "Create professional resume content in seconds with AI-powered writing assistance.",
    Wand2,
    "#e9ddff",
  ],
  [
    "Smart Content Generation",
    "Generate summaries, work experience, and achievements tailored to your job role.",
    Sparkles,
    "#dbf2e4",
  ],
  [
    "Resume Improvement",
    "Get AI suggestions to enhance clarity, impact, and overall resume quality.",
    Lightbulb,
    "#ffe8cc",
  ],
  [
    "ATS Score & Analysis",
    "Analyze your resume for ATS compatibility and get a match score instantly.",
    Gauge,
    "#ffdce9",
  ],
  [
    "Keyword Optimization",
    "Find and add the right keywords to pass ATS scans and get noticed by recruiters.",
    Target,
    "#dce8ff",
  ],
  [
    "Grammar & Writing Check",
    "AI checks grammar, tone, clarity, and issues for a polished resume.",
    FileText,
    "#e8ddff",
  ],
  [
    "Role-Based Suggestions",
    "Receive personalized content suggestions based on your industry and job role.",
    Bot,
    "#d8f3f1",
  ],
  [
    "Multiple Format Export",
    "Download your resume in PDF, DOCX, or shareable link with one click.",
    Zap,
    "#ffe4d7",
  ],
] as const;
const benefits = [
  ["Save Time", "Build your resume in minutes, not hours.", Zap],
  [
    "Professional Quality",
    "AI ensures high-quality and impactful content.",
    Sparkles,
  ],
  [
    "Higher Shortlist Rate",
    "ATS-friendly resumes get you more interviews.",
    Target,
  ],
  [
    "Personalized for You",
    "Tailored content that matches your career goals.",
    Bot,
  ],
  ["100% Secure", "Your data is private and always protected.", Check],
] as const;
const steps = [
  [
    "Add Your Details",
    "Enter your information and choose your preferred role.",
  ],
  [
    "AI Generates Content",
    "AI writes or suggests the best content for your resume.",
  ],
  [
    "Optimize & Analyze",
    "Improve your resume with AI suggestions and ATS analysis.",
  ],
  [
    "Download & Apply",
    "Download your ATS-friendly resume and apply with confidence.",
  ],
];

function Tag({ children }: { children: string }) {
  return (
    <span className="rounded-full bg-[#f1edff] px-3 py-1 text-[8px] font-bold uppercase tracking-wide text-[#7755ed]">
      {children}
    </span>
  );
}
function ResumeArtwork() {
  return (
    <div className="relative mx-auto h-[275px] w-full max-w-[480px] sm:h-[330px]">
      <div className="absolute left-4 top-8 w-[170px] rounded-lg border border-slate-200 bg-white p-4 shadow-xl sm:left-10 sm:w-[205px]">
        <div className="mb-4 flex justify-between text-[8px] font-bold">
          AI Resume Score <span className="text-slate-400">•••</span>
        </div>
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full border-4 border-emerald-400 text-lg font-bold text-emerald-600">
          92
        </div>
        <p className="mt-2 text-center text-[8px] font-bold text-emerald-600">
          Excellent Match!
        </p>
        <div className="mt-4 space-y-2 text-[7px] text-slate-500">
          {["Clear Structure", "Relevant Skills", "Strong Keywords"].map(
            (item) => (
              <p key={item}>
                <Check className="mr-1 inline h-2.5 w-2.5 rounded-full bg-emerald-400 p-0.5 text-white" />
                {item}
              </p>
            ),
          )}
        </div>
      </div>
      <div className="absolute right-4 top-0 w-[175px] rounded-lg border border-slate-200 bg-white p-4 shadow-xl sm:right-12 sm:w-[205px]">
        <div className="flex items-center gap-2">
          <div className="grid h-7 w-7 place-items-center rounded-full bg-[#d9ccff] text-[9px] font-bold">
            JW
          </div>
          <div>
            <b className="block text-[8px]">Jessica Williams</b>
            <span className="text-[7px] text-slate-400">Marketing Manager</span>
          </div>
        </div>
        <p className="mt-5 text-[8px] font-bold">Summary</p>
        <div className="mt-2 space-y-1.5">
          {[1, 2, 3].map((line) => (
            <div className="h-1 rounded bg-slate-200" key={line} />
          ))}
        </div>
        <p className="mt-4 text-[8px] font-bold">Experience</p>
        <div className="mt-2 space-y-2">
          {[1, 2, 3, 4].map((line) => (
            <div className="h-1 rounded bg-[#bba5ff]" key={line} />
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 right-0 w-[155px] rounded-lg border border-slate-200 bg-white p-3 shadow-lg sm:w-[180px]">
        <b className="text-[8px]">AI Suggestions</b>
        {[
          "Add measurable impact",
          "Include more keywords",
          "Improve summary",
        ].map((item) => (
          <p className="mt-2 text-[7px] text-slate-500" key={item}>
            <Check className="mr-1 inline h-2.5 w-2.5 rounded-full bg-[#d9ccff] p-0.5 text-[#7755ed]" />
            {item}
          </p>
        ))}
      </div>
      <div className="absolute right-0 top-20 grid h-16 w-16 place-items-center rounded-full bg-[#8764ee] text-white shadow-lg sm:right-3 sm:h-20 sm:w-20">
        <Bot className="h-8 w-8" />
      </div>
    </div>
  );
}

export default function AIFeaturesPage() {
  const [text, setText] = useState(
    "Write a professional summary for a Marketing Manager with 5+ years of experience.",
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
        body: JSON.stringify({ content: text, action: "improve_summary" }),
      });
      const data = await response.json();
      setResult(
        data.data?.suggestion ||
          "Experienced marketing leader driving measurable growth through customer-focused strategy, high-performing teams, and data-informed decisions.",
      );
    } catch {
      setResult(
        "Experienced marketing leader driving measurable growth through customer-focused strategy, high-performing teams, and data-informed decisions.",
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Navigation />
      <main className="home-design overflow-hidden bg-white font-sans text-[#111]">
        <section className="bg-[linear-gradient(120deg,#fff_30%,#f7f2ff_100%)]">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-14 pt-14 sm:px-8 sm:pb-20 sm:pt-20 lg:grid-cols-2 lg:gap-16">
            <div>
              <Tag>AI Powered Features</Tag>
              <h1 className="mt-5 max-w-xl text-4xl font-bold leading-[1.08] tracking-[-1px] sm:text-5xl">
                Build Smarter Resumes with the{" "}
                <span className="text-[#7755ed]">Power of AI</span>
              </h1>
              <p className="mt-5 max-w-lg text-sm leading-6 text-slate-600">
                GetEasyCV AI helps you create, improve, and optimize your resume
                with intelligent suggestions, real-time content generation, and
                ATS-friendly analysis.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/editor"
                  className="inline-flex items-center gap-2 rounded-md bg-[#111] px-5 py-3 text-[10px] font-bold text-white"
                >
                  Start Building Now <ArrowRight className="h-3 w-3" />
                </Link>
                <Link
                  href="/templates"
                  className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-5 py-3 text-[10px] font-bold"
                >
                  Explore Templates
                </Link>
              </div>
              <div className="mt-7 flex flex-wrap gap-4 text-[9px] text-slate-500">
                <span>
                  <Check className="mr-1 inline h-3 w-3 text-[#7755ed]" />
                  Trusted by 50,000+ users
                </span>
                <span>
                  <Sparkles className="mr-1 inline h-3 w-3 text-[#7755ed]" />
                  AI-Powered Content
                </span>
                <span>
                  <Check className="mr-1 inline h-3 w-3 text-[#7755ed]" />
                  ATS Friendly
                </span>
              </div>
            </div>
            <ResumeArtwork />
          </div>
        </section>
        <section className="px-5 py-12 sm:px-8 sm:py-16">
          <div className="mx-auto max-w-6xl text-center">
            <h2 className="text-2xl font-bold sm:text-3xl">
              AI-Powered Resume Features
            </h2>
            <p className="mt-2 text-[10px] text-slate-500">
              Everything you need to create a job-winning resume with AI
              assistance.
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {features.map(([title, description, Icon, color]) => (
                <article
                  className="rounded-lg border border-slate-200/70 bg-white p-4 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                  key={title}
                >
                  <div
                    className="grid h-8 w-8 place-items-center rounded-md"
                    style={{ background: color }}
                  >
                    <Icon className="h-4 w-4 text-[#7755ed]" />
                  </div>
                  <h3 className="mt-3 text-[10px] font-bold">{title}</h3>
                  <p className="mt-2 text-[8px] leading-4 text-slate-500">
                    {description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="px-5 py-10 sm:px-8">
          <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
            <div>
              <Tag>AI Writing Assistant</Tag>
              <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
                AI That Writes.
                <br />
                <span className="text-[#7755ed]">You Get Hired.</span>
              </h2>
              <p className="mt-4 max-w-md text-[10px] leading-4 text-slate-500">
                Our AI understands your background and job role to generate
                powerful, personalized resume content that makes you stand out.
              </p>
              <ul className="mt-5 space-y-3 text-[9px]">
                {[
                  "Write professional summaries",
                  "Create impactful bullet points",
                  "Highlight your achievements",
                  "Customize for any job role",
                ].map((item) => (
                  <li key={item}>
                    <Check className="mr-2 inline h-3 w-3 rounded-full bg-emerald-400 p-0.5 text-white" />
                    {item}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={improve}
                className="mt-6 inline-flex items-center gap-2 rounded-md bg-[#111] px-4 py-2.5 text-[9px] font-bold text-white"
              >
                <Wand2 className="h-3 w-3" />
                Try AI Writer Now
              </button>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-xl">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <Sparkles className="h-4 w-4 text-[#7755ed]" />
                <b className="text-[10px]">AI Content Writer</b>
              </div>
              <p className="mt-4 text-[9px] font-semibold">
                Write a professional summary for a Marketing Manager
              </p>
              <textarea
                value={text}
                onChange={(event) => setText(event.target.value)}
                className="mt-3 min-h-20 w-full resize-none rounded border border-slate-200 bg-slate-50 p-3 text-[9px] outline-none focus:border-[#7755ed]"
              />
              {result && (
                <p className="mt-3 rounded bg-[#f7f4ff] p-3 text-[9px] leading-4 text-slate-700">
                  {result}
                </p>
              )}
              <div className="mt-4 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={improve}
                  disabled={loading}
                  className="rounded border border-slate-200 px-3 py-2 text-[9px] font-semibold"
                >
                  {loading ? "Generating..." : "Regenerate"}
                </button>
                <Link
                  href="/editor"
                  className="rounded bg-[#7755ed] px-3 py-2 text-[9px] font-bold text-white"
                >
                  Use This Content
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="px-5 py-10 sm:px-8">
          <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
            <div className="order-2 mx-auto w-full max-w-[330px] rounded-lg border border-slate-200 bg-white p-6 shadow-lg lg:order-1">
              <div className="flex justify-between text-xs font-bold">
                ATS Score <Gauge className="h-3 w-3 text-[#7755ed]" />
              </div>
              <div className="mt-5 flex items-center gap-5">
                <div className="grid h-20 w-20 place-items-center rounded-full border-8 border-emerald-400 text-xl font-bold text-emerald-600">
                  92%
                </div>
                <div>
                  <b className="text-[10px] text-emerald-600">Good Match</b>
                  {["Skills", "Keywords", "Format", "Sections"].map((item) => (
                    <p className="mt-2 text-[8px] text-slate-500" key={item}>
                      {item}
                      <Check className="ml-3 inline h-3 w-3 rounded-full bg-emerald-400 p-0.5 text-white" />
                    </p>
                  ))}
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <Tag>ATS Friendly</Tag>
              <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
                ATS Analysis.{" "}
                <span className="text-[#7755ed]">Better Chances.</span>
              </h2>
              <p className="mt-4 max-w-md text-[10px] leading-4 text-slate-500">
                GetEasyCV AI scans your resume against ATS systems and provides
                actionable insights to improve your score.
              </p>
              <ul className="mt-5 space-y-3 text-[9px]">
                {[
                  "Real-time ATS score",
                  "Keyword matching insights",
                  "Section-by-section feedback",
                  "Improve and re-scan instantly",
                ].map((item) => (
                  <li key={item}>
                    <Check className="mr-2 inline h-3 w-3 rounded-full bg-emerald-400 p-0.5 text-white" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/ats-checker"
                className="mt-6 inline-flex items-center gap-2 rounded-md bg-[#111] px-4 py-2.5 text-[9px] font-bold text-white"
              >
                Check My ATS Score <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </section>
        <section className="px-5 py-12 sm:px-8">
          <div className="mx-auto max-w-6xl text-center">
            <Tag>AI Workflow</Tag>
            <h2 className="mt-3 text-2xl font-bold">
              Create Your Perfect Resume in 4 Simple Steps
            </h2>
            <p className="mt-1 text-[10px] text-slate-500">
              Our AI makes the resume building process fast, easy, and
              effective.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-4">
              {steps.map(([title, description], index) => (
                <article
                  className="relative rounded-lg border border-slate-200 px-4 pb-4 pt-8"
                  key={title}
                >
                  <span className="absolute -top-4 left-1/2 grid h-8 w-8 -translate-x-1/2 place-items-center rounded-full bg-[#7755ed] text-xs font-bold text-white">
                    {index + 1}
                  </span>
                  <h3 className="text-[10px] font-bold">{title}</h3>
                  <p className="mt-2 text-[8px] leading-4 text-slate-500">
                    {description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="mx-5 mb-8 rounded-lg bg-[#f8f6ff] px-5 py-8 sm:mx-auto sm:max-w-6xl sm:px-10">
          <div className="text-center">
            <Tag>Why GetEasyCV AI?</Tag>
            <h2 className="mt-3 text-2xl font-bold">
              Benefits That Help You Get Ahead
            </h2>
          </div>
          <div className="mt-7 grid gap-5 sm:grid-cols-3 lg:grid-cols-5">
            {benefits.map(([title, description, Icon]) => (
              <div className="text-center" key={title}>
                <Icon className="mx-auto h-5 w-5 text-[#7755ed]" />
                <h3 className="mt-2 text-[9px] font-bold">{title}</h3>
                <p className="mt-1 text-[8px] leading-3 text-slate-500">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </section>
        <section className="mx-5 mb-10 rounded-lg bg-[#c2b4ff] px-5 py-8 sm:mx-auto sm:max-w-5xl sm:px-12">
          <div className="flex flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left">
            <div>
              <h2 className="text-xl font-bold">
                Ready to Build Your AI-Powered Resume?
              </h2>
              <p className="mt-1 text-[10px]">
                Join thousands of job seekers who built their dream careers with
                GetEasyCV AI.
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/editor"
                className="inline-flex items-center gap-2 rounded-md bg-[#111] px-4 py-2.5 text-[9px] font-bold text-white"
              >
                Create My Resume Now <ArrowRight className="h-3 w-3" />
              </Link>
              <Link
                href="/templates"
                className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2.5 text-[9px] font-bold"
              >
                Explore Templates <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
