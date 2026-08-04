'use client';

import SearchBar from './SearchBar';
import StatusFilter from './StatusFilter';
import SortDropdown from './SortDropdown';

interface Props {
  search: string;
  status: string;
  sort: string;

  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onSortChange: (value: string) => void;

  onAddBook: () => void;
}

export default function BooksToolbar({
  search,
  status,
  sort,
  onSearchChange,
  onStatusChange,
  onSortChange,
  onAddBook,
}: Props) {
  return (
    <div className="space-y-5 rounded-2xl bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row">
        <SearchBar
          value={search}
          onChange={onSearchChange}
        />

        <button
          onClick={onAddBook}
          className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700 min-w-fit"
        >
          + Add Book
        </button>
      </div>

      <div className="flex flex-wrap gap-4">
        <StatusFilter
          value={status}
          onChange={onStatusChange}
        />

        <SortDropdown
          value={sort}
          onChange={onSortChange}
        />
      </div>
    </div>
  );
}