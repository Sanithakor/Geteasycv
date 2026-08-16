'use client';

import React, { useState } from 'react';
import UserLayout from '@/components/layout/UserLayout';
import { Settings, Lock, Bell, Save, CheckCircle2, AlertCircle } from 'lucide-react';

export default function UserSettingsPage() {
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    resumeViews: true,
    weeklyDigest: false,
    productUpdates: true,
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (passwords.newPassword !== passwords.confirmPassword) {
      setErrorMsg('New passwords do not match');
      return;
    }

    if (passwords.newPassword.length < 8) {
      setErrorMsg('Password must be at least 8 characters long');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/users/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: passwords.currentPassword,
          newPassword: passwords.newPassword,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccessMsg('Password updated successfully!');
        setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
        setTimeout(() => setSuccessMsg(''), 4000);
      } else {
        setErrorMsg(data.error || 'Failed to update password.');
      }
    } catch (err) {
      setErrorMsg('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <UserLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
            <Settings className="w-6 h-6 text-teal-600" />
            <span>Account Settings</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage your account security and email notification preferences.
          </p>
        </div>

        {errorMsg && (
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-md flex items-center gap-3 text-rose-700 text-sm font-semibold">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-md flex items-center gap-3 text-emerald-700 text-sm font-semibold">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Security & Password */}
        <div className="bg-white border border-slate-200 rounded-md p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
            <div className="w-9 h-9 rounded-md bg-teal-50 text-teal-600 flex items-center justify-center border border-teal-100">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Security & Password</h2>
              <p className="text-xs text-slate-500">Update your account password to maintain security.</p>
            </div>
          </div>

          <form onSubmit={handlePasswordSubmit} className="space-y-4 max-w-lg">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Current Password</label>
              <input
                type="password"
                value={passwords.currentPassword}
                onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
                className="w-full px-4 py-2.5 rounded-md bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-teal-500"
                placeholder="••••••••"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-2">New Password</label>
              <input
                type="password"
                value={passwords.newPassword}
                onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                className="w-full px-4 py-2.5 rounded-md bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-teal-500"
                placeholder="••••••••"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Confirm New Password</label>
              <input
                type="password"
                value={passwords.confirmPassword}
                onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                className="w-full px-4 py-2.5 rounded-md bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-teal-500"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 rounded-md bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Update Password</span>
            </button>
          </form>
        </div>

        {/* Notifications */}
        <div className="bg-white border border-slate-200 rounded-md p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
            <div className="w-9 h-9 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Email Notifications</h2>
              <p className="text-xs text-slate-500">Choose when and how we notify you.</p>
            </div>
          </div>

          <div className="space-y-4 max-w-lg">
            <label className="flex items-center justify-between p-3.5 rounded-md bg-slate-50 border border-slate-200 cursor-pointer">
              <span className="text-sm font-semibold text-slate-700">Email alerts for account security</span>
              <input
                type="checkbox"
                checked={notifications.emailAlerts}
                onChange={(e) => setNotifications({ ...notifications, emailAlerts: e.target.checked })}
                className="w-4 h-4 accent-teal-600"
              />
            </label>

            <label className="flex items-center justify-between p-3.5 rounded-md bg-slate-50 border border-slate-200 cursor-pointer">
              <span className="text-sm font-semibold text-slate-700">Notifications when resume is downloaded/viewed</span>
              <input
                type="checkbox"
                checked={notifications.resumeViews}
                onChange={(e) => setNotifications({ ...notifications, resumeViews: e.target.checked })}
                className="w-4 h-4 accent-teal-600"
              />
            </label>

            <label className="flex items-center justify-between p-3.5 rounded-md bg-slate-50 border border-slate-200 cursor-pointer">
              <span className="text-sm font-semibold text-slate-700">Product updates & feature releases</span>
              <input
                type="checkbox"
                checked={notifications.productUpdates}
                onChange={(e) => setNotifications({ ...notifications, productUpdates: e.target.checked })}
                className="w-4 h-4 accent-teal-600"
              />
            </label>
          </div>
        </div>
      </div>
    </UserLayout>
  );
}
