'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle2, Sparkles, ArrowRight, LayoutTemplate, RefreshCw, FileText } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PurchaseSuccessModal from '@/components/PurchaseSuccessModal';

function PaymentSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const planParam = searchParams.get('plan') || 'Pro';
  const fromParam = searchParams.get('from') || '/templates';
  const planFormatted = planParam.charAt(0).toUpperCase() + planParam.slice(1);

  const [isVerifying, setIsVerifying] = useState(true);
  const [activePlan, setActivePlan] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    let attempts = 0;
    const interval = setInterval(async () => {
      attempts++;
      try {
        const res = await fetch('/api/auth/me');
        const data = await res.json();
        if (res.ok && data.user) {
          const currentPlan = data.user.subscriptionTier || 'free';
          if (currentPlan !== 'free' || attempts >= 5) {
            setActivePlan(currentPlan);
            setIsVerifying(false);
            clearInterval(interval);
          }
        }
      } catch (err) {
        if (attempts >= 5) {
          setIsVerifying(false);
          clearInterval(interval);
        }
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
    router.push(fromParam);
  };

  return (
    <>
      <PurchaseSuccessModal
        isOpen={showModal}
        planName={planFormatted}
        onClose={handleCloseModal}
      />

      <div className="bg-white border border-slate-200/80 rounded-2xl p-8 sm:p-12 shadow-sm space-y-6">
        {/* Animated Icon */}
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center border-4 border-emerald-50">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        {/* Title & Subtitle */}
        <div className="space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            PAYMENT CONFIRMED
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Welcome to GetEasyCV {planFormatted}!
          </h1>
          <p className="text-slate-600 text-sm leading-relaxed">
            Thank you for upgrading. Your transaction has been processed securely via Razorpay.
          </p>
        </div>

        {/* Verification State */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-left text-xs text-slate-600 space-y-2">
          <div className="flex items-center justify-between font-bold text-slate-900 border-b border-slate-200 pb-2">
            <span>Selected Plan:</span>
            <span className="text-purple-600 uppercase font-black">{planFormatted}</span>
          </div>

          {isVerifying ? (
            <div className="flex items-center gap-2 text-purple-600 font-semibold py-1">
              <RefreshCw className="w-4 h-4 animate-spin shrink-0" />
              <span>Syncing plan access with database...</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-emerald-600 font-bold py-1">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Your Premium plan access is active!</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/templates"
            className="w-full sm:w-auto px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <LayoutTemplate className="w-4 h-4" />
            <span>Back to Templates</span>
          </Link>

          <Link
            href="/editor"
            className="w-full sm:w-auto px-6 py-3.5 bg-[#FF570F] hover:bg-[#E04800] text-white font-bold text-xs sm:text-sm rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <FileText className="w-4 h-4" />
            <span>Create Resume Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </>
  );
}

export default function PaymentSuccessPage() {
  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-slate-50 font-sans py-16 sm:py-24 flex items-center justify-center">
        <div className="max-w-xl w-full mx-auto px-4 text-center">
          <Suspense fallback={
            <div className="bg-white border border-slate-200 rounded-xl p-12 text-center text-slate-500 font-semibold text-sm">
              Loading payment confirmation...
            </div>
          }>
            <PaymentSuccessContent />
          </Suspense>
        </div>
      </div>
      <Footer />
    </>
  );
}
