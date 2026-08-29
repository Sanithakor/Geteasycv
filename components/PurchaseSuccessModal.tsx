'use client';

import React from 'react';
import { Sparkles, CheckCircle2, ArrowRight, ShieldCheck, Zap, X } from 'lucide-react';

interface PurchaseSuccessModalProps {
  isOpen: boolean;
  planName?: string;
  onClose: () => void;
}

export default function PurchaseSuccessModal({
  isOpen,
  planName = 'Pro',
  onClose,
}: PurchaseSuccessModalProps) {
  if (!isOpen) return null;

  const formattedPlan = planName ? planName.charAt(0).toUpperCase() + planName.slice(1) : 'Pro';

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-md transition-opacity animate-in fade-in"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 transform transition-all animate-in zoom-in-95 duration-200">
        {/* Top Decorative Banner */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 p-8 text-center text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="w-16 h-16 rounded-full bg-white text-emerald-600 mx-auto flex items-center justify-center shadow-lg border-4 border-emerald-100 mb-3 animate-bounce">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-extrabold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            PAYMENT CONFIRMED
          </span>

          <h2 className="text-2xl font-black tracking-tight">
            Purchase Successful!
          </h2>
          <p className="text-emerald-100 text-xs mt-1 font-medium">
            Your GetEasyCV <span className="font-bold underline">{formattedPlan} Plan</span> is now active.
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
              UNLOCKED FEATURES &amp; CAPABILITIES:
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm font-semibold text-slate-800">
              <li className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 text-xs font-bold">✓</span>
                <span>All Premium &amp; ATS Resume Templates Unlocked</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 text-xs font-bold">✓</span>
                <span>High-Resolution PDF &amp; Image Downloads Active</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 text-xs font-bold">✓</span>
                <span>AI Bullet Point Rewriter &amp; Smart Suggestions</span>
              </li>
            </ul>
          </div>

          {/* Action Button */}
          <div className="space-y-3 pt-2">
            <button
              onClick={onClose}
              className="w-full py-3.5 px-6 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <span>Back to Templates &amp; Create CV</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-center text-[11px] text-slate-400 font-medium">
              You can start building or downloading your resume immediately.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
