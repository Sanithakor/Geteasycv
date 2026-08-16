'use client';

import React, { useState, useEffect } from 'react';
import { Save, Rocket, AlertTriangle, Check, ShieldCheck, RefreshCw, Eye } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

export default function SettingsPage() {
  const [formData, setFormData] = useState({
    siteName: 'GetEasyCV',
    siteUrl: 'https://geteasycv.com',
    supportEmail: 'support@geteasycv.com',
    companyName: 'GetEasyCV Inc.',
    maintenanceMode: false,
    comingSoonMode: true,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingLaunchState, setPendingLaunchState] = useState<boolean | null>(null);

  useEffect(() => {
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setFormData((prev) => ({
            ...prev,
            siteName: data.data.appName || 'GetEasyCV',
            comingSoonMode: data.data.comingSoonMode ?? true,
            maintenanceMode: data.data.maintenanceMode ?? false,
          }));
        }
      })
      .catch((err) => console.warn('[SETTINGS_FETCH_WARN]', err))
      .finally(() => setIsLoading(false));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    if (name === 'comingSoonMode') {
      const nextState = checked;
      if (!nextState) {
        // Toggling to LIVE mode -> Require confirmation modal
        setPendingLaunchState(false);
        setShowConfirmModal(true);
        return;
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSaveSettings = async (overrideState?: Partial<typeof formData>) => {
    setIsSaving(true);
    const payload = overrideState ? { ...formData, ...overrideState } : formData;

    try {
      // Set cookie for middleware
      document.cookie = `coming_soon_mode=${payload.comingSoonMode ? 'true' : 'false'}; path=/; max-age=31536000`;

      const res = await fetch('/api/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setFormData(payload);
        toast.success(
          payload.comingSoonMode
            ? 'Coming Soon Mode ENABLED. Public visitors will see the coming soon page.'
            : 'GetEasyCV is now LIVE! Public visitors can access all pages.'
        );
      } else {
        toast.error(data.error || 'Failed to save settings.');
      }
    } catch (err) {
      toast.error('Network error saving settings.');
    } finally {
      setIsSaving(false);
      setShowConfirmModal(false);
    }
  };

  const confirmLiveLaunch = () => {
    handleSaveSettings({ comingSoonMode: false });
  };

  return (
    <div className="space-y-8 max-w-4xl font-sans text-left">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          System Settings
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Manage launch status, domain configurations, and system controls for https://geteasycv.com
        </p>
      </div>

      {/* 🚀 Admin-Controlled Launch & Coming Soon Status Card */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
              <Rocket className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Website Launch Status
              </h2>
              <p className="text-xs text-slate-500">
                Control public accessibility for https://geteasycv.com
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {formData.comingSoonMode ? (
              <span className="px-3 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-full text-xs font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                🟠 Coming Soon Mode (ON)
              </span>
            ) : (
              <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                🟢 Website Live (OFF)
              </span>
            )}
          </div>
        </div>

        <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <label className="text-sm font-bold text-slate-900 flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="comingSoonMode"
                  checked={formData.comingSoonMode}
                  onChange={handleChange}
                  className="w-4 h-4 text-purple-600 rounded border-slate-300 focus:ring-purple-500 cursor-pointer"
                />
                <span>Enable Coming Soon Mode</span>
              </label>
              <p className="text-xs text-slate-600 leading-relaxed pl-6">
                When turned <strong>ON</strong>, public visitors to <code>https://geteasycv.com</code> are served the Coming Soon page with waitlist registration. <strong>Admins maintain full access</strong> to test all builder &amp; template features.
              </p>
            </div>

            <a
              href="/coming-soon"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 text-xs font-bold text-slate-700 hover:text-slate-900 border border-slate-200 bg-white rounded-md flex items-center gap-1.5 shrink-0 shadow-2xs"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview Page</span>
            </a>
          </div>

          <div className="pt-2 border-t border-slate-200 text-xs text-slate-500 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-purple-600" />
            <span>Admin-only bypass is active. As an authenticated Admin, you can browse all pages freely.</span>
          </div>
        </div>
      </div>

      {/* General Configuration */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
        <h2 className="text-base font-bold text-slate-900">
          General Brand Settings
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Site Name</label>
            <input
              type="text"
              name="siteName"
              value={formData.siteName}
              onChange={handleChange}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Production URL</label>
            <input
              type="url"
              readOnly
              value={formData.siteUrl}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-md bg-slate-50 text-slate-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Support Email</label>
            <input
              type="email"
              name="supportEmail"
              value={formData.supportEmail}
              onChange={handleChange}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Company Name</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => handleSaveSettings()}
          disabled={isSaving}
          className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-md text-xs font-bold shadow-sm transition-all flex items-center gap-2 cursor-pointer disabled:opacity-60"
        >
          <Save className="w-4 h-4" />
          <span>{isSaving ? 'Saving Settings...' : 'Save Settings'}</span>
        </button>
      </div>

      {/* Confirmation Modal Before Launching Live */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-md w-full p-6 space-y-5">
            <div className="flex items-center gap-3 text-amber-600">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">Make GetEasyCV Live?</h3>
                <p className="text-xs text-slate-500">Confirm public website launch</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Are you sure you want to make GetEasyCV publicly accessible? This will turn off Coming Soon mode and allow all public visitors to access <strong>https://geteasycv.com</strong> directly.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold rounded-md"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmLiveLaunch}
                disabled={isSaving}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-md shadow-xs flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Yes, Launch Live</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <Toaster position="bottom-right" />
    </div>
  );
}
