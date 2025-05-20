// cartService.js	Adding/removing items from the cart, retrieving cart

import axios from "axios";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "";

// services/cartService.js
export async function fetchCart() {
  const res = await axios.get(`${BASE_URL}/api/cart`, { withCredentials: true });
  return res.data;
}

export async function updateQuantity(productId, quantity) {
  if (quantity === 0) {
    get().removeFromCart(productId);
    return;
  }

  await axios.put(`/cart/${productId}`, { quantity });
  set((prevState) => ({
    cart: prevState.cart.map((item) => (item._id === productId ? { ...item, quantity } : item)),
  }));
  get().calculateTotals();

}
