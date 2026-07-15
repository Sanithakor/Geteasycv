/**
 * Analytics Dashboard Page
 */

'use client';

import React from 'react';
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

const countryData = [
  { name: 'United States', value: 4000, percentage: 40 },
  { name: 'Canada', value: 3000, percentage: 30 },
  { name: 'United Kingdom', value: 2000, percentage: 20 },
  { name: 'Others', value: 1000, percentage: 10 },
];

const deviceData = [
  { name: 'Desktop', value: 6500, percentage: 65 },
  { name: 'Mobile', value: 2500, percentage: 25 },
  { name: 'Tablet', value: 1000, percentage: 10 },
];

const trafficData = [
  { source: 'Direct', value: 4000, percentage: 40 },
  { source: 'Google', value: 3000, percentage: 30 },
  { source: 'Social', value: 2000, percentage: 20 },
  { source: 'Other', value: 1000, percentage: 10 },
];

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#06b6d4', '#10b981'];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Analytics
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          Detailed insights about your platform
        </p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Page Views', value: '124.5K', change: '+12%' },
          { label: 'Unique Visitors', value: '65.3K', change: '+8%' },
          { label: 'Bounce Rate', value: '32.5%', change: '-2%' },
          { label: 'Avg Session', value: '4m 23s', change: '+15%' },
        ].map((stat, idx) => (
          <div
            key={idx}
            className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6"
          >
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {stat.label}
            </p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white mt-2">
              {stat.value}
            </p>
            <p className="text-sm text-green-600 dark:text-green-400 mt-2">
              {stat.change} from last month
            </p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Country Analytics */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">
            Top Countries
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={countryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {countryData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Device Analytics */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">
            Device Usage
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={deviceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#f1f5f9',
                }}
              />
              <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Traffic Sources */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">
          Traffic Sources
        </h2>
        <div className="space-y-4">
          {trafficData.map((source, idx) => (
            <div key={idx}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-900 dark:text-white">
                  {source.source}
                </span>
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  {source.percentage}%
                </span>
              </div>
              <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
                  style={{ width: `${source.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
