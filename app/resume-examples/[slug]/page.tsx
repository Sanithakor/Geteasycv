import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { BreadcrumbSchema, WebPageSchema } from '@/components/seo/SchemaOrg';
import { RESUME_EXAMPLES, ResumeExample } from '@/data/resumeExamplesData';
import { Sparkles, ArrowRight, CheckCircle2, AlertTriangle, Lightbulb, FileText } from 'lucide-react';

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://geteasycv.com';

export function generateStaticParams() {
  return RESUME_EXAMPLES.map((example) => ({
    slug: example.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const example = RESUME_EXAMPLES.find((e) => e.slug === slug);

  if (!example) {
    return { title: 'Resume Example Not Found' };
  }

  return {
    title: example.metaTitle,
    description: example.metaDescription,
    alternates: {
      canonical: `${baseUrl}/resume-examples/${example.slug}`,
    },
    openGraph: {
      title: example.metaTitle,
      description: example.metaDescription,
      url: `${baseUrl}/resume-examples/${example.slug}`,
    },
  };
}

export default async function ResumeExampleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const example = RESUME_EXAMPLES.find((e) => e.slug === slug);

  if (!example) {
    notFound();
  }

  return (
    <>
      <WebPageSchema
        name={example.metaTitle}
        description={example.metaDescription}
        url={`/resume-examples/${example.slug}`}
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Resume Examples', url: '/resume-examples' },
          { name: example.roleTitle, url: `/resume-examples/${example.slug}` },
        ]}
      />
      <Navigation />

      <main className="min-h-screen bg-slate-50/50 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Header */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-2xs space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-orange-50 text-[#FF5722] rounded-full text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{example.category} Resume Guide</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {example.roleTitle} Resume Example & Writing Guide
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {example.heroSubtitle}
            </p>
            <div className="pt-2">
              <Link
                href="/editor"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF5722] hover:bg-[#E64A19] text-white rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer"
              >
                <span>Use This Resume Format</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Section: Professional Summary Examples */}
          <section className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-2xs space-y-4">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#FF5722]" /> Professional Summary Examples
            </h2>
            <p className="text-xs text-slate-600">
              Use these recruiter-backed summary statements as inspiration for your own resume header:
            </p>
            <div className="space-y-3">
              {example.summaryExamples.map((sum, i) => (
                <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-700 leading-relaxed">
                  <span className="font-bold text-slate-900 block mb-1">Option {i + 1}:</span>
                  "{sum}"
                </div>
              ))}
            </div>
          </section>

          {/* Section: Recommended Key Skills */}
          <section className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-2xs space-y-4">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" /> Key Skills to Include
            </h2>
            <p className="text-xs text-slate-600">
              Incorporate these core technical and industry competencies to pass ATS keyword filters:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {example.keySkills.map((skill, i) => (
                <li key={i} className="p-3 bg-slate-50 rounded-xl text-xs font-semibold text-slate-800 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#FF5722]" />
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Section: Bullet Point Experience Examples */}
          <section className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-2xs space-y-4">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-600" /> Work Experience Achievement Bullets
            </h2>
            <div className="space-y-2">
              {example.experienceBullets.map((bullet, i) => (
                <div key={i} className="p-3.5 bg-purple-50/50 rounded-xl border border-purple-100 text-xs text-slate-800 flex items-start gap-2.5">
                  <span className="font-bold text-purple-700 mt-0.5">•</span>
                  <span>{bullet}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Section: ATS Tips & Common Mistakes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-2xs space-y-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-amber-500" /> ATS Optimization Tips
              </h3>
              <ul className="space-y-2 text-xs text-slate-600">
                {example.atsTips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-amber-500 font-bold">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-2xs space-y-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-500" /> Mistakes to Avoid
              </h3>
              <ul className="space-y-2 text-xs text-slate-600">
                {example.commonMistakes.map((mis, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">•</span>
                    <span>{mis}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="bg-gradient-to-r from-slate-900 to-indigo-950 p-8 rounded-3xl text-white text-center space-y-4 shadow-lg">
            <h3 className="text-2xl font-bold">Create Your {example.roleTitle} Resume in Minutes</h3>
            <p className="text-xs text-slate-300 max-w-md mx-auto">
              Use our recruiter-backed templates and ATS checker to build a high-impact resume ready for application.
            </p>
            <Link
              href="/editor"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#FF5722] hover:bg-[#E64A19] text-white rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer"
            >
              <span>Build Resume for {example.roleTitle}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
