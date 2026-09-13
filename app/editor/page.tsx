'use client';

import React, { useMemo, useRef, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import safeHtml2Canvas from '@/lib/safeHtml2Canvas';
import toast, { Toaster } from 'react-hot-toast';
import { TemplateRenderer } from '@/components/cv';
import { CVData, sampleCV } from '@/data/sampleCV';
import { getAllLayouts, Layout } from '@/data/layouts';
import { getAllThemes, Theme } from '@/data/themes';
import { useAuthStore } from '@/lib/store/authStore';
import { GeneratedTemplate, SectionVariant, generateTemplates } from '@/lib/generateTemplates';
import { Mic, Sparkles, Edit3, Eye, SlidersHorizontal } from 'lucide-react';

// Modals
import SaveTemplateModal from '@/components/editor/SaveTemplateModal';
import ATSAnalyzerModal from '@/components/editor/ATSAnalyzerModal';
import ShareResumeModal from '@/components/editor/ShareResumeModal';
import AICoverLetterModal from '@/components/editor/AICoverLetterModal';
import AIImprovementModal from '@/components/editor/AIImprovementModal';
import DownloadLimitModal from '@/components/editor/DownloadLimitModal';
import ResumeImportModal from '@/components/modals/ResumeImportModal';
import VoiceAICommandCenter from '@/components/editor/VoiceAICommandCenter';

// Exporters
import { useAIAssist } from '@/lib/hooks/useAIAssist';
import { exportToNativeDocx } from '@/lib/export/docxExporter';
import { exportToVectorPDF } from '@/lib/export/vectorPdfExporter';

// 3-Part Redesigned Workspace Components
import EditorTopNavbar from '@/components/editor/EditorTopNavbar';
import LeftContentSidebar from '@/components/editor/LeftContentSidebar';
import CenterPreviewArea from '@/components/editor/CenterPreviewArea';
import RightDesignSidebar from '@/components/editor/RightDesignSidebar';

type ExportType = 'pdf' | 'docx' | 'txt' | 'png' | 'jpg';
type SectionKey = 'summary' | 'experience' | 'education' | 'skills' | 'projects' | 'certifications' | 'languages';

const emptyVisibility: Record<SectionKey, boolean> = {
  summary: true,
  experience: true,
  education: true,
  skills: true,
  projects: true,
  certifications: true,
  languages: true,
};

function prepareExportData(data: CVData, visibility: Record<string, boolean>): CVData {
  return {
    ...data,
    summary: visibility.summary !== false ? data.summary : '',
    experience: visibility.experience !== false ? data.experience : [],
    education: visibility.education !== false ? data.education : [],
    skills: visibility.skills !== false ? data.skills : [],
    projects: visibility.projects !== false ? data.projects : [],
    certifications: visibility.certifications !== false ? data.certifications : [],
    languages: visibility.languages !== false ? data.languages : [],
    awards: visibility.awards !== false ? data.awards : [],
    interests: visibility.interests !== false ? data.interests : [],
  };
}

const fileName = (data: CVData, ext: string) => {
  const name = `${data.personal.firstName || 'Resume'}_${data.personal.lastName || ''}`.trim().replace(/\s+/g, '_');
  return `${name || 'Resume'}_CV.${ext}`;
};

export default function EditorPage() {
  const router = useRouter();
  const templates = useMemo(() => generateTemplates(), []);
  const exportRef = useRef<HTMLDivElement | null>(null);
  const cvContentRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);

  const { user, token, isAuthenticated, _hydrated } = useAuthStore();
  const isAdmin = user?.role === 'admin';
  const userTier = isAdmin ? 'lifetime' : (user?.tier || (user as any)?.subscriptionTier || 'free').toLowerCase();

  const initialTemplate = useMemo(() => templates[0], [templates]);

  // Editor Core State
  const [selectedTemplate, setSelectedTemplate] = useState<GeneratedTemplate>(initialTemplate);
  const [cvData, setCvData] = useState<CVData>(sampleCV);
  const [resumeTitle, setResumeTitle] = useState<string>('My Professional Resume');
  const [history, setHistory] = useState<CVData[]>([sampleCV]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);

  // Customization State
  const [customTheme, setCustomTheme] = useState<Theme>(initialTemplate.theme);
  const [selectedLayout, setSelectedLayout] = useState<Layout>(initialTemplate.layout);
  const [sectionVariants, setSectionVariants] = useState<SectionVariant>(initialTemplate.sectionVariants);
  const [visibility, setVisibility] = useState<Record<string, boolean>>(emptyVisibility);
  const [sectionOrder, setSectionOrder] = useState<string[]>([
    'summary',
    'experience',
    'education',
    'skills',
    'projects',
    'certifications',
    'languages',
  ]);

  // Layout & Workspace Toggles
  const [showLeftSidebar, setShowLeftSidebar] = useState(true);
  const [showRightSidebar, setShowRightSidebar] = useState(true);
  const [expandedSection, setExpandedSection] = useState<string>('personal');
  const [mobileTab, setMobileTab] = useState<'content' | 'preview' | 'design'>('content');

  // Preview & Page Navigation
  const [scale, setScale] = useState(0.85);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [density, setDensity] = useState<'compact' | 'standard' | 'large'>('standard');

  // Persistence & Export State
  const [isExporting, setIsExporting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [resumeId, setResumeId] = useState<string | null>(null);

  // Modals & AI State
  const [activeAIField, setActiveAIField] = useState<string | null>(null);
  const [showSaveTemplateModal, setShowSaveTemplateModal] = useState(false);
  const [showATSModal, setShowATSModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showCoverLetterModal, setShowCoverLetterModal] = useState(false);
  const [showDownloadLimitModal, setShowDownloadLimitModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showVoiceAIModal, setShowVoiceAIModal] = useState(false);
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

  // History Management
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

  // Keyboard Shortcuts (Undo/Redo)
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

  // Voice Change Application
  const handleApplyVoiceChange = useCallback(
    (newCvData: CVData, explanation: string) => {
      pushHistory(cvData);
      setCvData(newCvData);
      toast(
        (t) => (
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
        ),
        { duration: 7000, icon: '🎙️' }
      );
    },
    [cvData, pushHistory, handleUndo]
  );

  // Authentication check
  useEffect(() => {
    if (mounted && _hydrated && !isAuthenticated) {
      router.replace('/?openAuth=login&callbackUrl=/editor');
    }
  }, [mounted, _hydrated, isAuthenticated, router]);

  // AI Hook Initialization
  const aiAssist = useAIAssist({
    templateId: selectedTemplate.id,
    templateCategory: selectedTemplate.category,
    jobTitle: cvData.personal?.title,
  });

  const buildAIContext = useCallback(() => {
    const parts: string[] = [];
    if (cvData.personal?.title) parts.push(`Target Position: ${cvData.personal.title}`);
    if (cvData.personal?.firstName || cvData.personal?.lastName) {
      parts.push(`Candidate: ${cvData.personal.firstName || ''} ${cvData.personal.lastName || ''}`.trim());
    }
    if (cvData.skills && cvData.skills.length > 0) {
      parts.push(`Skills: ${cvData.skills.map((s) => s.name).join(', ')}`);
    }
    return parts.join('. ');
  }, [cvData]);

  const aiCreditsInfo = useMemo(
    () => ({
      creditsRemaining: aiAssist.creditsRemaining,
      creditsLimit: aiAssist.creditsLimit,
      isUnlimited: aiAssist.isUnlimited,
    }),
    [aiAssist.creditsRemaining, aiAssist.creditsLimit, aiAssist.isUnlimited]
  );

  // Visible Data and Custom Template computation
  const visibleData = useMemo(() => prepareExportData(cvData, visibility), [cvData, visibility]);

  const customTemplate = useMemo<GeneratedTemplate>(
    () => ({
      ...selectedTemplate,
      theme: customTheme,
      layout: { ...selectedLayout, sectionOrder },
      sectionVariants,
    }),
    [customTheme, sectionOrder, sectionVariants, selectedLayout, selectedTemplate]
  );

  // Update total pages dynamically based on preview height
  useEffect(() => {
    if (cvContentRef.current) {
      const contentHeight = cvContentRef.current.scrollHeight;
      const computed = Math.max(1, Math.ceil(contentHeight / 1122));
      setTotalPages(computed);
    }
  }, [cvData, visibleData, customTemplate, selectedLayout]);

  // Save Draft (Local + Remote API)
  const saveDraft = useCallback(async () => {
    if (!mounted) return;
    setIsSaving(true);
    try {
      const draft = {
        cvData,
        customTheme,
        selectedLayout,
        sectionVariants,
        visibility,
        sectionOrder,
        templateId: selectedTemplate.id,
        savedAt: new Date().toISOString(),
      };
      localStorage.setItem('geteasycv-draft', JSON.stringify(draft));

      const title = resumeTitle || `${cvData.personal?.firstName || 'My'} Resume`;
      const payload = {
        title,
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
    } catch (err) {
      console.warn('Save draft locally:', err);
    } finally {
      setIsSaving(false);
    }
  }, [
    cvData,
    customTheme,
    selectedLayout,
    sectionVariants,
    visibility,
    sectionOrder,
    selectedTemplate,
    resumeTitle,
    resumeId,
    token,
    mounted,
  ]);

  // Initial Load from URL
  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      const templateId = searchParams.get('template');
      const paramResumeId = searchParams.get('id');

      if (templateId) {
        const match = templates.find((t) => t.id === templateId);
        if (match) {
          setSelectedTemplate(match);
          setCustomTheme(match.theme);
          setSelectedLayout(match.layout);
          setSectionVariants(match.sectionVariants);
          if (match.layout.sectionOrder) {
            setSectionOrder(match.layout.sectionOrder);
          }
        }
      }

      if (paramResumeId) {
        setResumeId(paramResumeId);
        fetch(`/api/resumes/${paramResumeId}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        })
          .then((res) => res.json())
          .then((resData) => {
            if (resData.success && resData.data) {
              const r = resData.data;
              if (r.title) setResumeTitle(r.title);
              if (r.cvData) setCvData(r.cvData);
              if (r.customTheme) setCustomTheme(r.customTheme);
              if (r.selectedLayout) setSelectedLayout(r.selectedLayout);
              if (r.sectionVariants) setSectionVariants(r.sectionVariants);
              if (r.sectionOrder) setSectionOrder(r.sectionOrder);
              if (r.templateId) {
                const match = templates.find((t) => t.id === r.templateId);
                if (match) setSelectedTemplate(match);
              }
            }
          })
          .catch((err) => console.error('Resume load error:', err));
      }
    }
  }, [templates, token]);

  // Auto-save debounced
  useEffect(() => {
    if (mounted) {
      const timer = setTimeout(() => saveDraft(), 4000);
      return () => clearTimeout(timer);
    }
  }, [cvData, customTheme, selectedLayout, sectionVariants, visibility, sectionOrder, mounted, saveDraft]);

  // Exporters
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
    lines.push(`${data.personal?.firstName || ''} ${data.personal?.lastName || ''}`.trim().toUpperCase());
    if (data.personal?.title) lines.push(data.personal.title);

    const contactInfo = [
      data.personal?.email,
      data.personal?.phone,
      data.personal?.location,
      data.personal?.website,
      data.personal?.linkedin,
    ]
      .filter(Boolean)
      .join(' | ');
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
        lines.push(
          `${edu.degree} in ${edu.field} - ${edu.institution} (${edu.startDate} - ${edu.endDate || 'Present'})`
        );
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
          firstName: data.personal?.firstName,
          lastName: data.personal?.lastName,
          email: data.personal?.email,
          phone: data.personal?.phone,
          location: data.personal?.location,
          jobTitle: data.personal?.title,
          website: data.personal?.website,
          linkedin: data.personal?.linkedin,
          github: (data.personal as any)?.github || '',
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
          location: (edu as any)?.location || '',
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

    if (!isAdmin) {
      try {
        const checkRes = await fetch('/api/users/download-count', { method: 'POST' });
        const checkData = await checkRes.json();

        if (!checkRes.ok || checkData.allowed === false) {
          setIsExporting(false);
          setDownloadLimitModalData({
            message:
              checkData.message ||
              checkData.error ||
              'You have used your 1 free CV download. Upgrade your account to unlock unlimited downloads in PDF, Word, and Image formats.',
            redirectUrl: checkData.redirectUrl || '/pricing?reason=download_limit',
          });
          setShowDownloadLimitModal(true);
          return;
        }
      } catch (checkErr) {
        console.warn('[DOWNLOAD_CHECK_WARN]', checkErr);
      }

      const isProOrLifetime = userTier === 'pro' || userTier === 'lifetime' || userTier === 'premium';
      if ((type === 'png' || type === 'jpg') && !isProOrLifetime) {
        setIsExporting(false);
        setDownloadLimitModalData({
          message:
            'High-resolution PNG and JPG image exports are included with Pro & Lifetime plans. Starter includes high-resolution PDF downloads.',
          redirectUrl: '/pricing?plan=pro',
        });
        setShowDownloadLimitModal(true);
        toast.error('PNG & JPG exports are available on Pro and Lifetime plans.');
        return;
      }
    } else {
      fetch('/api/users/download-count', { method: 'POST' }).catch(() => {});
    }

    const activeTmplId = customTemplate?.id || 'sidebar-left-modern-blue';
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
        toast.loading('Generating High-Resolution PDF...', { id: 'pdf' });
        const targetElem = cvContentRef.current || exportRef.current;
        let pdfSuccess = false;
        if (targetElem) {
          pdfSuccess = await exportToVectorPDF(targetElem, fileName(cvData, 'pdf'));
        }

        if (pdfSuccess) {
          toast.success('PDF downloaded successfully!', { id: 'pdf' });
          recordTemplateDownload();
        } else {
          toast.error('Failed to generate PDF. Please try again.', { id: 'pdf' });
        }
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

  const scrollToPreviewSection = (sectionId: string) => {
    const el = document.getElementById(`cv-section-${sectionId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-100 antialiased">
      {/* 1. TOP NAVBAR */}
      <EditorTopNavbar
        resumeTitle={resumeTitle}
        setResumeTitle={setResumeTitle}
        isSaving={isSaving}
        canUndo={historyIndex > 0}
        canRedo={historyIndex < history.length - 1}
        onUndo={handleUndo}
        onRedo={handleRedo}
        onOpenATS={() => setShowATSModal(true)}
        onOpenCoverLetter={() => setShowCoverLetterModal(true)}
        onOpenImport={() => setShowImportModal(true)}
        onOpenShare={() => setShowShareModal(true)}
        onOpenSaveTemplate={() => setShowSaveTemplateModal(true)}
        onOpenVoiceAI={() => setShowVoiceAIModal(true)}
        onExport={downloadExport}
        isExporting={isExporting}
        aiCreditsInfo={aiCreditsInfo}
        userTier={userTier}
        onUpgradeClick={() => router.push('/pricing')}
      />

      {/* 2. MAIN 3-PART WORKSPACE */}
      <main className="flex-1 overflow-hidden relative flex">
        {/* DESKTOP VIEW: 3-COLUMN WORKSPACE */}
        <div className="hidden md:flex w-full h-full overflow-hidden">
          {/* COLUMN 1: LEFT SIDEBAR — CV CONTENT EDITING */}
          <div
            className={`h-full border-r border-slate-200/90 transition-all duration-200 ease-in-out shrink-0 ${
              showLeftSidebar ? 'w-[380px] lg:w-[410px]' : 'w-0 overflow-hidden'
            }`}
          >
            <LeftContentSidebar
              cvData={cvData}
              setCvData={setCvData}
              pushHistory={pushHistory}
              sectionOrder={sectionOrder}
              setSectionOrder={setSectionOrder}
              visibility={visibility}
              setVisibility={setVisibility}
              expandedSection={expandedSection}
              setExpandedSection={setExpandedSection}
              activeAIField={activeAIField}
              setActiveAIField={setActiveAIField}
              aiAssist={aiAssist}
              aiCreditsInfo={aiCreditsInfo}
              buildAIContext={buildAIContext}
              onScrollToPreview={scrollToPreviewSection}
            />
          </div>

          {/* COLUMN 2: CENTER — LIVE CV PREVIEW */}
          <div className="flex-1 h-full min-w-0">
            <CenterPreviewArea
              customTemplate={customTemplate}
              visibleData={visibleData}
              scale={scale}
              setScale={setScale}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
              setTotalPages={setTotalPages}
              density={density}
              setDensity={setDensity}
              showLeftSidebar={showLeftSidebar}
              setShowLeftSidebar={setShowLeftSidebar}
              showRightSidebar={showRightSidebar}
              setShowRightSidebar={setShowRightSidebar}
              cvContentRef={cvContentRef}
            />
          </div>

          {/* COLUMN 3: RIGHT SIDEBAR — DESIGN & LAYOUT CUSTOMIZATION */}
          <div
            className={`h-full border-l border-slate-200/90 transition-all duration-200 ease-in-out shrink-0 ${
              showRightSidebar ? 'w-[340px] lg:w-[370px]' : 'w-0 overflow-hidden'
            }`}
          >
            <RightDesignSidebar
              templates={templates}
              selectedTemplate={selectedTemplate}
              setSelectedTemplate={setSelectedTemplate}
              customTheme={customTheme}
              setCustomTheme={setCustomTheme}
              selectedLayout={selectedLayout}
              setSelectedLayout={setSelectedLayout}
              sectionVariants={sectionVariants}
              setSectionVariants={setSectionVariants}
              sectionOrder={sectionOrder}
              setSectionOrder={setSectionOrder}
              density={density}
              setDensity={setDensity}
              userTier={userTier}
              isAdmin={isAdmin}
              onShowUpgradeModal={({ message, redirectUrl }) => {
                setDownloadLimitModalData({ message, redirectUrl });
                setShowDownloadLimitModal(true);
              }}
            />
          </div>
        </div>

        {/* MOBILE VIEW (< 768px): TABBED WORKSPACE */}
        <div className="md:hidden flex flex-col w-full h-full overflow-hidden">
          <div className="flex-1 overflow-hidden">
            {mobileTab === 'content' && (
              <LeftContentSidebar
                cvData={cvData}
                setCvData={setCvData}
                pushHistory={pushHistory}
                sectionOrder={sectionOrder}
                setSectionOrder={setSectionOrder}
                visibility={visibility}
                setVisibility={setVisibility}
                expandedSection={expandedSection}
                setExpandedSection={setExpandedSection}
                activeAIField={activeAIField}
                setActiveAIField={setActiveAIField}
                aiAssist={aiAssist}
                aiCreditsInfo={aiCreditsInfo}
                buildAIContext={buildAIContext}
                onScrollToPreview={scrollToPreviewSection}
              />
            )}

            {mobileTab === 'preview' && (
              <CenterPreviewArea
                customTemplate={customTemplate}
                visibleData={visibleData}
                scale={scale}
                setScale={setScale}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
                setTotalPages={setTotalPages}
                density={density}
                setDensity={setDensity}
                showLeftSidebar={false}
                setShowLeftSidebar={() => {}}
                showRightSidebar={false}
                setShowRightSidebar={() => {}}
                cvContentRef={cvContentRef}
              />
            )}

            {mobileTab === 'design' && (
              <RightDesignSidebar
                templates={templates}
                selectedTemplate={selectedTemplate}
                setSelectedTemplate={setSelectedTemplate}
                customTheme={customTheme}
                setCustomTheme={setCustomTheme}
                selectedLayout={selectedLayout}
                setSelectedLayout={setSelectedLayout}
                sectionVariants={sectionVariants}
                setSectionVariants={setSectionVariants}
                sectionOrder={sectionOrder}
                setSectionOrder={setSectionOrder}
                density={density}
                setDensity={setDensity}
                userTier={userTier}
                isAdmin={isAdmin}
                onShowUpgradeModal={({ message, redirectUrl }) => {
                  setDownloadLimitModalData({ message, redirectUrl });
                  setShowDownloadLimitModal(true);
                }}
              />
            )}
          </div>

          {/* Fixed Mobile Bottom Navigation */}
          <nav className="h-14 border-t border-slate-200 bg-white/95 backdrop-blur flex items-center justify-around shrink-0 px-2 shadow-lg">
            <button
              type="button"
              onClick={() => setMobileTab('content')}
              className={`flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-lg transition-colors cursor-pointer ${
                mobileTab === 'content' ? 'text-violet-600 font-bold bg-violet-50' : 'text-slate-500 font-medium'
              }`}
            >
              <Edit3 className="w-4 h-4" />
              <span className="text-[10px]">Content</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileTab('preview')}
              className={`flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-lg transition-colors cursor-pointer ${
                mobileTab === 'preview' ? 'text-violet-600 font-bold bg-violet-50' : 'text-slate-500 font-medium'
              }`}
            >
              <Eye className="w-4 h-4" />
              <span className="text-[10px]">Preview</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileTab('design')}
              className={`flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-lg transition-colors cursor-pointer ${
                mobileTab === 'design' ? 'text-violet-600 font-bold bg-violet-50' : 'text-slate-500 font-medium'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="text-[10px]">Design</span>
            </button>
          </nav>
        </div>
      </main>

      <Toaster position="bottom-right" />

      {/* 3. MODALS */}
      {/* Save Template Modal */}
      <SaveTemplateModal
        isOpen={showSaveTemplateModal}
        onClose={() => setShowSaveTemplateModal(false)}
        onSaved={(_, templateName) => {
          toast.success(`Template "${templateName}" saved to your library!`);
        }}
        resumeId={resumeId}
        customTheme={customTheme}
        selectedLayout={selectedLayout}
        sectionVariants={sectionVariants}
      />

      {/* ATS Analyzer Score Modal */}
      <ATSAnalyzerModal
        isOpen={showATSModal}
        onClose={() => setShowATSModal(false)}
        cvData={cvData}
        onTriggerAIFix={() => {
          setExpandedSection('summary');
          toast.success('Navigated to summary section for AI enhancement');
        }}
      />

      {/* Share Resume Link Modal */}
      <ShareResumeModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        resumeId={resumeId}
        candidateName={`${cvData.personal?.firstName || ''} ${cvData.personal?.lastName || ''}`.trim()}
      />

      {/* AI Cover Letter Generator Modal */}
      <AICoverLetterModal
        isOpen={showCoverLetterModal}
        onClose={() => setShowCoverLetterModal(false)}
        defaultJobTitle={cvData.personal?.title || ''}
        candidateName={`${cvData.personal?.firstName || ''} ${cvData.personal?.lastName || ''}`.trim() || 'Job Seeker'}
        skills={cvData.skills?.map((s) => s.name) || []}
      />

      {/* AI Resume Improvement Modal */}
      <AIImprovementModal
        isOpen={aiImproveModal.isOpen}
        onClose={() => setAiImproveModal((prev) => ({ ...prev, isOpen: false }))}
        initialText={aiImproveModal.initialText}
        fieldName={aiImproveModal.fieldName}
        jobTitle={cvData.personal?.title || ''}
        onAccept={(newText) => {
          aiImproveModal.onAccept(newText);
          setAiImproveModal((prev) => ({ ...prev, isOpen: false }));
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

      {/* Voice & AI Command Center */}
      <VoiceAICommandCenter
        isOpen={showVoiceAIModal}
        onClose={() => setShowVoiceAIModal(false)}
        cvData={cvData}
        activeSection={expandedSection}
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

      {/* Hidden Container for Vector PDF Export */}
      <div className="pointer-events-none fixed -left-[10000px] top-0">
        <div ref={exportRef} className="bg-white p-0" style={{ width: 920 }}>
          <TemplateRenderer template={customTemplate} data={visibleData} scale={1} />
        </div>
      </div>
    </div>
  );
}
