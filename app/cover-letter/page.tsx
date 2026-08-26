import React from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowRight, Check, Download, FileText, Sparkles } from "lucide-react";

const templates = [
  { name: "Modern Minimal", type: "Clean & Professional", accent: "#b9d4df" },
  {
    name: "Classic Professional",
    type: "Traditional Layout",
    accent: "#dae5e8",
  },
  {
    name: "Creative Edge",
    type: "Bold & Modern",
    accent: "#7a63f5",
    active: true,
  },
  { name: "Executive Premium", type: "Elegant & Polished", accent: "#d9c4ad" },
  { name: "Minimal Chic", type: "Simple & Elegant", accent: "#b8d9d0" },
  { name: "Modern Corporate", type: "Corporate & Clean", accent: "#d9c5eb" },
];

const features = [
  [
    "AI Writing Assistant",
    "Generate personalized cover letters in seconds.",
    "#eadbff",
  ],
  [
    "Job-Specific Content",
    "Tailor content to the job role and company.",
    "#d9f2e5",
  ],
  [
    "Smart Suggestions",
    "Get AI suggestions to improve clarity and impact.",
    "#ffe6cb",
  ],
  [
    "Tone Customization",
    "Choose the tone that fits your personality and role.",
    "#ffd9e9",
  ],
  ["ATS-Friendly", "Formatted to pass ATS and impress recruiters.", "#dce7ff"],
  ["Grammar Check", "Ensure error-free and polished cover letters.", "#e6dbff"],
];

const steps = [
  "Add Your Details",
  "AI Generates Content",
  "Review & Edit",
  "Download & Apply",
];

function DocumentPreview() {
  return (
    <div className="relative mx-auto w-full max-w-[450px] rounded-xl border border-slate-200 bg-white p-5 text-[8px] text-slate-500 shadow-[0_18px_45px_rgba(42,27,92,0.12)] sm:p-7 sm:text-[9px]">
      <div className="absolute -right-4 -top-5 grid h-14 w-14 place-items-center rounded-full bg-[#7755ed] text-xl font-bold text-white shadow-lg sm:-right-7 sm:h-16 sm:w-16 sm:text-2xl">
        AI
      </div>
      <div className="mb-5 flex gap-1.5">
        <i className="h-2 w-2 rounded-full bg-[#ff6b6b]" />
        <i className="h-2 w-2 rounded-full bg-[#ffc85c]" />
        <i className="h-2 w-2 rounded-full bg-[#58c09d]" />
      </div>
      <div className="grid grid-cols-[105px_1fr] gap-4 sm:grid-cols-[125px_1fr] sm:gap-6">
        <div className="space-y-3 border-r border-slate-100 pr-3">
          <div>
            <b className="block text-[10px] text-slate-800 sm:text-[11px]">
              Elizabeth Taylor
            </b>
            <span>Marketing Manager</span>
          </div>
          <b className="block rounded bg-slate-50 px-2 py-2 text-[8px] text-slate-700">
            ◉ Your Details
          </b>
          {["Job Title", "Company", "Job Description", "Tone of Letter"].map(
            (item) => (
              <span className="block px-2" key={item}>
                ◌ {item}
              </span>
            ),
          )}
          <button className="mt-4 w-full rounded bg-[#7755ed] px-1 py-2 text-[7px] font-bold text-white">
            Generate Cover Letter
          </button>
        </div>
        <div className="space-y-3 pt-1 font-serif leading-relaxed">
          <p>Dear Hiring Manager,</p>
          <p>
            I am writing to express my interest in the Marketing Manager
            position at your company. With over 5 years of experience in digital
            marketing, brand strategy, and team leadership, I am confident I can
            make a meaningful impact.
          </p>
          <p>In my current role, I have successfully...</p>
          {[1, 2, 3, 4].map((item) => (
            <div className="h-1 rounded bg-slate-100" key={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

function TemplateCard({ template }: { template: (typeof templates)[number] }) {
  return (
    <div
      className={`min-w-[132px] flex-1 ${template.active ? "" : "opacity-90"}`}
    >
      <div
        className={`h-36 rounded-md border bg-white p-2 shadow-sm ${template.active ? "border-[#7755ed] ring-2 ring-[#7755ed]/20" : "border-slate-200"}`}
      >
        <div
          className="h-4 w-1/2 border-b-2"
          style={{ borderColor: template.accent }}
        />
        <div className="mt-2 grid grid-cols-[28px_1fr] gap-2">
          <div
            className="h-24"
            style={{ background: `${template.accent}55` }}
          />
          <div className="space-y-1.5 pt-1">
            {[1, 2, 3, 4, 5, 6].map((line) => (
              <div className="h-1 rounded bg-slate-200" key={line} />
            ))}
          </div>
        </div>
      </div>
      <p className="mt-2 text-[9px] font-bold text-slate-800">
        {template.name}
      </p>
      <p className="text-[8px] text-slate-500">{template.type}</p>
      <div className="mt-1 flex gap-1">
        <i className="h-2 w-2 rounded-full bg-[#7755ed]" />
        <i className="h-2 w-2 rounded-full bg-[#c8d5e1]" />
        <i className="h-2 w-2 rounded-full bg-[#b9d9cb]" />
      </div>
    </div>
  );
}

export default function CoverLetterPage() {
  return (
    <>
      <Navigation />
      <main className="home-design overflow-hidden bg-white font-sans text-[#111]">
        <section className="bg-[linear-gradient(110deg,#fff_40%,#f7f4ff_100%)]">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-16 pt-16 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:pb-20 lg:pt-24">
            <div>
              <span className="inline-flex rounded-full bg-[#f2edff] px-3 py-1 text-[9px] font-bold uppercase text-[#7755ed]">
                AI Cover Letter Builder
              </span>
              <h1 className="mt-5 max-w-xl text-4xl font-bold leading-[1.08] tracking-[-1px] sm:text-5xl">
                Create a Professional{" "}
                <span className="text-[#7755ed]">Cover Letter</span> in Minutes
              </h1>
              <p className="mt-5 max-w-lg text-sm leading-6 text-slate-600">
                GetEasyCV AI helps you write personalized, job-winning cover
                letters that highlight your strengths and get you noticed.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/cover-letter/editor"
                  className="inline-flex items-center gap-2 rounded-md bg-[#111] px-5 py-3 text-[10px] font-bold text-white"
                >
                  Create Cover Letter Now <ArrowRight className="h-3 w-3" />
                </Link>
                <Link
                  href="/templates"
                  className="inline-flex items-center gap-2 rounded-md border border-slate-200 px-5 py-3 text-[10px] font-bold text-slate-800"
                >
                  Explore Templates
                </Link>
              </div>
              <div className="mt-7 flex flex-wrap gap-4 text-[9px] text-slate-500">
                <span>
                  <Check className="mr-1 inline h-3 w-3 text-[#7755ed]" />
                  AI-Powered Writing
                </span>
                <span>
                  <Check className="mr-1 inline h-3 w-3 text-[#7755ed]" />
                  Professionally Designed
                </span>
                <span>
                  <Check className="mr-1 inline h-3 w-3 text-[#7755ed]" />
                  ATS Friendly
                </span>
              </div>
            </div>
            <div className="px-5 sm:px-10">
              <DocumentPreview />
            </div>
          </div>
        </section>
        <section className="px-5 py-12 sm:px-8 sm:py-16">
          <div className="mx-auto max-w-6xl text-center">
            <span className="rounded-full bg-[#f2edff] px-3 py-1 text-[8px] font-bold uppercase text-[#7755ed]">
              Professionally Designed
            </span>
            <h2 className="mt-3 text-2xl font-bold">
              Choose from Beautiful Cover Letter Templates
            </h2>
            <p className="mt-1 text-[10px] text-slate-500">
              Pick a template that fits your style and makes a lasting
              impression.
            </p>
            <div className="mt-7 flex gap-5 overflow-hidden">
              {templates.map((template) => (
                <TemplateCard key={template.name} template={template} />
              ))}
            </div>
            <Link
              href="/templates"
              className="mt-7 inline-flex items-center gap-2 rounded-md border border-slate-200 px-5 py-2.5 text-[9px] font-bold"
            >
              View All Templates <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </section>
        <section className="bg-[#fff0e9] px-5 py-12 sm:px-8 sm:py-14">
          <div className="mx-auto max-w-6xl text-center">
            <span className="rounded-full bg-white px-3 py-1 text-[8px] font-bold uppercase text-[#7755ed]">
              Powered by AI
            </span>
            <h2 className="mt-3 text-2xl font-bold">
              AI-Powered Cover Letters That Gets You Noticed
            </h2>
            <p className="mx-auto mt-2 max-w-md text-[10px] leading-4 text-slate-600">
              Our AI understands your profile and the job description to create
              a personalized cover letter that makes an impact.
            </p>
            <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {features.map(([title, description, color]) => (
                <div className="rounded-lg bg-white px-3 py-4" key={title}>
                  <div
                    className="mx-auto grid h-8 w-8 place-items-center rounded-md"
                    style={{ background: color }}
                  >
                    <Sparkles className="h-4 w-4 text-[#7755ed]" />
                  </div>
                  <h3 className="mt-3 text-[9px] font-bold">{title}</h3>
                  <p className="mt-1 text-[8px] leading-3 text-slate-500">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="px-5 py-12 sm:px-8 sm:py-14">
          <div className="mx-auto max-w-6xl text-center">
            <span className="rounded-full bg-[#f2edff] px-3 py-1 text-[8px] font-bold uppercase text-[#7755ed]">
              How It Works
            </span>
            <h2 className="mt-3 text-2xl font-bold">
              Create Your Cover Letter in 4 Simple Steps
            </h2>
            <p className="mt-1 text-[10px] text-slate-500">
              Fast, easy, and effective - let AI do the heavy lifting.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-4">
              {steps.map((step, index) => (
                <div
                  className="relative rounded-lg border border-slate-200 px-4 pb-4 pt-8"
                  key={step}
                >
                  <div
                    className="absolute -top-4 left-1/2 grid h-8 w-8 -translate-x-1/2 place-items-center rounded-full text-xs font-bold text-white"
                    style={{
                      background: ["#7755ed", "#58b98f", "#f5a623", "#e84d91"][
                        index
                      ],
                    }}
                  >
                    {index + 1}
                  </div>
                  <h3 className="text-[10px] font-bold">{step}</h3>
                  <p className="mt-1 text-[8px] text-slate-500">
                    {
                      [
                        "Enter your information and the job you're applying for.",
                        "Our AI writes a personalized cover letter for you.",
                        "Review and make any edits you want.",
                        "Download in multiple formats and apply with confidence.",
                      ][index]
                    }
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="px-5 pb-16 sm:px-8">
          <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1fr_1.4fr_1fr]">
            <div>
              <span className="rounded-full bg-[#f2edff] px-3 py-1 text-[8px] font-bold uppercase text-[#7755ed]">
                Live Preview
              </span>
              <h2 className="mt-4 text-2xl font-bold">
                Beautiful Design.
                <br />
                <span className="text-[#7755ed]">Powerful Impact.</span>
              </h2>
              <p className="mt-4 text-[10px] leading-4 text-slate-500">
                Our cover letter templates are designed to make you stand out
                while keeping it professional.
              </p>
              <ul className="mt-5 space-y-3 text-[9px] font-medium">
                {[
                  "Professional layouts",
                  "Fully customizable",
                  "Print and digital ready",
                  "Export in PDF, DOCX & more",
                ].map((item) => (
                  <li key={item}>
                    <Check className="mr-2 inline h-3 w-3 rounded-full bg-[#58b98f] p-0.5 text-white" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/editor"
                className="mt-6 inline-flex rounded-md bg-[#111] px-4 py-2.5 text-[9px] font-bold text-white"
              >
                Create Cover Letter Now <ArrowRight className="ml-2 h-3 w-3" />
              </Link>
            </div>
            <div className="relative mx-auto w-full max-w-[360px] rounded-lg border border-slate-200 bg-white p-5 shadow-[0_12px_35px_rgba(0,0,0,0.08)]">
              <div className="border-b border-slate-200 pb-3">
                <b className="text-sm">James Anderson</b>
                <p className="text-[8px] text-slate-500">Product Manager</p>
              </div>
              <div className="mt-4 space-y-2 text-[8px] leading-3 text-slate-500">
                <p>May 20, 2024</p>
                <p>
                  Hiring Manager
                  <br />
                  Tech Solutions Inc.
                  <br />
                  123 Business Street
                  <br />
                  New York, NY 10001
                </p>
                <p>Dear Hiring Manager,</p>
                <p>
                  I am excited to apply for the Product Manager position at Tech
                  Solutions Inc. With over 6 years of experience in product
                  development, strategy, and cross-functional leadership...
                </p>
                <p>
                  I would love the opportunity to bring my skills and experience
                  to your team.
                </p>
                <p>Thank you for your time and consideration.</p>
                <p className="font-serif italic text-slate-800">
                  James Anderson
                </p>
              </div>
              <div className="absolute -right-9 top-20 hidden w-16 space-y-3 rounded-lg bg-white p-3 text-center text-[7px] shadow-lg sm:block">
                <FileText className="mx-auto h-4 w-4 text-[#7755ed]" />
                <span className="block">Edit Content</span>
                <Download className="mx-auto h-4 w-4 text-slate-500" />
                <span className="block">Download</span>
              </div>
            </div>
            <div>
              <span className="rounded-full bg-[#f2edff] px-3 py-1 text-[8px] font-bold uppercase text-[#7755ed]">
                Why It Matters
              </span>
              <h2 className="mt-4 text-2xl font-bold">
                A Great Cover Letter
                <br />
                <span className="text-[#7755ed]">Opens Doors</span>
              </h2>
              <p className="mt-4 text-[10px] leading-4 text-slate-500">
                A strong cover letter can increase your chances of getting an
                interview.
              </p>
              <ul className="mt-5 space-y-4 text-[9px]">
                <li>
                  <b className="block">Make a Strong First Impression</b>
                  <span className="text-slate-500">
                    Showcase your professionalism and passion.
                  </span>
                </li>
                <li>
                  <b className="block">Highlight Your Value</b>
                  <span className="text-slate-500">
                    Explain why you're the perfect fit.
                  </span>
                </li>
                <li>
                  <b className="block">Stand Out from Others</b>
                  <span className="text-slate-500">
                    Personalized content that grabs attention.
                  </span>
                </li>
                <li>
                  <b className="block">Boost Interview Chances</b>
                  <span className="text-slate-500">
                    Increase your odds of landing the job.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>
        <section className="mx-5 mb-8 rounded-lg bg-[#c2b4ff] px-5 py-7 sm:mx-auto sm:max-w-5xl sm:px-12">
          <div className="flex flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left">
            <div>
              <h2 className="text-xl font-bold">
                Ready to Create Your Winning Cover Letter?
              </h2>
              <p className="mt-1 text-[10px]">
                Join thousands of job seekers who are getting hired faster with
                GetEasyCV AI.
              </p>
            </div>
            <div className="flex shrink-0 gap-3">
              <Link
                href="/editor"
                className="inline-flex items-center rounded-md bg-[#111] px-4 py-2.5 text-[9px] font-bold text-white"
              >
                Create Cover Letter Now <ArrowRight className="ml-2 h-3 w-3" />
              </Link>
              <Link
                href="/templates"
                className="inline-flex items-center rounded-md bg-white px-4 py-2.5 text-[9px] font-bold"
              >
                Explore Templates <ArrowRight className="ml-2 h-3 w-3" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
