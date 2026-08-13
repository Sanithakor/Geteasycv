'use client';

import React, { useState } from 'react';
import UserLayout from '@/components/layout/UserLayout';
import { useAuthStore } from '@/lib/store/authStore';
import { CreditCard, Check, Sparkles, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const PLANS = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Essential tools to create your first professional resume.',
    features: ['3 Resumes', '10 AI Credits / month', 'PDF Export', 'Standard Templates'],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$12',
    period: 'per month',
    description: 'Supercharge your job search with AI optimizations and unlimited downloads.',
    features: ['Unlimited Resumes', '500 AI Credits / month', 'PDF, PNG, JPG Exports', 'All Premium Templates', 'ATS Resume Match Score'],
    popular: true,
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '$29',
    period: 'per month',
    description: 'Complete career toolkit with 1-on-1 AI cover letter & LinkedIn generator.',
    features: ['Everything in Pro', 'Unlimited AI Credits', 'Custom Branding & Domains', 'Priority Support', 'Cover Letter Builder'],
  },
];

export default function UserSubscriptionPage() {
  const { user, token } = useAuthStore();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const currentTier = (user?.tier || (user as any)?.subscriptionTier || 'free').toLowerCase();

  const handleCheckout = async (planId: string) => {
    if (planId === 'free') return;
    setLoadingPlan(planId);
    toast.loading('Redirecting to checkout...', { id: 'checkout' });

    try {
      // 1. Try Lemon Squeezy API
      const res = await fetch('/api/lemon-squeezy/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : '',
        },
        body: JSON.stringify({ plan: planId }),
      });

      const data = await res.json();
      toast.dismiss('checkout');

      if (data.url) {
        window.location.href = data.url;
      } else {
        toast.success(`Upgraded to ${planId.toUpperCase()} plan!`);
      }
    } catch (err) {
      console.error('[CHECKOUT_ERROR]', err);
      toast.dismiss('checkout');
      toast.error('Checkout failed. Please try again.');
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <UserLayout>
      <div className="max-w-5xl mx-auto space-y-8">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
            <CreditCard className="w-6 h-6 text-teal-600" />
            <span>Subscription & Billing</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage your subscription plan, billing details, and active feature access.
          </p>
        </div>

        {/* Current Plan Overview Card */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-md p-6 sm:p-8 text-white shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-500/20 text-teal-300 border border-teal-500/30">
              Active Tier: {currentTier.toUpperCase()}
            </span>
            <h2 className="text-2xl font-bold capitalize">{currentTier} Account Plan</h2>
            <p className="text-sm text-slate-300">
              You have active access to templates, live resume builder, and PDF exports.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {currentTier === 'free' && (
              <button
                onClick={() => handleCheckout('pro')}
                className="flex items-center gap-2 px-6 py-3 rounded-md bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm shadow-md transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Upgrade to Pro</span>
              </button>
            )}
          </div>
        </div>

        {/* Plans Grid */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900">Available Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PLANS.map((plan) => {
              const isCurrent = currentTier === plan.id;
              const isLoadingThis = loadingPlan === plan.id;

              return (
                <div
                  key={plan.name}
                  className={`bg-white border rounded-md p-6 flex flex-col justify-between space-y-6 relative shadow-xs ${
                    plan.popular
                      ? 'border-teal-500 ring-2 ring-teal-500/20'
                      : 'border-slate-200'
                  }`}
                >
                  {plan.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-teal-600 text-white font-bold text-[10px] uppercase tracking-wider shadow-sm">
                      Most Popular
                    </span>
                  )}

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
                      <p className="text-xs text-slate-500 mt-1 min-h-[32px]">{plan.description}</p>
                    </div>

                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-slate-900">{plan.price}</span>
                      <span className="text-xs text-slate-500">/ {plan.period}</span>
                    </div>

                    <ul className="space-y-2.5 pt-4 border-t border-slate-100">
                      {plan.features.map((feat) => (
                        <li key={feat} className="flex items-center gap-2 text-xs text-slate-700">
                          <Check className="w-4 h-4 text-teal-600 flex-shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => handleCheckout(plan.id)}
                    disabled={isCurrent || isLoadingThis}
                    className={`w-full py-3 rounded-md font-bold text-sm transition-all cursor-pointer ${
                      isCurrent
                        ? 'bg-slate-100 text-slate-500 cursor-default'
                        : 'bg-slate-900 hover:bg-slate-800 text-white shadow-md'
                    }`}
                  >
                    {isCurrent ? 'Current Plan' : isLoadingThis ? 'Processing...' : `Upgrade to ${plan.name}`}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </UserLayout>
  );
}
