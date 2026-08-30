import React from 'react';
import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { SoftwareAppSchema, FAQSchema, BreadcrumbSchema } from '@/components/seo/SchemaOrg';
import { Sparkles, ArrowRight, ShieldCheck, Download, Globe } from 'lucide-react';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://geteasycv.com';

export const metadata: Metadata = {
  title: 'Free Online CV Builder | Create Professional CVs | GetEasyCV',
  description:
    'Build an academic, professional, or international CV online for free. Custom layouts, automatic page numbering, and instant vector PDF download.',
  alternates: {
    canonical: `${baseUrl}/free-cv-builder`,
  },
  openGraph: {
    title: 'Free Online CV Builder | Create Professional CVs | GetEasyCV',
    description: 'Build a recruiter-approved professional CV online for free.',
    url: `${baseUrl}/free-cv-builder`,
  },
};

export default function FreeCvBuilderPage() {
  return (
    <>
      <SoftwareAppSchema />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Free CV Builder', url: '/free-cv-builder' },
        ]}
      />
      <Navigation />

      <main className="min-h-screen bg-slate-50/50">
        <section className="py-16 sm:py-24 border-b border-slate-200/80 bg-white text-center space-y-6">
          <div className="max-w-5xl mx-auto px-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
              <Globe className="w-4 h-4" />
              <span>Free Academic & Professional CV Builder</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Create an International CV <span className="text-blue-600">For Free</span>
            </h1>
            <p className="text-base text-slate-600 max-w-2xl mx-auto mt-4 leading-relaxed">
              Format your academic, executive, or international Curriculum Vitae with structured sections and instant PDF download.
            </p>
            <div className="pt-6">
              <Link
                href="/editor"
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm shadow-md inline-flex items-center gap-2"
              >
                <span>Build Free CV Now</span>
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
