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
} from 'lucide-react';

const CATEGORIES = [
  'All',
  'Technology',
  'Management',
  'Healthcare',
  'Design',
  'Finance',
  'Marketing',
];

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
        ex.keySkills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <>
      <Navigation />

      <main className="min-h-screen bg-[#F8F8F6] text-[#0F0F0F] font-sans">
        <InnerBanner
          badge="Recruiter-Vetted Examples"
          badgeIcon={Sparkles}
          pageType="resume-examples"
          breadcrumbs={[{ label: 'Resume Examples', href: '/resume-examples' }]}
          title="Role-Specific Resume"
          highlightText="Examples"
          titleSuffix="& Writing Guides"
          description="Explore real, ATS-tested resume examples across engineering, healthcare, management, and design. Pick proven phrasing and build your own in minutes."
          primaryAction={{
            label: 'Start Building Free',
            href: '/editor',
          }}
          secondaryAction={{
            label: 'Browse ATS Templates',
            href: '/templates',
          }}
          features={[
            'Role-Specific Phrasing',
            'ATS Keyword Mapping',
            'Action Verb Libraries',
          ]}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10">
          {/* Filter Bar */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-2xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by job title or skill..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium placeholder:text-slate-400 focus:border-[#0F0F0F] focus:ring-1 focus:ring-[#0F0F0F]/10 outline-none transition-all"
              />
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400 shrink-0 mr-1 hidden sm:block" />
              {CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                      isSelected
                        ? 'bg-[#0F0F0F] text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between text-xs text-slate-600 px-1">
            <span>
              Showing <strong className="text-slate-900">{filteredExamples.length}</strong>{' '}
              recruiter-approved guides
            </span>
            {selectedCategory !== 'All' && (
              <button
                onClick={() => setSelectedCategory('All')}
                className="text-xs font-semibold text-[#F3645C] hover:underline cursor-pointer"
              >
                Reset category filter
              </button>
            )}
          </div>

          {/* Role Examples Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExamples.map((example) => (
              <article
                key={example.slug}
                className="group bg-white rounded-2xl border border-slate-200/80 hover:border-slate-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span
                      className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full"
                      style={{ background: '#F8F8F6', color: '#0F0F0F', border: '1px solid rgba(15,15,15,0.08)' }}
                    >
                      {example.category}
                    </span>
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105"
                      style={{ background: '#BAC7FE' }}
                    >
                      <Briefcase className="w-4 h-4 text-[#0F0F0F]" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#F3645C] transition-colors leading-snug">
                      {example.roleTitle} Resume Example
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mt-2 font-normal">
                      {example.heroSubtitle}
                    </p>
                  </div>

                  {/* Skills pill preview */}
                  <div className="pt-2">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Key Competencies
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {example.keySkills.slice(0, 3).map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-50 border border-slate-200/60 text-slate-700"
                        >
                          {skill}
                        </span>
                      ))}
                      {example.keySkills.length > 3 && (
                        <span className="text-[10px] text-slate-400 font-medium self-center pl-1">
                          +{example.keySkills.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 font-medium">
                    {example.experienceBullets.length} bullet examples
                  </span>
                  <Link
                    href={`/resume-examples/${example.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F0F0F] group-hover:text-[#F3645C] transition-colors"
                  >
                    <span>Read Guide</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {filteredExamples.length === 0 && (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-3">
              <div
                className="w-12 h-12 rounded-2xl mx-auto flex items-center justify-center"
                style={{ background: '#FEE1CF' }}
              >
                <Search className="w-6 h-6 text-[#0F0F0F]" />
              </div>
              <h3 className="text-base font-bold text-slate-900">No matching resume examples found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try searching for a different job title, or clear the search query to see all guides.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-[#0F0F0F] text-white transition-all hover:opacity-90 cursor-pointer"
              >
                Clear Search Filters
              </button>
            </div>
          )}

          {/* Value Banner: ATS Best Practices */}
          <section className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-10 shadow-2xs space-y-6">
            <div className="max-w-3xl space-y-2">
              <div
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider"
                style={{ background: '#DDF4EA', color: '#0F0F0F' }}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#58C09D]" />
                <span>Recruiter Standard</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                How to Use These Examples Effectively
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Hiring managers review hundreds of applications. Avoid verbatim copying; instead, tailor these verified structures to your personal impact metrics.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="p-5 rounded-2xl border border-slate-100 bg-[#F8F8F6] space-y-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center font-extrabold text-xs bg-[#BAC7FE] text-[#0F0F0F]">
                  1
                </div>
                <h4 className="text-sm font-bold text-slate-900">Quantify Every Bullet</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Include percentages, revenue numbers, or team sizes (e.g., “improved latency by 32% across 4 microservices”).
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-slate-100 bg-[#F8F8F6] space-y-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center font-extrabold text-xs bg-[#F5D17B] text-[#0F0F0F]">
                  2
                </div>
                <h4 className="text-sm font-bold text-slate-900">Mirror Job Keywords</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Identify recurring terms in your target job descriptions and weave them naturally into your experience bullets.
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-slate-100 bg-[#F8F8F6] space-y-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center font-extrabold text-xs bg-[#D0B9EF] text-[#0F0F0F]">
                  3
                </div>
                <h4 className="text-sm font-bold text-slate-900">Choose Single-Column Formats</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Applicant Tracking Systems parse left-to-right, top-to-bottom. Simple single-column layouts guarantee zero parsing dropouts.
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
