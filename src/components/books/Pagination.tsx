'use client';

import Button from '@/components/ui/Button';

import { Pagination as PaginationType } from '@/types/book';

interface Props {
  pagination: PaginationType;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  pagination,
  onPageChange,
}: Props) {
  const {
    page,
    totalPages,
    totalBooks,
    limit,
    hasNextPage,
    hasPreviousPage,
  } = pagination;

  return (
    <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
   
        <div className="text-sm text-slate-500">
          Showing{' '}
          <span className="font-semibold text-slate-900">
            {Math.min(page * limit, totalBooks)}
          </span>{' '}
          of{' '}
          <span className="font-semibold text-slate-900">
            {totalBooks}
          </span>{' '}
          books
        </div>

        
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="secondary"
            disabled={!hasPreviousPage}
            onClick={() => onPageChange(page - 1)}
          >
            Previous
          </Button>

          {Array.from(
            { length: totalPages },
            (_, index) => index + 1
          ).map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => onPageChange(pageNumber)}
              className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-semibold transition ${
                page === pageNumber
                  ? 'bg-blue-600 text-white'
                  : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
              }`}
            >
              {pageNumber}
            </button>
          ))}

          <Button
            variant="secondary"
            disabled={!hasNextPage}
            onClick={() => onPageChange(page + 1)}
          >
            Next
          </Button>
        </div>

        
        <div className="text-sm text-slate-500">
          Page{' '}
          <span className="font-semibold text-slate-900">
            {page}
          </span>{' '}
          of{' '}
          <span className="font-semibold text-slate-900">
            {totalPages}
          </span>
        </div>
      </div>
    </div>
  );
}