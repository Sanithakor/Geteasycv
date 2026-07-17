'use client';
import React from 'react';
import { Download } from 'lucide-react';

const INVOICES = [
  { id: 'INV-2024-001', user: 'John Doe', amount: 99, plan: 'Pro', status: 'paid', date: '2024-06-01', due: '2024-06-01' },
  { id: 'INV-2024-002', user: 'Jane Smith', amount: 199, plan: 'Premium', status: 'paid', date: '2024-06-01', due: '2024-06-01' },
  { id: 'INV-2024-003', user: 'Mike Lee', amount: 99, plan: 'Pro', status: 'overdue', date: '2024-05-01', due: '2024-05-15' },
  { id: 'INV-2024-004', user: 'Sara Kim', amount: 99, plan: 'Pro', status: 'pending', date: '2024-06-10', due: '2024-06-25' },
];

const ST: Record<string, string> = {
  paid: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  overdue: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  pending: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
};

export default function InvoicesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Invoices</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Billing invoices and receipts</p>
      </div>
      <div className="rounded-[20px] border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50">
                {['Invoice', 'Customer', 'Plan', 'Amount', 'Status', 'Date', 'Actions'].map(h => (
                  <th key={h} className="px-6 py-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {INVOICES.map(inv => (
                <tr key={inv.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-mono text-slate-600 dark:text-slate-400">{inv.id}</td>
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-white text-sm">{inv.user}</td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{inv.plan}</td>
                  <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">${inv.amount}</td>
                  <td className="px-6 py-4"><span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${ST[inv.status]}`}>{inv.status}</span></td>
                  <td className="px-6 py-4 text-sm text-slate-500">{inv.date}</td>
                  <td className="px-6 py-4"><button className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"><Download className="w-4 h-4 text-slate-500" /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
