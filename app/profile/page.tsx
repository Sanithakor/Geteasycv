'use client';

import React, { useState } from 'react';
import UserLayout from '@/components/layout/UserLayout';
import { useAuthStore } from '@/lib/store/authStore';
import { User, Mail, Building, MapPin, Globe, Save, CheckCircle2 } from 'lucide-react';

export default function UserProfilePage() {
  const { user, setUser } = useAuthStore();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    company: (user as any)?.company || 'SaaS Inc',
    location: (user as any)?.location || 'San Francisco, CA',
    website: (user as any)?.website || 'https://myportfolio.dev',
    bio: (user as any)?.bio || 'Senior Software Engineer specializing in modern Web Apps & AI integrations.',
  });
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);

    try {
      if (user) {
        setUser({
          ...user,
          name: formData.name,
          email: formData.email,
        });
      }
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('Update profile error:', err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <UserLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
            <User className="w-6 h-6 text-teal-600" />
            <span>Profile Settings</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage your account profile details and personal information.
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white border border-slate-200 rounded-md p-6 sm:p-8 space-y-8 shadow-xs">
          <div className="flex items-center gap-6 pb-6 border-b border-slate-100">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-500 to-blue-600 text-white font-bold text-2xl flex items-center justify-center flex-shrink-0 shadow-md">
              {formData.name?.[0]?.toUpperCase() || 'U'}
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">{user?.name || 'User Name'}</h2>
              <p className="text-sm text-slate-500">{user?.email}</p>
              <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold uppercase bg-teal-50 text-teal-700 border border-teal-200">
                {user?.role || 'User'} • {user?.tier || (user as any)?.subscriptionTier || 'Free'}
              </span>
            </div>
          </div>

          {success && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-md flex items-center gap-3 text-emerald-700 text-sm font-semibold">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Profile details updated successfully!</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 rounded-md bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-teal-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 rounded-md bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-teal-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Company / Organization
                </label>
                <div className="relative">
                  <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 rounded-md bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Location
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 rounded-md bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Personal Website / Portfolio Link
              </label>
              <div className="relative">
                <Globe className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 rounded-md bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Professional Summary / Bio
              </label>
              <textarea
                name="bio"
                rows={4}
                value={formData.bio}
                onChange={handleChange}
                className="w-full p-4 rounded-md bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-teal-500"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 px-6 py-3 rounded-md bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-all shadow-md"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? 'Saving Changes...' : 'Save Profile'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </UserLayout>
  );
}
