/**
 * Analytics Dashboard Page matching Image 3 layout and design specs
 */

'use client';

import React from 'react';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const countryData = [
  { name: 'United States', value: 40, color: '#0F0F0F' },
  { name: 'Canada', value: 30, color: '#F3645C' },
  { name: 'United Kingdom', value: 20, color: '#58C09D' },
  { name: 'Others', value: 10, color: '#BAC7FE' },
];

const deviceData = [
  { name: 'Desktop', value: 6500 },
  { name: 'Mobile', value: 2400 },
  { name: 'Tablet', value: 1000 },
];

const trafficSources = [
  { source: 'Direct', percentage: 40 },
  { source: 'Google', percentage: 30 },
  { source: 'Social', percentage: 20 },
  { source: 'Other', percentage: 10 },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Analytics
        </h1>
        <p className="text-slate-500 text-sm mt-0.5 font-medium">
          Detailed insights about your platform
        </p>
      </div>

      {/* Overview Stat Cards matching Image 3 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: 'Page Views', value: '124.5K', change: '+12% from last month', isPositive: true },
          { label: 'Unique Visitors', value: '65.3K', change: '+8% from last month', isPositive: true },
          { label: 'Bounce Rate', value: '32.5%', change: '-2% from last month', isPositive: true },
          { label: 'Avg Session', value: '4m 23s', change: '+15% from last month', isPositive: true },
        ].map((stat, idx) => (
          <div
            key={idx}
            className="rounded-[20px] border border-slate-200/80 bg-white p-5 shadow-2xs space-y-1.5"
          >
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              {stat.label}
            </span>
            <p className="text-2xl font-black text-slate-900 tracking-tight">
              {stat.value}
            </p>
            <p className="text-xs font-bold text-emerald-600">
              {stat.change}
            </p>
          </div>
        ))}
      </div>

      {/* Top Countries & Device Usage Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Countries (Donut Chart) */}
        <div className="rounded-[20px] border border-slate-200/80 bg-white p-6 shadow-2xs space-y-4">
          <h2 className="text-base font-bold text-slate-900">
            Top Countries
          </h2>
          <div className="h-64 w-full relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={countryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {countryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Device Usage (Bar Chart) */}
        <div className="rounded-[20px] border border-slate-200/80 bg-white p-6 shadow-2xs space-y-4">
          <h2 className="text-base font-bold text-slate-900">
            Device Usage
          </h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deviceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: 'none',
                    borderRadius: '12px',
                    color: '#ffffff',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="value" fill="#0F0F0F" radius={[8, 8, 0, 0]} barSize={55} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Traffic Sources Horizontal Progress Bars */}
      <div className="rounded-[20px] border border-slate-200/80 bg-white p-6 shadow-2xs space-y-5">
        <h2 className="text-base font-bold text-slate-900">
          Traffic Sources
        </h2>
        <div className="space-y-4">
          {trafficSources.map((item) => (
            <div key={item.source} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                <span>{item.source}</span>
                <span className="text-slate-500">{item.percentage}%</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#0F0F0F] rounded-full transition-all duration-500"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
