'use client';

import { useState } from 'react';

import toast from 'react-hot-toast';

import { updateBookStatus } from '@/services/books.service';

import { useDashboardStore } from '@/store/dashboard.store';

interface Props {
  id: string;

  status:
    | 'Want to Read'
    | 'Reading'
    | 'Completed';
}

export default function BookStatusSelect({
  id,
  status,
}: Props) {
  const [loading, setLoading] =
    useState(false);

  const fetchStatistics =
    useDashboardStore(
      (state) =>
        state.fetchStatistics
    );

  async function handleChange(
    value: string
  ) {
    try {
      setLoading(true);

      await updateBookStatus(
        id,
        value as any
      );

      toast.success(
        'Status updated'
      );

      await fetchStatistics();
    } catch {
      toast.error(
        'Update failed'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative">
      <select
        disabled={loading}
        value={status}
        onChange={(e) =>
          handleChange(
            e.target.value
          )
        }
        className="h-10 appearance-none rounded-lg border border-slate-200 bg-white px-3 pr-9 text-sm font-medium outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100 disabled:opacity-60"
      >
        <option value="Want to Read">
          Want to Read
        </option>

        <option value="Reading">
          Reading
        </option>

        <option value="Completed">
          Completed
        </option>
      </select>

      <svg
        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
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
  );
}