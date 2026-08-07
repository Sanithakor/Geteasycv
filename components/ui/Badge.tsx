import React from 'react';

export type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info' | 'premium' | 'free';

const variantStyles: Record<BadgeVariant, string> = {
  default:  'bg-slate-100 text-slate-700 border-slate-200/60',
  success:  'bg-emerald-50 text-emerald-700 border-emerald-200/60',
  warning:  'bg-amber-50 text-amber-700 border-amber-200/60',
  danger:   'bg-rose-50 text-rose-700 border-rose-200/60',
  info:     'bg-sky-50 text-sky-700 border-sky-200/60',
  premium:  'bg-violet-50 text-violet-700 border-violet-200/60',
  free:     'bg-slate-100 text-slate-500 border-slate-200/40',
};

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  dot?: boolean;
  className?: string;
}

export default function Badge({ children, variant = 'default', dot, className = '' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${variantStyles[variant]} ${className}`}>
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full ${variant === 'success' ? 'bg-emerald-500' : variant === 'warning' ? 'bg-amber-500' : variant === 'danger' ? 'bg-rose-500' : 'bg-current opacity-60'}`} />
      )}
      {children}
    </span>
  );
}
