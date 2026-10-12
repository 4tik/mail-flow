import React from 'react';
import { cn } from '../../utils/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightAction?: React.ReactNode;
  containerClassName?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      containerClassName,
      label,
      helperText,
      error,
      leftIcon,
      rightAction,
      id,
      disabled,
      required,
      type = 'text',
      ...props
    },
    ref
  ) => {
    const inputId = id || React.useId();
    const helperId = `${inputId}-helper`;
    const errorId = `${inputId}-error`;

    return (
      <div className={cn('w-full flex flex-col gap-1.5', containerClassName)}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-gray-700 flex items-center justify-between"
          >
            <span>
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </span>
          </label>
        )}

        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3.5 flex items-center pointer-events-none text-gray-400">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            type={type}
            disabled={disabled}
            required={required}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? errorId : helperText ? helperId : undefined}
            className={cn(
              'w-full px-3.5 py-2.5 text-sm rounded-lg border transition-all placeholder:text-gray-400 bg-white text-gray-900',
              'focus:outline-none focus:ring-2 focus:ring-offset-1',
              error
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20 text-red-900'
                : 'border-gray-200 hover:border-gray-300 focus:border-indigo-600 focus:ring-indigo-500/20',
              leftIcon ? 'pl-10' : '',
              rightAction ? 'pr-11' : '',
              disabled ? 'bg-gray-50 text-gray-400 cursor-not-allowed border-gray-200' : '',
              className
            )}
            {...props}
          />

          {rightAction && (
            <div className="absolute right-2.5 flex items-center">
              {rightAction}
            </div>
          )}
        </div>

        {error && (
          <p id={errorId} className="text-xs text-red-600 font-medium mt-0.5 flex items-center gap-1" role="alert">
            <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <span>{error}</span>
          </p>
        )}

        {!error && helperText && (
          <p id={helperId} className="text-xs text-gray-500 mt-0.5">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
