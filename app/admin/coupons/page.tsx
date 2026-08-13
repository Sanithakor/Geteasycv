'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Copy, Trash2, Ticket } from 'lucide-react';
import { useAuthStore } from '@/lib/store/authStore';
import toast from 'react-hot-toast';

export default function CouponsPage() {
  const { token } = useAuthStore();
  const [coupons, setCoupons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNew, setShowNew] = useState(false);
  const [newCode, setNewCode] = useState({ code: '', discountType: 'percentage', discountAmount: '20', maxUses: '100' });

  useEffect(() => {
    fetchCoupons();
  }, [token]);

  const fetchCoupons = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/coupons', {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (res.ok) {
        const data = await res.json();
        setCoupons(data.data || []);
      }
    } catch (err) {
      console.error('[ADMIN_COUPONS_FETCH_ERROR]', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode.code.trim()) {
      toast.error('Please enter a coupon code');
      return;
    }

    try {
      const res = await fetch('/api/coupons', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : '',
        },
        body: JSON.stringify(newCode),
      });

      if (res.ok) {
        const data = await res.json();
        setCoupons((prev) => [data.data, ...prev]);
        setShowNew(false);
        setNewCode({ code: '', discountType: 'percentage', discountAmount: '20', maxUses: '100' });
        toast.success(`Coupon ${data.data.code} created!`);
      }
    } catch (err) {
      console.error('[CREATE_COUPON_ERROR]', err);
      toast.error('Failed to create coupon');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Ticket className="w-6 h-6 text-violet-600" />
            <span>Discount Coupons</span>
          </h1>
          <p className="text-slate-500 text-xs mt-1">Manage promo codes and checkout discounts</p>
        </div>
        <button
          onClick={() => setShowNew(!showNew)}
          className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-md font-bold text-xs transition-colors shadow-2xs cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Create Coupon
        </button>
      </div>

      {/* Create Form */}
      {showNew && (
        <form onSubmit={handleCreateCoupon} className="rounded-md border border-violet-200 bg-violet-50/50 p-6 space-y-4 shadow-2xs">
          <h3 className="font-bold text-slate-900 text-sm">Create New Coupon Code</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Coupon Code</label>
              <input
                value={newCode.code}
                onChange={(e) => setNewCode((p) => ({ ...p, code: e.target.value.toUpperCase() }))}
                placeholder="PROMO20"
                required
                className="w-full px-3 py-2 rounded-md border border-slate-200 bg-white text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Discount Type</label>
              <select
                value={newCode.discountType}
                onChange={(e) => setNewCode((p) => ({ ...p, discountType: e.target.value }))}
                className="w-full px-3 py-2 rounded-md border border-slate-200 bg-white text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                <option value="percentage">Percentage (%)</option>
                <option value="fixed">Fixed Amount ($)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Discount Amount</label>
              <input
                type="number"
                value={newCode.discountAmount}
                onChange={(e) => setNewCode((p) => ({ ...p, discountAmount: e.target.value }))}
                placeholder="20"
                required
                className="w-full px-3 py-2 rounded-md border border-slate-200 bg-white text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Max Uses</label>
              <input
                type="number"
                value={newCode.maxUses}
                onChange={(e) => setNewCode((p) => ({ ...p, maxUses: e.target.value }))}
                placeholder="100"
                className="w-full px-3 py-2 rounded-md border border-slate-200 bg-white text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <button type="submit" className="px-5 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-md text-xs font-bold transition-colors cursor-pointer">
              Save Coupon
            </button>
            <button type="button" onClick={() => setShowNew(false)} className="px-4 py-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 rounded-md text-xs font-bold transition-colors cursor-pointer">
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Table */}
      <div className="rounded-md border border-slate-200 bg-white overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                {['Code', 'Discount', 'Usage', 'Status', 'Created At'].map((h) => (
                  <th key={h} className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-xs text-slate-400 animate-pulse">
                    Loading coupons...
                  </td>
                </tr>
              ) : coupons.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-xs text-slate-400 font-medium">
                    No active coupons found.
                  </td>
                </tr>
              ) : (
                coupons.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-slate-900 text-xs">{c.code}</span>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(c.code);
                            toast.success('Code copied!');
                          }}
                          className="p-1 hover:bg-slate-100 rounded cursor-pointer"
                          title="Copy Code"
                        >
                          <Copy className="w-3.5 h-3.5 text-slate-400" />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-900 text-xs">
                      {c.discountType === 'percentage' ? `${c.discountAmount}% OFF` : `$${c.discountAmount} OFF`}
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-600">
                      {c.usedCount || 0} / {c.maxUses ?? '∞'}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${c.active ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'}`}>
                        {c.active ? 'Active' : 'Disabled'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-500">
                      {new Date(c.createdAt || Date.now()).toLocaleDateString()}
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
