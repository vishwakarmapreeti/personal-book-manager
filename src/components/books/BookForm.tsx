'use client';

import { useEffect } from 'react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

import {
    bookFormSchema,
    BookFormData,
} from '@/lib/book-validation';

interface BookFormProps {
    initialValues?: {
        _id: string;
        title: string;
        author: string;
        tags: string[];
        status: 'Want to Read' | 'Reading' | 'Completed';
    };

    loading: boolean;

    onSubmit: (data: BookFormData) => Promise<void>;

    onCancel: () => void;
}

export default function BookForm({
    initialValues,
    loading,
    onSubmit,
    onCancel,
}: BookFormProps) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<BookFormData>({
        resolver: zodResolver(bookFormSchema),

        defaultValues: {
            title: '',
            author: '',
            tags: '',
            status: 'Want to Read',
        },
    });

    useEffect(() => {
        if (!initialValues) {
            reset({
                title: '',
                author: '',
                tags: '',
                status: 'Want to Read',
            });

            return;
        }

        reset({
            title: initialValues.title,
            author: initialValues.author,
            tags: initialValues.tags.join(', '),
            status: initialValues.status,
        });
    }, [initialValues?._id, reset]);

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
        >
            <Input
                label="Title"
                placeholder="Atomic Habits"
                {...register('title')}
                error={errors.title?.message}
            />

            <Input
                label="Author"
                placeholder="James Clear"
                {...register('author')}
                error={errors.author?.message}
            />

            <Input
                label="Tags"
                placeholder="Self Help, Productivity"
                {...register('tags')}
                error={errors.tags?.message}
            />

            <p className="-mt-3 text-xs text-slate-500">
                Separate multiple tags with commas.
            </p>

            <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                    Reading Status
                </label>

                <div className="relative">
                    <select
                        {...register('status')}
                        className="h-12 w-full appearance-none rounded-xl border border-slate-300 bg-white px-4 pr-10 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    >
                        <option value="Want to Read">
                            Want to Read
                        </option>

                        <option value="Reading">
                            Reading
                        </option>

                        <option value="Completed">
                            Completed
                        </option>
                    </select>

                    <svg
                        className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
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
            </div>

            <div className="flex justify-end gap-3 pt-4">
                <Button
                    type="button"
                    variant="secondary"
                    onClick={onCancel}
                >
                    Cancel
                </Button>

                <Button
                    type="submit"
                    loading={loading}
                >
                    {initialValues
                        ? 'Update Book'
                        : 'Save Book'}
                </Button>
            </div>
        </form>
    );
}