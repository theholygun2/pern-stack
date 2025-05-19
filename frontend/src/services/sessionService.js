// cartService.js	Adding/removing items from the cart, retrieving cart

import axios from "axios";
import { useUserStore } from "@/store/useUserStore";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "";

export async function fetchSession() {
  const { setUser } = useUserStore.getState();
  try {
    const userRes = await axios.get(`${BASE_URL}/auth/me`, { withCredentials: true });
    if (userRes.data?.id) setUser(userRes.data);
  } catch (err) {
    console.error("Failed to fetch user and cart data", err);
  }
}
