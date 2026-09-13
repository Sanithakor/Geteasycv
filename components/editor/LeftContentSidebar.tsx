'use client';

import React, { useState, useRef } from 'react';
import {
  User,
  LineChart,
  Briefcase,
  GraduationCap,
  Link as LinkIcon,
  Folder,
  Award,
  Languages,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Trash2,
  Eye,
  EyeOff,
  Plus,
  GripVertical,
  CheckCircle2,
  Camera,
  Layers,
  Heart,
  Users,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  FileText,
} from 'lucide-react';
import { CVData, AwardItem, ExperienceItem, EducationItem, SkillItem, ProjectItem, CertificationItem, LanguageItem } from '@/data/sampleCV';
import VoiceAIFieldAssist from '@/components/editor/VoiceAIFieldAssist';
import AIFieldButton from '@/components/editor/AIFieldButton';
import toast from 'react-hot-toast';

export type SectionKey =
  | 'personal'
  | 'summary'
  | 'experience'
  | 'education'
  | 'skills'
  | 'projects'
  | 'certifications'
  | 'languages'
  | 'awards'
  | 'interests'
  | 'references';

interface LeftContentSidebarProps {
  cvData: CVData;
  setCvData: React.Dispatch<React.SetStateAction<CVData>>;
  pushHistory: (data: CVData) => void;
  sectionOrder: string[];
  setSectionOrder: React.Dispatch<React.SetStateAction<any>>;
  visibility: Record<string, boolean>;
  setVisibility: React.Dispatch<React.SetStateAction<any>>;
  expandedSection: string;
  setExpandedSection: (id: string) => void;
  activeAIField: string | null;
  setActiveAIField: (id: string | null) => void;
  aiAssist: any;
  aiCreditsInfo: { creditsRemaining: number | null; creditsLimit: number | null; isUnlimited: boolean };
  buildAIContext: () => string;
  onScrollToPreview?: (sectionId: string) => void;
}

const SECTION_CONFIG: Record<
  string,
  { title: string; helper: string; icon: React.ComponentType<{ className?: string }> }
> = {
  personal: { title: 'Personal Information', helper: 'Your name, title, contact details & photo', icon: User },
  summary: { title: 'Professional Summary', helper: 'Short elevator pitch for recruiters and ATS', icon: LineChart },
  experience: { title: 'Work Experience', helper: 'Employment history, responsibilities & achievements', icon: Briefcase },
  education: { title: 'Education', helper: 'Degrees, universities, honors & coursework', icon: GraduationCap },
  skills: { title: 'Skills & Proficiencies', helper: 'Core technical skills, tools & soft skills', icon: LinkIcon },
  projects: { title: 'Key Projects', helper: 'Portfolio highlights, code repositories & outcomes', icon: Folder },
  certifications: { title: 'Certifications', helper: 'Licenses, credentials & issuing organizations', icon: Award },
  languages: { title: 'Languages', helper: 'Spoken languages & proficiency levels', icon: Languages },
  awards: { title: 'Awards & Honors', helper: 'Recognitions, scholarships & accolades', icon: Award },
  interests: { title: 'Interests & Activities', helper: 'Hobbies, extracurriculars & passions', icon: Heart },
  references: { title: 'References', helper: 'Professional mentors & recommendations', icon: Users },
};

const Field = ({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  icon: Icon,
  required,
}: {
  label: string;
  value: string | undefined;
  onChange: (val: string) => void;
  type?: string;
  placeholder?: string;
  icon?: React.ComponentType<{ className?: string }>;
  required?: boolean;
}) => (
  <label className="grid gap-1.5 text-xs font-semibold text-slate-700">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1.5">
        {Icon && <Icon className="w-3.5 h-3.5 text-slate-400" />}
        <span>{label}</span>
        {required && <span className="text-rose-500">*</span>}
      </div>
    </div>
    <input
      type={type}
      value={value || ''}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-xs text-slate-900 shadow-2xs outline-none transition-all placeholder:text-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
    />
  </label>
);

const TextField = ({
  label,
  value,
  onChange,
  rows = 3,
  placeholder,
  helper,
}: {
  label: string;
  value: string | undefined;
  onChange: (val: string) => void;
  rows?: number;
  placeholder?: string;
  helper?: string;
}) => (
  <label className="grid gap-1.5 text-xs font-semibold text-slate-700">
    <div className="flex items-center justify-between">
      <span>{label}</span>
      {helper && <span className="text-[11px] font-normal text-slate-400">{helper}</span>}
    </div>
    <textarea
      rows={rows}
      value={value || ''}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="w-full resize-y rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 shadow-2xs outline-none transition-all placeholder:text-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 leading-relaxed"
    />
  </label>
);

const SelectField = ({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (val: string) => void;
}) => (
  <label className="grid gap-1.5 text-xs font-semibold text-slate-700">
    <span>{label}</span>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-xs text-slate-900 shadow-2xs outline-none transition-all focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 cursor-pointer"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </label>
);

const ItemCard = ({
  title,
  subtitle,
  onRemove,
  children,
  defaultExpanded = true,
}: {
  title: string;
  subtitle?: string;
  onRemove: () => void;
  children: React.ReactNode;
  defaultExpanded?: boolean;
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  return (
    <div className="rounded-xl border border-slate-200/90 bg-white shadow-2xs overflow-hidden transition-all duration-150">
      <div
        className="flex cursor-pointer items-center justify-between bg-white px-3.5 py-2.5 hover:bg-slate-50/80 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2.5 min-w-0 pr-2">
          <div className="min-w-0">
            <h4 className="text-xs font-bold text-slate-800 truncate">{title || '(Untitled Entry)'}</h4>
            {subtitle && <p className="text-[11px] text-slate-400 truncate mt-0.5">{subtitle}</p>}
          </div>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
            title="Delete entry"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
          <div className="p-1 text-slate-400">
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </div>
        </div>
      </div>
      {isExpanded && <div className="p-3.5 space-y-3.5 border-t border-slate-100 bg-slate-50/40">{children}</div>}
    </div>
  );
};

export default function LeftContentSidebar({
  cvData,
  setCvData,
  pushHistory,
  sectionOrder,
  setSectionOrder,
  visibility,
  setVisibility,
  expandedSection,
  setExpandedSection,
  activeAIField,
  setActiveAIField,
  aiAssist,
  aiCreditsInfo,
  buildAIContext,
  onScrollToPreview,
}: LeftContentSidebarProps) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    personal: true,
    summary: true,
    experience: false,
    education: false,
    skills: false,
    projects: false,
    certifications: false,
    languages: false,
  });

  const [showAddMenu, setShowAddMenu] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Available sections list
  const allPossibleSections: SectionKey[] = [
    'summary',
    'experience',
    'education',
    'skills',
    'projects',
    'certifications',
    'languages',
    'awards',
    'interests',
    'references',
  ];

  // Calculate section completion
  const checkCompletion = (secId: string): boolean => {
    switch (secId) {
      case 'personal':
        return Boolean(cvData.personal?.firstName && cvData.personal?.email);
      case 'summary':
        return Boolean(cvData.summary && cvData.summary.trim().length >= 20);
      case 'experience':
        return Boolean(cvData.experience && cvData.experience.length > 0);
      case 'education':
        return Boolean(cvData.education && cvData.education.length > 0);
      case 'skills':
        return Boolean(cvData.skills && cvData.skills.length >= 3);
      case 'projects':
        return Boolean(cvData.projects && cvData.projects.length > 0);
      case 'certifications':
        return Boolean(cvData.certifications && cvData.certifications.length > 0);
      case 'languages':
        return Boolean(cvData.languages && cvData.languages.length > 0);
      case 'awards':
        return Boolean(cvData.awards && cvData.awards.length > 0);
      case 'interests':
        return Boolean(cvData.interests && cvData.interests.length > 0);
      default:
        return false;
    }
  };

  const activeSectionsList = ['personal', ...sectionOrder];
  const completedCount = activeSectionsList.filter(checkCompletion).length;
  const completionPercent = Math.round((completedCount / activeSectionsList.length) * 100);

  const toggleSection = (id: string) => {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
    setExpandedSection(id);
    if (onScrollToPreview) {
      onScrollToPreview(id);
    }
  };

  const expandAll = () => {
    const next: Record<string, boolean> = { personal: true };
    sectionOrder.forEach((sec) => {
      next[sec] = true;
    });
    setOpenSections(next);
  };

  const collapseAll = () => {
    const next: Record<string, boolean> = { personal: false };
    sectionOrder.forEach((sec) => {
      next[sec] = false;
    });
    setOpenSections(next);
  };

  const moveSectionUp = (secId: string) => {
    setSectionOrder((prev: string[]) => {
      const idx = prev.indexOf(secId);
      if (idx <= 0) return prev;
      const next = [...prev];
      [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
      return next;
    });
  };

  const moveSectionDown = (secId: string) => {
    setSectionOrder((prev: string[]) => {
      const idx = prev.indexOf(secId);
      if (idx < 0 || idx >= prev.length - 1) return prev;
      const next = [...prev];
      [next[idx], next[idx + 1]] = [next[idx + 1], next[idx]];
      return next;
    });
  };

  const removeSection = (secId: string) => {
    setSectionOrder((prev: string[]) => prev.filter((s) => s !== secId));
    setVisibility((prev: any) => ({ ...prev, [secId]: false }));
    toast.success(`Removed ${SECTION_CONFIG[secId]?.title || secId} section`);
  };

  const addSection = (secId: SectionKey) => {
    if (!sectionOrder.includes(secId)) {
      setSectionOrder((prev: string[]) => [...prev, secId]);
    }
    setVisibility((prev: any) => ({ ...prev, [secId]: true }));
    setOpenSections((prev) => ({ ...prev, [secId]: true }));
    setExpandedSection(secId);
    setShowAddMenu(false);
    toast.success(`Added ${SECTION_CONFIG[secId]?.title || secId} section!`);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be less than 5MB');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        setCvData((prev) => ({
          ...prev,
          personal: { ...prev.personal, avatar: reader.result as string },
        }));
        toast.success('Profile photo uploaded!');
      }
    };
    reader.readAsDataURL(file);
  };

  const removePhoto = () => {
    setCvData((prev) => ({
      ...prev,
      personal: { ...prev.personal, avatar: '' },
    }));
    toast.success('Profile photo removed');
  };

  // Section field updater helpers
  const updatePersonal = (field: string, val: any) => {
    setCvData((prev) => ({
      ...prev,
      personal: { ...prev.personal, [field]: val },
    }));
  };

  const updateExperience = (id: string, field: string, val: any) => {
    setCvData((prev) => ({
      ...prev,
      experience: prev.experience.map((item) => (item.id === id ? { ...item, [field]: val } : item)),
    }));
  };

  const updateEducation = (id: string, field: string, val: any) => {
    setCvData((prev) => ({
      ...prev,
      education: prev.education.map((item) => (item.id === id ? { ...item, [field]: val } : item)),
    }));
  };

  const updateSkill = (id: string, field: string, val: any) => {
    setCvData((prev) => ({
      ...prev,
      skills: prev.skills.map((item) => (item.id === id ? { ...item, [field]: val } : item)),
    }));
  };

  const updateProject = (id: string, field: string, val: any) => {
    setCvData((prev) => ({
      ...prev,
      projects: (prev.projects || []).map((item) => (item.id === id ? { ...item, [field]: val } : item)),
    }));
  };

  const updateCertification = (id: string, field: string, val: any) => {
    setCvData((prev) => ({
      ...prev,
      certifications: (prev.certifications || []).map((item) =>
        item.id === id ? { ...item, [field]: val } : item
      ),
    }));
  };

  const updateLanguage = (id: string, field: string, val: any) => {
    setCvData((prev) => ({
      ...prev,
      languages: (prev.languages || []).map((item) => (item.id === id ? { ...item, [field]: val } : item)),
    }));
  };

  const updateAward = (id: string, field: string, val: any) => {
    setCvData((prev) => ({
      ...prev,
      awards: (prev.awards || []).map((item) => (item.id === id ? { ...item, [field]: val } : item)),
    }));
  };

  return (
    <div className="flex flex-col h-full bg-white select-text">
      {/* Top Header with Completion Counter */}
      <div className="px-4 py-3 border-b border-slate-200/90 bg-slate-50/70 shrink-0">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-violet-600/10 text-violet-600 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xs font-bold text-slate-900 tracking-tight">CV Content</h2>
              <p className="text-[11px] text-slate-500">Edit your sections & details</p>
            </div>
          </div>

          {/* Completion Progress Pill */}
          <div className="flex items-center gap-2 bg-white px-2.5 py-1 rounded-full border border-slate-200 text-xs font-semibold text-slate-700 shadow-2xs">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] text-slate-600 font-bold">
              {completedCount}/{activeSectionsList.length} Done ({completionPercent}%)
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden mb-2.5">
          <div
            className="h-full bg-gradient-to-r from-violet-600 to-indigo-500 transition-all duration-300"
            style={{ width: `${completionPercent}%` }}
          />
        </div>

        {/* Action Controls: Add Section & Expand/Collapse */}
        <div className="flex items-center justify-between gap-2 relative">
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowAddMenu(!showAddMenu)}
              className="px-3 py-1.5 bg-violet-600 hover:bg-violet-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Section</span>
              <ChevronDown className="w-3 h-3 ml-0.5" />
            </button>

            {/* Add Section Dropdown Menu */}
            {showAddMenu && (
              <>
                <div className="fixed inset-0 z-20" onClick={() => setShowAddMenu(false)} />
                <div className="absolute left-0 top-full mt-1.5 w-60 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-30 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                    Available Sections
                  </div>
                  <div className="max-h-64 overflow-y-auto py-1">
                    {allPossibleSections.map((sec) => {
                      const isAdded = sectionOrder.includes(sec);
                      const conf = SECTION_CONFIG[sec];
                      const Icon = conf?.icon || Layers;
                      return (
                        <button
                          key={sec}
                          type="button"
                          disabled={isAdded}
                          onClick={() => addSection(sec)}
                          className={`w-full px-3 py-2 text-left flex items-center justify-between text-xs transition-colors ${
                            isAdded
                              ? 'text-slate-400 bg-slate-50 cursor-not-allowed'
                              : 'text-slate-700 hover:bg-violet-50 hover:text-violet-700 cursor-pointer font-medium'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <Icon className="w-3.5 h-3.5" />
                            <span>{conf?.title || sec}</span>
                          </div>
                          {isAdded ? (
                            <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-0.5">
                              ✓ Added
                            </span>
                          ) : (
                            <Plus className="w-3.5 h-3.5 text-violet-500" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={expandAll}
              className="px-2 py-1 text-[11px] font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 rounded-md transition-colors"
              title="Expand all sections"
            >
              Expand All
            </button>
            <span className="text-slate-300">|</span>
            <button
              type="button"
              onClick={collapseAll}
              className="px-2 py-1 text-[11px] font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 rounded-md transition-colors"
              title="Collapse all sections"
            >
              Collapse All
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Quick-Jump Pills */}
      <div className="px-3 py-2 border-b border-slate-100 bg-white flex items-center gap-1.5 overflow-x-auto [scrollbar-width:none] shrink-0">
        {activeSectionsList.map((secId) => {
          const conf = SECTION_CONFIG[secId];
          const isDone = checkCompletion(secId);
          const isActive = expandedSection === secId;
          return (
            <button
              key={secId}
              type="button"
              onClick={() => toggleSection(secId)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold shrink-0 flex items-center gap-1 transition-all cursor-pointer ${
                isActive
                  ? 'bg-violet-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
              }`}
            >
              {isDone && <CheckCircle2 className={`w-3 h-3 ${isActive ? 'text-white' : 'text-emerald-500'}`} />}
              <span>{conf?.title.split(' ')[0] || secId}</span>
            </button>
          );
        })}
      </div>

      {/* Scrollable Section Accordion Cards */}
      <div className="flex-1 overflow-y-auto p-3.5 space-y-3 [scrollbar-gutter:stable]">
        {/* 1. PERSONAL INFORMATION (Permanent Root Section) */}
        <div
          id="editor-section-personal"
          className={`rounded-xl border transition-all duration-150 ${
            openSections.personal
              ? 'border-violet-300 ring-2 ring-violet-500/10 bg-white shadow-xs'
              : 'border-slate-200 bg-white hover:border-slate-300'
          }`}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between p-3 cursor-pointer select-none"
            onClick={() => toggleSection('personal')}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-violet-50 text-violet-600 flex items-center justify-center shrink-0">
                <User className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-xs font-bold text-slate-900">Personal Information</h3>
                  {checkCompletion('personal') && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
                </div>
                <p className="text-[11px] text-slate-400 truncate">Contact details, photo, and title</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                className="p-1 text-slate-400 hover:text-slate-600"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleSection('personal');
                }}
              >
                {openSections.personal ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Form Content */}
          {openSections.personal && (
            <div className="p-4 border-t border-slate-100 bg-slate-50/30 space-y-4">
              {/* Profile Photo Uploader */}
              <div className="flex items-center gap-4 p-3 bg-white rounded-xl border border-slate-200/80">
                <div className="relative w-14 h-14 rounded-full overflow-hidden bg-slate-100 border-2 border-white shadow-sm flex items-center justify-center shrink-0">
                  {cvData.personal?.avatar ? (
                    <img
                      src={cvData.personal.avatar}
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-7 h-7 text-slate-400" />
                  )}
                </div>

                <div className="flex-1 space-y-1">
                  <span className="text-xs font-bold text-slate-800 block">Profile Photo</span>
                  <div className="flex items-center gap-2">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-2.5 py-1 text-xs font-semibold bg-violet-50 text-violet-700 hover:bg-violet-100 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Camera className="w-3 h-3" />
                      <span>Upload</span>
                    </button>
                    {cvData.personal?.avatar && (
                      <button
                        type="button"
                        onClick={removePhoto}
                        className="px-2 py-1 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Name & Job Title */}
              <div className="grid grid-cols-2 gap-3">
                <Field
                  label="First Name"
                  required
                  value={cvData.personal?.firstName}
                  placeholder="Sarah"
                  onChange={(val) => updatePersonal('firstName', val)}
                />
                <Field
                  label="Last Name"
                  required
                  value={cvData.personal?.lastName}
                  placeholder="Johnson"
                  onChange={(val) => updatePersonal('lastName', val)}
                />
              </div>

              <div>
                <Field
                  label="Professional Title"
                  value={cvData.personal?.title}
                  placeholder="Senior Full Stack Engineer"
                  onChange={(val) => updatePersonal('title', val)}
                />
                <VoiceAIFieldAssist
                  fieldName="Job Title"
                  fieldValue={cvData.personal?.title || ''}
                  onAccept={(text) => {
                    pushHistory(cvData);
                    updatePersonal('title', text);
                  }}
                  sectionName="Personal Information"
                  jobTitle={cvData.personal?.title || 'Professional'}
                />
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-2 gap-3">
                <Field
                  label="Email"
                  type="email"
                  required
                  value={cvData.personal?.email}
                  placeholder="sarah@example.com"
                  onChange={(val) => updatePersonal('email', val)}
                />
                <Field
                  label="Phone"
                  type="tel"
                  value={cvData.personal?.phone}
                  placeholder="+1 (555) 123-4567"
                  onChange={(val) => updatePersonal('phone', val)}
                />
              </div>

              <Field
                label="Location"
                value={cvData.personal?.location}
                placeholder="San Francisco, CA"
                onChange={(val) => updatePersonal('location', val)}
              />

              <div className="grid grid-cols-2 gap-3">
                <Field
                  label="Website / Portfolio"
                  value={cvData.personal?.website}
                  placeholder="https://sarah.dev"
                  onChange={(val) => updatePersonal('website', val)}
                />
                <Field
                  label="LinkedIn"
                  value={cvData.personal?.linkedin}
                  placeholder="linkedin.com/in/sarah"
                  onChange={(val) => updatePersonal('linkedin', val)}
                />
              </div>
            </div>
          )}
        </div>

        {/* REORDERABLE SECTIONS */}
        {sectionOrder.map((secId) => {
          const conf = SECTION_CONFIG[secId] || { title: secId, helper: '', icon: Layers };
          const Icon = conf.icon;
          const isOpen = openSections[secId];
          const isVisible = visibility[secId] !== false;
          const isDone = checkCompletion(secId);

          return (
            <div
              key={secId}
              id={`editor-section-${secId}`}
              className={`rounded-xl border transition-all duration-150 ${
                isOpen
                  ? 'border-violet-300 ring-2 ring-violet-500/10 bg-white shadow-xs'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              {/* Section Accordion Header */}
              <div
                className="flex items-center justify-between p-3 cursor-pointer select-none"
                onClick={() => toggleSection(secId)}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-xs font-bold text-slate-900">{conf.title}</h3>
                      {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />}
                      {!isVisible && (
                        <span className="text-[10px] text-amber-600 bg-amber-50 px-1.5 py-0.2 rounded font-semibold">
                          Hidden
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 truncate">{conf.helper}</p>
                  </div>
                </div>

                {/* Section Reordering & Action Tools */}
                <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                  {/* Reorder Buttons */}
                  <div className="flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200/60">
                    <button
                      type="button"
                      onClick={() => moveSectionUp(secId)}
                      className="p-1 text-slate-500 hover:text-slate-900 hover:bg-white rounded transition-colors"
                      title="Move section up"
                    >
                      <ChevronUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveSectionDown(secId)}
                      className="p-1 text-slate-500 hover:text-slate-900 hover:bg-white rounded transition-colors"
                      title="Move section down"
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Visibility Toggle */}
                  <button
                    type="button"
                    onClick={() => {
                      setVisibility((prev: any) => ({ ...prev, [secId]: !isVisible }));
                      toast.success(isVisible ? `Hidden on CV` : `Visible on CV`);
                    }}
                    className={`p-1.5 rounded-lg transition-colors ${
                      isVisible ? 'text-slate-400 hover:text-slate-700' : 'text-amber-600 bg-amber-50'
                    }`}
                    title={isVisible ? 'Hide from CV' : 'Show on CV'}
                  >
                    {isVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  </button>

                  {/* Remove Section */}
                  <button
                    type="button"
                    onClick={() => removeSection(secId)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Remove section"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  {/* Expand / Collapse */}
                  <button
                    type="button"
                    onClick={() => toggleSection(secId)}
                    className="p-1.5 text-slate-400 hover:text-slate-700"
                  >
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Section Form Details */}
              {isOpen && (
                <div className="p-4 border-t border-slate-100 bg-slate-50/30 space-y-4">
                  {/* 2. SUMMARY */}
                  {secId === 'summary' && (
                    <div className="space-y-3">
                      <TextField
                        label="Professional Summary"
                        value={cvData.summary}
                        rows={5}
                        placeholder="Results-driven professional with proven expertise..."
                        onChange={(val) => setCvData((prev) => ({ ...prev, summary: val }))}
                        helper={`${(cvData.summary || '').length} characters`}
                      />

                      <VoiceAIFieldAssist
                        fieldName="Professional Summary"
                        fieldValue={cvData.summary || ''}
                        onAccept={(text) => {
                          pushHistory(cvData);
                          setCvData((prev) => ({ ...prev, summary: text }));
                        }}
                        sectionName="Professional Summary"
                        jobTitle={cvData.personal?.title || 'Professional'}
                      />

                      <AIFieldButton
                        fieldName="Professional Summary"
                        fieldValue={cvData.summary || ''}
                        onAccept={(text) => {
                          pushHistory(cvData);
                          setCvData((prev) => ({ ...prev, summary: text }));
                        }}
                        context={buildAIContext()}
                        assistHook={aiAssist}
                        isActive={activeAIField === 'summary'}
                        onActivate={() => setActiveAIField('summary')}
                        onDeactivate={() => setActiveAIField(null)}
                        creditsExhausted={
                          aiAssist.status === 'credits_exhausted' ||
                          (aiCreditsInfo.creditsRemaining === 0 && !aiCreditsInfo.isUnlimited)
                        }
                      />
                    </div>
                  )}

                  {/* 3. EXPERIENCE */}
                  {secId === 'experience' && (
                    <div className="space-y-3">
                      {(cvData.experience || []).map((exp, idx) => (
                        <ItemCard
                          key={exp.id || idx}
                          title={exp.position || 'Position'}
                          subtitle={`${exp.company || 'Company'} • ${exp.startDate || ''} - ${
                            exp.current ? 'Present' : exp.endDate || ''
                          }`}
                          onRemove={() => {
                            pushHistory(cvData);
                            setCvData((prev) => ({
                              ...prev,
                              experience: prev.experience.filter((e) => e.id !== exp.id),
                            }));
                          }}
                        >
                          <div className="grid grid-cols-2 gap-3">
                            <Field
                              label="Job Title"
                              value={exp.position}
                              placeholder="Senior Software Engineer"
                              onChange={(val) => updateExperience(exp.id, 'position', val)}
                            />
                            <Field
                              label="Company Name"
                              value={exp.company}
                              placeholder="TechCorp Inc."
                              onChange={(val) => updateExperience(exp.id, 'company', val)}
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <Field
                              label="Start Date"
                              value={exp.startDate}
                              placeholder="Mar 2021"
                              onChange={(val) => updateExperience(exp.id, 'startDate', val)}
                            />
                            <Field
                              label="End Date"
                              value={exp.endDate}
                              placeholder={exp.current ? 'Present' : 'Dec 2023'}
                              onChange={(val) => updateExperience(exp.id, 'endDate', val)}
                            />
                          </div>

                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              id={`curr-${exp.id}`}
                              checked={exp.current}
                              onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                              className="rounded border-slate-300 text-violet-600 focus:ring-violet-500"
                            />
                            <label htmlFor={`curr-${exp.id}`} className="text-xs font-medium text-slate-700">
                              I currently work here
                            </label>
                          </div>

                          <Field
                            label="Location"
                            value={exp.location}
                            placeholder="San Francisco, CA (or Remote)"
                            onChange={(val) => updateExperience(exp.id, 'location', val)}
                          />

                          {/* Role Summary */}
                          <div>
                            <TextField
                              label="Role Summary"
                              value={exp.description}
                              rows={2}
                              placeholder="Key responsibilities and scope of the role..."
                              onChange={(val) => updateExperience(exp.id, 'description', val)}
                            />
                            <VoiceAIFieldAssist
                              fieldName={`Role summary (${exp.company})`}
                              fieldValue={exp.description || ''}
                              onAccept={(text) => {
                                pushHistory(cvData);
                                updateExperience(exp.id, 'description', text);
                              }}
                              sectionName="Work Experience"
                              jobTitle={exp.position || cvData.personal?.title || 'Professional'}
                            />
                            <AIFieldButton
                              fieldName={`Role summary (${exp.company})`}
                              fieldValue={exp.description || ''}
                              onAccept={(text) => updateExperience(exp.id, 'description', text)}
                              context={`${exp.position} at ${exp.company}. ${buildAIContext()}`}
                              assistHook={aiAssist}
                              isActive={activeAIField === `exp-desc-${exp.id}`}
                              onActivate={() => setActiveAIField(`exp-desc-${exp.id}`)}
                              onDeactivate={() => setActiveAIField(null)}
                              creditsExhausted={
                                aiCreditsInfo.creditsRemaining === 0 && !aiCreditsInfo.isUnlimited
                              }
                            />
                          </div>

                          {/* Achievements / Bullet points */}
                          <div>
                            <TextField
                              label="Key Achievements & Metrics (one per line)"
                              value={(exp.achievements || []).join('\n')}
                              rows={3}
                              placeholder="• Increased application throughput by 45%&#10;• Led migration to modern stack"
                              onChange={(val) =>
                                updateExperience(
                                  exp.id,
                                  'achievements',
                                  val.split('\n').filter((l) => l.trim())
                                )
                              }
                            />
                            <VoiceAIFieldAssist
                              fieldName={`Achievements (${exp.company})`}
                              fieldValue={(exp.achievements || []).join('\n')}
                              onAccept={(text) => {
                                pushHistory(cvData);
                                updateExperience(
                                  exp.id,
                                  'achievements',
                                  text.split('\n').filter((l) => l.trim())
                                );
                              }}
                              sectionName="Work Achievements"
                              jobTitle={exp.position || cvData.personal?.title || 'Professional'}
                            />
                            <AIFieldButton
                              fieldName={`Achievements (${exp.company})`}
                              fieldValue={(exp.achievements || []).join('\n')}
                              onAccept={(text) =>
                                updateExperience(
                                  exp.id,
                                  'achievements',
                                  text.split('\n').filter((l) => l.trim())
                                )
                              }
                              context={`${exp.position} at ${exp.company}. ${buildAIContext()}`}
                              assistHook={aiAssist}
                              isActive={activeAIField === `exp-ach-${exp.id}`}
                              onActivate={() => setActiveAIField(`exp-ach-${exp.id}`)}
                              onDeactivate={() => setActiveAIField(null)}
                              creditsExhausted={
                                aiCreditsInfo.creditsRemaining === 0 && !aiCreditsInfo.isUnlimited
                              }
                            />
                          </div>
                        </ItemCard>
                      ))}

                      <button
                        type="button"
                        onClick={() => {
                          const newExp: ExperienceItem = {
                            id: `exp-${Date.now()}`,
                            company: 'New Company',
                            position: 'Position Title',
                            startDate: '2024',
                            endDate: 'Present',
                            current: true,
                            description: '',
                            achievements: [],
                            location: '',
                          };
                          pushHistory(cvData);
                          setCvData((prev) => ({
                            ...prev,
                            experience: [...(prev.experience || []), newExp],
                          }));
                        }}
                        className="w-full py-2.5 rounded-xl border border-dashed border-violet-300 bg-violet-50/50 hover:bg-violet-100/70 text-violet-700 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Another Experience</span>
                      </button>
                    </div>
                  )}

                  {/* 4. EDUCATION */}
                  {secId === 'education' && (
                    <div className="space-y-3">
                      {(cvData.education || []).map((edu, idx) => (
                        <ItemCard
                          key={edu.id || idx}
                          title={edu.institution || 'Institution'}
                          subtitle={`${edu.degree || 'Degree'} • ${edu.startDate || ''} - ${edu.endDate || ''}`}
                          onRemove={() => {
                            pushHistory(cvData);
                            setCvData((prev) => ({
                              ...prev,
                              education: prev.education.filter((e) => e.id !== edu.id),
                            }));
                          }}
                        >
                          <Field
                            label="University / Institution"
                            value={edu.institution}
                            placeholder="Stanford University"
                            onChange={(val) => updateEducation(edu.id, 'institution', val)}
                          />

                          <div className="grid grid-cols-2 gap-3">
                            <Field
                              label="Degree"
                              value={edu.degree}
                              placeholder="Bachelor of Science"
                              onChange={(val) => updateEducation(edu.id, 'degree', val)}
                            />
                            <Field
                              label="Field of Study"
                              value={edu.field}
                              placeholder="Computer Science"
                              onChange={(val) => updateEducation(edu.id, 'field', val)}
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <Field
                              label="Start Date"
                              value={edu.startDate}
                              placeholder="2018"
                              onChange={(val) => updateEducation(edu.id, 'startDate', val)}
                            />
                            <Field
                              label="End Date (or Expected)"
                              value={edu.endDate}
                              placeholder="2022"
                              onChange={(val) => updateEducation(edu.id, 'endDate', val)}
                            />
                          </div>

                          <Field
                            label="GPA (Optional)"
                            value={edu.gpa}
                            placeholder="3.9 / 4.0"
                            onChange={(val) => updateEducation(edu.id, 'gpa', val)}
                          />
                        </ItemCard>
                      ))}

                      <button
                        type="button"
                        onClick={() => {
                          const newEdu: EducationItem = {
                            id: `edu-${Date.now()}`,
                            institution: 'University Name',
                            degree: 'Degree / Certificate',
                            field: 'Field of Study',
                            startDate: '2020',
                            endDate: '2024',
                            gpa: '',
                          };
                          pushHistory(cvData);
                          setCvData((prev) => ({
                            ...prev,
                            education: [...(prev.education || []), newEdu],
                          }));
                        }}
                        className="w-full py-2.5 rounded-xl border border-dashed border-violet-300 bg-violet-50/50 hover:bg-violet-100/70 text-violet-700 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Another Education</span>
                      </button>
                    </div>
                  )}

                  {/* 5. SKILLS */}
                  {secId === 'skills' && (
                    <div className="space-y-3">
                      {(cvData.skills || []).map((skill, idx) => (
                        <div
                          key={skill.id || idx}
                          className="flex items-center gap-2 p-2 bg-white rounded-lg border border-slate-200"
                        >
                          <div className="flex-1">
                            <input
                              type="text"
                              value={skill.name}
                              placeholder="Skill name (e.g. React)"
                              onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                              className="w-full text-xs font-semibold text-slate-800 bg-transparent outline-none"
                            />
                          </div>

                          <div className="w-28">
                            <select
                              value={skill.category}
                              onChange={(e) => updateSkill(skill.id, 'category', e.target.value)}
                              className="w-full text-[11px] font-medium bg-slate-50 border border-slate-200 rounded px-1.5 py-1 text-slate-700 outline-none"
                            >
                              <option value="technical">Technical</option>
                              <option value="soft">Soft Skill</option>
                              <option value="tool">Tool</option>
                              <option value="language">Language</option>
                            </select>
                          </div>

                          <div className="flex items-center gap-1 w-20">
                            <input
                              type="number"
                              min="1"
                              max="100"
                              value={skill.level || 85}
                              onChange={(e) => updateSkill(skill.id, 'level', Number(e.target.value))}
                              className="w-12 text-[11px] text-center border border-slate-200 rounded py-0.5"
                            />
                            <span className="text-[10px] text-slate-400">%</span>
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              pushHistory(cvData);
                              setCvData((prev) => ({
                                ...prev,
                                skills: prev.skills.filter((s) => s.id !== skill.id),
                              }));
                            }}
                            className="p-1 text-slate-400 hover:text-rose-600 rounded"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}

                      <button
                        type="button"
                        onClick={() => {
                          const newSkill: SkillItem = {
                            id: `skill-${Date.now()}`,
                            name: 'New Skill',
                            level: 80,
                            category: 'technical',
                          };
                          pushHistory(cvData);
                          setCvData((prev) => ({
                            ...prev,
                            skills: [...(prev.skills || []), newSkill],
                          }));
                        }}
                        className="w-full py-2.5 rounded-xl border border-dashed border-violet-300 bg-violet-50/50 hover:bg-violet-100/70 text-violet-700 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Another Skill</span>
                      </button>
                    </div>
                  )}

                  {/* 6. PROJECTS */}
                  {secId === 'projects' && (
                    <div className="space-y-3">
                      {(cvData.projects || []).map((proj, idx) => (
                        <ItemCard
                          key={proj.id || idx}
                          title={proj.name || 'Project Name'}
                          subtitle={(proj.technologies || []).join(', ')}
                          onRemove={() => {
                            pushHistory(cvData);
                            setCvData((prev) => ({
                              ...prev,
                              projects: (prev.projects || []).filter((p) => p.id !== proj.id),
                            }));
                          }}
                        >
                          <Field
                            label="Project Title"
                            value={proj.name}
                            placeholder="E-Commerce Microservices Platform"
                            onChange={(val) => updateProject(proj.id, 'name', val)}
                          />

                          <div>
                            <TextField
                              label="Project Description"
                              value={proj.description}
                              rows={2}
                              placeholder="Engineered high-performance real-time application..."
                              onChange={(val) => updateProject(proj.id, 'description', val)}
                            />
                            <VoiceAIFieldAssist
                              fieldName={`Project description (${proj.name})`}
                              fieldValue={proj.description || ''}
                              onAccept={(text) => {
                                pushHistory(cvData);
                                updateProject(proj.id, 'description', text);
                              }}
                              sectionName="Projects"
                              jobTitle={cvData.personal?.title || 'Professional'}
                            />
                            <AIFieldButton
                              fieldName={`Project description (${proj.name})`}
                              fieldValue={proj.description || ''}
                              onAccept={(text) => updateProject(proj.id, 'description', text)}
                              context={`Project: ${proj.name}. Tech: ${(proj.technologies || []).join(
                                ', '
                              )}. ${buildAIContext()}`}
                              assistHook={aiAssist}
                              isActive={activeAIField === `proj-desc-${proj.id}`}
                              onActivate={() => setActiveAIField(`proj-desc-${proj.id}`)}
                              onDeactivate={() => setActiveAIField(null)}
                              creditsExhausted={
                                aiCreditsInfo.creditsRemaining === 0 && !aiCreditsInfo.isUnlimited
                              }
                            />
                          </div>

                          <Field
                            label="Technologies (comma separated)"
                            value={(proj.technologies || []).join(', ')}
                            placeholder="Next.js, TypeScript, PostgreSQL, Docker"
                            onChange={(val) =>
                              updateProject(
                                proj.id,
                                'technologies',
                                val.split(',').map((s) => s.trim()).filter(Boolean)
                              )
                            }
                          />

                          <Field
                            label="Project Link / GitHub"
                            value={proj.link}
                            placeholder="https://github.com/username/project"
                            onChange={(val) => updateProject(proj.id, 'link', val)}
                          />
                        </ItemCard>
                      ))}

                      <button
                        type="button"
                        onClick={() => {
                          const newProj: ProjectItem = {
                            id: `proj-${Date.now()}`,
                            name: 'Project Name',
                            description: 'Project outcome & technical overview.',
                            technologies: ['React', 'TypeScript'],
                            link: '',
                          };
                          pushHistory(cvData);
                          setCvData((prev) => ({
                            ...prev,
                            projects: [...(prev.projects || []), newProj],
                          }));
                        }}
                        className="w-full py-2.5 rounded-xl border border-dashed border-violet-300 bg-violet-50/50 hover:bg-violet-100/70 text-violet-700 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Another Project</span>
                      </button>
                    </div>
                  )}

                  {/* 7. CERTIFICATIONS */}
                  {secId === 'certifications' && (
                    <div className="space-y-3">
                      {(cvData.certifications || []).map((cert, idx) => (
                        <ItemCard
                          key={cert.id || idx}
                          title={cert.name || 'Certification'}
                          subtitle={`${cert.issuer || 'Issuer'} • ${cert.date || ''}`}
                          onRemove={() => {
                            pushHistory(cvData);
                            setCvData((prev) => ({
                              ...prev,
                              certifications: (prev.certifications || []).filter((c) => c.id !== cert.id),
                            }));
                          }}
                        >
                          <Field
                            label="Certification Name"
                            value={cert.name}
                            placeholder="AWS Certified Solutions Architect"
                            onChange={(val) => updateCertification(cert.id, 'name', val)}
                          />
                          <Field
                            label="Issuing Organization"
                            value={cert.issuer}
                            placeholder="Amazon Web Services"
                            onChange={(val) => updateCertification(cert.id, 'issuer', val)}
                          />
                          <div className="grid grid-cols-2 gap-3">
                            <Field
                              label="Date Obtained"
                              value={cert.date}
                              placeholder="Jan 2024"
                              onChange={(val) => updateCertification(cert.id, 'date', val)}
                            />
                            <Field
                              label="Credential ID / Link"
                              value={cert.link || cert.credentialId}
                              placeholder="AWS-12345"
                              onChange={(val) => updateCertification(cert.id, 'link', val)}
                            />
                          </div>
                        </ItemCard>
                      ))}

                      <button
                        type="button"
                        onClick={() => {
                          const newCert: CertificationItem = {
                            id: `cert-${Date.now()}`,
                            name: 'Certification Name',
                            issuer: 'Organization',
                            date: '2025',
                            link: '',
                          };
                          pushHistory(cvData);
                          setCvData((prev) => ({
                            ...prev,
                            certifications: [...(prev.certifications || []), newCert],
                          }));
                        }}
                        className="w-full py-2.5 rounded-xl border border-dashed border-violet-300 bg-violet-50/50 hover:bg-violet-100/70 text-violet-700 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Another Certification</span>
                      </button>
                    </div>
                  )}

                  {/* 8. LANGUAGES */}
                  {secId === 'languages' && (
                    <div className="space-y-3">
                      {(cvData.languages || []).map((lang, idx) => (
                        <div
                          key={lang.id || idx}
                          className="flex items-center gap-2 p-2.5 bg-white rounded-lg border border-slate-200"
                        >
                          <div className="flex-1">
                            <input
                              type="text"
                              value={lang.name}
                              placeholder="Language (e.g. English)"
                              onChange={(e) => updateLanguage(lang.id, 'name', e.target.value)}
                              className="w-full text-xs font-semibold text-slate-800 bg-transparent outline-none"
                            />
                          </div>

                          <div className="w-32">
                            <select
                              value={lang.proficiency}
                              onChange={(e) => updateLanguage(lang.id, 'proficiency', e.target.value)}
                              className="w-full text-xs bg-slate-50 border border-slate-200 rounded px-2 py-1 text-slate-700 outline-none"
                            >
                              <option value="native">Native</option>
                              <option value="fluent">Fluent</option>
                              <option value="professional">Professional</option>
                              <option value="basic">Basic</option>
                            </select>
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              pushHistory(cvData);
                              setCvData((prev) => ({
                                ...prev,
                                languages: (prev.languages || []).filter((l) => l.id !== lang.id),
                              }));
                            }}
                            className="p-1 text-slate-400 hover:text-rose-600 rounded"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}

                      <button
                        type="button"
                        onClick={() => {
                          const newLang: LanguageItem = {
                            id: `lang-${Date.now()}`,
                            name: 'Language Name',
                            proficiency: 'professional',
                          };
                          pushHistory(cvData);
                          setCvData((prev) => ({
                            ...prev,
                            languages: [...(prev.languages || []), newLang],
                          }));
                        }}
                        className="w-full py-2.5 rounded-xl border border-dashed border-violet-300 bg-violet-50/50 hover:bg-violet-100/70 text-violet-700 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Another Language</span>
                      </button>
                    </div>
                  )}

                  {/* 9. AWARDS & HONORS */}
                  {secId === 'awards' && (
                    <div className="space-y-3">
                      {(cvData.awards || []).map((awd, idx) => (
                        <ItemCard
                          key={awd.id || idx}
                          title={awd.title || 'Award Title'}
                          subtitle={`${awd.issuer || 'Issuer'} • ${awd.date || ''}`}
                          onRemove={() => {
                            pushHistory(cvData);
                            setCvData((prev) => ({
                              ...prev,
                              awards: (prev.awards || []).filter((a) => a.id !== awd.id),
                            }));
                          }}
                        >
                          <Field
                            label="Award / Honor Title"
                            value={awd.title}
                            placeholder="Employee of the Year"
                            onChange={(val) => updateAward(awd.id, 'title', val)}
                          />
                          <div className="grid grid-cols-2 gap-3">
                            <Field
                              label="Issuer / Organization"
                              value={awd.issuer}
                              placeholder="TechCorp"
                              onChange={(val) => updateAward(awd.id, 'issuer', val)}
                            />
                            <Field
                              label="Year / Date"
                              value={awd.date}
                              placeholder="2024"
                              onChange={(val) => updateAward(awd.id, 'date', val)}
                            />
                          </div>
                          <TextField
                            label="Brief Description"
                            value={awd.description}
                            rows={2}
                            placeholder="Recognized for outstanding leadership and performance..."
                            onChange={(val) => updateAward(awd.id, 'description', val)}
                          />
                        </ItemCard>
                      ))}

                      <button
                        type="button"
                        onClick={() => {
                          const newAwd: AwardItem = {
                            id: `award-${Date.now()}`,
                            title: 'Award Title',
                            issuer: 'Organization',
                            date: '2025',
                            description: '',
                          };
                          pushHistory(cvData);
                          setCvData((prev) => ({
                            ...prev,
                            awards: [...(prev.awards || []), newAwd],
                          }));
                        }}
                        className="w-full py-2.5 rounded-xl border border-dashed border-violet-300 bg-violet-50/50 hover:bg-violet-100/70 text-violet-700 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Another Award</span>
                      </button>
                    </div>
                  )}

                  {/* 10. INTERESTS & HOBBIES */}
                  {secId === 'interests' && (
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-1.5">
                        {(cvData.interests || []).map((tag, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200 text-slate-700 rounded-full text-xs font-medium"
                          >
                            <span>{tag}</span>
                            <button
                              type="button"
                              onClick={() => {
                                pushHistory(cvData);
                                setCvData((prev) => ({
                                  ...prev,
                                  interests: (prev.interests || []).filter((_, i) => i !== idx),
                                }));
                              }}
                              className="text-slate-400 hover:text-rose-600 rounded-full"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>

                      <div className="flex gap-2">
                        <input
                          type="text"
                          id="new-interest-input"
                          placeholder="e.g. Open Source, Photography, Hiking"
                          className="flex-1 h-9 rounded-lg border border-slate-200 px-3 text-xs outline-none focus:border-violet-500"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              const val = (e.target as HTMLInputElement).value.trim();
                              if (val) {
                                pushHistory(cvData);
                                setCvData((prev) => ({
                                  ...prev,
                                  interests: [...(prev.interests || []), val],
                                }));
                                (e.target as HTMLInputElement).value = '';
                              }
                            }
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const input = document.getElementById('new-interest-input') as HTMLInputElement;
                            if (input && input.value.trim()) {
                              pushHistory(cvData);
                              setCvData((prev) => ({
                                ...prev,
                                interests: [...(prev.interests || []), input.value.trim()],
                              }));
                              input.value = '';
                            }
                          }}
                          className="px-3 py-1 bg-violet-600 hover:bg-violet-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  )}

                  {/* 11. REFERENCES */}
                  {secId === 'references' && (
                    <div className="space-y-3">
                      <p className="text-xs text-slate-500 italic">
                        Available references will appear on your CV. Many job seekers use "Available upon request".
                      </p>
                      <TextField
                        label="References Note or Details"
                        value={(cvData as any).referencesNote || 'References available upon request.'}
                        rows={2}
                        onChange={(val) => {
                          setCvData((prev: any) => ({ ...prev, referencesNote: val }));
                        }}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
