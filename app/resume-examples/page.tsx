import React from 'react';
import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { BreadcrumbSchema } from '@/components/seo/SchemaOrg';
import { RESUME_EXAMPLES } from '@/data/resumeExamplesData';
import { FileText, ArrowRight, Sparkles, CheckCircle2, Briefcase } from 'lucide-react';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://geteasycv.com';

export const metadata: Metadata = {
  title: 'Resume Examples & Industry Writing Guides | GetEasyCV',
  description:
    'Browse recruiter-approved resume examples, sample bullet points, and ATS formatting guides tailored for software engineers, nurses, project managers, and students.',
  alternates: {
    canonical: `${baseUrl}/resume-examples`,
  },
  openGraph: {
    title: 'Resume Examples & Industry Writing Guides | GetEasyCV',
    description: 'Browse recruiter-approved resume examples and ATS writing guides.',
    url: `${baseUrl}/resume-examples`,
  },
};

export default function ResumeExamplesIndexPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Resume Examples', url: '/resume-examples' },
        ]}
      />
      <Navigation />

      <main className="min-h-screen bg-slate-50/50 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-orange-50 text-[#FF5722] rounded-full text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Recruiter-Approved Resume Examples</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              Resume Examples & Role Writing Guides
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Explore job-tested resume samples, bullet point guides, and ATS formatting tips designed specifically for your field.
            </p>
          </div>

          {/* Role Examples Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {RESUME_EXAMPLES.map((example) => (
              <Link
                key={example.slug}
                href={`/resume-examples/${example.slug}`}
                className="group bg-white p-6 rounded-2xl border border-slate-200/80 hover:border-[#FF5722] hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      {example.category}
                    </span>
                    <Briefcase className="w-4 h-4 text-slate-400 group-hover:text-[#FF5722] transition-colors" />
                  </div>
                  <h2 className="text-lg font-bold text-slate-900 group-hover:text-[#FF5722] transition-colors">
                    {example.roleTitle} Resume Example
                  </h2>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {example.heroSubtitle}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#FF5722]">
                  <span>View Example & Guide</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
