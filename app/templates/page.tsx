'use client';

import React, { useMemo, useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import Navigation from '@/components/Navigation';
import ReadyToBuild from '@/components/sections/ReadyToBuild';
import Footer from '@/components/Footer';
import { TemplateRenderer } from '@/components/cv';
import { sampleCV } from '@/data/sampleCV';
import { GeneratedTemplate, generateTemplates, getTemplateStats } from '@/lib/generateTemplates';
import { useAuthStore } from '@/lib/store/authStore';
import { 
  templateCategories, 
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
  ChevronDown,
  Star,
  Zap,
  Users,
  Briefcase,
  Award,
  Palette,
  Code,
  Heart,
  Flame,
  Gift,
  Check,
  Grid,
  LayoutGrid,
  SlidersHorizontal,
  ChevronRight
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
    iconBg: 'bg-[#FFF0EB] text-[#FF570F]',
    title: 'ATS Friendly Templates',
    description: 'Professionally designed templates that pass ATS scans and get you noticed by recruiters.',
  },
  {
    icon: Edit,
    iconBg: 'bg-blue-100 text-blue-600',
    title: 'Easy Customization',
    description: 'Drag, drop, and customize sections to create a resume that perfectly matches your style.',
  },
  {
    icon: Sparkles,
    iconBg: 'bg-emerald-100 text-emerald-600',
    title: 'AI-Powered Suggestions',
    description: 'Get intelligent suggestions for your content, skills, and achievements powered by AI.',
  },
  {
    icon: Eye,
    iconBg: 'bg-amber-100 text-amber-600',
    title: 'Real-time Preview',
    description: 'See changes instantly with our real-time preview as you build your resume.',
  },
  {
    icon: Download,
    iconBg: 'bg-rose-100 text-rose-600',
    title: 'Multiple Export Options',
    description: 'Download your resume in PDF, Word, or plain text format with perfect formatting.',
  },
  {
    icon: BarChart2,
    iconBg: 'bg-teal-100 text-teal-600',
    title: 'Resume Score Analysis',
    description: 'Get a detailed score and tips to improve your resume and increase your interview chances.',
  },
  {
    icon: Globe,
    iconBg: 'bg-amber-100 text-amber-600',
    title: 'Multi-language Support',
    description: 'Create resumes in multiple languages and reach global opportunities.',
  },
  {
    icon: Smartphone,
    iconBg: 'bg-[#FFF0EB] text-[#FF570F]',
    title: 'Mobile Responsive',
    description: 'Build and edit your resume seamlessly on any device, anywhere, anytime.',
  },
  {
    icon: ShieldCheck,
    iconBg: 'bg-blue-100 text-blue-600',
    title: 'Data Privacy & Security',
    description: 'Your data is encrypted and secure. We never share your information with third parties.',
  },
  {
    icon: Headphones,
    iconBg: 'bg-teal-100 text-teal-600',
    title: 'Expert Support',
    description: 'Get help when you need it with our dedicated support team available 24/7.',
  },
];

// Enhanced category detection with template category mapping
function getTemplateCategories(template: GeneratedTemplate): string[] {
  const categories = getCategoriesForTemplate(template.id);
  return categories.map(cat => cat.name);
}

function getTemplateBadges(template: GeneratedTemplate): { type: string; label: string; color: string }[] {
  const badges = [];
  
  // ATS Friendly badge
  const text = `${template.name} ${template.category} ${template.layout.name}`.toLowerCase();
  if (text.includes('ats') || text.includes('compact') || text.includes('single column')) {
    badges.push({ type: 'ats', label: 'ATS Ready', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' });
  }
  
  // Style badges based on layout category
  if (template.layout.category === 'Creative') {
    badges.push({ type: 'style', label: 'Creative', color: 'bg-orange-50 text-orange-700 border-orange-200' });
  } else if (template.layout.category === 'Luxury') {
    badges.push({ type: 'style', label: 'Premium', color: 'bg-[#FFF8F5] text-[#E04800] border-purple-200' });
  } else if (template.layout.category === 'Modern') {
    badges.push({ type: 'style', label: 'Modern', color: 'bg-blue-50 text-blue-700 border-blue-200' });
  } else if (template.layout.category === 'Professional') {
    badges.push({ type: 'style', label: 'Professional', color: 'bg-gray-50 text-gray-700 border-gray-200' });
  }
  
  return badges;
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
  
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedExperienceLevel, setSelectedExperienceLevel] = useState('all');
  const [selectedStyle, setSelectedStyle] = useState('all');
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  
  // UI states
  const [page, setPage] = useState(1);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<GeneratedTemplate | null>(null);
  const [addingId, setAddingId] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
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
  const stats = useMemo(() => getTemplateStats(), []);
  const activeCategories = useMemo(() => getActiveCategoriesForTemplates(), []);
  
  // Initialize from URL parameters
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

  // Update URL when filters change
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
      // Category filter
      if (selectedCategory !== 'all') {
        const belongsToCategory = isTemplateInCategory(template.id, selectedCategory);
        if (!belongsToCategory) return false;
      }
      
      // Experience level filter
      if (selectedExperienceLevel !== 'all') {
        const templateCategories = getCategoriesForTemplate(template.id);
        const hasExperienceLevel = templateCategories.some(cat => 
          cat.experienceLevel.includes(selectedExperienceLevel as any)
        );
        if (!hasExperienceLevel) return false;
      }
      
      // Style filter
      if (selectedStyle !== 'all') {
        const templateCategories = getCategoriesForTemplate(template.id);
        const hasStyle = templateCategories.some(cat => 
          cat.styles.includes(selectedStyle as any)
        );
        if (!hasStyle) return false;
      }
      
      // Industry filter
      if (selectedIndustry !== 'all') {
        const templateCategories = getCategoriesForTemplate(template.id);
        const hasIndustry = templateCategories.some(cat => 
          cat.industries.includes(selectedIndustry) || cat.industries.includes('All Industries')
        );
        if (!hasIndustry) return false;
      }

      // Search filter
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

  // Sort templates
  const sortedTemplates = useMemo(() => {
    const sorted = [...filteredTemplates];
    
    switch (sortBy) {
      case 'alphabetical':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'newest':
        return sorted.sort((a, b) => b.id.localeCompare(a.id)); // Assuming newer templates have later IDs
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
        // Keep current order as "popular" (you could add actual popularity metrics here)
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

  const categoriesToShow = showMoreCategories ? activeCategories : activeCategories.slice(0, 7);

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-[#F8FAFC]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
          
          {/* ========================================================================= */}
          {/* HERO BANNER SECTION (Matches reference mockup) */}
          {/* ========================================================================= */}
          <section className="relative rounded-md bg-gradient-to-r from-[#EFF6FF] via-[#EEF2FF] to-[#F5F3FF] p-6 sm:p-10 border border-[#FF570F]/60 overflow-hidden shadow-2xs">
            {/* Background Decorative Dot Grid Matrix */}
            <div className="absolute right-6 top-6 hidden lg:block opacity-20 pointer-events-none">
              <div className="grid grid-cols-6 gap-2">
                {Array.from({ length: 36 }).map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#FF570F]"></div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Content Column */}
              <div className="lg:col-span-7 space-y-6">
                <div className="space-y-3">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                    Professional Resume Templates
                  </h1>
                  <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed max-w-xl">
                    Choose from 100+ ATS-friendly resume templates designed by professionals to help you land your dream job.
                  </p>
                </div>

                {/* Main Hero Search Bar */}
                <div className="relative max-w-xl">
                  <div className="flex items-center rounded-md bg-white p-1.5 shadow-md border border-[#FF570F]">
                    <input
                      type="text"
                      placeholder="Search templates by name, skill or keyword..."
                      value={search}
                      onChange={(e) => handleSearchChange(e.target.value)}
                      className="w-full bg-transparent px-4 py-2.5 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none"
                    />
                    {search && (
                      <button
                        onClick={() => handleSearchChange('')}
                        className="p-1 text-slate-400 hover:text-slate-600 mr-2"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => handleSearchChange(search)}
                      className="rounded-md bg-[#FF570F] hover:bg-[#E04800] text-white px-5 py-2.5 text-sm font-semibold transition-colors shadow-xs flex items-center justify-center shrink-0"
                    >
                      <Search className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Key Stat Pills */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <div className="flex items-center gap-2 rounded-md bg-white/80 px-3.5 py-2 text-xs font-bold text-slate-700 border border-[#FF570F]/70 shadow-2xs backdrop-blur-xs">
                    <span className="w-6 h-6 rounded-md bg-[#FFF0EB] text-[#FF570F] flex items-center justify-center text-xs">💼</span>
                    <span><strong className="text-slate-900">150+</strong> Templates</span>
                  </div>

                  <div className="flex items-center gap-2 rounded-md bg-white/80 px-3.5 py-2 text-xs font-bold text-slate-700 border border-[#FF570F]/70 shadow-2xs backdrop-blur-xs">
                    <span className="w-6 h-6 rounded-md bg-[#FFF0EB] text-[#FF570F] flex items-center justify-center text-xs">🏷️</span>
                    <span><strong className="text-slate-900">25+</strong> Categories</span>
                  </div>

                  <div className="flex items-center gap-2 rounded-md bg-white/80 px-3.5 py-2 text-xs font-bold text-slate-700 border border-[#FF570F]/70 shadow-2xs backdrop-blur-xs">
                    <span className="w-6 h-6 rounded-md bg-[#FFF0EB] text-[#FF570F] flex items-center justify-center text-xs">🛡️</span>
                    <span><strong className="text-slate-900">ATS</strong> Friendly</span>
                  </div>

                  <div className="flex items-center gap-2 rounded-md bg-white/80 px-3.5 py-2 text-xs font-bold text-slate-700 border border-[#FF570F]/70 shadow-2xs backdrop-blur-xs">
                    <span className="w-6 h-6 rounded-md bg-[#FFF0EB] text-[#FF570F] flex items-center justify-center text-xs">🎨</span>
                    <span><strong className="text-slate-900">Professional</strong> Designs</span>
                  </div>
                </div>
              </div>

              {/* Right Graphics Fan Array */}
              <div className="lg:col-span-5 hidden lg:block relative">
                <div className="relative w-full h-[260px] flex items-center justify-center">
                  <div className="absolute w-64 h-64 rounded-full bg-gradient-to-tr from-indigo-200/50 to-purple-200/40 blur-xl"></div>
                  
                  <div className="relative w-full flex items-center justify-center scale-90">
                    <div className="absolute left-4 top-2 transform -rotate-12 translate-y-4 w-44 rounded-md border border-slate-200 bg-white p-2.5 shadow-lg opacity-90 transition hover:rotate-0">
                      <div className="h-44 rounded-md bg-slate-100 p-2 space-y-2">
                        <div className="h-4 w-1/2 bg-[#FF570F] rounded"></div>
                        <div className="h-2 w-3/4 bg-slate-300 rounded"></div>
                        <div className="h-20 bg-slate-200 rounded mt-3"></div>
                      </div>
                    </div>

                    <div className="absolute right-4 top-2 transform rotate-12 translate-y-4 w-44 rounded-md border border-slate-200 bg-white p-2.5 shadow-lg opacity-90 transition hover:rotate-0">
                      <div className="h-44 rounded-md bg-slate-100 p-2 space-y-2">
                        <div className="h-4 w-1/2 bg-blue-600 rounded"></div>
                        <div className="h-2 w-3/4 bg-slate-300 rounded"></div>
                        <div className="h-20 bg-slate-200 rounded mt-3"></div>
                      </div>
                    </div>

                    <div className="relative z-10 w-48 rounded-md border border-slate-200 bg-white p-3 shadow-2xl transform -translate-y-2">
                      <div className="h-48 rounded-md bg-slate-50 p-2.5 space-y-2 border border-slate-100">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-slate-800"></div>
                          <div className="space-y-1">
                            <div className="h-2.5 w-16 bg-slate-800 rounded"></div>
                            <div className="h-1.5 w-10 bg-slate-400 rounded"></div>
                          </div>
                        </div>
                        <div className="h-1 bg-teal-500 w-full rounded my-2"></div>
                        <div className="space-y-1.5">
                          <div className="h-2 bg-slate-200 rounded w-full"></div>
                          <div className="h-2 bg-slate-200 rounded w-5/6"></div>
                          <div className="h-2 bg-slate-200 rounded w-4/6"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* MIDDLE FILTER CONTROL BAR */}
          {/* ========================================================================= */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            
            {/* Quick Pill Filter Buttons */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
              <button
                onClick={() => {
                  setSelectedStyle('all');
                  handleFilterChange('style', 'all');
                }}
                className={`rounded-md px-4 py-2.5 text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                  selectedStyle === 'all'
                    ? 'bg-[#FF570F] text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80'
                }`}
              >
                All Templates
              </button>

              <button
                onClick={() => handleSortChange('popular')}
                className={`rounded-md px-4 py-2.5 text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  sortBy === 'popular' && selectedStyle === 'all'
                    ? 'bg-[#FF570F] text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80'
                }`}
              >
                <Flame className="w-3.5 h-3.5 text-amber-500" />
                <span>Popular</span>
              </button>

              <button
                onClick={() => handleSortChange('newest')}
                className={`rounded-md px-4 py-2.5 text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  sortBy === 'newest'
                    ? 'bg-[#FF570F] text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#FF570F]" />
                <span>New Arrivals</span>
              </button>

              <button
                onClick={() => handleFilterChange('style', 'ats-friendly')}
                className={`rounded-md px-4 py-2.5 text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  selectedStyle === 'ats-friendly'
                    ? 'bg-[#FF570F] text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>ATS Friendly</span>
              </button>

              <button
                onClick={() => handleFilterChange('style', 'minimal')}
                className={`rounded-md px-4 py-2.5 text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  selectedStyle === 'minimal'
                    ? 'bg-[#FF570F] text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80'
                }`}
              >
                <Gift className="w-3.5 h-3.5 text-pink-500" />
                <span>Free Templates</span>
              </button>
            </div>

            {/* Right Controls: Sort & Mobile Filter Toggle */}
            <div className="flex items-center justify-between md:justify-end gap-3">
              <button
                onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                className="lg:hidden flex items-center gap-2 rounded-md bg-white px-4 py-2.5 text-xs font-bold text-slate-700 border border-slate-200 shadow-2xs"
              >
                <Filter className="w-4 h-4 text-slate-500" />
                <span>Filters</span>
              </button>

              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-slate-500 hidden sm:inline">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="rounded-md border border-slate-200 bg-white px-3.5 py-2.5 text-xs sm:text-sm font-bold text-slate-700 focus:border-[#FF570F] focus:outline-none transition-all cursor-pointer shadow-2xs"
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

          {/* ========================================================================= */}
          {/* MAIN LAYOUT: SIDEBAR + TEMPLATE GRID */}
          {/* ========================================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* ----------------------------------------------------------------------- */}
            {/* LEFT SIDEBAR (FILTERS) */}
            {/* ----------------------------------------------------------------------- */}
            <aside className={`lg:col-span-3 bg-white rounded-md border border-slate-200/90 p-5 space-y-6 shadow-2xs ${
              mobileFilterOpen ? 'block' : 'hidden lg:block'
            }`}>
              
              {/* Sidebar Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-slate-600" />
                  Filters
                </h3>
                <button
                  onClick={clearAllFilters}
                  className="text-xs font-bold text-[#FF570F] hover:text-[#E04800] transition-colors cursor-pointer"
                >
                  Clear All
                </button>
              </div>

              {/* 1. Categories Section */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Categories</h4>
                <div className="space-y-2">
                  <label className="flex items-center justify-between text-xs font-semibold text-slate-700 hover:text-slate-950 cursor-pointer group">
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={selectedCategory === 'all'}
                        onChange={() => handleFilterChange('category', 'all')}
                        className="rounded border-slate-300 text-[#FF570F] focus:ring-[#FF570F] h-4 w-4 cursor-pointer"
                      />
                      <span className={selectedCategory === 'all' ? 'font-bold text-[#FF570F]' : ''}>
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
                            className="rounded border-slate-300 text-[#FF570F] focus:ring-[#FF570F] h-4 w-4 cursor-pointer"
                          />
                          <span className={`line-clamp-1 ${isChecked ? 'font-bold text-[#FF570F]' : ''}`}>
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
                    className="text-xs font-bold text-[#FF570F] hover:text-[#E04800] transition-colors pt-1 cursor-pointer"
                  >
                    {showMoreCategories ? 'Show Less' : 'Show More'}
                  </button>
                )}
              </div>

              {/* 2. Experience Level Section */}
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

              {/* 3. Style Section */}
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

              {/* 4. Color Swatches Filter Section */}
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

            {/* ----------------------------------------------------------------------- */}
            {/* RIGHT TEMPLATE GRID */}
            {/* ----------------------------------------------------------------------- */}
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {pagedTemplates.map((template, idx) => {
                    const categories = getTemplateCategories(template);
                    const isFavorited = favorites.includes(template.id);
                    const isPopular = idx % 2 === 0;

                    return (
                      <article
                        key={template.id}
                        className="group rounded-md border border-slate-200/90 bg-white p-3.5 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between relative"
                      >
                        {/* Preview Container with Overlay Badges */}
                        <div className="relative">
                          <TemplatePreview template={template} />

                          {/* Top-Right Favorite Bookmark Button */}
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

                          {/* Top-Right Green ATS Friendly Badge Pill */}
                          <div className="absolute right-2.5 top-2.5 font-bold z-0 pointer-events-none">
                            <span className="hidden group-hover:hidden sm:inline-flex items-center gap-1 rounded-full bg-emerald-100/90 text-emerald-800 px-2 py-0.5 text-[9px] border border-emerald-200 backdrop-blur-xs">
                              ATS Friendly
                            </span>
                          </div>

                          {/* Bottom-Left Status Pill (Popular / New) */}
                          <div className="absolute left-2.5 bottom-2.5 z-10">
                            {isPopular ? (
                              <span className="inline-flex items-center gap-1 rounded-full bg-amber-100/90 text-amber-800 px-2 py-0.5 text-[9px] font-bold border border-amber-200/70 backdrop-blur-xs shadow-2xs">
                                <Flame className="w-2.5 h-2.5 text-amber-600 fill-amber-500" />
                                Popular
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 rounded-full bg-[#FFF0EB]/90 text-purple-800 px-2 py-0.5 text-[9px] font-bold border border-purple-200/70 backdrop-blur-xs shadow-2xs">
                                <Sparkles className="w-2.5 h-2.5 text-[#FF570F]" />
                                New
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Card Info Details */}
                        <div className="mt-3 space-y-2 flex-1 flex flex-col justify-between">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0 flex-1">
                              <h3 className="line-clamp-1 text-sm font-bold text-slate-900 group-hover:text-[#FF570F] transition-colors">
                                {template.layout.name}
                              </h3>
                              <p className="line-clamp-1 text-xs text-slate-500 font-medium mt-0.5">
                                {categories[0] || template.category || 'Software Development'}
                              </p>
                            </div>

                            {/* Dynamic Real Download Count Pill (Matching Screenshot Style) */}
                            <div 
                              className="flex items-center gap-1.5 text-xs font-bold text-[#FF570F] bg-[#EEF2FF] px-2.5 py-1 rounded-xl border border-[#E0E7FF] flex-shrink-0 cursor-default shadow-2xs"
                              title="Live Dynamic Template Downloads"
                            >
                              <Download className="w-3.5 h-3.5 text-[#FF570F]" />
                              <span>{formatDownloadCount(downloadCounts[template.id] ?? getTemplateDownloadCount(template.id))}</span>
                            </div>
                          </div>

                          {/* Color Palette Swatches Row */}
                          <div className="flex items-center gap-1.5 pt-1">
                            <div className="w-2.5 h-2.5 rounded-full bg-blue-900"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-teal-600"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-slate-800"></div>
                          </div>

                          {/* Action Buttons Row */}
                          <div className="flex items-center gap-2 pt-2">
                            <button
                              type="button"
                              onClick={() => handleUseTemplate(template)}
                              disabled={addingId === template.id}
                              className="rounded-md bg-[#FF570F] hover:bg-[#E04800] text-white text-xs font-bold py-2 px-3 flex-1 transition-colors shadow-2xs flex items-center justify-center gap-1 cursor-pointer"
                            >
                              <span>{addingId === template.id ? 'Adding...' : 'Use Template'}</span>
                            </button>
                            
                            <button
                              type="button"
                              onClick={() => setSelectedTemplate(template)}
                              title="Quick Preview"
                              className="rounded-md bg-slate-100 hover:bg-slate-200 text-slate-600 p-2 border border-slate-200/80 transition-colors cursor-pointer"
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

              {/* Pagination */}
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

          {/* Platform Features Bar */}
          <div className="pt-12 border-t border-slate-200/80">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {platformFeatures.map((feat, idx) => {
                const Icon = feat.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-md border border-slate-200/80 p-4 shadow-2xs hover:shadow-md transition-all duration-200 space-y-2"
                  >
                    <div className={`w-9 h-9 rounded-md ${feat.iconBg} flex items-center justify-center shrink-0`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-xs">
                        {feat.title}
                      </h3>
                      <p className="text-slate-500 text-[11px] leading-relaxed mt-0.5">
                        {feat.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Template Detail Preview Modal */}
        {selectedTemplate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
            <div className="bg-white rounded-md max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl border border-slate-100 space-y-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{selectedTemplate.layout.name}</h3>
                    <p className="text-xs text-slate-500 mt-1">{selectedTemplate.description}</p>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-700 bg-[#FFF8F5] px-3 py-1 rounded-full border border-[#FF570F]/80 flex-shrink-0">
                    <Download className="w-3.5 h-3.5 text-[#FF570F]" />
                    <span>{formatDownloadCount(downloadCounts[selectedTemplate.id] ?? getTemplateDownloadCount(selectedTemplate.id))} downloads</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedTemplate(null)}
                  className="p-2 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="rounded-md border border-slate-200 overflow-hidden bg-slate-50 p-4">
                <TemplatePreview template={selectedTemplate} />
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleUseTemplate(selectedTemplate)}
                  className="flex-1 rounded-md bg-[#FF570F] hover:bg-[#E04800] py-3 text-center text-xs font-bold text-white shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Use This Template</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedTemplate(null)}
                  className="px-5 py-3 rounded-md border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
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

export default function TemplatesPage() {
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
