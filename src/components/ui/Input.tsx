'use client';

import {
  InputHTMLAttributes,
  ReactNode,
  forwardRef,
} from 'react';

import { cn } from '@/lib/utils';

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  suffix?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      suffix,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-700">
          {label}
        </label>

        <div className="relative">
          <input
            ref={ref}
            className={cn(
              'h-11 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm outline-none transition',
              'focus:border-blue-500 focus:ring-2 focus:ring-blue-500',
              suffix && 'pr-12',
              error &&
                'border-red-500 focus:border-red-500 focus:ring-red-500',
              className
            )}
            {...props}
          />

          {suffix && (
            <div className="absolute inset-y-0 right-3 flex items-center">
              {suffix}
            </div>
          )}
        </div>

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