import React from 'react';
import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { SoftwareAppSchema, FAQSchema, BreadcrumbSchema } from '@/components/seo/SchemaOrg';
import { Sparkles, CheckCircle2, FileText, ArrowRight, ShieldCheck, Download, Award, Globe } from 'lucide-react';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://geteasycv.com';

export const metadata: Metadata = {
  title: 'Free Online CV Builder | Professional Curriculum Vitae Maker | GetEasyCV',
  description:
    'Create an international professional CV online in minutes. Academic and professional CV templates, ATS layout checks, and vector PDF downloads.',
  alternates: {
    canonical: `${baseUrl}/cv-builder`,
  },
  openGraph: {
    title: 'Free Online CV Builder | Professional Curriculum Vitae Maker | GetEasyCV',
    description: 'Create an international professional CV online in minutes with ATS templates.',
    url: `${baseUrl}/cv-builder`,
  },
};

const CV_BUILDER_FAQS = [
  {
    question: 'What is the difference between a CV and a Resume?',
    answer: 'A Curriculum Vitae (CV) provides a comprehensive overview of your complete career, education, and credentials (often multi-page), whereas a Resume is a concise 1-2 page summary tailored to a specific job role.',
  },
  {
    question: 'Can I build a multi-page CV with GetEasyCV?',
    answer: 'Yes, GetEasyCV automatically handles pagination, font scaling, and page breaks to keep your multi-page CV clean and readable across PDF exports.',
  },
];

export default function CvBuilderLandingPage() {
  return (
    <>
      <SoftwareAppSchema />
      <FAQSchema faqs={CV_BUILDER_FAQS} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'CV Builder', url: '/cv-builder' },
        ]}
      />
      <Navigation />

      <main className="min-h-screen bg-slate-50/50">
        {/* Hero Section */}
        <section className="py-16 sm:py-24 border-b border-slate-200/80 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase tracking-wider">
              <Globe className="w-4 h-4" />
              <span>International Professional CV Maker</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Build a Professional CV <br className="hidden sm:inline" />
              <span className="text-blue-600">For Global Opportunities</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Create academic, executive, or international Curriculum Vitae documents with structured sections, automatic page numbering, and clean typography.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/editor"
                className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Create My CV Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/templates"
                className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 rounded-xl font-semibold text-sm transition-all cursor-pointer text-center"
              >
                Explore CV Formats
              </Link>
            </div>
          </div>
        </section>

        {/* Feature Highlights */}
        <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Tailored CV Layouts for Every Career Stage</h2>
            <p className="text-xs sm:text-sm text-slate-600">Designed to present your qualifications, research, and work history cleanly.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Academic & Executive CVs</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Add research publications, certifications, teaching experience, and language proficiencies easily.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Global ATS Standards</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Adheres to European (Europass compliant style) and North American ATS document scanning standards.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <Download className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Instant PDF & Word Export</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Download high-resolution selectable PDFs or editable Word files ready for submission to employers.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
