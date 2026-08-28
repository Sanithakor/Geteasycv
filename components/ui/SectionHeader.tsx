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
        <span className="inline-flex items-center rounded-full border border-[#0F0F0F]/10 bg-[#FFE0CF] px-3 py-1 text-xs font-bold text-[#0F0F0F]">
          {badge}
        </span>
      )}
      <h2 className="text-balance text-3xl font-black tracking-tight text-[#0F0F0F] sm:text-4xl">{title}</h2>
      {subtitle && (
        <p className={`max-w-2xl text-base text-[#333333] ${align === 'center' ? 'mx-auto' : ''}`}>{subtitle}</p>
      )}
    </div>
  );
}
