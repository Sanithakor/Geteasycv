'use client';

import React, { useMemo, useRef, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import toast, { Toaster } from 'react-hot-toast';
import { TemplateRenderer } from '@/components/cv';
import { CVData, CertificationItem, EducationItem, ExperienceItem, LanguageItem, ProjectItem, SkillItem, sampleCV } from '@/data/sampleCV';
import { getAllLayouts, Layout } from '@/data/layouts';
import { getAllThemes, Theme } from '@/data/themes';
import { GeneratedTemplate, SectionVariant, generateTemplates } from '@/lib/generateTemplates';

type EditorTab = 'content' | 'design' | 'layout' | 'settings';
type ExportType = 'pdf' | 'png' | 'jpg';
type BuilderStep = 'personal' | 'summary' | 'experience' | 'education' | 'skills' | 'projects' | 'certifications' | 'languages' | 'design' | 'download';
type SectionKey = 'summary' | 'experience' | 'education' | 'skills' | 'projects' | 'certifications' | 'languages';

const builderSteps: { id: BuilderStep; tab: EditorTab; title: string; helper: string; icon: string }[] = [
  { id: 'personal', tab: 'content', title: 'Personal Info', helper: 'Start with contact details recruiters expect.', icon: '👤' },
  { id: 'summary', tab: 'content', title: 'Summary', helper: 'Write a short pitch for your next role.', icon: '📝' },
  { id: 'experience', tab: 'content', title: 'Experience', helper: 'Add your latest work experience first.', icon: '💼' },
  { id: 'education', tab: 'content', title: 'Education', helper: 'Add degrees, schools, courses, and dates.', icon: '🎓' },
  { id: 'skills', tab: 'content', title: 'Skills', helper: 'Show tools, strengths, and proficiency.', icon: '⚡' },
  { id: 'projects', tab: 'content', title: 'Projects', helper: 'Highlight portfolio work and outcomes.', icon: '🚀' },
  { id: 'certifications', tab: 'content', title: 'Certifications', helper: 'Add verified credentials and licenses.', icon: '🏆' },
  { id: 'languages', tab: 'content', title: 'Languages', helper: 'List languages and proficiency.', icon: '🌍' },
  { id: 'design', tab: 'design', title: 'Design', helper: 'Choose the template, theme, and visual style.', icon: '🎨' },
  { id: 'download', tab: 'settings', title: 'Download', helper: 'Review, save, and export your resume.', icon: '📁' },
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

const jobCategories = [
  'All',
  'Software Developer',
  'UI/UX Designer',
  'Marketing',
  'Sales',
  'HR',
  'Finance',
  'Data Science',
  'Student',
  'Fresher',
  'Executive',
  'Creative',
  'ATS Friendly',
];

const fontFamilies = [
  { name: 'Inter', value: 'Inter, sans-serif' },
  { name: 'Poppins', value: 'Poppins, sans-serif' },
  { name: 'Sora', value: 'Sora, sans-serif' },
  { name: 'Playfair', value: '"Playfair Display", serif' },
  { name: 'Manrope', value: 'Manrope, sans-serif' },
  { name: 'DM Sans', value: '"DM Sans", sans-serif' },
];

const emptyVisibility = {
  summary: true,
  experience: true,
  education: true,
  skills: true,
  projects: true,
  certifications: true,
  languages: true,
};

function isHex(value: string) {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value);
}

function fileName(data: CVData, extension: ExportType) {
  const name = `${data.personal.firstName || 'resume'}-${data.personal.lastName || 'cv'}`
    .replace(/[^a-z0-9-]+/gi, '-')
    .replace(/-+/g, '-')
    .toLowerCase();
  return `${name}.${extension}`;
}

function completedStep(step: BuilderStep, data: CVData) {
  if (step === 'personal') return Boolean(data.personal.firstName && data.personal.email);
  if (step === 'summary') return data.summary.trim().length > 30;
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

function templateMatchesCategory(template: GeneratedTemplate, category: string) {
  if (category === 'All') return true;
  const text = `${template.name} ${template.category} ${template.tags.join(' ')} ${template.layout.description}`.toLowerCase();
  const categoryText = category.toLowerCase();
  if (categoryText.includes('software') || categoryText.includes('data')) return text.includes('ats') || text.includes('modern') || text.includes('startup') || text.includes('dashboard');
  if (categoryText.includes('ui') || categoryText.includes('creative')) return text.includes('creative') || text.includes('portfolio') || text.includes('magazine') || text.includes('bento');
  if (categoryText.includes('student') || categoryText.includes('fresher') || categoryText.includes('ats')) return text.includes('ats') || text.includes('minimal') || text.includes('single') || text.includes('compact');
  if (categoryText.includes('executive') || categoryText.includes('finance') || categoryText.includes('hr')) return text.includes('executive') || text.includes('luxury') || text.includes('professional');
  return true;
}

// Modern Form Components with Enhanced UX
const Field = ({ label, value, onChange, type = 'text', placeholder, icon }: { 
  label: string; 
  value: string; 
  onChange: (value: string) => void; 
  type?: string; 
  placeholder?: string;
  icon?: string;
}) => (
  <label className="grid gap-2 text-sm font-medium text-slate-700">
    <div className="flex items-center gap-2">
      {icon && <span className="text-base">{icon}</span>}
      <span>{label}</span>
    </div>
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={(event) => onChange(event.target.value)}
      className="h-9.5 max-w-full w-full rounded-lg border border-slate-200 bg-white px-3 text-xs text-slate-950 shadow-sm outline-none transition-all focus:border-violet-500 focus:ring-2 focus:ring-violet-100 focus:shadow-md hover:shadow-sm"
    />
  </label>
);

const TextField = ({ label, value, onChange, rows = 4, placeholder, icon }: { 
  label: string; 
  value: string; 
  onChange: (value: string) => void; 
  rows?: number; 
  placeholder?: string;
  icon?: string;
}) => (
  <label className="grid gap-2 text-xs font-semibold text-slate-700">
    <div className="flex items-center gap-2">
      {icon && <span className="text-base">{icon}</span>}
      <span>{label}</span>
    </div>
    <textarea
      rows={rows}
      value={value}
      placeholder={placeholder}
      onChange={(event) => onChange(event.target.value)}
      className="resize-y max-w-full w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-950 shadow-sm outline-none transition-all focus:border-violet-500 focus:ring-2 focus:ring-violet-100 focus:shadow-md hover:shadow-sm"
    />
  </label>
);

const SelectField = ({ label, value, options, onChange, icon }: { 
  label: string; 
  value: string; 
  options: { value: string; label: string }[]; 
  onChange: (value: string) => void;
  icon?: string;
}) => (
  <label className="grid gap-2 text-xs font-semibold text-slate-700">
    <div className="flex items-center gap-2">
      {icon && <span className="text-base">{icon}</span>}
      <span>{label}</span>
    </div>
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="h-9.5 max-w-full w-full rounded-lg border border-slate-200 bg-white px-3 text-xs text-slate-950 shadow-sm outline-none transition-all focus:border-violet-500 focus:ring-2 focus:ring-violet-100 focus:shadow-md hover:shadow-sm"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
  </label>
);

const ColorField = ({ label, value, onChange, icon }: { 
  label: string; 
  value: string; 
  onChange: (value: string) => void;
  icon?: string;
}) => (
  <label className="grid gap-2 text-sm font-medium text-slate-700">
    <div className="flex items-center gap-2">
      {icon && <span className="text-base">{icon}</span>}
      <span>{label}</span>
    </div>
    <span className="flex items-center gap-3">
      <input 
        type="color" 
        value={isHex(value) ? value : '#ffffff'} 
        onChange={(event) => onChange(event.target.value)} 
        className="h-12 w-16 rounded-2xl border border-slate-200 bg-white p-1 shadow-sm cursor-pointer transition-all hover:shadow-md" 
      />
      <input 
        value={value} 
        onChange={(event) => onChange(event.target.value)} 
        className="h-12 min-w-0 flex-1 max-w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-950 shadow-sm outline-none transition-all focus:border-violet-500 focus:ring-2 focus:ring-violet-100 focus:shadow-lg hover:shadow-md" 
        placeholder="#000000"
      />
    </span>
  </label>
);

const ItemCard = ({ title, subtitle, onRemove, children, icon }: { 
  title: string; 
  subtitle: string; 
  onRemove: () => void; 
  children: React.ReactNode;
  icon?: string;
}) => (
  <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-5 shadow-sm hover:shadow-lg transition-all duration-200">
    <div className="mb-5 flex items-start justify-between gap-4">
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 mb-1">
          {icon && <span className="text-lg">{icon}</span>}
          <h3 className="truncate text-base font-semibold text-slate-950">{title}</h3>
        </div>
        <p className="truncate text-sm text-slate-500">{subtitle}</p>
      </div>
      <button 
        type="button" 
        onClick={onRemove} 
        className="rounded-xl px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors flex items-center gap-1"
      >
        <span>🗑️</span>
        Remove
      </button>
    </div>
    <div className="space-y-4">{children}</div>
  </div>
);

export default function EditorPage() {
  const templates = useMemo(() => generateTemplates(), []);
  const allThemes = useMemo(() => getAllThemes(), []);
  const allLayouts = useMemo(() => getAllLayouts(), []);
  const exportRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);
  
  const initialTemplate = useMemo(() => {
    if (typeof window === 'undefined') return templates[0];
    const templateId = new URLSearchParams(window.location.search).get('template');
    return templates.find((item) => item.id === templateId) || templates[0];
  }, [templates]);

  const [selectedTemplate, setSelectedTemplate] = useState<GeneratedTemplate>(initialTemplate);
  const [cvData, setCvData] = useState<CVData>(sampleCV);
  const [customTheme, setCustomTheme] = useState<Theme>(initialTemplate.theme);
  const [selectedLayout, setSelectedLayout] = useState<Layout>(initialTemplate.layout);
  const [sectionVariants, setSectionVariants] = useState<SectionVariant>(initialTemplate.sectionVariants);
  const [activeStep, setActiveStep] = useState<BuilderStep>('personal');
  const [activeTab, setActiveTab] = useState<EditorTab>('content');
  const [zoom, setZoom] = useState(0.8);
  const [visibility, setVisibility] = useState<Record<SectionKey, boolean>>(emptyVisibility);
  const [sectionOrder, setSectionOrder] = useState<SectionKey[]>(['summary', 'experience', 'education', 'skills', 'projects', 'certifications', 'languages']);
  const [draggedSectionIndex, setDraggedSectionIndex] = useState<number | null>(null);
  const [jobCategory, setJobCategory] = useState('All');
  const [templateSearch, setTemplateSearch] = useState('');
  const [favoriteTemplates, setFavoriteTemplates] = useState<string[]>([]);
  const [previewTemplate, setPreviewTemplate] = useState<GeneratedTemplate | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [leftPanelOpen, setLeftPanelOpen] = useState(true);
  const [rightPanelOpen, setRightPanelOpen] = useState(true);
  const [autoSave, setAutoSave] = useState(true);

  const cvContentRef = useRef<HTMLDivElement | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [activePage, setActivePage] = useState(1);

  // Tab key navigation and Page Up/Down controls
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const tag = document.activeElement?.tagName.toLowerCase();
      if (tag === 'input' || tag === 'textarea' || tag === 'select') {
        return;
      }

      if (event.key === 'Tab') {
        event.preventDefault();
        setActivePage((prev) => (prev < totalPages ? prev + 1 : 1));
      } else if (event.key === 'PageDown') {
        event.preventDefault();
        setActivePage((prev) => Math.min(totalPages, prev + 1));
      } else if (event.key === 'PageUp') {
        event.preventDefault();
        setActivePage((prev) => Math.max(1, prev - 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [totalPages]);

  useEffect(() => {
    if (cvContentRef.current) {
      const timer = setTimeout(() => {
        const container = cvContentRef.current;
        if (!container) return;

        // Reset previous cv-spacers
        const previousSpacers = container.querySelectorAll('.cv-spacer');
        previousSpacers.forEach((s) => s.remove());

        // Gather all block components
        const blocks = container.querySelectorAll('.cv-block');
        const PAGE_HEIGHT = 1300.8;
        const BOTTOM_MARGIN = 40; // 40px standard bottom margin

        blocks.forEach((block) => {
          const containerRect = container.getBoundingClientRect();
          const blockRect = block.getBoundingClientRect();

          const top = blockRect.top - containerRect.top;
          const bottom = blockRect.bottom - containerRect.top;

          const pageIndexTop = Math.floor(top / PAGE_HEIGHT);
          const pageIndexBottom = Math.floor((bottom + BOTTOM_MARGIN) / PAGE_HEIGHT);

          // If a single block crosses an A4 page cutoff boundary, insert a spacer div
          if (pageIndexTop !== pageIndexBottom && pageIndexTop >= 0) {
            const spacer = document.createElement('div');
            spacer.className = 'cv-spacer';
            
            const currentPageEnd = (pageIndexTop + 1) * PAGE_HEIGHT;
            const spacerHeight = currentPageEnd - top;

            spacer.style.height = `${spacerHeight}px`;
            spacer.style.width = '100%';
            
            block.parentNode?.insertBefore(spacer, block);
          }
        });

        // Re-measure height after spacers are inserted
        const height = container.scrollHeight || 1300.8;
        const pages = Math.max(1, Math.ceil(height / 1300.8));
        setTotalPages(pages);
        setActivePage((prev) => Math.min(prev, pages));
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [cvData, customTheme, selectedLayout, sectionVariants, sectionOrder, mounted]);

  const saveDraft = useCallback(() => {
    if (mounted) {
      const draft = {
        cvData,
        customTheme,
        selectedLayout,
        sectionVariants,
        visibility,
        sectionOrder,
        savedAt: new Date().toISOString()
      };
      localStorage.setItem('geteasycv-draft', JSON.stringify(draft));
      if (!autoSave) {
        toast.success('Draft saved locally');
      }
    }
  }, [cvData, customTheme, selectedLayout, sectionVariants, visibility, sectionOrder, autoSave, mounted]);

  const saveTemplateDesign = () => {
    if (typeof window === 'undefined') return;
    const templateId = new URLSearchParams(window.location.search).get('template');
    if (!templateId) return;

    const customDesign = {
      theme: customTheme,
      layout: selectedLayout,
      sectionVariants,
      sectionOrder
    };

    localStorage.setItem(`geteasycv-custom-template-${templateId}`, JSON.stringify(customDesign));
    toast.success('Template layout design saved successfully!');
  };

  useEffect(() => {
    setMounted(true);
    // Check if there is a customized design for the current template
    if (typeof window !== 'undefined') {
      const templateId = new URLSearchParams(window.location.search).get('template');
      if (templateId) {
        const savedCustomTemplate = localStorage.getItem(`geteasycv-custom-template-${templateId}`);
        if (savedCustomTemplate) {
          try {
            const parsed = JSON.parse(savedCustomTemplate);
            if (parsed.theme) setCustomTheme(parsed.theme);
            if (parsed.layout) setSelectedLayout(parsed.layout);
            if (parsed.sectionVariants) setSectionVariants(parsed.sectionVariants);
            if (parsed.sectionOrder) setSectionOrder(parsed.sectionOrder);
            console.log(`Loaded customized template design for template: ${templateId}`);
          } catch (e) {
            console.error('Failed to parse customized template:', e);
          }
        }
      }
    }
  }, []);

  useEffect(() => {
    if (autoSave && mounted) {
      const timeoutId = setTimeout(() => {
        saveDraft();
      }, 2000);
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

  const currentStep = builderSteps.find((step) => step.id === activeStep) || builderSteps[0];
  const panelTitle = activeTab === 'layout' ? 'Layout' : currentStep.title;
  const panelHelper = activeTab === 'layout' ? 'Arrange sections, visibility, and section variants.' : currentStep.helper;
  const progress = Math.round((builderSteps.filter((step) => completedStep(step.id, cvData)).length / builderSteps.length) * 100);
  const filteredTemplates = useMemo(() => {
    const search = templateSearch.trim().toLowerCase();
    return templates
      .filter((template) => templateMatchesCategory(template, jobCategory))
      .filter((template) => !search || `${template.name} ${template.description} ${template.category}`.toLowerCase().includes(search))
      .slice(0, 24);
  }, [jobCategory, templateSearch, templates]);

  const switchTab = (tab: EditorTab) => {
    setActiveTab(tab);
    if (tab === 'layout') return;
    const firstStep = builderSteps.find((step) => step.tab === tab);
    if (firstStep) setActiveStep(firstStep.id);
  };

  const selectStep = (step: BuilderStep) => {
    const nextStep = builderSteps.find((item) => item.id === step);
    if (!nextStep) return;
    setActiveStep(step);
    setActiveTab(nextStep.tab);
  };

  const updateTheme = (themeId: string) => {
    const theme = allThemes.find((item) => item.id === themeId);
    if (theme) {
      setCustomTheme(theme);
      toast.success(`Applied ${theme.name} theme`);
    }
  };

  const updateLayout = (layoutId: string) => {
    const layout = allLayouts.find((item) => item.id === layoutId);
    if (!layout) return;
    setSelectedLayout(layout);
    setSectionOrder(layout.sectionOrder.filter((item): item is SectionKey => item in sectionLabels));
    toast.success(`Applied ${layout.name} layout`);
  };

  const applyTemplate = (template: GeneratedTemplate) => {
    setSelectedTemplate(template);
    setCustomTheme(template.theme);
    setSelectedLayout(template.layout);
    setSectionVariants(template.sectionVariants);
    setPreviewTemplate(null);
    toast.success('Template applied successfully');
  };

  const exportCanvas = async () => {
    if (!exportRef.current) throw new Error('Preview is not ready yet.');
    
    toast.loading('Preparing export...', { id: 'export' });
    
    try {
      // Wait for fonts to load
      await document.fonts?.ready;
      
      // Give a moment for any pending renders
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const canvas = await html2canvas(exportRef.current, {
        useCORS: true,
        allowTaint: true,
        logging: false,
      });
      
      toast.dismiss('export');
      return canvas;
    } catch (error) {
      toast.dismiss('export');
      throw error;
    }
  };

  const downloadExport = async (type: ExportType) => {
    if (isExporting) return;
    
    setIsExporting(true);
    
    try {
      const canvas = await exportCanvas();
      
      if (type === 'pdf') {
        toast.loading('Generating PDF...', { id: 'pdf' });
        
        const pdf = new jsPDF({ 
          orientation: 'portrait', 
          unit: 'mm', 
          format: 'a4', 
          compress: true,
          hotfixes: ["px_scaling"]
        });
        
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const imageHeight = (canvas.height * pageWidth) / canvas.width;
        const image = canvas.toDataURL('image/png', 1.0);
        
        let remaining = imageHeight;
        let offset = 0;
        
        // First page
        pdf.addImage(image, 'PNG', 0, offset, pageWidth, imageHeight, undefined, 'FAST');
        remaining -= pageHeight;
        
        // Additional pages if needed
        while (remaining > 0) {
          offset -= pageHeight;
          pdf.addPage();
          pdf.addImage(image, 'PNG', 0, offset, pageWidth, imageHeight, undefined, 'FAST');
          remaining -= pageHeight;
        }
        
        pdf.save(fileName(cvData, 'pdf'));
        toast.success('PDF downloaded successfully!', { id: 'pdf' });
        
      } else {
        toast.loading(`Generating ${type.toUpperCase()}...`, { id: 'image' });
        
        const link = document.createElement('a');
        link.download = fileName(cvData, type);
        link.href = type === 'png' 
          ? canvas.toDataURL('image/png', 1.0) 
          : canvas.toDataURL('image/jpeg', 0.95);
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        toast.success(`${type.toUpperCase()} downloaded successfully!`, { id: 'image' });
      }
      
    } catch (error) {
      console.error('Export failed:', error);
      toast.error(`Export failed. Please try again or use a different format.`);
    } finally {
      setIsExporting(false);
    }
  };

  // Data update methods
  const updatePersonal = (key: keyof CVData['personal'], value: string) => setCvData((prev) => ({ ...prev, personal: { ...prev.personal, [key]: value } }));
  const updateExperience = (id: string, key: keyof ExperienceItem, value: string | number | boolean | string[]) => setCvData((prev) => ({ ...prev, experience: prev.experience.map((item) => (item.id === id ? { ...item, [key]: value } : item)) }));
  const updateEducation = (id: string, key: keyof EducationItem, value: string) => setCvData((prev) => ({ ...prev, education: prev.education.map((item) => (item.id === id ? { ...item, [key]: value } : item)) }));
  const updateSkill = (id: string, key: keyof SkillItem, value: string | number) => setCvData((prev) => ({ ...prev, skills: prev.skills.map((item) => (item.id === id ? { ...item, [key]: value } : item)) }));
  const updateProject = (id: string, key: keyof ProjectItem, value: string | string[]) => setCvData((prev) => ({ ...prev, projects: (prev.projects || []).map((item) => (item.id === id ? { ...item, [key]: value } : item)) }));
  const updateCertification = (id: string, key: keyof CertificationItem, value: string) => setCvData((prev) => ({ ...prev, certifications: (prev.certifications || []).map((item) => (item.id === id ? { ...item, [key]: value } : item)) }));
  const updateLanguage = (id: string, key: keyof LanguageItem, value: string) => setCvData((prev) => ({ ...prev, languages: (prev.languages || []).map((item) => (item.id === id ? { ...item, [key]: value } : item)) }));

  const loadDraft = () => {
    try {
      const saved = localStorage.getItem('geteasycv-draft');
      if (saved) {
        const draft = JSON.parse(saved);
        setCvData(draft.cvData || sampleCV);
        setCustomTheme(draft.customTheme || initialTemplate.theme);
        setSelectedLayout(draft.selectedLayout || initialTemplate.layout);
        setSectionVariants(draft.sectionVariants || initialTemplate.sectionVariants);
        setVisibility(draft.visibility || emptyVisibility);
        setSectionOrder(draft.sectionOrder || ['summary', 'experience', 'education', 'skills', 'projects', 'certifications', 'languages']);
        toast.success('Draft loaded successfully');
      }
    } catch (error) {
      console.error('Failed to load draft:', error);
      toast.error('Failed to load saved draft');
    }
  };

  const moveSection = (index: number, direction: -1 | 1) => {
    setSectionOrder((prev) => {
      const next = [...prev];
      const target = index + direction;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

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

  const goNext = () => {
    const index = builderSteps.findIndex((step) => step.id === activeStep);
    selectStep(builderSteps[Math.min(index + 1, builderSteps.length - 1)].id);
  };

  const goBack = () => {
    const index = builderSteps.findIndex((step) => step.id === activeStep);
    selectStep(builderSteps[Math.max(index - 1, 0)].id);
  };

  const renderEditor = () => {
    if (activeTab === 'layout') {
      return (
        <div className="space-y-5">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-950">Section arrangement</p>
            <p className="mt-1 text-sm text-slate-500">Drag sections into the order you prefer, or hide optional sections for a cleaner resume.</p>
          </div>
          <div className="space-y-2">
            {sectionOrder.map((key, index) => (
              <div
                key={key}
                draggable
                onDragStart={() => setDraggedSectionIndex(index)}
                onDragOver={(event) => event.preventDefault()}
                onDrop={() => dropSection(index)}
                onDragEnd={() => setDraggedSectionIndex(null)}
                className={`flex cursor-grab items-center justify-between rounded-xl border border-slate-200 bg-white p-3 active:cursor-grabbing ${draggedSectionIndex === index ? 'opacity-50 ring-2 ring-violet-200' : ''}`}
              >
                <span className="text-sm font-semibold text-slate-700">{index + 1}. {sectionLabels[key]}</span>
                <span className="flex items-center gap-2">
                  <button type="button" onClick={() => setVisibility((prev) => ({ ...prev, [key]: !prev[key] }))} className={`rounded-lg px-2 py-1 text-xs font-semibold ${visibility[key] ? 'bg-violet-600 text-white' : 'bg-slate-200 text-slate-600'}`}>{visibility[key] ? 'On' : 'Off'}</button>
                  <button type="button" onClick={() => moveSection(index, -1)} className="rounded-lg border border-slate-200 px-2 py-1 text-xs">Up</button>
                  <button type="button" onClick={() => moveSection(index, 1)} className="rounded-lg border border-slate-200 px-2 py-1 text-xs">Down</button>
                </span>
              </div>
            ))}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <SelectField label="Header style" value={sectionVariants.headerVariant} onChange={(value) => setSectionVariants((prev) => ({ ...prev, headerVariant: value as SectionVariant['headerVariant'] }))} options={['centered', 'split', 'banner', 'minimal'].map((value) => ({ value, label: value }))} />
            <SelectField label="Experience style" value={sectionVariants.experienceVariant} onChange={(value) => setSectionVariants((prev) => ({ ...prev, experienceVariant: value as SectionVariant['experienceVariant'] }))} options={['timeline', 'cards', 'bordered', 'compact'].map((value) => ({ value, label: value }))} />
            <SelectField label="Skills style" value={sectionVariants.skillsVariant} onChange={(value) => setSectionVariants((prev) => ({ ...prev, skillsVariant: value as SectionVariant['skillsVariant'] }))} options={['tags', 'progress-bars', 'circles', 'pills'].map((value) => ({ value, label: value }))} />
            <SelectField label="Projects style" value={sectionVariants.projectsVariant} onChange={(value) => setSectionVariants((prev) => ({ ...prev, projectsVariant: value as SectionVariant['projectsVariant'] }))} options={['cards', 'grid', 'portfolio'].map((value) => ({ value, label: value }))} />
          </div>
        </div>
      );
    }

    if (activeStep === 'personal') {
      return (
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="First name" value={cvData.personal.firstName} placeholder="Sarah" onChange={(value) => updatePersonal('firstName', value)} />
          <Field label="Last name" value={cvData.personal.lastName} placeholder="Johnson" onChange={(value) => updatePersonal('lastName', value)} />
          <Field label="Professional title" value={cvData.personal.title} placeholder="Senior Product Designer" onChange={(value) => updatePersonal('title', value)} />
          <Field label="Location" value={cvData.personal.location} placeholder="San Francisco, CA" onChange={(value) => updatePersonal('location', value)} />
          <Field label="Email" value={cvData.personal.email} placeholder="you@email.com" onChange={(value) => updatePersonal('email', value)} />
          <Field label="Phone" value={cvData.personal.phone} placeholder="+1 555 123 4567" onChange={(value) => updatePersonal('phone', value)} />
          <Field label="Website" value={cvData.personal.website} placeholder="portfolio.com" onChange={(value) => updatePersonal('website', value)} />
          <Field label="LinkedIn" value={cvData.personal.linkedin} placeholder="linkedin.com/in/you" onChange={(value) => updatePersonal('linkedin', value)} />
        </div>
      );
    }

    if (activeStep === 'summary') {
      return <TextField label="Professional summary" value={cvData.summary} rows={8} placeholder="Example: Product-minded developer with 5+ years building fast, accessible web apps..." onChange={(value) => setCvData((prev) => ({ ...prev, summary: value }))} />;
    }

    if (activeStep === 'experience') {
      return (
        <div className="space-y-4">
          <button type="button" onClick={() => setCvData((prev) => ({ ...prev, experience: [...prev.experience, { id: `exp-${Date.now()}`, company: 'Company', position: 'Role', startDate: '2025-01', endDate: 'Present', current: true, description: 'Describe your impact.', achievements: [], location: '' }] }))} className="w-full rounded-xl border border-dashed border-violet-300 bg-violet-50 px-4 py-3 text-sm font-semibold text-violet-800 hover:bg-violet-100">Add work experience</button>
          {cvData.experience.map((item) => (
            <ItemCard key={item.id} title={item.position} subtitle={item.company} onRemove={() => setCvData((prev) => ({ ...prev, experience: prev.experience.filter((entry) => entry.id !== item.id) }))}>
              <Field label="Position" value={item.position} onChange={(value) => updateExperience(item.id, 'position', value)} />
              <Field label="Company" value={item.company} onChange={(value) => updateExperience(item.id, 'company', value)} />
              <div className="grid grid-cols-2 gap-3"><Field label="Start" value={item.startDate} onChange={(value) => updateExperience(item.id, 'startDate', value)} /><Field label="End" value={item.endDate} onChange={(value) => updateExperience(item.id, 'endDate', value)} /></div>
              <TextField label="Role summary" value={item.description} rows={3} onChange={(value) => updateExperience(item.id, 'description', value)} />
              <TextField label="Achievements, one per line" value={item.achievements.join('\n')} rows={3} onChange={(value) => updateExperience(item.id, 'achievements', value.split('\n').filter(Boolean))} />
            </ItemCard>
          ))}
        </div>
      );
    }

    if (activeStep === 'education') {
      return (
        <div className="space-y-4">
          <button type="button" onClick={() => setCvData((prev) => ({ ...prev, education: [...prev.education, { id: `edu-${Date.now()}`, institution: 'Institution', degree: 'Degree', field: 'Field', startDate: '2022', endDate: '2026' }] }))} className="w-full rounded-xl border border-dashed border-violet-300 bg-violet-50 px-4 py-3 text-sm font-semibold text-violet-800 hover:bg-violet-100">Add education</button>
          {cvData.education.map((item) => (
            <ItemCard key={item.id} title={item.institution} subtitle={item.degree} onRemove={() => setCvData((prev) => ({ ...prev, education: prev.education.filter((entry) => entry.id !== item.id) }))}>
              <Field label="Institution" value={item.institution} onChange={(value) => updateEducation(item.id, 'institution', value)} />
              <Field label="Degree" value={item.degree} onChange={(value) => updateEducation(item.id, 'degree', value)} />
              <Field label="Field" value={item.field} onChange={(value) => updateEducation(item.id, 'field', value)} />
              <div className="grid grid-cols-2 gap-3"><Field label="Start" value={item.startDate} onChange={(value) => updateEducation(item.id, 'startDate', value)} /><Field label="End" value={item.endDate} onChange={(value) => updateEducation(item.id, 'endDate', value)} /></div>
            </ItemCard>
          ))}
        </div>
      );
    }

    if (activeStep === 'skills') {
      return (
        <div className="space-y-4">
          <button type="button" onClick={() => setCvData((prev) => ({ ...prev, skills: [...prev.skills, { id: `skill-${Date.now()}`, name: 'Skill', level: 80, category: 'technical' }] }))} className="w-full rounded-xl border border-dashed border-violet-300 bg-violet-50 px-4 py-3 text-sm font-semibold text-violet-800 hover:bg-violet-100">Add skill</button>
          {cvData.skills.map((item) => (
            <ItemCard key={item.id} title={item.name} subtitle={item.category} onRemove={() => setCvData((prev) => ({ ...prev, skills: prev.skills.filter((entry) => entry.id !== item.id) }))}>
              <Field label="Skill" value={item.name} onChange={(value) => updateSkill(item.id, 'name', value)} />
              <Field label="Level" type="number" value={String(item.level)} onChange={(value) => updateSkill(item.id, 'level', Number(value))} />
              <SelectField label="Category" value={item.category} onChange={(value) => updateSkill(item.id, 'category', value)} options={['technical', 'soft', 'language', 'tool'].map((value) => ({ value, label: value }))} />
            </ItemCard>
          ))}
        </div>
      );
    }

    if (activeStep === 'projects') {
      return (
        <div className="space-y-4">
          <button type="button" onClick={() => setCvData((prev) => ({ ...prev, projects: [...(prev.projects || []), { id: `project-${Date.now()}`, name: 'Project', description: 'Project outcome and scope.', technologies: ['Next.js'], link: '' }] }))} className="w-full rounded-xl border border-dashed border-violet-300 bg-violet-50 px-4 py-3 text-sm font-semibold text-violet-800 hover:bg-violet-100">Add project</button>
          {(cvData.projects || []).map((item) => (
            <ItemCard key={item.id} title={item.name} subtitle={item.technologies.join(', ')} onRemove={() => setCvData((prev) => ({ ...prev, projects: (prev.projects || []).filter((entry) => entry.id !== item.id) }))}>
              <Field label="Project name" value={item.name} onChange={(value) => updateProject(item.id, 'name', value)} />
              <TextField label="Description" value={item.description} rows={3} onChange={(value) => updateProject(item.id, 'description', value)} />
              <TextField label="Technologies, one per line" value={item.technologies.join('\n')} rows={3} onChange={(value) => updateProject(item.id, 'technologies', value.split('\n').filter(Boolean))} />
              <Field label="Link" value={item.link || ''} onChange={(value) => updateProject(item.id, 'link', value)} />
            </ItemCard>
          ))}
        </div>
      );
    }

    if (activeStep === 'certifications') {
      return (
        <div className="space-y-4">
          <button type="button" onClick={() => setCvData((prev) => ({ ...prev, certifications: [...(prev.certifications || []), { id: `cert-${Date.now()}`, name: 'Certification', issuer: 'Issuer', date: '2026', link: '' }] }))} className="w-full rounded-xl border border-dashed border-violet-300 bg-violet-50 px-4 py-3 text-sm font-semibold text-violet-800 hover:bg-violet-100">Add certification</button>
          {(cvData.certifications || []).map((item) => (
            <ItemCard key={item.id} title={item.name} subtitle={item.issuer} onRemove={() => setCvData((prev) => ({ ...prev, certifications: (prev.certifications || []).filter((entry) => entry.id !== item.id) }))}>
              <Field label="Name" value={item.name} onChange={(value) => updateCertification(item.id, 'name', value)} />
              <Field label="Issuer" value={item.issuer} onChange={(value) => updateCertification(item.id, 'issuer', value)} />
              <Field label="Date" value={item.date} onChange={(value) => updateCertification(item.id, 'date', value)} />
              <Field label="Link" value={item.link || ''} onChange={(value) => updateCertification(item.id, 'link', value)} />
            </ItemCard>
          ))}
        </div>
      );
    }

    if (activeStep === 'languages') {
      return (
        <div className="space-y-4">
          <button type="button" onClick={() => setCvData((prev) => ({ ...prev, languages: [...(prev.languages || []), { id: `lang-${Date.now()}`, name: 'Language', proficiency: 'professional' }] }))} className="w-full rounded-xl border border-dashed border-violet-300 bg-violet-50 px-4 py-3 text-sm font-semibold text-violet-800 hover:bg-violet-100">Add language</button>
          {(cvData.languages || []).map((item) => (
            <ItemCard key={item.id} title={item.name} subtitle={item.proficiency} onRemove={() => setCvData((prev) => ({ ...prev, languages: (prev.languages || []).filter((entry) => entry.id !== item.id) }))}>
              <Field label="Language" value={item.name} onChange={(value) => updateLanguage(item.id, 'name', value)} />
              <SelectField label="Proficiency" value={item.proficiency} onChange={(value) => updateLanguage(item.id, 'proficiency', value)} options={['native', 'fluent', 'professional', 'basic'].map((value) => ({ value, label: value }))} />
            </ItemCard>
          ))}
        </div>
      );
    }

    if (activeStep === 'design') {
      return (
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-950">Find a template for your role</p>
            <input value={templateSearch} onChange={(event) => setTemplateSearch(event.target.value)} placeholder="Search templates, layouts, styles..." className="mt-3 h-11 w-full max-w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100" />
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
              {jobCategories.map((category) => (
                <button key={category} type="button" onClick={() => setJobCategory(category)} className={`shrink-0 rounded-full px-3 py-2 text-xs font-semibold ${jobCategory === category ? 'bg-slate-950 text-white' : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-100'}`}>{category}</button>
              ))}
            </div>
          </div>

          <div className="grid gap-3.5 sm:grid-cols-2">
            {filteredTemplates.map((template) => (
              <div 
                key={template.id} 
                className={`group rounded-xl border bg-white p-3 shadow-sm hover:shadow-md transition duration-300 flex flex-col justify-between ${
                  selectedTemplate.id === template.id 
                    ? 'border-violet-500 ring-2 ring-violet-50' 
                    : 'border-slate-200/80'
                }`}
              >
                <div>
                  <button 
                    type="button" 
                    onClick={() => setPreviewTemplate(template)} 
                    className="h-52 w-full overflow-hidden rounded-lg bg-slate-50 relative flex items-start justify-center cursor-pointer border border-slate-100 hover:bg-slate-100/50 transition-colors"
                  >
                    <div 
                      className="absolute top-2 origin-top transition-transform duration-300 scale-[0.17] group-hover:scale-[0.19]"
                      style={{ width: 800 }}
                    >
                      <TemplateRenderer template={template} data={sampleCV} scale={1} />
                    </div>
                  </button>

                  <div className="mt-3">
                    <span className="inline-block rounded-full bg-violet-50 dark:bg-violet-950 px-2 py-0.5 text-[9px] font-bold text-violet-700 dark:text-violet-300 uppercase tracking-wider mb-2">
                      {template.layout.category || 'Professional'}
                    </span>
                    
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate text-xs font-bold text-slate-950">{template.layout.name}</p>
                        <p className="text-[10px] text-slate-500 font-medium mt-0.5">{template.theme.name}</p>
                      </div>
                      
                      <button 
                        type="button" 
                        onClick={() => setFavoriteTemplates((prev) => prev.includes(template.id) ? prev.filter((id) => id !== template.id) : [...prev, template.id])} 
                        className={`rounded-lg p-1.5 transition-colors cursor-pointer shrink-0 ${
                          favoriteTemplates.includes(template.id) 
                            ? 'bg-amber-50 text-amber-500 hover:bg-amber-100' 
                            : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
                        }`}
                        title={favoriteTemplates.includes(template.id) ? 'Remove bookmark' : 'Bookmark template'}
                      >
                        ★
                      </button>
                    </div>
                  </div>
                </div>

                <button 
                  type="button" 
                  onClick={() => applyTemplate(template)} 
                  className={`mt-3 w-full rounded-lg px-3 py-2 text-xs font-bold transition duration-200 cursor-pointer ${
                    selectedTemplate.id === template.id
                      ? 'bg-violet-600 text-white hover:bg-violet-700'
                      : 'bg-slate-900 text-white hover:bg-slate-800'
                  }`}
                >
                  {selectedTemplate.id === template.id ? 'Currently Active' : 'Use Template'}
                </button>
              </div>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <SelectField label="Theme preset" value={customTheme.id} onChange={updateTheme} options={allThemes.map((theme) => ({ value: theme.id, label: theme.name }))} />
            <SelectField label="Layout" value={selectedLayout.id} onChange={updateLayout} options={allLayouts.map((layout) => ({ value: layout.id, label: layout.name }))} />
            <SelectField label="Font" value={customTheme.fontFamily} onChange={(value) => setCustomTheme((prev) => ({ ...prev, fontFamily: value, fontFamilyHeading: value }))} options={fontFamilies.map((font) => ({ value: font.value, label: font.name }))} />
            <ColorField label="Primary color" value={customTheme.primary} onChange={(value) => setCustomTheme((prev) => ({ ...prev, primary: value, gradient: { ...prev.gradient, start: value } }))} />
            <ColorField label="Text color" value={customTheme.text} onChange={(value) => setCustomTheme((prev) => ({ ...prev, text: value }))} />
            <SelectField label="Spacing" value={customTheme.spacing} onChange={(value) => setCustomTheme((prev) => ({ ...prev, spacing: value as Theme['spacing'] }))} options={['compact', 'normal', 'relaxed'].map((value) => ({ value, label: value }))} />
            <SelectField label="Shadow" value={customTheme.shadowStyle} onChange={(value) => setCustomTheme((prev) => ({ ...prev, shadowStyle: value as Theme['shadowStyle'] }))} options={['none', 'soft', 'medium', 'hard', 'glass'].map((value) => ({ value, label: value }))} />
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-5">
        <div className="rounded-2xl border border-violet-200 bg-violet-50 p-4">
          <p className="text-sm font-semibold text-violet-950">Your resume is ready to export.</p>
          <p className="mt-1 text-sm text-violet-800">Use PDF for applications, PNG/JPG for portfolio previews, or Print for browser-native output.</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <button type="button" onClick={() => downloadExport('pdf')} disabled={isExporting} className="rounded-2xl bg-violet-600 px-4 py-4 text-sm font-semibold text-white shadow-lg shadow-violet-100 hover:bg-violet-700 disabled:opacity-50">Download PDF</button>
          <button type="button" onClick={() => downloadExport('png')} disabled={isExporting} className="rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm font-semibold hover:bg-slate-50 disabled:opacity-50">Download PNG</button>
          <button type="button" onClick={() => downloadExport('jpg')} disabled={isExporting} className="rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm font-semibold hover:bg-slate-50 disabled:opacity-50">Download JPG</button>
          <button type="button" onClick={() => window.print()} className="rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm font-semibold hover:bg-slate-50">Print</button>
        </div>
        <button type="button" onClick={saveDraft} className="w-full rounded-2xl border border-slate-200 bg-slate-950 px-4 py-4 text-sm font-semibold text-white hover:bg-slate-800">Save draft locally</button>
      </div>
    );
  };

  return (
    <div className="min-h-screen lg:h-screen lg:overflow-hidden flex flex-col bg-[#f4f7f8] text-slate-950">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur flex-shrink-0">
        <div className="mx-auto flex max-w-[1800px] flex-col gap-3 px-4 py-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href="/" className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-slate-950 to-violet-700 text-sm font-black text-white shadow-lg shadow-violet-100">
                CV
              </span>
              <span>
                <span className="block text-base font-bold tracking-tight text-slate-950">GetEasyCV</span>
                <span className="block text-xs font-medium text-slate-500">Focused resume studio</span>
              </span>
            </Link>
            <Link href="/templates" className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50">
              Back to Templates
            </Link>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {(['content', 'design', 'layout', 'settings'] as EditorTab[]).map((tab) => (
              <button key={tab} type="button" onClick={() => switchTab(tab)} className={`rounded-full px-4 py-2 text-sm font-semibold capitalize transition ${activeTab === tab ? 'bg-slate-950 text-white shadow-sm' : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50'}`}>{tab}</button>
            ))}
            <button type="button" onClick={saveDraft} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50">Save</button>
            {mounted && typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('template') && (
              <button 
                type="button" 
                onClick={saveTemplateDesign} 
                className="rounded-full border border-violet-200 bg-violet-50 text-violet-700 px-4 py-2 text-sm font-semibold hover:bg-violet-100 transition-all shadow-sm"
              >
                Save Template Design
              </button>
            )}
            <button type="button" onClick={() => downloadExport('pdf')} disabled={isExporting} className="rounded-full bg-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-violet-100 hover:bg-violet-700 disabled:opacity-50">
              {isExporting ? 'Exporting' : 'Export PDF'}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-[1800px] gap-3 px-3 pb-28 pt-3 lg:pb-3 lg:grid-cols-[280px_minmax(520px,1fr)_380px] lg:h-[calc(100vh-70px)] lg:overflow-hidden flex-1">
        <aside className="rounded-2xl border border-white/70 bg-white/80 p-3 shadow-md shadow-slate-200/50 backdrop-blur lg:h-full lg:overflow-y-auto">
          <div className="rounded-xl bg-gradient-to-br from-slate-950 to-violet-800 p-3 text-white">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/60">Resume progress</p>
            <div className="mt-2.5 flex items-end justify-between">
              <span className="text-xl font-bold">{progress}%</span>
              <span className="text-[10px] text-white/70">{mounted ? selectedLayout.name : 'Loading...'}</span>
            </div>
            <div className="mt-3.5 h-1.5 rounded-full bg-white/15">
              <div className="h-full rounded-full bg-white" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <nav className="mt-3.5 space-y-1.5">
            {builderSteps.map((step, index) => {
              const complete = completedStep(step.id, cvData);
              const active = activeStep === step.id;
              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => selectStep(step.id)}
                  className={`flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-left transition ${active ? 'bg-violet-50 ring-1 ring-violet-200' : 'hover:bg-slate-50'}`}
                >
                  <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold ${complete ? 'bg-violet-600 text-white' : active ? 'bg-slate-950 text-white' : 'bg-slate-100 text-slate-500'}`}>
                    {complete ? '✓' : index + 1}
                  </span>
                  <span className="min-w-0">
                    <span className={`block text-xs font-bold ${active ? 'text-violet-950' : 'text-slate-800'}`}>{step.title}</span>
                    <span className="block truncate text-[10px] text-slate-500">{step.helper}</span>
                  </span>
                </button>
              );
            })}
          </nav>
        </aside>

        <section className="min-w-0 overflow-hidden rounded-2xl border border-white/70 bg-white shadow-md shadow-slate-200/50 lg:h-full lg:flex lg:flex-col">
          <div className="flex flex-col gap-3 border-b border-slate-100 px-4 py-2.5 sm:flex-row sm:items-center sm:justify-between flex-shrink-0">
            <div>
              <h2 className="text-xs font-bold text-slate-950">Live Resume Preview</h2>
              <p className="text-[10px] text-slate-500">
                {mounted ? `${customTheme.name} theme, ${selectedLayout.name} layout` : 'Loading layout...'}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-slate-500">{Math.round(zoom * 100)}%</span>
              <input type="range" min={0.48} max={1} step={0.04} value={zoom} onChange={(event) => setZoom(Number(event.target.value))} className="w-36 accent-violet-600" />
            </div>
          </div>
          <div className="flex min-h-[calc(100vh-172px)] lg:min-h-0 lg:flex-1 justify-center overflow-auto bg-[radial-gradient(circle_at_top,#eefdf9,#dfe8ea_45%,#d5dee1)] p-4 sm:p-8">
            <div className="printable origin-top transition-transform" style={{ transform: `scale(${zoom})`, width: 920 }}>
              <div 
                className={`rounded-2xl bg-white p-4 shadow-[0_35px_100px_-40px_rgba(15,23,42,0.65)] relative ${
                  mounted && !isExporting ? 'h-[1332.8px] overflow-hidden' : 'min-h-[1300px]'
                }`}
              >
                <div 
                  ref={cvContentRef}
                  style={mounted && !isExporting ? { transform: `translateY(-${(activePage - 1) * 1300.8}px)`, transition: 'transform 0.3s ease-in-out' } : undefined}
                >
                  <TemplateRenderer template={customTemplate} data={visibleData} scale={1} />
                </div>
                
                {/* Visual A4 Page Break Guidelines (Ignored in exports) */}
                <div data-html2canvas-ignore="true" className="absolute left-0 right-0 border-t-2 border-dashed border-violet-400/50 z-30 pointer-events-none print-hidden" style={{ top: '1300.8px' }}>
                  <div className="absolute right-4 -top-3 bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300 text-[10px] font-black px-2 py-0.5 rounded-full shadow-sm uppercase tracking-wide">
                    Page 1 / Page 2 A4 Boundary
                  </div>
                </div>
                <div data-html2canvas-ignore="true" className="absolute left-0 right-0 border-t-2 border-dashed border-violet-400/50 z-30 pointer-events-none print-hidden" style={{ top: '2601.6px' }}>
                  <div className="absolute right-4 -top-3 bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300 text-[10px] font-black px-2 py-0.5 rounded-full shadow-sm uppercase tracking-wide">
                    Page 2 / Page 3 A4 Boundary
                  </div>
                </div>
                <div data-html2canvas-ignore="true" className="absolute left-0 right-0 border-t-2 border-dashed border-violet-400/50 z-30 pointer-events-none print-hidden" style={{ top: '3902.4px' }}>
                  <div className="absolute right-4 -top-3 bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300 text-[10px] font-black px-2 py-0.5 rounded-full shadow-sm uppercase tracking-wide">
                    Page 3 / Page 4 A4 Boundary
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Page Navigator Footer */}
          <div className="border-t border-slate-100 px-4 py-2 bg-slate-50 flex items-center justify-between flex-shrink-0 text-xs font-semibold select-none z-10" data-html2canvas-ignore="true">
            <span className="text-slate-500 font-bold">Total Pages: {totalPages}</span>
            
            <div className="flex items-center gap-1.5">
              <button 
                type="button" 
                disabled={activePage === 1}
                onClick={() => setActivePage(prev => Math.max(1, prev - 1))}
                className="h-7 px-2.5 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 transition-colors cursor-pointer font-bold"
              >
                Prev
              </button>
              
              <div className="flex gap-1">
                {Array.from({ length: totalPages }).map((_, idx) => (
                  <button 
                    key={idx}
                    type="button"
                    onClick={() => setActivePage(idx + 1)}
                    className={`w-7 h-7 rounded-lg font-bold transition-all cursor-pointer ${
                      activePage === idx + 1 
                        ? 'bg-violet-600 text-white shadow-sm shadow-violet-100' 
                        : 'border border-slate-200 bg-white hover:bg-slate-50 text-slate-600'
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>

              <button 
                type="button" 
                disabled={activePage === totalPages}
                onClick={() => setActivePage(prev => Math.min(totalPages, prev + 1))}
                className="h-7 px-2.5 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 transition-colors cursor-pointer font-bold"
              >
                Next
              </button>
            </div>
            
            <span className="text-slate-400 font-mono text-[10px]">A4 Format ({activePage}/{totalPages})</span>
          </div>
        </section>

        <aside className="rounded-2xl border border-white/70 bg-white/90 shadow-md shadow-slate-200/50 backdrop-blur lg:h-full lg:flex lg:flex-col lg:overflow-hidden">
          <div className="border-b border-slate-100 p-3.5 flex-shrink-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-violet-700">{activeTab === 'layout' ? 'Layout tools' : `Step ${builderSteps.findIndex((step) => step.id === activeStep) + 1} of ${builderSteps.length}`}</p>
            <h2 className="mt-1 text-base font-extrabold text-slate-950">{panelTitle}</h2>
            <p className="mt-1 text-xs text-slate-500">{panelHelper}</p>
          </div>
          <div className="space-y-4.5 p-3.5 lg:flex-1 lg:overflow-y-auto">{renderEditor()}</div>
          <div className="sticky bottom-0 lg:relative lg:bottom-auto flex items-center justify-between gap-3 border-t border-slate-100 bg-white/95 p-3 backdrop-blur flex-shrink-0">
            <button type="button" onClick={goBack} className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold hover:bg-slate-50">Back</button>
            <button type="button" onClick={goNext} className="rounded-xl bg-violet-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-violet-100 hover:bg-violet-700">Continue</button>
          </div>
        </aside>
      </main>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 p-2 backdrop-blur md:hidden">
        <div className="grid grid-cols-5 gap-1">
          {builderSteps.slice(0, 5).map((step) => (
            <button key={step.id} type="button" onClick={() => selectStep(step.id)} className={`rounded-xl px-2 py-2 text-[11px] font-semibold ${activeStep === step.id ? 'bg-slate-950 text-white' : 'text-slate-600'}`}>{step.title.split(' ')[0]}</button>
          ))}
        </div>
      </div>

      {previewTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur" onClick={() => setPreviewTemplate(null)}>
          <div className="max-h-[92vh] w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-slate-100 p-5">
              <div>
                <h2 className="text-lg font-semibold text-slate-950">{previewTemplate.name}</h2>
                <p className="text-sm text-slate-500">{previewTemplate.description}</p>
              </div>
              <button type="button" onClick={() => setPreviewTemplate(null)} className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold">Close</button>
            </div>
            <div className="max-h-[70vh] overflow-auto bg-slate-100 p-6">
              <div className="mx-auto w-[920px] scale-[0.75] origin-top">
                <TemplateRenderer template={previewTemplate} data={sampleCV} scale={1} />
              </div>
            </div>
            <div className="flex justify-end gap-3 border-t border-slate-100 p-5">
              <button type="button" onClick={() => applyTemplate(previewTemplate)} className="rounded-xl bg-violet-600 px-5 py-2 text-sm font-semibold text-white">Use this template</button>
            </div>
          </div>
        </div>
      )}

      <div className="pointer-events-none fixed -left-[10000px] top-0">
        <div ref={exportRef} className="bg-white p-0" style={{ width: 920 }}>
          <TemplateRenderer template={customTemplate} data={visibleData} scale={1} />
        </div>
      </div>
    </div>
  );
}
