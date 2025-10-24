import { LoginResponse, User } from "@/types";
import * as SecureStore from "expo-secure-store";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthState extends LoginResponse {
  isAuthenticated: boolean;
  isLoading: boolean;
  setAuthData: (data: LoginResponse) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
  updateModules: (modules: any[]) => void;
  clearAuthData: () => void;
  checkAuth: () => boolean;
}

const CURRENT_VERSION = 1;

const migrations = {
  0: (persistedState: any): any => {
    return {
      ...persistedState,
      isLoading: false,
      version: {
        api: "",
        oauth: "",
      },
    };
  },
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: "",
      user: {} as User,
      modules: [],
      isAuthenticated: false,
      isLoading: false,
      id_client: 0,
      uid_client: "",
      id_instance: 0,
      version: {
        api: "",
        oauth: "",
      },

      setAuthData: (data: LoginResponse) =>
        set({
          token: data.token,
          user: data.user,
          modules: data.modules,
          id_client: data.id_client,
          uid_client: data.uid_client,
          id_instance: data.id_instance,
          version: data.version,
          isAuthenticated: true,
          isLoading: false,
        }),

      logout: () =>
        set({
          token: "",
          user: {} as User,
          modules: [],
          isAuthenticated: false,
          id_client: 0,
          uid_client: "",
          id_instance: 0,
          version: {
            api: "",
            oauth: "",
          },
          isLoading: false,
        }),

      updateUser: (updatedUser: Partial<User>) =>
        set((state) => ({
          user: {
            ...state.user,
            ...updatedUser,
          },
        })),

      updateModules: (modules: any[]) =>
        set({
          modules,
        }),

      clearAuthData: () =>
        set({
          token: "",
          user: {} as User,
          modules: [],
          isAuthenticated: false,
          isLoading: false,
        }),

      checkAuth: () => {
        const state = get();
        return !!(state.token && state.isAuthenticated);
      },
    }),
    {
      name: "auth-storage",
      version: CURRENT_VERSION,
      migrate: (persistedState: any, version: number) => {
        try {
          console.log(
            `Migrating auth store from version ${version} to ${CURRENT_VERSION}`,
          );

          let state = persistedState;

          for (let i = version; i < CURRENT_VERSION; i++) {
            const migration = migrations[i as keyof typeof migrations];
            if (migration) {
              state = migration(state);
            }
          }

          return state;
        } catch (error) {
          console.error("Migration failed, clearing storage:", error);
          return {
            token: "",
            user: {} as User,
            modules: [],
            isAuthenticated: false,
            isLoading: false,
            id_client: 0,
            uid_client: "",
            id_instance: 0,
            version: {
              api: "",
              oauth: "",
            },
          };
        }
      },
      storage: createJSONStorage(() => ({
        getItem: async (name: string): Promise<string | null> => {
          try {
            return await SecureStore.getItemAsync(name);
          } catch (error) {
            console.error("Error reading from secure store:", error);
            return null;
          }
        },
        setItem: async (name: string, value: string): Promise<void> => {
          try {
            await SecureStore.setItemAsync(name, value);
          } catch (error) {
            console.error("Error writing to secure store:", error);
          }
        },
        removeItem: async (name: string): Promise<void> => {
          try {
            await SecureStore.deleteItemAsync(name);
          } catch (error) {
            console.error("Error removing from secure store:", error);
          }
        },
      })),
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        modules: state.modules,
        isAuthenticated: state.isAuthenticated,
        id_client: state.id_client,
        uid_client: state.uid_client,
        id_instance: state.id_instance,
        version: state.version,
        isLoading: state.isLoading,
      }),
    },
  ),
);
