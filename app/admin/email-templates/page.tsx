'use client';
import React, { useState } from 'react';
import { Edit2, Eye } from 'lucide-react';

const TEMPLATES = [
  { id: 1, name: 'Welcome Email', trigger: 'user.signup', subject: 'Welcome to Resume Co! 🎉', status: 'active', lastEdited: '2024-06-01' },
  { id: 2, name: 'Password Reset', trigger: 'auth.resetPassword', subject: 'Reset your password', status: 'active', lastEdited: '2024-05-15' },
  { id: 3, name: 'Subscription Confirmed', trigger: 'payment.success', subject: 'Your Pro subscription is active ✅', status: 'active', lastEdited: '2024-04-20' },
  { id: 4, name: 'Payment Failed', trigger: 'payment.failed', subject: 'Action required: Payment failed', status: 'active', lastEdited: '2024-04-20' },
  { id: 5, name: 'Trial Ending Reminder', trigger: 'subscription.trialEndingSoon', subject: 'Your trial ends in 3 days', status: 'inactive', lastEdited: '2024-03-10' },
];

export default function EmailTemplatesPage() {
  const [selected, setSelected] = useState<number | null>(null);
  const tmpl = TEMPLATES.find(t => t.id === selected);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Email Templates</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Manage transactional email templates</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
          {TEMPLATES.map(t => (
            <button key={t.id} onClick={() => setSelected(t.id)} className={`w-full text-left p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors ${selected === t.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}>
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-sm text-slate-900 dark:text-white">{t.name}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${t.status === 'active' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400'}`}>{t.status}</span>
              </div>
              <p className="text-xs text-slate-500 font-mono">{t.trigger}</p>
            </button>
          ))}
        </div>
        <div className="lg:col-span-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6">
          {tmpl ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-slate-900 dark:text-white">{tmpl.name}</h2>
                <div className="flex gap-2">
                  <button className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg text-sm font-medium transition-colors"><Eye className="w-4 h-4" /> Preview</button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"><Edit2 className="w-4 h-4" /> Edit</button>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1 uppercase tracking-wider">Trigger</label>
                <code className="text-sm text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded">{tmpl.trigger}</code>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1 uppercase tracking-wider">Subject Line</label>
                <p className="text-sm text-slate-900 dark:text-white font-medium">{tmpl.subject}</p>
              </div>
              <div className="h-48 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 text-sm">
                Email preview will appear here
              </div>
              <p className="text-xs text-slate-500">Last edited: {tmpl.lastEdited}</p>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-slate-400 text-sm">Select a template to preview</div>
          )}
        </div>
      </div>
    </div>
  );
}
