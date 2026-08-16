'use client';

/**
 * TemplatePicker — full template library panel with category filter (FR1.1–FR1.6)
 * Renders inside the editor's left sidebar "Templates" tab.
 */

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { CheckCircle2, Search, Star, Download, Zap, Crown } from 'lucide-react';
import { TemplateRenderer } from '@/components/cv';
import { sampleCV } from '@/data/sampleCV';
import type { GeneratedTemplate } from '@/lib/generateTemplates';
import toast from 'react-hot-toast';

const CATEGORIES = ['All', 'Traditional', 'Modern', 'Creative', 'Professional', 'Luxury'];

interface TemplatePickerProps {
  templates: GeneratedTemplate[];
  selectedTemplateId: string;
  onSelectTemplate: (template: GeneratedTemplate) => void;
  userTier?: 'free' | 'pro' | 'premium';
}

// Tiny thumbnail that renders the actual template (FR1.1, FR6.6)
function TemplateThumbnail({ template }: { template: GeneratedTemplate }) {
  const [mounted, setMounted] = useState(false);
  const [scale, setScale] = useState(0.19);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted || !containerRef.current) return;
    const calc = () => {
      const w = containerRef.current?.clientWidth ?? 0;
      setScale(w > 0 ? w / 794 : 0.19);
    };
    calc();
    const ro = new ResizeObserver(calc);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [mounted]);

  return (
    <div
      ref={containerRef}
      className="relative aspect-[1/1.414] w-full overflow-hidden rounded-lg bg-white border border-slate-200/80"
    >
      {mounted ? (
        <div
          className="absolute left-0 top-0 origin-top-left pointer-events-none select-none"
          style={{ width: '794px', transform: `scale(${scale})` }}
        >
          <TemplateRenderer template={template} data={sampleCV} scale={1} />
        </div>
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-slate-50">
          <div className="w-6 h-6 rounded-full border-2 border-violet-300 border-t-violet-600 animate-spin" />
        </div>
      )}
    </div>
  );
}

// Determine if a template is "premium" based on layout category
function isPremiumTemplate(template: GeneratedTemplate): boolean {
  return (
    template.category === 'Luxury' ||
    template.theme.id === 'dark-executive' ||
    template.theme.id === 'gold-luxury'
  );
}

const TemplatePicker: React.FC<TemplatePickerProps> = ({
  templates,
  selectedTemplateId,
  onSelectTemplate,
  userTier = 'free',
}) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    let list = templates;
    if (activeCategory !== 'All') {
      list = list.filter((t) => t.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.layout.name.toLowerCase().includes(q) ||
          t.theme.name.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q)
      );
    }
    return list;
  }, [templates, activeCategory, search]);

  const handleSelect = (template: GeneratedTemplate) => {
    const premium = isPremiumTemplate(template);
    if (premium && userTier === 'free') {
      toast.error('Upgrade to Pro to use premium templates');
      return;
    }
    onSelectTemplate(template);
    toast.success(`Template "${template.layout.name}" loaded`);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Search */}
      <div className="px-3 pt-3 pb-2">
        <div className="relative">
          <Search
            className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none"
            aria-hidden="true"
          />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search templates…"
            aria-label="Search templates"
            className="w-full h-8 pl-8 pr-3 rounded-lg border border-slate-200 bg-slate-50 text-[11px] text-slate-800 outline-none focus:border-violet-400 focus:ring-1 focus:ring-violet-300 transition-all"
          />
        </div>
      </div>

      {/* Category filter (FR1.5) */}
      <div className="px-3 pb-2 flex gap-1.5 overflow-x-auto no-scrollbar">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            aria-pressed={activeCategory === cat}
            className={`shrink-0 px-2.5 py-1 rounded-full text-[10px] font-bold transition-all cursor-pointer ${
              activeCategory === cat
                ? 'bg-violet-600 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-600 hover:border-violet-300 hover:text-violet-600'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Count */}
      <div className="px-4 pb-2 flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
          {filtered.length} template{filtered.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Template grid */}
      <div className="flex-1 overflow-y-auto px-3 pb-6">
        {filtered.length === 0 ? (
          <div className="py-10 text-center text-xs text-slate-400">
            No templates match your search.
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filtered.map((tmpl) => {
              const isSelected = selectedTemplateId === tmpl.id;
              const premium = isPremiumTemplate(tmpl);
              const locked = premium && userTier === 'free';

              return (
                <div
                  key={tmpl.id}
                  onClick={() => handleSelect(tmpl)}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isSelected}
                  aria-label={`Select ${tmpl.layout.name} template`}
                  onKeyDown={(e) => e.key === 'Enter' && handleSelect(tmpl)}
                  className={`
                    relative cursor-pointer rounded-xl border p-2 transition-all duration-150
                    focus:outline-none focus:ring-2 focus:ring-violet-500
                    ${
                      isSelected
                        ? 'border-violet-600 ring-2 ring-violet-500/25 bg-violet-50/40 shadow-sm'
                        : 'border-slate-200 hover:border-violet-300 hover:shadow-sm bg-white'
                    }
                    ${locked ? 'opacity-75' : ''}
                  `}
                >
                  {/* Thumbnail */}
                  <div className="relative mb-2">
                    <TemplateThumbnail template={tmpl} />

                    {/* Selected badge */}
                    {isSelected && (
                      <div className="absolute top-1.5 right-1.5 z-20 bg-violet-600 text-white rounded-full p-0.5 shadow">
                        <CheckCircle2 className="w-3 h-3" aria-hidden="true" />
                      </div>
                    )}

                    {/* Category tag */}
                    <div className="absolute left-1.5 top-1.5 z-10 rounded-full bg-white/90 px-1.5 py-0.5 text-[7px] font-bold text-slate-700 shadow-sm uppercase tracking-wider">
                      {tmpl.category}
                    </div>

                    {/* Premium lock overlay (BR1) */}
                    {locked && (
                      <div className="absolute inset-0 z-10 bg-slate-900/40 rounded-lg flex items-center justify-center">
                        <div className="bg-white rounded-full px-2 py-1 flex items-center gap-1 shadow-lg">
                          <Crown className="w-3 h-3 text-amber-500" aria-hidden="true" />
                          <span className="text-[8px] font-bold text-slate-700">PRO</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Card info */}
                  <div className="space-y-1 px-0.5">
                    <h4 className="text-[10px] font-bold text-slate-900 line-clamp-1 group-hover:text-violet-700">
                      {tmpl.layout.name}
                    </h4>
                    <div className="flex flex-wrap items-center gap-1">
                      {/* ATS badge (FR1.6) */}
                      {selectedTemplateId === tmpl.id || tmpl.layout.features?.includes('ATS-friendly') ? (
                        <span className="text-[7px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/60 px-1 py-0.5 rounded flex items-center gap-0.5">
                          <Zap className="w-2 h-2" aria-hidden="true" /> ATS
                        </span>
                      ) : null}
                      {/* Theme name (FR1.6) */}
                      <span className="text-[7px] font-bold bg-violet-50 text-violet-700 px-1 py-0.5 rounded truncate max-w-[55px]">
                        {tmpl.theme.name}
                      </span>
                      {/* Premium / Free badge (FR1.6 — isPremium status) */}
                      {premium ? (
                        <span className="text-[7px] font-bold bg-amber-50 text-amber-700 border border-amber-200/60 px-1 py-0.5 rounded flex items-center gap-0.5">
                          <Crown className="w-2 h-2" aria-hidden="true" /> PRO
                        </span>
                      ) : (
                        <span className="text-[7px] font-bold bg-slate-100 text-slate-500 px-1 py-0.5 rounded">
                          FREE
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplatePicker;
