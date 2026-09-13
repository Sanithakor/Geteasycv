'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  FileText,
  Undo2,
  Redo2,
  Download,
  Share2,
  Sparkles,
  Upload,
  Bookmark,
  CheckCircle2,
  Mic,
  ChevronDown,
  FileCode,
  Image as ImageIcon,
  HelpCircle,
  BarChart3,
  Loader2,
  LogOut,
  User,
  ArrowLeft,
} from 'lucide-react';
import AICreditsIndicator from '@/components/editor/AICreditsIndicator';

interface EditorTopNavbarProps {
  resumeTitle: string;
  setResumeTitle: (title: string) => void;
  isSaving: boolean;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  onOpenATS: () => void;
  onOpenCoverLetter: () => void;
  onOpenImport: () => void;
  onOpenShare: () => void;
  onOpenSaveTemplate: () => void;
  onOpenVoiceAI: () => void;
  onExport: (format: 'pdf' | 'docx' | 'txt' | 'png' | 'jpg') => void;
  isExporting: boolean;
  aiCreditsInfo: {
    creditsRemaining: number | null;
    creditsLimit: number | null;
    isUnlimited: boolean;
  };
  userTier?: string;
  onUpgradeClick?: () => void;
}

export default function EditorTopNavbar({
  resumeTitle,
  setResumeTitle,
  isSaving,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onOpenATS,
  onOpenCoverLetter,
  onOpenImport,
  onOpenShare,
  onOpenSaveTemplate,
  onOpenVoiceAI,
  onExport,
  isExporting,
  aiCreditsInfo,
  userTier = 'free',
  onUpgradeClick,
}: EditorTopNavbarProps) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const titleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditingTitle && titleInputRef.current) {
      titleInputRef.current.focus();
      titleInputRef.current.select();
    }
  }, [isEditingTitle]);

  return (
    <header className="h-14 border-b border-slate-200/90 bg-white px-3 sm:px-4 flex items-center justify-between shrink-0 z-30 shadow-2xs">
      {/* Left: Brand Logo & Resume Title */}
      <div className="flex items-center gap-3 min-w-0">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-slate-800 hover:text-violet-600 transition-colors shrink-0"
          title="Back to Dashboard"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-600 text-white flex items-center justify-center font-black text-sm shadow-xs shadow-violet-500/20">
            CV
          </div>
          <span className="font-extrabold text-sm tracking-tight hidden md:inline">
            GetEasy<span className="text-violet-600">CV</span>
          </span>
        </Link>

        <div className="h-4 w-px bg-slate-200 shrink-0" />

        {/* Editable Resume Title */}
        <div className="flex items-center gap-2 min-w-0">
          {isEditingTitle ? (
            <input
              ref={titleInputRef}
              type="text"
              value={resumeTitle}
              onChange={(e) => setResumeTitle(e.target.value)}
              onBlur={() => setIsEditingTitle(false)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') setIsEditingTitle(false);
              }}
              className="h-7 px-2 text-xs font-bold text-slate-900 border border-violet-400 rounded-md outline-none focus:ring-2 focus:ring-violet-500/20 bg-violet-50/40"
            />
          ) : (
            <button
              type="button"
              onClick={() => setIsEditingTitle(true)}
              className="text-xs font-bold text-slate-800 hover:text-violet-600 transition-colors truncate max-w-[140px] sm:max-w-[200px] text-left cursor-pointer group flex items-center gap-1.5"
              title="Click to rename"
            >
              <span className="truncate">{resumeTitle || 'Untitled Resume'}</span>
              <span className="text-[10px] text-slate-400 group-hover:text-violet-500">✎</span>
            </button>
          )}

          {/* Auto-save status */}
          <div className="hidden sm:flex items-center gap-1 text-[11px] text-slate-500 shrink-0">
            {isSaving ? (
              <span className="flex items-center gap-1 text-violet-600">
                <Loader2 className="w-3 h-3 animate-spin" />
                <span>Saving...</span>
              </span>
            ) : (
              <span className="flex items-center gap-1 text-slate-400">
                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                <span className="hidden lg:inline">Saved</span>
              </span>
            )}
          </div>
        </div>

        {/* Undo / Redo Buttons */}
        <div className="hidden md:flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200 shrink-0 ml-1">
          <button
            type="button"
            disabled={!canUndo}
            onClick={onUndo}
            className="p-1 text-slate-600 hover:text-slate-900 hover:bg-white rounded transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            title="Undo (Ctrl+Z)"
          >
            <Undo2 className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            disabled={!canRedo}
            onClick={onRedo}
            className="p-1 text-slate-600 hover:text-slate-900 hover:bg-white rounded transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            title="Redo (Ctrl+Y)"
          >
            <Redo2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Right: AI Tools, ATS Analyzer, Share, & Export Dropdown */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* ATS Score Button */}
        <button
          type="button"
          onClick={onOpenATS}
          className="px-2.5 py-1.5 rounded-lg border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/50 text-slate-700 hover:text-emerald-700 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
          title="Analyze ATS Score"
        >
          <BarChart3 className="w-3.5 h-3.5 text-emerald-600" />
          <span className="hidden xl:inline">ATS Score</span>
          <span className="bg-emerald-100 text-emerald-800 text-[10px] px-1.5 py-0.2 rounded-full font-black">
            85%
          </span>
        </button>

        {/* AI Cover Letter Button */}
        <button
          type="button"
          onClick={onOpenCoverLetter}
          className="hidden lg:flex px-2.5 py-1.5 rounded-lg border border-slate-200 hover:border-violet-300 hover:bg-violet-50/50 text-slate-700 hover:text-violet-700 text-xs font-bold transition-all items-center gap-1.5 cursor-pointer shadow-2xs"
          title="Generate Matching Cover Letter"
        >
          <Sparkles className="w-3.5 h-3.5 text-violet-600" />
          <span>Cover Letter</span>
        </button>

        {/* Import Resume Button */}
        <button
          type="button"
          onClick={onOpenImport}
          className="hidden sm:flex px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-all items-center gap-1.5 cursor-pointer shadow-2xs"
          title="Import from PDF or Word"
        >
          <Upload className="w-3.5 h-3.5 text-slate-500" />
          <span className="hidden xl:inline">Import</span>
        </button>

        {/* Voice & AI Assistant Button */}
        <button
          type="button"
          onClick={onOpenVoiceAI}
          className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-black text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs border border-amber-400/40"
          title="Open Voice & AI Commands"
        >
          <Mic className="w-3.5 h-3.5 text-rose-400" />
          <span className="hidden md:inline">Voice &amp; AI</span>
        </button>

        {/* Share Button */}
        <button
          type="button"
          onClick={onOpenShare}
          className="hidden sm:flex px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-all items-center gap-1.5 cursor-pointer shadow-2xs"
          title="Share Web Link"
        >
          <Share2 className="w-3.5 h-3.5 text-slate-500" />
          <span className="hidden xl:inline">Share</span>
        </button>

        {/* AI Credits Indicator */}
        <div className="hidden xl:block">
          <AICreditsIndicator
            creditsRemaining={aiCreditsInfo.creditsRemaining}
            creditsLimit={aiCreditsInfo.creditsLimit}
            isUnlimited={aiCreditsInfo.isUnlimited}
            plan={userTier || 'free'}
          />
        </div>

        {/* Download / Export Button Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowExportMenu(!showExportMenu)}
            disabled={isExporting}
            className="px-3 sm:px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white rounded-lg text-xs font-extrabold flex items-center gap-1.5 shadow-md shadow-violet-500/20 transition-all cursor-pointer disabled:opacity-50"
          >
            {isExporting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
            <span>{isExporting ? 'Exporting...' : 'Download'}</span>
            <ChevronDown className="w-3 h-3 ml-0.5" />
          </button>

          {/* Export Dropdown Menu */}
          {showExportMenu && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowExportMenu(false)} />
              <div className="absolute right-0 top-full mt-1.5 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
                <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                  Export Options
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setShowExportMenu(false);
                    onExport('pdf');
                  }}
                  className="w-full px-3.5 py-2.5 text-left flex items-center justify-between text-xs text-slate-800 hover:bg-violet-50 hover:text-violet-700 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-violet-600" />
                    <div>
                      <div className="font-bold">PDF Document</div>
                      <div className="text-[10px] text-slate-400">ATS Optimized Vector PDF</div>
                    </div>
                  </div>
                  <span className="text-[9px] font-bold bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">
                    ATS ✓
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowExportMenu(false);
                    onExport('docx');
                  }}
                  className="w-full px-3.5 py-2 text-left flex items-center gap-2 text-xs text-slate-700 hover:bg-violet-50 hover:text-violet-700 transition-colors cursor-pointer"
                >
                  <FileCode className="w-4 h-4 text-blue-600" />
                  <div>
                    <div className="font-semibold">Word Document (.docx)</div>
                    <div className="text-[10px] text-slate-400">Editable Microsoft Word</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowExportMenu(false);
                    onExport('txt');
                  }}
                  className="w-full px-3.5 py-2 text-left flex items-center gap-2 text-xs text-slate-700 hover:bg-violet-50 hover:text-violet-700 transition-colors cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-slate-500" />
                  <div>
                    <div className="font-semibold">Plain Text (.txt)</div>
                    <div className="text-[10px] text-slate-400">Raw text for online forms</div>
                  </div>
                </button>

                <div className="border-t border-slate-100 my-1" />

                <button
                  type="button"
                  onClick={() => {
                    setShowExportMenu(false);
                    onExport('png');
                  }}
                  className="w-full px-3.5 py-2 text-left flex items-center justify-between text-xs text-slate-700 hover:bg-violet-50 hover:text-violet-700 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-emerald-600" />
                    <div className="font-semibold">High-Res PNG Image</div>
                  </div>
                  {userTier !== 'pro' && userTier !== 'lifetime' && (
                    <span className="text-[9px] font-bold bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded">
                      PRO
                    </span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowExportMenu(false);
                    onExport('jpg');
                  }}
                  className="w-full px-3.5 py-2 text-left flex items-center justify-between text-xs text-slate-700 hover:bg-violet-50 hover:text-violet-700 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-amber-600" />
                    <div className="font-semibold">High-Res JPG Image</div>
                  </div>
                  {userTier !== 'pro' && userTier !== 'lifetime' && (
                    <span className="text-[9px] font-bold bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded">
                      PRO
                    </span>
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
