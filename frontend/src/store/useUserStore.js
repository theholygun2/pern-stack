// store/useUserStore.js
import { fetchUser } from "@/services/userService";
import { create } from "zustand";

export const useUserStore = create((set) => ({
  user: null,
  loading: false,
  checkingAuth: true,

  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
  setCheckingAuth: (checking) => set({ checkingAuth: checking }),

  initUser: async () => {
    const user = await fetchUser();
    if (!user) return;
    set({ user });
  }


}));

// TODO: Implement the axios interceptors for refreshing access token

// Axios interceptor for token refresh
let refreshPromise = null;