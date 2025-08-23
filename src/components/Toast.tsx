// src/components/Toast.tsx
'use client';

import { useToast, Toast as ToastType } from '@/contexts/ToastContext';
import { useTheme } from '@/contexts/ThemeContext';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';

export function ToastContainer() {
  const { toasts } = useToast();

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </div>
  );
}

function ToastItem({ toast }: { toast: ToastType }) {
  const { removeToast } = useToast();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const getToastStyles = (type: ToastType['type']) => {
    const baseStyles =
      'p-4 rounded-lg shadow-lg border flex items-center justify-between min-w-[300px] max-w-[500px] animate-in slide-in-from-right duration-300';

    switch (type) {
      case 'success':
        return `${baseStyles} ${
          isDark
            ? 'bg-green-900 border-green-700 text-green-100'
            : 'bg-green-50 border-green-200 text-green-800'
        }`;
      case 'error':
        return `${baseStyles} ${
          isDark
            ? 'bg-red-900 border-red-700 text-red-100'
            : 'bg-red-50 border-red-200 text-red-800'
        }`;
      case 'warning':
        return `${baseStyles} ${
          isDark
            ? 'bg-yellow-900 border-yellow-700 text-yellow-100'
            : 'bg-yellow-50 border-yellow-200 text-yellow-800'
        }`;
      case 'info':
        return `${baseStyles} ${
          isDark
            ? 'bg-blue-900 border-blue-700 text-blue-100'
            : 'bg-blue-50 border-blue-200 text-blue-800'
        }`;
      default:
        return `${baseStyles} ${
          isDark
            ? 'bg-slate-800 border-slate-700 text-slate-100'
            : 'bg-white border-slate-200 text-slate-800'
        }`;
    }
  };

  const getIcon = (type: ToastType['type']) => {
    const iconClass = 'w-5 h-5 mr-3 flex-shrink-0';
    switch (type) {
      case 'success':
        return <CheckCircle className={iconClass} />;
      case 'error':
        return <AlertCircle className={iconClass} />;
      case 'warning':
        return <AlertTriangle className={iconClass} />;
      case 'info':
        return <Info className={iconClass} />;
      default:
        return null;
    }
  };

  return (
    <div className={getToastStyles(toast.type)}>
      <div className="flex items-start">
        {getIcon(toast.type)}
        <div className="flex-1">
          <p className="text-sm font-medium">{toast.message}</p>
          {toast.action && (
            <button
              onClick={toast.action.onClick}
              className="mt-2 text-xs underline hover:no-underline"
            >
              {toast.action.label}
            </button>
          )}
        </div>
      </div>
      <button
        onClick={() => removeToast(toast.id)}
        className={`ml-4 text-lg leading-none hover:opacity-70 p-1 rounded ${
          isDark ? 'hover:bg-slate-700' : 'hover:bg-slate-100'
        }`}
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
