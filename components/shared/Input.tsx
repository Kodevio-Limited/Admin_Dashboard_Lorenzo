'use client';

import { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  rightElement?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, rightElement, className = '', id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    if (icon) {
      return (
        <div className="flex flex-col gap-2">
          {label && (
            <label htmlFor={inputId} className="text-sm text-dark-200 font-normal">
              {label}
            </label>
          )}
          <div
            className={`flex items-center gap-3.5 bg-[#1E1E1E] rounded-full px-5 py-3.5 sm:px-6 sm:py-4 focus-within:ring-1 focus-within:ring-gold-focus/50 focus-within:border-gold-focus/40 border border-[#2A2A2A]/50 transition-all ${
              error ? '!border-danger ring-1 ring-danger' : ''
            }`}
          >
            <span className="shrink-0 flex items-center justify-center text-dark-200">
              {icon}
            </span>
            <input
              ref={ref}
              id={inputId}
              className={`w-full bg-transparent border-0 text-[15px] text-white placeholder:text-dark-200/50 focus:outline-none focus:ring-0 p-0 ${className}`}
              {...props}
            />
            {rightElement && (
              <span className="shrink-0 flex items-center justify-center">
                {rightElement}
              </span>
            )}
          </div>
          {error && <span className="text-xs text-danger">{error}</span>}
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm text-dark-200">
            {label}
          </label>
        )}
        <div className="relative w-full">
          <input
            ref={ref}
            id={inputId}
            className={`w-full bg-bg border ${error ? 'border-danger' : 'border-dark-400'} rounded-[4px] px-3 py-2.5 text-sm text-white placeholder-dark-200/50 focus:outline-none focus:ring-2 focus:ring-gold-focus/60 focus:border-gold-focus transition-colors ${rightElement ? 'pr-10' : ''} ${className}`}
            {...props}
          />
          {rightElement && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
              {rightElement}
            </div>
          )}
        </div>
        {error && <span className="text-xs text-danger">{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';
