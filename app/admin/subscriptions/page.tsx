/**
 * Subscriptions & Pricing Plans Admin Management Page
 * Allows viewing, editing, adding, and toggling platform subscription plans.
 */

'use client';

import React, { useEffect, useState } from 'react';
import { Plus, CreditCard, Sparkles, Edit, Check, X, Loader2, RefreshCw } from 'lucide-react';
import { useAuthStore } from '@/lib/store/authStore';
import { DEFAULT_PLANS, PlanItem } from '@/lib/plansStore';
import toast, { Toaster } from 'react-hot-toast';

export default function SubscriptionsPage() {
  const { token } = useAuthStore();
  const [plans, setPlans] = useState<PlanItem[]>(DEFAULT_PLANS);
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Edit Plan Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<PlanItem | null>(null);
  const [featuresText, setFeaturesText] = useState('');
  const [savingPlan, setSavingPlan] = useState(false);

  useEffect(() => {
    fetchSubscriptionData();
  }, [token]);

  const fetchSubscriptionData = async () => {
    setLoading(true);
    try {
      const headers: Record<string, string> = token ? { Authorization: `Bearer ${token}` } : {};
      
      // Fetch dynamic analytics
      const analyticsRes = await fetch('/api/analytics?type=admin', { headers });
      if (analyticsRes.ok) {
        const result = await analyticsRes.json();
        setAnalyticsData(result.data);
      }

      // Fetch dynamic plans
      const plansRes = await fetch('/api/plans');
      if (plansRes.ok) {
        const json = await plansRes.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          setPlans(json.data);
        }
      }
    } catch (err) {
      console.error('[SUBSCRIPTIONS_FETCH_ERROR]', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenEditModal = (plan: PlanItem) => {
    setEditingPlan({ ...plan });
    setFeaturesText((plan.features || []).join('\n'));
    setIsModalOpen(true);
  };

  const handleOpenNewPlanModal = () => {
    const newPlan: PlanItem = {
      id: `plan_${Date.now()}`,
      name: 'Custom Plan',
      price: 299,
      currency: '₹',
      billingPeriod: 'month',
      description: 'Custom plan description for active members.',
      features: ['Unlimited Resumes', 'All Premium Templates', 'AI Writer', 'Priority Support'],
      popular: false,
      badge: null,
      isActive: true,
      maxResumes: -1,
      canUseAI: true,
      canUsePremiumTemplates: true,
      canExportPDF: true,
      sortOrder: plans.length + 1,
    };
    setEditingPlan(newPlan);
    setFeaturesText(newPlan.features.join('\n'));
    setIsModalOpen(true);
  };

  const handleSavePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPlan) return;

    setSavingPlan(true);

    const updatedFeatures = featuresText
      .split('\n')
      .map((f) => f.trim())
      .filter((f) => f.length > 0);

    const planToSave: PlanItem = {
      ...editingPlan,
      features: updatedFeatures,
      price: Number(editingPlan.price) || 0,
    };

    let nextPlans: PlanItem[];
    const exists = plans.some((p) => p.id === planToSave.id);
    if (exists) {
      nextPlans = plans.map((p) => (p.id === planToSave.id ? planToSave : p));
    } else {
      nextPlans = [...plans, planToSave];
    }

    setPlans(nextPlans);

    try {
      const res = await fetch('/api/plans', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ plans: nextPlans }),
      });

      if (res.ok) {
        toast.success(`Plan "${planToSave.name}" saved successfully!`);
        setIsModalOpen(false);
        setEditingPlan(null);
      } else {
        const errJson = await res.json().catch(() => ({}));
        toast.error(errJson.error || 'Failed to save plan changes.');
      }
    } catch (err) {
      console.error('[SAVE_PLAN_ERROR]', err);
      toast.error('Network error saving plan.');
    } finally {
      setSavingPlan(false);
    }
  };

  const totalSubscribers = analyticsData?.users?.active ?? analyticsData?.users?.total ?? 0;
  const monthlyRevenue = analyticsData?.revenue?.total ?? 0;

  return (
    <div className="space-y-8 font-sans">
      <Toaster position="bottom-right" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Subscriptions & Plans</h1>
          <p className="text-slate-500 text-sm mt-0.5 font-medium">Manage dynamic subscription pricing, features, and limits</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchSubscriptionData}
            disabled={loading}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl font-semibold text-sm shadow-2xs transition-all cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 text-slate-500 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
          <button
            onClick={handleOpenNewPlanModal}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#0F0F0F] hover:bg-[#262626] text-white rounded-xl font-bold text-sm shadow-sm transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5] text-[#F5D17B]" />
            <span>New Plan</span>
          </button>
        </div>
      </div>

      {/* Stats Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-[20px] border border-slate-200/80 bg-white p-6 shadow-2xs">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Subscribers</p>
          <p className="text-3xl font-black text-slate-900 mt-2">{loading ? '...' : totalSubscribers.toLocaleString()}</p>
          <p className="text-xs font-bold text-emerald-600 mt-1">Active platform accounts</p>
        </div>
        <div className="rounded-[20px] border border-slate-200/80 bg-white p-6 shadow-2xs">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Monthly Revenue</p>
          <p className="text-3xl font-black text-slate-900 mt-2">{loading ? '...' : `₹${monthlyRevenue.toLocaleString()}`}</p>
          <p className="text-xs font-bold text-emerald-600 mt-1">Live Razorpay totals</p>
        </div>
        <div className="rounded-[20px] border border-slate-200/80 bg-white p-6 shadow-2xs">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Rate</p>
          <p className="text-3xl font-black text-slate-900 mt-2">100%</p>
          <p className="text-xs font-bold text-emerald-600 mt-1">Real-time health status</p>
        </div>
      </div>

      {/* Available Plans Cards */}
      <div>
        <h2 className="text-base font-bold text-slate-900 mb-4">Available Subscription Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-[20px] border bg-white overflow-hidden shadow-2xs transition-all flex flex-col justify-between ${
                plan.popular ? 'border-[#0F0F0F] ring-2 ring-[#0F0F0F]/15' : 'border-slate-200/80'
              }`}
            >
              <div className={`p-6 border-b border-slate-100 ${plan.popular ? 'bg-[#FFF8F5]' : ''}`}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <span>{plan.name}</span>
                    {plan.badge && (
                      <span className="px-2.5 py-0.5 bg-[#0F0F0F] text-[#F5D17B] text-[10px] rounded-full font-black uppercase tracking-wider">
                        {plan.badge}
                      </span>
                    )}
                  </h3>
                  <span className={`px-2.5 py-1 text-xs rounded-full font-bold ${
                    plan.isActive ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {plan.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-slate-900">{plan.currency || '₹'}{plan.price}</span>
                  <span className="text-slate-500 text-xs font-medium">/{plan.billingPeriod}</span>
                </div>
                <p className="text-xs text-slate-500 mt-2 font-medium min-h-[32px]">{plan.description}</p>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <ul className="space-y-2 mb-6">
                  {(plan.features || []).map((f, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                      <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] font-bold">✓</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex items-center justify-between text-xs text-slate-600 border-t border-slate-100 pt-4 mt-auto">
                  <span className="font-bold text-slate-900">{plan.currency || '₹'}{plan.price}</span>
                  <button
                    onClick={() => handleOpenEditModal(plan)}
                    className="flex items-center gap-1.5 text-[#0F0F0F] hover:text-[#F3645C] font-bold cursor-pointer transition-all hover:underline"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    <span>Edit Plan</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Plan Modal */}
      {isModalOpen && editingPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="w-full max-w-lg rounded-[24px] border border-slate-200 bg-white p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-[#FEE1CF] text-[#0F0F0F] flex items-center justify-center font-bold">
                  <Edit className="w-4 h-4 text-[#F3645C]" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Edit Plan — {editingPlan.name}</h3>
                  <p className="text-xs text-slate-400 font-medium">Update pricing, description, and features</p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePlan} className="space-y-4 text-xs font-medium">
              {/* Name & Price Row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Plan Name</label>
                  <input
                    type="text"
                    required
                    value={editingPlan.name}
                    onChange={(e) => setEditingPlan({ ...editingPlan, name: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-[#0F0F0F]/15 focus:border-[#0F0F0F]"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Price (₹)</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={editingPlan.price}
                    onChange={(e) => setEditingPlan({ ...editingPlan, price: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-[#0F0F0F]/15 focus:border-[#0F0F0F]"
                  />
                </div>
              </div>

              {/* Billing Period & Badge Row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Billing Period</label>
                  <select
                    value={editingPlan.billingPeriod}
                    onChange={(e) => setEditingPlan({ ...editingPlan, billingPeriod: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-slate-900 font-semibold bg-white focus:outline-none focus:ring-2 focus:ring-[#0F0F0F]/15 focus:border-[#0F0F0F]"
                  >
                    <option value="month">Monthly (/month)</option>
                    <option value="one-time payment">One-Time Payment</option>
                    <option value="year">Yearly (/year)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Badge Tag</label>
                  <input
                    type="text"
                    placeholder="e.g. MOST POPULAR"
                    value={editingPlan.badge || ''}
                    onChange={(e) => setEditingPlan({ ...editingPlan, badge: e.target.value || null, popular: Boolean(e.target.value) })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-[#0F0F0F]/15 focus:border-[#0F0F0F]"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-slate-700 font-bold mb-1">Description</label>
                <input
                  type="text"
                  required
                  value={editingPlan.description}
                  onChange={(e) => setEditingPlan({ ...editingPlan, description: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-[#0F0F0F]/15 focus:border-[#0F0F0F]"
                />
              </div>

              {/* Features List */}
              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Features (One feature per line)
                </label>
                <textarea
                  rows={4}
                  value={featuresText}
                  onChange={(e) => setFeaturesText(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-slate-900 font-medium leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#0F0F0F]/15 focus:border-[#0F0F0F]"
                  placeholder="Enter features list..."
                />
              </div>

              {/* Toggles */}
              <div className="flex items-center gap-6 pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingPlan.isActive}
                    onChange={(e) => setEditingPlan({ ...editingPlan, isActive: e.target.checked })}
                    className="rounded border-slate-300 text-[#0F0F0F] focus:ring-[#0F0F0F]"
                  />
                  <span className="font-bold text-slate-700">Active Plan</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingPlan.popular}
                    onChange={(e) => setEditingPlan({ ...editingPlan, popular: e.target.checked })}
                    className="rounded border-slate-300 text-[#0F0F0F] focus:ring-[#0F0F0F]"
                  />
                  <span className="font-bold text-slate-700">Highlight Card</span>
                </label>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 font-bold hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingPlan}
                  className="flex items-center gap-2 px-5 py-2 bg-[#0F0F0F] hover:bg-[#262626] text-white rounded-xl font-bold transition-all cursor-pointer disabled:opacity-60 shadow-sm"
                >
                  {savingPlan ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4 stroke-[3] text-[#F5D17B]" />}
                  <span>Save Plan Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
