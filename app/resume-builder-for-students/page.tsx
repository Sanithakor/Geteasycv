import React from 'react';
import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { SoftwareAppSchema, BreadcrumbSchema } from '@/components/seo/SchemaOrg';
import { Sparkles, ArrowRight, GraduationCap } from 'lucide-react';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://geteasycv.com';

export const metadata: Metadata = {
  title: 'Resume Builder for Students | College & High School | GetEasyCV',
  description:
    'Build a student resume with no work experience. Highlight academic projects, coursework, leadership skills, and extracurricular activities.',
  alternates: {
    canonical: `${baseUrl}/resume-builder-for-students`,
  },
  openGraph: {
    title: 'Resume Builder for Students | College & High School | GetEasyCV',
    description: 'Build an impressive student resume highlighting coursework and projects.',
    url: `${baseUrl}/resume-builder-for-students`,
  },
};

export default function ResumeBuilderForStudentsPage() {
  return (
    <>
      <SoftwareAppSchema />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Resume Builder for Students', url: '/resume-builder-for-students' },
        ]}
      />
      <Navigation />

      <main className="min-h-screen bg-slate-50/50">
        <section className="py-16 sm:py-24 border-b border-slate-200/80 bg-white text-center space-y-6">
          <div className="max-w-5xl mx-auto px-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
              <GraduationCap className="w-4 h-4" />
              <span>College & High School Student Resume Builder</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Build a Student Resume <span className="text-blue-600">With No Work Experience</span>
            </h1>
            <p className="text-base text-slate-600 max-w-2xl mx-auto mt-4 leading-relaxed">
              Transform your university projects, coursework, volunteer work, and student club leadership into a high-impact professional resume.
            </p>
            <div className="pt-6">
              <Link
                href="/editor"
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm shadow-md inline-flex items-center gap-2"
              >
                <span>Build Student Resume</span>
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
