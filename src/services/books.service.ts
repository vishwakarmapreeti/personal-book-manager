import api from './api';

import { BooksResponse } from '@/types/book';
import { CreateBookRequest } from '@/types/book';

interface GetBooksParams {
  search?: string;
  status?: string;
  tag?: string;
  sort?: string;
  page?: number;
  limit?: number;
}

export async function getBooks(
  params: GetBooksParams
) {
  const response =
    await api.get<BooksResponse>(
      '/books',
      {
        params,
      }
    );

  return response.data;
}

export async function createBook(
  data: CreateBookRequest
) {
  const response = await api.post(
    '/books',
    data
  );

  return response.data;
}

export async function updateBook(
  id: string,
  data: CreateBookRequest
) {
  const response = await api.put(
    `/books/${id}`,
    data
  );

  return response.data;
}

export async function deleteBook(
  id: string
) {
  const response = await api.delete(
    `/books/${id}`
  );

  return response.data;
}

export async function updateBookStatus(
  id: string,
  status: 'Want to Read' | 'Reading' | 'Completed'
) {
  const response = await api.put(
    `/books/${id}`,
    {
      status,
    }
  );

  return response.data;
}