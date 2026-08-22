import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  trend?: string;
  trendUp?: boolean;
  icon?: React.ReactNode;
  iconBg?: string;
  sparklinePoints?: number[];
  sparklineColor?: string;
  className?: string;
}

function Sparkline({ points, color }: { points: number[]; color: string }) {
  const w = 110; const h = 32;
  const max = Math.max(...points); const min = Math.min(...points);
  const range = max - min || 1;
  const pts = points.map((p, i) => {
    const x = (i / (points.length - 1)) * w;
    const y = h - ((p - min) / range) * (h - 4) - 2;
    return `${x},${y}`;
  }).join(' ');
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-8 mt-1" aria-hidden="true">
      <polyline fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" points={pts} />
    </svg>
  );
}

export default function StatCard({ title, value, trend, trendUp = true, icon, iconBg = 'bg-[#FFF8F5] text-[#FF570F]', sparklinePoints, sparklineColor = '#FF570F', className = '' }: StatCardProps) {
  return (
    <div className={`bg-white border border-slate-200/70 rounded-[20px] p-4 hover:shadow-md transition-all duration-200 ${className}`}>
      <div className="flex items-start justify-between">
        <div className="space-y-0.5">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{title}</p>
          <p className="text-xl font-black text-slate-900">{value}</p>
        </div>
        {icon && (
          <div className={`w-9 h-9 rounded-xl ${iconBg} flex items-center justify-center shrink-0`}>
            {icon}
          </div>
        )}
      </div>
      <div className="mt-2 flex items-end justify-between">
        {trend && (
          <p className={`text-xs font-bold ${trendUp ? 'text-emerald-600' : 'text-rose-500'}`}>
            {trendUp ? '↑' : '↓'} {trend}
          </p>
        )}
        {sparklinePoints && sparklinePoints.length > 1 && (
          <div className="w-28 ml-auto">
            <Sparkline points={sparklinePoints} color={sparklineColor} />
          </div>
        )}
      </div>
    </div>
  );
}
