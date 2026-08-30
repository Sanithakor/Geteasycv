import React from 'react';
import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { SoftwareAppSchema, FAQSchema, BreadcrumbSchema } from '@/components/seo/SchemaOrg';
import { ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://geteasycv.com';

export const metadata: Metadata = {
  title: 'ATS Resume Builder | Pass Applicant Tracking Systems | GetEasyCV',
  description:
    'Build an ATS-optimized resume guaranteed to pass recruiter software scans (Workday, Greenhouse, Lever). Live formatting check and PDF export.',
  alternates: {
    canonical: `${baseUrl}/ats-resume-builder`,
  },
  openGraph: {
    title: 'ATS Resume Builder | Pass Applicant Tracking Systems | GetEasyCV',
    description: 'Build an ATS-optimized resume that passes recruiter software scans.',
    url: `${baseUrl}/ats-resume-builder`,
  },
};

export default function AtsResumeBuilderPage() {
  return (
    <>
      <SoftwareAppSchema />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'ATS Resume Builder', url: '/ats-resume-builder' },
        ]}
      />
      <Navigation />

      <main className="min-h-screen bg-slate-50/50">
        <section className="py-16 sm:py-24 border-b border-slate-200/80 bg-white text-center space-y-6">
          <div className="max-w-5xl mx-auto px-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-orange-50 text-[#FF5722] rounded-full text-xs font-bold uppercase tracking-wider mb-4">
              <ShieldCheck className="w-4 h-4" />
              <span>ATS-Optimized Formatting Engine</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Build an ATS-Friendly Resume <br className="hidden sm:inline" />
              <span className="text-[#FF5722]">That Passes Software Filters</span>
            </h1>
            <p className="text-base text-slate-600 max-w-2xl mx-auto mt-4 leading-relaxed">
              Never lose job opportunities to broken PDF parsing. Our templates adhere strictly to standard font encodings, heading structures, and plain-text fallbacks.
            </p>
            <div className="pt-6">
              <Link
                href="/editor"
                className="px-8 py-4 bg-[#FF5722] hover:bg-[#E64A19] text-white font-bold rounded-xl text-sm shadow-md inline-flex items-center gap-2"
              >
                <span>Build ATS Resume Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
