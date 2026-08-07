'use client';

import React, { useMemo, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/Navigation';
import Footer from '@/components/layout/Footer';
import { TemplateRenderer } from '@/components/cv';
import { sampleCV } from '@/data/sampleCV';
import { GeneratedTemplate, generateTemplates, getTemplateStats } from '@/lib/generateTemplates';
import { generateOptimizedTemplatePreviewDataUri } from '@/lib/optimizedTemplatePreview';
import { useAuthStore } from '@/lib/store/authStore';
import { Plus, Eye } from 'lucide-react';

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
  const [scale, setScale] = useState(0.35);
  const containerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    const updateScale = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        const computed = width / 794;
        setScale(computed > 0 ? computed : 0.35);
      }
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [mounted]);

  return (
    <div
      ref={containerRef}
      className="relative aspect-[1/1.414] w-full overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-xs group-hover:border-teal-400/80 group-hover:shadow-md transition-all duration-300"
    >
      {mounted ? (
        <div
          className="absolute left-0 top-0 origin-top-left pointer-events-none select-none"
          style={{
            width: '794px',
            transform: `scale(${scale})`,
          }}
        >
          <TemplateRenderer template={template} data={sampleCV} scale={1} />
        </div>
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-slate-50 text-slate-400 text-xs font-semibold">
          Loading Preview...
        </div>
      )}
    </div>
  );
}

export default function TemplatesPage() {
  const router = useRouter();
  const { token, isAuthenticated } = useAuthStore();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<GeneratedTemplate | null>(null);
  const [addingId, setAddingId] = useState<string | null>(null);

  const templates = useMemo(() => generateTemplates(), []);
  const stats = useMemo(() => getTemplateStats(), []);

  const filteredTemplates = useMemo(() => {
    return templates.filter((template) => {
      const category = templateCategory(template);
      const matchesCategory = selectedCategory === 'All' || category === selectedCategory;
      const query = search.trim().toLowerCase();
      const matchesSearch =
        !query ||
        template.name.toLowerCase().includes(query) ||
        template.description.toLowerCase().includes(query) ||
        template.tags.some((tag) => tag.toLowerCase().includes(query)) ||
        template.layout.name.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [templates, selectedCategory, search]);

  const totalPages = Math.ceil(filteredTemplates.length / pageSize) || 1;
  const pagedTemplates = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredTemplates.slice(start, start + pageSize);
  }, [filteredTemplates, page]);

  useEffect(() => {
    setPage(1);
  }, [selectedCategory, search]);

  const handleUseTemplate = async (template: GeneratedTemplate) => {
    if (!isAuthenticated) {
      router.push(`/login?redirect=/editor?template=${template.id}`);
      return;
    }

    setAddingId(template.id);
    try {
      const res = await fetch('/api/resumes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          title: `${template.layout.name} Resume`,
          templateId: template.id,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        router.push(`/editor?id=${data.data.id}`);
      } else {
        router.push(`/editor?template=${template.id}`);
      }
    } catch (err) {
      console.error(err);
      router.push(`/editor?template=${template.id}`);
    } finally {
      setAddingId(null);
    }
  };

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,#ecfeff,#f8fafc_35%,#ffffff_70%)]">
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {/* Header block */}
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-3 py-1 text-xs font-bold text-teal-700 border border-teal-100 mb-3">
                <span>{stats.totalTemplates} Professional Templates</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-950">
                Choose a Template & Add to My Resumes
              </h1>
              <p className="mt-3 text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
                Select an ATS-optimized design. Click <strong className="text-slate-900">Use & Edit CV</strong> to create a resume in your <strong className="text-slate-900">/my-resumes</strong> dashboard and start editing immediately.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 text-[11px] font-bold text-slate-600">
              <span className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 shadow-xs">
                {stats.layouts} Layout Types
              </span>
              <span className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 shadow-xs">
                {stats.themes} Color Schemes
              </span>
              <span className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 shadow-xs">
                100% ATS Ready
              </span>
            </div>
          </div>

          {/* Filters & Search */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
            <div className="flex flex-wrap items-center gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-slate-950 text-white shadow-sm'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="w-full sm:w-72">
              <input
                type="text"
                placeholder="Search templates..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-2 text-xs font-medium text-slate-900 placeholder-slate-400 focus:border-teal-500 focus:outline-none transition-all"
              />
            </div>
          </div>

          {/* Grid */}
          {pagedTemplates.length === 0 ? (
            <div className="mt-12 rounded-3xl border border-dashed border-slate-200 bg-white p-12 text-center">
              <h2 className="text-xl font-bold text-slate-950">No templates found</h2>
              <p className="mt-2 text-xs text-slate-500">Try broad search or pick another category.</p>
            </div>
          ) : (
            <div className="mt-6 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {pagedTemplates.map((template) => (
                <article
                  key={template.id}
                  className="group rounded-2xl border border-slate-200/80 bg-white p-3 shadow-xs hover:shadow-md transition duration-300 flex flex-col justify-between"
                >
                  <div className="relative">
                    <TemplatePreview template={template} />
                    <div className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-0.5 text-[9px] font-bold text-slate-700 shadow-xs backdrop-blur uppercase tracking-wide">
                      {templateCategory(template)}
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setFavorites((prev) =>
                          prev.includes(template.id)
                            ? prev.filter((id) => id !== template.id)
                            : [...prev, template.id]
                        )
                      }
                      className={`absolute right-3 top-3 rounded-full p-1.5 text-xs font-semibold shadow-xs backdrop-blur transition-colors cursor-pointer ${
                        favorites.includes(template.id)
                          ? 'bg-amber-50 text-amber-500'
                          : 'bg-white/90 text-slate-400 hover:bg-white'
                      }`}
                    >
                      ★
                    </button>
                    {/* Hover actions */}
                    <div className="absolute inset-x-3 bottom-3 grid gap-1.5 opacity-0 translate-y-1 transition duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                      <button
                        type="button"
                        onClick={() => handleUseTemplate(template)}
                        disabled={addingId === template.id}
                        className="rounded-xl bg-slate-950 px-3 py-2 text-center text-xs font-bold text-white shadow-md hover:bg-slate-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5 text-teal-400" />
                        <span>{addingId === template.id ? 'Adding...' : 'Use & Edit CV'}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedTemplate(template)}
                        className="rounded-xl bg-white/95 px-3 py-2 text-center text-xs font-bold text-slate-900 shadow-md backdrop-blur hover:bg-white transition-colors cursor-pointer flex items-center justify-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5 text-slate-500" />
                        <span>Preview</span>
                      </button>
                    </div>
                  </div>

                  <div className="mt-3 flex flex-col justify-between flex-1">
                    <div>
                      <h2 className="line-clamp-1 text-sm font-bold text-slate-950">
                        {template.layout.name}
                      </h2>
                      <p className="mt-1 line-clamp-1 text-[11px] text-slate-500 font-medium">
                        {template.description}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-1 mt-2.5">
                      <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[9px] font-bold text-emerald-700 border border-emerald-200">
                        ✓ ATS Ready
                      </span>
                      <span className="rounded-full bg-violet-50 px-2.5 py-0.5 text-[9px] font-bold text-violet-700">
                        {template.theme.name}
                      </span>
                      <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[9px] font-bold text-slate-600">
                        {template.category}
                      </span>
                      {(template as any).isPremium ? (
                        <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[9px] font-bold text-amber-800">
                          PRO
                        </span>
                      ) : (
                        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[9px] font-bold text-slate-500">
                          FREE
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 disabled:opacity-40 cursor-pointer"
              >
                Previous
              </button>
              <span className="text-xs font-semibold text-slate-500 px-2">
                Page {page} of {totalPages}
              </span>
              <button
                type="button"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 disabled:opacity-40 cursor-pointer"
              >
                Next
              </button>
            </div>
          )}
        </section>

        {/* Template Detail Preview Modal */}
        {selectedTemplate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
            <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl border border-slate-100 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-950">{selectedTemplate.layout.name}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{selectedTemplate.description}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedTemplate(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                >
                  ✕
                </button>
              </div>

              <div className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50 p-4">
                <TemplatePreview template={selectedTemplate} />
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleUseTemplate(selectedTemplate)}
                  className="flex-1 rounded-xl bg-slate-950 py-3 text-center text-sm font-bold text-white shadow-md hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-teal-400" />
                  <span>Add to My Resumes & Edit</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedTemplate(null)}
                  className="px-5 py-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
