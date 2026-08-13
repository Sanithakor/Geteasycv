'use client';

import React, { useEffect, useState } from 'react';
import { Download, FileText } from 'lucide-react';
import { useAuthStore } from '@/lib/store/authStore';

export default function InvoicesPage() {
  const { token } = useAuthStore();
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInvoices();
  }, [token]);

  const fetchInvoices = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/invoices', {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (res.ok) {
        const data = await res.json();
        setInvoices(data.data || []);
      }
    } catch (err) {
      console.error('[ADMIN_INVOICES_FETCH_ERROR]', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-6 h-6 text-violet-600" />
            <span>Invoices & Billing Receipts</span>
          </h1>
          <p className="text-slate-500 text-xs mt-1">Generated customer invoices</p>
        </div>
      </div>

      <div className="rounded-md border border-slate-200 bg-white overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                {['Invoice ID', 'User ID', 'Amount', 'Currency', 'Status', 'Date', 'Actions'].map((h) => (
                  <th key={h} className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-xs text-slate-400 animate-pulse">
                    Loading invoices...
                  </td>
                </tr>
              ) : invoices.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-xs text-slate-400 font-medium">
                    No invoices generated yet.
                  </td>
                </tr>
              ) : (
                invoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-xs font-mono font-bold text-slate-900">{inv.id}</td>
                    <td className="px-6 py-4 text-xs text-slate-700">{inv.userId || 'User'}</td>
                    <td className="px-6 py-4 font-bold text-slate-900 text-sm">{inv.amount}</td>
                    <td className="px-6 py-4 text-xs text-slate-500">{inv.currency}</td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800">
                        {inv.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-500">{inv.date}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => window.open(inv.downloadUrl, '_blank')}
                        className="p-1.5 hover:bg-slate-100 text-slate-600 hover:text-violet-600 rounded-md transition-colors"
                        title="Download Invoice"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
