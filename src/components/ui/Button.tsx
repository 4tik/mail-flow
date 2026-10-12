import React from 'react';
import { cn } from '../../utils/cn';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'cyan';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium rounded-lg transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.99] cursor-pointer';

    const variantStyles = {
      primary:
        'bg-button-gradient text-white shadow-sm shadow-violet-200 focus-visible:ring-[#7C3AED]',
      secondary:
        'bg-[#F5F3FF] text-[#7C3AED] border border-[#DDD6FE] hover:bg-[#EDE9FE] focus-visible:ring-[#7C3AED]',
      cyan:
        'bg-[#0891B2] hover:bg-[#0E7490] text-white shadow-sm shadow-cyan-200 focus-visible:ring-[#0891B2]',
      outline:
        'border border-[#E2E8F0] bg-white text-[#172033] hover:bg-[#F5F3FF] hover:text-[#7C3AED] hover:border-[#DDD6FE] focus-visible:ring-[#7C3AED] shadow-2xs',
      ghost:
        'text-[#64748B] hover:bg-[#F5F3FF] hover:text-[#7C3AED] focus-visible:ring-[#7C3AED]',
      danger:
        'bg-[#DC2626] text-white hover:bg-red-700 active:bg-red-800 focus-visible:ring-red-500 shadow-sm shadow-red-100',
    };

    const sizeStyles = {
      sm: 'text-xs px-3 py-1.5 min-h-[34px] gap-1.5',
      md: 'text-sm px-4 py-2.5 min-h-[42px] gap-2',
      lg: 'text-base px-5 py-3 min-h-[48px] gap-2.5 font-semibold',
    };

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      >
        {isLoading ? (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : (
          leftIcon && <span className="flex-shrink-0">{leftIcon}</span>
        )}
        <span>{children}</span>
        {!isLoading && rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';
