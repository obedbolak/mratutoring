// src/themes/colors.ts

// Define types for our education color system
export interface ColorShade {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950?: string;
}

export interface BackgroundColors {
  main: string;
  orb1: string;
  orb2: string;
  orb3: string;
  overlay: string;
  pattern: string;
}

export interface TextColors {
  primary: string;
  secondary: string;
  muted: string;
  accent: string;
  inverse: string;
  success: string;
}

export interface IconColors {
  primary: string;
  secondary: string;
  muted: string;
  accent: string;
}

export interface CardColors {
  background: string;
  hover: string;
  elevated: string;
  course: string;
  resource: string;
}

export interface FormColors {
  background: string;
  focus: string;
  button: string;
  buttonSecondary: string;
  input: string;
  register: string;
  login: string;
}

export interface NavColors {
  background: string;
  item: string;
  active: string;
  mobile: string;
}

export interface SelectColors {
  background: string;
  border: string;
  hover: string;
  focus: string;
  dropdown: string;
  dropdownBorder: string;
  dropdownShadow: string;
  option: {
    default: string;
    selected: string;
    text: string;
    textMuted: string;
  };
}

export interface StatusColors {
  success: string;
  error: string;
  warning: string;
  info: string;
  progress: string;
}

export interface EducationFeatures {
  olevel: string;
  alevel: string;
  resources: string;
  teachers: string;
  courses: string;
  study: string;
}

export interface ThemeColors {
  background: BackgroundColors;
  text: TextColors;
  icon: IconColors;
  card: CardColors;
  form: FormColors;
  nav: NavColors;
  select: SelectColors;
  status: StatusColors;
  education: EducationFeatures;
}

export interface GradientColors {
  heading: {
    primary: string;
    secondary: string;
    hero: string;
    education: string;
  };
  highlight: string;
  progress: string;
  button: {
    primary: string;
    secondary: string;
    register: string;
    course: string;
  };
  glow: {
    primary: string;
    focus: string;
    success: string;
  };
}

export const colorThemes: Record<'light' | 'dark', ThemeColors> = {
  light: {
    // ... (keep all your existing light theme configuration)
    background: {
      main: 'from-slate-50 via-blue-50 to-indigo-50',
      orb1: 'from-blue-400/15 to-indigo-400/15',
      orb2: 'from-indigo-400/10 to-purple-400/10',
      orb3: 'from-emerald-400/8 to-blue-400/8',
      overlay: 'from-white/80',
      pattern: 'bg-gradient-to-br from-blue-50 to-indigo-100',
    },
    text: {
      primary: 'text-slate-900',
      secondary: 'text-slate-700',
      muted: 'text-slate-500',
      accent: 'text-indigo-600',
      inverse: 'text-white',
      success: 'text-emerald-600',
    },
    icon: {
      primary: 'text-slate-700',
      secondary: 'text-slate-500',
      muted: 'text-slate-400',
      accent: 'text-indigo-600',
    },
    card: {
      background:
        'bg-white/90 backdrop-blur-sm border border-slate-200/60 shadow-sm',
      hover:
        'hover:shadow-lg hover:shadow-indigo-500/10 hover:border-indigo-300/50 hover:-translate-y-1',
      elevated: 'bg-white shadow-md border border-slate-200',
      course:
        'bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200/60',
      resource:
        'bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200/60',
    },
    form: {
      background: 'bg-white/95 backdrop-blur-sm border border-slate-200',
      focus: 'border-indigo-500 ring-2 ring-indigo-500/20 shadow-md',
      button:
        'from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500',
      buttonSecondary:
        'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300',
      input:
        'bg-white border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-slate-900',
      register:
        'from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500',
      login:
        'from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500',
    },
    nav: {
      background:
        'bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm',
      item: 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50',
      active: 'text-indigo-600 bg-indigo-100 border-indigo-300',
      mobile: 'bg-white border border-slate-200 shadow-lg',
    },
    select: {
      background: 'bg-white',
      border: 'border-slate-300',
      hover: 'hover:border-indigo-400',
      focus: 'border-indigo-500 ring-2 ring-indigo-500/20',
      dropdown: 'bg-white',
      dropdownBorder: 'border-slate-200',
      dropdownShadow: 'shadow-lg shadow-slate-900/10',
      option: {
        default: 'hover:bg-indigo-50',
        selected: 'bg-indigo-100 text-indigo-700 font-medium',
        text: 'text-slate-900',
        textMuted: 'text-slate-500',
      },
    },
    status: {
      success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      error: 'bg-red-50 text-red-700 border-red-200',
      warning: 'bg-amber-50 text-amber-700 border-amber-200',
      info: 'bg-blue-50 text-blue-700 border-blue-200',
      progress: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    },
    education: {
      olevel: 'text-blue-600 bg-blue-50 border-blue-200',
      alevel: 'text-indigo-600 bg-indigo-50 border-indigo-200',
      resources: 'text-emerald-600 bg-emerald-50 border-emerald-200',
      teachers: 'text-purple-600 bg-purple-50 border-purple-200',
      courses: 'text-teal-600 bg-teal-50 border-teal-200',
      study: 'text-orange-600 bg-orange-50 border-orange-200',
    },
  },

  dark: {
    // ... (keep all your existing dark theme configuration)
    background: {
      main: 'from-slate-900 via-slate-800 to-indigo-900',
      orb1: 'from-indigo-500/10 to-blue-500/10',
      orb2: 'from-blue-500/8 to-purple-500/8',
      orb3: 'from-emerald-500/6 to-indigo-500/6',
      overlay: 'from-slate-800/90',
      pattern: 'bg-gradient-to-br from-slate-800 to-indigo-900',
    },
    text: {
      primary: 'text-slate-100',
      secondary: 'text-slate-300',
      muted: 'text-slate-400',
      accent: 'text-indigo-400',
      inverse: 'text-slate-900',
      success: 'text-emerald-400',
    },
    icon: {
      primary: 'text-slate-200',
      secondary: 'text-slate-400',
      muted: 'text-slate-500',
      accent: 'text-indigo-400',
    },
    card: {
      background:
        'bg-slate-800/80 backdrop-blur-sm border border-slate-700/60 shadow-lg',
      hover:
        'hover:shadow-xl hover:shadow-indigo-500/20 hover:border-indigo-500/40 hover:-translate-y-1',
      elevated: 'bg-slate-800 shadow-xl border border-slate-700',
      course:
        'bg-gradient-to-br from-blue-900/20 to-indigo-900/20 border border-blue-700/40',
      resource:
        'bg-gradient-to-br from-emerald-900/20 to-teal-900/20 border border-emerald-700/40',
    },
    form: {
      background: 'bg-slate-800/70 backdrop-blur-sm border border-slate-600',
      focus: 'border-indigo-400 ring-2 ring-indigo-400/20 shadow-lg',
      button:
        'from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500',
      buttonSecondary:
        'bg-slate-700 hover:bg-slate-600 text-slate-200 border border-slate-600',
      input:
        'bg-slate-800 border-slate-600 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 text-slate-100 placeholder-slate-400',
      register:
        'from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500',
      login:
        'from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500',
    },
    nav: {
      background:
        'bg-slate-900/95 backdrop-blur-md border-b border-slate-700 shadow-lg',
      item: 'text-slate-300 hover:text-indigo-400 hover:bg-indigo-900/30',
      active: 'text-indigo-400 bg-indigo-900/40 border-indigo-500',
      mobile: 'bg-slate-800 border border-slate-700 shadow-xl',
    },
    select: {
      background: 'bg-slate-800',
      border: 'border-slate-600',
      hover: 'hover:border-indigo-500',
      focus: 'border-indigo-400 ring-2 ring-indigo-400/20',
      dropdown: 'bg-slate-800 backdrop-blur-lg',
      dropdownBorder: 'border-slate-600',
      dropdownShadow: 'shadow-xl shadow-black/50',
      option: {
        default: 'hover:bg-slate-700',
        selected:
          'bg-indigo-900/40 text-indigo-300 font-medium border-l-2 border-indigo-400',
        text: 'text-slate-100',
        textMuted: 'text-slate-400',
      },
    },
    status: {
      success: 'bg-emerald-900/30 text-emerald-300 border-emerald-700/60',
      error: 'bg-red-900/30 text-red-300 border-red-700/60',
      warning: 'bg-amber-900/30 text-amber-300 border-amber-700/60',
      info: 'bg-blue-900/30 text-blue-300 border-blue-700/60',
      progress: 'bg-indigo-900/30 text-indigo-300 border-indigo-700/60',
    },
    education: {
      olevel: 'text-blue-400 bg-blue-900/20 border-blue-700/40',
      alevel: 'text-indigo-400 bg-indigo-900/20 border-indigo-700/40',
      resources: 'text-emerald-400 bg-emerald-900/20 border-emerald-700/40',
      teachers: 'text-purple-400 bg-purple-900/20 border-purple-700/40',
      courses: 'text-teal-400 bg-teal-900/20 border-teal-700/40',
      study: 'text-orange-400 bg-orange-900/20 border-orange-700/40',
    },
  },
};

// Education-focused gradient configurations
export const gradients: Record<'light' | 'dark', GradientColors> = {
  // ... (keep all your existing gradient configurations)
  light: {
    heading: {
      primary: 'from-slate-800 via-indigo-700 to-blue-800',
      secondary: 'from-blue-700 via-indigo-600 to-purple-600',
      hero: 'from-indigo-800 to-blue-800',
      education: 'from-emerald-700 via-teal-600 to-blue-600',
    },
    highlight: 'from-indigo-600 to-blue-600',
    progress: 'from-emerald-500 to-teal-600',
    button: {
      primary: 'from-indigo-600 to-blue-600',
      secondary: 'from-slate-600 to-slate-700',
      register: 'from-emerald-600 to-teal-600',
      course: 'from-blue-600 to-indigo-600',
    },
    glow: {
      primary: 'from-indigo-400/20 via-blue-400/20 to-purple-400/20',
      focus: 'from-indigo-500/30 via-blue-500/30 to-purple-500/30',
      success: 'from-emerald-400/20 via-teal-400/20 to-green-400/20',
    },
  },
  dark: {
    heading: {
      primary: 'from-slate-100 via-indigo-300 to-blue-400',
      secondary: 'from-blue-300 via-indigo-400 to-purple-400',
      hero: 'from-indigo-300 to-blue-400',
      education: 'from-emerald-300 via-teal-400 to-blue-400',
    },
    highlight: 'from-indigo-400 to-blue-400',
    progress: 'from-emerald-400 to-teal-500',
    button: {
      primary: 'from-indigo-600 to-blue-600',
      secondary: 'from-slate-600 to-slate-700',
      register: 'from-emerald-600 to-teal-600',
      course: 'from-blue-600 to-indigo-600',
    },
    glow: {
      primary: 'from-indigo-400/15 via-blue-400/15 to-purple-400/15',
      focus: 'from-indigo-500/20 via-blue-500/20 to-purple-500/20',
      success: 'from-emerald-400/15 via-teal-400/15 to-green-400/15',
    },
  },
};

// ... (keep all your existing exports like statusColors, educationFeatures, etc.)
export const statusColors: StatusColors = {
  success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  error: 'bg-red-50 text-red-700 border-red-200',
  warning: 'bg-amber-50 text-amber-700 border-amber-200',
  info: 'bg-blue-50 text-blue-700 border-blue-200',
  progress: 'bg-indigo-50 text-indigo-700 border-indigo-200',
};
export const educationFeatures: Record<'light' | 'dark', EducationFeatures> = {
  light: {
    olevel: 'text-blue-600 bg-blue-50 border-blue-200',
    alevel: 'text-indigo-600 bg-indigo-50 border-indigo-200',
    resources: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    teachers: 'text-purple-600 bg-purple-50 border-purple-200',
    courses: 'text-teal-600 bg-teal-50 border-teal-200',
    study: 'text-orange-600 bg-orange-50 border-orange-200',
  },
  dark: {
    olevel: 'text-blue-400 bg-blue-900/20 border-blue-700/40',
    alevel: 'text-indigo-400 bg-indigo-900/20 border-indigo-700/40',
    resources: 'text-emerald-400 bg-emerald-900/20 border-emerald-700/40',
    teachers: 'text-purple-400 bg-purple-900/20 border-purple-700/40',
    courses: 'text-teal-400 bg-teal-900/20 border-teal-700/40',
    study: 'text-orange-400 bg-orange-900/20 border-orange-700/40',
  },
};

// Theme context hook (for React)
export type ThemeKey = keyof typeof colorThemes;

export const getThemeColors = (theme: ThemeKey = 'light') => {
  return {
    colors: colorThemes[theme],
    gradients: gradients[theme],
    status: statusColors,
    education: educationFeatures[theme],
  };
};

// ... (keep your existing tailwindColorPalette and other exports)
export const tailwindColorPalette = {
  // Academic primary colors
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
    950: '#172554',
  },

  // Educational secondary
  secondary: {
    50: '#eef2ff',
    100: '#e0e7ff',
    200: '#c7d2fe',
    300: '#a5b4fc',
    400: '#818cf8',
    500: '#6366f1',
    600: '#4f46e5',
    700: '#4338ca',
    800: '#3730a3',
    900: '#312e81',
    950: '#1e1b4b',
  },

  // Success/Progress colors
  success: {
    50: '#ecfdf5',
    100: '#d1fae5',
    200: '#a7f3d0',
    300: '#6ee7b7',
    400: '#34d399',
    500: '#10b981',
    600: '#059669',
    700: '#047857',
    800: '#065f46',
    900: '#064e3b',
    950: '#022c22',
  },
};
