'use client';

import { useRouter } from 'next/navigation';
import { Plus, Sparkles, FileText, Zap } from 'lucide-react';

type ResumeCreationButtonProps = {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  text?: string;
  className?: string;
};

export default function ResumeCreationButton({
  variant = 'primary',
  size = 'md',
  showIcon = true,
  text = 'Create Resume',
  className = ''
}: ResumeCreationButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push('/create-resume');
  };

  const getButtonClasses = () => {
    const baseClasses = 'font-semibold transition-all duration-200 inline-flex items-center justify-center gap-2 rounded-md';
    
    const sizeClasses = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-2.5 text-sm',
      lg: 'px-6 py-3 text-base'
    };
    
    const variantClasses = {
      primary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md',
      secondary: 'bg-gray-900 hover:bg-gray-800 text-white shadow-sm hover:shadow-md',
      outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'
    };

    return `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;
  };

  return (
    <button
      onClick={handleClick}
      className={getButtonClasses()}
    >
      {showIcon && (
        <div className="relative">
          <Plus className="w-4 h-4" />
          <Sparkles className="w-2 h-2 absolute -top-0.5 -right-0.5 text-yellow-300" />
        </div>
      )}
      <span>{text}</span>
    </button>
  );
}