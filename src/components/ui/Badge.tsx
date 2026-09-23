'use client';

import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'verified' | 'trend-up' | 'trend-down';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  icon?: ReactNode;
}

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  className,
  icon,
}: BadgeProps) {
  const baseStyles = `
    inline-flex items-center gap-1.5 font-medium rounded-badge
    transition-colors duration-200
  `;

  const variantStyles = {
    default: 'bg-neutral-100 text-neutral-700',
    success: 'bg-success-light/10 text-success-dark border border-success-light/20',
    warning: 'bg-warning-light/10 text-warning-dark border border-warning-light/20',
    error: 'bg-error-light/10 text-error-dark border border-error-light/20',
    info: 'bg-primary-100 text-primary-900',
    verified: 'bg-success-light/10 text-success-dark border border-success-light/20',
    'trend-up': 'bg-success-light/10 text-success-dark border border-success-light/20',
    'trend-down': 'bg-error-light/10 text-error-dark border border-error-light/20',
  };

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
  };

  const iconComponent = variant === 'verified' ? (
    <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3 3a.75.75 0 001.06 1.06l1.72-1.72 2.47 2.47a.75.75 0 101.06-1.06l-3-3z" clipRule="evenodd" />
    </svg>
  ) : variant === 'trend-up' ? (
    <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" />
    </svg>
  ) : variant === 'trend-down' ? (
    <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M14.77 12.79a.75.75 0 01-1.06.02L10 8.832l-3.71 3.938a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z" />
    </svg>
  ) : icon;

  return (
    <span className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}>
      {iconComponent}
      {children}
    </span>
  );
}

export interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  className?: string;
}

export function StarRating({ rating, maxRating = 5, size = 'md', showValue = true, className }: StarRatingProps) {
  const sizeStyles = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4.5 h-4.5',
    lg: 'w-5.5 h-5.5',
  };

  const stars = Array.from({ length: maxRating }, (_, i) => {
    const starValue = i + 1;
    const filled = starValue <= rating;
    const partial = !filled && starValue - 0.5 <= rating;

    return (
      <svg
        key={i}
        className={cn(sizeStyles[size], filled ? 'text-accent-500' : 'text-neutral-300')}
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        {partial ? (
          <>
            <defs>
              <linearGradient id={`star-gradient-${i}`} x1="0" y1="0" x2="1" y2="0">
                <stop offset="50%" stopColor="currentColor" />
                <stop offset="50%" stopColor="#E0E0E0" />
              </linearGradient>
            </defs>
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" fill="url(#star-gradient)" />
          </>
        ) : (
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        )}
      </svg>
    );
  });

  return (
    <div className={cn('inline-flex items-center gap-1', className)}>
      <div className="flex" role="img" aria-label={`${rating} out of ${maxRating} stars`}>
        {stars}
      </div>
      {showValue && (
        <span className="text-sm font-medium text-neutral-700 ml-1">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}