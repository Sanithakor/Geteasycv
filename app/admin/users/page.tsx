/**
 * Users Management Page
 * View and manage all platform users
 */

'use client';

import React from 'react';
import { Search, Plus, MoreVertical, Ban, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useAuthStore } from '@/lib/store/authStore';
import toast, { Toaster } from 'react-hot-toast';

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

const DEFAULT_USERS: UserData[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    subscriptionTier: 'pro',
    role: 'user',
    isActive: true,
    isBanned: false,
    createdAt: '2024-01-15T00:00:00.000Z',
    resumes: 5,
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    subscriptionTier: 'free',
    role: 'user',
    isActive: true,
    isBanned: false,
    createdAt: '2024-02-20T00:00:00.000Z',
    resumes: 2,
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    subscriptionTier: 'pro',
    role: 'user',
    isActive: false,
    isBanned: false,
    createdAt: '2024-03-10T00:00:00.000Z',
    resumes: 8,
  },
  {
    id: '4',
    name: 'Sarah Williams',
    email: 'sarah@example.com',
    subscriptionTier: 'free',
    role: 'user',
    isActive: true,
    isBanned: false,
    createdAt: '2024-01-05T00:00:00.000Z',
    resumes: 1,
  },
  {
    id: '5',
    name: 'Tom Brown',
    email: 'tom@example.com',
    subscriptionTier: 'pro',
    role: 'user',
    isActive: true,
    isBanned: false,
    createdAt: '2024-02-14T00:00:00.000Z',
    resumes: 12,
  },
];

export default function UsersPage() {
  const [users, setUsers] = React.useState<UserData[]>(DEFAULT_USERS);
  const [isLoading, setIsLoading] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedUsers, setSelectedUsers] = React.useState<string[]>([]);
  const [openMenuId, setOpenMenuId] = React.useState<string | null>(null);
  const { token } = useAuthStore();

  const fetchUsers = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/users', {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          setUsers(json.data);
        }
      }
    } catch (err) {
      console.warn('[USERS_FETCH_WARN]', err);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  React.useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleUpdateStatus = async (userId: string, newStatus: boolean) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, isActive: newStatus } : u))
    );
    try {
      await fetch('/api/users', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ userId, isActive: newStatus }),
      });
      toast.success(newStatus ? 'User activated!' : 'User deactivated!');
    } catch {
      toast.error('Failed to update status.');
    }
  };

  const handleUpdateBan = async (userId: string, newBan: boolean) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, isBanned: newBan } : u))
    );
    try {
      await fetch('/api/users', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ userId, isBanned: newBan }),
      });
      toast.success(newBan ? 'User banned!' : 'User unbanned!');
      setOpenMenuId(null);
    } catch {
      toast.error('Failed to update ban status.');
    }
  };

  const handleUpdateTier = async (userId: string, currentTier: string) => {
    const nextTier = currentTier === 'pro' ? 'free' : 'pro';
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, subscriptionTier: nextTier } : u))
    );
    try {
      await fetch('/api/users', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ userId, subscriptionTier: nextTier }),
      });
      toast.success(`Plan updated to ${nextTier.toUpperCase()}!`);
    } catch {
      toast.error('Failed to update plan.');
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 font-sans">
      <Toaster position="bottom-right" />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Users
          </h1>
          <p className="text-slate-500 text-sm mt-0.5 font-medium">
            Manage and view all users ({users.length} total)
          </p>
        </div>
        <Link
          href="/admin/users/new"
          className="flex items-center gap-2 px-5 py-2.5 bg-[#FF570F] hover:bg-[#E04800] text-white rounded-xl font-bold text-sm shadow-md transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Add User</span>
        </Link>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md">
        <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FF570F]/20 focus:border-[#FF570F] text-sm font-medium transition-all"
        />
      </div>

      {/* Card Table Container */}
      <div className="rounded-[20px] border border-slate-200/80 bg-white overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/75 text-xs font-bold text-slate-500 tracking-wider">
                <th className="px-5 py-3.5 w-10">
                  <input
                    type="checkbox"
                    className="rounded border-slate-300 text-[#FF570F] focus:ring-[#FF570F]"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedUsers(filteredUsers.map((u) => u.id));
                      } else {
                        setSelectedUsers([]);
                      }
                    }}
                  />
                </th>
                <th className="px-5 py-3.5">Name</th>
                <th className="px-5 py-3.5">Email</th>
                <th className="px-5 py-3.5">Plan</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5">Resumes</th>
                <th className="px-5 py-3.5">Joined</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.map((user) => {
                const isPro = user.subscriptionTier === 'pro';
                const isActive = user.isActive;
                return (
                  <tr
                    key={user.id}
                    className="hover:bg-slate-50/60 transition-colors"
                  >
                    <td className="px-5 py-4">
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
                        className="rounded border-slate-300 text-[#FF570F] focus:ring-[#FF570F]"
                      />
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-pink-400 to-[#FF570F] text-white font-bold text-sm flex items-center justify-center shadow-xs">
                          {user.name?.[0]?.toUpperCase() || 'U'}
                        </div>
                        <span className="font-bold text-slate-900 text-sm">
                          {user.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm font-medium text-slate-600">
                      {user.email}
                    </td>
                    <td className="px-5 py-4">
                      <button
                        type="button"
                        onClick={() => handleUpdateTier(user.id, user.subscriptionTier)}
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer hover:opacity-85 ${
                          isPro
                            ? 'bg-[#FFF0EB] text-[#E04800] border border-[#FF8C5A]/30'
                            : 'bg-slate-100 text-slate-600 border border-slate-200'
                        }`}
                        title="Click to toggle subscription plan"
                      >
                        <span>{isPro ? '⭐ Pro' : '📦 Free'}</span>
                      </button>
                    </td>
                    <td className="px-5 py-4">
                      <button
                        type="button"
                        onClick={() => handleUpdateStatus(user.id, !user.isActive)}
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer hover:opacity-85 ${
                          isActive
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                        title="Click to toggle active status"
                      >
                        <span>{isActive ? '✓ Active' : '⏸ Inactive'}</span>
                      </button>
                    </td>
                    <td className="px-5 py-4 text-sm font-bold text-slate-700">
                      {user.resumes}
                    </td>
                    <td className="px-5 py-4 text-sm font-semibold text-slate-500">
                      {new Date(user.createdAt).toLocaleDateString('en-US', {
                        month: '2-digit',
                        day: '2-digit',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="px-5 py-4 text-right relative">
                      <button
                        type="button"
                        onClick={() => setOpenMenuId(openMenuId === user.id ? null : user.id)}
                        className="p-1.5 hover:bg-slate-100 rounded-md text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>

                      {openMenuId === user.id && (
                        <>
                          <div className="fixed inset-0 z-10" onClick={() => setOpenMenuId(null)} />
                          <div className="absolute right-6 top-10 w-44 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl z-20 text-left">
                            <button
                              type="button"
                              onClick={() => handleUpdateBan(user.id, !user.isBanned)}
                              className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-bold text-red-600 hover:bg-red-50 cursor-pointer"
                            >
                              <Ban className="w-3.5 h-3.5" />
                              <span>{user.isBanned ? 'Unban User' : 'Ban User'}</span>
                            </button>
                          </div>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer Pagination matching Image 1 */}
        <div className="px-5 py-3.5 border-t border-slate-100 flex items-center justify-between bg-slate-50/40">
          <p className="text-xs font-semibold text-slate-500">
            Showing {filteredUsers.length} of {users.length} users
          </p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer">
              Previous
            </button>
            <button className="w-8 h-8 rounded-lg bg-[#FF570F] text-white text-xs font-bold flex items-center justify-center shadow-xs">
              1
            </button>
            <button className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
