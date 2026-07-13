import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
}

interface AuthStore {
  isAuthenticated: boolean;
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  rememberMe: boolean;
  setRememberMe: (remember: boolean) => void;
  login: (user: User) => void;
  setTokens: (accessToken: string | null, refreshToken: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      accessToken: null,
      refreshToken: null,
      rememberMe: false,
      setRememberMe: (remember) => set({ rememberMe: remember }),
      login: (user) => set({ isAuthenticated: true, user }),
      setTokens: (accessToken, refreshToken) => set({ accessToken, refreshToken }),
      logout: () =>
        set({
          isAuthenticated: false,
          user: null,
          accessToken: null,
          refreshToken: null,
          rememberMe: false,
        }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) =>
        state.rememberMe
          ? {
              isAuthenticated: state.isAuthenticated,
              user: state.user,
              accessToken: state.accessToken,
              refreshToken: state.refreshToken,
              rememberMe: true,
            }
          : { rememberMe: false },
    }
  )
);
