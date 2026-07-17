/**
 * Users Management Page
 * View and manage all users
 */

'use client';

import React from 'react';
import { Search, Plus, MoreVertical, Edit2, Trash2, Lock, Mail } from 'lucide-react';
import Link from 'next/link';

const USERS = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    tier: 'pro',
    status: 'active',
    joinedAt: '2024-01-15',
    resumes: 5,
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    tier: 'free',
    status: 'active',
    joinedAt: '2024-02-20',
    resumes: 2,
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike@example.com',
    tier: 'pro',
    status: 'inactive',
    joinedAt: '2024-03-10',
    resumes: 8,
  },
  {
    id: 4,
    name: 'Sarah Williams',
    email: 'sarah@example.com',
    tier: 'free',
    status: 'active',
    joinedAt: '2024-01-05',
    resumes: 1,
  },
  {
    id: 5,
    name: 'Tom Brown',
    email: 'tom@example.com',
    tier: 'pro',
    status: 'active',
    joinedAt: '2024-02-14',
    resumes: 12,
  },
];

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedUsers, setSelectedUsers] = React.useState<number[]>([]);

  const filteredUsers = USERS.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Users
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Manage and view all users ({USERS.length} total)
          </p>
        </div>
        <Link
          href="/admin/users/new"
          className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add User
        </Link>
      </div>

      {/* Filters */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-[20px] border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50">
                <th className="px-6 py-4 text-left">
                  <input
                    type="checkbox"
                    className="rounded border-slate-300 dark:border-slate-600"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedUsers(USERS.map((u) => u.id));
                      } else {
                        setSelectedUsers([]);
                      }
                    }}
                  />
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-400">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-400">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-400">
                  Plan
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-400">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-400">
                  Resumes
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-400">
                  Joined
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-slate-600 dark:text-slate-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedUsers([...selectedUsers, user.id]);
                        } else {
                          setSelectedUsers(
                            selectedUsers.filter((id) => id !== user.id)
                          );
                        }
                      }}
                      className="rounded border-slate-300 dark:border-slate-600"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-400 to-violet-600 flex items-center justify-center text-white font-semibold">
                        {user.name[0]}
                      </div>
                      <span className="font-medium text-slate-900 dark:text-white">
                        {user.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                    {user.email}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        user.tier === 'pro'
                          ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400'
                          : 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400'
                      }`}
                    >
                      {user.tier === 'pro' ? '⭐ Pro' : '📦 Free'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        user.status === 'active'
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                          : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400'
                      }`}
                    >
                      {user.status === 'active' ? '✓ Active' : '⏸ Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                    {user.resumes}
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400 text-sm">
                    {new Date(user.joinedAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
                      <MoreVertical className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Showing {filteredUsers.length} of {USERS.length} users
          </p>
          <div className="flex gap-2">
            <button className="px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-700 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
              Previous
            </button>
            <button className="px-3 py-1 rounded-lg bg-violet-600 text-white text-sm font-medium">
              1
            </button>
            <button className="px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-700 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
