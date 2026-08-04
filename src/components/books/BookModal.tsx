'use client';

import { useState } from 'react';

import toast from 'react-hot-toast';

import BookForm from './BookForm';

import { BookFormData } from '@/lib/book-validation';

import {
    createBook,
    updateBook,
} from '@/services/books.service';

import { useBooksStore } from '@/store/books.store';

import { useDashboardStore } from '@/store/dashboard.store';

interface Props {
    open: boolean;
    onClose: () => void;
}

export default function BookModal({
    open,
    onClose,
}: Props) {
    const [loading, setLoading] = useState(false);

    const fetchBooks = useBooksStore(
        (state) => state.fetchBooks
    );

    const editingBook = useBooksStore(
        (state) => state.editingBook
    );

    const fetchStatistics = useDashboardStore(
        (state) => state.fetchStatistics
    );

    if (!open) return null;

    async function handleSubmit(
        data: BookFormData
    ) {
        try {
            setLoading(true);

            const payload = {
                title: data.title.trim(),
                author: data.author.trim(),
                tags: data.tags
                    .split(',')
                    .map((tag) => tag.trim())
                    .filter(Boolean),
                status: data.status,
            };

            if (editingBook) {
                await updateBook(
                    editingBook._id,
                    payload
                );

                toast.success(
                    'Book updated successfully'
                );
            } else {
                await createBook(payload);

                toast.success(
                    'Book added successfully'
                );
            }

            // Close modal first (also clears editingBook)
            onClose();

            // Refresh data after modal is closed
            await Promise.all([
                fetchBooks(),
                fetchStatistics(),
            ]);
        } catch (error) {
            console.error(error);

            toast.error(
                'Something went wrong'
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div
            onClick={onClose}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
        >
            <div
                onClick={(e) =>
                    e.stopPropagation()
                }
                className="w-full max-w-xl rounded-2xl bg-white shadow-2xl"
            >
                {/* Header */}

                <div className="border-b border-slate-200 px-6 py-5">
                    <h2 className="text-2xl font-bold">
                        {editingBook
                            ? 'Edit Book'
                            : 'Add New Book'}
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        {editingBook
                            ? 'Update your book details.'
                            : 'Fill in the details below to add a new book to your library.'}
                    </p>
                </div>

                {/* Body */}

                <div className="p-6">
                    <BookForm
                        loading={loading}
                        initialValues={
                            editingBook
                                ? {
                                    _id: editingBook._id,
                                    title: editingBook.title,
                                    author: editingBook.author,
                                    tags: editingBook.tags,
                                    status: editingBook.status,
                                }
                                : undefined
                        }
                        onCancel={onClose}
                        onSubmit={handleSubmit}
                    />
                </div>
            </div>
        </div>
    );
}