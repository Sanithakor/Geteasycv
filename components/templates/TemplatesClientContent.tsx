'use client';

import React, { useMemo, useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Navigation from '@/components/Navigation';
import InnerBanner from '@/components/InnerBanner';
import ReadyToBuild from '@/components/sections/ReadyToBuild';
import Footer from '@/components/Footer';
import { TemplateRenderer } from '@/components/cv';
import { sampleCV } from '@/data/sampleCV';
import { GeneratedTemplate, generateTemplates } from '@/lib/generateTemplates';
import { useAuthStore } from '@/lib/store/authStore';
import PurchaseSuccessModal from '@/components/PurchaseSuccessModal';
import { 
  experienceLevels, 
  styleCategories,
  getActiveCategoriesForTemplates,
  isTemplateInCategory,
  getCategoriesForTemplate
} from '@/data/templateCategories';
import { getTemplateDownloadCount, formatDownloadCount } from '@/lib/templateStatsStore';
import {
  Plus,
  Eye,
  FileText,
  Edit,
  Sparkles,
  Download,
  BarChart2,
  Globe,
  Smartphone,
  ShieldCheck,
  Headphones,
  Search,
  Filter,
  X,
  Star,
  Zap,
  Award,
  Heart,
  Flame,
  Gift,
  SlidersHorizontal,
} from 'lucide-react';

const pageSize = 12;

// Sorting options
const sortOptions = [
  { id: 'popular', name: 'Most Popular', icon: Star },
  { id: 'newest', name: 'Newest First', icon: Zap },
  { id: 'alphabetical', name: 'A-Z', icon: FileText },
  { id: 'category', name: 'By Category', icon: Award }
];

const platformFeatures = [
  {
    icon: FileText,
    accent: '#BAC7FE',
    title: 'ATS Friendly Templates',
    description: 'Professionally designed templates that pass ATS scans and get you noticed by recruiters.',
  },
  {
    icon: Edit,
    accent: '#F5D17B',
    title: 'Easy Customization',
    description: 'Drag, drop, and customize sections to create a resume that perfectly matches your style.',
  },
  {
    icon: Sparkles,
    accent: '#58C09D',
    title: 'AI-Powered Suggestions',
    description: 'Get intelligent suggestions for your content, skills, and achievements powered by AI.',
  },
  {
    icon: Eye,
    accent: '#D0B9EF',
    title: 'Real-time Preview',
    description: 'See changes instantly with our real-time preview as you build your resume.',
  },
  {
    icon: Download,
    accent: '#FEE1CF',
    title: 'Multiple Export Options',
    description: 'Download your resume in PDF, Word, or plain text format with perfect formatting.',
  },
  {
    icon: BarChart2,
    accent: '#BAC7FE',
    title: 'Resume Score Analysis',
    description: 'Get a detailed score and tips to improve your resume and increase your interview chances.',
  },
  {
    icon: Globe,
    accent: '#F5D17B',
    title: 'Multi-language Support',
    description: 'Create resumes in multiple languages and reach global opportunities.',
  },
  {
    icon: Smartphone,
    accent: '#58C09D',
    title: 'Mobile Responsive',
    description: 'Build and edit your resume seamlessly on any device, anywhere, anytime.',
  },
  {
    icon: ShieldCheck,
    accent: '#D0B9EF',
    title: 'Data Privacy & Security',
    description: 'Your data is encrypted and secure. We never share your information with third parties.',
  },
  {
    icon: Headphones,
    accent: '#FEE1CF',
    title: 'Expert Support',
    description: 'Get help when you need it with our dedicated support team available 24/7.',
  },
];

function getTemplateCategories(template: GeneratedTemplate): string[] {
  const categories = getCategoriesForTemplate(template.id);
  return categories.map(cat => cat.name);
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
      className="relative aspect-[1/1.414] w-full overflow-hidden rounded-md border border-slate-200/80 bg-white shadow-xs group-hover:border-teal-400/80 group-hover:shadow-md transition-all duration-300"
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

function TemplatesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { token, isAuthenticated } = useAuthStore();
  
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedExperienceLevel, setSelectedExperienceLevel] = useState('all');
  const [selectedStyle, setSelectedStyle] = useState('all');
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  
  const [page, setPage] = useState(1);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<GeneratedTemplate | null>(null);
  const [addingId, setAddingId] = useState<string | null>(null);
  const [downloadCounts, setDownloadCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    fetch('/api/templates/download')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.counts) {
          setDownloadCounts(data.counts);
        }
      })
      .catch(() => {});
  }, []);

  const templates = useMemo(() => generateTemplates(), []);
  const activeCategories = useMemo(() => getActiveCategoriesForTemplates(), []);
  
  useEffect(() => {
    const category = searchParams?.get('category') || 'all';
    const experience = searchParams?.get('experience') || 'all';
    const style = searchParams?.get('style') || 'all';
    const industry = searchParams?.get('industry') || 'all';
    const query = searchParams?.get('q') || '';
    const sort = searchParams?.get('sort') || 'popular';
    
    setSelectedCategory(category);
    setSelectedExperienceLevel(experience);
    setSelectedStyle(style);
    setSelectedIndustry(industry);
    setSearch(query);
    setSortBy(sort);
  }, [searchParams]);

  const updateURL = (filters: Record<string, string>) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== 'all' && value !== '') {
        params.set(key, value);
      }
    });
    
    const url = params.toString() ? `/templates?${params.toString()}` : '/templates';
    router.replace(url);
  };

  const handleFilterChange = (type: string, value: string) => {
    const newFilters = {
      category: type === 'category' ? value : selectedCategory,
      experience: type === 'experience' ? value : selectedExperienceLevel,
      style: type === 'style' ? value : selectedStyle,
      industry: type === 'industry' ? value : selectedIndustry,
      q: search,
      sort: sortBy
    };
    
    switch (type) {
      case 'category':
        setSelectedCategory(value);
        break;
      case 'experience':
        setSelectedExperienceLevel(value);
        break;
      case 'style':
        setSelectedStyle(value);
        break;
      case 'industry':
        setSelectedIndustry(value);
        break;
    }
    
    updateURL(newFilters);
    setPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    const newFilters = {
      category: selectedCategory,
      experience: selectedExperienceLevel,
      style: selectedStyle,
      industry: selectedIndustry,
      q: value,
      sort: sortBy
    };
    updateURL(newFilters);
    setPage(1);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    const newFilters = {
      category: selectedCategory,
      experience: selectedExperienceLevel,
      style: selectedStyle,
      industry: selectedIndustry,
      q: search,
      sort: value
    };
    updateURL(newFilters);
    setPage(1);
  };

  const clearAllFilters = () => {
    setSelectedCategory('all');
    setSelectedExperienceLevel('all');
    setSelectedStyle('all');
    setSelectedIndustry('all');
    setSearch('');
    setSortBy('popular');
    router.replace('/templates');
    setPage(1);
  };

  const filteredTemplates = useMemo(() => {
    return templates.filter((template) => {
      if (selectedCategory !== 'all') {
        const belongsToCategory = isTemplateInCategory(template.id, selectedCategory);
        if (!belongsToCategory) return false;
      }
      
      if (selectedExperienceLevel !== 'all') {
        const templateCategories = getCategoriesForTemplate(template.id);
        const hasExperienceLevel = templateCategories.some(cat => 
          cat.experienceLevel.includes(selectedExperienceLevel as any)
        );
        if (!hasExperienceLevel) return false;
      }
      
      if (selectedStyle !== 'all') {
        const templateCategories = getCategoriesForTemplate(template.id);
        const hasStyle = templateCategories.some(cat => 
          cat.styles.includes(selectedStyle as any)
        );
        if (!hasStyle) return false;
      }
      
      if (selectedIndustry !== 'all') {
        const templateCategories = getCategoriesForTemplate(template.id);
        const hasIndustry = templateCategories.some(cat => 
          cat.industries.includes(selectedIndustry) || cat.industries.includes('All Industries')
        );
        if (!hasIndustry) return false;
      }

      const query = search.trim().toLowerCase();
      if (query) {
        const searchableText = [
          template.name,
          template.description,
          template.layout.name,
          template.theme.name,
          template.category,
          ...template.tags,
          ...getTemplateCategories(template)
        ].join(' ').toLowerCase();
        
        if (!searchableText.includes(query)) return false;
      }

      return true;
    });
  }, [templates, selectedCategory, selectedExperienceLevel, selectedStyle, selectedIndustry, search]);

  const sortedTemplates = useMemo(() => {
    const sorted = [...filteredTemplates];
    
    switch (sortBy) {
      case 'alphabetical':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'newest':
        return sorted.sort((a, b) => b.id.localeCompare(a.id));
      case 'category':
        return sorted.sort((a, b) => {
          const aCats = getTemplateCategories(a);
          const bCats = getTemplateCategories(b);
          const aMainCat = aCats[0] || '';
          const bMainCat = bCats[0] || '';
          return aMainCat.localeCompare(bMainCat);
        });
      case 'popular':
      default:
        return sorted;
    }
  }, [filteredTemplates, sortBy]);

  const totalPages = Math.ceil(sortedTemplates.length / pageSize) || 1;
  const pagedTemplates = useMemo(() => {
    const start = (page - 1) * pageSize;
    return sortedTemplates.slice(start, start + pageSize);
  }, [sortedTemplates, page]);

  useEffect(() => {
    setPage(1);
  }, [selectedCategory, selectedExperienceLevel, selectedStyle, selectedIndustry, search, sortBy]);

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
        router.push(`/editor?id=${data.data.id}&template=${template.id}`);
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

  const [showMoreCategories, setShowMoreCategories] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const purchaseParam = searchParams?.get('purchase');
  const planParam = searchParams?.get('plan') || 'Pro';
  const [showPurchaseSuccessModal, setShowPurchaseSuccessModal] = useState(false);

  useEffect(() => {
    if (purchaseParam === 'success') {
      setShowPurchaseSuccessModal(true);
    }
  }, [purchaseParam]);

  const handleClosePurchaseModal = () => {
    setShowPurchaseSuccessModal(false);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.delete('purchase');
      url.searchParams.delete('plan');
      window.history.replaceState({}, '', url.toString());
    }
  };

  const categoriesToShow = showMoreCategories ? activeCategories : activeCategories.slice(0, 7);

  return (
    <>
      <PurchaseSuccessModal
        isOpen={showPurchaseSuccessModal}
        planName={planParam}
        onClose={handleClosePurchaseModal}
      />
      <Navigation />
      <main className="min-h-screen bg-[#F8F8F6] text-[#0F0F0F]">
        <InnerBanner
          badge="150+ Professional Templates"
          badgeIcon={Sparkles}
          breadcrumbs={[{ label: "Templates", href: "/templates" }]}
          title="Professional ATS-Friendly"
          highlightText="Resume Templates"
          titleSuffix="for Every Career"
          description="Choose from 150+ ATS-friendly resume templates designed by career experts and recruiters to help you land your dream job."
          features={[
            "150+ Modern Templates",
            "100% ATS Optimized",
            "Instant PDF Download",
          ]}
        >
          <div className="relative max-w-xl">
            <div className="flex items-center rounded-xl border border-slate-200 bg-white p-1.5 shadow-sm focus-within:ring-2 focus-within:ring-[#F3645C]/30 transition-all">
              <input
                type="text"
                placeholder="Search templates by name, skill or keyword..."
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full bg-transparent px-4 py-2 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none"
              />
              {search && (
                <button
                  onClick={() => handleSearchChange("")}
                  className="p-1 text-slate-400 hover:text-slate-600 mr-2 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => handleSearchChange(search)}
                className="flex shrink-0 cursor-pointer items-center justify-center rounded-lg bg-[#0F0F0F] hover:bg-black p-2.5 text-sm font-semibold text-white shadow-xs transition-all"
                title="Search Templates"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>
        </InnerBanner>

        <div className="marketing-container space-y-10 py-10 sm:py-12">
          <div className="flex flex-col items-stretch justify-between gap-4 md:flex-row md:items-center">
            <div className="flex items-center gap-2.5 overflow-x-auto pb-1 no-scrollbar">
              <button
                onClick={() => {
                  setSelectedStyle('all');
                  handleFilterChange('style', 'all');
                }}
                className={`rounded-xl px-5 py-2.5 text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                  selectedStyle === 'all'
                    ? 'bg-[#0F0F0F] text-white shadow-md'
                    : 'border border-[#0F0F0F]/10 bg-white text-[#333333] shadow-2xs hover:border-[#F3645C] hover:bg-[#FFF8F5]'
                }`}
              >
                All Templates
              </button>

              <button
                onClick={() => handleSortChange('popular')}
                className={`rounded-xl px-5 py-2.5 text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                  sortBy === 'popular' && selectedStyle === 'all'
                    ? 'bg-[#0F0F0F] text-white shadow-md'
                    : 'border border-[#0F0F0F]/10 bg-white text-[#333333] shadow-2xs hover:border-[#F3645C] hover:bg-[#FFF8F5]'
                }`}
              >
                <Flame className="w-4 h-4 text-amber-500" />
                <span>Popular</span>
              </button>

              <button
                onClick={() => handleSortChange('newest')}
                className={`rounded-xl px-5 py-2.5 text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                  sortBy === 'newest'
                    ? 'bg-[#0F0F0F] text-white shadow-md'
                    : 'border border-[#0F0F0F]/10 bg-white text-[#333333] shadow-2xs hover:border-[#F3645C] hover:bg-[#FFF8F5]'
                }`}
              >
                <Sparkles className="w-4 h-4 text-[#F3645C]" />
                <span>New Arrivals</span>
              </button>

              <button
                onClick={() => handleFilterChange('style', 'ats-friendly')}
                className={`rounded-xl px-5 py-2.5 text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                  selectedStyle === 'ats-friendly'
                    ? 'bg-[#0F0F0F] text-white shadow-md'
                    : 'border border-[#0F0F0F]/10 bg-white text-[#333333] shadow-2xs hover:border-[#F3645C] hover:bg-[#FFF8F5]'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>ATS Friendly</span>
              </button>

              <button
                onClick={() => handleFilterChange('style', 'minimal')}
                className={`rounded-xl px-5 py-2.5 text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                  selectedStyle === 'minimal'
                    ? 'bg-[#0F0F0F] text-white shadow-md'
                    : 'border border-[#0F0F0F]/10 bg-white text-[#333333] shadow-2xs hover:border-[#F3645C] hover:bg-[#FFF8F5]'
                }`}
              >
                <Gift className="w-4 h-4 text-pink-500" />
                <span>Free Templates</span>
              </button>
            </div>

            <div className="flex items-center justify-between md:justify-end gap-3">
              <button
                onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                className="lg:hidden flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-slate-700 border border-slate-200 shadow-2xs"
              >
                <Filter className="w-4 h-4 text-slate-500" />
                <span>Filters</span>
              </button>

              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-500 hidden sm:inline">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs sm:text-sm font-bold text-slate-800 focus:border-[#F3645C] focus:ring-2 focus:ring-[#F3645C]/20 focus:outline-none transition-all cursor-pointer shadow-2xs"
                >
                  {sortOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <aside className={`lg:col-span-3 space-y-6 rounded-2xl border border-[#0F0F0F]/10 bg-white p-5 shadow-2xs ${
              mobileFilterOpen ? 'block' : 'hidden lg:block'
            }`}>
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-slate-600" />
                  Filters
                </h3>
                <button
                  onClick={clearAllFilters}
                  className="text-xs font-bold text-[#FF5722] hover:text-[#E64A19] transition-colors cursor-pointer"
                >
                  Clear All
                </button>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Categories</h4>
                <div className="space-y-2">
                  <label className="flex items-center justify-between text-xs font-semibold text-slate-700 hover:text-slate-950 cursor-pointer group">
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={selectedCategory === 'all'}
                        onChange={() => handleFilterChange('category', 'all')}
                        className="rounded border-slate-300 text-[#FF5722] focus:ring-[#FF5722] h-4 w-4 cursor-pointer"
                      />
                      <span className={selectedCategory === 'all' ? 'font-bold text-[#FF5722]' : ''}>
                        All Categories
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400 font-normal">150+</span>
                  </label>

                  {categoriesToShow.map((cat) => {
                    const count = templates.filter(t => isTemplateInCategory(t.id, cat.id)).length;
                    const isChecked = selectedCategory === cat.id;

                    return (
                      <label key={cat.id} className="flex items-center justify-between text-xs font-semibold text-slate-700 hover:text-slate-950 cursor-pointer group">
                        <div className="flex items-center gap-2.5">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleFilterChange('category', cat.id)}
                            className="rounded border-slate-300 text-[#FF5722] focus:ring-[#FF5722] h-4 w-4 cursor-pointer"
                          />
                          <span className={`line-clamp-1 ${isChecked ? 'font-bold text-[#FF5722]' : ''}`}>
                            {cat.name}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-400 font-normal">{count || 12}</span>
                      </label>
                    );
                  })}
                </div>

                {activeCategories.length > 7 && (
                  <button
                    onClick={() => setShowMoreCategories(!showMoreCategories)}
                    className="text-xs font-bold text-[#FF5722] hover:text-[#E64A19] transition-colors pt-1 cursor-pointer"
                  >
                    {showMoreCategories ? 'Show Less' : 'Show More'}
                  </button>
                )}
              </div>

              <div className="border-t border-slate-100 pt-5 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Experience Level</h4>
                <div className="space-y-2">
                  <label className="flex items-center justify-between text-xs font-semibold text-slate-700 hover:text-slate-950 cursor-pointer">
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={selectedExperienceLevel === 'all'}
                        onChange={() => handleFilterChange('experience', 'all')}
                        className="rounded border-slate-300 text-[#FF570F] focus:ring-[#FF570F] h-4 w-4 cursor-pointer"
                      />
                      <span className={selectedExperienceLevel === 'all' ? 'font-bold text-[#FF570F]' : ''}>All Levels</span>
                    </div>
                  </label>

                  {experienceLevels.map((lvl) => {
                    const isChecked = selectedExperienceLevel === lvl.id;
                    return (
                      <label key={lvl.id} className="flex items-center justify-between text-xs font-semibold text-slate-700 hover:text-slate-950 cursor-pointer">
                        <div className="flex items-center gap-2.5">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleFilterChange('experience', lvl.id)}
                            className="rounded border-slate-300 text-[#FF570F] focus:ring-[#FF570F] h-4 w-4 cursor-pointer"
                          />
                          <span className={isChecked ? 'font-bold text-[#FF570F]' : ''}>{lvl.name.split('/')[0].trim()}</span>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="border-t border-slate-100 pt-5 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Style</h4>
                <div className="space-y-2">
                  <label className="flex items-center justify-between text-xs font-semibold text-slate-700 hover:text-slate-950 cursor-pointer">
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={selectedStyle === 'all'}
                        onChange={() => handleFilterChange('style', 'all')}
                        className="rounded border-slate-300 text-[#FF570F] focus:ring-[#FF570F] h-4 w-4 cursor-pointer"
                      />
                      <span className={selectedStyle === 'all' ? 'font-bold text-[#FF570F]' : ''}>All Styles</span>
                    </div>
                  </label>

                  {styleCategories.map((st) => {
                    const isChecked = selectedStyle === st.id;
                    return (
                      <label key={st.id} className="flex items-center justify-between text-xs font-semibold text-slate-700 hover:text-slate-950 cursor-pointer">
                        <div className="flex items-center gap-2.5">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleFilterChange('style', st.id)}
                            className="rounded border-slate-300 text-[#FF570F] focus:ring-[#FF570F] h-4 w-4 cursor-pointer"
                          />
                          <span className={isChecked ? 'font-bold text-[#FF570F]' : ''}>{st.name}</span>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="border-t border-slate-100 pt-5 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Color</h4>
                <div className="flex flex-wrap gap-2.5">
                  <button
                    onClick={() => handleFilterChange('style', 'all')}
                    title="All Colors"
                    className="w-6 h-6 rounded-full transition-transform cursor-pointer relative flex items-center justify-center bg-gradient-to-r from-blue-500 via-[#FF570F] to-pink-500 border border-slate-300"
                  />
                  <div className="w-6 h-6 rounded-full bg-blue-900 transition-transform cursor-pointer" title="Navy Blue" />
                  <div className="w-6 h-6 rounded-full bg-teal-600 transition-transform cursor-pointer" title="Teal" />
                  <div className="w-6 h-6 rounded-full bg-sky-500 transition-transform cursor-pointer" title="Light Blue" />
                  <div className="w-6 h-6 rounded-full bg-[#FF570F] transition-transform cursor-pointer" title="Purple" />
                  <div className="w-6 h-6 rounded-full bg-pink-600 transition-transform cursor-pointer" title="Pink" />
                  <div className="w-6 h-6 rounded-full bg-orange-600 transition-transform cursor-pointer" title="Orange" />
                  <div className="w-6 h-6 rounded-full bg-slate-800 transition-transform cursor-pointer" title="Dark Gray" />
                </div>
              </div>
            </aside>

            <div className="lg:col-span-9 space-y-6">
              {pagedTemplates.length === 0 ? (
                <div className="rounded-md border border-dashed border-slate-200 bg-white p-12 text-center">
                  <div className="mx-auto w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                    <Search className="w-8 h-8 text-slate-400" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 mb-2">No templates found</h2>
                  <p className="text-slate-600 text-sm mb-6 max-w-sm mx-auto">
                    We couldn't find any templates matching your filter criteria. Try clearing some filters.
                  </p>
                  <button
                    onClick={clearAllFilters}
                    className="inline-flex items-center gap-2 rounded-md bg-[#FF570F] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#E04800] transition-colors shadow-xs"
                  >
                    <X className="w-4 h-4" />
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {pagedTemplates.map((template, idx) => {
                    const categories = getTemplateCategories(template);
                    const isFavorited = favorites.includes(template.id);
                    const isPopular = idx % 2 === 0;

                    return (
                      <article
                        key={template.id}
                        className="group relative flex flex-col justify-between rounded-2xl border border-[#0F0F0F]/10 bg-white p-3.5 shadow-2xs transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                      >
                        <div className="relative">
                          <TemplatePreview template={template} />

                          <button
                            type="button"
                            onClick={() =>
                              setFavorites((prev) =>
                                prev.includes(template.id)
                                  ? prev.filter((id) => id !== template.id)
                                  : [...prev, template.id]
                              )
                            }
                            className={`absolute right-2.5 top-2.5 rounded-full p-1.5 shadow-sm backdrop-blur-xs transition-colors cursor-pointer z-10 ${
                              isFavorited
                                ? 'bg-rose-50 text-rose-500 border border-rose-200'
                                : 'bg-white/90 text-slate-400 hover:text-rose-500'
                            }`}
                          >
                            <Heart className={`w-3.5 h-3.5 ${isFavorited ? 'fill-rose-500 text-rose-500' : ''}`} />
                          </button>

                          <div className="absolute right-2.5 top-2.5 font-bold z-0 pointer-events-none">
                            <span className="hidden group-hover:hidden sm:inline-flex items-center gap-1 rounded-full bg-emerald-100/90 text-emerald-800 px-2 py-0.5 text-[9px] border border-emerald-200 backdrop-blur-xs">
                              ATS Friendly
                            </span>
                          </div>

                          <div className="absolute left-2.5 bottom-2.5 z-10">
                            {isPopular ? (
                              <span className="inline-flex items-center gap-1 rounded-full bg-amber-100/90 text-amber-800 px-2 py-0.5 text-[9px] font-bold border border-amber-200/70 backdrop-blur-xs shadow-2xs">
                                <Flame className="w-2.5 h-2.5 text-amber-600 fill-amber-500" />
                                Popular
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 rounded-full bg-[#FFF0EB]/90 text-purple-800 px-2 py-0.5 text-[9px] font-bold border border-purple-200/70 backdrop-blur-xs shadow-2xs">
                                <Sparkles className="w-2.5 h-2.5 text-[#FF5722]" />
                                New
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="mt-3 space-y-2 flex-1 flex flex-col justify-between">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0 flex-1">
                              <h3 className="line-clamp-1 text-sm font-bold text-slate-900 group-hover:text-[#FF5722] transition-colors">
                                {template.layout.name}
                              </h3>
                              <p className="line-clamp-1 text-xs text-slate-500 font-medium mt-0.5">
                                {categories[0] || template.category || 'Software Development'}
                              </p>
                            </div>

                            <div 
                              className="flex items-center gap-1.5 text-xs font-bold text-[#FF570F] bg-[#EEF2FF] px-2.5 py-1 rounded-xl border border-[#E0E7FF] flex-shrink-0 cursor-default shadow-2xs"
                              title="Live Dynamic Template Downloads"
                            >
                              <Download className="w-3.5 h-3.5 text-[#FF570F]" />
                              <span>{formatDownloadCount(downloadCounts[template.id] ?? getTemplateDownloadCount(template.id))}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 pt-1">
                            <div className="w-2.5 h-2.5 rounded-full bg-blue-900"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-teal-600"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-slate-800"></div>
                          </div>

                          <div className="flex items-center gap-2 pt-2">
                            <button
                              type="button"
                              onClick={() => handleUseTemplate(template)}
                              disabled={addingId === template.id}
                              className="flex flex-1 cursor-pointer items-center justify-center gap-1 rounded-lg bg-[#0F0F0F] px-3 py-2 text-xs font-bold text-white shadow-2xs transition-colors hover:bg-[#333333]"
                            >
                              <span>{addingId === template.id ? 'Adding...' : 'Use Template'}</span>
                            </button>
                            
                            <button
                              type="button"
                              onClick={() => setSelectedTemplate(template)}
                              title="Quick Preview"
                              className="cursor-pointer rounded-lg border border-[#0F0F0F]/10 bg-[#F5D17B] p-2 text-[#0F0F0F] transition-colors hover:bg-[#EBC35D]"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}

              {totalPages > 1 && (
                <div className="mt-8 flex items-center justify-center gap-2 pt-4">
                  <button
                    type="button"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="rounded-md border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 disabled:opacity-40 cursor-pointer shadow-2xs"
                  >
                    Previous
                  </button>
                  <span className="text-xs font-semibold text-slate-500 px-3">
                    Page {page} of {totalPages}
                  </span>
                  <button
                    type="button"
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="rounded-md border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 disabled:opacity-40 cursor-pointer shadow-2xs"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="pt-12 border-t border-slate-200/80">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {platformFeatures.map((feat, idx) => {
                const Icon = feat.icon;
                return (
                  <div
                    key={idx}
                    className="space-y-2.5 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xs transition-all duration-200 hover:shadow-md"
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-2xs"
                      style={{ backgroundColor: feat.accent }}
                    >
                      <Icon className="w-5 h-5 text-[#0F0F0F]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#0F0F0F] text-xs sm:text-sm">
                        {feat.title}
                      </h3>
                      <p className="text-slate-500 text-xs leading-relaxed mt-0.5 font-normal">
                        {feat.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {selectedTemplate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-7 shadow-2xl border border-slate-100 space-y-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div>
                    <h3 className="text-xl font-extrabold text-[#0F0F0F]">{selectedTemplate.layout.name}</h3>
                    <p className="text-xs text-slate-500 mt-1 font-normal">{selectedTemplate.description}</p>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#0F0F0F] bg-[#F5D17B] px-3 py-1 rounded-full border border-slate-200/80 flex-shrink-0 shadow-2xs">
                    <Download className="w-3.5 h-3.5 text-[#0F0F0F]" />
                    <span>{formatDownloadCount(downloadCounts[selectedTemplate.id] ?? getTemplateDownloadCount(selectedTemplate.id))} downloads</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedTemplate(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="rounded-xl border border-slate-200 overflow-hidden bg-slate-50 p-4">
                <TemplatePreview template={selectedTemplate} />
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleUseTemplate(selectedTemplate)}
                  className="flex-1 rounded-xl bg-[#0F0F0F] hover:bg-[#262626] py-3 text-center text-xs font-bold text-white shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Use This Template</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedTemplate(null)}
                  className="px-5 py-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      <ReadyToBuild />
      <Footer />
    </>
  );
}

export default function TemplatesClientPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center text-slate-500 font-semibold">
          Loading templates...
        </div>
      }
    >
      <TemplatesContent />
    </Suspense>
  );
}
