import { create } from "zustand";
import * as cartService from "@/services/cartService";
// base url will be dynamic depending on the environment
const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "";

export const useCartStore = create((set, get) => ({
  productCart: [],
  cart: [],

  setUser: (user) => set({ user }),
  setCart: (cart) => set({ cart }),

  initCart: async () => {
    const cart = await fetchCart();
    if (cart) set({ cart });
    console.log(cart)
  },

  updateQuantity: async (product_id, quantity) => {
    if (quantity === 0) {
      await get().removeFromCart(product_id);
      return;
    }

    await cartService.updateQuantity(product_id, quantity);

    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === product_id ? { ...item, cart_quantity: quantity } : item
      ),
    }));
  },

  removeFromCart: async (product_id) => {
    await cartService.removeFromCart(product_id);
    set((state) => ({
      cart: state.cart.filter((item) => item._id !== product_id),
    }));
  },
}));
