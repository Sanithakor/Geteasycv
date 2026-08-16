import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
}

const paddingMap = { none: '', sm: 'p-4', md: 'p-5', lg: 'p-6' };

export default function Card({ children, className = '', padding = 'md', hover = false }: CardProps) {
  return (
    <div
      className={[
        'bg-white border border-slate-200/70 rounded-[20px]',
        hover ? 'hover:shadow-md transition-all duration-200' : '',
        paddingMap[padding],
        className,
      ].join(' ')}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps { title: string; subtitle?: string; action?: React.ReactNode; }
Card.Header = function CardHeader({ title, subtitle, action }: CardHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-4 pb-4 mb-4 border-b border-slate-100">
      <div>
        <h3 className="text-sm font-bold text-slate-900">{title}</h3>
        {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
};
