'use client';

import React, { useMemo, useRef, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import toast, { Toaster } from 'react-hot-toast';
import { TemplateRenderer } from '@/components/cv';
import { CVData, sampleCV } from '@/data/sampleCV';
import { getAllLayouts, Layout } from '@/data/layouts';
import { getAllThemes, Theme } from '@/data/themes';
import { GeneratedTemplate, SectionVariant, generateTemplates } from '@/lib/generateTemplates';

type EditorTab = 'content' | 'design' | 'layout' | 'settings';
type ExportType = 'pdf' | 'png' | 'jpg';
type BuilderStep = 'personal' | 'summary' | 'experience' | 'education' | 'skills' | 'projects' | 'certifications' | 'languages';
type SectionKey = 'summary' | 'experience' | 'education' | 'skills' | 'projects' | 'certifications' | 'languages';

const builderSteps = [
  { id: 'personal' as BuilderStep, tab: 'content' as EditorTab, title: 'Personal Info', icon: '👤' },
  { id: 'summary' as BuilderStep, tab: 'content' as EditorTab, title: 'Summary', icon: '📝' },
  { id: 'experience' as BuilderStep, tab: 'content' as EditorTab, title: 'Experience', icon: '💼' },
  { id: 'education' as BuilderStep, tab: 'content' as EditorTab, title: 'Education', icon: '🎓' },
  { id: 'skills' as BuilderStep, tab: 'content' as EditorTab, title: 'Skills', icon: '⚡' },
  { id: 'projects' as BuilderStep, tab: 'content' as EditorTab, title: 'Projects', icon: '🚀' },
  { id: 'certifications' as BuilderStep, tab: 'content' as EditorTab, title: 'Certifications', icon: '🏆' },
  { id: 'languages' as BuilderStep, tab: 'content' as EditorTab, title: 'Languages', icon: '🌍' },
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
  { name: 'Inter', value: 'Inter, sans-serif' },
  { name: 'Poppins', value: 'Poppins, sans-serif' },
  { name: 'Playfair', value: '"Playfair Display", serif' },
  { name: 'DM Sans', value: '"DM Sans", sans-serif' },
];

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

// Form Components
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
      className="h-12 rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-950 shadow-sm outline-none transition-all focus:border-violet-500 focus:ring-2 focus:ring-violet-100 focus:shadow-lg hover:shadow-md"
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
  <label className="grid gap-2 text-sm font-medium text-slate-700">
    <div className="flex items-center gap-2">
      {icon && <span className="text-base">{icon}</span>}
      <span>{label}</span>
    </div>
    <textarea
      rows={rows}
      value={value}
      placeholder={placeholder}
      onChange={(event) => onChange(event.target.value)}
      className="resize-y rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 shadow-sm outline-none transition-all focus:border-violet-500 focus:ring-2 focus:ring-violet-100 focus:shadow-lg hover:shadow-md"
    />
  </label>
);