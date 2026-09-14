'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log technical error details internally for observability
    console.error('[GLOBAL_ERROR_CAUGHT]', error);
  }, [error]);

  return (
    <section className="min-h-screen bg-[#F8F8F6] flex items-center justify-center p-4 sm:p-6 font-sans">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-lg text-center space-y-6">
        
        {/* Warning Icon Badge */}
        <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200/60 flex items-center justify-center mx-auto text-amber-600 shadow-2xs">
          <AlertTriangle className="w-8 h-8" />
        </div>

        {/* Heading & Friendly Subtitle */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F0F0F] tracking-tight">
            Something went wrong
          </h1>
          <p className="text-sm text-slate-600 font-medium leading-relaxed">
            We encountered an unexpected error while processing your request. Please try reloading or return to the homepage.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#0F0F0F] text-white text-xs sm:text-sm font-bold shadow-md hover:bg-[#262626] transition-all hover:scale-102 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-100 text-[#0F0F0F] text-xs sm:text-sm font-bold hover:bg-slate-200 border border-slate-200 transition-all hover:scale-102 cursor-pointer"
          >
            <Home className="w-4 h-4 text-slate-500" />
            <span>Go to Homepage</span>
          </Link>
        </div>

      </div>
    </section>
  );
}
