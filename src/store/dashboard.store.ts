import { create } from 'zustand';

import { getDashboardStatistics } from '@/services/dashboard.service';
import { getBooks } from '@/services/books.service';

import { DashboardStatistics } from '@/types/dashboard';
import { Book } from '@/types/book';

interface DashboardStore {
  statistics: DashboardStatistics | null;

  recentBooks: Book[];

  loading: boolean;

  fetchStatistics: () => Promise<void>;
}

export const useDashboardStore =
  create<DashboardStore>((set) => ({
    statistics: null,

    recentBooks: [],

    loading: false,

    fetchStatistics: async () => {
      try {
        set({
          loading: true,
        });

        const [
          statisticsResponse,
          booksResponse,
        ] = await Promise.all([
          getDashboardStatistics(),
          getBooks({
            page: 1,
            limit: 5,
            sort: '-createdAt',
          }),
        ]);

        set({
          statistics:
            statisticsResponse.statistics,

          recentBooks:
            booksResponse.books,
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