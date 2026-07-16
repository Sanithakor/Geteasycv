'use client';
import React from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';

const PLANS = [
  { id: 1, name: 'Free', price: 0, billing: '-', features: ['3 resumes', '5 templates', 'PDF export'], users: 1698, active: true },
  { id: 2, name: 'Pro', price: 99, billing: 'monthly', features: ['Unlimited resumes', '20+ templates', 'PDF/DOCX export', 'AI suggestions', 'Priority support'], users: 712, active: true },
  { id: 3, name: 'Premium', price: 199, billing: 'monthly', features: ['Everything in Pro', 'Custom domain', 'Team collaboration', 'Analytics', 'API access'], users: 133, active: true },
];

export default function SubscriptionsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Subscriptions</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage subscription plans and pricing</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
          <Plus className="w-4 h-4" /> New Plan
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Subscribers', value: '845', change: '+12%' },
          { label: 'Monthly Revenue', value: '$78,441', change: '+8%' },
          { label: 'Churn Rate', value: '2.4%', change: '-0.3%' },
        ].map((s, i) => (
          <div key={i} className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6">
            <p className="text-sm text-slate-500 dark:text-slate-400">{s.label}</p>
            <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">{s.value}</p>
            <p className="text-sm text-green-600 dark:text-green-400 mt-1">{s.change} this month</p>
          </div>
        ))}
      </div>

      {/* Plans */}
      <div>
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Available Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PLANS.map(plan => (
            <div key={plan.id} className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden">
              <div className={`p-6 border-b border-slate-200 dark:border-slate-700 ${plan.name === 'Pro' ? 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20' : ''}`}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">{plan.name}</h3>
                  <span className="px-2.5 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs rounded-full font-medium">Active</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-slate-900 dark:text-white">${plan.price}</span>
                  {plan.billing !== '-' && <span className="text-slate-500 dark:text-slate-400 text-sm">/{plan.billing}</span>}
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-2 mb-6">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                      <span className="w-4 h-4 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center text-xs">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700 pt-4">
                  <span>{plan.users} users</span>
                  <button className="text-blue-600 dark:text-blue-400 hover:underline font-medium">Edit Plan</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
