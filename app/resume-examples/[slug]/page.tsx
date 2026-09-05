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

      <main className="min-h-screen bg-[#F8F8F6] text-[#0F0F0F] py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-slate-500">
            <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/resume-examples" className="hover:text-slate-900 transition-colors">Resume Examples</Link>
            <span>/</span>
            <span className="text-slate-900 font-semibold">{example.roleTitle}</span>
          </nav>

          {/* Header Card */}
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-2xs space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                style={{ background: '#BAC7FE', color: '#0F0F0F' }}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#0F0F0F]" />
                <span>{example.category} Guide</span>
              </span>
              <span className="text-xs text-slate-500 font-medium">ATS Verified • 2026 Standard</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              {example.roleTitle} Resume Example & Writing Guide
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              {example.heroSubtitle}
            </p>

            <div className="pt-3 flex flex-wrap items-center gap-3">
              <Link
                href="/editor"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#0F0F0F] hover:bg-[#262626] text-white rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer"
              >
                <span>Use This Resume Format</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/templates"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 rounded-xl text-xs font-semibold transition-all cursor-pointer"
              >
                <span>Browse Templates</span>
              </Link>
            </div>
          </div>

          {/* Section: Professional Summary Examples */}
          <section className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-2xs space-y-4">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#0F0F0F]" /> Professional Summary Examples
            </h2>
            <p className="text-xs text-slate-600 font-normal">
              Use these recruiter-backed summary statements as inspiration for your own resume header:
            </p>
            <div className="space-y-3">
              {example.summaryExamples.map((sum, i) => (
                <div key={i} className="p-4 bg-[#F8F8F6] rounded-2xl border border-slate-200/70 text-xs text-slate-800 leading-relaxed">
                  <span className="font-bold text-slate-900 block mb-1">Option {i + 1}:</span>
                  "{sum}"
                </div>
              ))}
            </div>
          </section>

          {/* Section: Recommended Key Skills */}
          <section className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-2xs space-y-4">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#58C09D]" /> Key Skills to Include
            </h2>
            <p className="text-xs text-slate-600 font-normal">
              Incorporate these core technical and industry competencies to pass ATS keyword filters:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {example.keySkills.map((skill, i) => (
                <li key={i} className="p-3 bg-[#F8F8F6] rounded-xl text-xs font-semibold text-slate-900 flex items-center gap-2.5 border border-slate-100">
                  <span className="w-2 h-2 rounded-full bg-[#58C09D] shrink-0" />
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Section: Bullet Point Experience Examples */}
          <section className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-2xs space-y-4">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#0F0F0F]" /> Work Experience Achievement Bullets
            </h2>
            <p className="text-xs text-slate-600 font-normal">
              Action verbs paired with quantifiable impact metrics:
            </p>
            <div className="space-y-2.5">
              {example.experienceBullets.map((bullet, i) => (
                <div key={i} className="p-4 bg-[#F8F8F6] rounded-xl border border-slate-200/60 text-xs text-slate-800 flex items-start gap-3">
                  <span className="font-extrabold text-[#F3645C] text-sm leading-none mt-0.5">•</span>
                  <span className="leading-relaxed">{bullet}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Section: ATS Tips & Common Mistakes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 shadow-2xs space-y-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-[#F5D17B]" /> ATS Optimization Tips
              </h3>
              <ul className="space-y-2 text-xs text-slate-600 font-normal">
                {example.atsTips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#0F0F0F] font-bold">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 shadow-2xs space-y-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-[#F3645C]" /> Mistakes to Avoid
              </h3>
              <ul className="space-y-2 text-xs text-slate-600 font-normal">
                {example.commonMistakes.map((mis, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#F3645C] font-bold">•</span>
                    <span>{mis}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom CTA Box */}
          <div className="bg-[#0F0F0F] p-8 sm:p-10 rounded-3xl text-white text-center space-y-4 shadow-xl border border-white/10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-white">
              <Sparkles className="w-3.5 h-3.5 text-[#F5D17B]" />
              <span>Recruiter Recommended</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Create Your {example.roleTitle} Resume in Minutes</h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto font-normal leading-relaxed">
              Use our recruiter-backed templates and live ATS keyword checker to build a high-impact resume ready for submission.
            </p>
            <div className="pt-2">
              <Link
                href="/editor"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-white hover:bg-slate-100 text-[#0F0F0F] rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer"
              >
                <span>Build Resume for {example.roleTitle}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
