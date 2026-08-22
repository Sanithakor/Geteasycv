'use client';

import React from 'react';
import { 
  Lock, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  X, 
  Crown, 
  Download, 
  Zap, 
  ShieldCheck 
} from 'lucide-react';

interface DownloadLimitModalProps {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
  redirectUrl?: string;
}

export default function DownloadLimitModal({
  isOpen,
  onClose,
  message,
  redirectUrl = '/pricing?reason=download_limit',
}: DownloadLimitModalProps) {
  if (!isOpen) return null;

  const handleGoToPayment = () => {
    window.location.href = redirectUrl;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      {/* Click outside to close */}
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl border border-slate-200/80 z-10 animate-in zoom-in-95 duration-200">
        {/* Header with Gradient & Decorative Elements */}
        <div className="relative bg-gradient-to-r from-[#FF570F] via-[#FF570F] to-[#FF570F] p-6 text-white overflow-hidden">
          {/* Background Glow */}
          <div className="absolute -right-6 -top-6 w-32 h-32 rounded-full bg-white/10 blur-xl pointer-events-none" />
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/20">
              <Crown className="w-5 h-5 text-amber-300 fill-amber-300" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/20 border border-amber-300/30 text-amber-200 text-[11px] font-bold uppercase tracking-wider mb-0.5">
                <Sparkles className="w-3 h-3 text-amber-300" />
                <span>Limit Reached</span>
              </div>
              <h3 className="text-xl font-extrabold text-white tracking-tight">
                Upgrade to Download Your CV
              </h3>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          {/* Message Display */}
          <div className="rounded-xl bg-[#FFF8F5]/80 border border-[#FF570F] p-4 flex gap-3">
            <Lock className="w-5 h-5 text-[#FF570F] shrink-0 mt-0.5" />
            <p className="text-sm text-slate-700 leading-relaxed font-medium">
              {message ||
                "You have used your free account download allowance (1/1 CV downloads used). Upgrade to GetEasyCV Pro to unlock unlimited downloads, all 22+ ATS templates, and AI resume enhancement."}
            </p>
          </div>

          {/* Feature List */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
              What you get with Pro:
            </h4>
            <div className="grid grid-cols-1 gap-2.5">
              <div className="flex items-center gap-3 p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-800">
                <div className="w-6 h-6 rounded-md bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <Download className="w-3.5 h-3.5" />
                </div>
                <span>Unlimited PDF, Word (.docx), and High-Res Exports</span>
              </div>

              <div className="flex items-center gap-3 p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-800">
                <div className="w-6 h-6 rounded-md bg-[#FFF0EB] text-[#FF570F] flex items-center justify-center shrink-0">
                  <Zap className="w-3.5 h-3.5" />
                </div>
                <span>Access all 22+ ATS-Optimized Premium Templates</span>
              </div>

              <div className="flex items-center gap-3 p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-800">
                <div className="w-6 h-6 rounded-md bg-[#FFF0EB] text-[#FF570F] flex items-center justify-center shrink-0">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <span>Unlimited OpenAI Assistant & ATS Scoring</span>
              </div>

              <div className="flex items-center gap-3 p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs font-semibold text-slate-800">
                <div className="w-6 h-6 rounded-md bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <span>No Watermarks + Priority Customer Support</span>
              </div>
            </div>
          </div>

          {/* Modal Action Footer */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold text-xs transition-colors cursor-pointer"
            >
              Maybe Later
            </button>

            <button
              type="button"
              onClick={handleGoToPayment}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#FF570F] via-[#FF570F] to-[#FF570F] hover:from-violet-700 hover:to-[#E04800] text-white font-extrabold text-xs shadow-md hover:shadow-[#FF570F]/25 transition-all flex items-center justify-center gap-2 cursor-pointer group"
            >
              <span>Go to Payment / Upgrade Now</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
