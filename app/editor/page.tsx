'use client';

import React, { useMemo, useRef, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import safeHtml2Canvas from '@/lib/safeHtml2Canvas';
import { jsPDF } from 'jspdf';
import toast, { Toaster } from 'react-hot-toast';
import { TemplateRenderer } from '@/components/cv';
import { CVData, CertificationItem, EducationItem, ExperienceItem, LanguageItem, ProjectItem, SkillItem, sampleCV } from '@/data/sampleCV';
import { getAllLayouts, Layout } from '@/data/layouts';
import { getAllThemes, Theme } from '@/data/themes';
import { useAuthStore } from '@/lib/store/authStore';
import UserProfileDropdown from '@/components/auth/UserProfileDropdown';
import { GeneratedTemplate, SectionVariant, generateTemplates } from '@/lib/generateTemplates';
import { 
  User, FileText, Briefcase, GraduationCap, Link as LinkIcon, Folder, Award, 
  Languages, Palette, ArrowLeft, Undo2, Redo2, Eye, Save, Download, ChevronUp, 
  ChevronDown, CheckCircle2, GripVertical, Plus, Trash2, Camera, UserCircle, LineChart,
  Edit3, Layers, SlidersHorizontal, ChevronLeft, ChevronRight, Share2, Sparkles, ShieldCheck,
  Mic, MicOff, Wand2, Volume2
} from 'lucide-react';
// AI Assist components & hook
import AIFieldButton from '@/components/editor/AIFieldButton';
import AICreditsIndicator from '@/components/editor/AICreditsIndicator';
import SaveTemplateModal from '@/components/editor/SaveTemplateModal';
import ATSAnalyzerModal from '@/components/editor/ATSAnalyzerModal';
import ShareResumeModal from '@/components/editor/ShareResumeModal';
import AICoverLetterModal from '@/components/editor/AICoverLetterModal';
import AIImprovementModal from '@/components/editor/AIImprovementModal';
import DownloadLimitModal from '@/components/editor/DownloadLimitModal';
import ResumeImportModal from '@/components/modals/ResumeImportModal';
import VoiceAICommandCenter from '@/components/editor/VoiceAICommandCenter';
import VoiceAIFieldAssist from '@/components/editor/VoiceAIFieldAssist';
import A4MultiPageContainer from '@/components/cv/A4MultiPageContainer';
import { useAIAssist } from '@/lib/hooks/useAIAssist';
import { exportToNativeDocx } from '@/lib/export/docxExporter';
import { exportToVectorPDF } from '@/lib/export/vectorPdfExporter';

type EditorTab = 'content' | 'design' | 'layout' | 'settings';
type ExportType = 'pdf' | 'docx' | 'txt' | 'png' | 'jpg';
type BuilderStep = 'personal' | 'summary' | 'experience' | 'education' | 'skills' | 'projects' | 'certifications' | 'languages' | 'design' | 'download';
type SectionKey = 'summary' | 'experience' | 'education' | 'skills' | 'projects' | 'certifications' | 'languages';

const builderSteps: { id: BuilderStep; tab: EditorTab; title: string; helper: string; icon: any }[] = [
  { id: 'personal', tab: 'content', title: 'Personal Information', helper: 'Add your basic information and contact details.', icon: User },
  { id: 'summary', tab: 'content', title: 'Summary', helper: 'Write a short pitch for your next role.', icon: LineChart },
  { id: 'experience', tab: 'content', title: 'Experience', helper: 'Add your latest work experience first.', icon: Briefcase },
  { id: 'education', tab: 'content', title: 'Education', helper: 'Add degrees, schools, courses, and dates.', icon: GraduationCap },
  { id: 'skills', tab: 'content', title: 'Skills', helper: 'Show tools, strengths, and proficiency.', icon: LinkIcon },
  { id: 'projects', tab: 'content', title: 'Projects', helper: 'Highlight portfolio work and outcomes.', icon: Folder },
  { id: 'certifications', tab: 'content', title: 'Certifications', helper: 'Add verified credentials and licenses.', icon: Award },
  { id: 'languages', tab: 'content', title: 'Languages', helper: 'List languages and proficiency.', icon: Languages },
  { id: 'design', tab: 'design', title: 'Design & Layout', helper: 'Choose the template, theme, and visual style.', icon: Palette },
];

const sectionLabels: Record<SectionKey, string> = {
  summary: 'Summary',
  experience: 'Experience',
  education: 'Education',
  skills: 'Skills',
  projects: 'Projects',
  certifications: 'Certifications',
  languages: 'Languages',
};

const fontFamilies = [
  { name: 'Roboto', value: 'Roboto, sans-serif' },
];

const emptyVisibility = { summary: true, experience: true, education: true, skills: true, projects: true, certifications: true, languages: true };

function isHex(value: string) { return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value); }

function fileName(data: CVData, extension: ExportType) {
  const name = `${data.personal.firstName || 'resume'}-${data.personal.lastName || 'cv'}`.replace(/[^a-z0-9-]+/gi, '-').replace(/-+/g, '-').toLowerCase();
  return `${name}.${extension}`;
}

function completedStep(step: BuilderStep, data: CVData) {
  if (step === 'personal') return Boolean(data.personal.firstName && data.personal.email);
  if (step === 'summary') return data.summary.trim().length > 10;
  if (step === 'experience') return data.experience.length > 0;
  if (step === 'education') return data.education.length > 0;
  if (step === 'skills') return data.skills.length > 0;
  if (step === 'projects') return Boolean(data.projects?.length);
  if (step === 'certifications') return Boolean(data.certifications?.length);
  if (step === 'languages') return Boolean(data.languages?.length);
  if (step === 'design') return true;
  return true;
}

function prepareExportData(data: CVData, visibility: Record<SectionKey, boolean>) {
  return {
    ...data,
    summary: visibility.summary ? data.summary : '',
    experience: visibility.experience ? data.experience : [],
    education: visibility.education ? data.education : [],
    skills: visibility.skills ? data.skills : [],
    projects: visibility.projects ? data.projects : [],
    certifications: visibility.certifications ? data.certifications : [],
    languages: visibility.languages ? data.languages : [],
  };
}

const Field = ({ label, value, onChange, type = 'text', placeholder, icon: Icon }: any) => (
  <label className="grid gap-1.5 text-xs font-bold text-slate-700">
    <div className="flex items-center gap-2">
      {Icon && <Icon className="w-3.5 h-3.5" />}
      <span>{label}</span>
    </div>
    <input type={type} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className="h-11 w-full rounded-md border border-slate-200 bg-white px-3.5 text-base sm:text-[12px] text-slate-900 shadow-2xs outline-none transition-all focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20" />
  </label>
);

const TextField = ({ label, value, onChange, rows = 4, placeholder, icon: Icon }: any) => (
  <label className="grid gap-1.5 text-xs font-bold text-slate-700">
    <div className="flex items-center gap-2">
      {Icon && <Icon className="w-3.5 h-3.5" />}
      <span>{label}</span>
    </div>
    <textarea rows={rows} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className="w-full resize-y rounded-md border border-slate-200 bg-white px-3.5 py-2.5 text-base sm:text-[12px] text-slate-900 shadow-2xs outline-none transition-all focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20" />
  </label>
);

const SelectField = ({ label, value, options, onChange, icon: Icon }: any) => (
  <label className="grid gap-1.5 text-xs font-bold text-slate-700">
    <div className="flex items-center gap-2">
      {Icon && <Icon className="w-3.5 h-3.5" />}
      <span>{label}</span>
    </div>
    <select value={value} onChange={(e) => onChange(e.target.value)} className="h-11 w-full rounded-md border border-slate-200 bg-white px-3.5 text-base sm:text-[12px] text-slate-900 shadow-2xs outline-none transition-all focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20">
      {options.map((opt: any) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
    </select>
  </label>
);

const ColorField = ({ label, value, onChange, icon: Icon }: any) => (
  <label className="grid gap-1.5 text-xs font-bold text-slate-700">
    <div className="flex items-center gap-2">
      {Icon && <Icon className="w-3.5 h-3.5" />}
      <span>{label}</span>
    </div>
    <div className="flex items-center gap-2 h-11 w-full rounded-md border border-slate-200 bg-white p-1 shadow-2xs transition-all focus-within:border-violet-500 focus-within:ring-2 focus-within:ring-violet-500/20">
      <input type="color" value={isHex(value) ? value : '#ffffff'} onChange={(e) => onChange(e.target.value)} className="h-full w-9 cursor-pointer rounded-md border-0 bg-transparent p-0" />
      <input value={value} onChange={(e) => onChange(e.target.value)} className="h-full flex-1 bg-transparent px-2 text-base sm:text-[12px] text-slate-900 outline-none" placeholder="#000000" />
    </div>
  </label>
);

const ItemCard = ({ title, subtitle, onRemove, children, icon: Icon }: any) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className="rounded-md border border-slate-200 bg-white shadow-sm overflow-hidden group">
      <div className="flex cursor-pointer items-center justify-between bg-white px-3 py-3 hover:bg-slate-50 transition-colors" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex items-center gap-3 min-w-0">
          {Icon && <Icon className="w-4 h-4 text-slate-400" />}
          <div className="min-w-0">
            <h4 className="text-sm font-semibold text-slate-900 truncate">{title || '(Not specified)'}</h4>
            {subtitle && <p className="text-xs text-slate-500 truncate mt-0.5">{subtitle}</p>}
          </div>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button type="button" onClick={(e) => { e.stopPropagation(); onRemove(); }} className="p-1.5 text-slate-400 opacity-0 group-hover:opacity-100 hover:text-rose-600 transition-all rounded hover:bg-rose-50" title="Remove">
            <Trash2 className="w-4 h-4" />
          </button>
          {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </div>
      </div>
      {isExpanded && <div className="p-4 space-y-4 border-t border-slate-100 bg-slate-50/50">{children}</div>}
    </div>
  );
};

function EditorSidebarTemplatePreview({ template }: { template: GeneratedTemplate }) {
  const [mounted, setMounted] = useState(false);
  const [scale, setScale] = useState(0.20);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    const handleResize = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        const computed = width / 794;
        setScale(computed > 0 ? computed : 0.20);
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
      className="relative aspect-[1/1.414] w-full overflow-hidden rounded-md bg-white border border-slate-200/80 shadow-2xs"
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
        <div className="flex h-full w-full items-center justify-center bg-slate-50 text-[10px] font-semibold text-slate-400">
          Loading...
        </div>
      )}
    </div>
  );
}

function MobilePreviewCanvas({ customTemplate, visibleData, totalPages }: { customTemplate: GeneratedTemplate; visibleData: CVData; totalPages: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.36);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const availableWidth = containerRef.current.clientWidth - 16;
        const computedScale = Math.min(1, Math.max(0.2, availableWidth / 920));
        setScale(computedScale);
      }
    };

    handleResize();
    const observer = new ResizeObserver(handleResize);
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const pageHeight = 1301;
  const pageGap = 40;
  const totalScaledWidth = 920 * scale;
  const totalScaledHeight = (totalPages * pageHeight + (totalPages - 1) * pageGap) * scale;

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center py-2">
      <div
        className="relative overflow-hidden rounded-md border border-slate-300 shadow-2xl bg-white transition-all duration-200"
        style={{
          width: `${totalScaledWidth}px`,
          height: `${totalScaledHeight}px`,
        }}
      >
        <div
          className="absolute left-0 top-0 origin-top-left pointer-events-none select-none"
          style={{
            width: '920px',
            transform: `scale(${scale})`,
          }}
        >
          <div className="flex flex-col items-center">
            {Array.from({ length: totalPages }).map((_, p) => (
              <div key={p} className="flex flex-col items-center mb-10">
                <div
                  className="relative bg-white border-b border-slate-200"
                  style={{ width: 920, height: 1301 }}
                >
                  <div
                    style={{
                      transform: `translateY(-${p * 1220}px)`,
                      paddingTop: p > 0 ? '40px' : '0px',
                      paddingBottom: '40px',
                    }}
                  >
                    <TemplateRenderer template={customTemplate} data={visibleData} scale={1} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function EditorPage() {
  const router = useRouter();
  const templates = useMemo(() => generateTemplates(), []);
  const allThemes = useMemo(() => getAllThemes(), []);
  const allLayouts = useMemo(() => getAllLayouts(), []);
  const exportRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const { user, token, isAuthenticated, _hydrated } = useAuthStore();
  const userTier = (user?.tier || (user as any)?.subscriptionTier || 'free').toLowerCase();

  const initialTemplate = useMemo(() => {
    return templates[0];
  }, [templates]);

  const [selectedTemplate, setSelectedTemplate] = useState<GeneratedTemplate>(initialTemplate);
  const [cvData, setCvData] = useState<CVData>(sampleCV);
  const [history, setHistory] = useState<CVData[]>([sampleCV]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);
  const [showVoiceAIModal, setShowVoiceAIModal] = useState(false);

  const pushHistory = useCallback((currentData: CVData) => {
    setHistory((prev) => {
      const sliced = prev.slice(0, historyIndex + 1);
      return [...sliced, JSON.parse(JSON.stringify(currentData))];
    });
    setHistoryIndex((prev) => prev + 1);
  }, [historyIndex]);

  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      const targetIndex = historyIndex - 1;
      setHistoryIndex(targetIndex);
      setCvData(JSON.parse(JSON.stringify(history[targetIndex])));
      toast.success('Undid last modification');
    }
  }, [history, historyIndex]);

  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const targetIndex = historyIndex + 1;
      setHistoryIndex(targetIndex);
      setCvData(JSON.parse(JSON.stringify(history[targetIndex])));
      toast.success('Redid modification');
    }
  }, [history, historyIndex]);

  const handleApplyVoiceChange = useCallback((newCvData: CVData, explanation: string) => {
    pushHistory(cvData);
    setCvData(newCvData);
    toast((t) => (
      <div className="flex items-center justify-between gap-3 text-xs font-medium">
        <span>{explanation}</span>
        <button
          type="button"
          onClick={() => {
            handleUndo();
            toast.dismiss(t.id);
          }}
          className="px-2.5 py-1 bg-slate-900 text-[#F5D17B] font-bold rounded-md hover:bg-slate-800 transition-colors"
        >
          Undo
        </button>
      </div>
    ), { duration: 7000, icon: '🎙️' });
  }, [cvData, pushHistory, handleUndo]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        if (e.shiftKey) {
          e.preventDefault();
          handleRedo();
        } else {
          e.preventDefault();
          handleUndo();
        }
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
        e.preventDefault();
        handleRedo();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleUndo, handleRedo]);
  const [customTheme, setCustomTheme] = useState<Theme>(initialTemplate.theme);
  const [selectedLayout, setSelectedLayout] = useState<Layout>(initialTemplate.layout);
  const [sectionVariants, setSectionVariants] = useState<SectionVariant>(initialTemplate.sectionVariants);
  const [autoScale, setAutoScale] = useState(0.8);
  const [visibility, setVisibility] = useState<Record<SectionKey, boolean>>(emptyVisibility);
  const [sectionOrder, setSectionOrder] = useState<SectionKey[]>(['summary', 'experience', 'education', 'skills', 'projects', 'certifications', 'languages']);
  const [draggedSectionIndex, setDraggedSectionIndex] = useState<number | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [autoSave, setAutoSave] = useState(true);
  const [expandedPanel, setExpandedPanel] = useState<BuilderStep>('personal');
  const [activePage, setActivePage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [contentHeight, setContentHeight] = useState<number | null>(null);
  const [activeSidebarTab, setActiveSidebarTab] = useState<'Sections' | 'Templates'>('Sections');
  const [mobileTab, setMobileTab] = useState<'form' | 'sections' | 'design' | 'preview' | 'export'>('form');
  const [mobileDesignSubTab, setMobileDesignSubTab] = useState<'templates' | 'styles'>('templates');

  useEffect(() => {
    if (mounted && _hydrated && !isAuthenticated) {
      router.replace('/?openAuth=login&callbackUrl=/editor');
    }
  }, [mounted, _hydrated, isAuthenticated, router]);
  const [activeAIField, setActiveAIField] = useState<string | null>(null);
  const [showSaveTemplateModal, setShowSaveTemplateModal] = useState(false);
  const [showATSModal, setShowATSModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showCoverLetterModal, setShowCoverLetterModal] = useState(false);
  const [showDownloadLimitModal, setShowDownloadLimitModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [downloadLimitModalData, setDownloadLimitModalData] = useState<{ message?: string; redirectUrl?: string }>({});
  const [aiImproveModal, setAiImproveModal] = useState<{
    isOpen: boolean;
    initialText: string;
    fieldName: string;
    onAccept: (newText: string) => void;
  }>({
    isOpen: false,
    initialText: '',
    fieldName: '',
    onAccept: () => {},
  });
  const [showExportDropdown, setShowExportDropdown] = useState(false);
  const [lastSavedTime, setLastSavedTime] = useState<string | null>('Just now');
  const [resumeId, setResumeId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [density, setDensity] = useState<'compact' | 'standard' | 'large'>('standard');

  const aiAssist = useAIAssist({
    templateId: selectedTemplate.id,
    templateCategory: selectedTemplate.category,
    jobTitle: cvData.personal.title,
  });

  const buildAIContext = useCallback(() => {
    const parts: string[] = [];
    if (cvData.personal.title) parts.push(`Target Position: ${cvData.personal.title}`);
    if (cvData.personal.firstName || cvData.personal.lastName) parts.push(`Candidate: ${cvData.personal.firstName} ${cvData.personal.lastName}`);
    if (cvData.skills && cvData.skills.length > 0) parts.push(`Skills: ${cvData.skills.map((s) => s.name).join(', ')}`);
    return parts.join('. ');
  }, [cvData]);

  const aiCreditsInfo = useMemo(() => ({
    creditsRemaining: aiAssist.creditsRemaining,
    creditsLimit: aiAssist.creditsLimit,
    isUnlimited: aiAssist.isUnlimited,
  }), [aiAssist.creditsRemaining, aiAssist.creditsLimit, aiAssist.isUnlimited]);

  const cvContentRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const previewScrollRef = useRef<HTMLDivElement | null>(null);
  const rightPanelRef = useRef<HTMLDivElement | null>(null);
  const isManualScrollingRef = useRef<boolean>(false);

  const allSectionSteps: BuilderStep[] = ['personal', ...(sectionOrder as BuilderStep[])];
  const currentStepIndex = Math.max(0, allSectionSteps.indexOf(expandedPanel));
  const prevStep = currentStepIndex > 0 ? allSectionSteps[currentStepIndex - 1] : null;
  const nextStep = currentStepIndex < allSectionSteps.length - 1 ? allSectionSteps[currentStepIndex + 1] : null;

  // Responsive Automatic Scale Observer
  useEffect(() => {
    const container = previewScrollRef.current;
    if (!container) return;

    const calculateScale = () => {
      const availableWidth = container.clientWidth - 64; // 64px margin padding
      if (availableWidth > 0) {
        const computedScale = Math.min(1.0, Math.max(0.35, availableWidth / 920));
        setAutoScale(computedScale);
      }
    };

    calculateScale();
    const observer = new ResizeObserver(calculateScale);
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Scroll Sync Helper
  const scrollToSectionInPreview = (stepId: BuilderStep) => {
    setExpandedPanel(stepId);
    isManualScrollingRef.current = true;

    const targetEl = document.getElementById(`cv-section-${stepId}`);
    if (targetEl && previewScrollRef.current) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    const rightEl = document.getElementById(`panel-form-${stepId}`);
    if (rightEl && rightPanelRef.current) {
      rightEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    setTimeout(() => {
      isManualScrollingRef.current = false;
    }, 700);
  };

  const scrollToPage = (pageNumber: number) => {
    if (!previewScrollRef.current) return;
    const pageHeight = 1301 * autoScale + 40;
    const targetTop = (pageNumber - 1) * pageHeight;
    previewScrollRef.current.scrollTo({ top: targetTop, behavior: 'smooth' });
  };

  // Scroll listener for active section and active page detection
  useEffect(() => {
    const container = previewScrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const pageHeight = 1301 * autoScale + 40;
      const currentPage = Math.max(1, Math.min(totalPages, Math.floor((scrollTop + 250) / pageHeight) + 1));
      setActivePage(currentPage);

      if (isManualScrollingRef.current) return;

      const steps: BuilderStep[] = ['personal', ...(sectionOrder as BuilderStep[])];
      for (const stepId of steps) {
        const el = document.getElementById(`cv-section-${stepId}`);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 380 && rect.bottom >= 120) {
            setExpandedPanel(stepId);
            break;
          }
        }
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [autoScale, totalPages, sectionOrder]);





  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size exceeds 5MB limit');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        setCvData(prev => ({ ...prev, personal: { ...prev.personal, avatar: reader.result as string } }));
        toast.success('Profile photo updated!');
      }
    };
    reader.readAsDataURL(file);
  };

  // Pagination logic & dynamic content height adjustment
  useEffect(() => {
    if (cvContentRef.current) {
      const timer = setTimeout(() => {
        const container = cvContentRef.current;
        if (!container) return;
        const previousSpacers = container.querySelectorAll('.cv-spacer');
        previousSpacers.forEach((s) => s.remove());

        const height = container.scrollHeight || container.clientHeight || 1301;
        if (height && height > 50) {
          setContentHeight(height);
        }
        const pages = Math.max(1, Math.ceil(height / 1301));
        setTotalPages(pages);
        setActivePage((prev) => Math.min(prev, pages));
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [cvData, customTheme, selectedLayout, sectionVariants, sectionOrder, mounted]);

  // Comprehensive Save Function (Local + Remote API)
  const saveDraft = useCallback(async () => {
    if (!mounted) return;
    setIsSaving(true);
    try {
      // Save locally
      const draft = { 
        cvData, 
        customTheme, 
        selectedLayout, 
        sectionVariants, 
        visibility, 
        sectionOrder, 
        templateId: selectedTemplate.id,
        savedAt: new Date().toISOString() 
      };
      localStorage.setItem('geteasycv-draft', JSON.stringify(draft));
      if (selectedTemplate.id) {
        localStorage.setItem(`geteasycv-custom-template-${selectedTemplate.id}`, JSON.stringify({
          theme: customTheme,
          layout: selectedLayout,
          sectionVariants,
          sectionOrder
        }));
      }

      // Sync with Backend API
      const title = `${cvData.personal.firstName || 'My'} ${cvData.personal.lastName || ''} Resume`.trim();
      const payload = {
        title: title || 'Untitled Resume',
        templateId: selectedTemplate.id,
        summary: cvData.summary,
        cvData,
        customTheme,
        selectedLayout,
        sectionVariants,
        sectionOrder,
      };

      if (resumeId) {
        await fetch(`/api/resumes/${resumeId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify(payload),
        });
      } else {
        const res = await fetch('/api/resumes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          const resData = await res.json();
          if (resData.data?.id) {
            setResumeId(resData.data.id);
            if (typeof window !== 'undefined') {
              window.history.replaceState(null, '', `/editor?id=${resData.data.id}&template=${selectedTemplate.id}`);
            }
          }
        }
      }
      toast.success('Template & resume saved successfully!');
    } catch (err) {
      console.error('Save sync error:', err);
      toast.success('Draft saved locally');
    } finally {
      setIsSaving(false);
    }
  }, [cvData, customTheme, selectedLayout, sectionVariants, visibility, sectionOrder, selectedTemplate, resumeId, token, mounted]);

  // Load URL Template & Resume Parameters
  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      const templateId = searchParams.get('template');
      const paramResumeId = searchParams.get('id');

      // 1. Immediately apply template from URL if provided
      if (templateId) {
        const match = templates.find((t) => t.id === templateId);
        if (match) {
          setSelectedTemplate(match);
          setCustomTheme(match.theme);
          setSelectedLayout(match.layout);
          setSectionVariants(match.sectionVariants);
          if (match.layout.sectionOrder) {
            setSectionOrder(match.layout.sectionOrder.filter((item): item is SectionKey => item in sectionLabels));
          }
        }
      }

      // 2. Fetch saved resume if id parameter is present
      if (paramResumeId) {
        setResumeId(paramResumeId);
        fetch(`/api/resumes/${paramResumeId}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        })
          .then((res) => res.json())
          .then((resData) => {
            if (resData.success && resData.data) {
              const r = resData.data;

              // Restore saved CV data
              if (r.cvData) {
                setCvData(r.cvData);
              } else if (r.personal) {
                setCvData((prev) => ({
                  ...prev,
                  personal: { ...prev.personal, ...r.personal },
                  summary: r.summary || prev.summary,
                  experience: r.experience?.length ? r.experience : prev.experience,
                  education: r.education?.length ? r.education : prev.education,
                  skills: r.skills?.length ? r.skills : prev.skills,
                  projects: r.projects?.length ? r.projects : prev.projects,
                  certifications: r.certifications?.length ? r.certifications : prev.certifications,
                  languages: r.languages?.length ? r.languages : prev.languages,
                }));
              }

              // Restore saved theme and layout customization
              if (r.customTheme) setCustomTheme(r.customTheme);
              if (r.selectedLayout) setSelectedLayout(r.selectedLayout);
              if (r.sectionVariants) setSectionVariants(r.sectionVariants);
              if (r.sectionOrder) setSectionOrder(r.sectionOrder);

              // Match active template ID from resume record if not explicitly overridden
              const activeTmplId = r.templateId || r.template?.id;
              if (activeTmplId && !templateId) {
                const match = templates.find((t) => t.id === activeTmplId);
                if (match) {
                  setSelectedTemplate(match);
                  if (!r.customTheme) setCustomTheme(match.theme);
                  if (!r.selectedLayout) setSelectedLayout(match.layout);
                  if (!r.sectionVariants) setSectionVariants(match.sectionVariants);
                }
              }
            }
          })
          .catch((err) => console.error('Resume load error:', err));
      }
    }
  }, [templates, token]);

  useEffect(() => {
    if (autoSave && mounted) {
      const timeoutId = setTimeout(() => saveDraft(), 4000);
      return () => clearTimeout(timeoutId);
    }
  }, [cvData, customTheme, selectedLayout, sectionVariants, visibility, sectionOrder, autoSave, mounted, saveDraft]);

  const visibleData = useMemo(() => prepareExportData(cvData, visibility), [cvData, visibility]);
  const customTemplate = useMemo<GeneratedTemplate>(() => ({
    ...selectedTemplate,
    theme: customTheme,
    layout: { ...selectedLayout, sectionOrder },
    sectionVariants,
  }), [customTheme, sectionOrder, sectionVariants, selectedLayout, selectedTemplate]);

  // Compute total pages based on scroll height
  useEffect(() => {
    if (cvContentRef.current) {
      const contentHeight = cvContentRef.current.scrollHeight;
      const computed = Math.max(1, Math.ceil(contentHeight / 1300));
      setTotalPages(computed);
    }
  }, [cvData, visibleData, customTemplate, selectedLayout]);

  // Export functions
  const exportCanvas = async () => {
    const target = cvContentRef.current || exportRef.current;
    if (!target) {
      toast.error('Preview is not ready yet.');
      throw new Error('Preview container not found.');
    }
    toast.loading('Preparing export...', { id: 'export' });
    try {
      if (typeof document !== 'undefined' && document.fonts) {
        await document.fonts.ready;
      }
      await new Promise((resolve) => setTimeout(resolve, 300));
      const canvas = await safeHtml2Canvas(target, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: 920,
        scrollX: 0,
        scrollY: 0,
      } as any);
      toast.dismiss('export');
      return canvas;
    } catch (error) {
      toast.dismiss('export');
      console.error('Canvas capture error:', error);
      throw error;
    }
  };

  const exportAsTxt = (data: CVData) => {
    const lines: string[] = [];
    lines.push(`${data.personal.firstName || ''} ${data.personal.lastName || ''}`.trim().toUpperCase());
    if (data.personal.title) lines.push(data.personal.title);
    
    const contactInfo = [
      data.personal.email,
      data.personal.phone,
      data.personal.location,
      data.personal.website,
      data.personal.linkedin
    ].filter(Boolean).join(' | ');
    if (contactInfo) lines.push(contactInfo);
    lines.push('\n' + '='.repeat(60) + '\n');

    if (data.summary) {
      lines.push('PROFESSIONAL SUMMARY');
      lines.push('-'.repeat(30));
      lines.push(data.summary);
      lines.push('');
    }

    if (data.experience && data.experience.length > 0) {
      lines.push('WORK EXPERIENCE');
      lines.push('-'.repeat(30));
      data.experience.forEach((exp) => {
        lines.push(`${exp.position} - ${exp.company} (${exp.startDate} - ${exp.endDate || 'Present'})`);
        if (exp.location) lines.push(`Location: ${exp.location}`);
        if (exp.description) lines.push(exp.description);
        if (exp.achievements && exp.achievements.length > 0) {
          exp.achievements.forEach((h: string) => lines.push(`  • ${h}`));
        }
        lines.push('');
      });
    }

    if (data.education && data.education.length > 0) {
      lines.push('EDUCATION');
      lines.push('-'.repeat(30));
      data.education.forEach((edu) => {
        lines.push(`${edu.degree} in ${edu.field} - ${edu.institution} (${edu.startDate} - ${edu.endDate || 'Present'})`);
        if (edu.gpa) lines.push(`GPA: ${edu.gpa}`);
        lines.push('');
      });
    }

    if (data.skills && data.skills.length > 0) {
      lines.push('SKILLS');
      lines.push('-'.repeat(30));
      lines.push(data.skills.map((s) => s.name).join(', '));
      lines.push('');
    }

    const textContent = lines.join('\n');
    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName(data, 'txt');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Plain Text (.txt) exported successfully!');
  };

  const exportAsDocx = (data: CVData) => {
    exportToNativeDocx(
      {
        personal: {
          firstName: data.personal.firstName,
          lastName: data.personal.lastName,
          email: data.personal.email,
          phone: data.personal.phone,
          location: data.personal.location,
          jobTitle: data.personal.title,
          website: data.personal.website,
          linkedin: data.personal.linkedin,
          github: (data.personal as any).github || '',
          summary: data.summary,
        },
        experience: data.experience?.map((exp) => ({
          position: exp.position,
          company: exp.company,
          location: exp.location,
          startDate: exp.startDate,
          endDate: exp.endDate,
          current: exp.current,
          description: exp.description,
          highlights: exp.achievements,
        })),
        education: data.education?.map((edu) => ({
          degree: edu.degree,
          field: edu.field,
          institution: edu.institution,
          location: (edu as any).location || '',
          startDate: edu.startDate,
          endDate: edu.endDate,
          gpa: edu.gpa,
        })),
        skills: data.skills?.map((s) => ({
          name: s.name,
          level: String(s.level),
        })),
      },
      fileName(data, 'docx')
    );
    toast.success('Native Word (.docx) document exported successfully!');
  };

  const downloadExport = async (type: ExportType) => {
    if (isExporting) return;
    setIsExporting(true);
    setShowExportDropdown(false);

    // Enforce 1-download limit for free users
    try {
      const checkRes = await fetch('/api/users/download-count', { method: 'POST' });
      const checkData = await checkRes.json();

      if (!checkRes.ok || checkData.allowed === false) {
        setIsExporting(false);
        setDownloadLimitModalData({
          message: checkData.message || checkData.error || 'You have used your 1 free CV download. Upgrade your account to unlock unlimited downloads in PDF, Word, and Image formats.',
          redirectUrl: checkData.redirectUrl || '/pricing?reason=download_limit',
        });
        setShowDownloadLimitModal(true);
        return;
      }
    } catch (checkErr) {
      console.warn('[DOWNLOAD_CHECK_WARN]', checkErr);
    }

    // Enforce Plan Format Limits: Starter includes high-res PDF download; PNG and JPG are Pro & Lifetime
    const isProOrLifetime = userTier === 'pro' || userTier === 'lifetime' || userTier === 'premium';
    if ((type === 'png' || type === 'jpg') && !isProOrLifetime) {
      setIsExporting(false);
      setDownloadLimitModalData({
        message: 'High-resolution PNG and JPG image exports are included with Pro & Lifetime plans. Starter includes high-resolution PDF downloads.',
        redirectUrl: '/pricing?plan=pro',
      });
      setShowDownloadLimitModal(true);
      toast.error('PNG & JPG exports are available on Pro and Lifetime plans.');
      return;
    }

    const activeTmplId = customTemplate?.id || (selectedLayout?.id && customTheme?.id ? `${selectedLayout.id}-${customTheme.id}` : selectedLayout?.id) || 'sidebar-left-modern-blue';

    const recordTemplateDownload = () => {
      if (activeTmplId) {
        fetch('/api/templates/download', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ templateId: activeTmplId }),
        }).catch(() => {});
      }
    };

    try {
      if (type === 'txt') {
        exportAsTxt(cvData);
        recordTemplateDownload();
        return;
      }
      if (type === 'docx') {
        exportAsDocx(cvData);
        recordTemplateDownload();
        return;
      }
      if (type === 'pdf') {
        toast.loading('Generating Vector ATS PDF...', { id: 'pdf' });
        let vectorSuccess = false;
        if (cvContentRef.current) {
          vectorSuccess = await exportToVectorPDF(cvContentRef.current, fileName(cvData, 'pdf'));
        }
        if (!vectorSuccess) {
          const canvas = await exportCanvas();
          const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
            compress: true,
          });
          const pageWidth = pdf.internal.pageSize.getWidth();
          const pageHeight = pdf.internal.pageSize.getHeight();
          const imageHeight = (canvas.height * pageWidth) / canvas.width;
          const image = canvas.toDataURL('image/jpeg', 0.98);
          let remaining = imageHeight;
          let offset = 0;
          pdf.addImage(image, 'JPEG', 0, offset, pageWidth, imageHeight, undefined, 'FAST');
          remaining -= pageHeight;
          while (remaining > 0) {
            offset -= pageHeight;
            pdf.addPage();
            pdf.addImage(image, 'JPEG', 0, offset, pageWidth, imageHeight, undefined, 'FAST');
            remaining -= pageHeight;
          }
          pdf.save(fileName(cvData, 'pdf'));
        }
        toast.success('PDF downloaded successfully!', { id: 'pdf' });
        recordTemplateDownload();
        return;
      }
      const canvas = await exportCanvas();
      toast.loading(`Generating ${type.toUpperCase()}...`, { id: 'image' });
      const link = document.createElement('a');
      link.download = fileName(cvData, type);
      link.href = type === 'png' ? canvas.toDataURL('image/png', 1.0) : canvas.toDataURL('image/jpeg', 0.95);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success(`${type.toUpperCase()} downloaded successfully!`, { id: 'image' });
      recordTemplateDownload();
    } catch (error) {
      console.error('Export failed:', error);
      toast.error('Export failed. Please check your browser setup and try again.');
    } finally {
      setIsExporting(false);
    }
  };

  // State Updates
  const updatePersonal = (key: keyof CVData['personal'], value: string) => setCvData((prev) => ({ ...prev, personal: { ...prev.personal, [key]: value } }));
  const updateExperience = (id: string, key: keyof ExperienceItem, value: string | number | boolean | string[]) => setCvData((prev) => ({ ...prev, experience: prev.experience.map((item) => (item.id === id ? { ...item, [key]: value } : item)) }));
  const updateEducation = (id: string, key: keyof EducationItem, value: string) => setCvData((prev) => ({ ...prev, education: prev.education.map((item) => (item.id === id ? { ...item, [key]: value } : item)) }));
  const updateSkill = (id: string, key: keyof SkillItem, value: string | number) => setCvData((prev) => ({ ...prev, skills: prev.skills.map((item) => (item.id === id ? { ...item, [key]: value } : item)) }));
  const updateProject = (id: string, key: keyof ProjectItem, value: string | string[]) => setCvData((prev) => ({ ...prev, projects: (prev.projects || []).map((item) => (item.id === id ? { ...item, [key]: value } : item)) }));
  const updateCertification = (id: string, key: keyof CertificationItem, value: string) => setCvData((prev) => ({ ...prev, certifications: (prev.certifications || []).map((item) => (item.id === id ? { ...item, [key]: value } : item)) }));
  const updateLanguage = (id: string, key: keyof LanguageItem, value: string) => setCvData((prev) => ({ ...prev, languages: (prev.languages || []).map((item) => (item.id === id ? { ...item, [key]: value } : item)) }));

  // Drag and drop for Sidebar Sections
  const dropSection = (targetIndex: number) => {
    setSectionOrder((prev) => {
      if (draggedSectionIndex === null || draggedSectionIndex === targetIndex) return prev;
      const next = [...prev];
      const [dragged] = next.splice(draggedSectionIndex, 1);
      next.splice(targetIndex, 0, dragged);
      return next;
    });
    setDraggedSectionIndex(null);
  };

  const renderPanelContent = (stepId: BuilderStep) => {
    if (stepId === 'personal') {
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-700">Profile Photo</label>
            <div className="flex items-center gap-4">
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handlePhotoUpload} 
                accept="image/png, image/jpeg, image/jpg, image/webp" 
                className="hidden" 
              />
              <div className="w-16 h-16 rounded-full border-2 border-amber-500 overflow-hidden bg-slate-100 flex items-center justify-center text-slate-400 shrink-0">
                {cvData.personal.avatar ? (
                  <img src={cvData.personal.avatar} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <UserCircle className="w-8 h-8" />
                )}
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <button 
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1.5 text-[11px] font-bold border border-slate-200 rounded-md hover:bg-slate-50 transition-colors text-slate-700 cursor-pointer"
                  >
                    Change Photo
                  </button>
                  <button 
                    type="button"
                    onClick={() => {
                      updatePersonal('avatar', '');
                      toast.success('Photo removed');
                    }}
                    className="p-1.5 border border-slate-200 rounded-md hover:bg-rose-50 hover:text-rose-600 transition-colors text-slate-500 cursor-pointer"
                    title="Remove Photo"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-[9px] text-slate-400">JPG, PNG up to 5MB. Recommended size 400x400px</p>
              </div>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="First Name" value={cvData.personal.firstName} placeholder="Sarah" onChange={(value: any) => updatePersonal('firstName', value)} />
            <Field label="Last Name" value={cvData.personal.lastName} placeholder="Johnson" onChange={(value: any) => updatePersonal('lastName', value)} />
          </div>
          <div className="space-y-1">
            <Field label="Professional Title" value={cvData.personal.title} placeholder="Senior Full Stack Developer" onChange={(value: any) => updatePersonal('title', value)} />
            <VoiceAIFieldAssist
              fieldName="Professional Title"
              fieldValue={cvData.personal.title}
              onAccept={(text) => {
                pushHistory(cvData);
                updatePersonal('title', text);
              }}
              sectionName="Personal Information"
              jobTitle={cvData.personal.title || 'Professional'}
              compact
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Email" value={cvData.personal.email} placeholder="sarah.johnson@email.com" onChange={(value: any) => updatePersonal('email', value)} />
            <Field label="Phone" value={cvData.personal.phone} placeholder="+1 (555) 123-4567" onChange={(value: any) => updatePersonal('phone', value)} />
          </div>
          <Field label="Location" value={cvData.personal.location} placeholder="San Francisco, CA" onChange={(value: any) => updatePersonal('location', value)} />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Website" value={cvData.personal.website} placeholder="https://sarahjohnson.dev" onChange={(value: any) => updatePersonal('website', value)} />
            <Field label="LinkedIn" value={cvData.personal.linkedin} placeholder="https://linkedin.com/in/sarahjohnson" onChange={(value: any) => updatePersonal('linkedin', value)} />
          </div>
        </div>
      );
    }

    if (stepId === 'summary') {
      return (
        <div>
          <TextField label="Professional Summary" value={cvData.summary} rows={6} placeholder="Product-minded developer..." onChange={(value: any) => setCvData((prev) => ({ ...prev, summary: value }))} />
          <VoiceAIFieldAssist
            fieldName="Professional Summary"
            fieldValue={cvData.summary}
            onAccept={(text) => {
              pushHistory(cvData);
              setCvData((prev) => ({ ...prev, summary: text }));
            }}
            sectionName="Professional Summary"
            jobTitle={cvData.personal.title || 'Professional'}
          />
          <AIFieldButton
            fieldName="Professional Summary"
            fieldValue={cvData.summary}
            onAccept={(text) => setCvData((prev) => ({ ...prev, summary: text }))}
            context={buildAIContext()}
            assistHook={aiAssist}
            isActive={activeAIField === 'summary'}
            onActivate={() => setActiveAIField('summary')}
            onDeactivate={() => setActiveAIField(null)}
            creditsExhausted={aiAssist.status === 'credits_exhausted' || (aiCreditsInfo.creditsRemaining === 0 && !aiCreditsInfo.isUnlimited)}
          />
        </div>
      );
    }

    if (stepId === 'experience') {
      return (
        <div className="space-y-4">
          {cvData.experience.map((item) => (
            <ItemCard key={item.id} title={item.position} subtitle={item.company} onRemove={() => setCvData((prev) => ({ ...prev, experience: prev.experience.filter((entry) => entry.id !== item.id) }))}>
              <Field label="Position" value={item.position} onChange={(value: any) => updateExperience(item.id, 'position', value)} />
              <Field label="Company" value={item.company} onChange={(value: any) => updateExperience(item.id, 'company', value)} />
              <div className="grid grid-cols-2 gap-4"><Field label="Start" value={item.startDate} onChange={(value: any) => updateExperience(item.id, 'startDate', value)} /><Field label="End" value={item.endDate} onChange={(value: any) => updateExperience(item.id, 'endDate', value)} /></div>
              <div>
                <TextField label="Role summary" value={item.description} rows={2} onChange={(value: any) => updateExperience(item.id, 'description', value)} />
                <VoiceAIFieldAssist
                  fieldName={`Role summary (${item.company})`}
                  fieldValue={item.description}
                  onAccept={(text) => {
                    pushHistory(cvData);
                    updateExperience(item.id, 'description', text);
                  }}
                  sectionName="Work Experience"
                  jobTitle={item.position || cvData.personal.title || 'Professional'}
                />
                <AIFieldButton
                  fieldName={`Role description (${item.company})`}
                  fieldValue={item.description}
                  onAccept={(text) => updateExperience(item.id, 'description', text)}
                  context={`${item.position} at ${item.company}. ${buildAIContext()}`}
                  assistHook={aiAssist}
                  isActive={activeAIField === `exp-desc-${item.id}`}
                  onActivate={() => setActiveAIField(`exp-desc-${item.id}`)}
                  onDeactivate={() => setActiveAIField(null)}
                  creditsExhausted={aiCreditsInfo.creditsRemaining === 0 && !aiCreditsInfo.isUnlimited}
                />
              </div>
              <div>
                <TextField label="Achievements (one per line)" value={item.achievements.join('\n')} rows={3} onChange={(value: any) => updateExperience(item.id, 'achievements', value.split('\n').filter(Boolean))} />
                <VoiceAIFieldAssist
                  fieldName={`Achievements (${item.company})`}
                  fieldValue={item.achievements.join('\n')}
                  onAccept={(text) => {
                    pushHistory(cvData);
                    updateExperience(item.id, 'achievements', text.split('\n').filter(Boolean));
                  }}
                  sectionName="Work Achievements"
                  jobTitle={item.position || cvData.personal.title || 'Professional'}
                />
                <AIFieldButton
                  fieldName={`Achievements (${item.company})`}
                  fieldValue={item.achievements.join('\n')}
                  onAccept={(text) => updateExperience(item.id, 'achievements', text.split('\n').filter((l) => l.trim()))}
                  context={`${item.position} at ${item.company}. ${buildAIContext()}`}
                  assistHook={aiAssist}
                  isActive={activeAIField === `exp-ach-${item.id}`}
                  onActivate={() => setActiveAIField(`exp-ach-${item.id}`)}
                  onDeactivate={() => setActiveAIField(null)}
                  creditsExhausted={aiCreditsInfo.creditsRemaining === 0 && !aiCreditsInfo.isUnlimited}
                />
              </div>
            </ItemCard>
          ))}
          <button type="button" onClick={() => setCvData((prev) => ({ ...prev, experience: [...prev.experience, { id: `exp-${Date.now()}`, company: 'Company', position: 'Role', startDate: '2025-01', endDate: 'Present', current: true, description: '', achievements: [], location: '' }] }))} className="w-full rounded-md border border-dashed border-slate-300 bg-white px-3 py-3 text-[11px] font-bold text-violet-600 hover:bg-slate-50 transition-colors">+ Add Experience</button>
        </div>
      );
    }

    if (stepId === 'education') {
      return (
        <div className="space-y-4">
          {cvData.education.map((item) => (
            <ItemCard key={item.id} title={item.institution} subtitle={item.degree} onRemove={() => setCvData((prev) => ({ ...prev, education: prev.education.filter((entry) => entry.id !== item.id) }))}>
              <Field label="Institution" value={item.institution} onChange={(value: any) => updateEducation(item.id, 'institution', value)} />
              <Field label="Degree" value={item.degree} onChange={(value: any) => updateEducation(item.id, 'degree', value)} />
              <Field label="Field" value={item.field} onChange={(value: any) => updateEducation(item.id, 'field', value)} />
              <div className="grid grid-cols-2 gap-4"><Field label="Start" value={item.startDate} onChange={(value: any) => updateEducation(item.id, 'startDate', value)} /><Field label="End" value={item.endDate} onChange={(value: any) => updateEducation(item.id, 'endDate', value)} /></div>
            </ItemCard>
          ))}
          <button type="button" onClick={() => setCvData((prev) => ({ ...prev, education: [...prev.education, { id: `edu-${Date.now()}`, institution: 'Institution', degree: 'Degree', field: 'Field', startDate: '2022', endDate: '2026' }] }))} className="w-full rounded-md border border-dashed border-slate-300 bg-white px-3 py-3 text-[11px] font-bold text-violet-600 hover:bg-slate-50 transition-colors">+ Add Education</button>
        </div>
      );
    }

    if (stepId === 'skills') {
      return (
        <div className="space-y-4">
          {cvData.skills.map((item) => (
            <ItemCard key={item.id} title={item.name} subtitle={item.category} onRemove={() => setCvData((prev) => ({ ...prev, skills: prev.skills.filter((entry) => entry.id !== item.id) }))}>
              <Field label="Skill" value={item.name} onChange={(value: any) => updateSkill(item.id, 'name', value)} />
              <SelectField label="Category" value={item.category} onChange={(value: any) => updateSkill(item.id, 'category', value)} options={['technical', 'soft', 'language', 'tool'].map((value) => ({ value, label: value }))} />
            </ItemCard>
          ))}
          <button type="button" onClick={() => setCvData((prev) => ({ ...prev, skills: [...prev.skills, { id: `skill-${Date.now()}`, name: 'Skill', level: 80, category: 'technical' }] }))} className="w-full rounded-md border border-dashed border-slate-300 bg-white px-3 py-3 text-[11px] font-bold text-violet-600 hover:bg-slate-50 transition-colors">+ Add Skill</button>
        </div>
      );
    }

    if (stepId === 'projects') {
      return (
        <div className="space-y-4">
          {(cvData.projects || []).map((item) => (
            <ItemCard key={item.id} title={item.name} subtitle={item.technologies.join(', ')} onRemove={() => setCvData((prev) => ({ ...prev, projects: (prev.projects || []).filter((entry) => entry.id !== item.id) }))}>
              <Field label="Project Name" value={item.name} onChange={(value: any) => updateProject(item.id, 'name', value)} />
              <div>
                <TextField label="Description" value={item.description} rows={2} onChange={(value: any) => updateProject(item.id, 'description', value)} />
                <VoiceAIFieldAssist
                  fieldName={`Project description (${item.name})`}
                  fieldValue={item.description}
                  onAccept={(text) => {
                    pushHistory(cvData);
                    updateProject(item.id, 'description', text);
                  }}
                  sectionName="Projects"
                  jobTitle={cvData.personal.title || 'Professional'}
                />
                <AIFieldButton
                  fieldName={`Project description (${item.name})`}
                  fieldValue={item.description}
                  onAccept={(text) => updateProject(item.id, 'description', text)}
                  context={`Project: ${item.name}. Technologies: ${item.technologies.join(', ')}. ${buildAIContext()}`}
                  assistHook={aiAssist}
                  isActive={activeAIField === `proj-desc-${item.id}`}
                  onActivate={() => setActiveAIField(`proj-desc-${item.id}`)}
                  onDeactivate={() => setActiveAIField(null)}
                  creditsExhausted={aiCreditsInfo.creditsRemaining === 0 && !aiCreditsInfo.isUnlimited}
                />
              </div>
              <TextField label="Technologies (one per line)" value={item.technologies.join('\n')} rows={2} onChange={(value: any) => updateProject(item.id, 'technologies', value.split('\n').filter(Boolean))} />
              <Field label="Link" value={item.link || ''} onChange={(value: any) => updateProject(item.id, 'link', value)} />
            </ItemCard>
          ))}
          <button type="button" onClick={() => setCvData((prev) => ({ ...prev, projects: [...(prev.projects || []), { id: `project-${Date.now()}`, name: 'Project', description: 'Project outcome.', technologies: ['Next.js'], link: '' }] }))} className="w-full rounded-md border border-dashed border-slate-300 bg-white px-3 py-3 text-[11px] font-bold text-violet-600 hover:bg-slate-50 transition-colors">+ Add Project</button>
        </div>
      );
    }

    if (stepId === 'certifications') {
      return (
        <div className="space-y-4">
          {(cvData.certifications || []).map((item) => (
            <ItemCard key={item.id} title={item.name} subtitle={item.issuer} onRemove={() => setCvData((prev) => ({ ...prev, certifications: (prev.certifications || []).filter((entry) => entry.id !== item.id) }))}>
              <Field label="Name" value={item.name} onChange={(value: any) => updateCertification(item.id, 'name', value)} />
              <Field label="Issuer" value={item.issuer} onChange={(value: any) => updateCertification(item.id, 'issuer', value)} />
              <div className="grid grid-cols-2 gap-4"><Field label="Date" value={item.date} onChange={(value: any) => updateCertification(item.id, 'date', value)} /><Field label="Link" value={item.link || ''} onChange={(value: any) => updateCertification(item.id, 'link', value)} /></div>
            </ItemCard>
          ))}
          <button type="button" onClick={() => setCvData((prev) => ({ ...prev, certifications: [...(prev.certifications || []), { id: `cert-${Date.now()}`, name: 'Certification', issuer: 'Issuer', date: '2026', link: '' }] }))} className="w-full rounded-md border border-dashed border-slate-300 bg-white px-3 py-3 text-[11px] font-bold text-violet-600 hover:bg-slate-50 transition-colors">+ Add Certification</button>
        </div>
      );
    }

    if (stepId === 'languages') {
      return (
        <div className="space-y-4">
          {(cvData.languages || []).map((item) => (
            <ItemCard key={item.id} title={item.name} subtitle={item.proficiency} onRemove={() => setCvData((prev) => ({ ...prev, languages: (prev.languages || []).filter((entry) => entry.id !== item.id) }))}>
              <Field label="Language" value={item.name} onChange={(value: any) => updateLanguage(item.id, 'name', value)} />
              <SelectField label="Proficiency" value={item.proficiency} onChange={(value: any) => updateLanguage(item.id, 'proficiency', value)} options={['native', 'fluent', 'professional', 'basic'].map((value) => ({ value, label: value }))} />
            </ItemCard>
          ))}
          <button type="button" onClick={() => setCvData((prev) => ({ ...prev, languages: [...(prev.languages || []), { id: `lang-${Date.now()}`, name: 'Language', proficiency: 'professional' }] }))} className="w-full rounded-md border border-dashed border-slate-300 bg-white px-3 py-3 text-[11px] font-bold text-violet-600 hover:bg-slate-50 transition-colors">+ Add Language</button>
        </div>
      );
    }

    if (stepId === 'design') {
      return (
        <div className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <SelectField label="Theme Preset" value={customTheme.id} onChange={(val: string) => { const theme = allThemes.find(t => t.id === val); if (theme) setCustomTheme(theme); }} options={allThemes.map((theme) => ({ value: theme.id, label: theme.name }))} />
            <SelectField label="Layout" value={selectedLayout.id} onChange={(val: string) => { const layout = allLayouts.find(l => l.id === val); if (layout) { setSelectedLayout(layout); setSectionOrder(layout.sectionOrder.filter((item): item is SectionKey => item in sectionLabels)); } }} options={allLayouts.map((layout) => ({ value: layout.id, label: layout.name }))} />
            <SelectField label="Font Family" value={customTheme.fontFamily} onChange={(value: string) => setCustomTheme((prev) => ({ ...prev, fontFamily: value, fontFamilyHeading: value }))} options={fontFamilies.map((font) => ({ value: font.value, label: font.name }))} />
            <SelectField label="Spacing" value={customTheme.spacing} onChange={(value: string) => setCustomTheme((prev) => ({ ...prev, spacing: value as Theme['spacing'] }))} options={['compact', 'normal', 'relaxed'].map((value) => ({ value, label: value }))} />
            <ColorField label="Primary Color" value={customTheme.primary} onChange={(value: string) => setCustomTheme((prev) => ({ ...prev, primary: value, gradient: { ...prev.gradient, start: value } }))} />
            <ColorField label="Text Color" value={customTheme.text} onChange={(value: string) => setCustomTheme((prev) => ({ ...prev, text: value }))} />
          </div>
        </div>
      );
    }
    
    return null;
  };

  if (!mounted || !_hydrated || !isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-slate-700">
        <div className="text-center">
          <div className="w-12 h-12 rounded-xl bg-[#0F0F0F] flex items-center justify-center mx-auto mb-4 shadow-sm animate-pulse">
            <Sparkles className="w-6 h-6 text-[#F5D17B]" />
          </div>
          <p className="text-slate-600 text-sm font-semibold">
            {!_hydrated ? 'Loading editor session...' : 'Authentication required. Redirecting to login...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen overflow-hidden flex flex-col bg-[#F3F4F6] text-slate-900 font-sans">
      {/* HEADER */}
      <header className="h-16 shrink-0 flex items-center justify-between px-6 bg-white/90 backdrop-blur-md border-b border-slate-200/80 z-30 shadow-xs sticky top-0">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 group" title="Go to Homepage">
            <img src="/logo.svg" alt="GetEasyCV" className="h-9 w-auto object-contain" />
          </Link>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Undo / Redo History Controls */}
          <div className="hidden sm:flex items-center bg-slate-100 rounded-md border border-slate-200 p-0.5" title="Undo / Redo changes">
            <button
              type="button"
              onClick={handleUndo}
              disabled={historyIndex <= 0}
              className="p-1.5 text-slate-600 hover:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed rounded hover:bg-white transition-colors cursor-pointer"
              title="Undo last change (Ctrl+Z)"
            >
              <Undo2 className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={handleRedo}
              disabled={historyIndex >= history.length - 1}
              className="p-1.5 text-slate-600 hover:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed rounded hover:bg-white transition-colors cursor-pointer"
              title="Redo change (Ctrl+Y)"
            >
              <Redo2 className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Voice & AI Assistant Command Center Trigger */}
          <button
            type="button"
            onClick={() => setShowVoiceAIModal(true)}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-white bg-[#0F0F0F] hover:bg-[#262626] rounded-md border border-slate-700 shadow-2xs hover:shadow-xs transition-all cursor-pointer group"
            title="Voice Commands & AI Editor"
          >
            <Mic className="w-3.5 h-3.5 text-[#F3645C] group-hover:scale-110 transition-transform" />
            <Sparkles className="w-3.5 h-3.5 text-[#F5D17B]" />
            <span className="hidden sm:inline">Voice &amp; AI</span>
          </button>

          <button type="button" onClick={() => setShowShareModal(true)} className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-md border border-slate-200 transition-colors cursor-pointer" title="Share live view-only link">
            <Share2 className="w-4 h-4 text-indigo-600" />
            <span>Share Link</span>
          </button>

          <button
            type="button"
            onClick={() => setShowImportModal(true)}
            className="hidden md:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200/80 rounded-md border border-slate-200 transition-colors cursor-pointer"
            title="Upload existing resume file to auto-fill"
          >
            <Camera className="w-4 h-4 text-slate-600" />
            <span>Upload Resume</span>
          </button>

          <Link
            href="/cover-letter/editor"
            className="hidden md:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 rounded-md border border-purple-200 transition-colors cursor-pointer"
            title="Open Dedicated Cover Letter Workspace"
          >
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span>Cover Letter Editor</span>
          </Link>
          
          <div className="relative">
            <div className="flex items-center">
              <button 
                type="button" 
                onClick={() => downloadExport('pdf')} 
                disabled={isExporting} 
                className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2 text-xs font-bold bg-violet-600 text-white hover:bg-violet-700 transition-colors shadow-2xs rounded-l-md cursor-pointer border-r border-violet-500 whitespace-nowrap"
                title="Download PDF"
              >
                <Download className="w-4 h-4 shrink-0" />
                <span className="hidden sm:inline">{isExporting ? 'Exporting...' : 'Download PDF'}</span>
              </button>
              <button 
                type="button"
                onClick={() => setShowExportDropdown(!showExportDropdown)}
                className="px-2 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-r-md transition-colors cursor-pointer"
                title="Export Formats"
              >
                <ChevronDown className="w-4 h-4 shrink-0" />
              </button>
            </div>

            {showExportDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-md shadow-xl py-1 z-50 animate-in fade-in duration-150">
                <button
                  type="button"
                  onClick={() => downloadExport('pdf')}
                  className="w-full px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-violet-50 hover:text-violet-700 text-left flex items-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4 text-violet-600" />
                  <span>PDF Document (.pdf)</span>
                </button>
                <button
                  type="button"
                  onClick={() => downloadExport('docx')}
                  className="w-full px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-violet-50 hover:text-violet-700 text-left flex items-center gap-2 cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span>Microsoft Word (.docx)</span>
                </button>
                <button
                  type="button"
                  onClick={() => downloadExport('png')}
                  className="w-full px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-violet-50 hover:text-violet-700 text-left flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Download className="w-4 h-4 text-emerald-600" />
                    <span>High-Res PNG (.png)</span>
                  </div>
                  {userTier !== 'pro' && userTier !== 'lifetime' && (
                    <span className="px-1.5 py-0.5 text-[9px] bg-amber-100 text-amber-800 rounded font-black">PRO</span>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => downloadExport('jpg')}
                  className="w-full px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-violet-50 hover:text-violet-700 text-left flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Download className="w-4 h-4 text-amber-600" />
                    <span>High-Res JPG (.jpg)</span>
                  </div>
                  {userTier !== 'pro' && userTier !== 'lifetime' && (
                    <span className="px-1.5 py-0.5 text-[9px] bg-amber-100 text-amber-800 rounded font-black">PRO</span>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => downloadExport('txt')}
                  className="w-full px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-violet-50 hover:text-violet-700 text-left flex items-center gap-2 cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-emerald-600" />
                  <span>Plain Text (.txt)</span>
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <UserProfileDropdown />
          </div>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden relative">
        {/* ========================================================================= */}
        {/* DESKTOP WORKSPACE LAYOUT (Visible ONLY on desktop md:flex) */}
        {/* ========================================================================= */}
        <div className="hidden md:flex flex-1 overflow-hidden relative w-full">
          {/* LEFT SIDEBAR (Sections & Templates) */}
          <aside className="w-[340px] bg-white border-r border-slate-200 flex flex-col shrink-0 z-10 transition-all duration-200">
            <div className="p-4 border-b border-slate-100 flex items-center gap-2">
              <button 
                type="button"
                onClick={() => setActiveSidebarTab('Sections')}
                className={`flex-1 py-2 rounded-md text-xs font-bold transition-all cursor-pointer ${activeSidebarTab === 'Sections' ? 'bg-violet-50 text-violet-700 shadow-xs' : 'text-slate-500 hover:text-slate-900'}`}
              >
                Sections
              </button>
              <button 
                type="button"
                onClick={() => setActiveSidebarTab('Templates')}
                className={`flex-1 py-2 rounded-md text-xs font-bold transition-all cursor-pointer ${activeSidebarTab === 'Templates' ? 'bg-violet-50 text-violet-700 shadow-xs' : 'text-slate-500 hover:text-slate-900'}`}
              >
                Templates
              </button>
            </div>

            {activeSidebarTab === 'Templates' ? (
              <div className="flex-1 overflow-y-auto p-3 [scrollbar-gutter:stable]">
                <div className="flex items-center justify-between mb-3 px-1">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Select Template</h3>
                  <span className="text-[10px] font-semibold text-slate-400">{templates.length} Designs</span>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  {templates.map((tmpl) => {
                    const isSelected = selectedTemplate.id === tmpl.id;
                    const isPremium = (tmpl as any).isPremium || tmpl.category === 'Luxury' || tmpl.theme?.id === 'dark-executive' || tmpl.theme?.id === 'gold-luxury';
                    const isProOrLifetime = userTier === 'pro' || userTier === 'lifetime' || userTier === 'premium';
                    return (
                      <div
                        key={tmpl.id}
                        onClick={() => {
                          if (isPremium && !isProOrLifetime) {
                            toast.error(
                              userTier === 'starter'
                                ? 'Starter includes access to core templates. Upgrade to Pro or Lifetime to use premium templates.'
                                : 'Upgrade to Pro or Lifetime to unlock all premium templates.'
                            );
                            setDownloadLimitModalData({
                              message: 'This premium template is exclusively available on Pro and Lifetime plans. Starter includes access to core templates.',
                              redirectUrl: '/pricing?plan=pro',
                            });
                            setShowDownloadLimitModal(true);
                            return;
                          }
                          setSelectedTemplate(tmpl);
                          setCustomTheme(tmpl.theme);
                          setSelectedLayout(tmpl.layout);
                          setSectionVariants(tmpl.sectionVariants);
                          if (tmpl.layout.sectionOrder) {
                            setSectionOrder(tmpl.layout.sectionOrder.filter((item): item is SectionKey => item in sectionLabels));
                          }
                          toast.success(`Loaded ${tmpl.name || tmpl.layout.name}`);
                        }}
                        className={`group relative cursor-pointer rounded-md border p-2 transition-all flex flex-col justify-between ${
                          isSelected
                            ? 'border-violet-600 ring-2 ring-violet-500/20 bg-violet-50/40 shadow-xs'
                            : 'border-slate-200 hover:border-violet-300 hover:shadow-xs bg-white'
                        }`}
                      >
                        {/* Card Top Preview Wrapper */}
                        <div className="relative mb-2">
                          <EditorSidebarTemplatePreview template={tmpl} />
                          
                          {/* Selected Checkmark Badge */}
                          {isSelected && (
                            <div className="absolute top-2 right-2 z-20 bg-violet-600 text-white rounded-full p-1 shadow-md">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                            </div>
                          )}

                          {/* Category / Premium Tag */}
                          <div className="absolute left-2 top-2 z-10 flex items-center gap-1">
                            <span className="rounded-full bg-white/90 px-2 py-0.5 text-[8px] font-bold text-slate-700 shadow-2xs backdrop-blur uppercase tracking-wider">
                              {tmpl.category || 'ATS'}
                            </span>
                            {isPremium && (
                              <span className="rounded-full bg-amber-500 text-white px-1.5 py-0.5 text-[8px] font-extrabold shadow-2xs uppercase tracking-wider">
                                PRO
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Card Content & Badges */}
                        <div className="px-0.5 space-y-1">
                          <h4 className="text-xs font-bold text-slate-900 group-hover:text-violet-600 transition-colors line-clamp-1">
                            {tmpl.layout.name || tmpl.name}
                          </h4>
                          
                          <div className="flex flex-wrap items-center gap-1">
                            <span className="text-[8px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/60 px-1.5 py-0.5 rounded">
                              ✓ ATS
                            </span>
                            <span className="text-[8px] font-bold bg-violet-50 text-violet-700 px-1.5 py-0.5 rounded truncate max-w-[70px]">
                              {tmpl.theme.name}
                            </span>
                            {(tmpl as any).isPremium ? (
                              <span className="text-[8px] font-bold bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded">PRO</span>
                            ) : (
                              <span className="text-[8px] font-bold bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">FREE</span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto p-4 space-y-2 [scrollbar-gutter:stable]">
                {['personal', ...sectionOrder].map((stepId) => {
                  const step = builderSteps.find(s => s.id === stepId);
                  if (!step) return null;
                  const isActive = expandedPanel === step.id;
                  const complete = completedStep(step.id, cvData);
                  const isDraggable = sectionOrder.includes(step.id as SectionKey);
                  const Icon = step.icon;
                  
                  return (
                    <div 
                      key={step.id}
                      draggable={isDraggable}
                      onDragStart={() => isDraggable && setDraggedSectionIndex(sectionOrder.indexOf(step.id as SectionKey))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => isDraggable && dropSection(sectionOrder.indexOf(step.id as SectionKey))}
                      onDragEnd={() => setDraggedSectionIndex(null)}
                      onClick={() => scrollToSectionInPreview(step.id as BuilderStep)}
                      className={`group flex items-center justify-between p-3 rounded-md cursor-pointer transition-all border ${
                        isActive 
                          ? 'bg-violet-50/90 border-violet-300 border-l-4 border-l-violet-600 shadow-xs' 
                          : 'bg-white border-transparent hover:border-slate-200 shadow-2xs'
                      }`}
                    >
                      <div className={`flex items-center gap-3 min-w-0 ${isActive ? 'text-violet-700 font-bold' : 'text-slate-700 font-medium'}`}>
                        <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-violet-600' : 'text-slate-400'}`} />
                        <span className="text-xs truncate">{step.title}</span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {complete ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/80">
                            <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                            Done
                          </span>
                        ) : (
                          <span className="text-[10px] font-semibold text-slate-400">Incomplete</span>
                        )}
                        {isDraggable && <GripVertical className="w-4 h-4 text-slate-400 cursor-grab active:cursor-grabbing opacity-50 group-hover:opacity-100 transition-opacity" />}
                      </div>
                    </div>
                  );
                })}
                
                <div className="pt-2">
                  <button 
                    type="button"
                    onClick={() => toast('Additional custom sections feature enabled')}
                    className="w-full py-3 rounded-md border border-dashed border-violet-300 bg-white text-xs font-bold text-violet-600 hover:bg-violet-50 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    Add Section
                  </button>
                </div>
                
                {/* ATS Score Card */}
                <div 
                  onClick={() => setShowATSModal(true)}
                  className="mt-8 bg-white border border-slate-200 hover:border-emerald-300 rounded-md p-4 shadow-xs hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      ATS Parsing Score
                    </span>
                    <span className="text-[10px] text-violet-600 font-bold group-hover:underline flex items-center gap-0.5">
                      Analyze <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                  <div className="flex items-end gap-2 mb-3">
                    <span className="text-3xl font-bold text-emerald-500 leading-none">92</span>
                    <span className="text-xs text-slate-500 font-bold mb-1">/100</span>
                    <div className="ml-auto bg-emerald-50 text-emerald-600 px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider">
                      Excellent
                    </div>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: '92%' }} />
                  </div>
                </div>
              </div>
            )}
          </aside>

          {/* CENTER AREA (Continuous Multi-Page Live Preview) */}
          <section 
            ref={previewScrollRef}
            className="flex-1 flex flex-col relative bg-[#F1F3F5] min-w-0 z-0 overflow-y-auto"
          >
            <div className="flex-1 px-4 py-8 sm:px-8 sm:py-12 flex flex-col items-center pb-28">
              {/* Outer Sizing Box - Matches exact scaled visual width to eliminate right-side white gap */}
              <div 
                style={{ 
                  width: 920 * autoScale,
                  height: contentHeight ? (contentHeight * autoScale) : undefined,
                  maxWidth: '100%',
                }}
              >
                {/* Scaled Printable Document Container */}
                <div 
                  className="printable transition-transform duration-200" 
                  style={{ 
                    transform: `scale(${autoScale})`, 
                    transformOrigin: 'top left',
                    width: 920,
                  }}
                >
                  <div className="flex flex-col items-center">
                    {Array.from({ length: totalPages }).map((_, p) => {
                      const sheetHeight = totalPages === 1 && contentHeight 
                        ? contentHeight 
                        : (p === totalPages - 1 && contentHeight 
                            ? Math.max(300, contentHeight - p * 1301) 
                            : 1301);

                      return (
                        <div key={p} className="flex flex-col items-center last:mb-0">
                          {/* Paper Sheet Container - Automatically fits actual content height */}
                          <div 
                            className="relative bg-white shadow-xl overflow-hidden transition-all duration-300"
                            style={{ width: 920, height: sheetHeight }}
                          >
                            {/* Continuous Seamless Page View Slice */}
                            <div 
                              ref={p === 0 ? cvContentRef : undefined}
                              className="pointer-events-none select-none"
                              style={{ 
                                transform: `translateY(-${p * 1301}px)`,
                                width: 920,
                              }}
                            >
                              <A4MultiPageContainer density={density} onPageCountChange={(cnt) => setTotalPages(cnt)}>
                                <TemplateRenderer template={customTemplate} data={visibleData} scale={1} />
                              </A4MultiPageContainer>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            
            {/* BOTTOM TOOLBAR */}
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md border border-slate-200 shadow-xl rounded-full px-5 py-2.5 flex items-center gap-3 z-40">
              <button 
                type="button"
                disabled={activePage === 1} 
                onClick={() => scrollToPage(activePage - 1)} 
                className="p-1.5 text-slate-500 hover:bg-slate-100 rounded-full disabled:opacity-30 transition-colors cursor-pointer"
                title="Previous Page"
              >
                <ChevronUp className="w-5 h-5 -rotate-90" />
              </button>
              <span className="text-xs font-bold text-slate-700 min-w-[3.5rem] text-center">Page {activePage} / {totalPages}</span>
              <button 
                type="button"
                disabled={activePage === totalPages} 
                onClick={() => scrollToPage(activePage + 1)} 
                className="p-1.5 text-slate-500 hover:bg-slate-100 rounded-full disabled:opacity-30 transition-colors cursor-pointer"
                title="Next Page"
              >
                <ChevronDown className="w-5 h-5 -rotate-90" />
              </button>

              <div className="h-4 w-px bg-slate-200 mx-1" />

              <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-full text-[10px] font-bold">
                <button
                  type="button"
                  onClick={() => setDensity('compact')}
                  className={`px-2.5 py-1 rounded-full transition-colors cursor-pointer ${
                    density === 'compact' ? 'bg-white text-violet-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="Compact Spacing (Fit on 1 page)"
                >
                  Compact
                </button>
                <button
                  type="button"
                  onClick={() => setDensity('standard')}
                  className={`px-2.5 py-1 rounded-full transition-colors cursor-pointer ${
                    density === 'standard' ? 'bg-white text-violet-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="Standard Spacing"
                >
                  Standard
                </button>
                <button
                  type="button"
                  onClick={() => setDensity('large')}
                  className={`px-2.5 py-1 rounded-full transition-colors cursor-pointer ${
                    density === 'large' ? 'bg-white text-violet-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="Large Spacing"
                >
                  Large
                </button>
              </div>

              <div className="h-4 w-px bg-slate-200 mx-1" />
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider bg-slate-100 px-3 py-1 rounded-full">
                Auto Fit ({Math.round(autoScale * 100)}%)
              </span>
            </div>
          </section>

          {/* RIGHT SIDEBAR (Collapsible Property Panels with Scroll Sync) */}
          <aside 
            ref={rightPanelRef}
            className="w-[340px] bg-white border-l border-slate-200 flex flex-col shrink-0 overflow-y-auto shadow-[-10px_0_15px_-3px_rgba(0,0,0,0.02)] z-10"
          >
            <div className="divide-y divide-slate-100">
              {builderSteps.map(step => {
                const isActive = expandedPanel === step.id;
                const Icon = step.icon;
                return (
                  <div key={step.id} id={`panel-form-${step.id}`} className="bg-white">
                    <button 
                      type="button"
                      onClick={() => scrollToSectionInPreview(step.id as BuilderStep)}
                      className={`w-full flex items-center justify-between p-5 text-left transition-colors cursor-pointer ${isActive ? 'bg-violet-50/40' : 'hover:bg-slate-50'}`}
                    >
                      <div className="flex gap-4">
                        <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-violet-600' : 'text-slate-400'}`} />
                        <div className="flex flex-col">
                          <span className={`text-xs font-bold uppercase tracking-wider ${isActive ? 'text-violet-900' : 'text-slate-700'}`}>{step.title}</span>
                          {isActive && <span className="text-[10px] text-slate-500 mt-1">{step.helper}</span>}
                        </div>
                      </div>
                      {isActive ? (
                        <ChevronUp className="w-5 h-5 text-violet-600 shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                      )}
                    </button>
                    
                    {isActive && (
                      <div className="px-5 pb-5 pt-1 animate-in slide-in-from-top-1 fade-in duration-200">
                        {renderPanelContent(step.id)}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </aside>
        </div>

        {/* ========================================================================= */}
        {/* MOBILE WORKSPACE LAYOUT (Visible ONLY on mobile md:hidden) */}
        {/* ========================================================================= */}
        <div className="flex md:hidden flex-1 flex-col overflow-hidden pb-16 bg-slate-50 w-full">
          {/* MOBILE TAB 1: FORM / EDIT */}
          {mobileTab === 'form' && (
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Mobile Stepper Header Bar */}
              <div className="bg-white rounded-md p-3 border border-slate-200 shadow-2xs space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                  <span>Section {currentStepIndex + 1} of {allSectionSteps.length}</span>
                  <span className="text-violet-600 font-bold uppercase">{builderSteps.find(s => s.id === expandedPanel)?.title}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={!prevStep}
                    onClick={() => prevStep && scrollToSectionInPreview(prevStep)}
                    className="p-2.5 rounded-md bg-slate-100 text-slate-700 disabled:opacity-30 transition-colors cursor-pointer"
                    title="Previous Section"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <select
                    value={expandedPanel}
                    onChange={(e) => scrollToSectionInPreview(e.target.value as BuilderStep)}
                    className="flex-1 h-11 px-3 bg-slate-50 border border-slate-200 rounded-md text-sm font-bold text-slate-900 shadow-2xs focus:ring-2 focus:ring-violet-500"
                  >
                    <option value="personal">1. Personal Information</option>
                    {sectionOrder.map((key, idx) => (
                      <option key={key} value={key}>
                        {idx + 2}. {sectionLabels[key]}
                      </option>
                    ))}
                  </select>

                  <button
                    type="button"
                    disabled={!nextStep}
                    onClick={() => nextStep && scrollToSectionInPreview(nextStep)}
                    className="p-2.5 rounded-md bg-slate-100 text-slate-700 disabled:opacity-30 transition-colors cursor-pointer"
                    title="Next Section"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Active Section Form Inputs */}
              <div className="bg-white rounded-md p-4 border border-slate-200 shadow-2xs space-y-4">
                <div className="border-b border-slate-100 pb-3 mb-2">
                  <h3 className="text-base font-bold text-slate-900">
                    {builderSteps.find(s => s.id === expandedPanel)?.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {builderSteps.find(s => s.id === expandedPanel)?.helper}
                  </p>
                </div>

                {renderPanelContent(expandedPanel)}
              </div>

              {/* Bottom Step Navigation */}
              <div className="flex items-center justify-between gap-3 pt-2">
                {prevStep ? (
                  <button
                    type="button"
                    onClick={() => scrollToSectionInPreview(prevStep)}
                    className="flex-1 py-3 px-4 rounded-md border border-slate-200 bg-white text-xs font-bold text-slate-700 flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                ) : <div className="flex-1" />}

                {nextStep ? (
                  <button
                    type="button"
                    onClick={() => scrollToSectionInPreview(nextStep)}
                    className="flex-1 py-3 px-4 rounded-md bg-violet-600 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-violet-500/20 cursor-pointer"
                  >
                    <span>Next Section</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setMobileTab('preview')}
                    className="flex-1 py-3 px-4 rounded-md bg-emerald-600 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View Preview</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* MOBILE TAB 2: SECTIONS REORDER & TOGGLE */}
          {mobileTab === 'sections' && (
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              <div className="flex items-center justify-between px-1 mb-1">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Manage Resume Sections</h3>
                <span className="text-[10px] text-slate-400 font-semibold">{sectionOrder.length + 1} Sections</span>
              </div>

              {['personal', ...sectionOrder].map((stepId) => {
                const step = builderSteps.find(s => s.id === stepId);
                if (!step) return null;
                const complete = completedStep(step.id, cvData);
                const Icon = step.icon;
                return (
                  <div
                    key={step.id}
                    onClick={() => {
                      scrollToSectionInPreview(step.id as BuilderStep);
                      setMobileTab('form');
                    }}
                    className="flex items-center justify-between p-3.5 bg-white rounded-md border border-slate-200 shadow-2xs cursor-pointer hover:border-violet-300 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-md bg-violet-50 text-violet-600 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">{step.title}</h4>
                        <span className="text-[10px] text-slate-400 font-medium">Tap to edit</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {complete && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </div>
                  </div>
                );
              })}

              {/* ATS Score Card */}
              <div className="mt-6 bg-white border border-slate-200 rounded-md p-4 shadow-2xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-900">ATS Score Analysis</span>
                  <span className="bg-emerald-50 text-emerald-600 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase">92 / 100</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden mb-2">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '92%' }} />
                </div>
                <p className="text-[11px] text-slate-500">Your resume formatting is optimized for automated tracking systems.</p>
              </div>
            </div>
          )}

          {/* MOBILE TAB 3: DESIGN & LAYOUT */}
          {mobileTab === 'design' && (
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Sub-tab Switcher: Templates vs Colors/Fonts */}
              <div className="bg-white rounded-md p-1.5 border border-slate-200 shadow-2xs flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setMobileDesignSubTab('templates')}
                  className={`flex-1 py-2.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                    mobileDesignSubTab === 'templates'
                      ? 'bg-violet-600 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Templates ({templates.length})
                </button>

                <button
                  type="button"
                  onClick={() => setMobileDesignSubTab('styles')}
                  className={`flex-1 py-2.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                    mobileDesignSubTab === 'styles'
                      ? 'bg-violet-600 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Colors & Fonts
                </button>
              </div>

              {mobileDesignSubTab === 'templates' ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between px-1">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Select Template Design</h3>
                    <span className="text-[10px] font-semibold text-slate-400">Tap card to select</span>
                  </div>

                  {/* 2-Column Responsive Template Cards Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    {templates.map((tmpl) => {
                      const isSelected = selectedTemplate.id === tmpl.id;
                      return (
                        <div
                          key={tmpl.id}
                          onClick={() => {
                            setSelectedTemplate(tmpl);
                            setCustomTheme(tmpl.theme);
                            setSelectedLayout(tmpl.layout);
                            setSectionVariants(tmpl.sectionVariants);
                            if (tmpl.layout.sectionOrder) {
                              setSectionOrder(tmpl.layout.sectionOrder.filter((item): item is SectionKey => item in sectionLabels));
                            }
                            toast.success(`Loaded ${tmpl.name || tmpl.layout.name}`);
                          }}
                          className={`group relative cursor-pointer rounded-md border p-2 transition-all flex flex-col justify-between ${
                            isSelected
                              ? 'border-violet-600 ring-2 ring-violet-500/20 bg-violet-50/40 shadow-xs'
                              : 'border-slate-200 hover:border-violet-300 bg-white'
                          }`}
                        >
                          {/* Card Top Scaled Preview */}
                          <div className="relative mb-2">
                            <EditorSidebarTemplatePreview template={tmpl} />

                            {/* Selected Checkmark Badge */}
                            {isSelected && (
                              <div className="absolute top-2 right-2 z-20 bg-violet-600 text-white rounded-full p-1 shadow-md">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                              </div>
                            )}

                            {/* Category Tag */}
                            <div className="absolute left-2 top-2 z-10 rounded-full bg-white/90 px-2 py-0.5 text-[8px] font-bold text-slate-700 shadow-2xs backdrop-blur uppercase tracking-wider">
                              {tmpl.category || 'ATS'}
                            </div>
                          </div>

                          {/* Card Content & Badges */}
                          <div className="px-0.5 space-y-1">
                            <h4 className="text-xs font-bold text-slate-900 group-hover:text-violet-600 transition-colors line-clamp-1">
                              {tmpl.layout.name || tmpl.name}
                            </h4>

                            <div className="flex flex-wrap items-center gap-1">
                              <span className="text-[8px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/60 px-1.5 py-0.5 rounded">
                                ✓ ATS
                              </span>
                              <span className="text-[8px] font-bold bg-violet-50 text-violet-700 px-1.5 py-0.5 rounded truncate max-w-[70px]">
                                {tmpl.theme.name}
                              </span>
                              {(tmpl as any).isPremium ? (
                                <span className="text-[8px] font-bold bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded">PRO</span>
                              ) : (
                                <span className="text-[8px] font-bold bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">FREE</span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-md p-4 border border-slate-200 shadow-2xs space-y-4">
                  <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
                    Theme & Visual Customization
                  </h3>

                  <SelectField
                    label="Theme Preset"
                    value={customTheme.id}
                    onChange={(val: string) => { const theme = allThemes.find(t => t.id === val); if (theme) setCustomTheme(theme); }}
                    options={allThemes.map((t) => ({ value: t.id, label: t.name }))}
                  />

                  <SelectField
                    label="Layout Style"
                    value={selectedLayout.id}
                    onChange={(val: string) => { const layout = allLayouts.find(l => l.id === val); if (layout) { setSelectedLayout(layout); setSectionOrder(layout.sectionOrder.filter((item): item is SectionKey => item in sectionLabels)); } }}
                    options={allLayouts.map((l) => ({ value: l.id, label: l.name }))}
                  />

                  <SelectField
                    label="Font Family"
                    value={customTheme.fontFamily}
                    onChange={(value: string) => setCustomTheme((prev) => ({ ...prev, fontFamily: value, fontFamilyHeading: value }))}
                    options={fontFamilies.map((font) => ({ value: font.value, label: font.name }))}
                  />

                  <SelectField
                    label="Spacing Density"
                    value={customTheme.spacing}
                    onChange={(value: string) => setCustomTheme((prev) => ({ ...prev, spacing: value as Theme['spacing'] }))}
                    options={['compact', 'normal', 'relaxed'].map((value) => ({ value, label: value }))}
                  />

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <ColorField
                      label="Primary Accent"
                      value={customTheme.primary}
                      onChange={(value: string) => setCustomTheme((prev) => ({ ...prev, primary: value, gradient: { ...prev.gradient, start: value } }))}
                    />

                    <ColorField
                      label="Text Color"
                      value={customTheme.text}
                      onChange={(value: string) => setCustomTheme((prev) => ({ ...prev, text: value }))}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* MOBILE TAB 4: PREVIEW */}
          {mobileTab === 'preview' && (
            <div className="flex-1 overflow-y-auto p-3 flex flex-col items-center">
              <div className="w-full flex items-center justify-between px-2 py-2 text-xs font-bold text-slate-500">
                <span>Live Mobile Preview</span>
                <span>A4 • {totalPages} {totalPages === 1 ? 'Page' : 'Pages'}</span>
              </div>

              {/* Dynamic Proportional Mobile A4 Preview Canvas */}
              <MobilePreviewCanvas
                customTemplate={customTemplate}
                visibleData={visibleData}
                totalPages={totalPages}
              />
            </div>
          )}

          {/* MOBILE TAB 5: EXPORT */}
          {mobileTab === 'export' && (
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="bg-white rounded-md p-5 border border-slate-200 shadow-2xs space-y-4 text-center">
                <div className="w-12 h-12 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center mx-auto mb-2">
                  <Download className="w-6 h-6" />
                </div>

                <h3 className="text-base font-bold text-slate-900">Export Your Resume</h3>
                <p className="text-xs text-slate-500">Download high-resolution ATS-friendly documents ready for job applications.</p>

                <div className="space-y-3 pt-2">
                  <button
                    type="button"
                    onClick={() => downloadExport('pdf')}
                    disabled={isExporting}
                    className="w-full py-3.5 bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-md text-sm transition-all shadow-md shadow-violet-500/25 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>{isExporting ? 'Preparing PDF...' : 'Download PDF Document'}</span>
                  </button>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => downloadExport('png')}
                      disabled={isExporting}
                      className="py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-md text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <span>Download PNG</span>
                      {userTier !== 'pro' && userTier !== 'lifetime' && (
                        <span className="px-1.5 py-0.5 text-[9px] bg-amber-100 text-amber-800 rounded font-black">PRO</span>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => downloadExport('jpg')}
                      disabled={isExporting}
                      className="py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-md text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <span>Download JPG</span>
                      {userTier !== 'pro' && userTier !== 'lifetime' && (
                        <span className="px-1.5 py-0.5 text-[9px] bg-amber-100 text-amber-800 rounded font-black">PRO</span>
                      )}
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={saveDraft}
                    disabled={isSaving}
                    className="w-full py-3 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold rounded-md text-xs transition-colors cursor-pointer"
                  >
                    {isSaving ? 'Saving Draft...' : 'Save Draft Online'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* FIXED MOBILE BOTTOM NAVIGATION BAR */}
          <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur border-t border-slate-200 py-1.5 flex items-center justify-around md:hidden shadow-lg">
            <button
              type="button"
              onClick={() => setMobileTab('form')}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-md transition-all cursor-pointer ${
                mobileTab === 'form' ? 'text-violet-600 font-bold bg-violet-50' : 'text-slate-500 font-medium'
              }`}
            >
              <Edit3 className="w-5 h-5" />
              <span className="text-[10px]">Edit</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileTab('sections')}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-md transition-all cursor-pointer ${
                mobileTab === 'sections' ? 'text-violet-600 font-bold bg-violet-50' : 'text-slate-500 font-medium'
              }`}
            >
              <Layers className="w-5 h-5" />
              <span className="text-[10px]">Sections</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileTab('design')}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-md transition-all cursor-pointer ${
                mobileTab === 'design' ? 'text-violet-600 font-bold bg-violet-50' : 'text-slate-500 font-medium'
              }`}
            >
              <SlidersHorizontal className="w-5 h-5" />
              <span className="text-[10px]">Design</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileTab('preview')}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-md transition-all cursor-pointer ${
                mobileTab === 'preview' ? 'text-violet-600 font-bold bg-violet-50' : 'text-slate-500 font-medium'
              }`}
            >
              <Eye className="w-5 h-5" />
              <span className="text-[10px]">Preview</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileTab('export')}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-md transition-all cursor-pointer ${
                mobileTab === 'export' ? 'text-violet-600 font-bold bg-violet-50' : 'text-slate-500 font-medium'
              }`}
            >
              <Download className="w-5 h-5" />
              <span className="text-[10px]">Export</span>
            </button>
          </nav>
        </div>
      </main>
      <Toaster position="bottom-right" />
      
      {/* Save Template Modal (FR5.1) */}
      <SaveTemplateModal
        isOpen={showSaveTemplateModal}
        onClose={() => setShowSaveTemplateModal(false)}
        onSaved={(templateId, templateName) => {
          toast.success(`Template "${templateName}" saved to your library!`);
        }}
        resumeId={resumeId}
        customTheme={customTheme}
        selectedLayout={selectedLayout}
        sectionVariants={sectionVariants}
      />

      {/* ATS Parsing Score Analyzer Modal */}
      <ATSAnalyzerModal
        isOpen={showATSModal}
        onClose={() => setShowATSModal(false)}
        cvData={cvData}
        onTriggerAIFix={() => {
          setExpandedPanel('summary');
          toast.success('Navigated to summary & experience section for AI enhancement');
        }}
      />

      {/* Share Resume Link Modal */}
      <ShareResumeModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        resumeId={resumeId}
        candidateName={`${cvData.personal.firstName || ''} ${cvData.personal.lastName || ''}`.trim()}
      />

      {/* AI Cover Letter Generator Modal */}
      <AICoverLetterModal
        isOpen={showCoverLetterModal}
        onClose={() => setShowCoverLetterModal(false)}
        defaultJobTitle={cvData.personal.title || ''}
        candidateName={`${cvData.personal.firstName || ''} ${cvData.personal.lastName || ''}`.trim() || 'Job Seeker'}
        skills={cvData.skills?.map(s => s.name) || []}
      />

      {/* AI Resume Improvement Modal */}
      <AIImprovementModal
        isOpen={aiImproveModal.isOpen}
        onClose={() => setAiImproveModal(prev => ({ ...prev, isOpen: false }))}
        initialText={aiImproveModal.initialText}
        fieldName={aiImproveModal.fieldName}
        jobTitle={cvData.personal.title || ''}
        onAccept={(newText) => {
          aiImproveModal.onAccept(newText);
          setAiImproveModal(prev => ({ ...prev, isOpen: false }));
        }}
      />

      {/* Download Limit & Upgrade Modal */}
      <DownloadLimitModal
        isOpen={showDownloadLimitModal}
        onClose={() => setShowDownloadLimitModal(false)}
        message={downloadLimitModalData.message}
        redirectUrl={downloadLimitModalData.redirectUrl}
      />

      {/* Resume File Import Modal */}
      <ResumeImportModal
        isOpen={showImportModal}
        onClose={() => setShowImportModal(false)}
        onImportSuccess={(parsedData) => {
          setCvData((prev) => ({
            ...prev,
            personal: { ...prev.personal, ...parsedData.personal },
            summary: parsedData.personal?.summary || prev.summary,
            experience: parsedData.experience?.length ? parsedData.experience : prev.experience,
            education: parsedData.education?.length ? parsedData.education : prev.education,
            skills: parsedData.skills?.length ? parsedData.skills : prev.skills,
          }));
          toast.success('Resume imported and auto-filled successfully!');
        }}
      />
      
      {/* Voice & AI Content Editor Modal (Voice commands & AI patch confirmation) */}
      <VoiceAICommandCenter
        isOpen={showVoiceAIModal}
        onClose={() => setShowVoiceAIModal(false)}
        cvData={cvData}
        activeSection={expandedPanel}
        onApplyChange={handleApplyVoiceChange}
      />

      {/* Floating Voice & AI Quick Action Button */}
      <button
        type="button"
        onClick={() => setShowVoiceAIModal(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 bg-[#0F0F0F] hover:bg-[#262626] text-white rounded-full shadow-2xl border-2 border-[#F5D17B]/50 hover:scale-105 active:scale-95 transition-all cursor-pointer group"
        title="Open Voice & AI Content Editor"
      >
        <div className="relative flex items-center justify-center">
          <Mic className="w-5 h-5 text-[#F3645C]" />
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#58C09D] animate-ping" />
        </div>
        <div className="flex flex-col text-left">
          <span className="text-xs font-black tracking-tight text-white flex items-center gap-1">
            <span>Voice &amp; AI</span>
            <Sparkles className="w-3.5 h-3.5 text-[#F5D17B]" />
          </span>
          <span className="text-[9px] text-slate-300 font-medium hidden sm:inline">Click or speak commands</span>
        </div>
      </button>

      {/* Hidden container for PDF export rendering without scroll interference */}
      <div className="pointer-events-none fixed -left-[10000px] top-0">
        <div ref={exportRef} className="bg-white p-0" style={{ width: 920 }}>
          <TemplateRenderer template={customTemplate} data={visibleData} scale={1} />
        </div>
      </div>
    </div>
  );
}
