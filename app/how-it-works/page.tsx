import React from 'react';
import Navigation from '@/components/Navigation';
import InnerBanner from '@/components/InnerBanner';
import ReadyToBuild from '@/components/sections/ReadyToBuild';
import FAQ from '@/components/FAQ';
import { HOW_IT_WORKS_FAQS } from '@/data/faqs';
import Footer from '@/components/Footer';
import { LayoutTemplate, Edit3, Sparkles, Download, Check } from 'lucide-react';

export const metadata = {
  title: 'How It Works — GetEasyCV',
  description: 'Build a professional, ATS-ready resume in 4 simple steps with GetEasyCV.',
};

const STEPS = [
  {
    number: '01',
    icon: LayoutTemplate,
    accent: '#BAC7FE',
    title: 'Choose a Template',
    description:
      'Browse 150+ professionally designed templates. Filter by industry, style, or ATS compatibility. Each template is live-rendered — what you see is exactly what you get.',
    details: [
      'Single-column, two-column, sidebar, and executive layouts',
      '10 color themes per layout — 150+ total combinations',
      'ATS-friendly badge shows which templates pass automated screening',
      'Free and premium options — free tier unlocks most designs',
    ],
  },
  {
    number: '02',
    icon: Edit3,
    accent: '#F5D17B',
    title: 'Fill In Your Details',
    description:
      'Edit every section directly in the live editor. See your changes reflected instantly in the preview on the right. Reorder sections, toggle visibility, and customize colors and fonts.',
    details: [
      'Sections: Personal, Summary, Experience, Education, Skills, Projects, Certifications',
      'Drag sections to reorder them — layout updates live',
      'Auto-save every 30 seconds — never lose your work',
      'Undo/redo for all changes in real-time',
    ],
  },
  {
    number: '03',
    icon: Sparkles,
    accent: '#D0B9EF',
    title: 'Optimise with AI',
    description:
      'Click the AI button under any text field to get an instant, context-aware improvement suggestion. The AI matches the tone of your selected template and the role you\'re targeting.',
    details: [
      'Field-level rewrites — only the field you clicked, nothing else',
      'Review the before/after comparison before accepting',
      'Edit the suggestion before applying it to your resume',
      'Free plan includes AI assists every month',
    ],
  },
  {
    number: '04',
    icon: Download,
    accent: '#58C09D',
    title: 'Export & Apply',
    description:
      'Download your resume as a high-quality PDF in one click. Your resume is formatted at true A4 print size with perfect typography — ready to attach to any job application.',
    details: [
      'PDF export — ATS-compatible, print-ready output',
      'DOCX export for editable flexibility and Word compatibility',
      'Resumes saved securely to your account — access from any device',
      'Share a public link or keep your document private',
    ],
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <Navigation />
      <main className="font-sans min-h-screen bg-white">
        <InnerBanner
          badge="Simple 4-Step Process"
          badgeIcon={Sparkles}
          pageType="how-it-works"
          breadcrumbs={[{ label: "How It Works", href: "/how-it-works" }]}
          title="From Blank Page to"
          highlightText="Hired in Minutes"
          description="GetEasyCV makes building a professional, ATS-ready resume fast and straightforward — no design skills needed."
          primaryAction={{
            label: "Start Building Free",
            href: "/templates",
          }}
          secondaryAction={{
            label: "Explore ATS Checker",
            href: "/ats-checker",
          }}
          features={[
            "150+ Professional Layouts",
            "Real-Time Editor Preview",
            "AI-Powered Writing",
          ]}
        />

        {/* Steps */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 py-16 sm:py-24">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            const isEven = i % 2 === 1;
            return (
              <div
                key={step.number}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center p-8 sm:p-10 rounded-2xl border border-slate-200/80 bg-[#F8F8F6] shadow-sm ${
                  isEven ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Text */}
                <div className={`lg:col-span-7 space-y-4 text-left ${isEven ? 'lg:order-2' : ''}`}>
                  <div className="flex items-center gap-3">
                    <span className="text-4xl sm:text-5xl font-black text-slate-300 leading-none">{step.number}</span>
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center shadow-2xs"
                      style={{ background: step.accent }}
                    >
                      <Icon className="w-5 h-5 text-[#0F0F0F]" aria-hidden="true" />
                    </div>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">{step.title}</h2>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">{step.description}</p>
                  <ul className="space-y-2.5 pt-2">
                    {step.details.map((d) => (
                      <li key={d} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                        <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: "rgba(88,192,157,0.2)" }}>
                          <Check className="h-2.5 w-2.5 text-emerald-600 stroke-[3]" aria-hidden="true" />
                        </div>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Visual card */}
                <div
                  className={`lg:col-span-5 rounded-2xl border border-slate-200/90 bg-white h-56 flex flex-col items-center justify-center p-6 shadow-md ${
                    isEven ? 'lg:order-1' : ''
                  }`}
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm mb-3"
                    style={{ background: step.accent }}
                  >
                    <Icon className="w-8 h-8 text-[#0F0F0F]" aria-hidden="true" />
                  </div>
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Step {step.number} : {step.title}
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium mt-1">
                    Guided &amp; Automated
                  </span>
                </div>
              </div>
            );
          })}
        </section>

        {/* FAQ Section */}
        <FAQ
          items={HOW_IT_WORKS_FAQS}
          badge="Got Questions?"
          title="Frequently Asked"
          highlightText="Questions"
          subtitle="Everything you need to know about our resume builder process."
          showContactCta={true}
          bgStyle="#F8F8F6"
        />

        {/* Canonical ReadyToBuild CTA */}
        <ReadyToBuild
          title="Ready to Build Your Perfect Resume?"
          subtitle="Join thousands of job seekers who landed interviews with GetEasyCV."
          buttonText="Start Building Free"
          buttonHref="/templates"
        />
      </main>
      <Footer />
    </>
  );
}
