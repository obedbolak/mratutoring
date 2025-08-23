// src/themes/config.ts
import { type ThemeKey } from './colors';

export const themeConfig = {
  default: 'light' as ThemeKey,
  storageKey: 'mras-theme',
  attribute: 'data-theme',
  enableColorSchemeMedia: true,
  transitions: {
    duration: '200ms',
    easing: 'ease-in-out',
  },
} as const;

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;