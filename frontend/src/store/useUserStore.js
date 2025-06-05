// store/useUserStore.js
import { fetchCart } from "@/services/cartService";
import { fetchUser } from "@/services/userService";
import { create } from "zustand";
import { useCartStore } from "./useCartStore";

export const useUserStore = create((set) => ({
  user: null,
  loading: false,
  checkingAuth: true,

  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
  setCheckingAuth: (checking) => set({ checkingAuth: checking }),
}));


// TODO: Implement the axios interceptors for refreshing access token

// Axios interceptor for token refresh
let refreshPromise = null;