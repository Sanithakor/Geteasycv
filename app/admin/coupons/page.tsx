'use client';
import React, { useState } from 'react';
import { Plus, Copy, Trash2 } from 'lucide-react';

const COUPONS = [
  { id: 1, code: 'LAUNCH50', type: 'percent', value: 50, uses: 234, maxUses: 500, status: 'active', expires: '2024-12-31' },
  { id: 2, code: 'WELCOME25', type: 'percent', value: 25, uses: 891, maxUses: null, status: 'active', expires: null },
  { id: 3, code: 'SAVE20', type: 'fixed', value: 20, uses: 55, maxUses: 100, status: 'active', expires: '2024-07-31' },
  { id: 4, code: 'SUMMER10', type: 'percent', value: 10, uses: 320, maxUses: 320, status: 'expired', expires: '2024-05-31' },
];

export default function CouponsPage() {
  const [showNew, setShowNew] = useState(false);
  const [newCode, setNewCode] = useState({ code: '', type: 'percent', value: '', maxUses: '', expires: '' });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Coupons</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">{COUPONS.filter(c => c.status === 'active').length} active coupons</p>
        </div>
        <button onClick={() => setShowNew(!showNew)} className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-medium text-sm transition-colors">
          <Plus className="w-4 h-4" /> Create Coupon
        </button>
      </div>

      {/* Create Form */}
      {showNew && (
        <div className="rounded-[20px] border border-violet-200 dark:border-violet-800 bg-violet-50 dark:bg-violet-900/20 p-6">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4">New Coupon</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Code</label>
              <input value={newCode.code} onChange={e => setNewCode(p => ({...p, code: e.target.value.toUpperCase()}))} placeholder="PROMO20" className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Type</label>
              <select value={newCode.type} onChange={e => setNewCode(p => ({...p, type: e.target.value}))} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500">
                <option value="percent">Percentage (%)</option>
                <option value="fixed">Fixed Amount ($)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Value</label>
              <input type="number" value={newCode.value} onChange={e => setNewCode(p => ({...p, value: e.target.value}))} placeholder={newCode.type === 'percent' ? '20' : '10'} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" />
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg text-sm font-medium transition-colors">Create Coupon</button>
            <button onClick={() => setShowNew(false)} className="px-4 py-2 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium transition-colors">Cancel</button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="rounded-[20px] border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50">
                {['Code', 'Discount', 'Usage', 'Status', 'Expires', 'Actions'].map(h => (
                  <th key={h} className="px-6 py-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {COUPONS.map(c => (
                <tr key={c.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-slate-900 dark:text-white">{c.code}</span>
                      <button className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded"><Copy className="w-3.5 h-3.5 text-slate-400" /></button>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">
                    {c.type === 'percent' ? `${c.value}% off` : `$${c.value} off`}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                    {c.uses} / {c.maxUses ?? '∞'}
                    {c.maxUses && (
                      <div className="w-24 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full mt-1 overflow-hidden">
                        <div className="h-full bg-violet-500 rounded-full" style={{ width: `${Math.min(100, (c.uses / c.maxUses) * 100)}%` }} />
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${c.status === 'active' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400'}`}>{c.status}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">{c.expires ?? 'Never'}</td>
                  <td className="px-6 py-4">
                    <button className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-red-500"><Trash2 className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
