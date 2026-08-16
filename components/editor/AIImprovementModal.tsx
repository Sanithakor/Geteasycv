'use client';

import React, { useState, useEffect } from 'react';
import { X, Sparkles, TrendingUp, Check, RefreshCw, Copy, Edit2, Target, Wand2, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';

interface AIImprovementModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialText: string;
  fieldName?: string;
  jobTitle?: string;
  onAccept: (newText: string) => void;
}

export type AIAction = 'improve_bullet' | 'optimize_ats' | 'add_impact' | 'make_professional' | 'make_concise';

export default function AIImprovementModal({
  isOpen,
  onClose,
  initialText,
  fieldName = 'bullet_point',
  jobTitle = '',
  onAccept,
}: AIImprovementModalProps) {
  const [selectedAction, setSelectedAction] = useState<AIAction>('improve_bullet');
  const [isProcessing, setIsProcessing] = useState(false);
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [editableSuggestion, setEditableSuggestion] = useState<string>('');
  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [creditsRemaining, setCreditsRemaining] = useState<number | null>(null);

  useEffect(() => {
    if (isOpen && initialText) {
      handleGenerate(selectedAction, initialText);
    }
  }, [isOpen, initialText]);

  if (!isOpen) return null;

  const handleGenerate = async (action: AIAction = selectedAction, textToUse: string = initialText) => {
    if (!textToUse || textToUse.trim().length < 3) {
      toast.error('Please enter content to improve.');
      return;
    }

    setIsProcessing(true);
    setIsEditing(false);
    try {
      const res = await fetch('/api/ai/resume-improve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: textToUse,
          action,
          jobTitle,
          fieldName,
        }),
      });

      const data = await res.json();
      if (res.ok && data.data?.suggestion) {
        setSuggestion(data.data.suggestion);
        setEditableSuggestion(data.data.suggestion);
        if (data.data.creditsRemaining !== undefined) {
          setCreditsRemaining(data.data.creditsRemaining);
        }
        toast.success('AI suggestion generated!');
      } else {
        toast.error(data.error || 'Failed to generate AI suggestion.');
      }
    } catch (err) {
      toast.error('AI service temporarily unavailable.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleActionClick = (action: AIAction) => {
    setSelectedAction(action);
    handleGenerate(action, initialText);
  };

  const handleAcceptClick = () => {
    const finalResult = isEditing ? editableSuggestion : (suggestion || initialText);
    onAccept(finalResult);
    toast.success('Resume content updated!');
    onClose();
  };

  const handleCopy = () => {
    const textToCopy = isEditing ? editableSuggestion : (suggestion || '');
    if (!textToCopy) return;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    toast.success('Copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  const formattedBefore = initialText.startsWith('•') ? initialText : `• ${initialText.trim()}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-md shadow-2xl border border-slate-200 max-w-2xl w-full p-6 space-y-5 overflow-hidden text-left font-sans">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-purple-100 text-purple-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900 text-base">AI Resume Improvement</h3>
                <span className="px-2 py-0.5 bg-purple-50 text-purple-600 border border-purple-200 rounded-full font-bold text-[10px] uppercase">
                  AI-POWERED
                </span>
              </div>
              <p className="text-xs text-slate-500">Transform basic bullet points into high-impact ATS-friendly statements</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-md hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Selectors */}
        <div className="space-y-1.5">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">Select AI Transformation:</label>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => handleActionClick('improve_bullet')}
              className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                selectedAction === 'improve_bullet'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Improve Bullet</span>
            </button>

            <button
              type="button"
              onClick={() => handleActionClick('optimize_ats')}
              className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                selectedAction === 'optimize_ats'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Target className="w-3.5 h-3.5" />
              <span>Optimize for ATS</span>
            </button>

            <button
              type="button"
              onClick={() => handleActionClick('add_impact')}
              className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                selectedAction === 'add_impact'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Wand2 className="w-3.5 h-3.5" />
              <span>Add Metrics</span>
            </button>

            <button
              type="button"
              onClick={() => handleActionClick('make_professional')}
              className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                selectedAction === 'make_professional'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Make Professional</span>
            </button>
          </div>
        </div>

        {/* Before / After Comparison Card UI Matching Reference Image */}
        <div className="bg-white rounded-md border border-slate-200/80 shadow-md overflow-hidden">
          {/* Before */}
          <div className="p-4 bg-slate-50 border-b border-slate-200/80">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 bg-slate-200 text-slate-700 text-[10px] font-bold rounded">
                BEFORE
              </span>
            </div>
            <p className="text-slate-600 text-xs sm:text-sm font-medium">
              {formattedBefore}
            </p>
          </div>

          {/* Divider Circle */}
          <div className="flex justify-center -my-3.5 relative z-10">
            <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center shadow-md">
              <Sparkles className={`w-4 h-4 ${isProcessing ? 'animate-spin' : ''}`} />
            </div>
          </div>

          {/* After */}
          <div className="p-4 bg-purple-50/40 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-purple-600 text-white text-[10px] font-bold rounded">
                  AFTER AI
                </span>
                <span className="flex items-center gap-1 text-emerald-600 text-xs font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  <TrendingUp className="w-3 h-3" />
                  Improved
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-2 py-1 text-[11px] font-semibold text-slate-600 hover:text-slate-900 border border-slate-200 rounded-md bg-white flex items-center gap-1 cursor-pointer"
                >
                  <Edit2 className="w-3 h-3" />
                  <span>{isEditing ? 'View' : 'Edit'}</span>
                </button>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="px-2 py-1 text-[11px] font-semibold text-slate-600 hover:text-slate-900 border border-slate-200 rounded-md bg-white flex items-center gap-1 cursor-pointer"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {isEditing ? (
              <textarea
                rows={3}
                value={editableSuggestion}
                onChange={(e) => setEditableSuggestion(e.target.value)}
                className="w-full p-3 text-xs font-bold text-slate-900 bg-white border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            ) : (
              <p className="text-slate-900 text-xs sm:text-sm font-bold leading-relaxed">
                {isProcessing ? 'Analyzing and generating improved bullet point...' : (suggestion || formattedBefore)}
              </p>
            )}
          </div>
        </div>

        {/* Smart Suggestions Box */}
        <div className="bg-purple-50/90 border border-purple-200/80 rounded-md p-3.5 flex items-start gap-3 text-left">
          <Sparkles className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-bold text-purple-900 mb-0.5">
              Smart Suggestions
            </h4>
            <p className="text-[11px] text-purple-700 leading-relaxed">
              AI analyzes your industry and role to provide contextually relevant improvements without fabricating facts.
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between border-t border-slate-100 pt-4">
          <button
            type="button"
            onClick={() => handleGenerate(selectedAction, initialText)}
            disabled={isProcessing}
            className="px-4 py-2 border border-slate-200 text-slate-700 hover:bg-slate-100 rounded-md text-xs font-bold flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isProcessing ? 'animate-spin' : ''}`} />
            <span>Regenerate</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-md text-xs font-bold cursor-pointer"
            >
              Reject / Close
            </button>
            <button
              type="button"
              onClick={handleAcceptClick}
              disabled={isProcessing || !suggestion}
              className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md text-xs font-bold shadow-xs transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <Check className="w-4 h-4" />
              <span>Accept &amp; Save</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
