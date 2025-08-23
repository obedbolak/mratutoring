// src/components/ui/Modal.tsx
'use client';

import React, { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useTheme } from '@/contexts/ThemeContext';
import { X } from 'lucide-react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showCloseButton?: boolean;
}

const sizeClasses = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
};

export function Modal({
  isOpen,
  onClose,
  children,
  title,
  size = 'md',
  showCloseButton = true,
}: ModalProps) {
  const { theme, mounted } = useTheme();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  const getModalClasses = () => {
    return theme === 'dark'
      ? 'bg-slate-800 border border-slate-700 shadow-2xl'
      : 'bg-white border border-slate-200 shadow-2xl';
  };

  const getTitleClasses = () => {
    return theme === 'dark'
      ? 'text-lg font-semibold text-slate-100'
      : 'text-lg font-semibold text-slate-900';
  };

  const getCloseButtonClasses = () => {
    return theme === 'dark'
      ? 'text-slate-400 hover:text-slate-200 transition-colors'
      : 'text-slate-400 hover:text-slate-600 transition-colors';
  };

  const getBorderClasses = () => {
    return theme === 'dark' ? 'border-slate-700' : 'border-slate-200';
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className={`fixed inset-0 transition-opacity ${
          theme === 'dark' ? 'bg-slate-900/80' : 'bg-slate-900/50'
        }`}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`
        relative rounded-lg mx-4 w-full ${
          sizeClasses[size]
        } ${getModalClasses()}
        transform transition-all animate-in fade-in-0 zoom-in-95 duration-200
      `}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div
            className={`flex items-center justify-between p-6 ${
              title ? `border-b ${getBorderClasses()}` : ''
            }`}
          >
            {title && <h3 className={getTitleClasses()}>{title}</h3>}
            {showCloseButton && (
              <button
                onClick={onClose}
                className={`${getCloseButtonClasses()} p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700`}
              >
                <span className="sr-only">Close</span>
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-6">{children}</div>
      </div>
    </div>,
    document.body
  );
}
