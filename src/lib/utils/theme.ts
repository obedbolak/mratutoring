// src/lib/utils/theme.ts
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createThemeVariant(
  baseClasses: string,
  variants: Record<string, string>,
  theme: 'light' | 'dark'
) {
  return cn(baseClasses, variants[theme]);
}

export function getEducationLevelColor(
  level: 'olevel' | 'alevel',
  theme: 'light' | 'dark'
) {
  const colors = {
    olevel: {
      light: 'text-blue-600 bg-blue-50 border-blue-200',
      dark: 'text-blue-400 bg-blue-900/20 border-blue-700/40',
    },
    alevel: {
      light: 'text-indigo-600 bg-indigo-50 border-indigo-200',
      dark: 'text-indigo-400 bg-indigo-900/20 border-indigo-700/40',
    },
  };

  return colors[level][theme];
}

export function getSubjectColor(subject: string) {
  const subjectColorMap: Record<string, { light: string; dark: string }> = {
    mathematics: {
      light: 'text-blue-600 bg-blue-50',
      dark: 'text-blue-400 bg-blue-900/20',
    },
    sciences: {
      light: 'text-green-600 bg-green-50',
      dark: 'text-green-400 bg-green-900/20',
    },
    languages: {
      light: 'text-purple-600 bg-purple-50',
      dark: 'text-purple-400 bg-purple-900/20',
    },
    default: {
      light: 'text-slate-600 bg-slate-50',
      dark: 'text-slate-400 bg-slate-800',
    },
  };

  return subjectColorMap[subject.toLowerCase()] || subjectColorMap.default;
}
