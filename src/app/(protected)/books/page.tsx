'use client';

import { useEffect } from 'react';

import BookGrid from '@/components/books/BookGrid';
import BooksToolbar from '@/components/books/BooksToolbar';
import BookModal from '@/components/books/BookModal';
import DeleteBookModal from '@/components/books/DeleteBookModal';
import Pagination from '@/components/books/Pagination';

import { useBooksStore } from '@/store/books.store';

import useDebounce from '@/hooks/useDebounce';

import EmptyState from '@/components/ui/EmptyState';

export default function BooksPage() {
  const {
    books,
    pagination,
    loading,

    search,
    status,
    sort,
    page,

    setSearch,
    setStatus,
    setSort,
    setPage,

    fetchBooks,

    openAddModal,
    isModalOpen,
    closeModal,
  } = useBooksStore();

  const debouncedSearch =
    useDebounce(search, 500);

  useEffect(() => {
    fetchBooks();
  }, [
    debouncedSearch,
    status,
    sort,
    page,
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          My Books
        </h1>

        <p className="mt-2 text-slate-500">
          Manage your personal library.
        </p>
      </div>

      <BooksToolbar
        search={search}
        status={status}
        sort={sort}
        onSearchChange={setSearch}
        onStatusChange={setStatus}
        onSortChange={setSort}
        onAddBook={openAddModal}
      />

      {loading ? (
        <p className="py-10 text-center text-slate-500">
          Loading books...
        </p>
      ) : (
        <>
          {books.length === 0 ? (
            <EmptyState
              title={
                search
                  ? 'No Books Found'
                  : 'Your Library is Empty'
              }
              description={
                search
                  ? 'Try searching with another title, author, or remove filters.'
                  : 'Start building your personal library by adding your first book.'
              }
              buttonText={
                search ? undefined : 'Add First Book'
              }
              onButtonClick={
                search ? undefined : openAddModal
              }
            />
          ) : (
            <BookGrid books={books} />
          )}

          {pagination && (
            <Pagination
              pagination={pagination}
              onPageChange={setPage}
            />
          )}
        </>
      )}

      <BookModal
        open={isModalOpen}
        onClose={closeModal}
      />

      <DeleteBookModal />
    </div>
  );
}