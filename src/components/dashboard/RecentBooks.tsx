'use client';

import Link from 'next/link';

import { Book } from '@/types/book';
import BookStatusSelect from './BookStatusSelect';

interface Props {
    books: Book[];
}

export default function RecentBooks({
    books,
}: Props) {
    return (
        <div className="rounded-2xl  mt-4 border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-slate-900">
                        Recent Books
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Your latest additions.
                    </p>
                </div>

                <Link
                    href="/books"
                    className="text-sm font-semibold text-blue-600 hover:underline"
                >
                    View All →
                </Link>
            </div>

            {books.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-300 py-12 text-center">
                    <p className="text-slate-500">
                        No books added yet.
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {books.map((book) => (
                        <div
                            key={book._id}
                            className="flex items-center justify-between rounded-xl border border-slate-200 p-4 transition hover:bg-slate-50"
                        >
                            <div>
                                <h3 className="font-semibold text-slate-900">
                                    {book.title}
                                </h3>

                                <p className="text-sm text-slate-500">
                                    {book.author}
                                </p>
                            </div>

                            <BookStatusSelect
                                id={book._id}
                                status={book.status}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}