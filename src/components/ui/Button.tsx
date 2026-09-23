'use client';

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'accent' | 'secondary' | 'text' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      loading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles = `
      inline-flex items-center justify-center font-medium transition-all duration-200
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed
      touch-target
    `;

    const variantStyles = {
      primary: `
        bg-primary-900 text-white shadow-button hover:shadow-button-hover
        active:bg-primary-950
      `,
      accent: `
        bg-accent-500 text-primary-950 shadow-button hover:shadow-button-hover
        active:bg-accent-600
      `,
      secondary: `
        border-2 border-primary-900 text-primary-900 bg-transparent
        hover:bg-primary-50 active:bg-primary-100
      `,
      outline: `
        border-2 border-neutral-300 text-neutral-700 bg-transparent
        hover:bg-neutral-50 active:bg-neutral-100
      `,
      text: `
        text-primary-900 bg-transparent hover:bg-primary-50 active:bg-primary-100
      `,
    };

    const sizeStyles = {
      sm: 'px-3 py-1.5 text-sm gap-1.5 rounded-button',
      md: 'px-4 py-2 text-base gap-2 rounded-button',
      lg: 'px-6 py-3 text-lg gap-2 rounded-button',
      xl: 'px-8 py-4 text-xl gap-3 rounded-button',
      full: 'w-full px-6 py-3 text-lg gap-2 rounded-button',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!loading && leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
        <span>{children}</span>
        {!loading && rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';