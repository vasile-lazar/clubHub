import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, className = '', id, ...props }, ref) => {
      const inputId = id ?? label?.toLowerCase().replace(/\s/g, '-');
      return (
          <div className="space-y-1">
            {label && (
                <label htmlFor={inputId} className="block text-sm font-medium text-text-primary">
                  {label}
                </label>
            )}
            <input
                ref={ref}
                id={inputId}
                className={`w-full p-3 rounded-lg border border-input-border bg-bg-primary text-text-primary
            focus:outline-none focus:ring-2 focus:ring-input-focus focus:border-transparent
            placeholder:text-text-muted ${error ? 'border-inputError' : ''} ${className}`}
                {...props}
            />
            {error && <p className="text-sm text-text-warning">{error}</p>}
          </div>
      );
    }
);

Input.displayName = 'Input';