import { create } from 'zustand';

import { getBooks } from '@/services/books.service';

import { Book, Pagination } from '@/types/book';

interface BooksStore {
  books: Book[];

  pagination: Pagination | null;

  loading: boolean;

  search: string;

  status: string;

  sort: string;

  page: number;

  limit: number;

  isModalOpen: boolean;

  editingBook: Book | null;

  deletingBook: Book | null;
  

  openDeleteModal: (book: Book) => void;

  closeDeleteModal: () => void;

  openAddModal: () => void;

  openEditModal: (book: Book) => void;

  closeModal: () => void;

  setSearch: (value: string) => void;

  setStatus: (value: string) => void;

  setSort: (value: string) => void;

  setPage: (page: number) => void;

  fetchBooks: () => Promise<void>;
}

export const useBooksStore = create<BooksStore>((set, get) => ({
  books: [],

  pagination: null,

  loading: false,

  search: '',

  status: '',

  sort: '-createdAt',

  page: 1,

  limit: 10,

  isModalOpen: false,

  editingBook: null,

  deletingBook: null,

  openDeleteModal: (book) =>
    set({
      deletingBook: book,
    }),

  closeDeleteModal: () =>
    set({
      deletingBook: null,
    }),

  openAddModal: () =>
    set({
      isModalOpen: true,
      editingBook: null,
    }),

  openEditModal: (book) =>
    set({
      isModalOpen: true,
      editingBook: book,
    }),

  closeModal: () =>
    set({
      isModalOpen: false,
      editingBook: null,
    }),

  setSearch: (value) =>
    set({
      search: value,
      page: 1,
    }),

  setStatus: (value) =>
    set({
      status: value,
      page: 1,
    }),

  setSort: (value) =>
    set({
      sort: value,
    }),

  setPage: (page) =>
    set({
      page,
    }),

  fetchBooks: async () => {
    try {
      set({
        loading: true,
      });

      const state = get();

      const response = await getBooks({
        search: state.search,
        status: state.status,
        sort: state.sort,
        page: state.page,
        limit: state.limit,
      });

      set({
        books: response.books,
        pagination: response.pagination,
      });
    } catch (error) {
      console.error(error);
    } finally {
      set({
        loading: false,
      });
    }
  },
}));