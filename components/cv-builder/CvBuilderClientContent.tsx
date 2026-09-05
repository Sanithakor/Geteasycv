'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ReadyToBuild from '@/components/sections/ReadyToBuild';
import FAQ from '@/components/FAQ';
import {
  Sparkles,
  CheckCircle2,
  FileText,
  ArrowRight,
  ShieldCheck,
  Download,
  Award,
  Globe,
  GraduationCap,
  Stethoscope,
  Briefcase,
  Layers,
  Check,
  ChevronRight,
  BookOpen,
  Scale,
  FileDown,
  FileType,
  UserCheck,
} from 'lucide-react';

interface CVTemplateArchetype {
  id: string;
  name: string;
  badge: string;
  category: string;
  pages: string;
  idealFor: string;
  highlight: string;
  accent: string;
}

const CV_TEMPLATES: CVTemplateArchetype[] = [
  {
    id: 'academic-scholar',
    name: 'The Academic Scholar',
    badge: 'Research & Faculty',
    category: 'Higher Education',
    pages: '3-6 Pages',
    idealFor: 'Professors, Postdoctoral Researchers, PhD Candidates',
    highlight: 'Dedicated sections for peer-reviewed publications, grant awards, citations & dissertations.',
    accent: 'border-blue-200 bg-blue-50/50 text-blue-700',
  },
  {
    id: 'executive-director',
    name: 'The Global Executive',
    badge: 'C-Suite & Board',
    category: 'Corporate Leadership',
    pages: '2-4 Pages',
    idealFor: 'CEOs, VP of Engineering, Managing Directors, Board Advisors',
    highlight: 'Optimized for P&L stewardship, M&A history, enterprise governance & keynotes.',
    accent: 'border-violet-200 bg-violet-50/50 text-violet-700',
  },
  {
    id: 'clinical-fellow',
    name: 'The Medical Specialist',
    badge: 'Healthcare & Clinical',
    category: 'Medicine & Surgery',
    pages: '2-5 Pages',
    idealFor: 'Attending Physicians, Clinical Residents, Chief Surgeons',
    highlight: 'Formatted for hospital privileges, medical board licensing, clinical trials & residency credits.',
    accent: 'border-emerald-200 bg-emerald-50/50 text-emerald-700',
  },
  {
    id: 'international-consultant',
    name: 'The Cross-Border Consultant',
    badge: 'Europass & Global',
    category: 'International Strategy',
    pages: '2-3 Pages',
    idealFor: 'Management Consultants, NGO Directors, Multi-National Leads',
    highlight: 'CEFR language fluency matrix, international work authorizations & cross-border tax compliance.',
    accent: 'border-amber-200 bg-amber-50/50 text-amber-700',
  },
];

const CV_FAQS = [
  {
    question: 'What is the fundamental difference between a CV and a Resume?',
    answer:
      'A Curriculum Vitae (CV) provides a comprehensive, chronological account of your entire professional life, academic research, publications, and credentials with no strict page limit (typically 2 to 8 pages). A Resume is a concise 1 to 2-page marketing document strictly customized for a specific corporate job description in the United States and Canada.',
  },
  {
    question: 'How does GetEasyCV handle multi-page CV layout without orphan headers?',
    answer:
      'Our deterministic pagination engine continuously measures the physical height of each section block. If an item or paragraph would otherwise be sliced uncomfortably across a page boundary, GetEasyCV automatically pushes the entire semantic section to the next page and maintains a clean running header ("Dr. Jane Doe — Curriculum Vitae | Page 2 of 4").',
  },
  {
    question: 'Can I format academic publications in APA, MLA, or Chicago citation styles?',
    answer:
      'Yes. Our academic editor supports customizable hanging indents, DOI links, author highlighting, and publication category groupings (e.g., Peer-Reviewed Journal Articles, Book Chapters, Conference Proceedings, and Invited Keynotes).',
  },
  {
    question: 'Are GetEasyCV formats compatible with Europass and UK standards?',
    answer:
      'Absolutely. Our templates meet international European standards (including clean photo placement options, nationality/visa details, and CEFR language proficiencies) as well as UK & Commonwealth specifications which forbid discriminatory personal data.',
  },
  {
    question: 'Can I export both vector PDF and editable Microsoft Word (DOCX)?',
    answer:
      'Yes! You can instantly export crystal-clear 300 DPI vector PDFs for submission, or download structured DOCX files if an employer or recruiter requests an editable version.',
  },
];

export default function CvBuilderClientContent() {
  const [activeTab, setActiveTab] = useState<'cv' | 'resume'>('cv');

  return (
    <>
      <Navigation />

      <main className="font-sans min-h-screen bg-[#F8F8F6]">
        {/* HERO SECTION */}
        <section className="py-16 sm:py-24 border-b border-slate-200/80 bg-white relative overflow-hidden">
          {/* Ambient Lighting */}
          <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-blue-100/40 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-violet-100/30 blur-3xl pointer-events-none" />

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/80 text-xs font-bold uppercase tracking-wider mb-6">
              <Globe className="w-3.5 h-3.5" />
              <span>International & Academic Curriculum Vitae Maker</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.12] mb-6">
              Build an Executive Curriculum Vitae for{' '}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                Global Careers & Academia
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8">
              Document your complete career trajectory, publications, fellowships, and clinical credentials with automated multi-page pagination, running headers, and guaranteed ATS compatibility.
            </p>

            {/* CTA Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link
                href="/editor"
                className="w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-sm shadow-md hover:shadow-lg flex items-center justify-center gap-2.5 transition-all hover:scale-102 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Create My CV Now</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </Link>
              <Link
                href="/templates"
                className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 border border-slate-300/80 text-slate-800 rounded-xl font-bold text-sm shadow-xs transition-all hover:scale-102 cursor-pointer text-center"
              >
                Explore 150+ CV Layouts
              </Link>
            </div>

            {/* Key Compliance Pills */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5 text-xs font-semibold text-slate-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Europass & UK Standard Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Multi-Page Automatic Running Headers</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>300 DPI Vector PDF & DOCX Export</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Tested on Academic ATS Scanners</span>
              </div>
            </div>
          </div>
        </section>

        {/* 1. KEY IMPACT METRICS */}
        <section className="py-10 bg-slate-50/80 border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl sm:text-4xl font-black text-slate-900">15,000+</div>
                <div className="text-xs font-bold text-slate-700 mt-1">Academic & Executive CVs</div>
                <div className="text-[11px] text-slate-500">Built for universities & global firms</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-black text-blue-600">45+</div>
                <div className="text-xs font-bold text-slate-700 mt-1">Countries Supported</div>
                <div className="text-[11px] text-slate-500">Europe, UK, North America & Asia</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-black text-emerald-600">100%</div>
                <div className="text-xs font-bold text-slate-700 mt-1">Orphan Protection</div>
                <div className="text-[11px] text-slate-500">Clean page breaks every time</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-black text-violet-600">4.9 / 5</div>
                <div className="text-xs font-bold text-slate-700 mt-1">Candidate Rating</div>
                <div className="text-[11px] text-slate-500">By professors, doctors & executives</div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. INTERACTIVE CV VS RESUME COMPARISON GUIDE */}
        <section className="py-16 sm:py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-bold uppercase tracking-wider mb-4">
              <Scale className="w-3.5 h-3.5" />
              <span>Which Document Do You Need?</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Curriculum Vitae (CV) vs. Resume: Key Differences
            </h2>
            <p className="text-base text-slate-600 mt-3 leading-relaxed">
              Submitting the wrong format can instantly disqualify you in international hiring or university search committees.
            </p>
          </div>

          {/* Interactive Toggle */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex p-1.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
              <button
                type="button"
                onClick={() => setActiveTab('cv')}
                className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'cv'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Curriculum Vitae (CV) Profile
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('resume')}
                className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'resume'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Standard Corporate Resume Profile
              </button>
            </div>
          </div>

          {/* Side by side cards */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* CV Card */}
            <div
              className={`bg-white rounded-3xl p-8 border transition-all duration-300 shadow-sm ${
                activeTab === 'cv'
                  ? 'border-blue-500 ring-2 ring-blue-500/20'
                  : 'border-slate-200 opacity-80'
              }`}
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                <div>
                  <span className="text-xs font-extrabold uppercase text-blue-600 tracking-wider">
                    Full Career Trajectory
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 mt-1">Curriculum Vitae (CV)</h3>
                </div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  CV
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <span className="font-bold text-slate-900 w-24 shrink-0">Document Length:</span>
                  <span className="text-slate-600">Multi-page (typically 2 to 8+ pages with no strict cap)</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="font-bold text-slate-900 w-24 shrink-0">Primary Focus:</span>
                  <span className="text-slate-600">Comprehensive credentials, research, publications & career tenure</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="font-bold text-slate-900 w-24 shrink-0">Target Fields:</span>
                  <span className="text-slate-600">Academia, scientific research, medicine, executive leadership, legal</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="font-bold text-slate-900 w-24 shrink-0">Geographic Standard:</span>
                  <span className="text-slate-600">United Kingdom, Europe, Middle East, Asia, and Global Academia</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="font-bold text-slate-900 w-24 shrink-0">Key Sections:</span>
                  <span className="text-slate-600">Publications, Teaching Fellowships, Grants, Patents, Board Positions</span>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100">
                <Link
                  href="/editor"
                  className="w-full py-3 rounded-xl text-center font-bold text-xs bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2 shadow-xs"
                >
                  <span>Build Curriculum Vitae</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Resume Card */}
            <div
              className={`bg-white rounded-3xl p-8 border transition-all duration-300 shadow-sm ${
                activeTab === 'resume'
                  ? 'border-indigo-500 ring-2 ring-indigo-500/20'
                  : 'border-slate-200 opacity-80'
              }`}
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                <div>
                  <span className="text-xs font-extrabold uppercase text-indigo-600 tracking-wider">
                    Targeted Job Summary
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 mt-1">Standard Resume</h3>
                </div>
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                  RES
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <span className="font-bold text-slate-900 w-24 shrink-0">Document Length:</span>
                  <span className="text-slate-600">Strictly 1 to 2 pages maximum</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="font-bold text-slate-900 w-24 shrink-0">Primary Focus:</span>
                  <span className="text-slate-600">High-impact summary tailored to match a specific job description</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="font-bold text-slate-900 w-24 shrink-0">Target Fields:</span>
                  <span className="text-slate-600">Tech startups, corporate finance, marketing, sales, entry-level</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="font-bold text-slate-900 w-24 shrink-0">Geographic Standard:</span>
                  <span className="text-slate-600">United States, Canada, and standard North American private sector</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="font-bold text-slate-900 w-24 shrink-0">Key Sections:</span>
                  <span className="text-slate-600">Work Experience, Quantified Accomplishments, Core Technical Skills</span>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100">
                <Link
                  href="/templates"
                  className="w-full py-3 rounded-xl text-center font-bold text-xs bg-slate-900 hover:bg-slate-800 text-white flex items-center justify-center gap-2 shadow-xs"
                >
                  <span>Build Corporate Resume</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 3. SPECIALIZED CV MODULES WE SUPPORT */}
        <section className="py-16 sm:py-20 bg-white border-y border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-800 border border-slate-200 text-xs font-bold uppercase tracking-wider mb-4">
                <Layers className="w-3.5 h-3.5 text-blue-600" />
                <span>Bespoke CV Modules</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Specialized Sections Engineered for Multi-Page CVs
              </h2>
              <p className="text-base text-slate-600 mt-3 max-w-2xl mx-auto leading-relaxed">
                Standard resumes cannot fit extensive research, teaching credentials, or board governance. GetEasyCV supports every field an executive or scholar needs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: GraduationCap,
                  title: 'Academic & Research',
                  tag: 'Publications & Grants',
                  desc: 'Includes peer-reviewed articles, dissertations, citations, NSF/NIH grant funding, and invited symposium lectures.',
                  bg: 'bg-blue-50 text-blue-700 border-blue-100',
                },
                {
                  icon: Stethoscope,
                  title: 'Medical & Clinical',
                  tag: 'Residencies & Licenses',
                  desc: 'Structured for hospital privileges, medical board certifications, clinical fellowships, and patient cohort studies.',
                  bg: 'bg-emerald-50 text-emerald-700 border-emerald-100',
                },
                {
                  icon: Briefcase,
                  title: 'Executive & Board',
                  tag: 'Governance & P&L',
                  desc: 'Showcase enterprise P&L stewardship, capital raises, strategic M&A acquisitions, and advisory board tenures.',
                  bg: 'bg-violet-50 text-violet-700 border-violet-100',
                },
                {
                  icon: Globe,
                  title: 'Global & Multilingual',
                  tag: 'Europass & Visas',
                  desc: 'Formatted with CEFR language proficiencies, international visa authorizations, and cross-border project portfolios.',
                  bg: 'bg-amber-50 text-amber-700 border-amber-100',
                },
              ].map((module) => {
                const Icon = module.icon;
                return (
                  <div
                    key={module.title}
                    className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center border shadow-2xs ${module.bg}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-600">
                          {module.tag}
                        </span>
                      </div>
                      <h3 className="font-bold text-base text-slate-900 mb-2">
                        {module.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {module.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 4. STEP-BY-STEP "HOW TO BUILD YOUR CV IN 4 STEPS" */}
        <section className="py-16 sm:py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-800 border border-slate-200 text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Simple 4-Step Process</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              How to Build Your Professional CV
            </h2>
            <p className="text-base text-slate-600 mt-3 leading-relaxed">
              From academic thesis to executive governance, produce a clean vector CV in minutes.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Select CV Framework',
                desc: 'Pick from academic, medical, executive, or Europass-compliant multi-page templates tested on leading ATS systems.',
              },
              {
                step: '02',
                title: 'Import Credentials',
                desc: 'Add publications, teaching records, hospital affiliations, or career milestones using our smart guided fields.',
              },
              {
                step: '03',
                title: 'Auto-Pagination Engine',
                desc: 'Our geometry engine dynamically balances margins and injects running headers to eliminate orphan line breaks.',
              },
              {
                step: '04',
                title: 'Export Vector PDF & Word',
                desc: 'Download 300 DPI vector PDF documents ready for university committees, search firms, and hospital boards.',
              },
            ].map((st) => (
              <div
                key={st.step}
                className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="text-2xl font-black text-blue-600 mb-3 tracking-tight">
                    {st.step}
                  </div>
                  <h3 className="font-bold text-base text-slate-900 mb-2">
                    {st.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. CURATED CV TEMPLATE ARCHETYPES */}
        <section className="py-16 sm:py-20 bg-white border-y border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-800 border border-slate-200 text-xs font-bold uppercase tracking-wider mb-4">
                  <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                  <span>Curated CV Archetypes</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  Tested Templates for Academic & Leadership Roles
                </h2>
              </div>
              <Link
                href="/templates"
                className="mt-4 md:mt-0 inline-flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-700 cursor-pointer"
              >
                <span>View All 150+ Templates</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {CV_TEMPLATES.map((tmpl) => (
                <div
                  key={tmpl.id}
                  className="bg-slate-50/70 rounded-2xl p-6 border border-slate-200/80 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full border ${tmpl.accent}`}>
                        {tmpl.badge}
                      </span>
                      <span className="text-[11px] font-bold text-slate-500">
                        {tmpl.pages}
                      </span>
                    </div>

                    <h3 className="font-bold text-base text-slate-900 mb-1">
                      {tmpl.name}
                    </h3>
                    <div className="text-xs font-semibold text-slate-500 mb-3">
                      {tmpl.category}
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      {tmpl.highlight}
                    </p>

                    <div className="text-[11px] text-slate-500 bg-white/80 p-2.5 rounded-xl border border-slate-200/60 mb-6">
                      <strong className="text-slate-700">Best for:</strong> {tmpl.idealFor}
                    </div>
                  </div>

                  <Link
                    href="/editor"
                    className="w-full py-2.5 rounded-xl text-center font-bold text-xs bg-slate-900 hover:bg-slate-800 text-white flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <span>Select This CV</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. GLOBAL COMPLIANCE GUARANTEE */}
        <section className="py-16 sm:py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-800 relative overflow-hidden">
            <div className="grid lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-7 space-y-4 text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-blue-300 border border-slate-700 text-xs font-bold uppercase">
                  <ShieldCheck className="w-4 h-4 text-blue-400" />
                  <span>Verified Global Standards</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight leading-snug">
                  Compliant with European Europass, UK, and North American Systems
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Different countries have strict legal guidelines regarding photographs, date of birth, marital status, and address disclosure. GetEasyCV automatically adjusts field visibility based on your target region.
                </p>
                <div className="space-y-2 pt-2 text-xs text-slate-200">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>European Union (Europass) format with optional photo & CEFR language levels</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>United Kingdom & Commonwealth standard (anti-discrimination compliant)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>US Academic Dossier standard with citations & grant funding</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 flex justify-center">
                <div className="p-6 rounded-2xl bg-slate-800/90 border border-slate-700 space-y-4 w-full text-center">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center mx-auto border border-blue-500/30">
                    <Award className="w-6 h-6" />
                  </div>
                  <div className="font-extrabold text-white text-base">
                    Ready to Apply Internationally?
                  </div>
                  <p className="text-xs text-slate-400">
                    Create a clean, multi-page international CV that satisfies every recruiter requirement.
                  </p>
                  <Link
                    href="/editor"
                    className="w-full py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-extrabold text-xs inline-flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                  >
                    <span>Start Free CV Build</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. CV BUILDER FAQS */}
        <FAQ
          items={CV_FAQS}
          badge="Curriculum Vitae FAQs"
          title="Curriculum Vitae"
          highlightText="Questions Answered"
          subtitle="Everything you need to know about building, formatting, and exporting an international CV."
          showContactCta={true}
          bgStyle="#F8F8F6"
        />

        {/* 8. CANONICAL READY TO BUILD CTA */}
        <ReadyToBuild
          title="Ready to Build Your Executive Curriculum Vitae?"
          subtitle="Format your academic research, medical fellowships, or global leadership history with zero layout friction."
          buttonText="Build My CV Free"
          buttonHref="/editor"
          secondaryButtonText="Browse 150+ CV Templates"
          secondaryButtonHref="/templates"
        />
      </main>

      <Footer />
    </>
  );
}
