'use client';

import { useState } from 'react';

import toast from 'react-hot-toast';
import { FiAlertTriangle } from 'react-icons/fi';

import Button from '@/components/ui/Button';

import { deleteBook } from '@/services/books.service';

import { useBooksStore } from '@/store/books.store';
import { useDashboardStore } from '@/store/dashboard.store';

export default function DeleteBookModal() {
    const [loading, setLoading] = useState(false);

    const deletingBook = useBooksStore(
        (state) => state.deletingBook
    );

    const closeDeleteModal = useBooksStore(
        (state) => state.closeDeleteModal
    );

    const fetchBooks = useBooksStore(
        (state) => state.fetchBooks
    );

    const fetchStatistics = useDashboardStore(
        (state) => state.fetchStatistics
    );

    if (!deletingBook) return null;

    async function handleDelete() {
        const book = deletingBook;

        if (!book) return;

        try {
            setLoading(true);

            await deleteBook(book._id);

            toast.success(
                'Book deleted successfully'
            );

            closeDeleteModal();

            await Promise.all([
                fetchBooks(),
                fetchStatistics(),
            ]);
        } catch (error) {
            console.error(error);

            toast.error(
                'Failed to delete book'
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div
            onClick={closeDeleteModal}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-md rounded-2xl bg-white shadow-2xl"
            >
                {/* Header */}

                <div className="flex flex-col items-center border-b border-slate-200 px-6 py-8">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                        <FiAlertTriangle
                            size={32}
                            className="text-red-600"
                        />
                    </div>

                    <h2 className="text-2xl font-bold text-slate-900">
                        Delete Book
                    </h2>

                    <p className="mt-2 text-center text-slate-500">
                        Are you sure you want to delete
                    </p>

                    <p className="mt-1 text-center text-lg font-semibold text-slate-900">
                        "{deletingBook.title}"
                    </p>

                    <p className="mt-3 text-center text-sm text-red-500">
                        This action cannot be undone.
                    </p>
                </div>

                {/* Footer */}

                <div className="flex justify-end gap-3 px-6 py-5">
                    <Button
                        variant="secondary"
                        onClick={closeDeleteModal}
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="danger"
                        loading={loading}
                        onClick={handleDelete}
                    >
                        Delete
                    </Button>
                </div>
            </div>
        </div>
    );
}