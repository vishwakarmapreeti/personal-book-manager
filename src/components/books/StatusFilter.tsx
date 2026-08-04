'use client';

import { FiChevronDown } from 'react-icons/fi';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function StatusFilter({
  value,
  onChange,
}: Props) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-12 min-w-[170px] appearance-none rounded-xl border border-slate-300 bg-white px-4 pr-10 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
      >
        <option value="">All Status</option>

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

      <FiChevronDown
        size={18}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
      />
    </div>
  );
}