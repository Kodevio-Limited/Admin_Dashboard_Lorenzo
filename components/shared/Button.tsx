'use client';

import { forwardRef } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'gold';
  size?: 'sm' | 'md' | 'lg';
}

const variants = {
  primary: 'bg-dark-500 text-white border border-dark-400 hover:bg-dark-600',
  secondary: 'bg-dark-500 text-white border border-dark-400 hover:bg-dark-600',
  ghost: 'bg-transparent text-dark-200 hover:text-white',
  gold: 'text-bg font-medium',
} as const;

const sizes = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className = '', children, disabled, ...props }, ref) => {
    const style =
      variant === 'gold'
        ? {
            background: 'linear-gradient(180deg, #FCE688 0%, #D1A736 50%, #946E18 100%)',
          }
        : undefined;

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={`inline-flex items-center justify-center rounded-[4px] font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-gold-focus/60 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
        style={style}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
