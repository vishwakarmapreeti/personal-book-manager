'use client';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function SortDropdown({
  value,
  onChange,
}: Props) {
  return (
    <div className="relative">
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="h-12 appearance-none rounded-xl border border-slate-300 bg-white px-4 pr-10 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
  >
    <option value="-createdAt">Newest</option>
    <option value="createdAt">Oldest</option>
    <option value="title">Title A-Z</option>
    <option value="-title">Title Z-A</option>
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