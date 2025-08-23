// src/contexts/ThemeContext/useThemeClasses.ts
'use client';

import { useTheme } from './useTheme';
import { type ThemeClasses } from './types';

export function useThemeClasses(): ThemeClasses {
  const { theme, colors } = useTheme();
  const isDark = theme === 'dark';

  return {
    // Layout
    pageBackground: `bg-gradient-to-br ${colors.background.main}`,
    navBackground: colors.nav.background,

    // Cards
    cardBackground: colors.card.background,
    cardHover: colors.card.hover,
    cardElevated: colors.card.elevated,

    // Text
    textPrimary: colors.text.primary,
    textSecondary: colors.text.secondary,
    textMuted: colors.text.muted,
    textAccent: colors.text.accent,
    textInverse: colors.text.inverse,
    textSuccess: colors.text.success,

    // Navigation
    navItem: colors.nav.item,
    navActive: colors.nav.active,

    // Forms
    formBackground: colors.form.background,
    formInput: colors.form.input,
    formFocus: colors.form.focus,
    formButton: `bg-gradient-to-r ${colors.form.button}`,
    formButtonSecondary: colors.form.buttonSecondary,

    // Status
    statusSuccess: colors.status.success,
    statusError: colors.status.error,
    statusWarning: colors.status.warning,
    statusInfo: colors.status.info,

    // Education specific
    educationOLevel: colors.education.olevel,
    educationALevel: colors.education.alevel,
    educationResources: colors.education.resources,
    educationTeachers: colors.education.teachers,

    // Utilities
    isDark,
  };
}
