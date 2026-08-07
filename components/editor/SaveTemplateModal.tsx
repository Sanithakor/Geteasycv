'use client';

/**
 * SaveTemplateModal — save current template customization as a personal template (FR5.1)
 */

import React, { useState } from 'react';
import { X, Save, Loader2 } from 'lucide-react';
import type { Theme } from '@/data/themes';
import type { Layout } from '@/data/layouts';
import type { SectionVariant } from '@/lib/generateTemplates';
import { useAuthStore } from '@/lib/store/authStore';
import toast from 'react-hot-toast';

interface SaveTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved: (templateId: string, templateName: string) => void;
  resumeId: string | null;
  customTheme: Theme;
  selectedLayout: Layout;
  sectionVariants: SectionVariant;
}

const CATEGORIES = ['Professional', 'Creative', 'Minimal', 'Modern', 'Traditional', 'Executive', 'Custom'];

const SaveTemplateModal: React.FC<SaveTemplateModalProps> = ({
  isOpen,
  onClose,
  onSaved,
  resumeId,
  customTheme,
  selectedLayout,
  sectionVariants,
}) => {
  const { token } = useAuthStore();
  const [name, setName] = useState('My Custom Template');
  const [category, setCategory] = useState('Custom');
  const [isATS, setIsATS] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  if (!isOpen) return null;

  const handleSave = async () => {
    if (!name.trim()) {
      toast.error('Please enter a template name');
      return;
    }

    setIsSaving(true);
    try {
      const endpoint = resumeId
        ? `/api/resumes/${resumeId}/save-template`
        : '/api/resumes/save-template';

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          name: name.trim(),
          category,
          layoutId: selectedLayout.id,
          themeData: customTheme,
          sectionVariants,
          isATS,
          isPremium: false,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Failed to save template');

      toast.success(`Template "${name}" saved successfully!`);
      onSaved(data.data.id, name);
      onClose();
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to save template';
      toast.error(msg);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="save-template-title"
    >
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 m-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 id="save-template-title" className="text-base font-bold text-slate-900">
              Save as Personal Template
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Reuse this design for future resumes
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <label className="block">
            <span className="text-[11px] font-bold text-slate-700 mb-1.5 block">
              Template Name <span className="text-rose-500">*</span>
            </span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. My Blue Sidebar CV"
              className="w-full h-10 rounded-lg border border-slate-200 px-3 text-sm text-slate-900 outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-400 transition-all"
              aria-required="true"
              maxLength={80}
            />
          </label>

          <label className="block">
            <span className="text-[11px] font-bold text-slate-700 mb-1.5 block">Category</span>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full h-10 rounded-lg border border-slate-200 px-3 text-sm text-slate-900 outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-400 transition-all bg-white"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </label>

          <label className="flex items-center gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={isATS}
              onChange={(e) => setIsATS(e.target.checked)}
              className="w-4 h-4 accent-violet-600 rounded"
            />
            <div>
              <span className="text-[11px] font-bold text-slate-700">Mark as ATS-Friendly</span>
              <p className="text-[9px] text-slate-400 mt-0.5">
                Single-column, no tables or complex graphics
              </p>
            </div>
          </label>

          {/* Template metadata preview */}
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-3 space-y-1">
            <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Preview Info</p>
            <div className="flex flex-wrap gap-2 mt-1">
              <span className="text-[10px] font-semibold bg-white border border-slate-200 px-2 py-0.5 rounded-full text-slate-600">
                {selectedLayout.name}
              </span>
              <span className="text-[10px] font-semibold bg-white border border-slate-200 px-2 py-0.5 rounded-full text-slate-600">
                {customTheme.name}
              </span>
              <span className="text-[10px] font-semibold bg-white border border-slate-200 px-2 py-0.5 rounded-full text-slate-600">
                {selectedLayout.spacing}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving || !name.trim()}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-violet-600 text-white text-sm font-bold hover:bg-violet-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            {isSaving ? (
              <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
            ) : (
              <Save className="w-4 h-4" aria-hidden="true" />
            )}
            {isSaving ? 'Saving…' : 'Save Template'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaveTemplateModal;
