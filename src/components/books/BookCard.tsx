'use client';

import {
  FiEdit2,
  FiTrash2,
} from 'react-icons/fi';

import Button from '@/components/ui/Button';

import { useBooksStore } from '@/store/books.store';

import { Book } from '@/types/book';

interface BookCardProps {
  book: Book;
}

export default function BookCard({
  book,
}: BookCardProps) {
  const openEditModal = useBooksStore(
    (state) => state.openEditModal
  );

  const openDeleteModal = useBooksStore(
  (state) => state.openDeleteModal
);

  function getStatusColor() {
    switch (book.status) {
      case 'Reading':
        return 'bg-violet-100 text-violet-700';

      case 'Completed':
        return 'bg-green-100 text-green-700';

      default:
        return 'bg-amber-100 text-amber-700';
    }
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
     
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            {book.title}
          </h2>

          <p className="mt-1 text-slate-500">
            {book.author}
          </p>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor()}`}
        >
          {book.status}
        </span>
      </div>

   
      <div className="mt-5 flex flex-wrap gap-2">
        {book.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600"
          >
            #{tag}
          </span>
        ))}
      </div>

    
      <div className="mt-1 flex justify-end gap-3">
        <Button
          variant="secondary"
          className="h-10 px-4"
          onClick={() =>
            openEditModal(book)
          }
        >
          <FiEdit2 className="mr-2 h-4 w-4" />
          Edit
        </Button>

        <Button
          variant="danger"
          className="h-10 px-4"
          onClick={() =>
            openDeleteModal(book)
          }
        >
          <FiTrash2 className="mr-2 h-4 w-4" />
          Delete
        </Button>
      </div>
    </div>
  );
}