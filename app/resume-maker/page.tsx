import React from 'react';
import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { SoftwareAppSchema, BreadcrumbSchema } from '@/components/seo/SchemaOrg';
import { Sparkles, ArrowRight, FileText } from 'lucide-react';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://geteasycv.com';

export const metadata: Metadata = {
  title: 'Online Resume Maker | Create Job Resumes Online | GetEasyCV',
  description:
    'Easy online resume maker for job seekers. Choose recruiter-tested layouts, write experience bullets with AI, and download high-resolution PDFs.',
  alternates: {
    canonical: `${baseUrl}/resume-maker`,
  },
  openGraph: {
    title: 'Online Resume Maker | Create Job Resumes Online | GetEasyCV',
    description: 'Easy online resume maker with AI bullet generator and PDF download.',
    url: `${baseUrl}/resume-maker`,
  },
};

export default function ResumeMakerPage() {
  return (
    <>
      <SoftwareAppSchema />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Resume Maker', url: '/resume-maker' },
        ]}
      />
      <Navigation />

      <main className="min-h-screen bg-slate-50/50">
        <section className="py-16 sm:py-24 border-b border-slate-200/80 bg-white text-center space-y-6">
          <div className="max-w-5xl mx-auto px-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-purple-50 text-purple-700 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-4 h-4" />
              <span>Easy Online Resume Maker</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Make a Standout Resume <span className="text-purple-600">In 10 Minutes</span>
            </h1>
            <p className="text-base text-slate-600 max-w-2xl mx-auto mt-4 leading-relaxed">
              Create, edit, and perfect your job application documents with live side-by-side editing and AI bullet suggestions.
            </p>
            <div className="pt-6">
              <Link
                href="/editor"
                className="px-8 py-4 bg-[#0F0F0F] hover:bg-black text-white font-bold rounded-xl text-sm shadow-md inline-flex items-center gap-2"
              >
                <span>Make My Resume Now</span>
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
