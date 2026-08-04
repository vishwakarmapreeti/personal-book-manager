'use client';

import { FiBookOpen } from 'react-icons/fi';

import Button from './Button';

interface EmptyStateProps {
  title: string;
  description: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

export default function EmptyState({
  title,
  description,
  buttonText,
  onButtonClick,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-8 py-16 text-center shadow-sm">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
        <FiBookOpen
          size={38}
          className="text-blue-600"
        />
      </div>

      <h2 className="mt-6 text-2xl font-bold text-slate-900">
        {title}
      </h2>

      <p className="mt-3 max-w-md text-slate-500">
        {description}
      </p>

      {buttonText && onButtonClick && (
        <Button
          className="mt-8 w-auto px-6"
          onClick={onButtonClick}
        >
          {buttonText}
        </Button>
      )}
    </div>
  );
}