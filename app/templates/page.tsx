'use client';

import React, { useMemo, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { TemplateRenderer } from '@/components/cv';
import { sampleCV } from '@/data/sampleCV';
import { GeneratedTemplate, generateTemplates, getTemplateStats } from '@/lib/generateTemplates';
import { generateOptimizedTemplatePreview } from '@/lib/optimizedTemplatePreview';

const pageSize = 12;
const categories = ['All', 'ATS Friendly', 'Creative', 'Modern', 'Executive', 'Minimal'];

function templateCategory(template: GeneratedTemplate) {
  const text = `${template.name} ${template.category} ${template.layout.name}`.toLowerCase();
  if (text.includes('ats') || text.includes('compact')) return 'ATS Friendly';
  if (text.includes('creative') || text.includes('portfolio') || text.includes('magazine') || text.includes('bento')) return 'Creative';
  if (text.includes('executive') || text.includes('luxury') || text.includes('dark')) return 'Executive';
  if (text.includes('minimal') || text.includes('single column')) return 'Minimal';
  return 'Modern';
}

function TemplatePreview({ template }: { template: GeneratedTemplate }) {
  const [mounted, setMounted] = useState(false);
  const [scale, setScale] = useState(0.28);
  const containerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    const handleResize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        // Calculate scale factor relative to 800px width canvas
        setScale(rect.width / 800);
      }
    };

    handleResize();
    const observer = new ResizeObserver(handleResize);
    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [mounted]);

  return (
    <div 
      ref={containerRef}
      className="relative aspect-[3/4] overflow-hidden rounded-xl bg-slate-50 border border-slate-200/80 flex items-start justify-center"
    >
      {mounted && (
        <div 
          className="absolute top-0 origin-top transition-transform duration-300 group-hover:translate-y-[-2%]"
          style={{ 
            width: 800, 
            transform: `scale(${scale})` 
          }}
        >
          <TemplateRenderer template={template} data={sampleCV} scale={1} />
        </div>
      )}
    </div>
  );
}


const StepIndicator = ({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) => {
  return (
    <div className="flex items-center space-x-3">
      <span className="text-sm font-medium text-slate-600 whitespace-nowrap">Step {currentStep} of {totalSteps}</span>
      <div className="w-24 bg-slate-200 rounded-full h-2 flex-shrink-0">
        <div 
          className="bg-violet-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>
    </div>
  );
};

const StepsGuide = () => {
  const steps = [
    { number: 1, title: "Browse Templates", description: "Explore our collection of professionally designed resume templates", icon: "🎨" },
    { number: 2, title: "Choose Your Style", description: "Select a template that matches your industry and personal brand", icon: "✨" },
    { number: 3, title: "Customize Content", description: "Use our editor to add your experience, education, and skills", icon: "✏️" },
    { number: 4, title: "Download & Apply", description: "Export your resume as PDF or image and start applying to jobs", icon: "📁" }
  ];

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/60 p-4 shadow-sm mt-6">
      <h3 className="text-sm font-bold text-slate-950 mb-3 flex items-center gap-2">
        <span>✨</span> How to Create Your Resume in 4 Easy Steps
      </h3>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step) => (
          <div key={step.number} className="flex items-start space-x-3 bg-white/50 p-2.5 rounded-xl border border-slate-100">
            <div className="flex-shrink-0 w-8 h-8 bg-violet-100 rounded-lg flex items-center justify-center text-sm font-bold text-violet-700">
              {step.icon}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold text-slate-900 leading-none mb-1">{step.number}. {step.title}</h4>
              <p className="text-[10px] text-slate-500 leading-normal line-clamp-2">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function TemplatesPage() {
  const templates = useMemo(() => generateTemplates(), []);
  const stats = useMemo(() => getTemplateStats(), []);
  const [selectedTemplate, setSelectedTemplate] = useState<GeneratedTemplate | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const filteredTemplates = useMemo(() => {
    const query = search.trim().toLowerCase();
    return templates.filter((template) => {
      const categoryMatch = activeCategory === 'All' || templateCategory(template) === activeCategory;
      const searchMatch = !query || `${template.name} ${template.description} ${template.category} ${template.layout.name} ${template.theme.name}`.toLowerCase().includes(query);
      return categoryMatch && searchMatch;
    });
  }, [activeCategory, search, templates]);

  const totalPages = Math.max(1, Math.ceil(filteredTemplates.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pagedTemplates = filteredTemplates.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const setFilter = (category: string) => {
    setIsLoading(true);
    setActiveCategory(category);
    setPage(1);
    // Simulate loading for smooth UX
    setTimeout(() => setIsLoading(false), 200);
  };

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,#ecfeff,#f8fafc_35%,#ffffff_70%)]">
        <section className="mx-auto max-w-[1800px] px-4 py-6 sm:py-8">
          {/* Full-width header block */}
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-4xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-700">Template gallery</p>
              <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
                Choose a polished resume template that fits your next role.
              </h1>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Browse {stats.totalTemplates} template combinations with live previews, role-focused categories, and export-ready layouts.
              </p>
            </div>
            
            {/* Search widget on right */}
            <div className="w-full max-w-md shrink-0 rounded-2xl border border-white/80 bg-white/80 p-3 shadow-md shadow-slate-200/50 backdrop-blur">
              <label className="text-xs font-bold text-slate-700" htmlFor="template-search">Search templates</label>
              <input
                id="template-search"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setPage(1);
                }}
                placeholder="Search ATS, creative, modern, executive..."
                className="mt-1.5 h-10 w-full max-w-full rounded-xl border border-slate-200 bg-white px-3 text-xs outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
              />
            </div>
          </div>

          {/* Horizontal steps guide */}
          <StepsGuide />

          <div className="mt-8 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setFilter(category)}
                disabled={isLoading}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                  activeCategory === category
                    ? 'bg-slate-950 text-white shadow-lg shadow-slate-200'
                    : 'bg-white/80 text-slate-600 ring-1 ring-slate-200 hover:bg-white hover:text-slate-950 hover:shadow-md'
                } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-500">
              Showing <span className="font-semibold text-slate-950">{pagedTemplates.length}</span> of <span className="font-semibold text-slate-950">{filteredTemplates.length}</span> templates
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setSearch('');
                  setFilter('All');
                }}
                className="self-start rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 sm:self-auto"
              >
                Reset filters
              </button>
              {favorites.length > 0 && (
                <button
                  type="button"
                  onClick={() => setFilter('Favorites')}
                  className="self-start rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700 hover:bg-amber-100 sm:self-auto"
                >
                  Saved ({favorites.length})
                </button>
              )}
            </div>
          </div>

          {isLoading ? (
            <div className="mt-8 flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-600"></div>
            </div>
          ) : pagedTemplates.length === 0 ? (
            <div className="mt-8 rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">
              <div className="mx-auto w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-slate-950">No templates found</h2>
              <p className="mt-2 text-slate-500">Try a broader search or choose another category.</p>
            </div>
          ) : (
            <div className="mt-6 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
              {pagedTemplates.map((template) => (
                <article key={template.id} className="group rounded-xl border border-slate-200/80 bg-white p-2.5 shadow-sm hover:shadow-md transition duration-300 flex flex-col justify-between">
                  <div className="relative">
                    <TemplatePreview template={template} />
                    <div className="absolute left-3 top-3 rounded-full bg-white/90 px-2 py-0.5 text-[9px] font-bold text-slate-700 shadow-sm backdrop-blur uppercase tracking-wide">
                      {templateCategory(template)}
                    </div>
                    <button
                      type="button"
                      onClick={() => setFavorites((prev) => prev.includes(template.id) ? prev.filter((id) => id !== template.id) : [...prev, template.id])}
                      className={`absolute right-3 top-3 rounded-full p-1.5 text-xs font-semibold shadow-sm backdrop-blur transition-colors shrink-0 cursor-pointer ${
                        favorites.includes(template.id) ? 'bg-amber-50 text-amber-500 hover:bg-amber-100' : 'bg-white/90 text-slate-400 hover:bg-white'
                      }`}
                    >
                      ★
                    </button>
                    {/* Hover actions overlay */}
                    <div className="absolute inset-x-3 bottom-3 grid gap-1.5 opacity-0 translate-y-1 transition duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                      <Link href={`/editor?template=${template.id}`} className="rounded-lg bg-slate-950 px-3 py-2 text-center text-xs font-bold text-white shadow-md hover:bg-slate-800 transition-colors">
                        Use Template
                      </Link>
                      <button type="button" onClick={() => setSelectedTemplate(template)} className="rounded-lg bg-white/95 px-3 py-2 text-center text-xs font-bold text-slate-900 shadow-md backdrop-blur hover:bg-white transition-colors cursor-pointer">
                        Preview
                      </button>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-col justify-between flex-1">
                    <div>
                      <h2 className="line-clamp-1 text-xs font-bold text-slate-950">{template.layout.name}</h2>
                      <p className="mt-1 line-clamp-1 text-[10px] text-slate-500 font-medium">{template.description}</p>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      <span className="rounded-full bg-violet-50 px-2 py-0.5 text-[9px] font-bold text-violet-700">{template.theme.name}</span>
                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[9px] font-bold text-slate-600">{template.category}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => setPage((value) => Math.max(1, value - 1))}
                disabled={currentPage === 1}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 disabled:cursor-not-allowed disabled:opacity-40 hover:bg-slate-50 transition-colors"
              >
                Previous
              </button>
              {Array.from({ length: Math.min(totalPages, 5) }, (_, index) => {
                const pageNumber = currentPage <= 3 ? index + 1 : 
                  currentPage >= totalPages - 2 ? totalPages - 4 + index : 
                  currentPage - 2 + index;
                if (pageNumber < 1 || pageNumber > totalPages) return null;
                return (
                  <button
                    key={pageNumber}
                    type="button"
                    onClick={() => setPage(pageNumber)}
                    className={`grid h-10 w-10 place-items-center rounded-full text-sm font-semibold transition-colors ${
                      currentPage === pageNumber ? 'bg-slate-950 text-white' : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              })}
              <button
                type="button"
                onClick={() => setPage((value) => Math.min(totalPages, value + 1))}
                disabled={currentPage === totalPages}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 disabled:cursor-not-allowed disabled:opacity-40 hover:bg-slate-50 transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </section>

        {selectedTemplate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur animate-in fade-in duration-300" onClick={() => setSelectedTemplate(null)}>
            <div className="max-h-[92vh] w-full max-w-6xl overflow-hidden rounded-3xl bg-white shadow-2xl animate-in slide-in-from-bottom-4 duration-300" onClick={(event) => event.stopPropagation()}>
              <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-slate-950">{selectedTemplate.name}</h2>
                  <p className="mt-1 text-sm text-slate-500">{selectedTemplate.description}</p>
                </div>
                <button type="button" onClick={() => setSelectedTemplate(null)} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
                  Close
                </button>
              </div>
              <div className="max-h-[68vh] overflow-auto bg-slate-100 p-6">
                <div className="mx-auto w-[920px] origin-top scale-[0.75] shadow-2xl rounded-lg overflow-hidden">
                  <TemplateRenderer template={selectedTemplate} data={sampleCV} scale={1} />
                </div>
              </div>
              <div className="flex justify-between items-center border-t border-slate-100 p-5">
                <button
                  type="button"
                  onClick={() => setFavorites((prev) => prev.includes(selectedTemplate.id) ? prev.filter((id) => id !== selectedTemplate.id) : [...prev, selectedTemplate.id])}
                  className={`rounded-2xl px-5 py-3 text-sm font-semibold transition-colors ${
                    favorites.includes(selectedTemplate.id) 
                      ? 'bg-amber-100 text-amber-700 hover:bg-amber-200' 
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {favorites.includes(selectedTemplate.id) ? '💾 Saved' : '💾 Save Template'}
                </button>
                <Link href={`/editor?template=${selectedTemplate.id}`} className="rounded-2xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-100 hover:bg-violet-700 transition-colors">
                  Use this template
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
