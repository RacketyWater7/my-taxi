
'use client';

import { forwardRef, useId } from 'react';
import { cn } from '@/lib/cn';

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const generatedId = useId();
    const radioId = id || generatedId;

    return (
      <div className="w-full">
        <div className="flex items-center gap-3">
          <input
            type="radio"
            ref={ref}
            id={radioId}
            className={cn(
              'h-5 w-5 shrink-0 cursor-pointer rounded-full border-2 border-espresso-300 bg-white',
              'accent-brand-500',
              'checked:border-brand-500',
              'hover:border-brand-400',
              'focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:ring-offset-0',
              'disabled:cursor-not-allowed disabled:opacity-50',
              error && 'border-error',
              className
            )}
            {...props}
          />
          {label && (
            <label
              htmlFor={radioId}
              className={cn(
                'cursor-pointer text-sm font-medium text-espresso-600 transition-colors hover:text-espresso-800',
                props.disabled && 'cursor-not-allowed opacity-50'
              )}
            >
              {label}
            </label>
          )}
        </div>
        {error && (
          <p className="mt-1.5 ml-8 flex items-center gap-1 text-xs font-medium text-error">
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

Radio.displayName = 'Radio';