import { create } from 'zustand';
import type { User } from '@/types/user';

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  clearIsAuthenticated: () => void;
}

export const useAuthStore = create<AuthStore>()(setStore => ({
  user: null,
  isAuthenticated: false,

  setUser: user => {
    setStore({ user, isAuthenticated: true });
  },

  clearIsAuthenticated: () => {
    setStore({ user: null, isAuthenticated: false });
  },
}));
