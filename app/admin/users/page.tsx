/**
 * Users Management Page
 * View and manage all users
 */

'use client';

import React from 'react';
import { Search, Plus, MoreVertical, Edit2, Trash2, Lock, Mail, Ban, ShieldAlert } from 'lucide-react';
import Link from 'next/link';
import { useAuthStore } from '@/lib/store/authStore';
import toast, { Toaster } from 'react-hot-toast';

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

interface UserData {
  id: string;
  name: string;
  email: string;
  subscriptionTier: string;
  role: string;
  isActive: boolean;
  isBanned: boolean;
  createdAt: string;
  resumes: number;
}

export default function UsersPage() {
  const [users, setUsers] = React.useState<UserData[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState('');
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedUsers, setSelectedUsers] = React.useState<string[]>([]);
  const [openMenuId, setOpenMenuId] = React.useState<string | null>(null);
  const { token } = useAuthStore();

  const fetchUsers = React.useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      const res = await fetch('/api/users', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!res.ok) {
        throw new Error(`Failed to load users: HTTP ${res.status}`);
      }
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setUsers(json.data);
      } else {
        throw new Error(json.error || 'Invalid API response format');
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred while loading users.');
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  React.useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleUpdateStatus = async (userId: string, newStatus: boolean) => {
    try {
      // Optimistic Update
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, isActive: newStatus } : u));
      
      const res = await fetch('/api/users', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ userId, isActive: newStatus })
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      toast.success(newStatus ? 'User activated successfully!' : 'User deactivated successfully!');
    } catch (err) {
      console.error(err);
      toast.error('Failed to update user status.');
      // Revert change
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, isActive: !newStatus } : u));
    }
  };

  const handleUpdateBan = async (userId: string, newBan: boolean) => {
    try {
      // Optimistic Update
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, isBanned: newBan } : u));
      
      const res = await fetch('/api/users', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ userId, isBanned: newBan })
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      toast.success(newBan ? 'User banned successfully!' : 'User unbanned successfully!');
      setOpenMenuId(null);
    } catch (err) {
      console.error(err);
      toast.error('Failed to update user ban status.');
      // Revert change
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, isBanned: !newBan } : u));
    }
  };

  const handleUpdateTier = async (userId: string, currentTier: string) => {
    const nextTier = currentTier === 'pro' ? 'free' : 'pro';
    try {
      // Optimistic Update
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, subscriptionTier: nextTier } : u));
      
      const res = await fetch('/api/users', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ userId, subscriptionTier: nextTier })
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      toast.success(`User plan updated to ${nextTier.toUpperCase()}!`);
    } catch (err) {
      console.error(err);
      toast.error('Failed to update user plan.');
      // Revert change
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, subscriptionTier: currentTier } : u));
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Toaster position="bottom-right" />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">
            Users
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Manage and view all users ({users.length} total)
          </p>
        </div>
        <Link
          href="/admin/users/new"
          className="flex items-center gap-2 px-4 py-2 bg-[#FF570F] hover:bg-[#E04800] text-white rounded-md font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add User
        </Link>
      </div>

      {/* Filters */}
      <div className="flex gap-3.5 items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#FF570F]"
          />
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="p-3.5 rounded-md bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm">
          {error} — <button onClick={fetchUsers} className="underline font-semibold">Retry</button>
        </div>
      )}

      {/* Table */}
      <div className="rounded-[20px] border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden">
        {isLoading ? (
          <div className="p-12 flex flex-col items-center justify-center gap-3">
            <div className="w-8 h-8 rounded-full border-2 border-[#FF570F] border-t-transparent animate-spin" />
            <p className="text-sm text-slate-500">Loading user registry...</p>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            No users found matching your filters.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50">
                  <th className="px-4.5 py-3 text-left">
                    <input
                      type="checkbox"
                      className="rounded border-slate-300 dark:border-slate-600"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedUsers(filteredUsers.map((u) => u.id));
                        } else {
                          setSelectedUsers([]);
                        }
                      }}
                    />
                  </th>
                  <th className="px-4.5 py-3 text-left text-sm font-semibold text-slate-600 dark:text-slate-400">
                    Name
                  </th>
                  <th className="px-4.5 py-3 text-left text-sm font-semibold text-slate-600 dark:text-slate-400">
                    Email
                  </th>
                  <th className="px-4.5 py-3 text-left text-sm font-semibold text-slate-600 dark:text-slate-400">
                    Plan
                  </th>
                  <th className="px-4.5 py-3 text-left text-sm font-semibold text-slate-600 dark:text-slate-400">
                    Status
                  </th>
                  <th className="px-4.5 py-3 text-left text-sm font-semibold text-slate-600 dark:text-slate-400">
                    Resumes
                  </th>
                  <th className="px-4.5 py-3 text-left text-sm font-semibold text-slate-600 dark:text-slate-400">
                    Joined
                  </th>
                  <th className="px-4.5 py-3 text-right text-sm font-semibold text-slate-600 dark:text-slate-400">
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
                    <td className="px-4.5 py-3">
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
                    <td className="px-4.5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-400 to-[#FF570F] flex items-center justify-center text-white font-semibold capitalize">
                          {user.name?.[0] || 'U'}
                        </div>
                        <span className="font-medium text-slate-900 dark:text-white">
                          {user.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-4.5 py-3 text-slate-600 dark:text-slate-400">
                      {user.email}
                    </td>
                    <td className="px-4.5 py-3">
                      <button
                        onClick={() => handleUpdateTier(user.id, user.subscriptionTier)}
                        className={`px-3 py-1 rounded-full text-xs font-semibold select-none cursor-pointer hover:opacity-85 ${
                          user.subscriptionTier === 'pro'
                            ? 'bg-[#FFF0EB] text-[#E04800] dark:bg-purple-900/20 dark:text-purple-400'
                            : 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400'
                        }`}
                        title="Click to toggle subscription plan"
                      >
                        {user.subscriptionTier === 'pro' ? '⭐ Pro' : '📦 Free'}
                      </button>
                    </td>
                    <td className="px-4.5 py-3">
                      <button
                        onClick={() => handleUpdateStatus(user.id, !user.isActive)}
                        className={`px-3 py-1 rounded-full text-xs font-semibold select-none cursor-pointer hover:opacity-85 ${
                          user.isActive
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                            : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400'
                        }`}
                        title="Click to toggle status"
                      >
                        {user.isActive ? '✓ Active' : '⏸ Inactive'}
                      </button>
                    </td>
                    <td className="px-4.5 py-3 text-slate-600 dark:text-slate-400">
                      {user.resumes}
                    </td>
                    <td className="px-4.5 py-3 text-slate-600 dark:text-slate-400 text-sm">
                      {new Date(user.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit'
                      })}
                    </td>
                    <td className="px-4.5 py-3 text-right relative">
                      <button
                        onClick={() => setOpenMenuId(openMenuId === user.id ? null : user.id)}
                        className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md transition-colors"
                      >
                        <MoreVertical className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                      </button>

                      {openMenuId === user.id && (
                        <>
                          <div className="fixed inset-0 z-10" onClick={() => setOpenMenuId(null)} />
                          <div className="absolute right-6 top-12 w-44 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-1.5 shadow-xl z-20 text-left">
                            <button
                              onClick={() => handleUpdateBan(user.id, !user.isBanned)}
                              className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                            >
                              <Ban className="w-4 h-4" />
                              <span>{user.isBanned ? 'Unban User' : 'Ban User'}</span>
                            </button>
                          </div>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        <div className="px-4.5 py-3 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Showing {filteredUsers.length} of {users.length} users
          </p>
          <div className="flex gap-2">
            <button className="px-3 py-1 rounded-md border border-slate-200 dark:border-slate-700 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
              Previous
            </button>
            <button className="px-3 py-1 rounded-md bg-[#FF570F] text-white text-sm font-medium">
              1
            </button>
            <button className="px-3 py-1 rounded-md border border-slate-200 dark:border-slate-700 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
