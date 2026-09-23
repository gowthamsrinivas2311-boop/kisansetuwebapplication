// Design System Tokens - Centralized for easy theming and API integration

export const colors = {
  primary: {
    50: '#E8F5E9',
    100: '#C8E6C9',
    200: '#A5D6A7',
    300: '#81C784',
    400: '#66BB6A',
    500: '#4CAF50',
    600: '#43A047',
    700: '#388E3C',
    800: '#2E7D32',
    900: '#1E4620',
    950: '#143315',
  },
  accent: {
    50: '#FFF8E1',
    100: '#FFECB3',
    200: '#FFE082',
    300: '#FFD54F',
    400: '#FFCA28',
    500: '#FFC107',
    600: '#FFB300',
    700: '#FFA000',
    800: '#FF8F00',
    900: '#FF6F00',
  },
  success: {
    light: '#4CAF50',
    DEFAULT: '#388E3C',
    dark: '#2E7D32',
  },
  warning: {
    light: '#FFB74D',
    DEFAULT: '#FF9800',
    dark: '#F57C00',
  },
  error: {
    light: '#EF5350',
    DEFAULT: '#E53935',
    dark: '#C62828',
  },
  neutral: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },
  background: {
    light: '#F5F5F5',
    DEFAULT: '#FAFAFA',
    card: '#FFFFFF',
  },
} as const;

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
  touch: '48px',
  'touch-lg': '56px',
} as const;

export const borderRadius = {
  card: '12px',
  button: '8px',
  badge: '9999px',
  input: '8px',
} as const;

export const shadows = {
  card: '0 2px 8px rgba(0, 0, 0, 0.08)',
  'card-hover': '0 4px 16px rgba(0, 0, 0, 0.12)',
  button: '0 2px 4px rgba(30, 70, 32, 0.2)',
  'button-hover': '0 4px 12px rgba(30, 70, 32, 0.3)',
} as const;

export const transitions = {
  fast: '150ms',
  normal: '200ms',
  slow: '300ms',
} as const;

// Typography scales
export const typography = {
  farmer: {
    xs: { fontSize: '0.75rem', lineHeight: '1.5' },
    sm: { fontSize: '0.875rem', lineHeight: '1.5' },
    base: { fontSize: '1rem', lineHeight: '1.6' },
    lg: { fontSize: '1.125rem', lineHeight: '1.6' },
    xl: { fontSize: '1.25rem', lineHeight: '1.5' },
    '2xl': { fontSize: '1.5rem', lineHeight: '1.4' },
    '3xl': { fontSize: '1.875rem', lineHeight: '1.3' },
  },
  buyer: {
    xs: { fontSize: '0.6875rem', lineHeight: '1.5' },
    sm: { fontSize: '0.8125rem', lineHeight: '1.5' },
    base: { fontSize: '0.875rem', lineHeight: '1.5' },
    lg: { fontSize: '1rem', lineHeight: '1.5' },
    xl: { fontSize: '1.125rem', lineHeight: '1.4' },
    '2xl': { fontSize: '1.25rem', lineHeight: '1.3' },
  },
} as const;

// Breakpoints
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// Z-index scale
export const zIndex = {
  dropdown: 100,
  sticky: 200,
  modal: 300,
  popover: 400,
  tooltip: 500,
  toast: 600,
} as const;

// Animation durations
export const animation = {
  fast: '150ms',
  normal: '200ms',
  slow: '300ms',
} as const;

export type ColorScale = typeof colors.primary;
export type SpacingScale = typeof spacing;
export type BorderRadiusScale = typeof borderRadius;