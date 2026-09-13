'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  LayoutTemplate,
  Palette,
  Type,
  Columns,
  Search,
  CheckCircle2,
  Sparkles,
  ChevronDown,
  ChevronUp,
  ZoomIn,
  ZoomOut,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Eye,
} from 'lucide-react';
import { GeneratedTemplate, SectionVariant } from '@/lib/generateTemplates';
import { Theme, getAllThemes } from '@/data/themes';
import { Layout, getAllLayouts } from '@/data/layouts';
import { CVData, sampleCV } from '@/data/sampleCV';
import { TemplateRenderer } from '@/components/cv';
import A4MultiPageContainer from '@/components/cv/A4MultiPageContainer';
import toast from 'react-hot-toast';

interface RightWorkspaceAreaProps {
  // Template & Customization State
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

  // Preview State
  customTemplate: GeneratedTemplate;
  visibleData: CVData;
  scale: number;
  setScale: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  setTotalPages: React.Dispatch<React.SetStateAction<number>>;
  cvContentRef: React.RefObject<HTMLDivElement | null>;
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

// Mini Template Thumbnail Component
function MiniTemplateCardPreview({ template }: { template: GeneratedTemplate }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.2);

  useEffect(() => {
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

export default function RightWorkspaceArea({
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
  customTemplate,
  visibleData,
  scale,
  setScale,
  currentPage,
  setCurrentPage,
  totalPages,
  setTotalPages,
  cvContentRef,
}: RightWorkspaceAreaProps) {
  const [controlsExpanded, setControlsExpanded] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'templates' | 'theme' | 'typography' | 'layout'>('templates');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const previewContainerRef = useRef<HTMLDivElement>(null);

  const allThemes = useMemo(() => getAllThemes(), []);
  const allLayouts = useMemo(() => getAllLayouts(), []);

  // Filtered templates
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

  // Handle template selection
  const handleSelectTemplate = (tmpl: GeneratedTemplate) => {
    setSelectedTemplate(tmpl);
    setCustomTheme(tmpl.theme);
    setSelectedLayout(tmpl.layout);
    setSectionVariants(tmpl.sectionVariants);
    toast.success(`Applied template: ${tmpl.name}`);
  };

  // Zoom handlers
  const handleAutoFit = () => {
    if (!previewContainerRef.current) return;
    const containerWidth = previewContainerRef.current.clientWidth - 48;
    const a4Width = 794;
    const newScale = Math.min(1.2, Math.max(0.35, Number((containerWidth / a4Width).toFixed(2))));
    setScale(newScale);
  };

  const handleZoomIn = () => {
    setScale((prev) => Math.min(1.8, Number((prev + 0.1).toFixed(2))));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(0.35, Number((prev - 0.1).toFixed(2))));
  };

  return (
    <div className="flex flex-col h-full w-full bg-slate-100/90 border-l border-slate-200/90 overflow-hidden relative">
      {/* 1. TOP CUSTOMIZATION & TEMPLATE PANEL */}
      <div className="shrink-0 bg-white border-b border-slate-200 shadow-2xs z-20 transition-all duration-200">
        {/* Header Control Tabs */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-slate-100">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <button
              type="button"
              onClick={() => {
                setActiveTab('templates');
                setControlsExpanded(true);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                controlsExpanded && activeTab === 'templates'
                  ? 'bg-violet-50 text-violet-700 font-bold border border-violet-200/80 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <LayoutTemplate className="w-3.5 h-3.5" />
              <span>Templates</span>
              <span className="text-[10px] bg-violet-100 text-violet-700 px-1.5 py-0.2 rounded-full font-bold">
                {templates.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('theme');
                setControlsExpanded(true);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                controlsExpanded && activeTab === 'theme'
                  ? 'bg-violet-50 text-violet-700 font-bold border border-violet-200/80 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Colors</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('typography');
                setControlsExpanded(true);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                controlsExpanded && activeTab === 'typography'
                  ? 'bg-violet-50 text-violet-700 font-bold border border-violet-200/80 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Type className="w-3.5 h-3.5" />
              <span>Fonts</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('layout');
                setControlsExpanded(true);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                controlsExpanded && activeTab === 'layout'
                  ? 'bg-violet-50 text-violet-700 font-bold border border-violet-200/80 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Columns className="w-3.5 h-3.5" />
              <span>Layout</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => setControlsExpanded(!controlsExpanded)}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer shrink-0 ml-2"
            title={controlsExpanded ? 'Collapse design options panel' : 'Expand design options panel'}
          >
            {controlsExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {/* Expandable Options Drawer */}
        {controlsExpanded && (
          <div className="max-h-[260px] overflow-y-auto p-4 bg-slate-50/50 border-b border-slate-200/60 transition-all">
            {/* TAB 1: TEMPLATES */}
            {activeTab === 'templates' && (
              <div className="space-y-3">
                {/* Category Pills & Search */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
                    {TEMPLATE_CATEGORIES.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                          selectedCategory === cat
                            ? 'bg-violet-600 text-white font-bold'
                            : 'bg-white text-slate-600 hover:bg-slate-200/70 border border-slate-200/80'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                  <div className="relative shrink-0">
                    <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search templates..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-8 pr-3 py-1 bg-white border border-slate-200 rounded-md text-[11px] focus:outline-none focus:ring-1 focus:ring-violet-500 w-full sm:w-36"
                    />
                  </div>
                </div>

                {/* Templates Horizontal Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
                  {filteredTemplates.map((tmpl) => {
                    const isSelected = selectedTemplate.id === tmpl.id;
                    const isPremium = tmpl.isPremium || tmpl.category === 'Luxury';
                    return (
                      <button
                        key={tmpl.id}
                        type="button"
                        onClick={() => handleSelectTemplate(tmpl)}
                        className={`group relative text-left rounded-xl border-2 p-1.5 bg-white transition-all cursor-pointer ${
                          isSelected
                            ? 'border-violet-600 ring-2 ring-violet-500/20 shadow-md'
                            : 'border-slate-200 hover:border-slate-300 hover:shadow-xs'
                        }`}
                      >
                        <MiniTemplateCardPreview template={tmpl} />
                        <div className="mt-1.5 flex items-center justify-between px-0.5">
                          <span className="text-[11px] font-bold text-slate-800 truncate">{tmpl.name}</span>
                          {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-violet-600 shrink-0" />}
                        </div>
                        {isPremium && (
                          <span className="absolute top-2 right-2 px-1.5 py-0.5 bg-amber-500 text-white font-black text-[9px] rounded-md shadow-xs flex items-center gap-0.5">
                            <Sparkles className="w-2.5 h-2.5" /> PRO
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 2: COLORS & THEME */}
            {activeTab === 'theme' && (
              <div className="space-y-4">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-2">
                    Preset Theme Colors
                  </label>
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                    {COLOR_PRESETS.map((preset) => {
                      const isActive = customTheme.primary?.toLowerCase() === preset.hex.toLowerCase();
                      return (
                        <button
                          key={preset.name}
                          type="button"
                          onClick={() => {
                            setCustomTheme((prev) => ({ ...prev, primary: preset.hex }));
                            toast.success(`Theme updated to ${preset.name}`);
                          }}
                          className={`flex items-center gap-2 p-1.5 rounded-lg border bg-white text-left transition-all cursor-pointer ${
                            isActive ? 'border-violet-600 ring-2 ring-violet-500/20 font-bold' : 'border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <span
                            className="w-4 h-4 rounded-full border border-black/10 shrink-0"
                            style={{ backgroundColor: preset.hex }}
                          />
                          <span className="text-[10px] text-slate-700 truncate font-medium">{preset.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Custom Color Input */}
                <div className="flex items-center gap-3 pt-2 border-t border-slate-200/80">
                  <label className="text-[11px] font-bold text-slate-700 shrink-0">Custom Primary Hex:</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={customTheme.primary || '#4F46E5'}
                      onChange={(e) => setCustomTheme((prev) => ({ ...prev, primary: e.target.value }))}
                      className="w-7 h-7 rounded border border-slate-300 cursor-pointer p-0.5 bg-white"
                    />
                    <input
                      type="text"
                      value={customTheme.primary || '#4F46E5'}
                      onChange={(e) => {
                        const val = e.target.value;
                        setCustomTheme((prev) => ({ ...prev, primary: val }));
                      }}
                      className="w-24 px-2 py-1 bg-white border border-slate-200 rounded text-xs font-mono"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: TYPOGRAPHY */}
            {activeTab === 'typography' && (
              <div className="space-y-4">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-2">
                    Font Family
                  </label>
                  <div className="space-y-1.5">
                    {FONT_FAMILIES.map((font) => {
                      const isSelected = customTheme.fontFamily === font.value;
                      return (
                        <button
                          key={font.name}
                          type="button"
                          onClick={() => {
                            setCustomTheme((prev) => ({ ...prev, fontFamily: font.value }));
                            toast.success(`Font family changed`);
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg border text-left text-xs transition-all cursor-pointer ${
                            isSelected
                              ? 'border-violet-600 bg-violet-50/60 font-bold text-violet-900'
                              : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100/60'
                          }`}
                          style={{ fontFamily: font.value }}
                        >
                          <span>{font.name}</span>
                          {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-violet-600" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: LAYOUT & DENSITY */}
            {activeTab === 'layout' && (
              <div className="space-y-4">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-2">
                    Content Density &amp; Spacing
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['compact', 'standard', 'large'] as const).map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => setDensity(d)}
                        className={`py-2 px-3 text-xs font-semibold rounded-lg border capitalize transition-all cursor-pointer ${
                          density === d
                            ? 'bg-violet-600 text-white font-bold border-violet-600 shadow-xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-2">
                    Layout Presets
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {allLayouts.slice(0, 4).map((l) => {
                      const isSel = selectedLayout.id === l.id;
                      return (
                        <button
                          key={l.id}
                          type="button"
                          onClick={() => {
                            setSelectedLayout(l);
                            toast.success(`Applied layout: ${l.name}`);
                          }}
                          className={`p-2 rounded-lg border text-left text-xs bg-white transition-all cursor-pointer ${
                            isSel ? 'border-violet-600 ring-2 ring-violet-500/20 font-bold' : 'border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <div className="font-bold text-slate-800">{l.name}</div>
                          <div className="text-[10px] text-slate-400">{l.category} layout</div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 2. PREVIEW CONTROL TOOLBAR */}
      <div className="h-10 border-b border-slate-200 bg-white/95 backdrop-blur px-4 flex items-center justify-between shrink-0 z-10 text-xs font-medium text-slate-600">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 text-slate-700 font-bold text-[11px]">
            <Eye className="w-3.5 h-3.5 text-violet-600" />
            <span>Live CV Preview</span>
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" title="Live rendering active" />
        </div>

        {/* Page Navigation & Zoom Controls */}
        <div className="flex items-center gap-3">
          {/* Page Navigation */}
          <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-md border border-slate-200">
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="p-1 hover:bg-white rounded text-slate-600 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
              title="Previous Page"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] font-bold px-1.5 text-slate-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="p-1 hover:bg-white rounded text-slate-600 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
              title="Next Page"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Zoom Controls */}
          <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-md border border-slate-200">
            <button
              type="button"
              onClick={handleZoomOut}
              className="p-1 hover:bg-white rounded text-slate-600 cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] font-bold w-10 text-center text-slate-700">
              {Math.round(scale * 100)}%
            </span>
            <button
              type="button"
              onClick={handleZoomIn}
              className="p-1 hover:bg-white rounded text-slate-600 cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={handleAutoFit}
              className="p-1 hover:bg-white rounded text-slate-600 cursor-pointer ml-0.5"
              title="Fit to Screen"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. LIVE MULTI-PAGE CV PREVIEW AREA */}
      <div
        ref={previewContainerRef}
        className="flex-1 overflow-auto p-4 sm:p-6 flex justify-center items-start relative select-none scroll-smooth bg-slate-100/90"
      >
        <div className="transition-all duration-150 origin-top shadow-xl">
          <A4MultiPageContainer
            scale={scale}
            density={density}
            onPageCountChange={setTotalPages}
          >
            <div ref={cvContentRef} id="cv-preview-container" className="w-full">
              <TemplateRenderer template={customTemplate} data={visibleData} scale={1} />
            </div>
          </A4MultiPageContainer>
        </div>
      </div>
    </div>
  );
}
