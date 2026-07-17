'use client';
import React from 'react';
import { Download } from 'lucide-react';

const PAYMENTS = [
  { id: 'pay_001', user: 'John Doe', email: 'john@example.com', amount: 99, plan: 'Pro', status: 'succeeded', date: '2024-06-15' },
  { id: 'pay_002', user: 'Jane Smith', email: 'jane@example.com', amount: 99, plan: 'Pro', status: 'succeeded', date: '2024-06-14' },
  { id: 'pay_003', user: 'Mike Johnson', email: 'mike@example.com', amount: 199, plan: 'Premium', status: 'succeeded', date: '2024-06-12' },
  { id: 'pay_004', user: 'Sara Lee', email: 'sara@example.com', amount: 99, plan: 'Pro', status: 'refunded', date: '2024-06-10' },
  { id: 'pay_005', user: 'Tom Wilson', email: 'tom@example.com', amount: 99, plan: 'Pro', status: 'failed', date: '2024-06-09' },
];

const STATUS_STYLES: Record<string, string> = {
  succeeded: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  refunded: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  failed: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
};

export default function PaymentsPage() {
  const total = PAYMENTS.filter(p => p.status === 'succeeded').reduce((s, p) => s + p.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Payments</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Payment history and transactions</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Revenue', value: `$${total}`, sub: 'This month' },
          { label: 'Successful', value: PAYMENTS.filter(p => p.status === 'succeeded').length, sub: 'Payments' },
          { label: 'Failed / Refunded', value: PAYMENTS.filter(p => p.status !== 'succeeded').length, sub: 'Need attention' },
        ].map((c, i) => (
          <div key={i} className="rounded-[20px] border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6">
            <p className="text-sm text-slate-500 dark:text-slate-400">{c.label}</p>
            <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">{c.value}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{c.sub}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-[20px] border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50">
                {['Transaction ID', 'User', 'Amount', 'Plan', 'Status', 'Date'].map(h => (
                  <th key={h} className="px-6 py-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {PAYMENTS.map(p => (
                <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-mono text-slate-600 dark:text-slate-400">{p.id}</td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-slate-900 dark:text-white text-sm">{p.user}</p>
                    <p className="text-xs text-slate-500">{p.email}</p>
                  </td>
                  <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">${p.amount}</td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{p.plan}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${STATUS_STYLES[p.status]}`}>
                      {p.status.charAt(0).toUpperCase() + p.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{p.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
