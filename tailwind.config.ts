import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors
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
          900: '#1E4620', // Deep forest green primary
          950: '#143315',
        },
        accent: {
          50: '#FFF8E1',
          100: '#FFECB3',
          200: '#FFE082',
          300: '#FFD54F',
          400: '#FFCA28',
          500: '#FFC107', // Gold/amber accent
          600: '#FFB300',
          700: '#FFA000',
          800: '#FF8F00',
          900: '#FF6F00',
        },
        // Semantic colors
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
        // Neutral grays
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
        // Background
        background: {
          light: '#F5F5F5',
          DEFAULT: '#FAFAFA',
          card: '#FFFFFF',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Farmer app - larger, more readable
        'farmer-xs': ['0.75rem', { lineHeight: '1.5' }],
        'farmer-sm': ['0.875rem', { lineHeight: '1.5' }],
        'farmer-base': ['1rem', { lineHeight: '1.6' }],
        'farmer-lg': ['1.125rem', { lineHeight: '1.6' }],
        'farmer-xl': ['1.25rem', { lineHeight: '1.5' }],
        'farmer-2xl': ['1.5rem', { lineHeight: '1.4' }],
        'farmer-3xl': ['1.875rem', { lineHeight: '1.3' }],
        // Buyer dashboard - denser
        'buyer-xs': ['0.6875rem', { lineHeight: '1.5' }],
        'buyer-sm': ['0.8125rem', { lineHeight: '1.5' }],
        'buyer-base': ['0.875rem', { lineHeight: '1.5' }],
        'buyer-lg': ['1rem', { lineHeight: '1.5' }],
        'buyer-xl': ['1.125rem', { lineHeight: '1.4' }],
        'buyer-2xl': ['1.25rem', { lineHeight: '1.3' }],
      },
      spacing: {
        'touch': '48px', // Minimum touch target
        'touch-lg': '56px',
      },
      borderRadius: {
        'card': '12px',
        'button': '8px',
        'badge': '9999px',
        'input': '8px',
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 4px 16px rgba(0, 0, 0, 0.12)',
        'button': '0 2px 4px rgba(30, 70, 32, 0.2)',
        'button-hover': '0 4px 12px rgba(30, 70, 32, 0.3)',
      },
      transitionDuration: {
        'fast': '150ms',
        'normal': '200ms',
        'slow': '300ms',
      },
    },
  },
  plugins: [],
}
export default config