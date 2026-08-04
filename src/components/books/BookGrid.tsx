import BookCard from './BookCard';

import { Book } from '@/types/book';

interface BookGridProps {
  books: Book[];
}

export default function BookGrid({
  books,
}: BookGridProps) {
  if (books.length === 0) {
    return (
      <div className="rounded-2xl bg-white p-12 text-center shadow-sm">
        <h2 className="text-xl font-semibold text-slate-700">
          No books found
        </h2>

        <p className="mt-2 text-slate-500">
          Add your first book to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      {books.map((book) => (
        <BookCard
          key={book._id}
          book={book}
        />
      ))}
    </div>
  );
}