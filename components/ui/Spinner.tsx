import React from 'react';

interface SpinnerProps { size?: 'sm' | 'md' | 'lg'; label?: string; }
const sizeMap = { sm: 'w-4 h-4 border-2', md: 'w-7 h-7 border-2', lg: 'w-10 h-10 border-3' };

export default function Spinner({ size = 'md', label = 'Loading…' }: SpinnerProps) {
  return (
    <div role="status" className="flex flex-col items-center justify-center gap-3">
      <div className={`${sizeMap[size]} rounded-full border-violet-200 border-t-violet-600 animate-spin`} />
      <span className="sr-only">{label}</span>
    </div>
  );
}
