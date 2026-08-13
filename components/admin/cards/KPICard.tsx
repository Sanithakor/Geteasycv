/**
 * KPI Card Component
 * Premium KPI display with trend and comparison
 */

import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    direction: 'up' | 'down';
    period: string;
  };
  comparison?: string;
  onClick?: () => void;
}

export function KPICard({
  title,
  value,
  icon,
  trend,
  comparison,
  onClick,
}: KPICardProps) {
  return (
    <div
      onClick={onClick}
      className="group relative overflow-hidden rounded-[20px] border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/10 hover:border-violet-400 dark:hover:border-violet-600 cursor-pointer"
    >
      {/* Background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-50 to-transparent dark:from-violet-900/10 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400">
            {title}
          </h3>
          {icon && <div className="text-2xl opacity-60 group-hover:opacity-100 transition-opacity">{icon}</div>}
        </div>

        {/* Value */}
        <div className="mb-4">
          <p className="text-3xl font-bold text-slate-900 dark:text-white">
            {value}
          </p>
          {comparison && (
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {comparison}
            </p>
          )}
        </div>

        {/* Trend */}
        {trend && (
          <div className="flex items-center gap-2">
            <div
              className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                trend.direction === 'up'
                  ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                  : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400'
              }`}
            >
              {trend.direction === 'up' ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              <span>{trend.value}%</span>
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {trend.period}
            </span>
          </div>
        )}
      </div>

      {/* Accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 to-violet-600 transform scale-x-0 group- transition-transform duration-300" />
    </div>
  );
}

export default KPICard;
