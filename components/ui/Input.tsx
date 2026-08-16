'use client';

import React, { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export default function Input({ label, error, hint, leftIcon, rightIcon, className = '', id, ...props }: InputProps) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-[11px] font-bold text-slate-700">
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
            {leftIcon}
          </span>
        )}
        <input
          id={inputId}
          className={[
            'w-full h-10 rounded-xl border bg-white px-3 text-sm text-slate-900 placeholder-slate-400',
            'outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-400 transition-all',
            error ? 'border-rose-400 focus:ring-rose-300' : 'border-slate-200',
            leftIcon ? 'pl-9' : '',
            rightIcon ? 'pr-9' : '',
            className,
          ].join(' ')}
          {...props}
        />
        {rightIcon && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
            {rightIcon}
          </span>
        )}
      </div>
      {error && <p className="text-[11px] text-rose-600 font-medium">{error}</p>}
      {hint && !error && <p className="text-[11px] text-slate-400">{hint}</p>}
    </div>
  );
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export function Textarea({ label, error, hint, className = '', id, ...props }: TextareaProps) {
  const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={textareaId} className="text-[11px] font-bold text-slate-700">
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        className={[
          'w-full rounded-xl border bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-400',
          'outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-400 transition-all resize-y',
          error ? 'border-rose-400 focus:ring-rose-300' : 'border-slate-200',
          className,
        ].join(' ')}
        {...props}
      />
      {error && <p className="text-[11px] text-rose-600 font-medium">{error}</p>}
      {hint && !error && <p className="text-[11px] text-slate-400">{hint}</p>}
    </div>
  );
}
