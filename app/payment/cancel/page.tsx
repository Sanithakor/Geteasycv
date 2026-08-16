'use client';

import React from 'react';
import Link from 'next/link';
import { AlertCircle, ArrowLeft, LayoutDashboard, CreditCard } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function PaymentCancelPage() {
  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-slate-50 font-sans py-16 sm:py-24 flex items-center justify-center">
        <div className="max-w-md w-full mx-auto px-4 text-center">
          <div className="bg-white border border-slate-200/80 rounded-xl p-8 sm:p-10 shadow-sm space-y-6">
            <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 mx-auto flex items-center justify-center border-4 border-amber-50">
              <AlertCircle className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Payment Cancelled
              </h1>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                You cancelled the checkout process. No charges were made to your card or account.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/pricing"
                className="w-full sm:w-auto px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-md transition-all flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Return to Pricing</span>
              </Link>

              <Link
                href="/dashboard"
                className="w-full sm:w-auto px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-md transition-all flex items-center justify-center gap-2"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Go to Dashboard</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
