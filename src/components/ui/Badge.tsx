import React from 'react';
import { cn } from '../../utils/cn';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'violet' | 'cyan' | 'success' | 'warning' | 'error' | 'neutral';
  size?: 'sm' | 'md';
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'primary',
  size = 'md',
  dot = false,
  children,
  ...props
}) => {
  const variantStyles = {
    primary: 'bg-[#F5F3FF] text-[#7C3AED] border-[#DDD6FE]',
    violet: 'bg-[#F5F3FF] text-[#7C3AED] border-[#DDD6FE]',
    cyan: 'bg-[#ECFEFF] text-[#0891B2] border-[#A5F3FC]',
    success: 'bg-emerald-50 text-[#16A34A] border-emerald-200',
    warning: 'bg-amber-50 text-amber-700 border-amber-200',
    error: 'bg-red-50 text-[#DC2626] border-red-200',
    neutral: 'bg-slate-100 text-slate-700 border-slate-200',
  };

  const dotColors = {
    primary: 'bg-[#7C3AED]',
    violet: 'bg-[#7C3AED]',
    cyan: 'bg-[#0891B2]',
    success: 'bg-[#16A34A]',
    warning: 'bg-amber-500',
    error: 'bg-[#DC2626]',
    neutral: 'bg-slate-400',
  };

  const sizeStyles = {
    sm: 'text-2xs px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 font-medium rounded-full border',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {dot && <span className={cn('w-1.5 h-1.5 rounded-full', dotColors[variant])} />}
      {children}
    </span>
  );
};
