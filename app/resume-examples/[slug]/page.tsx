import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { BreadcrumbSchema, WebPageSchema } from '@/components/seo/SchemaOrg';
import { RESUME_EXAMPLES, ResumeExample } from '@/data/resumeExamplesData';
import FullResumeDocumentView from '@/components/resume-examples/FullResumeDocumentView';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  FileText,
  Briefcase,
  GraduationCap,
  Award,
  DollarSign,
  Layers,
  HelpCircle,
  TrendingUp,
  Bookmark,
  Zap,
} from 'lucide-react';

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

  // Related roles from same or adjacent categories
  const relatedExamples = RESUME_EXAMPLES.filter(
    (e) => e.slug !== example.slug
  ).slice(0, 3);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: example.roleSpecificFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Navigation />

      <main className="min-h-screen bg-[#F8F8F6] text-[#111111] py-10 sm:py-16 font-sans">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-[#555555]">
            <Link href="/" className="hover:text-[#111111] transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/resume-examples"
              className="hover:text-[#111111] transition-colors"
            >
              Resume Examples
            </Link>
            <span>/</span>
            <span className="text-[#111111] font-semibold">{example.roleTitle}</span>
          </nav>

          {/* Hero Header Card */}
          <div
            className="rounded-3xl p-8 sm:p-12 border shadow-2xs space-y-6 relative overflow-hidden"
            style={{
              background: '#FFFFFF',
              borderColor: 'rgba(17, 17, 17, 0.08)',
            }}
          >
            {/* Ambient Background Glows */}
            <div
              className="absolute -top-16 -right-16 w-80 h-80 rounded-full opacity-35 pointer-events-none"
              style={{ background: '#B5C3F7', filter: 'blur(80px)' }}
            />
            <div
              className="absolute -bottom-16 -left-16 w-80 h-80 rounded-full opacity-30 pointer-events-none"
              style={{ background: '#FFE0CF', filter: 'blur(80px)' }}
            />

            <div className="relative z-10 space-y-5">
              <div className="flex flex-wrap items-center gap-2.5">
                <span
                  className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider shadow-2xs"
                  style={{ background: '#FFE0CF', color: '#111111', border: '1px solid rgba(255, 95, 95, 0.20)' }}
                >
                  <Sparkles className="w-3.5 h-3.5" style={{ color: '#FF5F5F' }} />
                  <span>{example.category}</span>
                </span>
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                  style={{ background: '#F8F8F6', color: '#111111', border: '1px solid rgba(17, 17, 17, 0.08)' }}
                >
                  <Briefcase className="w-3.5 h-3.5 text-[#555555]" />
                  <span>{example.experienceLevel}</span>
                </span>
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                  style={{ background: '#F8F8F6', color: '#111111', border: '1px solid rgba(17, 17, 17, 0.08)' }}
                >
                  <DollarSign className="w-3.5 h-3.5 text-[#555555]" />
                  <span>{example.avgSalaryRange}</span>
                </span>
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
                  style={{ background: '#C9AFE8', color: '#111111' }}
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#111111]" />
                  <span>ATS Verified 2026</span>
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111111] tracking-tight leading-tight">
                {example.roleTitle} Resume Example &amp; Complete Writing Guide
              </h1>

              <p className="text-sm sm:text-base lg:text-lg text-[#444444] leading-relaxed max-w-3xl font-normal">
                {example.heroSubtitle} Review this complete, recruiter-approved resume model, copy role-specific bullet points, and build your own ATS-optimized resume in minutes.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3.5">
                <Link
                  href="/editor"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-bold text-xs sm:text-sm shadow-md transition-all hover:opacity-90 hover:scale-105 active:scale-95"
                  style={{ background: '#111111' }}
                >
                  <Sparkles className="w-4 h-4" style={{ color: '#FF5F5F' }} />
                  <span>Build Resume with This Format</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/templates"
                  className="inline-flex items-center gap-2 px-6 py-4 rounded-xl font-bold text-xs sm:text-sm transition-all hover:bg-slate-50"
                  style={{
                    background: '#FFFFFF',
                    color: '#111111',
                    border: '1px solid rgba(17, 17, 17, 0.12)',
                  }}
                >
                  <span>Explore ATS Templates</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Section 1: Interactive / Visual Complete Resume Document */}
          <section className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider mb-1" style={{ color: '#FF5F5F' }}>
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>Complete Realistic Reference</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111111] tracking-tight">
                  {example.roleTitle} Resume Sample Document
                </h2>
              </div>
              <p className="text-xs text-[#666666] max-w-md text-left sm:text-right">
                Fully formatted according to 2026 recruitment and ATS scanning standards.
              </p>
            </div>

            <FullResumeDocumentView example={example} />
          </section>

          {/* Section 2: Professional Summary Variations */}
          <section
            className="bg-white rounded-3xl p-8 sm:p-10 border shadow-2xs space-y-6"
            style={{ borderColor: 'rgba(17, 17, 17, 0.08)' }}
          >
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider" style={{ background: '#B5C3F7', color: '#111111' }}>
                <FileText className="w-3.5 h-3.5 text-[#111111]" />
                <span>Resume Header Statements</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111111] tracking-tight">
                Professional Summary Examples by Experience Level
              </h2>
              <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
                Your professional summary is the first section hiring managers and recruiters read. Adapt these tailored opening statements for your exact career stage:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
              {example.summaryExamples.map((sum, i) => (
                <div
                  key={i}
                  className="rounded-2xl p-6 border flex flex-col justify-between space-y-4"
                  style={{
                    background: i === 0 ? '#FFE0CF' : i === 1 ? '#B5C3F7' : '#F8F8F6',
                    borderColor: 'rgba(17, 17, 17, 0.08)',
                  }}
                >
                  <div className="space-y-2">
                    <span
                      className="inline-block px-3 py-1 rounded-full text-[11px] font-extrabold tracking-wide uppercase shadow-2xs"
                      style={{ background: '#111111', color: '#FFFFFF' }}
                    >
                      {sum.level}
                    </span>
                    <p className="text-xs sm:text-sm text-[#111111] leading-relaxed font-normal pt-1">
                      &ldquo;{sum.text}&rdquo;
                    </p>
                  </div>
                  <div className="pt-2 text-[11px] font-semibold text-[#333333] flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#58C09D]" />
                    <span>Includes role keywords &amp; metrics</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 3: Categorized Skills Matrix */}
          <section
            className="bg-white rounded-3xl p-8 sm:p-10 border shadow-2xs space-y-6"
            style={{ borderColor: 'rgba(17, 17, 17, 0.08)' }}
          >
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider" style={{ background: '#C9AFE8', color: '#111111' }}>
                <Layers className="w-3.5 h-3.5 text-[#111111]" />
                <span>Competencies &amp; Keywords</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111111] tracking-tight">
                Essential {example.roleTitle} Skills to Include
              </h2>
              <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
                Applicant Tracking Systems (ATS) scan for matching skill terms. Group your competencies logically into clear categories:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {example.keySkillsCategorized.map((grp, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl border space-y-3"
                  style={{
                    background: '#F8F8F6',
                    borderColor: 'rgba(17, 17, 17, 0.08)',
                  }}
                >
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#111111] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ background: '#FF5F5F' }} />
                    <span>{grp.categoryName}</span>
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {grp.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white border shadow-2xs text-[#111111]"
                        style={{ borderColor: 'rgba(17, 17, 17, 0.08)' }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 4: High-Impact Work Experience Achievement Bullets */}
          <section
            className="bg-white rounded-3xl p-8 sm:p-10 border shadow-2xs space-y-6"
            style={{ borderColor: 'rgba(17, 17, 17, 0.08)' }}
          >
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider" style={{ background: '#FFE0CF', color: '#111111' }}>
                <TrendingUp className="w-3.5 h-3.5" style={{ color: '#FF5F5F' }} />
                <span>Measurable Impact Bullets</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111111] tracking-tight">
                Work Experience Bullets with Quantifiable Outcomes
              </h2>
              <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
                Use Google&apos;s XYZ formula: <em>Accomplished [X], as measured by [Y], by doing [Z]</em>. Here are plug-and-play achievement bullets tailored for {example.roleTitle}s:
              </p>
            </div>

            <div className="space-y-3">
              {example.experienceBullets.map((bullet, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl border flex items-start gap-3.5 transition-all hover:shadow-2xs"
                  style={{
                    background: '#F8F8F6',
                    borderColor: 'rgba(17, 17, 17, 0.08)',
                  }}
                >
                  <div
                    className="w-7 h-7 rounded-xl flex items-center justify-center shrink-0 mt-0.5 text-xs font-extrabold shadow-2xs text-white"
                    style={{ background: '#111111' }}
                  >
                    0{i + 1}
                  </div>
                  <p className="text-xs sm:text-sm text-[#111111] leading-relaxed font-normal pt-0.5">
                    {bullet}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 5: Action Verbs & ATS Power Keywords */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Action Verbs */}
            <div
              className="bg-white rounded-3xl p-7 sm:p-8 border shadow-2xs space-y-4"
              style={{ borderColor: 'rgba(17, 17, 17, 0.08)' }}
            >
              <h3 className="text-base sm:text-lg font-extrabold text-[#111111] flex items-center gap-2">
                <Zap className="w-4 h-4" style={{ color: '#FF5F5F' }} />
                <span>High-Impact Action Verbs</span>
              </h3>
              <p className="text-xs text-[#555555] leading-relaxed font-normal">
                Replace passive verbs with active power words to capture recruiter attention:
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {example.actionVerbs.map((verb) => (
                  <span
                    key={verb}
                    className="px-3 py-1 rounded-xl text-xs font-bold shadow-2xs"
                    style={{
                      background: '#B5C3F7',
                      color: '#111111',
                    }}
                  >
                    {verb}
                  </span>
                ))}
              </div>
            </div>

            {/* ATS Keywords */}
            <div
              className="bg-white rounded-3xl p-7 sm:p-8 border shadow-2xs space-y-4"
              style={{ borderColor: 'rgba(17, 17, 17, 0.08)' }}
            >
              <h3 className="text-base sm:text-lg font-extrabold text-[#111111] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#58C09D]" />
                <span>Primary ATS Keyword Tags</span>
              </h3>
              <p className="text-xs text-[#555555] leading-relaxed font-normal">
                Include these industry terms to match algorithmic job application filters:
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {example.atsKeywords.map((kw) => (
                  <span
                    key={kw}
                    className="px-3 py-1 rounded-xl text-xs font-bold shadow-2xs"
                    style={{
                      background: '#FFE0CF',
                      color: '#111111',
                    }}
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Section 6: ATS Guidelines & Pitfalls with Fixes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              className="bg-white rounded-3xl p-7 sm:p-8 border shadow-2xs space-y-4"
              style={{ borderColor: 'rgba(17, 17, 17, 0.08)' }}
            >
              <h3 className="text-base sm:text-lg font-extrabold text-[#111111] flex items-center gap-2">
                <Lightbulb className="w-5 h-5" style={{ color: '#FF5F5F' }} />
                <span>ATS Formatting Best Practices</span>
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-[#444444] font-normal">
                {example.atsTips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#58C09D] shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className="bg-white rounded-3xl p-7 sm:p-8 border shadow-2xs space-y-4"
              style={{ borderColor: 'rgba(17, 17, 17, 0.08)' }}
            >
              <h3 className="text-base sm:text-lg font-extrabold text-[#111111] flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" style={{ color: '#FF5F5F' }} />
                <span>Common Mistakes &amp; How to Fix Them</span>
              </h3>
              <div className="space-y-3.5">
                {example.commonMistakes.map((mis, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl border text-xs space-y-1.5"
                    style={{
                      background: '#FFF5F5',
                      borderColor: 'rgba(255, 95, 95, 0.20)',
                    }}
                  >
                    <div className="font-bold text-[#D32F2F] flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D32F2F]" />
                      <span>Mistake: {mis.mistake}</span>
                    </div>
                    <div className="text-[#333333] pl-3 leading-relaxed">
                      <strong>Fix:</strong> {mis.fix}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 7: Role-Specific FAQs */}
          {example.roleSpecificFaqs.length > 0 && (
            <section
              className="bg-white rounded-3xl p-8 sm:p-10 border shadow-2xs space-y-6"
              style={{ borderColor: 'rgba(17, 17, 17, 0.08)' }}
            >
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider" style={{ background: '#C9AFE8', color: '#111111' }}>
                  <HelpCircle className="w-3.5 h-3.5 text-[#111111]" />
                  <span>Expert Guidance</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111111] tracking-tight">
                  Frequently Asked Questions About {example.roleTitle} Resumes
                </h2>
              </div>

              <div className="space-y-4">
                {example.roleSpecificFaqs.map((faq, i) => (
                  <div
                    key={i}
                    className="p-5 sm:p-6 rounded-2xl border space-y-2"
                    style={{
                      background: '#F8F8F6',
                      borderColor: 'rgba(17, 17, 17, 0.08)',
                    }}
                  >
                    <h3 className="font-bold text-sm sm:text-base text-[#111111]">
                      {faq.question}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#555555] leading-relaxed font-normal">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Section 8: Related Resume Examples */}
          <section className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#111111] tracking-tight">
                  Explore Related Resume Examples
                </h3>
                <p className="text-xs text-[#555555] font-normal">
                  Compare phrasing and structures from complementary career tracks.
                </p>
              </div>
              <Link
                href="/resume-examples"
                className="text-xs font-bold flex items-center gap-1 text-[#111111] hover:text-[#FF5F5F] transition-colors"
              >
                <span>View All 12 Guides</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {relatedExamples.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/resume-examples/${rel.slug}`}
                  className="group bg-white rounded-2xl p-6 border transition-all duration-300 hover:shadow-md hover:-translate-y-1 flex flex-col justify-between"
                  style={{ borderColor: 'rgba(17, 17, 17, 0.08)' }}
                >
                  <div className="space-y-3">
                    <span
                      className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full inline-block shadow-2xs"
                      style={{ background: '#FFE0CF', color: '#111111' }}
                    >
                      {rel.category}
                    </span>
                    <h4 className="font-bold text-base text-[#111111] group-hover:text-[#FF5F5F] transition-colors leading-snug">
                      {rel.roleTitle}
                    </h4>
                    <p className="text-xs text-[#555555] line-clamp-2 leading-relaxed font-normal">
                      {rel.heroSubtitle}
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t flex items-center justify-between text-xs font-bold" style={{ borderColor: 'rgba(17, 17, 17, 0.06)' }}>
                    <span className="text-[#777777] font-medium">{rel.experienceLevel}</span>
                    <span className="text-[#111111] group-hover:text-[#FF5F5F] flex items-center gap-1 transition-colors">
                      Read <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Section 9: High-Conversion Bottom CTA Banner */}
          <div
            className="rounded-3xl p-8 sm:p-12 text-center text-white space-y-5 shadow-xl border relative overflow-hidden"
            style={{
              background: '#111111',
              borderColor: 'rgba(255, 255, 255, 0.12)',
            }}
          >
            <div
              className="absolute -top-12 -left-12 w-64 h-64 rounded-full opacity-20 pointer-events-none"
              style={{ background: '#FF5F5F', filter: 'blur(70px)' }}
            />
            <div
              className="absolute -bottom-12 -right-12 w-64 h-64 rounded-full opacity-25 pointer-events-none"
              style={{ background: '#B5C3F7', filter: 'blur(70px)' }}
            />

            <div className="relative z-10 max-w-2xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider bg-white/10 text-white shadow-2xs">
                <Sparkles className="w-3.5 h-3.5" style={{ color: '#FF5F5F' }} />
                <span>Start Building in 2 Minutes</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
                Ready to Create Your {example.roleTitle} Resume?
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                Pre-load this exact structure into our live resume builder. Tailor your skills, adjust bullet points with AI assistance, and export an ATS-optimized PDF immediately.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
                <Link
                  href="/editor"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-xs sm:text-sm transition-all bg-white text-[#111111] hover:bg-slate-100 hover:scale-105 active:scale-95 shadow-md"
                >
                  <Sparkles className="w-4 h-4" style={{ color: '#FF5F5F' }} />
                  <span>Use This Resume Template</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/templates"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold text-xs sm:text-sm border border-white/20 text-white hover:bg-white/10 transition-all"
                >
                  <span>Browse All ATS Templates</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
