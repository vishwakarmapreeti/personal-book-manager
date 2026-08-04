import { create } from 'zustand';

import { getCurrentUser } from '@/services/auth.service';

import { User } from '@/types/user';

interface AuthStore {
  user: User | null;

  loading: boolean;

  fetchCurrentUser: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,

  loading: false,

  fetchCurrentUser: async () => {
    try {
      set({
        loading: true,
      });

      const response = await getCurrentUser();

      set({
        user: response.user,
      });
    } catch {
      set({
        user: null,
      });
    } finally {
      set({
        loading: false,
      });
    }
  },
}));