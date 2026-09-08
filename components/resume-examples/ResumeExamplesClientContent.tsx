'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import InnerBanner from '@/components/InnerBanner';
import ReadyToBuild from '@/components/sections/ReadyToBuild';
import { RESUME_EXAMPLES } from '@/data/resumeExamplesData';
import {
  FileText,
  ArrowRight,
  Sparkles,
  Briefcase,
  Search,
  CheckCircle2,
  ShieldCheck,
  Target,
  SlidersHorizontal,
  GraduationCap,
  Layers,
  Award,
} from 'lucide-react';

const CATEGORIES = [
  'All',
  'Technology',
  'Data & Analytics',
  'Finance',
  'Marketing',
  'Healthcare',
  'Management',
  'Education',
  'Creative & Design',
  'Entry Level',
];

const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  Technology: { bg: '#B5C3F7', text: '#111111', border: 'rgba(181, 195, 247, 0.4)' },
  'Data & Analytics': { bg: '#FFE0CF', text: '#111111', border: 'rgba(255, 224, 207, 0.5)' },
  Finance: { bg: '#C9AFE8', text: '#111111', border: 'rgba(201, 175, 232, 0.4)' },
  Marketing: { bg: '#FFE0CF', text: '#111111', border: 'rgba(255, 224, 207, 0.5)' },
  Healthcare: { bg: '#B5C3F7', text: '#111111', border: 'rgba(181, 195, 247, 0.4)' },
  Management: { bg: '#C9AFE8', text: '#111111', border: 'rgba(201, 175, 232, 0.4)' },
  Education: { bg: '#FFE0CF', text: '#111111', border: 'rgba(255, 224, 207, 0.5)' },
  'Creative & Design': { bg: '#C9AFE8', text: '#111111', border: 'rgba(201, 175, 232, 0.4)' },
  'Entry Level': { bg: '#B5C3F7', text: '#111111', border: 'rgba(181, 195, 247, 0.4)' },
};

export default function ResumeExamplesClientContent() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredExamples = useMemo(() => {
    return RESUME_EXAMPLES.filter((ex) => {
      const matchCat =
        selectedCategory === 'All' ||
        ex.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchSearch =
        !searchQuery.trim() ||
        ex.roleTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ex.heroSubtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ex.keySkills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
        ex.atsKeywords.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <>
      <Navigation />

      <main className="min-h-screen bg-[#F8F8F6] text-[#111111] font-sans">
        <InnerBanner
          badge="2026 Recruiter-Approved Examples"
          badgeIcon={Sparkles}
          pageType="resume-examples"
          breadcrumbs={[{ label: 'Resume Examples', href: '/resume-examples' }]}
          title="Role-Specific Resume"
          highlightText="Examples"
          titleSuffix="& ATS Writing Guides"
          description="Explore complete, fully-formatted resume samples for engineering, data, healthcare, management, and more. Written with quantifiable bullet formulas and ATS-vetted keywords."
          primaryAction={{
            label: 'Start Building Free',
            href: '/editor',
          }}
          secondaryAction={{
            label: 'Browse ATS Templates',
            href: '/templates',
          }}
          features={[
            'Full Realistic Samples',
            'XYZ Bullet Formulas',
            'Action Verb Libraries',
            'ATS Keyword Mappings',
          ]}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10">
          {/* Filter Bar */}
          <div
            className="bg-white rounded-3xl border p-4 sm:p-5 shadow-2xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4"
            style={{ borderColor: 'rgba(17, 17, 17, 0.08)' }}
          >
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-[#888888] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by role title, skill, or keyword..."
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl border text-xs font-medium placeholder:text-[#999999] focus:outline-none transition-all"
                style={{
                  borderColor: 'rgba(17, 17, 17, 0.12)',
                  background: '#F8F8F6',
                }}
              />
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#888888] shrink-0 mr-1 hidden sm:block" />
              {CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className="px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap border"
                    style={{
                      background: isSelected ? '#111111' : '#FFFFFF',
                      color: isSelected ? '#FFFFFF' : '#333333',
                      borderColor: isSelected ? '#111111' : 'rgba(17, 17, 17, 0.1)',
                    }}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Results Count & Active Filter Indicator */}
          <div className="flex items-center justify-between text-xs text-[#666666] px-1">
            <span>
              Showing <strong className="text-[#111111]">{filteredExamples.length}</strong>{' '}
              comprehensive resume guides
            </span>
            {selectedCategory !== 'All' && (
              <button
                onClick={() => setSelectedCategory('All')}
                className="text-xs font-bold transition-colors cursor-pointer"
                style={{ color: '#FF5F5F' }}
              >
                Reset category filter ({selectedCategory})
              </button>
            )}
          </div>

          {/* Role Examples Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-6">
            {filteredExamples.map((example) => {
              const catColor = CATEGORY_COLORS[example.category] || {
                bg: '#FFE0CF',
                text: '#111111',
                border: 'rgba(17, 17, 17, 0.1)',
              };

              return (
                <article
                  key={example.slug}
                  className="group bg-white rounded-3xl border hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6 sm:p-7 flex flex-col justify-between"
                  style={{ borderColor: 'rgba(17, 17, 17, 0.08)' }}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span
                        className="text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full"
                        style={{
                          background: catColor.bg,
                          color: catColor.text,
                        }}
                      >
                        {example.category}
                      </span>
                      <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105"
                        style={{ background: '#F8F8F6', border: '1px solid rgba(17,17,17,0.06)' }}
                      >
                        <Briefcase className="w-4 h-4 text-[#111111]" />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg sm:text-xl font-extrabold text-[#111111] group-hover:text-[#FF5F5F] transition-colors leading-snug">
                        {example.roleTitle}
                      </h3>
                      <p className="text-xs text-[#666666] line-clamp-2 leading-relaxed mt-2 font-normal">
                        {example.heroSubtitle}
                      </p>
                    </div>

                    {/* Skills pill preview */}
                    <div className="pt-2">
                      <div className="text-[10px] font-bold text-[#888888] uppercase tracking-wider mb-2">
                        Core Competencies
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {example.atsKeywords.slice(0, 4).map((kw) => (
                          <span
                            key={kw}
                            className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-[#F8F8F6] border border-black/5 text-[#333333]"
                          >
                            {kw}
                          </span>
                        ))}
                        {example.atsKeywords.length > 4 && (
                          <span className="text-[10px] text-[#888888] font-medium self-center pl-1">
                            +{example.atsKeywords.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="pt-5 mt-5 border-t border-black/5 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-[11px] text-[#777777] font-medium">
                      <Sparkles className="w-3 h-3 text-[#FF5F5F]" />
                      <span>{example.summaryExamples?.length || 2}+ summaries included</span>
                    </div>
                    <Link
                      href={`/resume-examples/${example.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#111111] group-hover:text-[#FF5F5F] transition-colors"
                    >
                      <span>View Sample</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>

          {filteredExamples.length === 0 && (
            <div
              className="bg-white rounded-3xl border p-12 text-center space-y-3"
              style={{ borderColor: 'rgba(17, 17, 17, 0.08)' }}
            >
              <div
                className="w-12 h-12 rounded-2xl mx-auto flex items-center justify-center"
                style={{ background: '#FFE0CF' }}
              >
                <Search className="w-6 h-6 text-[#111111]" />
              </div>
              <h3 className="text-base font-bold text-[#111111]">No matching resume examples found</h3>
              <p className="text-xs text-[#666666] max-w-sm mx-auto">
                Try searching for a different job title or skill, or clear filters to view all examples.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="px-5 py-2 rounded-xl text-xs font-bold text-white transition-all hover:opacity-90 cursor-pointer"
                style={{ background: '#111111' }}
              >
                Clear Search Filters
              </button>
            </div>
          )}

          {/* Value Banner: ATS Best Practices */}
          <section
            className="bg-white rounded-3xl border p-8 sm:p-10 shadow-2xs space-y-6"
            style={{ borderColor: 'rgba(17, 17, 17, 0.08)' }}
          >
            <div className="max-w-3xl space-y-2">
              <div
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider"
                style={{ background: '#B5C3F7', color: '#111111' }}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#111111]" />
                <span>2026 Recruiter Standard</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111111] tracking-tight">
                How to Use These Resume Samples Effectively
              </h2>
              <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
                Hiring managers and modern applicant tracking systems review hundreds of candidate submissions. Follow these three core rules when customizing:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div
                className="p-6 rounded-2xl border bg-[#F8F8F6] space-y-2.5"
                style={{ borderColor: 'rgba(17, 17, 17, 0.06)' }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center font-extrabold text-xs"
                  style={{ background: '#FFE0CF', color: '#111111' }}
                >
                  1
                </div>
                <h4 className="text-sm font-bold text-[#111111]">Quantify Impact With Metrics</h4>
                <p className="text-xs text-[#555555] leading-relaxed">
                  Always use the Google X-Y-Z formula: Accomplished [X], measured by [Y], by doing [Z] (e.g. reduced API response latency by 35%).
                </p>
              </div>

              <div
                className="p-6 rounded-2xl border bg-[#F8F8F6] space-y-2.5"
                style={{ borderColor: 'rgba(17, 17, 17, 0.06)' }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center font-extrabold text-xs"
                  style={{ background: '#B5C3F7', color: '#111111' }}
                >
                  2
                </div>
                <h4 className="text-sm font-bold text-[#111111]">Mirror Target Job Keywords</h4>
                <p className="text-xs text-[#555555] leading-relaxed">
                  Applicant Tracking Systems match key skills from the job posting directly against your resume bullets and skills matrix.
                </p>
              </div>

              <div
                className="p-6 rounded-2xl border bg-[#F8F8F6] space-y-2.5"
                style={{ borderColor: 'rgba(17, 17, 17, 0.06)' }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center font-extrabold text-xs"
                  style={{ background: '#C9AFE8', color: '#111111' }}
                >
                  3
                </div>
                <h4 className="text-sm font-bold text-[#111111]">Use Clean ATS Typography & Hierarchy</h4>
                <p className="text-xs text-[#555555] leading-relaxed">
                  Avoid complex multi-layered graphics or text boxes that confuse parsers. Clean linear sections guarantee 100% readability.
                </p>
              </div>
            </div>
          </section>
        </div>

        <ReadyToBuild
          title="Ready to Build Your Tailored Resume?"
          subtitle="Apply these recruiter-tested bullets to 150+ ATS-optimized templates today."
          buttonText="Start Building Free"
          buttonHref="/editor"
        />
      </main>

      <Footer />
    </>
  );
}
