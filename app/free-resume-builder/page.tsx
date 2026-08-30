import React from 'react';
import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { SoftwareAppSchema, FAQSchema, BreadcrumbSchema } from '@/components/seo/SchemaOrg';
import { Sparkles, ArrowRight, ShieldCheck, Download, Zap, CheckCircle2 } from 'lucide-react';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://geteasycv.com';

export const metadata: Metadata = {
  title: '100% Free Online Resume Builder | PDF Export | GetEasyCV',
  description:
    'Build a professional ATS resume for free. Pick from recruiter-tested layouts, customize sections, and download your resume instantly without hidden fees.',
  alternates: {
    canonical: `${baseUrl}/free-resume-builder`,
  },
  openGraph: {
    title: '100% Free Online Resume Builder | PDF Export | GetEasyCV',
    description: 'Build a recruiter-approved resume for free with ATS templates and instant download.',
    url: `${baseUrl}/free-resume-builder`,
  },
};

const FREE_BUILDER_FAQS = [
  {
    question: 'Can I really build and download a resume for free?',
    answer: 'Yes, GetEasyCV allows you to build your complete resume, pick clean ATS templates, and download a free PDF version without paywall traps.',
  },
  {
    question: 'Will my free resume pass ATS scanners?',
    answer: 'Yes! All free templates use standard fonts, plain-text character encoding, and single-column structures tested against major ATS software.',
  },
];

export default function FreeResumeBuilderPage() {
  return (
    <>
      <SoftwareAppSchema />
      <FAQSchema faqs={FREE_BUILDER_FAQS} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Free Resume Builder', url: '/free-resume-builder' },
        ]}
      />
      <Navigation />

      <main className="min-h-screen bg-slate-50/50">
        <section className="py-16 sm:py-24 border-b border-slate-200/80 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>100% Free Online Resume Maker</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Create a Free Professional Resume <br className="hidden sm:inline" />
              <span className="text-emerald-600">No Credit Card Required</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Create an ATS-friendly resume in 10 minutes. Pick a recruiter-tested layout, customize sections, and download your high-resolution PDF for free.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/editor"
                className="w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Build Free Resume Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/templates"
                className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 rounded-xl font-semibold text-sm transition-all cursor-pointer text-center"
              >
                Browse Free Templates
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
