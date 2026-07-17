'use client';
import React, { useState } from 'react';
import { Search } from 'lucide-react';

const LOGS = [
  { id: 1, user: 'John Doe', action: 'user.login', detail: 'Logged in from Chrome on Windows', ip: '192.168.1.1', time: '2 min ago', level: 'info' },
  { id: 2, user: 'Admin', action: 'template.publish', detail: 'Published "Modern Resume" template', ip: '10.0.0.1', time: '15 min ago', level: 'success' },
  { id: 3, user: 'Jane Smith', action: 'resume.create', detail: 'Created "Product Manager Resume"', ip: '192.168.1.5', time: '1 hour ago', level: 'info' },
  { id: 4, user: 'Unknown', action: 'auth.failed', detail: 'Failed login attempt for admin@example.com', ip: '45.33.32.156', time: '2 hours ago', level: 'warning' },
  { id: 5, user: 'Admin', action: 'user.ban', detail: 'Banned user spammer@evil.com', ip: '10.0.0.1', time: '3 hours ago', level: 'danger' },
  { id: 6, user: 'Mike Lee', action: 'payment.success', detail: 'Upgraded to Pro plan ($99)', ip: '172.16.0.5', time: '4 hours ago', level: 'success' },
  { id: 7, user: 'Sara Kim', action: 'resume.delete', detail: 'Deleted "Old Resume v1"', ip: '192.168.2.10', time: '5 hours ago', level: 'warning' },
  { id: 8, user: 'System', action: 'backup.complete', detail: 'Daily database backup completed', ip: 'system', time: '6 hours ago', level: 'info' },
];

const LEVEL_STYLES: Record<string, string> = {
  info: 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400',
  success: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  warning: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  danger: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
};
const LEVEL_DOT: Record<string, string> = {
  info: 'bg-violet-500', success: 'bg-green-500', warning: 'bg-amber-500', danger: 'bg-red-500',
};

export default function ActivityLogsPage() {
  const [search, setSearch] = useState('');

  const filtered = LOGS.filter(l =>
    l.user.toLowerCase().includes(search.toLowerCase()) ||
    l.action.toLowerCase().includes(search.toLowerCase()) ||
    l.detail.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Activity Logs</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">System and user activity audit trail</p>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search logs..." className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" />
      </div>

      <div className="rounded-[20px] border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50">
                {['Level', 'User', 'Action', 'Details', 'IP Address', 'Time'].map(h => (
                  <th key={h} className="px-6 py-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {filtered.map(log => (
                <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${LEVEL_DOT[log.level]}`} />
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${LEVEL_STYLES[log.level]}`}>{log.level}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">{log.user}</td>
                  <td className="px-6 py-4 text-sm font-mono text-slate-600 dark:text-slate-400">{log.action}</td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400 max-w-xs truncate">{log.detail}</td>
                  <td className="px-6 py-4 text-sm font-mono text-slate-500 dark:text-slate-500">{log.ip}</td>
                  <td className="px-6 py-4 text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">{log.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
