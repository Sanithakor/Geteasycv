import React from 'react';
import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { SoftwareAppSchema, FAQSchema, BreadcrumbSchema } from '@/components/seo/SchemaOrg';
import { Sparkles, CheckCircle2, FileText, ArrowRight, ShieldCheck, Download, Award, Zap } from 'lucide-react';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://geteasycv.com';

export const metadata: Metadata = {
  title: 'Free Online Resume Builder | Create ATS-Friendly Resumes | GetEasyCV',
  description:
    'Build a professional ATS-friendly resume in 10 minutes. Pick from recruiter-approved templates, customize section layouts, and export high-res PDFs.',
  alternates: {
    canonical: `${baseUrl}/resume-builder`,
  },
  openGraph: {
    title: 'Free Online Resume Builder | Create ATS-Friendly Resumes | GetEasyCV',
    description: 'Build a recruiter-approved resume in 10 minutes with ATS templates.',
    url: `${baseUrl}/resume-builder`,
  },
};

const RESUME_BUILDER_FAQS = [
  {
    question: 'Is the GetEasyCV Resume Builder free to use?',
    answer: 'Yes, our resume builder allows you to create your resume, pick from professional templates, customize sections, and download a free PDF copy.',
  },
  {
    question: 'How does the ATS formatting check work?',
    answer: 'GetEasyCV uses clean OpenXML/PDF layouts with standard font encoding and plain-text fallbacks so Applicant Tracking Systems (ATS) can parse your text without formatting errors.',
  },
  {
    question: 'Can I export my resume as Microsoft Word or PDF?',
    answer: 'Yes, you can export your completed resume as a selectable Vector PDF or a native Microsoft Word (.docx) document.',
  },
];

export default function ResumeBuilderLandingPage() {
  return (
    <>
      <SoftwareAppSchema />
      <FAQSchema faqs={RESUME_BUILDER_FAQS} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Resume Builder', url: '/resume-builder' },
        ]}
      />
      <Navigation />

      <main className="min-h-screen bg-slate-50/50">
        {/* Hero Section */}
        <section className="py-16 sm:py-24 border-b border-slate-200/80 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-orange-50 text-[#FF5722] rounded-full text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>ATS-Optimized Resume Builder</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Create an ATS-Friendly Resume <br className="hidden sm:inline" />
              <span className="text-[#FF5722]">That Recruiters Notice</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Stop fighting MS Word formatting errors. Pick a recruiter-tested template, auto-check ATS compatibility, and export high-res vector PDFs in minutes.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/editor"
                className="w-full sm:w-auto px-8 py-4 bg-[#FF5722] hover:bg-[#E64A19] text-white rounded-xl font-bold text-sm shadow-md shadow-[#FF5722]/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Start Building Free</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/templates"
                className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 rounded-xl font-semibold text-sm transition-all cursor-pointer text-center"
              >
                Browse 100+ Templates
              </Link>
            </div>
          </div>
        </section>

        {/* Feature Grid */}
        <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Why Build Your Resume with GetEasyCV?</h2>
            <p className="text-xs sm:text-sm text-slate-600">Built specifically to help job seekers pass ATS filters and impress hiring managers.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#FF5722] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">100% ATS Compatibility</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tested against major Applicant Tracking Systems (Workday, Greenhouse, Lever, Taleo) to ensure flawless parsing.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Download className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Vector PDF & Native Word</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Export true selectable text PDFs or clean OpenXML `.docx` files without HTML wrapper warning prompts.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">AI Bullet Generator</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Generate high-impact role summaries and quantifiable achievements tailored to your target job title.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-12 bg-white border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">Ready to Land Your Next Interview?</h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
              Build your professional resume today and apply with confidence.
            </p>
            <Link
              href="/editor"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#FF5722] hover:bg-[#E64A19] text-white rounded-xl font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              <span>Build My Resume Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
