// src/components/ui/Input.tsx
'use client';

import React, { InputHTMLAttributes, forwardRef } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, helperText, ...props }, ref) => {
    const { theme, mounted } = useTheme();

    if (!mounted) {
      return <div className="h-10 bg-gray-200 animate-pulse rounded-md" />;
    }

    const getInputClasses = () => {
      const baseClasses =
        'flex h-10 w-full rounded-md px-3 py-2 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';

      if (error) {
        return theme === 'dark'
          ? `${baseClasses} bg-slate-800 border border-red-500 text-slate-100 focus-visible:ring-red-500`
          : `${baseClasses} bg-white border border-red-500 text-slate-900 focus-visible:ring-red-500`;
      }

      return theme === 'dark'
        ? `${baseClasses} bg-slate-800 border border-slate-600 text-slate-100 placeholder-slate-400 focus-visible:ring-indigo-500`
        : `${baseClasses} bg-white border border-slate-300 text-slate-900 placeholder-slate-500 focus-visible:ring-indigo-500`;
    };

    const getLabelClasses = () => {
      return theme === 'dark'
        ? 'block text-sm font-medium text-slate-200 mb-1'
        : 'block text-sm font-medium text-slate-700 mb-1';
    };

    return (
      <div className="w-full">
        {label && <label className={getLabelClasses()}>{label}</label>}
        <input
          type={type}
          className={`${getInputClasses()} ${className || ''}`}
          ref={ref}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        {helperText && !error && (
          <p
            className={`mt-1 text-sm ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
