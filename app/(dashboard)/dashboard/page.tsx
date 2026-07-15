/**
 * User Dashboard Page
 * Premium SaaS user dashboard with analytics and resume management
 * Integrated with sidebar and header layout
 */

'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import Link from 'next/link';
import { Plus, MoreVertical, Download, Eye, FileText, Download as DownloadIcon } from 'lucide-react';

// Mock data for charts
const activityData = [
  { month: 'Jan', resumes: 1, downloads: 0 },
  { month: 'Feb', resumes: 1, downloads: 2 },
  { month: 'Mar', resumes: 2, downloads: 5 },
  { month: 'Apr', resumes: 2, downloads: 3 },
  { month: 'May', resumes: 2, downloads: 8 },
  { month: 'Jun', resumes: 3, downloads: 4 },
];

const recentResumes = [
  {
    id: '1',
    title: 'Software Engineer Resume',
    template: 'Modern',
    lastModified: '2 hours ago',
    status: 'published',
    views: 24,
    downloads: 5,
  },
  {
    id: '2',
    title: 'Product Manager Resume',
    template: 'Executive',
    lastModified: '1 day ago',
    status: 'published',
    views: 18,
    downloads: 3,
  },
  {
    id: '3',
    title: 'UX Designer Resume',
    template: 'Creative',
    lastModified: '3 days ago',
    status: 'draft',
    views: 0,
    downloads: 0,
  },
];

export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated, user, _hydrated } = useAuthStore();
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    if (!_hydrated) return;
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    setIsLoading(false);
  }, [_hydrated, isAuthenticated, router]);

  if (!_hydrated || !isAuthenticated || !user || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-600 mb-4 animate-pulse">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <p className="text-slate-600 dark:text-slate-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
            Welcome back, {user.name}!
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            {user.tier === 'free' ? '📦 Free Plan' : '⭐ Premium Plan'} • {user.email}
          </p>
        </div>
        <Link
          href="/editor"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
        >
          <Plus className="w-5 h-5" />
          Create New Resume
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard title="Total Resumes" value="3" icon="📄" trend={{ value: 1, direction: 'up', period: 'this month' }} />
        <KPICard title="Total Downloads" value="12" icon="⬇️" trend={{ value: 4, direction: 'up', period: 'this month' }} />
        <KPICard title="Profile Views" value="48" icon="👁️" trend={{ value: 15, direction: 'up', period: 'this month' }} />
        <KPICard title="Shares" value="8" icon="🔗" trend={{ value: 2, direction: 'up', period: 'this month' }} />
      </div>

      {/* Charts & Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Activity Overview</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">Your resume activity over the past 6 months</p>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={activityData}>
              <defs>
                <linearGradient id="colorResumes" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#f1f5f9' }} />
              <Area type="monotone" dataKey="downloads" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorResumes)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-6">
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-900 dark:text-white">Downloads</h3>
              <DownloadIcon className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-slate-900 dark:text-white">12</p>
            <p className="text-sm text-green-600 dark:text-green-400 mt-2">↑ 4 from last month</p>
          </div>

          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-900 dark:text-white">Profile Views</h3>
              <Eye className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-3xl font-bold text-slate-900 dark:text-white">48</p>
            <p className="text-sm text-green-600 dark:text-green-400 mt-2">↑ 15 from last month</p>
          </div>

          <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-6">
            <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Current Plan</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white mt-2">{user.tier === 'free' ? '📦 Free' : '⭐ Premium'}</p>
            <Link href="/pricing" className="text-sm text-blue-600 dark:text-blue-400 hover:underline mt-3 inline-block font-medium">
              View plans →
            </Link>
          </div>
        </div>
      </div>

      {/* Resumes Table */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 overflow-hidden">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Your Resumes</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{recentResumes.length} resumes total</p>
          </div>
          <Link href="/my-resumes" className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium">
            View all →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50">
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-400">Resume</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-400">Template</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-400">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-400">Views / Downloads</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-400">Modified</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-slate-600 dark:text-slate-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {recentResumes.map((resume) => (
                <tr key={resume.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white">
                        <FileText className="w-5 h-5" />
                      </div>
                      <p className="font-medium text-slate-900 dark:text-white">{resume.title}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{resume.template}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${resume.status === 'published' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'}`}>
                      <span className={`w-2 h-2 rounded-full ${resume.status === 'published' ? 'bg-green-600' : 'bg-yellow-600'}`} />
                      {resume.status === 'published' ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400 text-sm">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1"><Eye className="w-4 h-4" /><span>{resume.views}</span></div>
                      <div className="flex items-center gap-1"><Download className="w-4 h-4" /><span>{resume.downloads}</span></div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400 text-sm">{resume.lastModified}</td>
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
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <QuickActionButton href="/templates" icon="🎨" title="Browse Templates">
            Explore 20+ professional templates
          </QuickActionButton>
          <QuickActionButton href="/editor" icon="✏️" title="Create Resume">
            Start building your resume
          </QuickActionButton>
          <QuickActionButton href="/pricing" icon="⭐" title="Upgrade to Pro">
            Unlock premium features
          </QuickActionButton>
        </div>
      </div>
    </div>
  );
}

function KPICard({ title, value, icon, trend }: { title: string; value: string; icon: string; trend?: { value: number; direction: 'up' | 'down'; period: string } }) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 hover:border-blue-400 dark:hover:border-blue-600">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent dark:from-blue-900/10 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400">{title}</h3>
          <span className="text-2xl opacity-60 group-hover:opacity-100 transition-opacity">{icon}</span>
        </div>
        <p className="text-3xl font-bold text-slate-900 dark:text-white mb-4">{value}</p>
        {trend && (
          <div className="flex items-center gap-2">
            <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${trend.direction === 'up' ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400' : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400'}`}>
              {trend.direction === 'up' ? '↑' : '↓'} {trend.value}%
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400">{trend.period}</span>
          </div>
        )}
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
    </div>
  );
}

function QuickActionButton({ href, icon, title, children }: { href: string; icon: string; title: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="group flex flex-col gap-3 px-6 py-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-lg hover:shadow-blue-500/10 transition-all">
      <div className="flex items-center justify-between">
        <span className="text-2xl group-hover:scale-110 transition-transform">{icon}</span>
      </div>
      <div>
        <h3 className="font-medium text-slate-900 dark:text-white">{title}</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{children}</p>
      </div>
    </Link>
  );
}
