'use client';

/**
 * AIFieldButton — per-field AI assist trigger + inline suggestion review (FR3)
 *
 * Usage:
 *   <AIFieldButton
 *     fieldName="summary"
 *     fieldValue={cvData.summary}
 *     onAccept={(text) => setCvData(prev => ({ ...prev, summary: text }))}
 *     assistHook={aiAssist}
 *   />
 */

import React, { useState, useCallback } from 'react';
import { Sparkles, Check, X, Loader2, ChevronDown, ChevronUp, Zap } from 'lucide-react';
import type { UseAIAssistOptions } from '@/lib/hooks/useAIAssist';

interface AIFieldButtonProps {
  fieldName: string;
  fieldValue: string;
  onAccept: (value: string) => void;
  /** Context string (e.g. job title, template category) passed to AI */
  context?: string;
  /** Forwarded from useAIAssist — shared across all fields in one editor instance */
  assistHook: {
    status: string;
    result: { original: string; suggestion: string; fieldName: string } | null;
    error: string | null;
    creditsRemaining: number | null;
    isUnlimited: boolean;
    isLoading: boolean;
    hasResult: boolean;
    requestSuggestion: (
      fieldName: string,
      fieldValue: string,
      context?: string
    ) => Promise<any>;
    acceptSuggestion: () => string | null;
    rejectSuggestion: () => void;
  };
  /** Whether this specific field is the active AI field */
  isActive: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
  /** Disable when credits are exhausted */
  creditsExhausted?: boolean;
}

const AIFieldButton: React.FC<AIFieldButtonProps> = ({
  fieldName,
  fieldValue,
  onAccept,
  context,
  assistHook,
  isActive,
  onActivate,
  onDeactivate,
  creditsExhausted = false,
}) => {
  const [editedSuggestion, setEditedSuggestion] = useState('');
  const [showDiff, setShowDiff] = useState(true);

  const handleRequest = useCallback(async () => {
    if (creditsExhausted) return;
    onActivate();
    const result = await assistHook.requestSuggestion(fieldName, fieldValue, context);
    if (result) {
      setEditedSuggestion(result.suggestion);
      setShowDiff(true);
    }
  }, [fieldName, fieldValue, context, assistHook, onActivate, creditsExhausted]);

  const handleAccept = useCallback(() => {
    // Apply the potentially user-edited suggestion
    onAccept(editedSuggestion || assistHook.result?.suggestion || '');
    assistHook.acceptSuggestion();
    onDeactivate();
  }, [editedSuggestion, assistHook, onAccept, onDeactivate]);

  const handleReject = useCallback(() => {
    assistHook.rejectSuggestion();
    onDeactivate();
    setEditedSuggestion('');
  }, [assistHook, onDeactivate]);

  const isThisFieldLoading = isActive && assistHook.isLoading;
  const isThisFieldResult = isActive && assistHook.hasResult && assistHook.result?.fieldName === fieldName;
  const isThisFieldError = isActive && (assistHook.status === 'error' || assistHook.status === 'credits_exhausted');

  // Trigger button (shown below field)
  if (!isThisFieldLoading && !isThisFieldResult && !isThisFieldError) {
    return (
      <button
        type="button"
        onClick={handleRequest}
        disabled={creditsExhausted || !fieldValue?.trim()}
        aria-label={`Improve ${fieldName} with AI`}
        title={
          creditsExhausted
            ? 'AI credits exhausted — upgrade to continue'
            : !fieldValue?.trim()
            ? 'Add content first'
            : `Improve this ${fieldName} with AI`
        }
        className={`
          mt-1 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold
          border transition-all duration-150 group
          ${
            creditsExhausted || !fieldValue?.trim()
              ? 'border-slate-200 text-slate-300 bg-slate-50 cursor-not-allowed'
              : 'border-violet-200 text-violet-600 bg-violet-50 hover:bg-violet-100 hover:border-violet-400 cursor-pointer shadow-2xs'
          }
        `}
      >
        <Sparkles className="w-3 h-3" aria-hidden="true" />
        <span>AI Improve</span>
      </button>
    );
  }

  // Loading state (FR3.9)
  if (isThisFieldLoading) {
    return (
      <div className="mt-2 flex items-center gap-2 px-3 py-2 rounded-xl bg-violet-50 border border-violet-200 animate-pulse">
        <Loader2 className="w-3.5 h-3.5 text-violet-600 animate-spin" aria-hidden="true" />
        <span className="text-[11px] font-semibold text-violet-700">AI is improving your content…</span>
      </div>
    );
  }

  // Error state (FR3.10)
  if (isThisFieldError) {
    return (
      <div className="mt-2 rounded-xl border border-rose-200 bg-rose-50 p-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-start gap-2">
            <Zap className="w-3.5 h-3.5 text-rose-500 mt-0.5 shrink-0" aria-hidden="true" />
            <div>
              <p className="text-[11px] font-bold text-rose-700">
                {assistHook.status === 'credits_exhausted'
                  ? 'AI Credits Exhausted'
                  : 'AI Assist Unavailable'}
              </p>
              <p className="text-[10px] text-rose-600 mt-0.5">{assistHook.error}</p>
              {assistHook.status === 'credits_exhausted' && (
                <a
                  href="/pricing"
                  className="mt-1.5 inline-block text-[10px] font-bold text-rose-700 underline"
                >
                  Upgrade plan →
                </a>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={handleReject}
            className="p-1 text-rose-400 hover:text-rose-600 rounded hover:bg-rose-100 transition-colors cursor-pointer"
            aria-label="Dismiss"
          >
            <X className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    );
  }

  // Suggestion review panel (FR3.5, FR3.6) — FR6.5 before/after comparison
  if (isThisFieldResult && assistHook.result) {
    return (
      <div
        role="region"
        aria-label="AI suggestion review"
        className="mt-2 rounded-xl border border-violet-300 bg-white shadow-md overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-3 py-2 bg-violet-50 border-b border-violet-200">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-violet-600" aria-hidden="true" />
            <span className="text-[11px] font-bold text-violet-800">AI Suggestion</span>
            {assistHook.creditsRemaining !== null && (
              <span className="text-[9px] text-violet-500 font-semibold ml-1">
                ({assistHook.creditsRemaining} credits left)
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={() => setShowDiff((v) => !v)}
            className="flex items-center gap-1 text-[9px] text-violet-500 hover:text-violet-700 transition-colors cursor-pointer"
            aria-expanded={showDiff}
            aria-label="Toggle before/after comparison"
          >
            {showDiff ? 'Hide' : 'Compare'}
            {showDiff ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
        </div>

        {/* Before/After diff (FR6.5) */}
        {showDiff && (
          <div className="px-3 py-2 border-b border-slate-100 grid grid-cols-2 gap-2 bg-slate-50/50">
            <div>
              <p className="text-[8px] font-bold uppercase text-slate-400 tracking-wider mb-1">Before</p>
              <p className="text-[10px] text-slate-500 line-through leading-relaxed line-clamp-4">
                {assistHook.result.original}
              </p>
            </div>
            <div>
              <p className="text-[8px] font-bold uppercase text-emerald-500 tracking-wider mb-1">After</p>
              <p className="text-[10px] text-emerald-700 font-medium leading-relaxed line-clamp-4">
                {assistHook.result.suggestion}
              </p>
            </div>
          </div>
        )}

        {/* Editable suggestion (FR3.6 — manual edit) */}
        <div className="px-3 py-2">
          <label className="text-[9px] font-bold uppercase text-slate-500 tracking-wider mb-1 block">
            Edit suggestion (optional)
          </label>
          <textarea
            value={editedSuggestion}
            onChange={(e) => setEditedSuggestion(e.target.value)}
            rows={3}
            className="w-full resize-y rounded-md border border-violet-200 bg-violet-50/30 px-2 py-1.5 text-[11px] text-slate-800 outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-300 transition-all"
            aria-label="Edit AI suggestion"
          />
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 px-3 pb-3">
          <button
            type="button"
            onClick={handleAccept}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-violet-600 text-white text-[11px] font-bold hover:bg-violet-700 transition-colors cursor-pointer"
            aria-label="Accept AI suggestion"
          >
            <Check className="w-3.5 h-3.5" aria-hidden="true" />
            Accept
          </button>
          <button
            type="button"
            onClick={handleReject}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-white border border-slate-200 text-slate-600 text-[11px] font-bold hover:bg-slate-50 transition-colors cursor-pointer"
            aria-label="Reject AI suggestion"
          >
            <X className="w-3.5 h-3.5" aria-hidden="true" />
            Reject
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default AIFieldButton;
