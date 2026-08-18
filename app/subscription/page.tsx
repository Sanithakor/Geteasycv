'use client';

import React, { useState } from 'react';
import UserLayout from '@/components/layout/UserLayout';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { CreditCard, Check, Sparkles, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    price: '₹49',
    period: 'one-time payment',
    description: 'Perfect for quick single resume creation.',
    features: [
      '1 CV Creation',
      'High-resolution PDF download',
      'Access to core templates',
      'No recurring payment',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '₹199',
    period: 'per month',
    description: 'For active job seekers looking to maximize interviews.',
    features: [
      'Unlimited CVs & Downloads',
      'All premium templates',
      'PDF, PNG, JPG Exports',
      'AI Resume Bullet Rewriter',
      'Cancel anytime',
    ],
    popular: true,
  },
  {
    id: 'lifetime',
    name: 'Lifetime',
    price: '₹999',
    period: 'one-time payment',
    description: 'Permanent access for serious career growth.',
    features: [
      'Everything in Pro',
      'Lifetime Unlimited Access',
      'Future Premium Templates',
      'Priority Customer Support',
    ],
  },
];

export default function UserSubscriptionPage() {
  const router = useRouter();
  const { user, token } = useAuthStore();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const currentTier = (user?.tier || (user as any)?.subscriptionTier || 'free').toLowerCase();

  const handleCheckout = (planId: string) => {
    router.push(`/pricing?plan=${planId}`);
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
