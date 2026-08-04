'use client';

import { InputHTMLAttributes, forwardRef } from 'react';

import { cn } from '@/lib/utils';

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-700">
          {label}
        </label>

        <input
          ref={ref}
          className={cn(
            'h-11 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm',
            'outline-none transition',
            'focus:border-blue-500 focus:ring-2 focus:ring-blue-500',
            error &&
              'border-red-500 focus:border-red-500 focus:ring-red-500',
            className
          )}
          {...props}
        />

        {error && (
          <p className="text-sm text-red-600">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;