'use client';

import React, { useState } from 'react';
import { X, Share2, Copy, Check, ExternalLink, Globe, Lock } from 'lucide-react';
import toast from 'react-hot-toast';

interface ShareResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  resumeId: string | null;
  candidateName: string;
}

export default function ShareResumeModal({
  isOpen,
  onClose,
  resumeId,
  candidateName,
}: ShareResumeModalProps) {
  const [copied, setCopied] = useState(false);
  const [isPublic, setIsPublic] = useState(true);

  if (!isOpen) return null;

  const publicUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/r/${resumeId || 'preview-resume'}`
    : `https://geteasycv.com/r/${resumeId || 'preview-resume'}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    toast.success('Public link copied to clipboard!');
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-violet-500/20 text-violet-400 rounded-md">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Share Public Resume Link</h3>
              <p className="text-xs text-slate-400">Generates a view-only web link for recruiters & hiring managers</p>
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

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* Privacy Toggle */}
          <div className="flex items-center justify-between p-3.5 bg-slate-50 border border-slate-200 rounded-md">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-md ${isPublic ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'}`}>
                {isPublic ? <Globe className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">
                  {isPublic ? 'Public Web Link Active' : 'Private (Only You)'}
                </div>
                <div className="text-[11px] text-slate-500">
                  {isPublic ? 'Anyone with the link can view your live resume' : 'Only logged-in user can access'}
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setIsPublic(!isPublic);
                toast.success(isPublic ? 'Resume set to private' : 'Resume link activated!');
              }}
              className={`px-3 py-1 text-xs font-bold rounded-md transition-colors cursor-pointer ${
                isPublic ? 'bg-emerald-600 text-white hover:bg-emerald-700' : 'bg-slate-300 text-slate-700 hover:bg-slate-400'
              }`}
            >
              {isPublic ? 'Enabled' : 'Enable Link'}
            </button>
          </div>

          {/* Copy Link Input Bar */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
              Shareable Web URL
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={publicUrl}
                className="flex-1 px-3.5 py-2.5 text-xs font-mono bg-slate-100 border border-slate-300 rounded-md text-slate-800 select-all focus:outline-none"
              />
              <button
                type="button"
                onClick={handleCopy}
                className="px-4 py-2.5 text-xs font-bold bg-violet-600 text-white hover:bg-violet-700 rounded-md transition-colors flex items-center gap-1.5 shrink-0 shadow-xs cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied!' : 'Copy Link'}</span>
              </button>
            </div>
          </div>

          {/* Tips Box */}
          <div className="p-3 bg-violet-50 border border-violet-200 rounded-md text-xs text-violet-900">
            <span className="font-bold">Pro Tip:</span> Share this live link on your LinkedIn profile or email signature. Any updates you save in GetEasyCV will immediately reflect on your live link!
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-200 rounded-md transition-colors cursor-pointer"
          >
            Close
          </button>
          <a
            href={publicUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-xs font-bold text-slate-800 bg-white border border-slate-300 hover:bg-slate-50 rounded-md transition-colors flex items-center gap-1.5 shadow-2xs"
          >
            <span>Open Link Preview</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
