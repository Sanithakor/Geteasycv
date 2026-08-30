'use client';
import React, { useState } from 'react';
import { Search, Plus } from 'lucide-react';

const TICKETS = [
  { id: 'TKT-001', subject: 'Cannot download PDF', user: 'John Doe', email: 'john.doe@geteasycv.com', priority: 'high', status: 'open', created: '2024-06-15', updated: '1 hour ago' },
  { id: 'TKT-002', subject: 'Billing charge question', user: 'Jane Smith', email: 'jane.smith@geteasycv.com', priority: 'medium', status: 'pending', created: '2024-06-14', updated: '3 hours ago' },
  { id: 'TKT-003', subject: 'Template not loading correctly', user: 'Mike Lee', email: 'mike.lee@geteasycv.com', priority: 'low', status: 'resolved', created: '2024-06-13', updated: '1 day ago' },
  { id: 'TKT-004', subject: 'Forgot password not working', user: 'Sara Kim', email: 'sara.kim@geteasycv.com', priority: 'high', status: 'open', created: '2024-06-12', updated: '2 days ago' },
  { id: 'TKT-005', subject: 'Feature request: Dark mode', user: 'Tom Brown', email: 'tom.brown@geteasycv.com', priority: 'low', status: 'resolved', created: '2024-06-10', updated: '4 days ago' },
];

const PRIORITY: Record<string, string> = {
  high: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  medium: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  low: 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400',
};
const STATUS: Record<string, string> = {
  open: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  pending: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  resolved: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
};

export default function SupportPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = TICKETS.filter(t => {
    const matchSearch = t.subject.toLowerCase().includes(search.toLowerCase()) || t.user.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || t.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Support Tickets</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">{TICKETS.filter(t => t.status === 'open').length} open tickets</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-md font-medium transition-colors text-sm">
          <Plus className="w-4 h-4" /> Create Ticket
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { l: 'Open', v: TICKETS.filter(t => t.status === 'open').length, c: 'text-red-600' },
          { l: 'Pending', v: TICKETS.filter(t => t.status === 'pending').length, c: 'text-amber-600' },
          { l: 'Resolved', v: TICKETS.filter(t => t.status === 'resolved').length, c: 'text-green-600' },
          { l: 'Total', v: TICKETS.length, c: 'text-violet-600' },
        ].map((s, i) => (
          <div key={i} className="rounded-[20px] border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 text-center">
            <p className={`text-2xl font-bold ${s.c}`}>{s.v}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{s.l}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search tickets..." className="w-full pl-9 pr-4 py-2 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" />
        </div>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-4 py-2 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500">
          <option value="all">All Status</option>
          <option value="open">Open</option>
          <option value="pending">Pending</option>
          <option value="resolved">Resolved</option>
        </select>
      </div>

      {/* Table */}
      <div className="rounded-[20px] border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50">
                {['ID', 'Subject', 'User', 'Priority', 'Status', 'Updated'].map(h => (
                  <th key={h} className="px-6 py-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {filtered.map(t => (
                <tr key={t.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer">
                  <td className="px-6 py-4 text-sm font-mono text-slate-500">{t.id}</td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-slate-900 dark:text-white text-sm">{t.subject}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">{t.user}</p>
                    <p className="text-xs text-slate-500">{t.email}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${PRIORITY[t.priority]}`}>{t.priority}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${STATUS[t.status]}`}>{t.status}</span>
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-500 dark:text-slate-400">{t.updated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
