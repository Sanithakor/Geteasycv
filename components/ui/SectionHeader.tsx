import React from 'react';

interface SectionHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export default function SectionHeader({ badge, title, subtitle, align = 'center', className = '' }: SectionHeaderProps) {
  const alignClass = align === 'center' ? 'text-center items-center' : 'text-left items-start';
  return (
    <div className={`flex flex-col gap-3 ${alignClass} ${className}`}>
      {badge && (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-violet-50 text-violet-700 border border-violet-200/60">
          {badge}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight text-balance">{title}</h2>
      {subtitle && (
        <p className={`text-base text-slate-500 max-w-2xl ${align === 'center' ? 'mx-auto' : ''}`}>{subtitle}</p>
      )}
    </div>
  );
}
