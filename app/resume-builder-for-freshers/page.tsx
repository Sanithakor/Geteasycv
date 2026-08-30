import React from 'react';
import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { SoftwareAppSchema, BreadcrumbSchema } from '@/components/seo/SchemaOrg';
import { Sparkles, ArrowRight, UserCheck } from 'lucide-react';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://geteasycv.com';

export const metadata: Metadata = {
  title: 'Resume Builder for Freshers | Entry-Level Job Resumes | GetEasyCV',
  description:
    'Create an entry-level resume for freshers. Recruiter-approved layouts designed for first job applications, campus placements, and internships.',
  alternates: {
    canonical: `${baseUrl}/resume-builder-for-freshers`,
  },
  openGraph: {
    title: 'Resume Builder for Freshers | Entry-Level Job Resumes | GetEasyCV',
    description: 'Create an entry-level resume for freshers and first-time job seekers.',
    url: `${baseUrl}/resume-builder-for-freshers`,
  },
};

export default function ResumeBuilderForFreshersPage() {
  return (
    <>
      <SoftwareAppSchema />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Resume Builder for Freshers', url: '/resume-builder-for-freshers' },
        ]}
      />
      <Navigation />

      <main className="min-h-screen bg-slate-50/50">
        <section className="py-16 sm:py-24 border-b border-slate-200/80 bg-white text-center space-y-6">
          <div className="max-w-5xl mx-auto px-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
              <UserCheck className="w-4 h-4" />
              <span>Fresher & Entry-Level Resume Creator</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Build a Fresher Resume <br className="hidden sm:inline" />
              <span className="text-emerald-600">Land Your First Job</span>
            </h1>
            <p className="text-base text-slate-600 max-w-2xl mx-auto mt-4 leading-relaxed">
              Designed specifically for campus placements and first-time job seekers. Showcase your skills, internships, and capstone achievements clearly.
            </p>
            <div className="pt-6">
              <Link
                href="/editor"
                className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm shadow-md inline-flex items-center gap-2"
              >
                <span>Build Fresher Resume</span>
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
