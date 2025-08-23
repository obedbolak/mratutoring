// src/contexts/ThemeContext/types.ts
import { type ThemeKey, type ThemeColors, type GradientColors } from '@/themes';

export type Theme = ThemeKey;

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  mounted: boolean;
  colors: ThemeColors;
  gradients: GradientColors;
}

export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

// Define all possible class combinations for better type safety
export interface ThemeClasses {
  readonly pageBackground: string;
  readonly navBackground: string;
  readonly cardBackground: string;
  readonly cardHover: string;
  readonly cardElevated: string;
  readonly textPrimary: string;
  readonly textSecondary: string;
  readonly textMuted: string;
  readonly textAccent: string;
  readonly textInverse: string;
  readonly textSuccess: string;
  readonly navItem: string;
  readonly navActive: string;
  readonly formBackground: string;
  readonly formInput: string;
  readonly formFocus: string;
  readonly formButton: string;
  readonly formButtonSecondary: string;
  readonly statusSuccess: string;
  readonly statusError: string;
  readonly statusWarning: string;
  readonly statusInfo: string;
  readonly educationOLevel: string;
  readonly educationALevel: string;
  readonly educationResources: string;
  readonly educationTeachers: string;
  readonly isDark: boolean;
}