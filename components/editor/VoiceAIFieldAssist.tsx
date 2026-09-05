'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Mic,
  MicOff,
  Sparkles,
  Wand2,
  Check,
  X,
  Loader2,
  ChevronDown,
  RefreshCw,
  Copy,
} from 'lucide-react';
import { AIContentAction } from '@/lib/ai/geminiService';
import { useVoiceRecognition } from '@/lib/hooks/useVoiceRecognition';
import toast from 'react-hot-toast';

interface VoiceAIFieldAssistProps {
  fieldName: string;
  fieldValue: string;
  onAccept: (newValue: string) => void;
  sectionName?: string;
  jobTitle?: string;
  compact?: boolean;
}

const AI_ACTIONS: { id: AIContentAction; label: string; icon: string; description: string }[] = [
  { id: 'improve', label: 'Improve Content', icon: '✨', description: 'Enhance impact with active verbs and measurable outcomes' },
  { id: 'professional', label: 'Make Professional', icon: '💼', description: 'Elevate tone to executive corporate standards' },
  { id: 'shorter', label: 'Make It Shorter', icon: '✂️', description: 'Condense into punchy, high-impact bullet statements' },
  { id: 'detailed', label: 'Make It More Detailed', icon: '🔍', description: 'Expand technical scope, methods, and specific impact' },
  { id: 'grammar', label: 'Fix Grammar', icon: '✍️', description: 'Correct syntax, punctuation, tenses, and typos' },
  { id: 'ats', label: 'Improve for ATS', icon: '🎯', description: 'Incorporate industry keywords to pass screening software' },
  { id: 'generate', label: 'Generate Content', icon: '⚡', description: 'Create rich, relevant content from your target role' },
  { id: 'rewrite', label: 'Rewrite', icon: '🔄', description: 'Completely restyle or customize with your instructions' },
];

export default function VoiceAIFieldAssist({
  fieldName,
  fieldValue,
  onAccept,
  sectionName = 'Section',
  jobTitle = 'Professional',
  compact = false,
}: VoiceAIFieldAssistProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState<AIContentAction>('improve');
  const [customVoiceInstruction, setCustomVoiceInstruction] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [generatedResult, setGeneratedResult] = useState<string | null>(null);
  const [editableResult, setEditableResult] = useState<string>('');
  const [isDirectDictating, setIsDirectDictating] = useState(false);

  const menuRef = useRef<HTMLDivElement | null>(null);

  // Hook for voice dictation & instructions
  const {
    isListening,
    transcript,
    interimTranscript,
    isSupported,
    error: voiceError,
    startListening,
    stopListening,
    resetTranscript,
  } = useVoiceRecognition();

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  // Handle direct voice dictation into field
  useEffect(() => {
    if (isDirectDictating && transcript) {
      // Append or replace
      const combined = fieldValue ? `${fieldValue.trim()} ${transcript}` : transcript;
      onAccept(combined);
      resetTranscript();
    }
  }, [isDirectDictating, transcript, fieldValue, onAccept, resetTranscript]);

  // Handle voice instruction in modal
  useEffect(() => {
    if (isModalOpen && transcript && !isDirectDictating) {
      setCustomVoiceInstruction((prev) => (prev ? `${prev} ${transcript}` : transcript));
      resetTranscript();
    }
  }, [isModalOpen, transcript, isDirectDictating, resetTranscript]);

  const handleActionSelect = (action: AIContentAction) => {
    setSelectedAction(action);
    setIsMenuOpen(false);
    setIsModalOpen(true);
    setCustomVoiceInstruction('');
    setGeneratedResult(null);
    executeAIModification(action, fieldValue, '');
  };

  const executeAIModification = async (
    action: AIContentAction,
    textToUse: string,
    instruction: string
  ) => {
    setIsProcessing(true);
    try {
      const res = await fetch('/api/ai/content-modify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: textToUse,
          action,
          instruction,
          sectionName,
          jobTitle,
        }),
      });

      const json = await res.json();
      if (res.ok && json.data?.modifiedContent) {
        setGeneratedResult(json.data.modifiedContent);
        setEditableResult(json.data.modifiedContent);
      } else {
        toast.error(json.error || 'Failed to modify content with AI.');
      }
    } catch (err) {
      console.error('Content modification error:', err);
      toast.error('AI assistant network error.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDirectDictationToggle = () => {
    if (isListening && isDirectDictating) {
      stopListening();
      setIsDirectDictating(false);
      toast.success('Voice dictation stopped.');
    } else {
      setIsDirectDictating(true);
      resetTranscript();
      startListening();
      toast('Listening... Speak to add content directly.', { icon: '🎙️' });
    }
  };

  const handleApplyModification = () => {
    const textToApply = editableResult || generatedResult;
    if (!textToApply) return;
    onAccept(textToApply);
    toast.success(`${fieldName} updated with AI enhancement!`);
    setIsModalOpen(false);
    setGeneratedResult(null);
  };

  // Show voice error if any
  useEffect(() => {
    if (voiceError) {
      toast.error(voiceError);
    }
  }, [voiceError]);

  return (
    <div className={`mt-1.5 flex items-center justify-between gap-2 ${compact ? 'text-[10px]' : 'text-xs'}`} ref={menuRef}>
      {/* Action Buttons Row */}
      <div className="flex items-center gap-1.5 flex-wrap">
        {/* Direct Voice Dictation Button */}
        <button
          type="button"
          onClick={handleDirectDictationToggle}
          className={`inline-flex items-center gap-1 ${compact ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-[11px]'} font-bold rounded-lg transition-all cursor-pointer ${
            isListening && isDirectDictating
              ? 'bg-rose-500 text-white animate-pulse shadow-xs shadow-rose-200'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}
          title={
            !isSupported
              ? 'Voice recognition not supported in this browser'
              : isListening && isDirectDictating
              ? 'Click to finish speaking'
              : 'Speak directly into this field'
          }
        >
          {isListening && isDirectDictating ? (
            <>
              <MicOff className="w-3.5 h-3.5 text-white" />
              <span>Speaking...</span>
            </>
          ) : (
            <>
              <Mic className="w-3.5 h-3.5 text-[#F3645C]" />
              <span>Voice</span>
            </>
          )}
        </button>

        {/* Interim transcript pill when speaking */}
        {isListening && isDirectDictating && interimTranscript && (
          <span className="text-[10px] text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md font-medium italic animate-pulse max-w-[160px] truncate">
            &ldquo;{interimTranscript}&rdquo;
          </span>
        )}

        {/* AI Action Menu Trigger */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`inline-flex items-center gap-1.5 ${compact ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-[11px]'} font-bold rounded-lg bg-[#0F0F0F] hover:bg-[#262626] text-white transition-all cursor-pointer shadow-2xs`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#F5D17B]" />
            <span>AI Edit</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {/* Dropdown Menu of 8 AI Actions */}
          {isMenuOpen && (
            <div className="absolute left-0 mt-1 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-30 animate-in fade-in zoom-in-95 duration-100">
              <div className="px-3 py-1.5 border-b border-slate-100 flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                  Select AI Action
                </span>
                <span className="text-[10px] text-slate-500 font-medium">{fieldName}</span>
              </div>
              <div className="max-h-60 overflow-y-auto py-1">
                {AI_ACTIONS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleActionSelect(item.id)}
                    className="w-full text-left px-3 py-2 hover:bg-slate-50 transition-colors flex items-start gap-2.5 group cursor-pointer"
                  >
                    <span className="text-base shrink-0 group-hover:scale-110 transition-transform">
                      {item.icon}
                    </span>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-slate-800 group-hover:text-violet-600 transition-colors">
                        {item.label}
                      </div>
                      <div className="text-[10px] text-slate-400 truncate mt-0.5">
                        {item.description}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Helper notice */}
      <span className="text-[10px] text-slate-400 font-medium hidden sm:inline">
        Voice or AI to modify
      </span>

      {/* AI Preview & Confirmation Modal (USER CONTROL) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/80">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#0F0F0F] text-[#F5D17B] flex items-center justify-center">
                  <Wand2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900">
                    AI Content Modification
                  </h4>
                  <p className="text-[11px] text-slate-500 font-medium">
                    {fieldName} &bull; {AI_ACTIONS.find((a) => a.id === selectedAction)?.label}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  stopListening();
                  setIsModalOpen(false);
                }}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-xl"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-4 flex-1">
              {/* Quick Action Selector Pills */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                  Switch Action
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {AI_ACTIONS.map((a) => (
                    <button
                      key={a.id}
                      type="button"
                      onClick={() => {
                        setSelectedAction(a.id);
                        executeAIModification(a.id, fieldValue, customVoiceInstruction);
                      }}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        selectedAction === a.id
                          ? 'bg-[#0F0F0F] text-white shadow-xs'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      <span className="mr-1">{a.icon}</span>
                      {a.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Voice + AI Combined Instruction Box */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#F3645C]" />
                    <span>Spoken or Custom Instruction (Optional)</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      if (isListening) {
                        stopListening();
                      } else {
                        resetTranscript();
                        startListening();
                      }
                    }}
                    className={`inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-bold rounded-md transition-all cursor-pointer ${
                      isListening
                        ? 'bg-rose-500 text-white animate-pulse'
                        : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <Mic className="w-3 h-3 text-[#F3645C]" />
                    <span>{isListening ? 'Listening...' : 'Speak Instruction'}</span>
                  </button>
                </div>
                <input
                  type="text"
                  value={customVoiceInstruction}
                  onChange={(e) => setCustomVoiceInstruction(e.target.value)}
                  placeholder="e.g. Make it more professional and ATS-friendly, highlight leadership"
                  className="w-full h-9 px-3 text-xs bg-white rounded-lg border border-slate-200 focus:outline-none focus:border-violet-500"
                />
                {customVoiceInstruction && (
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => executeAIModification(selectedAction, fieldValue, customVoiceInstruction)}
                      disabled={isProcessing}
                      className="px-3 py-1 bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold rounded-md flex items-center gap-1"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>Re-run with instruction</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Before vs Proposed After Comparison */}
              <div className="space-y-3">
                {/* Original */}
                <div className="space-y-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    Original Content
                  </span>
                  <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200 break-words line-clamp-3">
                    {fieldValue || '(Empty)'}
                  </div>
                </div>

                {/* AI Proposed Result */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-600">
                      AI Generated Content (Preview &amp; Edit)
                    </span>
                    {generatedResult && (
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(editableResult || generatedResult);
                          toast.success('Copied to clipboard');
                        }}
                        className="text-[10px] font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1"
                      >
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </button>
                    )}
                  </div>

                  {isProcessing ? (
                    <div className="flex flex-col items-center justify-center p-8 bg-emerald-50/40 rounded-xl border border-emerald-200 text-slate-500 space-y-2">
                      <Loader2 className="w-6 h-6 animate-spin text-emerald-600" />
                      <span className="text-xs font-bold text-slate-700">Refining with Gemini AI...</span>
                    </div>
                  ) : (
                    <textarea
                      rows={5}
                      value={editableResult}
                      onChange={(e) => setEditableResult(e.target.value)}
                      placeholder="AI content will appear here..."
                      className="w-full text-xs text-slate-900 bg-emerald-50/40 p-3 rounded-xl border border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 leading-relaxed"
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Modal Controls */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  stopListening();
                  setIsModalOpen(false);
                }}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-200 rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleApplyModification}
                disabled={isProcessing || !editableResult.trim()}
                className="px-5 py-2.5 bg-[#0F0F0F] hover:bg-[#262626] text-white font-extrabold text-xs rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Apply to {fieldName}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
