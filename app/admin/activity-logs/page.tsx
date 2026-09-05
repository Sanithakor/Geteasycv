/**
 * Activity Logs Audit Trail Page matching Image 4 design & dataset
 */

'use client';

import React, { useState } from 'react';
import { Search } from 'lucide-react';

const LOGS = [
  { id: 1, user: 'John Doe', action: 'user.login', detail: 'Logged in from Chrome on Windows', ip: '192.168.1.1', time: '2 min ago', level: 'info' },
  { id: 2, user: 'Admin', action: 'template.publish', detail: 'Published "Modern Resume" template', ip: '10.0.0.1', time: '15 min ago', level: 'success' },
  { id: 3, user: 'Jane Smith', action: 'resume.create', detail: 'Created "Product Manager Resume"', ip: '192.168.1.5', time: '1 hour ago', level: 'info' },
  { id: 4, user: 'Unknown', action: 'auth.failed', detail: 'Failed login attempt for sthakor890@gmail.com', ip: '45.33.32.156', time: '2 hours ago', level: 'warning' },
  { id: 5, user: 'Admin', action: 'user.ban', detail: 'Banned user spammer@evil.com', ip: '10.0.0.1', time: '3 hours ago', level: 'danger' },
  { id: 6, user: 'Mike Lee', action: 'payment.success', detail: 'Upgraded to Pro plan ($99)', ip: '172.16.0.5', time: '4 hours ago', level: 'success' },
  { id: 7, user: 'Sara Kim', action: 'resume.delete', detail: 'Deleted "Old Resume v1"', ip: '192.168.2.10', time: '5 hours ago', level: 'warning' },
  { id: 8, user: 'System', action: 'backup.complete', detail: 'Daily database backup completed', ip: 'system', time: '6 hours ago', level: 'info' },
];

const LEVEL_STYLES: Record<string, string> = {
  info: 'bg-violet-50 text-violet-700 border border-violet-200',
  success: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  warning: 'bg-amber-50 text-amber-700 border border-amber-200',
  danger: 'bg-rose-50 text-rose-700 border border-rose-200',
};

const LEVEL_DOT: Record<string, string> = {
  info: 'bg-violet-500',
  success: 'bg-emerald-500',
  warning: 'bg-amber-500',
  danger: 'bg-rose-500',
};

export default function ActivityLogsPage() {
  const [search, setSearch] = useState('');

  const filtered = LOGS.filter((l) =>
    l.user.toLowerCase().includes(search.toLowerCase()) ||
    l.action.toLowerCase().includes(search.toLowerCase()) ||
    l.detail.toLowerCase().includes(search.toLowerCase()) ||
    l.ip.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Activity Logs</h1>
        <p className="text-slate-500 text-sm mt-0.5 font-medium">System and user activity audit trail</p>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search logs..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F0F0F]/15 focus:border-[#0F0F0F] text-sm font-medium transition-all"
        />
      </div>

      {/* Table Container matching Image 4 */}
      <div className="rounded-[20px] border border-slate-200/80 bg-white overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/75 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <th className="px-6 py-3.5">Level</th>
                <th className="px-6 py-3.5">User</th>
                <th className="px-6 py-3.5">Action</th>
                <th className="px-6 py-3.5">Details</th>
                <th className="px-6 py-3.5">IP Address</th>
                <th className="px-6 py-3.5">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold capitalize ${LEVEL_STYLES[log.level]}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${LEVEL_DOT[log.level]}`} />
                      {log.level}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-900">{log.user}</td>
                  <td className="px-6 py-4 text-xs font-mono font-bold text-slate-700">{log.action}</td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-600 max-w-sm truncate">{log.detail}</td>
                  <td className="px-6 py-4 text-xs font-mono text-slate-500 font-semibold">{log.ip}</td>
                  <td className="px-6 py-4 text-xs font-semibold text-slate-400 whitespace-nowrap">{log.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
