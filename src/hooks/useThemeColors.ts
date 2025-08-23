// src/hooks/useThemeColors.ts
'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { statusColors, educationFeatures } from '@/themes';
import type { Theme } from '@/contexts/ThemeContext/types';

// Define proper types for your color objects
type StatusColorKey = keyof typeof statusColors;
type EducationFeatureKey = keyof typeof educationFeatures.light;

export function useThemeColors() {
  const { theme } = useTheme();

  // Type assertion to ensure theme is the correct type
  const currentTheme = theme as Theme;

  // Mock colors and gradients since they're not in your current useTheme
  // You'll need to update your useTheme hook to return these
  const colors = {
    background: {
      orb1:
        currentTheme === 'dark'
          ? 'from-indigo-500/10 to-blue-500/10'
          : 'from-blue-400/15 to-indigo-400/15',
      orb2:
        currentTheme === 'dark'
          ? 'from-blue-500/8 to-purple-500/8'
          : 'from-indigo-400/10 to-purple-400/10',
      orb3:
        currentTheme === 'dark'
          ? 'from-emerald-500/6 to-indigo-500/6'
          : 'from-emerald-400/8 to-blue-400/8',
    },
  };

  const gradients = {
    heading: {
      primary:
        currentTheme === 'dark'
          ? 'from-slate-100 via-indigo-300 to-blue-400'
          : 'from-slate-800 via-indigo-700 to-blue-800',
      secondary:
        currentTheme === 'dark'
          ? 'from-blue-300 via-indigo-400 to-purple-400'
          : 'from-blue-700 via-indigo-600 to-purple-600',
      hero:
        currentTheme === 'dark'
          ? 'from-indigo-300 to-blue-400'
          : 'from-indigo-800 to-blue-800',
      education:
        currentTheme === 'dark'
          ? 'from-emerald-300 via-teal-400 to-blue-400'
          : 'from-emerald-700 via-teal-600 to-blue-600',
    },
    button: {
      primary: 'from-indigo-600 to-blue-600',
      secondary: 'from-slate-600 to-slate-700',
      register: 'from-emerald-600 to-teal-600',
      course: 'from-blue-600 to-indigo-600',
    },
  };

  return {
    // Base colors from context
    colors,
    gradients,

    // Utility functions for specific color access with proper typing
    getStatusColor: (status: StatusColorKey): string => {
      const statusColor = statusColors[status];
      if (
        statusColor &&
        typeof statusColor === 'object' &&
        currentTheme in statusColor
      ) {
        return statusColor[currentTheme as keyof typeof statusColor];
      }
      return '';
    },

    getEducationColor: (feature: EducationFeatureKey): string => {
      const themeFeatures = educationFeatures[currentTheme];
      if (themeFeatures && feature in themeFeatures) {
        return themeFeatures[feature];
      }
      return '';
    },

    // Gradient helpers with proper typing
    getHeadingGradient: (
      type: keyof typeof gradients.heading = 'primary'
    ): string => {
      return `bg-gradient-to-r ${gradients.heading[type]} bg-clip-text text-transparent`;
    },

    getButtonGradient: (
      type: keyof typeof gradients.button = 'primary'
    ): string => {
      return `bg-gradient-to-r ${gradients.button[type]}`;
    },

    // Background helpers with proper typing
    getBackgroundOrb: (orbNumber: 1 | 2 | 3): string => {
      const orbMap: Record<1 | 2 | 3, string> = {
        1: colors.background.orb1,
        2: colors.background.orb2,
        3: colors.background.orb3,
      };
      return `bg-gradient-to-r ${orbMap[orbNumber]}`;
    },
  };
}
