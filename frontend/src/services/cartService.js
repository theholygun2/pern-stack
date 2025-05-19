// cartService.js	Adding/removing items from the cart, retrieving cart

import axios from "axios";
import { useCartStore } from "@/store/useCartStore";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "";

export async function fetchCart() {
  const { setCart } = useCartStore.getState();
  try {
    const cartRes = await axios.get(`${BASE_URL}/api/cart`, { withCredentials: true });
    if (cartRes.data?.id) setCart(cartRes.data);
  } catch (err) {
    console.error("Failed to fetch cart data", err);
  }
}
