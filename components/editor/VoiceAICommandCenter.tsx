'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  MicOff,
  Sparkles,
  Send,
  Check,
  X,
  RotateCcw,
  AlertCircle,
  ArrowRight,
  Loader2,
  Wand2,
  HelpCircle,
  ShieldCheck,
  Volume2,
} from 'lucide-react';
import { CVData } from '@/data/sampleCV';
import { useVoiceRecognition } from '@/lib/hooks/useVoiceRecognition';
import { VoiceCommandResult } from '@/lib/ai/geminiService';
import toast from 'react-hot-toast';

interface VoiceAICommandCenterProps {
  isOpen: boolean;
  onClose: () => void;
  cvData: CVData;
  activeSection: string;
  onApplyChange: (newCvData: CVData, explanation: string) => void;
}

const EXAMPLE_COMMANDS = [
  'Add my current company as ABC Technologies.',
  'Change my job title to Senior Software Engineer.',
  'Add 3 years of experience in React development.',
  'Make my professional summary more professional and ATS-friendly.',
  'Add TypeScript and Docker to my skills.',
  'Add Bachelor of Science in Computer Science from MIT.',
];

export default function VoiceAICommandCenter({
  isOpen,
  onClose,
  cvData,
  activeSection,
  onApplyChange,
}: VoiceAICommandCenterProps) {
  const [manualInput, setManualInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [proposedResult, setProposedResult] = useState<VoiceCommandResult | null>(null);
  const [editedProposedValue, setEditedProposedValue] = useState<string>('');
  const [isEditingProposal, setIsEditingProposal] = useState(false);
  const [micActiveTimer, setMicActiveTimer] = useState<number>(0);

  const {
    isListening,
    transcript,
    interimTranscript,
    isSupported,
    error: voiceError,
    startListening,
    stopListening,
    resetTranscript,
    setTranscript,
  } = useVoiceRecognition();

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Sync transcript to input or auto-process
  useEffect(() => {
    if (transcript) {
      setManualInput(transcript);
    }
  }, [transcript]);

  // Audio timer visualizer
  useEffect(() => {
    if (isListening) {
      setMicActiveTimer(0);
      timerRef.current = setInterval(() => {
        setMicActiveTimer((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isListening]);

  if (!isOpen) return null;

  const handleToggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      resetTranscript();
      setManualInput('');
      setProposedResult(null);
      startListening();
    }
  };

  const handleExecuteCommand = async (commandToRun?: string) => {
    const text = (commandToRun || manualInput || transcript).trim();
    if (!text) {
      toast.error('Please speak or enter a voice command.');
      return;
    }

    if (isListening) {
      stopListening();
    }

    setIsProcessing(true);
    setProposedResult(null);
    setIsEditingProposal(false);

    try {
      const res = await fetch('/api/ai/voice-command', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          command: text,
          currentCvData: cvData,
          activeSection,
        }),
      });

      const json = await res.json();
      if (res.ok && json.data?.success) {
        setProposedResult(json.data);
        setEditedProposedValue(json.data.afterPreview || '');
      } else {
        toast.error(json.error || 'Failed to process voice command. Please try again.');
      }
    } catch (err) {
      console.error('Voice command execution error:', err);
      toast.error('Service error while communicating with AI.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleConfirmApply = () => {
    if (!proposedResult) return;

    let finalCvData = proposedResult.updatedCvData;

    // If the user tweaked the proposed text in the diff editor
    if (isEditingProposal && editedProposedValue.trim()) {
      if (proposedResult.targetSection === 'summary') {
        finalCvData = { ...finalCvData, summary: editedProposedValue };
      } else if (proposedResult.targetSection === 'personal' && proposedResult.targetField) {
        finalCvData = {
          ...finalCvData,
          personal: {
            ...finalCvData.personal,
            [proposedResult.targetField]: editedProposedValue,
          },
        };
      }
    }

    onApplyChange(finalCvData, proposedResult.explanation);
    toast.success('Changes applied to CV successfully!');
    handleClose();
  };

  const handleClose = () => {
    stopListening();
    resetTranscript();
    setManualInput('');
    setProposedResult(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 sm:p-6 animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-linear-to-r from-slate-50 via-white to-[#FEE1CF]/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0F0F0F] text-[#F5D17B] flex items-center justify-center shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                  Voice &amp; AI Content Editor
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-[#FEE1CF] text-[#0F0F0F] text-[10px] font-extrabold uppercase tracking-wider">
                  Live
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Speak or type natural commands to edit and enhance your CV fields
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Voice Microphone Center Section */}
          <div className="flex flex-col items-center justify-center text-center p-6 bg-slate-50/80 rounded-2xl border border-slate-200/80 relative overflow-hidden">
            {/* Background Soundwave Simulation when listening */}
            {isListening && (
              <div className="absolute inset-0 flex items-center justify-center opacity-25 pointer-events-none">
                <div className="w-32 h-32 rounded-full bg-[#F3645C] animate-ping" />
                <div className="w-48 h-48 rounded-full bg-[#F5D17B] animate-pulse" />
              </div>
            )}

            {/* Big Mic Button */}
            <div className="relative z-10 mb-4">
              <button
                type="button"
                onClick={handleToggleListening}
                className={`w-20 h-20 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-lg active:scale-95 ${
                  isListening
                    ? 'bg-rose-500 text-white ring-8 ring-rose-100 shadow-rose-200 animate-pulse'
                    : 'bg-[#0F0F0F] text-white hover:bg-[#262626] hover:shadow-xl'
                }`}
                title={isListening ? 'Stop listening' : 'Click and speak'}
              >
                {isListening ? (
                  <MicOff className="w-8 h-8 animate-bounce" />
                ) : (
                  <Mic className="w-8 h-8 text-[#F5D17B]" />
                )}
              </button>
            </div>

            {/* Status Text & Timer */}
            <div className="relative z-10 space-y-1">
              {isListening ? (
                <div className="space-y-1">
                  <div className="flex items-center justify-center gap-2 text-rose-600 font-extrabold text-sm">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                    <span>Listening... ({micActiveTimer}s)</span>
                  </div>
                  <p className="text-xs text-slate-500">Speak your command clearly into your microphone</p>
                </div>
              ) : (
                <div className="space-y-1">
                  <p className="text-sm font-bold text-slate-800">
                    {isSupported ? 'Click the microphone to speak' : 'Type your command below'}
                  </p>
                  <p className="text-xs text-slate-400">
                    You can say things like &ldquo;Add my current company as ABC Technologies&rdquo;
                  </p>
                </div>
              )}
            </div>

            {/* Voice Error Notice */}
            {voiceError && (
              <div className="mt-3 px-3 py-2 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>{voiceError}</span>
              </div>
            )}
          </div>

          {/* Realtime Transcript or Input Box */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span>Command / Instruction</span>
              {(interimTranscript || isListening) && (
                <span className="text-rose-500 flex items-center gap-1 font-semibold">
                  <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                  Live voice capture
                </span>
              )}
            </div>

            <div className="relative flex items-center">
              <input
                type="text"
                value={manualInput}
                onChange={(e) => setManualInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleExecuteCommand();
                  }
                }}
                placeholder="e.g. Change my job title to Senior Software Engineer"
                disabled={isProcessing}
                className="w-full h-12 pl-4 pr-24 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 placeholder:text-slate-400 shadow-2xs focus:border-[#F3645C] focus:ring-2 focus:ring-[#F3645C]/20 outline-none transition-all"
              />
              <div className="absolute right-1.5 flex items-center gap-1">
                {manualInput && (
                  <button
                    type="button"
                    onClick={() => {
                      setManualInput('');
                      resetTranscript();
                    }}
                    className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
                    title="Clear input"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => handleExecuteCommand()}
                  disabled={isProcessing || !manualInput.trim()}
                  className="h-9 px-3 bg-[#0F0F0F] hover:bg-[#262626] text-white font-bold text-xs rounded-lg transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <>
                      <span>Process</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#F5D17B]" />
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Interim stream text */}
            {interimTranscript && (
              <p className="text-xs text-slate-400 italic px-1">
                Transcribing: &ldquo;{interimTranscript}&rdquo;
              </p>
            )}
          </div>

          {/* Quick Example Suggestions */}
          {!proposedResult && (
            <div className="space-y-2">
              <p className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                Try these voice commands:
              </p>
              <div className="flex flex-wrap gap-2">
                {EXAMPLE_COMMANDS.map((cmd, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setManualInput(cmd);
                      handleExecuteCommand(cmd);
                    }}
                    disabled={isProcessing}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200/80 text-slate-700 text-xs font-semibold rounded-lg transition-colors text-left cursor-pointer active:scale-95 disabled:opacity-50"
                  >
                    &ldquo;{cmd}&rdquo;
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Proposed Change Confirmation & Diff View (USER CONTROL) */}
          {proposedResult && (
            <div className="p-5 bg-[#F8F8F6] border-2 border-emerald-500/30 rounded-2xl space-y-4 animate-in fade-in duration-200">
              {/* Badge & Explanation Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-extrabold uppercase tracking-wider">
                      Proposed Update
                    </span>
                    <span className="text-xs font-bold text-slate-500">
                      Target: {proposedResult.targetSection}
                    </span>
                  </div>
                  <h4 className="text-sm font-extrabold text-slate-900">
                    {proposedResult.explanation}
                  </h4>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2 py-1 rounded-md">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Review Before Apply</span>
                </div>
              </div>

              {/* Before vs After Visual Comparison */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {/* Before */}
                <div className="p-3 bg-white rounded-xl border border-slate-200/80 space-y-1">
                  <span className="font-extrabold text-slate-400 uppercase tracking-wider text-[10px]">
                    Current Value:
                  </span>
                  <div className="text-slate-600 line-clamp-4 font-mono text-[11px] bg-slate-50 p-2 rounded-lg break-words">
                    {proposedResult.beforePreview || '(Empty)'}
                  </div>
                </div>

                {/* After */}
                <div className="p-3 bg-white rounded-xl border border-emerald-200 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-emerald-700 uppercase tracking-wider text-[10px]">
                      New Value (AI Proposed):
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsEditingProposal(!isEditingProposal)}
                      className="text-[10px] text-violet-600 font-bold hover:underline"
                    >
                      {isEditingProposal ? 'Done Editing' : 'Edit Text'}
                    </button>
                  </div>
                  {isEditingProposal ? (
                    <textarea
                      rows={4}
                      value={editedProposedValue}
                      onChange={(e) => setEditedProposedValue(e.target.value)}
                      className="w-full text-slate-900 font-sans text-xs bg-emerald-50/50 p-2 rounded-lg border border-emerald-300 focus:outline-none"
                    />
                  ) : (
                    <div className="text-slate-900 font-semibold text-[11px] bg-emerald-50/60 p-2 rounded-lg break-words">
                      {editedProposedValue || proposedResult.afterPreview}
                    </div>
                  )}
                </div>
              </div>

              {/* Confirmation Controls */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-slate-200">
                <p className="text-[11px] text-slate-400">
                  You can undo this change anytime via the Undo button.
                </p>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => setProposedResult(null)}
                    className="flex-1 sm:flex-none px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
                  >
                    Discard
                  </button>
                  <button
                    type="button"
                    onClick={handleConfirmApply}
                    className="flex-1 sm:flex-none px-5 py-2.5 bg-[#0F0F0F] hover:bg-[#262626] text-white font-extrabold text-xs rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                  >
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Apply to CV</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1.5 text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>AI never silently overwrites your information</span>
          </span>
          <button
            onClick={handleClose}
            className="text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
