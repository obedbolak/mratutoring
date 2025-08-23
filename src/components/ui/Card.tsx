// src/components/ui/Card.tsx
'use client';

import React, { HTMLAttributes, forwardRef } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

// Remove the empty CardProps interface entirely

const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    const { theme, mounted } = useTheme();

    if (!mounted) {
      return (
        <div className="rounded-lg border bg-gray-200 animate-pulse h-32" />
      );
    }

    const getCardClasses = () => {
      return theme === 'dark'
        ? 'bg-slate-800 border border-slate-700 shadow-xl'
        : 'bg-white border border-slate-200 shadow-lg';
    };

    return (
      <div
        ref={ref}
        className={`rounded-lg ${getCardClasses()} ${className || ''}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = 'Card';

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`flex flex-col space-y-1.5 p-6 ${className || ''}`}
        {...props}
      />
    );
  }
);
CardHeader.displayName = 'CardHeader';

const CardTitle = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
  const { theme } = useTheme();

  const getTitleClasses = () => {
    return theme === 'dark'
      ? 'text-2xl font-semibold leading-none tracking-tight text-slate-100'
      : 'text-2xl font-semibold leading-none tracking-tight text-slate-900';
  };

  return (
    <h3
      ref={ref}
      className={`${getTitleClasses()} ${className || ''}`}
      {...props}
    ></h3>
  );
});
CardTitle.displayName = 'CardTitle';

const CardDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { theme } = useTheme();

  const getDescriptionClasses = () => {
    return theme === 'dark'
      ? 'text-sm text-slate-400'
      : 'text-sm text-slate-500';
  };

  return (
    <p
      ref={ref}
      className={`${getDescriptionClasses()} ${className || ''}`}
      {...props}
    />
  );
});
CardDescription.displayName = 'CardDescription';

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={`p-6 pt-0 ${className || ''}`} {...props} />
  )
);
CardContent.displayName = 'CardContent';

const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={`flex items-center p-6 pt-0 ${className || ''}`}
      {...props}
    />
  )
);
CardFooter.displayName = 'CardFooter';

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
