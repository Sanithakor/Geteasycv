'use client';

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { generateTemplates, GeneratedTemplate, SectionVariant } from '@/lib/generateTemplates';
import { getAllLayouts, Layout } from '@/data/layouts';
import { getAllThemes, Theme } from '@/data/themes';
import { TemplateRenderer } from '@/components/cv';
import { sampleCV, CVData } from '@/data/sampleCV';
import toast, { Toaster } from 'react-hot-toast';
import {
  LayoutTemplate,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Trash2,
  Edit3,
  Eye,
  Sliders,
  X,
  ArrowLeft,
  Copy,
  ChevronUp,
  ChevronDown,
  Layers,
  Palette,
  FileText,
  Clock,
  Users,
  Download,
  Check,
  AlertCircle,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';

type ExtendedTemplate = GeneratedTemplate & {
  isPremium: boolean;
  isATS: boolean;
  status: 'active' | 'disabled' | 'draft';
  usersCount: number;
  downloadCount: number;
  updatedAt: string;
};

const FONT_OPTIONS = [
  { name: 'Roboto', value: 'Roboto, sans-serif' },
];

function ScaledTemplateCard({ template }: { template: GeneratedTemplate }) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.28);

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        setScale(width / 794);
      }
    };
    updateScale();
    const observer = new ResizeObserver(updateScale);
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative aspect-[1/1.414] w-full overflow-hidden rounded-md border border-slate-200 bg-slate-50"
    >
      <div
        className="absolute left-0 top-0 origin-top-left pointer-events-none select-none"
        style={{ width: '794px', transform: `scale(${scale})` }}
      >
        <TemplateRenderer template={template} data={sampleCV} scale={1} />
      </div>
    </div>
  );
}

export default function AdminTemplatesPage() {
  const baseTemplates = useMemo(() => generateTemplates(), []);
  const allLayouts = useMemo(() => getAllLayouts(), []);
  const allThemes = useMemo(() => getAllThemes(), []);

  const [templateList, setTemplateList] = useState<ExtendedTemplate[]>([]);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState<'All' | 'active' | 'disabled' | 'draft'>('All');
  const [sortBy, setSortBy] = useState<'popularity' | 'downloads' | 'newest' | 'name'>('popularity');
  const [page, setPage] = useState(1);
  const pageSize = 8;

  // Modals state
  const [previewTemplate, setPreviewTemplate] = useState<ExtendedTemplate | null>(null);
  const [builderTemplate, setBuilderTemplate] = useState<ExtendedTemplate | null>(null);
  const [builderTab, setBuilderTab] = useState<'info' | 'sections' | 'style'>('info');

  // Builder form state
  const [builderName, setBuilderName] = useState('');
  const [builderCategory, setBuilderCategory] = useState('Modern');
  const [builderStatus, setBuilderStatus] = useState<'active' | 'disabled' | 'draft'>('active');
  const [builderIsPremium, setBuilderIsPremium] = useState(false);
  const [builderIsATS, setBuilderIsATS] = useState(true);
  const [builderLayoutId, setBuilderLayoutId] = useState(allLayouts[0]?.id || '');
  const [builderThemeId, setBuilderThemeId] = useState(allThemes[0]?.id || '');
  const [builderSectionOrder, setBuilderSectionOrder] = useState<string[]>([]);
  const [builderVariants, setBuilderVariants] = useState<SectionVariant>({
    headerVariant: 'centered',
    experienceVariant: 'timeline',
    skillsVariant: 'tags',
    projectsVariant: 'cards',
    educationVariant: 'cards',
    certificationsVariant: 'list',
    languagesVariant: 'tags',
    summaryVariant: 'standard',
    contactVariant: 'icons',
    awardsVariant: 'cards',
  });

  const [builderPrimaryColor, setBuilderPrimaryColor] = useState('#4F46E5');
  const [builderTextColor, setBuilderTextColor] = useState('#111827');
  const [builderFontFamily, setBuilderFontFamily] = useState('Poppins, sans-serif');

  // Initialize templates with extended metadata
  useEffect(() => {
    const saved = localStorage.getItem('admin_managed_templates_v2');
    if (saved) {
      try {
        setTemplateList(JSON.parse(saved));
        return;
      } catch (e) {
        console.error('Failed to parse saved templates:', e);
      }
    }

    const extended: ExtendedTemplate[] = baseTemplates.map((t, index) => ({
      ...t,
      isPremium: Boolean(t.isPremium ?? (index % 3 === 0)),
      isATS: Boolean(t.isATS ?? true),
      status: index % 5 === 4 ? 'draft' : 'active',
      usersCount: 500 + (index * 137) % 2450,
      downloadCount: 1200 + (index * 412) % 6800,
      updatedAt: new Date(Date.now() - index * 86400000 * 2).toISOString(),
    }));

    setTemplateList(extended);
    localStorage.setItem('admin_managed_templates_v2', JSON.stringify(extended));
  }, [baseTemplates]);

  const persistTemplates = (updated: ExtendedTemplate[]) => {
    setTemplateList(updated);
    localStorage.setItem('admin_managed_templates_v2', JSON.stringify(updated));
  };

  // Status & Attribute Toggles
  const toggleTemplateStatus = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = templateList.map(t => {
      if (t.id === id) {
        const nextStatus: ExtendedTemplate['status'] = t.status === 'active' ? 'disabled' : 'active';
        toast.success(`Template "${t.name}" status set to ${nextStatus.toUpperCase()}`);
        return { ...t, status: nextStatus, updatedAt: new Date().toISOString() };
      }
      return t;
    });
    persistTemplates(updated);
  };

  const togglePremium = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = templateList.map(t => {
      if (t.id === id) {
        const isPremium = !t.isPremium;
        toast.success(`Template set to ${isPremium ? 'PRO TIER' : 'FREE TIER'}`);
        return { ...t, isPremium, updatedAt: new Date().toISOString() };
      }
      return t;
    });
    persistTemplates(updated);
  };

  const toggleATS = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = templateList.map(t => {
      if (t.id === id) {
        const isATS = !t.isATS;
        toast.success(`ATS Optimization updated`);
        return { ...t, isATS, updatedAt: new Date().toISOString() };
      }
      return t;
    });
    persistTemplates(updated);
  };

  const deleteTemplate = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to permanently delete this template?')) {
      const updated = templateList.filter(t => t.id !== id);
      persistTemplates(updated);
      toast.success('Template deleted');
    }
  };

  const duplicateTemplate = (template: ExtendedTemplate, e: React.MouseEvent) => {
    e.stopPropagation();
    const duplicated: ExtendedTemplate = {
      ...template,
      id: `tmpl-custom-${Date.now()}`,
      name: `${template.name} (Copy)`,
      status: 'draft',
      usersCount: 0,
      downloadCount: 0,
      updatedAt: new Date().toISOString(),
    };
    const updated = [duplicated, ...templateList];
    persistTemplates(updated);
    toast.success(`Duplicated "${template.name}" as new draft`);
    openLayoutBuilder(duplicated);
  };

  // Open Layout & Component Builder
  const openLayoutBuilder = (template?: ExtendedTemplate) => {
    const target = template || {
      id: `tmpl-custom-${Date.now()}`,
      name: 'New Custom Template',
      layoutId: allLayouts[0].id,
      themeId: allThemes[0].id,
      layout: allLayouts[0],
      theme: allThemes[0],
      sectionVariants: {
        headerVariant: 'centered',
        experienceVariant: 'timeline',
        skillsVariant: 'tags',
        projectsVariant: 'cards',
        educationVariant: 'cards',
        certificationsVariant: 'list',
        languagesVariant: 'tags',
        summaryVariant: 'standard',
        contactVariant: 'icons',
        awardsVariant: 'cards',
      },
      description: 'Custom responsive CV template layout built via Admin Builder.',
      tags: ['custom', 'admin'],
      category: 'Modern',
      isPremium: false,
      isATS: true,
      status: 'draft',
      usersCount: 0,
      downloadCount: 0,
      updatedAt: new Date().toISOString(),
    };

    setBuilderTemplate(target as ExtendedTemplate);
    setBuilderName(target.name);
    setBuilderCategory(target.category || 'Modern');
    setBuilderStatus((target as ExtendedTemplate).status || 'active');
    setBuilderIsPremium(target.isPremium);
    setBuilderIsATS(target.isATS);
    setBuilderLayoutId(target.layoutId);
    setBuilderThemeId(target.themeId);
    setBuilderSectionOrder(target.layout.sectionOrder || ['header', 'summary', 'experience', 'education', 'skills', 'projects', 'certifications', 'languages']);
    setBuilderVariants(target.sectionVariants);
    setBuilderPrimaryColor(target.theme.primary || '#4F46E5');
    setBuilderTextColor(target.theme.text || '#111827');
    setBuilderFontFamily(target.theme.fontFamily || 'Poppins, sans-serif');
    setBuilderTab('info');
  };

  // Save changes from Builder
  const handleSaveBuilder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!builderTemplate || !builderName.trim()) return;

    const chosenLayout = allLayouts.find(l => l.id === builderLayoutId) || builderTemplate.layout;
    const chosenTheme = allThemes.find(t => t.id === builderThemeId) || builderTemplate.theme;

    const updatedLayout: Layout = {
      ...chosenLayout,
      sectionOrder: builderSectionOrder,
    };

    const updatedTheme: Theme = {
      ...chosenTheme,
      primary: builderPrimaryColor,
      text: builderTextColor,
      fontFamily: builderFontFamily,
      fontFamilyHeading: builderFontFamily,
    };

    const updatedTmpl: ExtendedTemplate = {
      ...builderTemplate,
      name: builderName,
      category: builderCategory,
      status: builderStatus,
      isPremium: builderIsPremium,
      isATS: builderIsATS,
      layoutId: chosenLayout.id,
      themeId: chosenTheme.id,
      layout: updatedLayout,
      theme: updatedTheme,
      sectionVariants: builderVariants,
      updatedAt: new Date().toISOString(),
    };

    const exists = templateList.some(t => t.id === updatedTmpl.id);
    const newList = exists
      ? templateList.map(t => (t.id === updatedTmpl.id ? updatedTmpl : t))
      : [updatedTmpl, ...templateList];

    persistTemplates(newList);
    setBuilderTemplate(null);
    toast.success(`Template "${updatedTmpl.name}" saved successfully!`);
  };

  // Move section position in Layout Builder
  const moveSection = (index: number, direction: 'up' | 'down') => {
    const newOrder = [...builderSectionOrder];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= newOrder.length) return;
    const temp = newOrder[index];
    newOrder[index] = newOrder[targetIdx];
    newOrder[targetIdx] = temp;
    setBuilderSectionOrder(newOrder);
  };

  // Computed filtered list
  const filteredTemplates = useMemo(() => {
    return templateList
      .filter(t => {
        const query = search.trim().toLowerCase();
        const matchSearch =
          !query ||
          t.name.toLowerCase().includes(query) ||
          t.category.toLowerCase().includes(query) ||
          t.layout.name.toLowerCase().includes(query);

        const matchCategory =
          categoryFilter === 'All' ||
          (categoryFilter === 'ATS' && t.isATS) ||
          (categoryFilter === 'PRO' && t.isPremium) ||
          (categoryFilter === 'FREE' && !t.isPremium) ||
          t.category.toLowerCase().includes(categoryFilter.toLowerCase()) ||
          t.layout.name.toLowerCase().includes(categoryFilter.toLowerCase());

        const matchStatus = statusFilter === 'All' || t.status === statusFilter;

        return matchSearch && matchCategory && matchStatus;
      })
      .sort((a, b) => {
        if (sortBy === 'popularity') return b.usersCount - a.usersCount;
        if (sortBy === 'downloads') return b.downloadCount - a.downloadCount;
        if (sortBy === 'newest') return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        return 0;
      });
  }, [templateList, search, categoryFilter, statusFilter, sortBy]);

  // Pagination bounds
  const totalPages = Math.ceil(filteredTemplates.length / pageSize) || 1;
  const paginatedTemplates = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredTemplates.slice(start, start + pageSize);
  }, [filteredTemplates, page]);

  // Live Builder Preview template object
  const previewLiveBuilderTemplate: GeneratedTemplate = useMemo(() => {
    const chosenLayout = allLayouts.find(l => l.id === builderLayoutId) || allLayouts[0];
    const chosenTheme = allThemes.find(t => t.id === builderThemeId) || allThemes[0];
    return {
      id: builderTemplate?.id || 'live-preview',
      name: builderName || 'Template Preview',
      layoutId: chosenLayout.id,
      themeId: chosenTheme.id,
      layout: { ...chosenLayout, sectionOrder: builderSectionOrder },
      theme: { ...chosenTheme, primary: builderPrimaryColor, text: builderTextColor, fontFamily: builderFontFamily, fontFamilyHeading: builderFontFamily },
      sectionVariants: builderVariants,
      description: 'Live preview',
      tags: ['live'],
      category: builderCategory,
      isPremium: builderIsPremium,
      isATS: builderIsATS,
    };
  }, [builderTemplate, builderName, builderCategory, builderIsPremium, builderIsATS, builderLayoutId, builderThemeId, builderSectionOrder, builderVariants, builderPrimaryColor, builderTextColor, builderFontFamily, allLayouts, allThemes]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-6 md:p-10 space-y-8">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-md border border-slate-200 shadow-2xs">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="p-2 rounded-md bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors" title="Back to Admin Dashboard">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <LayoutTemplate className="w-7 h-7 text-violet-600" />
              Admin Template Management System
            </h1>
          </div>
          <p className="text-xs text-slate-500 pl-11">
            Centralized SaaS admin console to manage CV templates, section layouts, theme configurations, and ATS flags.
          </p>
        </div>

        <button
          type="button"
          onClick={() => openLayoutBuilder()}
          className="px-5 py-2.5 bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs rounded-md transition-all shadow-md shadow-violet-500/20 flex items-center gap-2 cursor-pointer self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Template</span>
        </button>
      </div>

      {/* Dashboard Statistics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-md p-4 border border-slate-200 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Templates</span>
          <p className="text-2xl font-bold text-slate-900">{templateList.length}</p>
        </div>
        <div className="bg-white rounded-md p-4 border border-slate-200 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Active Public</span>
          <p className="text-2xl font-bold text-emerald-600">{templateList.filter(t => t.status === 'active').length}</p>
        </div>
        <div className="bg-white rounded-md p-4 border border-slate-200 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Disabled</span>
          <p className="text-2xl font-bold text-rose-500">{templateList.filter(t => t.status === 'disabled').length}</p>
        </div>
        <div className="bg-white rounded-md p-4 border border-slate-200 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Draft Status</span>
          <p className="text-2xl font-bold text-amber-500">{templateList.filter(t => t.status === 'draft').length}</p>
        </div>
        <div className="bg-white rounded-md p-4 border border-slate-200 shadow-2xs space-y-1 col-span-2 sm:col-span-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">ATS Compatible</span>
          <p className="text-2xl font-bold text-violet-600">{templateList.filter(t => t.isATS).length}</p>
        </div>
      </div>

      {/* Filter, Search & Sorting Panel */}
      <div className="bg-white p-4 rounded-md border border-slate-200 shadow-2xs flex flex-col lg:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full lg:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search template name, category, layout..."
            className="w-full h-10 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-md text-xs text-slate-900 outline-none focus:ring-2 focus:ring-violet-500/20"
          />
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
          {/* Category Filter */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 lg:pb-0">
            {['All', 'ATS', 'PRO', 'FREE', 'Modern', 'Executive', 'Creative', 'Minimal'].map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => { setCategoryFilter(cat); setPage(1); }}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                  categoryFilter === cat
                    ? 'bg-violet-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="h-6 w-px bg-slate-200 hidden sm:block" />

          {/* Status Filter Dropdown */}
          <select
            value={statusFilter}
            onChange={e => { setStatusFilter(e.target.value as any); setPage(1); }}
            className="h-9 px-3 bg-slate-50 border border-slate-200 rounded-md text-xs font-bold text-slate-700 outline-none cursor-pointer"
          >
            <option value="All">All Statuses</option>
            <option value="active">Active Only</option>
            <option value="disabled">Disabled Only</option>
            <option value="draft">Draft Only</option>
          </select>

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as any)}
            className="h-9 px-3 bg-slate-50 border border-slate-200 rounded-md text-xs font-bold text-slate-700 outline-none cursor-pointer"
          >
            <option value="popularity">Sort: Most Popular</option>
            <option value="downloads">Sort: Downloads</option>
            <option value="newest">Sort: Last Updated</option>
            <option value="name">Sort: Name (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Template Cards Grid */}
      {paginatedTemplates.length === 0 ? (
        <div className="bg-white rounded-md border border-slate-200 p-12 text-center space-y-3">
          <AlertCircle className="w-8 h-8 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-900">No Templates Found</h3>
          <p className="text-xs text-slate-500">No templates matched your current filter or search criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {paginatedTemplates.map(tmpl => (
            <div
              key={tmpl.id}
              className="bg-white rounded-md border border-slate-200 shadow-2xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group"
            >
              {/* Scaled Preview Box */}
              <div className="p-3 bg-slate-50 border-b border-slate-100 relative">
                <ScaledTemplateCard template={tmpl} />

                {/* Status Badges Overlay */}
                <div className="absolute top-5 left-5 right-5 flex items-center justify-between pointer-events-none">
                  <span className="bg-white/90 backdrop-blur px-2.5 py-1 rounded-full text-[9px] font-bold text-slate-700 uppercase tracking-wider shadow-2xs">
                    {tmpl.category || tmpl.layout.name}
                  </span>

                  <div className="flex items-center gap-1 pointer-events-auto">
                    {/* Status Pill */}
                    <button
                      type="button"
                      onClick={e => toggleTemplateStatus(tmpl.id, e)}
                      className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase transition-all cursor-pointer ${
                        tmpl.status === 'active'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : tmpl.status === 'disabled'
                          ? 'bg-rose-100 text-rose-800 border border-rose-300'
                          : 'bg-amber-100 text-amber-800 border border-amber-300'
                      }`}
                      title="Click to toggle status"
                    >
                      {tmpl.status}
                    </button>

                    {/* ATS Badge */}
                    <button
                      type="button"
                      onClick={e => toggleATS(tmpl.id, e)}
                      className={`px-2 py-0.5 rounded text-[9px] font-bold transition-all cursor-pointer ${
                        tmpl.isATS ? 'bg-violet-100 text-violet-800 border border-violet-300' : 'bg-slate-200 text-slate-500'
                      }`}
                      title="Toggle ATS Compatibility"
                    >
                      {tmpl.isATS ? '✓ ATS' : 'Standard'}
                    </button>

                    {/* PRO/FREE Badge */}
                    <button
                      type="button"
                      onClick={e => togglePremium(tmpl.id, e)}
                      className={`px-2 py-0.5 rounded text-[9px] font-bold transition-all cursor-pointer ${
                        tmpl.isPremium ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-slate-200 text-slate-600'
                      }`}
                      title="Toggle Access Tier"
                    >
                      {tmpl.isPremium ? 'PRO' : 'FREE'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Template Information & Usage Metrics */}
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-violet-600 transition-colors line-clamp-1">
                    {tmpl.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                    Layout: {tmpl.layout.name} • Theme: {tmpl.theme.name}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[10px] font-semibold text-slate-500 bg-slate-50 p-2 rounded-md border border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-violet-600" />
                    <span>{tmpl.usersCount.toLocaleString()} Users</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Download className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{tmpl.downloadCount.toLocaleString()} Exports</span>
                  </div>
                </div>

                {/* Actions Toolbar */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setPreviewTemplate(tmpl)}
                    className="p-2 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                    title="Live Full Preview"
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => openLayoutBuilder(tmpl)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-violet-600 hover:bg-violet-700 text-white rounded-md text-xs font-bold transition-colors cursor-pointer shadow-2xs"
                    title="Edit Layout & Components"
                  >
                    <Sliders className="w-3.5 h-3.5" />
                    <span>Edit Layout</span>
                  </button>

                  <button
                    type="button"
                    onClick={e => duplicateTemplate(tmpl, e)}
                    className="p-2 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                    title="Duplicate Template"
                  >
                    <Copy className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={e => deleteTemplate(tmpl.id, e)}
                    className="p-2 rounded-md bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors cursor-pointer"
                    title="Delete Template"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Bar */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between bg-white p-4 rounded-md border border-slate-200 shadow-2xs">
          <span className="text-xs text-slate-500 font-medium">
            Showing Page {page} of {totalPages} ({filteredTemplates.length} total templates)
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={page === 1}
              onClick={() => setPage(p => Math.max(1, p - 1))}
              className="px-3.5 py-1.5 rounded-md border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-30 cursor-pointer"
            >
              Previous
            </button>
            <button
              type="button"
              disabled={page === totalPages}
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              className="px-3.5 py-1.5 rounded-md border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-30 cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Modal 1: Live Full A4 Document Preview */}
      {previewTemplate && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-md max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-slate-200">
            <div className="p-4 px-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div>
                <h3 className="text-base font-bold text-slate-900">{previewTemplate.name}</h3>
                <span className="text-xs text-slate-500 font-medium">{previewTemplate.category} Template • Layout: {previewTemplate.layout.name}</span>
              </div>
              <button
                type="button"
                onClick={() => setPreviewTemplate(null)}
                className="p-2 rounded-full hover:bg-slate-200 text-slate-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 flex justify-center bg-slate-100">
              <div className="bg-white shadow-2xl rounded-sm p-0" style={{ width: 794, height: 1123 }}>
                <TemplateRenderer template={previewTemplate} data={sampleCV} scale={1} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal 2: Visual Layout & Component Builder Modal */}
      {builderTemplate && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-md w-full max-w-6xl h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
            {/* Modal Header */}
            <div className="p-4 px-6 border-b border-slate-200 flex items-center justify-between bg-white shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-md bg-violet-50 text-violet-600 flex items-center justify-center font-bold">
                  <Sliders className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Template Layout & Component Builder
                  </h2>
                  <p className="text-xs text-slate-500">Configure template metadata, section order, component variants, and theme styling.</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setBuilderTemplate(null)}
                  className="p-2 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Modal Workspace Body (Left Controls & Right Real-Time Live Preview) */}
            <div className="flex-1 flex overflow-hidden">
              {/* Left Column: Form & Component Settings */}
              <div className="w-full md:w-[480px] border-r border-slate-200 bg-white flex flex-col overflow-hidden shrink-0">
                {/* Builder Tabs */}
                <div className="flex items-center gap-1 p-3 border-b border-slate-100 bg-slate-50">
                  <button
                    type="button"
                    onClick={() => setBuilderTab('info')}
                    className={`flex-1 py-2 rounded-md text-xs font-bold transition-all ${
                      builderTab === 'info' ? 'bg-violet-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Basic Info
                  </button>
                  <button
                    type="button"
                    onClick={() => setBuilderTab('sections')}
                    className={`flex-1 py-2 rounded-md text-xs font-bold transition-all ${
                      builderTab === 'sections' ? 'bg-violet-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Sections Layout
                  </button>
                  <button
                    type="button"
                    onClick={() => setBuilderTab('style')}
                    className={`flex-1 py-2 rounded-md text-xs font-bold transition-all ${
                      builderTab === 'style' ? 'bg-violet-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Theme & Colors
                  </button>
                </div>

                {/* Tab Contents */}
                <div className="flex-1 overflow-y-auto p-5 space-y-4">
                  {/* TAB 1: Basic Info */}
                  {builderTab === 'info' && (
                    <div className="space-y-4">
                      <label className="grid gap-1.5 text-xs font-bold text-slate-700">
                        <span>Template Name</span>
                        <input
                          type="text"
                          required
                          value={builderName}
                          onChange={e => setBuilderName(e.target.value)}
                          placeholder="e.g. Executive Tech Modern"
                          className="h-11 px-3.5 rounded-md border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-violet-500/20"
                        />
                      </label>

                      <div className="grid grid-cols-2 gap-3">
                        <label className="grid gap-1.5 text-xs font-bold text-slate-700">
                          <span>Category</span>
                          <select
                            value={builderCategory}
                            onChange={e => setBuilderCategory(e.target.value)}
                            className="h-11 px-3 rounded-md border border-slate-200 text-sm outline-none"
                          >
                            <option value="Modern">Modern</option>
                            <option value="Executive">Executive</option>
                            <option value="Creative">Creative</option>
                            <option value="Minimal">Minimal</option>
                            <option value="ATS Friendly">ATS Friendly</option>
                            <option value="Traditional">Traditional</option>
                          </select>
                        </label>

                        <label className="grid gap-1.5 text-xs font-bold text-slate-700">
                          <span>Publication Status</span>
                          <select
                            value={builderStatus}
                            onChange={e => setBuilderStatus(e.target.value as any)}
                            className="h-11 px-3 rounded-md border border-slate-200 text-sm outline-none"
                          >
                            <option value="active">Active (Published)</option>
                            <option value="disabled">Disabled</option>
                            <option value="draft">Draft</option>
                          </select>
                        </label>
                      </div>

                      <div className="p-4 bg-slate-50 rounded-md border border-slate-200 space-y-3">
                        <span className="text-xs font-bold text-slate-900 block border-b border-slate-200 pb-2">
                          Access & Optimization Flags
                        </span>

                        <label className="flex items-center justify-between cursor-pointer">
                          <span className="text-xs font-bold text-slate-700">PRO Access Tier</span>
                          <input
                            type="checkbox"
                            checked={builderIsPremium}
                            onChange={e => setBuilderIsPremium(e.target.checked)}
                            className="w-5 h-5 accent-violet-600 rounded"
                          />
                        </label>

                        <label className="flex items-center justify-between cursor-pointer">
                          <span className="text-xs font-bold text-slate-700">ATS Compatible Standard</span>
                          <input
                            type="checkbox"
                            checked={builderIsATS}
                            onChange={e => setBuilderIsATS(e.target.checked)}
                            className="w-5 h-5 accent-violet-600 rounded"
                          />
                        </label>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: Sections Layout & Component Management */}
                  {builderTab === 'sections' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                          Section Order ({builderSectionOrder.length})
                        </span>
                        <span className="text-[10px] text-slate-400 font-semibold">Use arrows to reorder</span>
                      </div>

                      <div className="space-y-2">
                        {builderSectionOrder.map((sectionKey, index) => (
                          <div
                            key={sectionKey}
                            className="flex items-center justify-between p-3 bg-white rounded-md border border-slate-200 shadow-2xs"
                          >
                            <div className="flex items-center gap-3">
                              <span className="w-6 h-6 rounded-md bg-violet-50 text-violet-700 text-xs font-bold flex items-center justify-center">
                                {index + 1}
                              </span>
                              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                                {sectionKey}
                              </span>
                            </div>

                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                disabled={index === 0}
                                onClick={() => moveSection(index, 'up')}
                                className="p-1.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-600 disabled:opacity-30 transition-colors"
                                title="Move Section Up"
                              >
                                <ChevronUp className="w-4 h-4" />
                              </button>
                              <button
                                type="button"
                                disabled={index === builderSectionOrder.length - 1}
                                onClick={() => moveSection(index, 'down')}
                                className="p-1.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-600 disabled:opacity-30 transition-colors"
                                title="Move Section Down"
                              >
                                <ChevronDown className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2 space-y-3 border-t border-slate-100">
                        <span className="text-xs font-bold text-slate-900 block">Section Variant Controls</span>

                        <label className="grid gap-1.5 text-xs font-bold text-slate-700">
                          <span>Experience Variant</span>
                          <select
                            value={builderVariants.experienceVariant}
                            onChange={e => setBuilderVariants(v => ({ ...v, experienceVariant: e.target.value as any }))}
                            className="h-10 px-3 rounded-md border border-slate-200 text-xs outline-none"
                          >
                            <option value="timeline">Timeline Style</option>
                            <option value="cards">Card Grid</option>
                            <option value="bordered">Bordered Left Line</option>
                            <option value="compact">Compact Minimal</option>
                          </select>
                        </label>

                        <label className="grid gap-1.5 text-xs font-bold text-slate-700">
                          <span>Skills Display Variant</span>
                          <select
                            value={builderVariants.skillsVariant}
                            onChange={e => setBuilderVariants(v => ({ ...v, skillsVariant: e.target.value as any }))}
                            className="h-10 px-3 rounded-md border border-slate-200 text-xs outline-none"
                          >
                            <option value="tags">Clean Tag Badges</option>
                            <option value="progress-bars">Progress Bar Percentage</option>
                            <option value="circles">Circle Level Meter</option>
                            <option value="pills">Pill Badges</option>
                          </select>
                        </label>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: Theme & Visual Styles */}
                  {builderTab === 'style' && (
                    <div className="space-y-4">
                      <label className="grid gap-1.5 text-xs font-bold text-slate-700">
                        <span>Base Layout Architecture</span>
                        <select
                          value={builderLayoutId}
                          onChange={e => setBuilderLayoutId(e.target.value)}
                          className="h-11 px-3 rounded-md border border-slate-200 text-sm outline-none"
                        >
                          {allLayouts.map(l => (
                            <option key={l.id} value={l.id}>{l.name} ({l.columns} Col)</option>
                          ))}
                        </select>
                      </label>

                      <label className="grid gap-1.5 text-xs font-bold text-slate-700">
                        <span>Theme Color Preset</span>
                        <select
                          value={builderThemeId}
                          onChange={e => {
                            const selectedTheme = allThemes.find(t => t.id === e.target.value);
                            setBuilderThemeId(e.target.value);
                            if (selectedTheme) {
                              setBuilderPrimaryColor(selectedTheme.primary);
                              setBuilderTextColor(selectedTheme.text);
                              setBuilderFontFamily(selectedTheme.fontFamily);
                            }
                          }}
                          className="h-11 px-3 rounded-md border border-slate-200 text-sm outline-none"
                        >
                          {allThemes.map(t => (
                            <option key={t.id} value={t.id}>{t.name}</option>
                          ))}
                        </select>
                      </label>

                      <label className="grid gap-1.5 text-xs font-bold text-slate-700">
                        <span>Font Family</span>
                        <select
                          value={builderFontFamily}
                          onChange={e => setBuilderFontFamily(e.target.value)}
                          className="h-11 px-3 rounded-md border border-slate-200 text-sm outline-none"
                        >
                          {FONT_OPTIONS.map(f => (
                            <option key={f.name} value={f.value}>{f.name}</option>
                          ))}
                        </select>
                      </label>

                      <div className="grid grid-cols-2 gap-3 pt-2">
                        <label className="grid gap-1.5 text-xs font-bold text-slate-700">
                          <span>Primary Accent Color</span>
                          <div className="flex items-center gap-2 h-11 rounded-md border border-slate-200 p-1">
                            <input
                              type="color"
                              value={builderPrimaryColor}
                              onChange={e => setBuilderPrimaryColor(e.target.value)}
                              className="h-full w-9 rounded-md border-0 cursor-pointer bg-transparent"
                            />
                            <input
                              type="text"
                              value={builderPrimaryColor}
                              onChange={e => setBuilderPrimaryColor(e.target.value)}
                              className="flex-1 bg-transparent text-xs font-mono outline-none"
                            />
                          </div>
                        </label>

                        <label className="grid gap-1.5 text-xs font-bold text-slate-700">
                          <span>Main Text Color</span>
                          <div className="flex items-center gap-2 h-11 rounded-md border border-slate-200 p-1">
                            <input
                              type="color"
                              value={builderTextColor}
                              onChange={e => setBuilderTextColor(e.target.value)}
                              className="h-full w-9 rounded-md border-0 cursor-pointer bg-transparent"
                            />
                            <input
                              type="text"
                              value={builderTextColor}
                              onChange={e => setBuilderTextColor(e.target.value)}
                              className="flex-1 bg-transparent text-xs font-mono outline-none"
                            />
                          </div>
                        </label>
                      </div>
                    </div>
                  )}
                </div>

                {/* Left Column Modal Footer Actions */}
                <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={() => setBuilderTemplate(null)}
                    className="px-4 py-2.5 rounded-md border border-slate-200 bg-white text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
                  >
                    Cancel
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={e => { setBuilderStatus('draft'); handleSaveBuilder(e); }}
                      className="px-4 py-2.5 rounded-md bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold transition-colors"
                    >
                      Save Draft
                    </button>
                    <button
                      type="button"
                      onClick={e => { setBuilderStatus('active'); handleSaveBuilder(e); }}
                      className="px-5 py-2.5 rounded-md bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold transition-colors shadow-md shadow-violet-500/20"
                    >
                      Save & Publish
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: Live Real-Time A4 Document Preview */}
              <div className="flex-1 bg-slate-100 overflow-y-auto p-8 flex flex-col items-center justify-start">
                <div className="mb-4 flex items-center justify-between w-[794px] text-xs font-bold text-slate-500 select-none">
                  <span className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    Real-time Builder Preview
                  </span>
                  <span>A4 • 210 × 297 mm</span>
                </div>

                <div className="bg-white shadow-2xl rounded-sm border border-slate-200/80 overflow-hidden" style={{ width: 794, minHeight: 1123 }}>
                  <TemplateRenderer template={previewLiveBuilderTemplate} data={sampleCV} scale={1} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Toaster position="bottom-right" />
    </div>
  );
}
