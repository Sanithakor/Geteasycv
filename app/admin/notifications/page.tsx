'use client';
import React, { useState } from 'react';
import { Send, Users, User } from 'lucide-react';

export default function NotificationsPage() {
  const [form, setForm] = useState({ title: '', message: '', target: 'all', type: 'info' });
  const [sent, setSent] = useState(false);

  const RECENT = [
    { id: 1, title: 'New templates available!', message: 'We added 5 new premium templates.', target: 'all', sent: '2024-06-14', reach: 2543 },
    { id: 2, title: 'System maintenance notice', message: 'Scheduled maintenance on June 20 from 2-4 AM UTC.', target: 'all', sent: '2024-06-12', reach: 2543 },
    { id: 3, title: 'Your Pro trial is ending', message: 'Your 14-day trial ends in 3 days. Upgrade to continue.', target: 'trial', sent: '2024-06-10', reach: 45 },
  ];

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Notifications</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Send announcements and alerts to users</p>
      </div>

      {/* Compose */}
      <div className="rounded-[20px] border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Send Notification</h2>
        {sent && <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 rounded-lg text-sm">✓ Notification sent successfully!</div>}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Target Audience</label>
              <select value={form.target} onChange={e => setForm(p => ({...p, target: e.target.value}))} className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500">
                <option value="all">All Users (2,543)</option>
                <option value="free">Free Users (1,698)</option>
                <option value="pro">Pro Users (845)</option>
                <option value="inactive">Inactive Users</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Type</label>
              <select value={form.type} onChange={e => setForm(p => ({...p, type: e.target.value}))} className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500">
                <option value="info">Info</option>
                <option value="success">Success</option>
                <option value="warning">Warning</option>
                <option value="promo">Promotion</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Title</label>
            <input value={form.title} onChange={e => setForm(p => ({...p, title: e.target.value}))} placeholder="Notification title..." className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Message</label>
            <textarea value={form.message} onChange={e => setForm(p => ({...p, message: e.target.value}))} placeholder="Write your message here..." rows={4} className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none" />
          </div>
          <button onClick={() => { setSent(true); setForm({ title: '', message: '', target: 'all', type: 'info' }); setTimeout(() => setSent(false), 4000); }} disabled={!form.title || !form.message} className="flex items-center gap-2 px-6 py-2.5 bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white rounded-lg font-medium text-sm transition-colors">
            <Send className="w-4 h-4" /> Send Notification
          </button>
        </div>
      </div>

      {/* Recent */}
      <div className="rounded-[20px] border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Recent Notifications</h2>
        <div className="space-y-4">
          {RECENT.map(n => (
            <div key={n.id} className="flex items-start gap-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-700/50">
              <div className="w-10 h-10 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center flex-shrink-0">
                {n.target === 'all' ? <Users className="w-5 h-5 text-violet-600" /> : <User className="w-5 h-5 text-violet-600" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-medium text-slate-900 dark:text-white text-sm">{n.title}</p>
                  <span className="text-xs text-slate-500 flex-shrink-0">{n.sent}</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{n.message}</p>
                <p className="text-xs text-slate-500 mt-1">Reached {n.reach.toLocaleString()} users</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
