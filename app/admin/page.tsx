/**
 * Admin Dashboard
 * Premium SaaS admin interface with analytics and management
 */

'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { KPICard } from '@/components/admin/cards/KPICard';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import Link from 'next/link';

// Mock data
const revenueData = [
  { month: 'Jan', revenue: 4000, users: 240, templates: 24 },
  { month: 'Feb', revenue: 3000, users: 221, templates: 22 },
  { month: 'Mar', revenue: 2000, users: 229, templates: 20 },
  { month: 'Apr', revenue: 2780, users: 200, templates: 21 },
  { month: 'May', revenue: 1890, users: 229, templates: 22 },
  { month: 'Jun', revenue: 2390, users: 200, templates: 20 },
];

const userGrowthData = [
  { date: '1 Jun', free: 400, pro: 240 },
  { date: '2 Jun', free: 420, pro: 260 },
  { date: '3 Jun', free: 400, pro: 240 },
  { date: '4 Jun', free: 480, pro: 290 },
  { date: '5 Jun', free: 510, pro: 310 },
  { date: '6 Jun', free: 540, pro: 340 },
];

const templateData = [
  { name: 'Modern', value: 45, color: '#3b82f6' },
  { name: 'Executive', value: 30, color: '#8b5cf6' },
  { name: 'Creative', value: 15, color: '#ec4899' },
  { name: 'Minimal', value: 10, color: '#06b6d4' },
];

const recentActivities = [
  {
    id: 1,
    type: 'user_signup',
    title: 'New User Signup',
    message: 'John Doe registered as a new user',
    timestamp: '5 minutes ago',
    icon: '👤',
  },
  {
    id: 2,
    type: 'payment',
    title: 'Payment Received',
    message: 'Received $99 from Jane Smith for Pro subscription',
    timestamp: '1 hour ago',
    icon: '💰',
  },
  {
    id: 3,
    type: 'template_published',
    title: 'Template Published',
    message: 'Modern Resume template has been published',
    timestamp: '3 hours ago',
    icon: '🎨',
  },
  {
    id: 4,
    type: 'resume_created',
    title: 'Resume Created',
    message: 'New resume created using Executive template',
    timestamp: '5 hours ago',
    icon: '📄',
  },
  {
    id: 5,
    type: 'support_ticket',
    title: 'Support Ticket',
    message: 'New support ticket from Michael Brown',
    timestamp: '1 day ago',
    icon: '📧',
  },
];

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#06b6d4'];

export default function AdminDashboard() {
  const router = useRouter();
  const { isAuthenticated, user, _hydrated } = useAuthStore();
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    if (!_hydrated) return;

    if (!isAuthenticated || user?.role !== 'admin') {
      router.push('/login');
      return;
    }

    setIsLoading(false);
  }, [isAuthenticated, user, _hydrated, router]);

  if (!_hydrated || isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-600 mb-4 animate-pulse">
            <span className="text-white">⚙️</span>
          </div>
          <p className="text-slate-600 dark:text-slate-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Dashboard
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">
          Welcome back, {user?.name}! Here's your business overview.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Total Users"
          value="2,543"
          icon="👥"
          trend={{ value: 12, direction: 'up', period: 'vs last month' }}
          comparison="1,230 active this week"
        />
        <KPICard
          title="Premium Users"
          value="845"
          icon="⭐"
          trend={{ value: 8, direction: 'up', period: 'vs last month' }}
          comparison="33.2% of total users"
        />
        <KPICard
          title="Total Revenue"
          value="$24,580"
          icon="💰"
          trend={{ value: 15, direction: 'up', period: 'vs last month' }}
          comparison="Average $29 per user"
        />
        <KPICard
          title="Resumes Created"
          value="8,234"
          icon="📄"
          trend={{ value: 24, direction: 'up', period: 'vs last month' }}
          comparison="Average 3.2 per user"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Revenue & Growth
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Last 6 months performance
            </p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#f1f5f9',
                }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#3b82f6"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Popular Templates */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Popular Templates
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              By downloads
            </p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={templateData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {templateData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-6 space-y-3">
            {templateData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    {item.name}
                  </span>
                </div>
                <span className="font-semibold text-slate-900 dark:text-white">
                  {item.value}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* User Growth & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              User Growth
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Free vs Premium users
            </p>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="date" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#f1f5f9',
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="free"
                stroke="#94a3b8"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="pro"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Activity */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Recent Activity
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Latest actions in your platform
            </p>
          </div>
          <div className="space-y-4 max-h-64 overflow-y-auto">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-4 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
              >
                <div className="text-2xl flex-shrink-0">{activity.icon}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    {activity.title}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">
                    {activity.message}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                    {activity.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <QuickActionButton href="/admin/users/new" icon="👤">
            Create User
          </QuickActionButton>
          <QuickActionButton href="/admin/templates/new" icon="🎨">
            Create Template
          </QuickActionButton>
          <QuickActionButton href="/admin/coupons/new" icon="🎟️">
            Create Coupon
          </QuickActionButton>
          <QuickActionButton href="/admin/campaigns/new" icon="📢">
            Send Campaign
          </QuickActionButton>
        </div>
      </div>
    </div>
  );
}

function QuickActionButton({
  href,
  icon,
  children,
}: {
  href: string;
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-3 px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-lg hover:shadow-blue-500/10 transition-all"
    >
      <span className="text-2xl group-hover:scale-110 transition-transform">
        {icon}
      </span>
      <span className="font-medium text-slate-700 dark:text-slate-300">
        {children}
      </span>
    </Link>
  );
}
