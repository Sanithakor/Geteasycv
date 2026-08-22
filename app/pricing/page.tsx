'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Navigation from '@/components/Navigation';
import ReadyToBuild from '@/components/sections/ReadyToBuild';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  HelpCircle,
  CreditCard,
  Loader2,
  Check,
  Star,
  Award,
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

const PRICING_PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    price: '₹49',
    rawPrice: 49,
    period: 'one-time payment',
    description: 'Perfect for quick single resume creation.',
    features: [
      '1 CV',
      'Basic premium features',
      'High-resolution PDF download',
      'Access to core templates',
      'No recurring payment',
    ],
    cta: 'Buy Starter',
    highlight: false,
    badge: null,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '₹199',
    rawPrice: 199,
    period: 'month',
    description: 'For active job seekers looking to maximize interviews.',
    features: [
      'Unlimited CVs',
      'All premium templates',
      'High-resolution PDF download',
      'All premium customization features',
      'AI Resume Bullet Rewriter',
      'Future premium templates included',
      'Cancel anytime',
    ],
    cta: 'Start Pro',
    highlight: true,
    badge: 'MOST POPULAR',
  },
  {
    id: 'lifetime',
    name: 'Lifetime',
    price: '₹999',
    rawPrice: 999,
    period: 'one-time payment',
    description: 'Permanent access for serious career growth.',
    features: [
      'Unlimited CVs',
      'All premium templates',
      'High-resolution PDF download',
      'All premium customization features',
      'Future premium features & templates',
      'Lifetime access & updates',
      'No recurring payment',
    ],
    cta: 'Get Lifetime',
    highlight: false,
    badge: 'BEST VALUE',
  },
];

const FAQS = [
  {
    question: 'How does the ₹49 Starter plan work?',
    answer: 'The Starter plan is a one-time ₹49 payment that allows you to create and download 1 complete premium resume with zero recurring subscriptions.',
  },
  {
    question: 'Can I cancel my Pro subscription at any time?',
    answer: 'Yes! You can cancel your ₹199/month Pro subscription at any time from your account settings. You will keep full access until the end of your billing period.',
  },
  {
    question: 'What is included in the ₹999 Lifetime plan?',
    answer: 'Lifetime gives you permanent unlimited access to create as many resumes as you want, all current and future premium templates, and AI features forever with a single payment.',
  },
  {
    question: 'Are GetEasyCV templates ATS-friendly?',
    answer: 'Yes! Every template is engineered and tested against major Applicant Tracking Systems (Workday, Greenhouse, Lever) for 100% scanning accuracy.',
  },
];

function PricingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reason = searchParams.get('reason');
  const autoPlan = searchParams.get('plan');
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [autoCheckoutTriggered, setAutoCheckoutTriggered] = useState(false);

  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if ((window as any).Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleSelectPlan = async (planId: string) => {
    setLoadingPlan(planId);
    try {
      // 1. Verify Authentication Server-Side
      const authRes = await fetch('/api/auth/me');
      const authData = await authRes.json();

      if (!authRes.ok || !authData.user) {
        toast.error('Please sign in or create an account to choose a plan.');
        const targetCallback = encodeURIComponent(`/pricing?plan=${planId}`);
        router.push(`/login?callbackUrl=${targetCallback}`);
        return;
      }

      // 2. Load Razorpay Checkout Script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        toast.error('Could not load Razorpay payment gateway. Please check your internet connection.');
        setLoadingPlan(null);
        return;
      }

      // 3. Create Razorpay Order Server-Side
      const orderRes = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: planId }),
      });

      const orderData = await orderRes.json();

      if (!orderRes.ok || !orderData.orderId) {
        toast.error(orderData.error || 'Failed to create payment order. Please try again.');
        setLoadingPlan(null);
        return;
      }

      // 4. Trigger Razorpay Payment Modal
      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency || 'INR',
        name: 'GetEasyCV',
        description: `GetEasyCV ${planId.toUpperCase()} Plan Upgrade`,
        order_id: orderData.orderId,
        handler: async function (response: any) {
          toast.loading('Verifying payment...', { id: 'razorpay-verify' });
          try {
            const verifyRes = await fetch('/api/razorpay/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                plan: planId,
                isSimulation: orderData.isSimulation,
              }),
            });

            const verifyData = await verifyRes.json();

            if (verifyRes.ok && verifyData.success) {
              toast.success('Payment verified! Activating plan...', { id: 'razorpay-verify' });
              router.push(`/payment/success?plan=${planId}`);
            } else {
              toast.error(verifyData.error || 'Payment verification failed.', { id: 'razorpay-verify' });
              setLoadingPlan(null);
            }
          } catch (verifyErr) {
            toast.error('Error verifying payment response.', { id: 'razorpay-verify' });
            setLoadingPlan(null);
          }
        },
        prefill: {
          name: authData.user?.name || '',
          email: authData.user?.email || '',
        },
        theme: {
          color: '#FF570F',
        },
        modal: {
          ondismiss: function () {
            setLoadingPlan(null);
          },
        },
      };

      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
    } catch (err) {
      toast.error('Network error starting checkout. Please try again.');
      setLoadingPlan(null);
    }
  };

  useEffect(() => {
    if (autoPlan && !autoCheckoutTriggered) {
      setAutoCheckoutTriggered(true);
      fetch('/api/auth/me')
        .then((res) => res.json())
        .then((data) => {
          if (data?.user) {
            handleSelectPlan(autoPlan);
          }
        })
        .catch(() => {});
    }
  }, [autoPlan, autoCheckoutTriggered]);

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-slate-50 font-sans py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {reason === 'download_limit' && (
            <div className="max-w-2xl mx-auto mb-8 p-4 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-xs sm:text-sm font-bold flex items-center justify-center gap-2.5 animate-in fade-in duration-200">
              <Sparkles className="w-5 h-5 text-amber-600 shrink-0" />
              <span>You've reached the free account limit (1 download used). Select a plan below to continue downloading your CV!</span>
            </div>
          )}

          {/* Header Badge */}
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFF8F5] border border-[#FFD4C2] text-xs font-bold tracking-wider text-[#FF570F] uppercase shadow-2xs">
              <CreditCard className="w-4 h-4 text-[#FF570F]" />
              SIMPLE &amp; TRANSPARENT PRICING
            </span>
          </div>

          {/* Heading & Subtitle */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Invest in Your Career with GetEasyCV
          </h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-12">
            Choose the plan that fits your job search. One-time options and flexible monthly plans with no hidden fees.
          </p>

          {/* Pricing Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-20">
            {PRICING_PLANS.map((plan) => {
              const isLoading = loadingPlan === plan.id;

              return (
                <div
                  key={plan.id}
                  className={`bg-white rounded-xl border transition-all duration-300 hover:shadow-xl text-left flex flex-col justify-between relative overflow-hidden ${
                    plan.highlight
                      ? 'border-[#FF570F] shadow-xl shadow-[#FF570F]/25 ring-2 ring-[#FF570F]/20'
                      : 'border-slate-200 shadow-xs'
                  }`}
                >
                  {/* Top Ribbon */}
                  {plan.badge && (
                    <div
                      className={`text-white text-[11px] font-bold text-center uppercase tracking-wider py-1.5 px-4 flex items-center justify-center gap-1.5 ${
                        plan.id === 'pro' ? 'bg-[#FF570F]' : 'bg-slate-900'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span>{plan.badge}</span>
                    </div>
                  )}

                  {/* Card Content */}
                  <div className="p-6 sm:p-8 space-y-6 flex-1">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900 mb-1 flex items-center justify-between">
                        <span>{plan.name}</span>
                        {plan.id === 'lifetime' && (
                          <Award className="w-5 h-5 text-amber-500" />
                        )}
                      </h2>
                      <p className="text-slate-500 text-xs sm:text-sm leading-relaxed min-h-[36px]">
                        {plan.description}
                      </p>
                    </div>

                    {/* Price Tag */}
                    <div className="flex items-baseline gap-1.5 py-3 border-y border-slate-100">
                      <span className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                        {plan.price}
                      </span>
                      <span className="text-slate-500 text-xs sm:text-sm font-medium">
                        / {plan.period}
                      </span>
                    </div>

                    {/* Features List */}
                    <div className="space-y-3 pt-2">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        WHAT'S INCLUDED:
                      </p>
                      {plan.features.map((feature, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                          <CheckCircle2 className="w-4 h-4 text-[#FF570F] shrink-0 mt-0.5" />
                          <span className="text-slate-700 font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Action Button */}
                  <div className="p-6 sm:p-8 pt-0">
                    <button
                      type="button"
                      disabled={isLoading}
                      onClick={() => handleSelectPlan(plan.id)}
                      className={`w-full py-3.5 px-4 rounded-md font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs disabled:opacity-60 ${
                        plan.highlight
                          ? 'bg-[#FF570F] hover:bg-[#E04800] text-white shadow-[#FF570F]/25'
                          : 'bg-slate-900 hover:bg-slate-800 text-white'
                      }`}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Preparing Checkout...</span>
                        </>
                      ) : (
                        <>
                          <span>{plan.cta}</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Guarantees Strip */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 max-w-5xl mx-auto">
            <div className="p-6 bg-white border border-slate-200/80 rounded-xl flex items-center gap-4 text-left shadow-2xs">
              <div className="w-12 h-12 rounded-lg bg-[#FFF0EB] text-[#FF570F] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Razorpay Secure Payments</h4>
                <p className="text-slate-500 text-xs">256-Bit SSL Encrypted PCI-DSS Gateway</p>
              </div>
            </div>

            <div className="p-6 bg-white border border-slate-200/80 rounded-xl flex items-center gap-4 text-left shadow-2xs">
              <div className="w-12 h-12 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Instant Access</h4>
                <p className="text-slate-500 text-xs">Unlock All Templates Instantly</p>
              </div>
            </div>

            <div className="p-6 bg-white border border-slate-200/80 rounded-xl flex items-center gap-4 text-left shadow-2xs">
              <div className="w-12 h-12 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                <HelpCircle className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Transparent Pricing</h4>
                <p className="text-slate-500 text-xs">No Contracts or Hidden Fees</p>
              </div>
            </div>
          </div>

          {/* FAQs Section */}
          <div className="max-w-4xl mx-auto bg-white rounded-xl border border-slate-200/80 p-8 sm:p-12 text-left shadow-2xs mb-16">
            <div className="text-center mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
                Frequently Asked Questions
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm">
                Everything you need to know about GetEasyCV plans and billing.
              </p>
            </div>

            <div className="space-y-6">
              {FAQS.map((faq, idx) => (
                <div key={idx} className="border-b border-slate-100 pb-5 last:border-b-0 last:pb-0">
                  <h3 className="font-bold text-slate-900 text-base mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <ReadyToBuild />
      <Footer />
      <Toaster position="bottom-right" />
    </>
  );
}

export default function PricingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-500 font-semibold text-sm">
        Loading pricing options...
      </div>
    }>
      <PricingContent />
    </Suspense>
  );
}

