'use client';

import React, { useEffect, useState } from 'react';
import { Download, Coins } from 'lucide-react';
import { useAuthStore } from '@/lib/store/authStore';

const STATUS_STYLES: Record<string, string> = {
  succeeded: 'bg-green-100 text-green-700',
  completed: 'bg-emerald-100 text-emerald-700',
  refunded: 'bg-amber-100 text-amber-700',
  failed: 'bg-red-100 text-red-700',
};

export default function PaymentsPage() {
  const { token } = useAuthStore();
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPayments();
  }, [token]);

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/payments', {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (res.ok) {
        const data = await res.json();
        setPayments(data.data || []);
      }
    } catch (err) {
      console.error('[ADMIN_PAYMENTS_FETCH_ERROR]', err);
    } finally {
      setLoading(false);
    }
  };

  const totalRevenueCents = payments
    .filter((p) => p.status === 'succeeded' || p.status === 'completed')
    .reduce((s, p) => s + (p.amount || 0), 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Coins className="w-6 h-6 text-violet-600" />
            <span>Payments & Transactions</span>
          </h1>
          <p className="text-slate-500 text-xs mt-1">Live customer transactions from database</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="rounded-md border border-slate-200 bg-white p-6 shadow-2xs">
          <p className="text-xs font-bold text-slate-400 uppercase">Total Revenue</p>
          <p className="text-3xl font-bold text-slate-900 mt-1">${(totalRevenueCents / 100).toFixed(2)}</p>
          <p className="text-xs text-slate-500 mt-1">Live payments</p>
        </div>
        <div className="rounded-md border border-slate-200 bg-white p-6 shadow-2xs">
          <p className="text-xs font-bold text-slate-400 uppercase">Successful Payments</p>
          <p className="text-3xl font-bold text-emerald-600 mt-1">
            {payments.filter((p) => p.status === 'succeeded' || p.status === 'completed').length}
          </p>
          <p className="text-xs text-slate-500 mt-1">Processed transactions</p>
        </div>
        <div className="rounded-md border border-slate-200 bg-white p-6 shadow-2xs">
          <p className="text-xs font-bold text-slate-400 uppercase">Failed / Refunded</p>
          <p className="text-3xl font-bold text-amber-600 mt-1">
            {payments.filter((p) => p.status !== 'succeeded' && p.status !== 'completed').length}
          </p>
          <p className="text-xs text-slate-500 mt-1">Exceptions</p>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border border-slate-200 bg-white overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                {['Transaction ID', 'User ID', 'Amount', 'Provider', 'Status', 'Date'].map((h) => (
                  <th key={h} className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-xs text-slate-400 animate-pulse">
                    Loading payments...
                  </td>
                </tr>
              ) : payments.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-xs text-slate-400 font-medium">
                    No payment records found.
                  </td>
                </tr>
              ) : (
                payments.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-xs font-mono text-slate-700">{p.id}</td>
                    <td className="px-6 py-4 text-xs font-bold text-slate-900">{p.userId || 'User'}</td>
                    <td className="px-6 py-4 font-bold text-slate-900 text-sm">
                      ${(p.amount / 100).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-600 capitalize">{p.provider || 'Stripe'}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${STATUS_STYLES[p.status] || 'bg-slate-100 text-slate-600'}`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-500">
                      {new Date(p.createdAt || Date.now()).toLocaleDateString()}
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
