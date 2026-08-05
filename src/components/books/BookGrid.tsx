'use client';

import BookCard from './BookCard';

import EmptyState from '@/components/ui/EmptyState';

import { Book } from '@/types/book';

interface Props {
  books: Book[];
}

export default function BookGrid({
  books,
}: Props) {
  if (books.length === 0) {
    return (
      <EmptyState
        title="No books found"
        description="Start building your personal library by adding your first book."
      />
    );
  }

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      {books.map((book) => (
        <BookCard
          key={book._id}
          book={book}
        />
      ))}
    </div>
  );
}