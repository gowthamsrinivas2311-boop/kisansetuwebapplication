'use client';

import { type ReactNode, forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', padding = 'md', hover = false, children, ...props }, ref) => {
    const variantStyles = {
      default: 'bg-background-card border border-neutral-200 shadow-card',
      elevated: 'bg-background-card shadow-card-hover border-none',
      outlined: 'bg-background-card border-2 border-neutral-200',
    };

    const paddingStyles = {
      none: '',
      sm: 'p-3',
      md: 'p-4',
      lg: 'p-6',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-card transition-all duration-200',
          variantStyles[variant],
          paddingStyles[padding],
          hover && 'hover:shadow-card-hover hover:-translate-y-0.5 cursor-pointer',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('mb-4', className)} {...props}>
      {children}
    </div>
  )
);

CardHeader.displayName = 'CardHeader';

export interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, as: Component = 'h3', children, ...props }, ref) => (
    <Component
      ref={ref}
      className={cn('text-lg font-semibold text-neutral-900', className)}
      {...props}
    >
      {children}
    </Component>
  )
);

CardTitle.displayName = 'CardTitle';

export interface CardDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {}

export const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, children, ...props }, ref) => (
    <p ref={ref} className={cn('text-sm text-neutral-500 mt-1', className)} {...props}>
      {children}
    </p>
  )
);

CardDescription.displayName = 'CardDescription';

export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {}

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('', className)} {...props}>
      {children}
    </div>
  )
);

CardContent.displayName = 'CardContent';

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {}

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('mt-4 pt-4 border-t border-neutral-200 flex items-center gap-3', className)}
      {...props}
    >
      {children}
    </div>
  )
);

CardFooter.displayName = 'CardFooter';

// Price Card - Reusable component used across Farmer and Buyer views
export interface PriceCardProps {
  cropName: string;
  cropNameHi?: string;
  cropNameMr?: string;
  price: number; // per quintal
  unit?: string;
  timestamp?: Date;
  trend?: 'up' | 'down' | 'stable';
  trendValue?: number;
  language?: 'en' | 'hi' | 'mr';
  onClick?: () => void;
  className?: string;
}

export function PriceCard({
  cropName,
  cropNameHi,
  cropNameMr,
  price,
  unit = 'quintal',
  timestamp,
  trend = 'stable',
  trendValue = 0,
  language = 'en',
  onClick,
  className,
}: PriceCardProps) {
  const cropDisplayName = language === 'hi' ? cropNameHi : language === 'mr' ? cropNameMr : cropName;
  const unitLabel = language === 'hi' ? 'क्विंटल' : language === 'mr' ? 'क्विंटल' : unit;

  return (
    <Card
      variant="default"
      padding="md"
      hover={!!onClick}
      onClick={onClick}
      className={cn('min-w-[160px] flex-shrink-0', className)}
    >
      <div className="text-xs text-neutral-500 mb-1">
        {cropDisplayName}
      </div>
      <div className="flex items-baseline gap-1 mb-2">
        <span className="text-2xl font-bold text-neutral-900">
          ₹{price.toLocaleString('en-IN')}
        </span>
        <span className="text-sm text-neutral-500">/{unitLabel}</span>
      </div>
      <div className="flex items-center justify-between">
        {timestamp && (
          <span className="text-xs text-neutral-400">
            As of {timestamp.toLocaleTimeString(language === 'hi' ? 'hi-IN' : language === 'mr' ? 'mr-IN' : 'en-IN', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
        )}
        {trend !== 'stable' && trendValue !== 0 && (
          <Badge variant={trend === 'up' ? 'trend-up' : 'trend-down'} size="sm">
            {trend === 'up' ? '+' : ''}₹{Math.abs(trendValue)}
          </Badge>
        )}
      </div>
    </Card>
  );
}