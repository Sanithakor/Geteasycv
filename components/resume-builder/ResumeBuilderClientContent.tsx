'use client';

import React from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import InnerBanner from '@/components/InnerBanner';
import ReadyToBuild from '@/components/sections/ReadyToBuild';
import FAQ from '@/components/FAQ';
import {
  Sparkles,
  ShieldCheck,
  Download,
  ArrowRight,
  CheckCircle2,
  XCircle,
  FileText,
  Layers,
  Zap,
  Check,
  Scale,
} from 'lucide-react';

const RESUME_STEPS = [
  {
    step: '01',
    title: 'Select a Recruiter-Tested Template',
    desc: 'Choose from 150+ ATS-verified designs designed for executive, technical, and creative disciplines.',
    tag: 'Step 1 • Design',
    icon: Layers,
    color: '#BAC7FE',
  },
  {
    step: '02',
    title: 'Supercharge Bullets with AI',
    desc: 'Turn passive responsibilities into quantified accomplishments with action verbs and performance metrics.',
    tag: 'Step 2 • Content',
    icon: Sparkles,
    color: '#F5D17B',
  },
  {
    step: '03',
    title: 'Run Instant ATS Audit',
    desc: 'Verify formatting hygiene, header hierarchy, and keyword density against your target job specification.',
    tag: 'Step 3 • Validation',
    icon: ShieldCheck,
    color: '#58C09D',
  },
  {
    step: '04',
    title: 'Download Sharp Vector PDF',
    desc: 'Export pristine, selectable text PDFs or native Microsoft Word .docx files ready for immediate job application.',
    tag: 'Step 4 • Export',
    icon: Download,
    color: '#FEE1CF',
  },
];

const COMPARISON_ROWS = [
  {
    feature: 'ATS Parse Guarantee',
    getEasyCv: '100% Tested on Workday & Greenhouse',
    competitors: 'Often fails due to complex tables & canvas blocks',
    status: true,
  },
  {
    feature: 'Export Fidelity',
    getEasyCv: 'True Vector PDF with selectable text & DOI links',
    competitors: 'Flattened low-res bitmap or broken CSS layouts',
    status: true,
  },
  {
    feature: 'Pricing Transparency',
    getEasyCv: 'Clear pay-as-you-go & flexible plans. No surprise auto-renewals',
    competitors: 'Hidden 14-day trials that silently bill $29.95/month',
    status: true,
  },
  {
    feature: 'AI Bullet Optimizer',
    getEasyCv: 'Extracts metrics, numbers, and verified action verbs',
    competitors: 'Generic ChatGPT filler text with no industry calibration',
    status: true,
  },
  {
    feature: 'Multi-Page Flow',
    getEasyCv: 'Deterministic pagination without awkward mid-sentence page cuts',
    competitors: 'Manually adjust margins for hours to fix orphan lines',
    status: true,
  },
];

const POPULAR_TEMPLATES = [
  {
    id: 'modern',
    name: 'The Modern Executive',
    badge: 'Most Popular',
    category: 'Corporate & Strategy',
    desc: 'Clean dual-column hierarchy highlighting leadership stewardship and enterprise revenue impact.',
    accent: '#0F0F0F',
    bg: '#F8F8F6',
  },
  {
    id: 'tech',
    name: 'Silicon Valley Minimal',
    badge: 'Tech & Engineering',
    category: 'Software Engineering',
    desc: 'Dense, ATS-optimized layout giving prominence to technical stacks, GitHub repos, and system scale.',
    accent: '#0F0F0F',
    bg: '#FFFFFF',
  },
  {
    id: 'academic',
    name: 'Harvard Scholar',
    badge: 'Academia & Law',
    category: 'Higher Education',
    desc: 'Traditional single-column serif formatting ideal for publications, grants, legal briefs, and dissertations.',
    accent: '#0F0F0F',
    bg: '#F8F8F6',
  },
];

const RESUME_FAQS = [
  {
    question: 'How does GetEasyCV guarantee ATS compatibility?',
    answer:
      'Our resume engine produces clean, standard semantic documents with no nested tables, unreadable graphics, or overlapping text boxes. Each export is verified against the parsing algorithms of major Applicant Tracking Systems including Workday, Greenhouse, Lever, and Taleo.',
  },
  {
    question: 'Is it completely free to build and test my resume?',
    answer:
      'Yes. You can choose any template, input your full career history, use our AI bullet assistant, and preview your ATS compatibility score with zero upfront payment.',
  },
  {
    question: 'Can I download my resume as a PDF and Word document?',
    answer:
      'Yes. You can export your resume as a pristine Vector PDF (which preserves exact typography and crisp vector geometry) or as a native Microsoft Word (.docx) file for further editing.',
  },
  {
    question: 'Will I be trapped in a surprise monthly recurring subscription?',
    answer:
      'Never. Unlike legacy resume sites that trick candidates with $2.95 trial traps that renew at $30/month, GetEasyCV has transparent, honest pricing with flexible one-time passes and cancel-anytime plans.',
  },
  {
    question: 'How does the AI Bullet Optimizer help my application?',
    answer:
      'Our AI analyzes your raw job responsibilities and automatically rewrites them into quantified achievement statements using the XYZ formula (Accomplished [X], as measured by [Y], by doing [Z]).',
  },
];

export default function ResumeBuilderClientContent() {
  return (
    <>
      <Navigation />

      <main className="min-h-screen bg-[#F8F8F6] font-sans">
        {/* Hero Section */}
        <InnerBanner
          badge="Recruiter-Approved Resume Builder"
          badgeIcon={Sparkles}
          variant="split"
          breadcrumbs={[{ label: 'Resume Builder', href: '/resume-builder' }]}
          title="Build an ATS-Friendly Resume That"
          highlightText="Recruiters Notice"
          titleSuffix="in Minutes"
          description="Engineered to pass modern Applicant Tracking Systems (Workday, Greenhouse, Lever). Pick an executive template, generate impactful bullets with AI, and download true vector PDFs without paywall traps."
          primaryAction={{
            label: 'Start Building Free',
            href: '/editor',
          }}
          secondaryAction={{
            label: 'Browse 150+ Templates',
            href: '/templates',
          }}
          features={[
            '100% Vector PDF Fidelity',
            'Workday & Greenhouse Tested',
            'No Surprise Subscription Traps',
          ]}
        />

        {/* Impact Metrics Bar */}
        <section className="bg-white border-y border-slate-200/80 py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center sm:text-left">
              {[
                { metric: '40,000+', label: 'Resumes Created', desc: 'Across 120+ countries' },
                { metric: '98.6%', label: 'ATS Parse Pass Rate', desc: 'Tested on Top 5 HR parsers' },
                { metric: '3.2x', label: 'More Interview Calls', desc: 'Reported by active job seekers' },
                { metric: '10 Mins', label: 'Average Build Time', desc: 'From blank page to PDF' },
              ].map((stat) => (
                <div key={stat.label} className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#0F0F0F] tracking-tight">
                    {stat.metric}
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-[#0F0F0F] mt-1">
                    {stat.label}
                  </div>
                  <div className="text-[11px] text-[#666666]">
                    {stat.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4-Step Interactive Workflow */}
        <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border shadow-2xs mb-4"
              style={{ borderColor: 'rgba(15,15,15,0.10)' }}>
              <Zap className="w-3.5 h-3.5" style={{ color: '#F3645C' }} />
              <span className="text-xs font-bold uppercase tracking-wider text-[#0F0F0F]">
                Simple 4-Step Process
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0F0F0F] leading-tight mb-4">
              How GetEasyCV Delivers{' '}
              <span style={{ color: '#F3645C' }}>Interview-Ready Resumes</span>
            </h2>
            <p className="text-sm sm:text-base text-[#333333] leading-relaxed">
              We took the guesswork out of formatting, section hierarchy, and keyword optimization.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {RESUME_STEPS.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.step}
                  className="bg-white rounded-2xl p-6 border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                  style={{ borderColor: 'rgba(15,15,15,0.08)' }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center border border-black/5 shadow-2xs"
                        style={{ background: step.color }}
                      >
                        <Icon className="w-5 h-5 text-[#0F0F0F]" />
                      </div>
                      <span className="text-xs font-mono font-bold text-slate-400">
                        {step.step}
                      </span>
                    </div>

                    <span className="text-[11px] font-bold text-[#F3645C] uppercase tracking-wider block mb-1">
                      {step.tag}
                    </span>

                    <h3 className="text-base sm:text-lg font-bold text-[#0F0F0F] leading-snug mb-2">
                      {step.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#666666] leading-relaxed font-normal">
                      {step.desc}
                    </p>
                  </div>

                  <div className="pt-6 mt-4 border-t border-slate-100 flex items-center text-xs font-semibold text-[#0F0F0F]">
                    <span>Standardized Protocol</span>
                    <CheckCircle2 className="w-4 h-4 ml-auto text-emerald-600" />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Honest Comparison: GetEasyCV vs Traditional Builders */}
        <section className="py-16 bg-white border-y border-slate-200/80">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 text-[#0F0F0F] text-xs font-bold uppercase tracking-wider mb-3">
                <Scale className="w-3.5 h-3.5" style={{ color: '#F3645C' }} />
                <span>Honest Architecture Comparison</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F0F0F]">
                Why Job Seekers Are Leaving Legacy Builders
              </h2>
              <p className="text-xs sm:text-sm text-[#666666] mt-2">
                We fixed the dirty secrets of the online resume industry: hidden renewals and broken layouts.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-12 bg-slate-900 text-white text-xs font-bold uppercase tracking-wider p-4">
                <div className="md:col-span-4">Capability & Standard</div>
                <div className="md:col-span-4 flex items-center gap-2 text-[#F5D17B]">
                  <Sparkles className="w-4 h-4" /> GetEasyCV Platform
                </div>
                <div className="md:col-span-4 text-slate-400">Legacy Builders & Canvas Sites</div>
              </div>

              <div className="divide-y divide-slate-100 bg-white">
                {COMPARISON_ROWS.map((row, idx) => (
                  <div key={idx} className="grid grid-cols-1 md:grid-cols-12 p-4 sm:p-5 gap-3 text-xs sm:text-sm">
                    <div className="md:col-span-4 font-bold text-[#0F0F0F] flex items-center">
                      {row.feature}
                    </div>
                    <div className="md:col-span-4 text-[#0F0F0F] font-semibold flex items-start gap-2 bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-100">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{row.getEasyCv}</span>
                    </div>
                    <div className="md:col-span-4 text-[#666666] flex items-start gap-2 p-2.5 rounded-xl">
                      <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      <span>{row.competitors}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Popular Templates Showcase */}
        <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-bold uppercase tracking-wider mb-2">
                <FileText className="w-3.5 h-3.5" style={{ color: '#F3645C' }} />
                <span>Recruiter-Tested Designs</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F0F0F]">
                Pick a Layout Tailored to Your Industry
              </h2>
            </div>
            <Link
              href="/templates"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0F0F0F] hover:text-[#F3645C] transition-colors"
            >
              <span>Explore All 150+ Templates</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {POPULAR_TEMPLATES.map((tpl) => (
              <div
                key={tpl.id}
                className="bg-white rounded-2xl p-6 border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between text-left"
                style={{ borderColor: 'rgba(15,15,15,0.08)' }}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-800">
                      {tpl.badge}
                    </span>
                    <span className="text-xs text-[#666666] font-medium">
                      {tpl.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#0F0F0F] mb-2">
                    {tpl.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#666666] leading-relaxed mb-6">
                    {tpl.desc}
                  </p>

                  <div className="rounded-xl border border-dashed border-slate-200 p-4 bg-slate-50/50 mb-6 space-y-2">
                    <div className="h-3 bg-slate-200 rounded w-1/3" />
                    <div className="h-2 bg-slate-200 rounded w-4/5" />
                    <div className="h-2 bg-slate-100 rounded w-full" />
                    <div className="h-2 bg-slate-100 rounded w-2/3" />
                  </div>
                </div>

                <Link
                  href={`/editor?template=${tpl.id}`}
                  className="w-full text-center py-3 rounded-xl bg-[#0F0F0F] text-white hover:bg-black font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <Sparkles className="w-4 h-4 text-[#F5D17B]" />
                  <span>Use This Template</span>
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* FAQs */}
        <FAQ
          items={RESUME_FAQS}
          badge="Frequently Asked Questions"
          title="Everything You Need to Know About"
          highlightText="GetEasyCV"
          subtitle="Clear answers about our formatting, ATS compatibility, PDF fidelity, and straightforward pricing."
          bgStyle="#FFFFFF"
        />

        {/* Ready to Build Section */}
        <ReadyToBuild
          title="Ready to Build Your Recruiter-Ready Resume?"
          subtitle="Join over 40,000 candidates who passed ATS filters and secured interviews at leading global employers."
          buttonText="Start Building Free"
          buttonHref="/editor"
        />
      </main>

      <Footer />
    </>
  );
}
