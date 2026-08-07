import React from 'react';
import { FileX } from 'lucide-react';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export default function EmptyState({ icon, title, description, action, className = '' }: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center py-16 px-6 text-center ${className}`}>
      <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mb-4 text-slate-400">
        {icon ?? <FileX className="w-7 h-7" />}
      </div>
      <h3 className="text-sm font-bold text-slate-900 mb-1">{title}</h3>
      {description && <p className="text-xs text-slate-500 max-w-xs mb-5">{description}</p>}
      {action}
    </div>
  );
}
