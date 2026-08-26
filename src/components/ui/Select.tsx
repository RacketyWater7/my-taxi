'use client';

import { forwardRef, useId } from 'react';
import { cn } from '@/lib/cn';

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: string;
  label?: string;
  hint?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, label, hint, children, id, ...props }, ref) => {
    const generatedId = useId();
    const selectId = id || generatedId;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={selectId}
            className="mb-2 block text-sm font-bold text-night-800"
          >
            {label}
            {props.required && <span className="ml-1 text-error">*</span>}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            className={cn(
              'h-12 w-full appearance-none rounded-xl border-2 bg-white px-4 pr-10 text-base font-medium',
              'text-night-900',
              'transition-all duration-200',
              'border-night-200',
              'hover:border-taxi-400 hover:bg-taxi-50',
              'focus:border-taxi-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-taxi-100',
              'disabled:cursor-not-allowed disabled:bg-night-50 disabled:text-night-400',
              error && 'border-error focus:border-error focus:ring-red-100',
              className
            )}
            {...props}
            id={selectId}
          >
            {children}
          </select>
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-night-500">
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
        {hint && !error && (
          <p className="mt-1.5 text-xs text-night-500">{hint}</p>
        )}
        {error && (
          <p className="mt-1.5 flex items-center gap-1 text-xs font-medium text-error">
            <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';