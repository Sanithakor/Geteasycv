import React from 'react';
import { AlertCircle, CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';

type AlertVariant = 'info' | 'success' | 'warning' | 'error';

const config: Record<AlertVariant, { icon: React.ElementType; bg: string; border: string; text: string; iconColor: string }> = {
  info:    { icon: Info,          bg: 'bg-sky-50',     border: 'border-sky-200',     text: 'text-sky-800',    iconColor: 'text-sky-500'    },
  success: { icon: CheckCircle2,  bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-800', iconColor: 'text-emerald-500' },
  warning: { icon: AlertTriangle, bg: 'bg-amber-50',   border: 'border-amber-200',   text: 'text-amber-800',  iconColor: 'text-amber-500'  },
  error:   { icon: AlertCircle,   bg: 'bg-rose-50',    border: 'border-rose-200',    text: 'text-rose-800',   iconColor: 'text-rose-500'   },
};

interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  children: React.ReactNode;
  onDismiss?: () => void;
  className?: string;
}

export default function Alert({ variant = 'info', title, children, onDismiss, className = '' }: AlertProps) {
  const { icon: Icon, bg, border, text, iconColor } = config[variant];
  return (
    <div className={`flex gap-3 p-4 rounded-xl border ${bg} ${border} ${text} ${className}`} role="alert">
      <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${iconColor}`} aria-hidden="true" />
      <div className="flex-1 min-w-0">
        {title && <p className="text-sm font-bold mb-0.5">{title}</p>}
        <p className="text-sm">{children}</p>
      </div>
      {onDismiss && (
        <button onClick={onDismiss} className="shrink-0 p-0.5 hover:opacity-70 transition-opacity" aria-label="Dismiss">
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}
