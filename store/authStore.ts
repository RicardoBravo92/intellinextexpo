import { Module, User } from '@/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  user: User | null;
  token: string | null;
  modules: Module[];
  isAuthenticated: boolean;
  login: (data: any) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      modules: [],
      isAuthenticated: false,

      login: (data) => {
        set({
          user: data.user,
          token: data.token,
          modules: data.modules,
          isAuthenticated: true,
        });
      },

      logout: () => {
        set({
          user: null,
          token: null,
          modules: [],
          isAuthenticated: false,
        });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        modules: state.modules,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
