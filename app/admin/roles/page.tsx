'use client';
import React from 'react';

const ROLES = [
  { name: 'Admin', users: 2, color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400', permissions: ['All permissions'] },
  { name: 'Editor', users: 5, color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400', permissions: ['Manage templates', 'Manage blog', 'View analytics'] },
  { name: 'Support', users: 3, color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400', permissions: ['View users', 'Manage tickets', 'Send notifications'] },
  { name: 'User', users: 2533, color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400', permissions: ['Create resumes', 'Download PDF', 'Use templates'] },
];

const ALL_PERMISSIONS = [
  { group: 'Users', items: ['View users', 'Create users', 'Edit users', 'Delete users', 'Ban users'] },
  { group: 'Templates', items: ['View templates', 'Manage templates', 'Publish templates', 'Delete templates'] },
  { group: 'Resumes', items: ['View all resumes', 'Delete resumes'] },
  { group: 'Analytics', items: ['View analytics', 'Export reports'] },
  { group: 'Billing', items: ['View payments', 'Issue refunds', 'Manage subscriptions'] },
  { group: 'Content', items: ['Manage blog', 'Send notifications', 'Manage email templates'] },
  { group: 'System', items: ['Manage roles', 'View activity logs', 'Manage API keys', 'System settings'] },
];

export default function RolesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Roles & Permissions</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Manage access control for your platform</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {ROLES.map(role => (
          <div key={role.name} className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-5">
            <div className="flex items-center gap-3 mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${role.color}`}>{role.name}</span>
              <span className="text-sm text-slate-500 dark:text-slate-400">{role.users} users</span>
            </div>
            <ul className="space-y-1.5">
              {role.permissions.map(p => (
                <li key={p} className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 flex-shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Permission Matrix</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Overview of all permissions by role</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50">
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-600 dark:text-slate-400 w-48">Permission</th>
                {ROLES.map(r => <th key={r.name} className="px-4 py-3 text-center text-sm font-semibold text-slate-600 dark:text-slate-400">{r.name}</th>)}
              </tr>
            </thead>
            <tbody>
              {ALL_PERMISSIONS.map(group => (
                <React.Fragment key={group.group}>
                  <tr>
                    <td colSpan={ROLES.length + 1} className="px-6 py-2 bg-slate-50 dark:bg-slate-700/30 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{group.group}</td>
                  </tr>
                  {group.items.map(perm => (
                    <tr key={perm} className="border-b border-slate-100 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/30">
                      <td className="px-6 py-3 text-sm text-slate-700 dark:text-slate-300">{perm}</td>
                      <td className="px-4 py-3 text-center text-green-600">✓</td>
                      {[...Array(ROLES.length - 1)].map((_, i) => (
                        <td key={i} className="px-4 py-3 text-center">
                          <span className={`text-sm ${i === 0 && (perm.includes('template') || perm.includes('blog') || perm.includes('analytics')) ? 'text-green-600' : i === 1 && (perm.includes('ticket') || perm.includes('notification') || perm.includes('user')) ? 'text-green-600' : 'text-slate-300 dark:text-slate-600'}`}>
                            {(i === 0 && (perm.includes('template') || perm.includes('blog') || perm.includes('analytics'))) || (i === 1 && (perm.includes('ticket') || perm.includes('notification') || perm.includes('View user'))) ? '✓' : '—'}
                          </span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
