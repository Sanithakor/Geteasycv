import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { LayoutTemplate, Edit3, Sparkles, Download, ArrowRight, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'How It Works — GetEasyCV',
  description: 'Build a professional, ATS-ready resume in 4 simple steps with GetEasyCV.',
};

const STEPS = [
  {
    number: '01',
    icon: LayoutTemplate,
    color: 'bg-violet-50 text-violet-600 border-violet-100',
    accent: 'bg-violet-600',
    title: 'Choose a Template',
    description:
      'Browse 200+ professionally designed templates. Filter by industry, style, or ATS compatibility. Each template is live-rendered — what you see is exactly what you get.',
    details: [
      'Single-column, two-column, sidebar, and more layouts',
      '10 colour themes per layout — 200+ total combinations',
      'ATS-friendly badge shows which templates pass automated screening',
      'Free and premium options — free tier unlocks most designs',
    ],
  },
  {
    number: '02',
    icon: Edit3,
    color: 'bg-teal-50 text-teal-600 border-teal-100',
    accent: 'bg-teal-600',
    title: 'Fill In Your Details',
    description:
      'Edit every section directly in the live editor. See your changes reflected instantly in the preview on the right. Reorder sections, toggle visibility, and customise colours and fonts.',
    details: [
      'Sections: Personal, Summary, Experience, Education, Skills, Projects, Certifications, Languages',
      'Drag sections to reorder them — layout updates live',
      'Auto-save every 30 seconds — never lose your work',
      'Undo/redo for all changes',
    ],
  },
  {
    number: '03',
    icon: Sparkles,
    color: 'bg-amber-50 text-amber-600 border-amber-100',
    accent: 'bg-amber-500',
    title: 'Optimise with AI',
    description:
      'Click the AI button under any text field to get an instant, context-aware improvement suggestion. The AI matches the tone of your selected template and the role you\'re targeting.',
    details: [
      'Field-level rewrites — only the field you clicked, nothing else',
      'Review the before/after comparison before accepting',
      'Edit the suggestion before applying it',
      'Free plan includes 10 AI assists per month',
    ],
  },
  {
    number: '04',
    icon: Download,
    color: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    accent: 'bg-emerald-600',
    title: 'Export & Apply',
    description:
      'Download your resume as a high-quality PDF in one click. Your resume is formatted at true A4 print size with perfect typography — ready to attach to any job application.',
    details: [
      'PDF export — ATS-compatible, print-ready',
      'PNG and JPG export for portfolios and social profiles',
      'Resumes saved to your account — access from any device',
      'Share a public link or keep it private',
    ],
  },
];

const FAQS = [
  { q: 'Do I need to create an account?', a: 'You can start building immediately without an account. Create one to save your resumes and access them later.' },
  { q: 'Is it really free?', a: 'Yes — the free plan gives you access to most templates, all sections, PDF export, and 10 AI assists per month. No credit card needed.' },
  { q: 'Will my resume pass ATS scanners?', a: 'Templates marked as ATS-friendly use single-column layouts, standard fonts, and no tables or graphics that confuse parsers. We recommend these for corporate roles.' },
  { q: 'Can I switch templates without losing my content?', a: 'Yes. Your content is stored separately from the template design. Switching templates loads your existing content into the new layout immediately.' },
];

export default function HowItWorksPage() {
  return (
    <>
      <Navigation />
      <main>
        {/* Hero */}
        <section className="bg-white border-b border-slate-100 py-16 px-4">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-violet-50 text-violet-700 border border-violet-200">
              <Sparkles className="w-3.5 h-3.5" /> Simple process
            </span>
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight text-balance">
              From blank page to hired in 4 steps
            </h1>
            <p className="text-base text-slate-500 max-w-xl mx-auto">
              GetEasyCV makes building a professional, ATS-ready resume fast and straightforward — no design skills needed.
            </p>
            <Link
              href="/templates"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-sm transition-all shadow-sm"
            >
              Start for free <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Steps */}
        <section className="max-w-4xl mx-auto px-4 py-16 space-y-10">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            const isEven = i % 2 === 1;
            return (
              <div
                key={step.number}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${isEven ? 'lg:flex-row-reverse' : ''}`}
              >
                {/* Text */}
                <div className={`space-y-4 ${isEven ? 'lg:order-2' : ''}`}>
                  <div className="flex items-center gap-3">
                    <span className="text-5xl font-black text-slate-100 leading-none">{step.number}</span>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${step.color}`}>
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                  </div>
                  <h2 className="text-2xl font-black text-slate-900">{step.title}</h2>
                  <p className="text-slate-600 leading-relaxed">{step.description}</p>
                  <ul className="space-y-2">
                    {step.details.map((d) => (
                      <li key={d} className="flex items-start gap-2 text-sm text-slate-600">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" aria-hidden="true" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Visual placeholder */}
                <div className={`rounded-2xl border border-slate-200 bg-slate-50 h-52 flex items-center justify-center ${isEven ? 'lg:order-1' : ''}`}>
                  <div className={`w-16 h-16 rounded-2xl ${step.accent} text-white flex items-center justify-center shadow-md`}>
                    <Icon className="w-8 h-8" aria-hidden="true" />
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        {/* FAQ */}
        <section className="bg-slate-50 border-t border-slate-100 py-14 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-black text-slate-900 text-center mb-8">Common questions</h2>
            <div className="space-y-4">
              {FAQS.map(({ q, a }) => (
                <div key={q} className="bg-white border border-slate-200 rounded-2xl p-5">
                  <h3 className="text-sm font-bold text-slate-900 mb-1.5">{q}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-sm text-slate-500 mt-8">
              More questions?{' '}
              <Link href="/faq" className="text-violet-600 font-semibold hover:underline">Browse the full FAQ</Link>
              {' '}or{' '}
              <Link href="/contact" className="text-violet-600 font-semibold hover:underline">contact us</Link>.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="py-14 px-4 bg-white border-t border-slate-100">
          <div className="max-w-2xl mx-auto text-center space-y-5">
            <h2 className="text-2xl font-black text-slate-900">Ready to build your resume?</h2>
            <p className="text-slate-500 text-sm">Free to start, no credit card required.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/templates"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-sm shadow-sm transition-all"
              >
                Browse Templates <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-sm transition-all"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
