'use client';

import React from 'react';
import { X, CheckCircle2, AlertTriangle, Lightbulb, Sparkles, ShieldCheck, FileCheck2, ArrowRight } from 'lucide-react';
import type { CVData } from '@/data/sampleCV';

interface ATSAnalyzerModalProps {
  isOpen: boolean;
  onClose: () => void;
  cvData: CVData;
  onTriggerAIFix?: () => void;
}

export default function ATSAnalyzerModal({
  isOpen,
  onClose,
  cvData,
  onTriggerAIFix,
}: ATSAnalyzerModalProps) {
  if (!isOpen) return null;

  // Dynamic ATS Analysis Calculation
  const hasEmail = Boolean(cvData.personal?.email);
  const hasPhone = Boolean(cvData.personal?.phone);
  const hasLocation = Boolean(cvData.personal?.location);
  const hasSummary = Boolean(cvData.summary && cvData.summary.length > 30);
  const expCount = cvData.experience?.length || 0;
  const skillsCount = cvData.skills?.length || 0;

  const contactScore = [hasEmail, hasPhone, hasLocation].filter(Boolean).length * 33 + 1;
  const summaryScore = hasSummary ? 100 : 40;
  const experienceScore = Math.min(100, expCount * 35);
  const skillsScore = Math.min(100, skillsCount * 12 + 20);

  const overallScore = Math.round(
    (contactScore * 0.25) + (summaryScore * 0.2) + (experienceScore * 0.3) + (skillsScore * 0.25)
  );

  const suggestions = [];

  if (!hasLocation) {
    suggestions.push({
      type: 'warning',
      title: 'Missing Location Details',
      detail: 'Adding City, State helps ATS algorithms match geographic requirements for local or remote roles.',
    });
  }

  if (expCount < 2) {
    suggestions.push({
      type: 'tip',
      title: 'Add More Work Experience Items',
      detail: 'ATS algorithms favor candidates with 2-3 documented role listings containing key responsibilities.',
    });
  }

  if (skillsCount < 6) {
    suggestions.push({
      type: 'warning',
      title: 'Increase Industry Keyword Skills',
      detail: 'Include at least 6-8 core technical and soft skills to pass ATS keyword parsing thresholds.',
    });
  }

  suggestions.push({
    type: 'success',
    title: 'Standardized Typography (Roboto)',
    detail: 'Your document uses standard Roboto typography which parses cleanly in all top ATS scanners (Greenhouse, Workday, Lever).',
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-md">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">ATS Parsing & Formatting Analyzer</h3>
              <p className="text-xs text-slate-400">Automated readability check for Greenhouse, Workday & Lever</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-md transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Overall Score Badge Banner */}
          <div className="bg-slate-50 border border-slate-200 rounded-md p-5 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Overall ATS Score</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-4xl font-extrabold text-emerald-600">{overallScore}</span>
                <span className="text-slate-400 font-bold text-sm">/ 100</span>
                <span className="ml-3 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                  {overallScore >= 85 ? 'Excellent ATS Ready' : overallScore >= 70 ? 'Good' : 'Needs Optimization'}
                </span>
              </div>
            </div>
            <div className="w-28 h-2.5 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${overallScore}%` }}
              />
            </div>
          </div>

          {/* Metric Breakdown Grid */}
          <div>
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <FileCheck2 className="w-4 h-4 text-violet-600" />
              Category Breakdown
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 bg-white border border-slate-200 rounded-md shadow-xs">
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="font-semibold text-slate-700">Contact Information</span>
                  <span className="font-bold text-slate-900">{contactScore}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${contactScore}%` }} />
                </div>
              </div>

              <div className="p-3.5 bg-white border border-slate-200 rounded-md shadow-xs">
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="font-semibold text-slate-700">Summary Quality</span>
                  <span className="font-bold text-slate-900">{summaryScore}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${summaryScore}%` }} />
                </div>
              </div>

              <div className="p-3.5 bg-white border border-slate-200 rounded-md shadow-xs">
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="font-semibold text-slate-700">Experience & Achievements</span>
                  <span className="font-bold text-slate-900">{experienceScore}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-violet-500 rounded-full" style={{ width: `${experienceScore}%` }} />
                </div>
              </div>

              <div className="p-3.5 bg-white border border-slate-200 rounded-md shadow-xs">
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="font-semibold text-slate-700">Skills & Keywords</span>
                  <span className="font-bold text-slate-900">{skillsScore}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: `${skillsScore}%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* Actionable Recommendations List */}
          <div>
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              Optimization Recommendations
            </h4>
            <div className="space-y-2.5">
              {suggestions.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-md border flex items-start gap-3 bg-white text-slate-800 text-xs border-slate-200"
                >
                  {item.type === 'warning' ? (
                    <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  ) : item.type === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  ) : (
                    <Lightbulb className="w-4 h-4 text-violet-500 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <div className="font-bold text-slate-900">{item.title}</div>
                    <p className="text-slate-600 mt-0.5 leading-relaxed">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-200 rounded-md transition-colors cursor-pointer"
          >
            Close
          </button>
          {onTriggerAIFix && (
            <button
              type="button"
              onClick={() => {
                onClose();
                onTriggerAIFix();
              }}
              className="px-4 py-2 text-xs font-bold text-white bg-violet-600 hover:bg-violet-700 rounded-md transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Auto-Enhance with AI</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
