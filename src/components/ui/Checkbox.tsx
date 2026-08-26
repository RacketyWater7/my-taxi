'use client';

import { forwardRef, useId } from 'react';
import { cn } from '@/lib/cn';

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: React.ReactNode;
  error?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, error, id, checked, onChange, disabled, required, ...props }, ref) => {
    const generatedId = useId();
    const checkboxId = id || generatedId;

    // Handle click on the checkbox container
    const handleClick = () => {
      if (disabled) return;
      
      // Create a synthetic event that mimics a checkbox change
      const syntheticEvent = {
        target: {
          checked: !checked,
          type: 'checkbox',
          name: props.name || '',
        },
        currentTarget: {
          checked: !checked,
          type: 'checkbox',
          name: props.name || '',
        },
        preventDefault: () => {},
        stopPropagation: () => {},
      } as React.ChangeEvent<HTMLInputElement>;

      if (onChange) {
        onChange(syntheticEvent);
      }
    };

    // Determine if checkbox is visually checked
    const isChecked = !!checked;

    return (
      <div className="w-full">
        <div
          role="checkbox"
          aria-checked={isChecked}
          aria-disabled={disabled}
          aria-required={required}
          aria-invalid={!!error}
          tabIndex={disabled ? -1 : 0}
          onClick={handleClick}
          onKeyDown={(e) => {
            if (e.key === ' ' || e.key === 'Enter') {
              e.preventDefault();
              handleClick();
            }
          }}
          className={cn(
            'flex items-start gap-3 cursor-pointer select-none',
            disabled && 'cursor-not-allowed opacity-50'
          )}
        >
          {/* Hidden native input for form submission */}
          <input
            type="checkbox"
            ref={ref}
            id={checkboxId}
            checked={isChecked}
            onChange={() => {}} // Handled by onClick above
            disabled={disabled}
            required={required}
            className="sr-only"
            tabIndex={-1}
            {...props}
          />
          
          {/* Custom checkbox visual - BOLD YELLOW TAXI THEME */}
          <span
            className="mt-0.5 shrink-0 flex h-6 w-6 items-center justify-center rounded-lg border-2 transition-all duration-200"
            style={{
              backgroundColor: isChecked ? '#FFD700' : '#FFFFFF',
              borderColor: isChecked ? '#FFD700' : (error ? '#EF4444' : '#1A1A1A'),
              boxShadow: isChecked ? '0 0 0 4px rgba(255, 215, 0, 0.2)' : 'none',
            }}
          >
            {/* Checkmark */}
            <svg
              className="h-4 w-4 transition-all duration-200"
              style={{
                opacity: isChecked ? 1 : 0,
                transform: isChecked ? 'scale(1)' : 'scale(0)',
                color: '#1A1A1A',
              }}
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 3L4.5 8.5L2 6"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          
          {/* Label text */}
          {label && (
            <span className="text-sm font-medium text-night-700 transition-colors leading-relaxed">
              {label}
              {required && <span className="ml-1 text-error">*</span>}
            </span>
          )}
        </div>
        
        {error && (
          <p className="mt-1.5 ml-9 flex items-center gap-1 text-xs font-medium text-error">
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

Checkbox.displayName = 'Checkbox';