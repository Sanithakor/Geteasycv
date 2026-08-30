/**
 * Users Management Page
 * View, search, and manage the complete platform user registry with real-time online presence,
 * registration history, and dynamic user statistics.
 */

'use client';

import React from 'react';
import { Search, Plus, MoreVertical, Ban, Users, Activity, UserCheck, UserPlus, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { useAuthStore } from '@/lib/store/authStore';
import toast, { Toaster } from 'react-hot-toast';

interface UserData {
  id: string;
  name: string;
  email: string;
  avatar?: string | null;
  googleId?: string | null;
  subscriptionTier: string;
  role: string;
  isActive: boolean;
  isBanned: boolean;
  isOnline: boolean;
  createdAt: string;
  lastLoginAt?: string | null;
  lastSeenAt?: string | null;
  resumes: number;
}

function formatRelativeTime(dateStr?: string | null): string {
  if (!dateStr) return 'Never';
  const timeMs = new Date(dateStr).getTime();
  if (isNaN(timeMs)) return 'Never';
  const diffMins = Math.floor((Date.now() - timeMs) / (1000 * 60));
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays}d ago`;
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function UsersPage() {
  const [users, setUsers] = React.useState<UserData[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
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
        if (json.success && Array.isArray(json.data)) {
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

    // Auto refresh users list and online presence every 30 seconds
    const interval = setInterval(fetchUsers, 30000);
    return () => clearInterval(interval);
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
      prev.map((u) => (u.id === userId ? { ...u, isBanned: newBan, isOnline: newBan ? false : u.isOnline } : u))
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

  // Dynamic Statistics Calculations
  const totalRegistered = users.length;
  const onlineCount = users.filter((u) => u.isOnline).length;
  const offlineCount = Math.max(0, totalRegistered - onlineCount);
  const newUsersCount = users.filter((u) => {
    if (!u.createdAt) return false;
    const diff = Date.now() - new Date(u.createdAt).getTime();
    return diff < 30 * 24 * 60 * 60 * 1000;
  }).length;

  return (
    <div className="space-y-6 font-sans">
      <Toaster position="bottom-right" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Users & Presence
          </h1>
          <p className="text-slate-500 text-sm mt-0.5 font-medium">
            Complete platform user registry & real-time activity tracking
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchUsers}
            disabled={isLoading}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl font-semibold text-sm shadow-2xs transition-all cursor-pointer"
            title="Refresh Users List"
          >
            <RefreshCw className={`w-4 h-4 text-slate-500 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
          <Link
            href="/admin/users/new"
            className="flex items-center gap-2 px-5 py-2.5 bg-[#FF570F] hover:bg-[#E04800] text-white rounded-xl font-bold text-sm shadow-md transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Add User</span>
          </Link>
        </div>
      </div>

      {/* Dynamic Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="rounded-[20px] border border-slate-200/80 bg-white p-5 shadow-2xs space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Registered</span>
            <div className="w-8 h-8 rounded-lg bg-violet-50 text-violet-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 tracking-tight">{totalRegistered}</p>
          <p className="text-xs font-semibold text-slate-500">All-time registered accounts</p>
        </div>

        <div className="rounded-[20px] border border-slate-200/80 bg-white p-5 shadow-2xs space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Currently Online</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-emerald-600 tracking-tight">{onlineCount}</p>
          <p className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
            Active session within 5m
          </p>
        </div>

        <div className="rounded-[20px] border border-slate-200/80 bg-white p-5 shadow-2xs space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Currently Offline</span>
            <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center">
              <UserCheck className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-700 tracking-tight">{offlineCount}</p>
          <p className="text-xs font-semibold text-slate-500">Inactive or signed out</p>
        </div>

        <div className="rounded-[20px] border border-slate-200/80 bg-white p-5 shadow-2xs space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">New (30 Days)</span>
            <div className="w-8 h-8 rounded-lg bg-[#FFF0EB] text-[#FF570F] flex items-center justify-center">
              <UserPlus className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900 tracking-tight">{newUsersCount}</p>
          <p className="text-xs font-semibold text-slate-500">Recent registrations</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search by name or email address..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FF570F]/20 focus:border-[#FF570F] text-sm font-medium transition-all"
        />
      </div>

      {/* Complete User Registry Table */}
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
                <th className="px-5 py-3.5">User</th>
                <th className="px-5 py-3.5">Email</th>
                <th className="px-5 py-3.5">Presence</th>
                <th className="px-5 py-3.5">Plan</th>
                <th className="px-5 py-3.5">Account Status</th>
                <th className="px-5 py-3.5">Resumes</th>
                <th className="px-5 py-3.5">Registration Date</th>
                <th className="px-5 py-3.5">Last Seen</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading && users.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-12 text-center text-xs font-semibold text-slate-400 animate-pulse">
                    Loading complete user registry...
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-12 text-center text-xs font-semibold text-slate-400">
                    No users found matching "{searchTerm}"
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => {
                  const isPro = user.subscriptionTier === 'pro' || user.subscriptionTier === 'premium';
                  const isActive = user.isActive;
                  const isOnline = user.isOnline;

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
                          {user.avatar ? (
                            <img
                              src={user.avatar}
                              alt={user.name}
                              className="w-9 h-9 rounded-full object-cover border border-slate-200"
                            />
                          ) : (
                            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-pink-400 to-[#FF570F] text-white font-bold text-sm flex items-center justify-center shadow-xs">
                              {user.name?.[0]?.toUpperCase() || 'U'}
                            </div>
                          )}
                          <div>
                            <span className="font-bold text-slate-900 text-sm block">
                              {user.name}
                            </span>
                            {user.googleId && (
                              <span className="text-[10px] font-semibold text-slate-400 flex items-center gap-1">
                                🌐 Google Account
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-sm font-medium text-slate-600">
                        {user.email}
                      </td>
                      {/* Presence indicator: 🟢 Online / ⚪ Offline */}
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                            isOnline
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-slate-100 text-slate-600 border border-slate-200'
                          }`}
                        >
                          <span
                            className={`w-2 h-2 rounded-full ${
                              isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'
                            }`}
                          />
                          {isOnline ? '🟢 Online' : '⚪ Offline'}
                        </span>
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
                            user.isBanned
                              ? 'bg-rose-50 text-rose-700 border border-rose-200'
                              : isActive
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}
                          title="Click to toggle active status"
                        >
                          <span>
                            {user.isBanned ? '🚫 Banned' : isActive ? '✓ Active' : '⏸ Inactive'}
                          </span>
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
                      <td className="px-5 py-4 text-sm font-semibold text-slate-500">
                        {formatRelativeTime(user.lastSeenAt || user.lastLoginAt)}
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
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Pagination */}
        <div className="px-5 py-3.5 border-t border-slate-100 flex items-center justify-between bg-slate-50/40">
          <p className="text-xs font-semibold text-slate-500">
            Showing {filteredUsers.length} of {totalRegistered} registered users
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
