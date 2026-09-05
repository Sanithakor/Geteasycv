'use client';
import React, { useState, useEffect } from 'react';
import { Send, Users, User, Bell, CheckCircle2 } from 'lucide-react';
import { useAuthStore } from '@/lib/store/authStore';

export default function NotificationsPage() {
  const [form, setForm] = useState({ title: '', message: '', target: 'all', type: 'info' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);

  const { token } = useAuthStore();

  const fetchNotifications = async () => {
    try {
      const headers: Record<string, string> = token ? { Authorization: `Bearer ${token}` } : {};
      const res = await fetch('/api/notifications', { headers });
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setNotifications(data.data);
      }
    } catch (err) {
      console.error('Failed to fetch notifications:', err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [token]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.message) return;

    setLoading(true);
    try {
      const res = await fetch('/api/notifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (data.success) {
        setSent(true);
        setForm({ title: '', message: '', target: 'all', type: 'info' });
        await fetchNotifications();
        setTimeout(() => setSent(false), 4000);
      }
    } catch (err) {
      console.error('Failed to send notification:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Notifications</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Send announcements and alerts to users in real-time</p>
      </div>

      {/* Compose */}
      <div className="rounded-[20px] border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-xs">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Send Notification</h2>
        {sent && (
          <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 rounded-md text-sm flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-600" />
            <span>Notification sent and broadcasted successfully!</span>
          </div>
        )}
        <form onSubmit={handleSend} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Target Audience
              </label>
              <select
                value={form.target}
                onChange={e => setForm(p => ({ ...p, target: e.target.value }))}
                className="w-full px-4 py-2 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 text-slate-800 dark:text-slate-200"
              >
                <option value="all">All Users</option>
                <option value="free">Free Tier Users</option>
                <option value="pro">Pro &amp; Premium Users</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Type
              </label>
              <select
                value={form.type}
                onChange={e => setForm(p => ({ ...p, type: e.target.value }))}
                className="w-full px-4 py-2 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 text-slate-800 dark:text-slate-200"
              >
                <option value="info">Info</option>
                <option value="promo">Promotion / Announcement</option>
                <option value="warning">Warning / Notice</option>
                <option value="user_signup">User Update</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Title
            </label>
            <input
              type="text"
              value={form.title}
              onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
              placeholder="Notification title..."
              className="w-full px-4 py-2 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 text-slate-800 dark:text-slate-200"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Message
            </label>
            <textarea
              value={form.message}
              onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
              placeholder="Write your message here..."
              rows={4}
              className="w-full px-4 py-2 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none text-slate-800 dark:text-slate-200"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading || !form.title || !form.message}
            className="flex items-center gap-2 px-6 py-2.5 bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white rounded-md font-medium text-sm transition-colors cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>{loading ? 'Sending...' : 'Send Notification'}</span>
          </button>
        </form>
      </div>

      {/* Recent Notifications */}
      <div className="rounded-[20px] border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Recent Notifications</h2>
          <span className="text-xs font-semibold text-slate-500">Total: {notifications.length}</span>
        </div>

        <div className="space-y-4">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-sm">No notifications found</div>
          ) : (
            notifications.map(n => (
              <div key={n.id} className="flex items-start gap-4 p-4 rounded-md bg-slate-50 dark:bg-slate-700/50 border border-slate-100 dark:border-slate-700">
                <div className="w-10 h-10 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center flex-shrink-0">
                  {n.target === 'all' ? (
                    <Users className="w-5 h-5 text-violet-600" />
                  ) : (
                    <User className="w-5 h-5 text-violet-600" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-bold text-slate-900 dark:text-white text-sm truncate">{n.title}</p>
                    <span className="text-xs text-slate-400 flex-shrink-0 font-medium">
                      {new Date(n.createdAt).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">{n.message}</p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-slate-400 font-medium">
                    <span className="capitalize px-2 py-0.5 rounded-full bg-slate-200/60 dark:bg-slate-600/50 text-slate-700 dark:text-slate-300 text-[10px] font-bold">
                      Target: {n.target || 'All'}
                    </span>
                    <span className="capitalize px-2 py-0.5 rounded-full bg-violet-100/70 text-violet-700 text-[10px] font-bold">
                      Type: {n.type || 'info'}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
