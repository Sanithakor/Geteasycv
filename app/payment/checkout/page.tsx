'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Navigation from '@/components/Navigation';
import InnerBanner from '@/components/InnerBanner';
import Footer from '@/components/Footer';
import { useAuthStore } from '@/lib/store/authStore';
import { useAuthModalStore } from '@/lib/store/authModalStore';
import AuthModal from '@/components/auth/AuthModal';
import {
  CreditCard,
  Check,
  ShieldCheck,
  Zap,
  Lock,
  Loader2,
  AlertCircle,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
} from 'lucide-react';
import toast from 'react-hot-toast';

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const planId = (searchParams.get('plan') || 'pro').toLowerCase();
  const fromUrl = searchParams.get('from') || '/templates';

  const { isAuthenticated, user, token, _hydrated } = useAuthStore();
  const { openLogin } = useAuthModalStore();

  const [planDetails, setPlanDetails] = useState<any>(null);
  const [loadingPlan, setLoadingPlan] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  // Fetch plan info dynamically from /api/plans
  useEffect(() => {
    fetchPlans();
  }, [planId]);

  const fetchPlans = async () => {
    setLoadingPlan(true);
    try {
      const res = await fetch('/api/plans');
      const data = await res.json();
      if (res.ok && data.success && Array.isArray(data.data)) {
        const found = data.data.find(
          (p: any) => p.id.toLowerCase() === planId || p.name.toLowerCase() === planId
        );
        if (found) {
          setPlanDetails(found);
        } else {
          // Fallback static structure
          setPlanDetails({
            id: planId,
            name: planId.charAt(0).toUpperCase() + planId.slice(1),
            price: planId === 'starter' ? '₹49' : planId === 'lifetime' ? '₹999' : '₹199',
            rawPrice: planId === 'starter' ? 49 : planId === 'lifetime' ? 999 : 199,
            period: planId === 'starter' || planId === 'lifetime' ? 'one-time payment' : 'month',
            description: 'Access all premium templates, high-res PDF exports, and AI tools.',
            features: [
              'All ATS & Premium Templates Unlocked',
              'High-Resolution PDF & Image Exports',
              'AI Resume Bullet Point Rewriter',
              'Unlimited Resume Creation & Downloads',
            ],
          });
        }
      }
    } catch (err) {
      console.error('[CHECKOUT_FETCH_PLANS_ERROR]', err);
    } finally {
      setLoadingPlan(false);
    }
  };

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

  const handleStartPayment = async () => {
    setPaymentError(null);

    // 1. Enforce Authentication
    if (!_hydrated || !isAuthenticated || !user) {
      toast.error('Please sign in to complete your checkout.');
      const callbackPath = `/payment/checkout?plan=${planId}&from=${encodeURIComponent(fromUrl)}`;
      openLogin(callbackPath);
      return;
    }

    setIsProcessing(true);

    try {
      // 2. Load Razorpay SDK
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        setPaymentError('Could not load Razorpay payment gateway. Please check your network connection.');
        toast.error('Could not load Razorpay checkout.');
        setIsProcessing(false);
        return;
      }

      // 3. Create Order Server-Side
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      };

      const orderRes = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers,
        body: JSON.stringify({ plan: planId }),
      });

      const orderData = await orderRes.json();

      if (!orderRes.ok || !orderData.orderId) {
        setPaymentError(orderData.error || 'Failed to create payment order. Please try again.');
        toast.error(orderData.error || 'Failed to create payment order.');
        setIsProcessing(false);
        return;
      }

      // 4. Open Razorpay Checkout Modal
      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency || 'INR',
        name: 'GetEasyCV',
        description: `GetEasyCV ${planDetails?.name || planId.toUpperCase()} Plan Checkout`,
        order_id: orderData.orderId,
        handler: async function (response: any) {
          toast.loading('Verifying payment details...', { id: 'razorpay-verify' });
          try {
            const verifyRes = await fetch('/api/razorpay/verify-payment', {
              method: 'POST',
              headers,
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
              toast.success('Payment verified successfully!', { id: 'razorpay-verify' });
              // Redirect back to templates page with success query parameter
              const targetRedirect = `${fromUrl}${fromUrl.includes('?') ? '&' : '?'}purchase=success&plan=${planId}`;
              router.push(targetRedirect);
            } else {
              setPaymentError(verifyData.error || 'Payment verification failed.');
              toast.error(verifyData.error || 'Payment verification failed.', { id: 'razorpay-verify' });
              setIsProcessing(false);
            }
          } catch {
            setPaymentError('Error verifying payment response.');
            toast.error('Error verifying payment response.', { id: 'razorpay-verify' });
            setIsProcessing(false);
          }
        },
        prefill: {
          name: user.name || '',
          email: user.email || '',
        },
        theme: {
          color: '#0F0F0F',
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
            setPaymentError('Payment was cancelled. Your card was not charged.');
            toast('Payment checkout cancelled.', { icon: 'ℹ️' });
          },
        },
      };

      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
    } catch (err: any) {
      setPaymentError(err?.message || 'Network error during checkout.');
      toast.error('Network error during checkout.');
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Navigation />
      <AuthModal />
      <main className="min-h-screen bg-[#F8F8F6] font-sans pb-20">
        <InnerBanner
          badge="Secure Checkout"
          badgeIcon={Lock}
          breadcrumbs={[
            { label: 'Pricing', href: '/pricing' },
            { label: 'Checkout', href: `/payment/checkout?plan=${planId}` },
          ]}
          variant="center"
          title="Complete Your Order for"
          highlightText={planDetails?.name || 'Pro Plan'}
          description="Instant activation. Full access to premium templates, PDF exports, and AI writing tools."
          features={['Instant Activation', 'Encrypted 256-bit SSL Payment', '100% Refund Guarantee']}
        />

        <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
          {/* Back button */}
          <button
            onClick={() => router.push('/pricing')}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 mb-6 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Pricing Plans</span>
          </button>

          {/* Cancellation / Failure Error Banner */}
          {paymentError && (
            <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-start gap-3 text-rose-800 text-sm font-semibold animate-in fade-in duration-200">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-bold">Payment Status Update:</p>
                <p className="text-xs text-rose-700 mt-0.5">{paymentError}</p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Left: Plan Summary & Features */}
            <div className="md:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
              <div>
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-[#FEE1CF] text-[#0F0F0F] text-xs font-extrabold uppercase rounded-full tracking-wider">
                    Selected Plan
                  </span>
                  <span className="text-xs font-bold text-slate-400">100% Safe &amp; Secure</span>
                </div>
                <h2 className="text-2xl font-black text-slate-900 mt-2">
                  {planDetails?.name || 'Pro'} Plan Access
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  {planDetails?.description || 'Access all premium ATS templates and AI writing features.'}
                </p>
              </div>

              {/* Price Row */}
              <div className="flex items-baseline justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Due Now</span>
                <div className="text-right">
                  <span className="text-3xl font-black text-slate-900">{planDetails?.price || '₹199'}</span>
                  <span className="text-xs font-medium text-slate-500 block">/ {planDetails?.period || 'month'}</span>
                </div>
              </div>

              {/* Included Features */}
              <div className="space-y-3 pt-2">
                <p className="text-xs font-extrabold uppercase tracking-wider text-slate-400">INCLUDED IN THIS PLAN:</p>
                <ul className="space-y-2.5">
                  {(planDetails?.features || [
                    'All ATS & Premium Templates Unlocked',
                    'High-Resolution PDF & Image Exports',
                    'AI Bullet Point Rewriter',
                    'Unlimited CV Creation & Downloads',
                  ]).map((feat: string, idx: number) => (
                    <li key={idx} className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-700">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs shrink-0 font-bold">✓</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: Payment Authorization & Checkout Trigger */}
            <div className="md:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
              <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#F3645C]" />
                <span>Account &amp; Checkout</span>
              </h3>

              {/* Account Status Badge */}
              {_hydrated && isAuthenticated && user ? (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-1">
                  <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Logged In Account:</span>
                  </div>
                  <p className="text-sm font-extrabold text-slate-900 truncate">{user.name || user.email}</p>
                  <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                </div>
              ) : (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-800 space-y-2">
                  <p className="font-bold flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    Authentication Required
                  </p>
                  <p className="text-amber-700">Please sign in or create an account to bind your plan subscription.</p>
                </div>
              )}

              {/* Payment Method Badge */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-600">
                  <span>Payment Gateway:</span>
                  <span className="text-slate-900 font-extrabold">Razorpay Secure</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Supports UPI (Google Pay, PhonePe, Paytm), Credit Cards, Debit Cards, and Net Banking.
                </p>
              </div>

              {/* Pay Button */}
              <button
                onClick={handleStartPayment}
                disabled={isProcessing}
                className="w-full py-4 px-6 bg-[#0F0F0F] hover:bg-[#262626] text-white font-black text-sm rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Processing Payment...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-5 h-5 text-[#F5D17B]" />
                    <span>Pay {planDetails?.price || '₹199'} &amp; Unlock Plan</span>
                  </>
                )}
              </button>

              <div className="text-center space-y-1">
                <p className="text-[11px] text-slate-400 font-medium">
                  🔒 Encrypted transaction. Instant account access upon verification.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500 font-bold text-sm">
          Loading payment checkout...
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}
