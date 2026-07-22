/**
 * Redesigned Admin Dashboard matching mock design reference
 */

'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import Link from 'next/link';
import {
  Users,
  FileText,
  Download,
  Award,
  CreditCard,
  Coins,
  Sparkles,
  LayoutTemplate,
  Calendar,
  ChevronRight,
  TrendingUp,
  Clock
} from 'lucide-react';

// Sparkline component inside Dashboard
function Sparkline({ points, color }: { points: number[]; color: string }) {
  const width = 150;
  const height = 36;
  const maxVal = Math.max(...points);
  const minVal = Math.min(...points);
  const range = maxVal - minVal || 1;
  
  const svgPoints = points.map((p, idx) => {
    const x = (idx / (points.length - 1)) * width;
    const y = height - ((p - minVal) / range) * (height - 6) - 3;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg className="w-full h-9 mt-2" viewBox={`0 0 ${width} ${height}`}>
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={svgPoints}
      />
    </svg>
  );
}

// Mock KPI metrics data matching reference image
const kpiMetrics = [
  { 
    title: 'Total Users', 
    value: '12,458', 
    trend: '12.5%', 
    icon: Users, 
    iconBg: 'bg-violet-50 text-violet-600', 
    sparklineColor: '#8b5cf6', 
    points: [25, 29, 27, 34, 31, 38, 36, 42] 
  },
  { 
    title: 'Resumes Created', 
    value: '24,394', 
    trend: '18.7%', 
    icon: FileText, 
    iconBg: 'bg-emerald-50 text-emerald-600', 
    sparklineColor: '#10b981', 
    points: [18, 22, 21, 30, 26, 32, 29, 38] 
  },
  { 
    title: 'PDF Downloads', 
    value: '18,205', 
    trend: '15.3%', 
    icon: Download, 
    iconBg: 'bg-amber-50 text-amber-600', 
    sparklineColor: '#f59e0b', 
    points: [30, 28, 32, 26, 35, 33, 38, 45] 
  },
  { 
    title: 'Premium Users', 
    value: '3,248', 
    trend: '9.4%', 
    icon: Award, 
    iconBg: 'bg-sky-50 text-sky-600', 
    sparklineColor: '#0ea5e9', 
    points: [12, 16, 14, 20, 18, 24, 22, 28] 
  },
  { 
    title: 'Active Subscriptions', 
    value: '2,152', 
    trend: '8.6%', 
    icon: CreditCard, 
    iconBg: 'bg-blue-50 text-blue-600', 
    sparklineColor: '#3b82f6', 
    points: [20, 24, 23, 29, 27, 33, 31, 36] 
  },
  { 
    title: 'Revenue (This Month)', 
    value: '$28,450', 
    trend: '16.4%', 
    icon: Coins, 
    iconBg: 'bg-rose-50 text-rose-600', 
    sparklineColor: '#f43f5e', 
    points: [32, 36, 34, 42, 38, 48, 45, 52] 
  },
  { 
    title: 'AI Credits Used', 
    value: '45,832', 
    trend: '21.8%', 
    icon: Sparkles, 
    iconBg: 'bg-indigo-50 text-indigo-600', 
    sparklineColor: '#6366f1', 
    points: [15, 20, 18, 28, 24, 34, 30, 42] 
  },
  { 
    title: 'Templates', 
    value: '126', 
    trend: '5.2%', 
    icon: LayoutTemplate, 
    iconBg: 'bg-orange-50 text-orange-600', 
    sparklineColor: '#f97316', 
    points: [8, 12, 10, 16, 14, 20, 18, 24] 
  },
];

// Area Chart Data
const resumesCreatedOverviewData = [
  { name: 'May 20', count: 320 },
  { name: 'May 21', count: 660 },
  { name: 'May 22', count: 480 },
  { name: 'May 23', count: 810 },
  { name: 'May 24', count: 610 },
  { name: 'May 25', count: 720 },
  { name: 'May 26', count: 580 },
];

// Top templates mock
const topTemplatesList = [
  { name: 'Modern Professional', uses: '1,245 uses', previewBg: 'from-violet-100 to-indigo-100' },
  { name: 'Creative Designer', uses: '986 uses', previewBg: 'from-rose-100 to-amber-100' },
  { name: 'Minimalist CV', uses: '845 uses', previewBg: 'from-slate-100 to-slate-200' },
  { name: 'Executive Resume', uses: '654 uses', previewBg: 'from-violet-100 to-emerald-100' },
  { name: 'Developer Resume', uses: '543 uses', previewBg: 'from-sky-100 to-blue-100' },
];

// Donut Chart Data
const resumesByCategoryData = [
  { name: 'Professional', value: 38, color: '#6366f1' },
  { name: 'Creative', value: 24, color: '#a855f7' },
  { name: 'Modern', value: 18, color: '#10b981' },
  { name: 'Corporate', value: 12, color: '#0ea5e9' },
  { name: 'Academic', value: 8, color: '#f59e0b' },
];

// Bottom lists
const recentResumes = [
  { id: 1, name: 'John Doe', role: 'Software Engineer', date: 'May 26, 2025', status: 'Completed', img: 'https://i.pravatar.cc/100?img=11' },
  { id: 2, name: 'Emily Clark', role: 'UX/UI Designer', date: 'May 26, 2025', status: 'Completed', img: 'https://i.pravatar.cc/100?img=5' },
  { id: 3, name: 'Michael Brown', role: 'Product Manager', date: 'May 26, 2025', status: 'Completed', img: 'https://i.pravatar.cc/100?img=3' },
  { id: 4, name: 'Sarah Johnson', role: 'Marketing Specialist', date: 'May 25, 2025', status: 'In Progress', img: 'https://i.pravatar.cc/100?img=9' },
];

const recentUsers = [
  { id: 1, name: 'Alex Johnson', email: 'alex@example.com', date: 'May 26, 2025', tier: 'Premium', img: 'https://i.pravatar.cc/100?img=12' },
  { id: 2, name: 'Maria Garcia', email: 'maria@example.com', date: 'May 26, 2025', tier: 'Premium', img: 'https://i.pravatar.cc/100?img=16' },
  { id: 3, name: 'David Wilson', email: 'david@example.com', date: 'May 25, 2025', tier: 'Free', img: 'https://i.pravatar.cc/100?img=15' },
  { id: 4, name: 'Lisa Anderson', email: 'lisa@example.com', date: 'May 25, 2025', tier: 'Premium', img: 'https://i.pravatar.cc/100?img=20' },
  { id: 5, name: 'James Taylor', email: 'james@example.com', date: 'May 24, 2025', tier: 'Free', img: 'https://i.pravatar.cc/100?img=33' }
];

const recentPayments = [
  { id: 1, name: 'Alex Johnson', plan: 'Pro Plan - Monthly', price: '$29.00', date: 'May 26, 2025', brand: 'Visa' },
  { id: 2, name: 'Maria Garcia', plan: 'Pro Plan - Yearly', price: '$290.00', date: 'May 26, 2025', brand: 'Mastercard' },
  { id: 3, name: 'David Wilson', plan: 'Basic Plan - Monthly', price: '$9.00', date: 'May 25, 2025', brand: 'PayPal' },
  { id: 4, name: 'Lisa Anderson', plan: 'Pro Plan - Monthly', price: '$29.00', date: 'May 25, 2025', brand: 'Visa' },
  { id: 5, name: 'James Taylor', plan: 'Basic Plan - Monthly', price: '$9.00', date: 'May 24, 2025', brand: 'Apple Pay' },
];

export default function AdminDashboard() {
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
  }, [isAuthenticated, _hydrated, router]);

  if (!_hydrated || isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-violet-600 mb-4 animate-pulse">
            <span className="text-white font-bold text-sm">⚙️</span>
          </div>
          <p className="text-slate-600 font-semibold text-sm">Loading platform dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Top Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3.5">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Dashboard</h1>
          <p className="text-slate-500 text-xs mt-0.5">Welcome back! Here's what's happening with your platform.</p>
        </div>

        {/* Datepicker Mock Widget */}
        <div className="flex items-center gap-2 border border-slate-200/80 bg-white rounded-xl px-2.5 py-1.5 shadow-sm text-xs font-semibold text-slate-700 cursor-pointer hover:bg-slate-50/80 transition-colors">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <span>May 20 – May 26, 2025</span>
        </div>
      </div>

      {/* Grid of 8 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {kpiMetrics.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.title}
              className="bg-white border border-slate-200/70 rounded-[20px] p-3.5 flex flex-col justify-between hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{kpi.title}</span>
                  <p className="text-lg font-black text-slate-900">{kpi.value}</p>
                </div>
                <div className={`w-8.5 h-8.5 rounded-xl ${kpi.iconBg} flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              {/* Sparkline & Growth Row */}
              <div className="mt-3 flex items-end justify-between">
                <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-bold">
                  <span>↑ {kpi.trend}</span>
                  <span className="text-[10px] text-slate-400 font-semibold lowercase">vs last 7 days</span>
                </div>
                <div className="w-[110px] flex-shrink-0">
                  <Sparkline points={kpi.points} color={kpi.sparklineColor} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Middle row: Resumes Created, Top Templates, Resumes by Category */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-3.5.5">
        {/* Resumes Created Area Chart (spans 2 columns on large screen) */}
        <div className="lg:col-span-2 bg-white border border-slate-200/70 rounded-[20px] p-3.5 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">Resumes Created Overview</h2>
              <p className="text-xs text-slate-400 font-semibold mt-0.5">Resume design exports analytics</p>
            </div>
            {/* Filter buttons */}
            <div className="flex bg-slate-100 rounded-lg p-0.5 text-xs font-bold text-slate-600">
              <button className="px-2.5 py-1 rounded-md bg-white text-slate-950 shadow-sm">Daily</button>
              <button className="px-2.5 py-1 rounded-md hover:text-slate-950 transition-colors">Weekly</button>
              <button className="px-2.5 py-1 rounded-md hover:text-slate-950 transition-colors">Monthly</button>
            </div>
          </div>

          <div className="w-full h-64 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={resumesCreatedOverviewData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    fontSize: '12px',
                    color: '#0f172a',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05)'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="#6366f1"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#purpleGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Templates List */}
        <div className="bg-white border border-slate-200/70 rounded-[20px] p-3.5 flex flex-col justify-between">
          <div className="border-b border-slate-100 pb-4 mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">Top Templates</h2>
              <p className="text-xs text-slate-400 font-semibold mt-0.5">Most used layouts</p>
            </div>
            <Link href="/admin/templates" className="text-xs font-semibold text-violet-600 hover:text-violet-700">View all</Link>
          </div>

          <div className="space-y-3.5 flex-1">
            {topTemplatesList.map((tmpl) => (
              <div key={tmpl.name} className="flex items-center gap-3">
                <div className={`w-8 h-10 rounded-md bg-gradient-to-br ${tmpl.previewBg} border border-slate-200/40 flex-shrink-0 flex items-center justify-center text-[10px]`}>
                  📄
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-slate-900 truncate">{tmpl.name}</p>
                  <p className="text-[10px] font-semibold text-slate-400 mt-0.5">Resume Layout</p>
                </div>
                <span className="text-xs font-extrabold text-slate-800 shrink-0">{tmpl.uses}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Resumes by Category Donut Chart */}
        <div className="bg-white border border-slate-200/70 rounded-[20px] p-3.5 flex flex-col justify-between">
          <div className="border-b border-slate-100 pb-4 mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">Resumes by Category</h2>
              <p className="text-xs text-slate-400 font-semibold mt-0.5">Template genres distribution</p>
            </div>
            <Link href="/admin/template-categories" className="text-xs font-semibold text-violet-600 hover:text-violet-700">View all</Link>
          </div>

          <div className="h-32 flex items-center justify-center relative mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={resumesByCategoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={36}
                  outerRadius={54}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {resumesByCategoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Color Indicators Grid */}
          <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 mt-4 pt-3 border-t border-slate-100">
            {resumesByCategoryData.map((cat) => (
              <div key={cat.name} className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-500">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                <span className="truncate">{cat.name}</span>
                <span className="ml-auto font-bold text-slate-800">{cat.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row: Recent Resumes, Recent Users, Recent Payments */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3.5.5">
        {/* Recent Resumes Table */}
        <div className="bg-white border border-slate-200/70 rounded-[20px] p-3.5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">Recent Resumes</h2>
              <p className="text-xs text-slate-400 font-semibold mt-0.5">Recently edited documents</p>
            </div>
            <Link href="/admin/resumes" className="text-xs font-semibold text-violet-600 hover:text-violet-700">View all</Link>
          </div>

          <div className="space-y-4">
            {recentResumes.map((res) => (
              <div key={res.id} className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-full overflow-hidden bg-slate-100 shrink-0 border border-slate-200/50">
                    <img src={res.img} alt={res.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900 truncate">{res.name}</p>
                    <p className="text-[10px] text-slate-400 font-semibold mt-0.5 truncate">{res.role}</p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="block text-[10px] text-slate-400 font-semibold">{res.date}</span>
                  <span className={`inline-block text-[9px] font-bold px-1.5 py-0.5 rounded-full mt-1 ${
                    res.status === 'Completed'
                      ? 'bg-green-50 text-green-700'
                      : 'bg-amber-50 text-amber-700'
                  }`}>
                    {res.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Users Table */}
        <div className="bg-white border border-slate-200/70 rounded-[20px] p-3.5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">Recent Users</h2>
              <p className="text-xs text-slate-400 font-semibold mt-0.5">Recently signed-up profiles</p>
            </div>
            <Link href="/admin/users" className="text-xs font-semibold text-violet-600 hover:text-violet-700">View all</Link>
          </div>

          <div className="space-y-4">
            {recentUsers.map((usr) => (
              <div key={usr.id} className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-full overflow-hidden bg-slate-100 shrink-0 border border-slate-200/50">
                    <img src={usr.img} alt={usr.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900 truncate">{usr.name}</p>
                    <p className="text-[10px] text-slate-400 font-semibold mt-0.5 truncate">{usr.email}</p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="block text-[10px] text-slate-400 font-semibold">{usr.date}</span>
                  <span className={`inline-block text-[9px] font-bold px-1.5 py-0.5 rounded-full mt-1 ${
                    usr.tier === 'Premium'
                      ? 'bg-violet-50 text-violet-700'
                      : 'bg-slate-100 text-slate-600'
                  }`}>
                    {usr.tier}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Payments Table */}
        <div className="bg-white border border-slate-200/70 rounded-[20px] p-3.5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">Recent Payments</h2>
              <p className="text-xs text-slate-400 font-semibold mt-0.5">Transaction history records</p>
            </div>
            <Link href="/admin/payments" className="text-xs font-semibold text-violet-600 hover:text-violet-700">View all</Link>
          </div>

          <div className="space-y-4">
            {recentPayments.map((pmt) => (
              <div key={pmt.id} className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  {/* Payment Card/Brand indicator */}
                  <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-200/60 shrink-0 flex items-center justify-center text-[10px] font-bold text-slate-500 shadow-inner">
                    {pmt.brand === 'Visa' ? '💳' : pmt.brand === 'Mastercard' ? '🔴' : pmt.brand === 'PayPal' ? '🅿️' : ''}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900 truncate">{pmt.name}</p>
                    <p className="text-[10px] text-slate-400 font-semibold mt-0.5 truncate">{pmt.plan}</p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="block text-xs font-black text-slate-950">{pmt.price}</span>
                  <span className="inline-block text-[9px] font-bold text-green-600 bg-green-50 border border-green-200/50 px-1.5 py-0.5 rounded-full mt-1">Paid</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
