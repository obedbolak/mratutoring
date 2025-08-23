// src/contexts/ThemeContext/ThemeProvider.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { ThemeContext } from './ThemeContext';
import { type Theme, type ThemeProviderProps } from './types';
import { getThemeColors, type ThemeKey } from '@/themes';
import { themeConfig } from '@/themes/config';

export function ThemeProvider({
  children,
  defaultTheme = themeConfig.default,
  storageKey = themeConfig.storageKey,
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [mounted, setMounted] = useState(false);

  // Get theme colors and gradients
  const themeData = getThemeColors(theme as ThemeKey);

  useEffect(() => {
    try {
      // Check if theme is stored in localStorage
      const storedTheme = localStorage.getItem(storageKey) as Theme | null;
      if (storedTheme && (storedTheme === 'light' || storedTheme === 'dark')) {
        setThemeState(storedTheme);
      } else if (themeConfig.enableColorSchemeMedia) {
        // Check system preference
        const prefersDark = window.matchMedia(
          '(prefers-color-scheme: dark)'
        ).matches;
        setThemeState(prefersDark ? 'dark' : 'light');
      }
    } catch (error) {
      console.warn('Failed to load theme from localStorage:', error);
    }
    setMounted(true);
  }, [storageKey]);

  useEffect(() => {
    if (!mounted) return;

    try {
      localStorage.setItem(storageKey, theme);
    } catch (error) {
      console.warn('Failed to save theme to localStorage:', error);
    }

    // Update document classes and attributes
    const root = document.documentElement;

    // Remove existing theme classes
    root.classList.remove('light', 'dark');

    // Add new theme class
    root.classList.add(theme);

    // Set data attribute for CSS
    root.setAttribute(themeConfig.attribute, theme);

    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        'content',
        theme === 'dark' ? '#0f172a' : '#ffffff'
      );
    }
  }, [theme, mounted, storageKey]);

  // Fix: Properly type the prev parameter
  const toggleTheme = () => {
    setThemeState((prev: Theme) => (prev === 'light' ? 'dark' : 'light'));
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const value = {
    theme,
    toggleTheme,
    setTheme,
    mounted,
    colors: themeData.colors,
    gradients: themeData.gradients,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
