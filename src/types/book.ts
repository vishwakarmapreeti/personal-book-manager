export type BookStatus =
  | 'Want to Read'
  | 'Reading'
  | 'Completed';

export interface Book {
  _id: string;
  title: string;
  author: string;
  tags: string[];
  status: BookStatus;
  user: string;
  createdAt: string;
  updatedAt: string;
}

export interface Pagination {
  page: number;
  limit: number;
  totalBooks: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface BooksResponse {
  success: boolean;
  message: string;
  books: Book[];
  pagination: Pagination;
}

export interface CreateBookRequest {
  title: string;
  author: string;
  tags: string[];
  status: 'Want to Read' | 'Reading' | 'Completed';
}