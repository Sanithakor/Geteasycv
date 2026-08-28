"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { X, ArrowRight, Sparkles, Check, Download, ShieldCheck, Palette, FileText } from "lucide-react";
import { CoverLetterTemplate } from "@/data/coverLetterTemplates";
import CoverLetterRenderer from "./CoverLetterRenderer";

interface CoverLetterPreviewModalProps {
  template: CoverLetterTemplate | null;
  onClose: () => void;
}

export default function CoverLetterPreviewModal({
  template,
  onClose,
}: CoverLetterPreviewModalProps) {
  const router = useRouter();
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  if (!template) return null;

  const currentColor = selectedColor || template.accentColor;

  const handleUseTemplate = () => {
    const colorParam = selectedColor ? `&color=${encodeURIComponent(selectedColor)}` : "";
    router.push(`/cover-letter/editor?template=${template.id}${colorParam}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative flex flex-col lg:flex-row w-full max-w-5xl max-h-[90vh] bg-[#F8F8F6] rounded-2xl sm:rounded-3xl border border-[#0F0F0F]/10 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-slate-950 border border-slate-200 shadow-sm transition-all cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Left: Scrollable Letter Preview */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-[#EFEFED]/50 flex items-center justify-center min-h-[400px]">
          <div className="w-full max-w-[580px] bg-white rounded-xl shadow-lg border border-slate-200/80 overflow-hidden transition-all duration-300">
            <CoverLetterRenderer
              template={template}
              accentColor={currentColor}
              isCompact={false}
            />
          </div>
        </div>

        {/* Right: Template Details & Action Controls */}
        <div className="w-full lg:w-[360px] bg-white p-6 sm:p-8 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-200 overflow-y-auto">
          <div className="space-y-6">
            {/* Badges */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="rounded-full bg-[#FFF0EB] text-[#F3645C] border border-[#FFD4C2]/60 px-3 py-1 text-xs font-bold uppercase tracking-wider">
                {template.categoryLabel}
              </span>
              {template.isAtsFriendly && (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60 px-2.5 py-1 text-xs font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  ATS Compliant
                </span>
              )}
            </div>

            {/* Title & Description */}
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F0F0F] tracking-tight">
                {template.name}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {template.description}
              </p>
            </div>

            {/* Color Accent Picker */}
            <div className="space-y-2.5 pt-2 border-t border-slate-100">
              <label className="text-xs font-bold text-slate-900 flex items-center gap-1.5 uppercase tracking-wider">
                <Palette className="w-3.5 h-3.5 text-slate-500" />
                Color Theme
              </label>
              <div className="flex items-center gap-3">
                {template.colorOptions.map((color) => {
                  const isSelected = currentColor === color.hex;
                  return (
                    <button
                      key={color.hex}
                      onClick={() => setSelectedColor(color.hex)}
                      title={color.name}
                      className={`group relative h-8 w-8 rounded-full border-2 transition-transform duration-150 cursor-pointer ${
                        isSelected ? "border-[#0F0F0F] scale-110 shadow-sm" : "border-white hover:scale-105"
                      }`}
                      style={{ backgroundColor: color.hex }}
                    >
                      {isSelected && (
                        <Check className="mx-auto h-4 w-4 text-white drop-shadow-sm" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Template Features Checklist */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Includes
              </h4>
              <ul className="space-y-2 text-xs font-medium text-slate-600">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-[#F3645C] shrink-0 stroke-[2.5]" />
                  <span>Real formatted paragraphs with quantified impact</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-[#F3645C] shrink-0 stroke-[2.5]" />
                  <span>AI Writing Assistant & tone adjustment</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-[#F3645C] shrink-0 stroke-[2.5]" />
                  <span>Export to PDF, TXT, and DOCX</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-[#F3645C] shrink-0 stroke-[2.5]" />
                  <span>Passes Applicant Tracking Systems (ATS)</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Primary Action Button */}
          <div className="pt-6 mt-6 border-t border-slate-100 space-y-3">
            <button
              onClick={handleUseTemplate}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#0F0F0F] hover:bg-black px-5 py-3.5 text-sm font-bold text-white shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <span>Use This Template</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-center text-[11px] text-slate-400 font-medium">
              Free to edit & download • No credit card required
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
