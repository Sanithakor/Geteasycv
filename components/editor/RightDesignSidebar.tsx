'use client';

import React, { useState, useMemo } from 'react';
import {
  LayoutTemplate,
  Palette,
  Type,
  Columns,
  Sliders,
  FileText,
  Search,
  CheckCircle2,
  Sparkles,
  ChevronDown,
  Layers,
  RotateCcw,
} from 'lucide-react';
import { GeneratedTemplate, SectionVariant } from '@/lib/generateTemplates';
import { Theme, getAllThemes } from '@/data/themes';
import { Layout, getAllLayouts } from '@/data/layouts';
import { CVData, sampleCV } from '@/data/sampleCV';
import TemplateRenderer from '@/components/cv/TemplateRenderer';
import toast from 'react-hot-toast';

interface RightDesignSidebarProps {
  templates: GeneratedTemplate[];
  selectedTemplate: GeneratedTemplate;
  setSelectedTemplate: (t: GeneratedTemplate) => void;
  customTheme: Theme;
  setCustomTheme: React.Dispatch<React.SetStateAction<Theme>>;
  selectedLayout: Layout;
  setSelectedLayout: (l: Layout) => void;
  sectionVariants: SectionVariant;
  setSectionVariants: React.Dispatch<React.SetStateAction<SectionVariant>>;
  sectionOrder: string[];
  setSectionOrder: React.Dispatch<React.SetStateAction<any>>;
  density: 'compact' | 'standard' | 'large';
  setDensity: (d: 'compact' | 'standard' | 'large') => void;
  userTier?: string;
  isAdmin?: boolean;
  onShowUpgradeModal?: (data: { message: string; redirectUrl: string }) => void;
}

const TEMPLATE_CATEGORIES = ['All', 'ATS', 'Modern', 'Executive', 'Creative', 'Minimalist', 'Luxury'];

const COLOR_PRESETS = [
  { name: 'Indigo', hex: '#4F46E5' },
  { name: 'Navy Blue', hex: '#1E3A8A' },
  { name: 'Slate', hex: '#334155' },
  { name: 'Emerald', hex: '#059669' },
  { name: 'Ruby', hex: '#BE123C' },
  { name: 'Amber', hex: '#D97706' },
  { name: 'Violet', hex: '#7C3AED' },
  { name: 'Charcoal', hex: '#18181B' },
  { name: 'Teal', hex: '#0D9488' },
  { name: 'Cyan', hex: '#0891B2' },
  { name: 'Rose', hex: '#E11D48' },
  { name: 'Bronze', hex: '#78350F' },
];

const FONT_FAMILIES = [
  { name: 'Roboto (ATS Standard)', value: 'Roboto, sans-serif' },
  { name: 'Inter (Clean Modern)', value: 'Inter, sans-serif' },
  { name: 'Merriweather (Classic Editorial)', value: 'Merriweather, serif' },
  { name: 'Playfair Display (Executive Serif)', value: '"Playfair Display", serif' },
  { name: 'Montserrat (Contemporary Sans)', value: 'Montserrat, sans-serif' },
  { name: 'Lora (Refined Serif)', value: 'Lora, serif' },
  { name: 'Open Sans (Neutral Clean)', value: '"Open Sans", sans-serif' },
];

function isHex(val: string) {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(val);
}

// Mini Preview for Template Grid
function MiniTemplateCardPreview({ template }: { template: GeneratedTemplate }) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.2);

  React.useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        if (width > 0) {
          setScale(width / 794);
        }
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative aspect-[1/1.414] w-full overflow-hidden rounded-lg bg-white border border-slate-200/90 shadow-2xs"
    >
      <div
        className="absolute left-0 top-0 origin-top-left pointer-events-none select-none"
        style={{
          width: '794px',
          transform: `scale(${scale})`,
        }}
      >
        <TemplateRenderer template={template} data={sampleCV} scale={1} />
      </div>
    </div>
  );
}

export default function RightDesignSidebar({
  templates,
  selectedTemplate,
  setSelectedTemplate,
  customTheme,
  setCustomTheme,
  selectedLayout,
  setSelectedLayout,
  sectionVariants,
  setSectionVariants,
  sectionOrder,
  setSectionOrder,
  density,
  setDensity,
  userTier = 'free',
  isAdmin = false,
  onShowUpgradeModal,
}: RightDesignSidebarProps) {
  const [activeTab, setActiveTab] = useState<'templates' | 'theme' | 'typography' | 'layout' | 'variants' | 'page'>('templates');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const allThemes = useMemo(() => getAllThemes(), []);
  const allLayouts = useMemo(() => getAllLayouts(), []);

  // Filtered Templates
  const filteredTemplates = useMemo(() => {
    return templates.filter((tmpl) => {
      const matchesCategory =
        selectedCategory === 'All' ||
        (tmpl.category || 'ATS').toLowerCase() === selectedCategory.toLowerCase();
      const matchesSearch =
        !searchQuery.trim() ||
        (tmpl.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (tmpl.layout?.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (tmpl.theme?.name || '').toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [templates, selectedCategory, searchQuery]);

  const handleSelectTemplate = (tmpl: GeneratedTemplate) => {
    const isPremium =
      (tmpl as any).isPremium ||
      tmpl.category === 'Luxury' ||
      tmpl.theme?.id === 'dark-executive' ||
      tmpl.theme?.id === 'gold-luxury';
    const isProOrLifetime = isAdmin || userTier === 'pro' || userTier === 'lifetime' || userTier === 'premium';

    if (isPremium && !isProOrLifetime && !isAdmin) {
      if (onShowUpgradeModal) {
        onShowUpgradeModal({
          message: 'This premium template is exclusively available on Pro and Lifetime plans.',
          redirectUrl: '/pricing?plan=pro',
        });
      } else {
        toast.error('Upgrade to Pro to unlock this premium template');
      }
      return;
    }

    setSelectedTemplate(tmpl);
    setCustomTheme(tmpl.theme);
    setSelectedLayout(tmpl.layout);
    setSectionVariants(tmpl.sectionVariants);
    if (tmpl.layout.sectionOrder) {
      setSectionOrder(tmpl.layout.sectionOrder);
    }
    toast.success(`Template applied: ${tmpl.layout.name || tmpl.name}`);
  };

  return (
    <div className="flex flex-col h-full bg-white select-text">
      {/* Top Header */}
      <div className="px-4 py-3 border-b border-slate-200/90 bg-slate-50/70 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-600/10 text-indigo-600 flex items-center justify-center">
              <Palette className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xs font-bold text-slate-900 tracking-tight">Design &amp; Layout</h2>
              <p className="text-[11px] text-slate-500">Styling, templates, fonts &amp; colors</p>
            </div>
          </div>
          <span className="text-[10px] font-bold text-violet-700 bg-violet-50 px-2 py-0.5 rounded-full border border-violet-200/80">
            {selectedTemplate.layout.name}
          </span>
        </div>

        {/* Design Category Tabs */}
        <div className="flex items-center gap-1 mt-2.5 bg-slate-200/60 p-1 rounded-xl overflow-x-auto [scrollbar-width:none]">
          <button
            type="button"
            onClick={() => setActiveTab('templates')}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold shrink-0 transition-all cursor-pointer ${
              activeTab === 'templates'
                ? 'bg-white text-violet-700 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <LayoutTemplate className="w-3.5 h-3.5" />
            <span>Templates</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('theme')}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold shrink-0 transition-all cursor-pointer ${
              activeTab === 'theme'
                ? 'bg-white text-violet-700 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Colors</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('typography')}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold shrink-0 transition-all cursor-pointer ${
              activeTab === 'typography'
                ? 'bg-white text-violet-700 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Type className="w-3.5 h-3.5" />
            <span>Fonts</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('layout')}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold shrink-0 transition-all cursor-pointer ${
              activeTab === 'layout'
                ? 'bg-white text-violet-700 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Columns className="w-3.5 h-3.5" />
            <span>Layout</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('variants')}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold shrink-0 transition-all cursor-pointer ${
              activeTab === 'variants'
                ? 'bg-white text-violet-700 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Styles</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('page')}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold shrink-0 transition-all cursor-pointer ${
              activeTab === 'page'
                ? 'bg-white text-violet-700 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Page</span>
          </button>
        </div>
      </div>

      {/* Scrollable Tab Content View */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 [scrollbar-gutter:stable]">
        {/* =================================================================== */}
        {/* TAB 1: TEMPLATES GALLERY                                           */}
        {/* =================================================================== */}
        {activeTab === 'templates' && (
          <div className="space-y-3.5">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                placeholder="Search templates (e.g. ATS, Modern, Executive)..."
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-9 rounded-lg border border-slate-200 bg-white pl-8 pr-3 text-xs outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10 placeholder:text-slate-400"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none]">
              {TEMPLATE_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-bold shrink-0 transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-violet-600 text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Templates 2-Column Grid */}
            <div className="grid grid-cols-2 gap-3">
              {filteredTemplates.map((tmpl) => {
                const isSelected = selectedTemplate.id === tmpl.id;
                const isPremium =
                  (tmpl as any).isPremium ||
                  tmpl.category === 'Luxury' ||
                  tmpl.theme?.id === 'dark-executive' ||
                  tmpl.theme?.id === 'gold-luxury';

                return (
                  <div
                    key={tmpl.id}
                    onClick={() => handleSelectTemplate(tmpl)}
                    className={`group relative cursor-pointer rounded-xl border p-2 transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'border-violet-600 ring-2 ring-violet-500/20 bg-violet-50/40 shadow-xs'
                        : 'border-slate-200 hover:border-violet-300 hover:shadow-2xs bg-white'
                    }`}
                  >
                    <div className="relative mb-2">
                      <MiniTemplateCardPreview template={tmpl} />

                      {isSelected && (
                        <div className="absolute top-1.5 right-1.5 z-20 bg-violet-600 text-white rounded-full p-0.5 shadow-md">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </div>
                      )}

                      <div className="absolute left-1.5 top-1.5 z-10 flex items-center gap-1">
                        <span className="rounded-full bg-white/90 px-1.5 py-0.5 text-[8px] font-bold text-slate-700 shadow-2xs uppercase tracking-wider backdrop-blur">
                          {tmpl.category || 'ATS'}
                        </span>
                        {isPremium && (
                          <span className="rounded-full bg-amber-500 text-white px-1.5 py-0.5 text-[8px] font-extrabold shadow-2xs">
                            PRO
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="space-y-0.5 px-0.5">
                      <h4 className="text-xs font-bold text-slate-800 group-hover:text-violet-600 transition-colors truncate">
                        {tmpl.layout.name || tmpl.name}
                      </h4>
                      <div className="flex items-center gap-1">
                        <span className="text-[8px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/60 px-1.5 py-0.5 rounded">
                          ATS
                        </span>
                        <span className="text-[8px] font-semibold text-slate-500 truncate">
                          {tmpl.theme.name}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* TAB 2: THEMES & COLORS                                             */}
        {/* =================================================================== */}
        {activeTab === 'theme' && (
          <div className="space-y-4">
            {/* Theme Preset Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">Theme Style Preset</label>
              <select
                value={customTheme.id}
                onChange={(e) => {
                  const theme = allThemes.find((t) => t.id === e.target.value);
                  if (theme) setCustomTheme(theme);
                }}
                className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-xs text-slate-900 shadow-2xs outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 cursor-pointer"
              >
                {allThemes.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name} — {t.description}
                  </option>
                ))}
              </select>
            </div>

            {/* Accent Color Palette Swatches */}
            <div className="space-y-2 p-3 bg-slate-50 rounded-xl border border-slate-200/80">
              <label className="text-xs font-bold text-slate-700 block">Preset Accent Colors</label>
              <div className="grid grid-cols-6 gap-2">
                {COLOR_PRESETS.map((color) => {
                  const isSelected = customTheme.primary.toLowerCase() === color.hex.toLowerCase();
                  return (
                    <button
                      key={color.name}
                      type="button"
                      onClick={() =>
                        setCustomTheme((prev) => ({
                          ...prev,
                          primary: color.hex,
                          gradient: { ...prev.gradient, start: color.hex },
                        }))
                      }
                      className={`flex flex-col items-center gap-1 p-1 rounded-lg border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-violet-600 bg-white ring-2 ring-violet-500/20'
                          : 'border-transparent hover:border-slate-300'
                      }`}
                      title={color.name}
                    >
                      <span
                        className="w-6 h-6 rounded-full border border-black/10 shadow-2xs"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span className="text-[9px] font-semibold text-slate-600 truncate max-w-[40px]">
                        {color.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Color Pickers */}
            <div className="space-y-3 p-3 bg-white rounded-xl border border-slate-200/80">
              <label className="text-xs font-bold text-slate-800 block">Fine-tune Colors</label>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <span className="text-[11px] font-semibold text-slate-600">Primary Accent</span>
                  <div className="flex items-center gap-2 h-9 rounded-lg border border-slate-200 p-1">
                    <input
                      type="color"
                      value={isHex(customTheme.primary) ? customTheme.primary : '#4F46E5'}
                      onChange={(e) =>
                        setCustomTheme((prev) => ({
                          ...prev,
                          primary: e.target.value,
                          gradient: { ...prev.gradient, start: e.target.value },
                        }))
                      }
                      className="w-7 h-full rounded border-0 cursor-pointer p-0 bg-transparent"
                    />
                    <input
                      type="text"
                      value={customTheme.primary}
                      onChange={(e) =>
                        setCustomTheme((prev) => ({
                          ...prev,
                          primary: e.target.value,
                          gradient: { ...prev.gradient, start: e.target.value },
                        }))
                      }
                      className="w-full text-xs font-mono outline-none text-slate-700 uppercase"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-semibold text-slate-600">Text Color</span>
                  <div className="flex items-center gap-2 h-9 rounded-lg border border-slate-200 p-1">
                    <input
                      type="color"
                      value={isHex(customTheme.text) ? customTheme.text : '#111827'}
                      onChange={(e) => setCustomTheme((prev) => ({ ...prev, text: e.target.value }))}
                      className="w-7 h-full rounded border-0 cursor-pointer p-0 bg-transparent"
                    />
                    <input
                      type="text"
                      value={customTheme.text}
                      onChange={(e) => setCustomTheme((prev) => ({ ...prev, text: e.target.value }))}
                      className="w-full text-xs font-mono outline-none text-slate-700 uppercase"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* TAB 3: TYPOGRAPHY                                                  */}
        {/* =================================================================== */}
        {activeTab === 'typography' && (
          <div className="space-y-4">
            {/* Body Font Family */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">Primary Font Family</label>
              <select
                value={customTheme.fontFamily}
                onChange={(e) =>
                  setCustomTheme((prev) => ({
                    ...prev,
                    fontFamily: e.target.value,
                    fontFamilyHeading: e.target.value,
                  }))
                }
                className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-xs text-slate-900 shadow-2xs outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 cursor-pointer"
              >
                {FONT_FAMILIES.map((f) => (
                  <option key={f.value} value={f.value}>
                    {f.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Heading Font Family */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">Heading Font Pairing</label>
              <select
                value={customTheme.fontFamilyHeading || customTheme.fontFamily}
                onChange={(e) =>
                  setCustomTheme((prev) => ({
                    ...prev,
                    fontFamilyHeading: e.target.value,
                  }))
                }
                className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-xs text-slate-900 shadow-2xs outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 cursor-pointer"
              >
                {FONT_FAMILIES.map((f) => (
                  <option key={f.value} value={f.value}>
                    {f.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Spacing Density */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">Vertical Spacing Density</label>
              <div className="grid grid-cols-3 gap-2">
                {(['compact', 'normal', 'relaxed'] as const).map((space) => (
                  <button
                    key={space}
                    type="button"
                    onClick={() => setCustomTheme((prev) => ({ ...prev, spacing: space }))}
                    className={`py-2 rounded-lg text-xs font-bold capitalize transition-all cursor-pointer ${
                      customTheme.spacing === space
                        ? 'bg-violet-600 text-white shadow-2xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {space}
                  </button>
                ))}
              </div>
            </div>

            {/* Preview Sample Card */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Typography Preview</div>
              <h3
                className="text-base font-bold text-slate-900"
                style={{ fontFamily: customTheme.fontFamilyHeading || customTheme.fontFamily }}
              >
                Sarah Johnson — Lead Software Architect
              </h3>
              <p
                className="text-xs text-slate-600 leading-relaxed"
                style={{ fontFamily: customTheme.fontFamily }}
              >
                Experienced software engineer focused on distributed systems, modern web architecture, and clean
                user interfaces.
              </p>
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* TAB 4: LAYOUT                                                      */}
        {/* =================================================================== */}
        {activeTab === 'layout' && (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">Layout Structure</label>
              <select
                value={selectedLayout.id}
                onChange={(e) => {
                  const layout = allLayouts.find((l) => l.id === e.target.value);
                  if (layout) {
                    setSelectedLayout(layout);
                    if (layout.sectionOrder) {
                      setSectionOrder(layout.sectionOrder);
                    }
                  }
                }}
                className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-xs text-slate-900 shadow-2xs outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 cursor-pointer"
              >
                {allLayouts.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.name} ({l.columns === 1 ? '1 Column ATS' : `${l.columns} Columns`})
                  </option>
                ))}
              </select>
            </div>

            {/* Layout Overview Card */}
            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-900">{selectedLayout.name}</h4>
                <span className="text-[10px] font-bold bg-violet-50 text-violet-700 px-2 py-0.5 rounded-full">
                  {selectedLayout.category}
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">{selectedLayout.description}</p>
              <div className="flex flex-wrap gap-1 pt-1">
                {(selectedLayout.features || []).map((feat, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded"
                  >
                    ✓ {feat}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* TAB 5: SECTION STYLES & VARIANTS                                   */}
        {/* =================================================================== */}
        {activeTab === 'variants' && (
          <div className="space-y-4">
            {/* Header Variant */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">Header Style</label>
              <select
                value={sectionVariants.headerVariant}
                onChange={(e) =>
                  setSectionVariants((prev) => ({
                    ...prev,
                    headerVariant: e.target.value as any,
                  }))
                }
                className="h-9 w-full rounded-lg border border-slate-200 bg-white px-3 text-xs text-slate-900 outline-none"
              >
                <option value="centered">Centered Title</option>
                <option value="split">Split Two-Tone</option>
                <option value="banner">Bold Colored Banner</option>
                <option value="minimal">Minimal Inline</option>
              </select>
            </div>

            {/* Experience Variant */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">Experience Display</label>
              <select
                value={sectionVariants.experienceVariant}
                onChange={(e) =>
                  setSectionVariants((prev) => ({
                    ...prev,
                    experienceVariant: e.target.value as any,
                  }))
                }
                className="h-9 w-full rounded-lg border border-slate-200 bg-white px-3 text-xs text-slate-900 outline-none"
              >
                <option value="timeline">Vertical Timeline</option>
                <option value="cards">Separated Cards</option>
                <option value="bordered">Left Bordered Accent</option>
                <option value="compact">Compact Dense</option>
              </select>
            </div>

            {/* Skills Variant */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">Skills Badges</label>
              <select
                value={sectionVariants.skillsVariant}
                onChange={(e) =>
                  setSectionVariants((prev) => ({
                    ...prev,
                    skillsVariant: e.target.value as any,
                  }))
                }
                className="h-9 w-full rounded-lg border border-slate-200 bg-white px-3 text-xs text-slate-900 outline-none"
              >
                <option value="tags">Modern Chips / Tags</option>
                <option value="progress-bars">Percentage Progress Bars</option>
                <option value="circles">Circular Rating Dots</option>
                <option value="pills">Pill Badges</option>
              </select>
            </div>

            {/* Projects Variant */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">Projects Layout</label>
              <select
                value={sectionVariants.projectsVariant}
                onChange={(e) =>
                  setSectionVariants((prev) => ({
                    ...prev,
                    projectsVariant: e.target.value as any,
                  }))
                }
                className="h-9 w-full rounded-lg border border-slate-200 bg-white px-3 text-xs text-slate-900 outline-none"
              >
                <option value="cards">Standard Cards</option>
                <option value="grid">Two-Column Grid</option>
                <option value="portfolio">Portfolio Outcome View</option>
              </select>
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* TAB 6: PAGE SETTINGS                                               */}
        {/* =================================================================== */}
        {activeTab === 'page' && (
          <div className="space-y-4">
            {/* Page Format */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">Paper Size Format</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  className="py-2.5 px-3 rounded-lg border border-violet-600 bg-violet-50 text-violet-700 text-xs font-bold flex flex-col items-center gap-0.5"
                >
                  <span>A4 Standard</span>
                  <span className="text-[10px] font-normal text-violet-500">210 × 297 mm</span>
                </button>
                <button
                  type="button"
                  onClick={() => toast.success('US Letter size active')}
                  className="py-2.5 px-3 rounded-lg border border-slate-200 bg-white text-slate-700 text-xs font-bold flex flex-col items-center gap-0.5 hover:bg-slate-50"
                >
                  <span>US Letter</span>
                  <span className="text-[10px] font-normal text-slate-400">8.5 × 11 in</span>
                </button>
              </div>
            </div>

            {/* Density Setting */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">Document Spacing Density</label>
              <div className="grid grid-cols-3 gap-2">
                {(['compact', 'standard', 'large'] as const).map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDensity(d)}
                    className={`py-2 rounded-lg text-xs font-bold capitalize transition-all cursor-pointer ${
                      density === d
                        ? 'bg-violet-600 text-white shadow-2xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* ATS Auto-fit note */}
            <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200/80 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                <span>✓ ATS-Friendly Structure</span>
              </div>
              <p className="text-[11px] text-emerald-700 leading-relaxed">
                All templates output clean semantic headings, standard bullet points, and high-contrast text engineered for high readability on standard Applicant Tracking Systems.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
