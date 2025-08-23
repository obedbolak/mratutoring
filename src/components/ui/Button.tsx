// src/components/ui/Button.tsx
'use client';

import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      loading,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const { theme, mounted } = useTheme();

    if (!mounted) {
      return <div className="h-10 w-20 bg-gray-200 animate-pulse rounded-md" />;
    }

    const baseClasses =
      'inline-flex items-center justify-center rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

    const getVariantClasses = () => {
      switch (variant) {
        case 'primary':
          return `bg-gradient-to-r from-indigo-600 to-blue-600 text-white hover:from-indigo-500 hover:to-blue-500 focus:ring-indigo-500 shadow-md hover:shadow-lg`;
        case 'secondary':
          return theme === 'dark'
            ? 'bg-slate-700 text-slate-200 hover:bg-slate-600 border border-slate-600 focus:ring-slate-500'
            : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300 focus:ring-slate-500';
        case 'outline':
          return theme === 'dark'
            ? 'border border-slate-600 text-slate-200 hover:bg-slate-800 focus:ring-slate-500'
            : 'border border-slate-300 text-slate-700 hover:bg-slate-50 focus:ring-slate-500';
        case 'ghost':
          return theme === 'dark'
            ? 'text-slate-300 hover:bg-slate-800 hover:text-slate-100 focus:ring-slate-500'
            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:ring-slate-500';
        case 'destructive':
          return 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-md hover:shadow-lg';
        default:
          return '';
      }
    };

    const getSizeClasses = () => {
      switch (size) {
        case 'sm':
          return 'px-3 py-2 text-sm h-9';
        case 'lg':
          return 'px-6 py-3 text-base h-12';
        default:
          return 'px-4 py-2 text-sm h-10';
      }
    };

    return (
      <button
        className={`${baseClasses} ${getVariantClasses()} ${getSizeClasses()} ${
          className || ''
        }`}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
