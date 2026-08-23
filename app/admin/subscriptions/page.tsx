'use client';

import React, { useEffect, useState } from 'react';
import { Plus, CreditCard, Sparkles, TrendingUp, Users } from 'lucide-react';
import { useAuthStore } from '@/lib/store/authStore';

const PLANS = [
  { id: 'starter', name: 'Starter', price: 49, billing: 'one-time', features: ['1 CV Creation', 'High-res PDF export', 'Core templates'], active: true },
  { id: 'pro', name: 'Pro', price: 199, billing: 'monthly', features: ['Unlimited Resumes', 'All Premium templates', 'AI Bullet Rewriter', 'Cancel anytime'], active: true },
  { id: 'lifetime', name: 'Lifetime', price: 999, billing: 'one-time', features: ['Everything in Pro', 'Lifetime Access', 'Future templates', 'Priority support'], active: true },
];

export default function SubscriptionsPage() {
  const { token } = useAuthStore();
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscriptionData();
  }, [token]);

  const fetchSubscriptionData = async () => {
    setLoading(true);
    try {
      const headers: Record<string, string> = token ? { Authorization: `Bearer ${token}` } : {};
      const res = await fetch('/api/analytics?type=admin', { headers });
      if (res.ok) {
        const result = await res.json();
        setAnalyticsData(result.data);
      }
    } catch (err) {
      console.error('[SUBSCRIPTIONS_FETCH_ERROR]', err);
    } finally {
      setLoading(false);
    }
  };

  const totalSubscribers = analyticsData?.users?.active ?? analyticsData?.users?.total ?? 0;
  const monthlyRevenue = analyticsData?.revenue?.total ?? 0;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Subscriptions</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage subscription plans and pricing</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#FF570F] hover:bg-[#E04800] text-white rounded-md font-medium transition-colors cursor-pointer">
          <Plus className="w-4 h-4" /> New Plan
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-[20px] border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6">
          <p className="text-sm text-slate-500 dark:text-slate-400">Total Subscribers</p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">{loading ? '...' : totalSubscribers.toLocaleString()}</p>
          <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-1">Active DB accounts</p>
        </div>
        <div className="rounded-[20px] border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6">
          <p className="text-sm text-slate-500 dark:text-slate-400">Monthly Revenue</p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">{loading ? '...' : `₹${monthlyRevenue.toLocaleString()}`}</p>
          <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-1">Live Razorpay totals</p>
        </div>
        <div className="rounded-[20px] border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6">
          <p className="text-sm text-slate-500 dark:text-slate-400">Active Rate</p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">100%</p>
          <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-1">Real-time health</p>
        </div>
      </div>

      {/* Plans */}
      <div>
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Available Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PLANS.map((plan) => (
            <div key={plan.id} className="rounded-[20px] border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden">
              <div className={`p-6 border-b border-slate-200 dark:border-slate-700 ${plan.name === 'Pro' ? 'bg-gradient-to-br from-[#FFF8F5] to-violet-100 dark:from-violet-900/20 dark:to-violet-800/20' : ''}`}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">{plan.name}</h3>
                  <span className="px-2.5 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs rounded-full font-medium">Active</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-slate-900 dark:text-white">₹{plan.price}</span>
                  <span className="text-slate-500 dark:text-slate-400 text-sm">/{plan.billing}</span>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-2 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                      <span className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xs">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700 pt-4">
                  <span className="font-semibold text-slate-900">INR {plan.price}</span>
                  <button className="text-[#FF570F] dark:text-violet-400 hover:underline font-medium cursor-pointer">Edit Plan</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
