import { create } from "zustand";
import * as cartService from "@/services/cartService";

export const useCartStore = create((set, get) => ({
  
  guestCart: [],
  cart: [],

  setCart: (cart) => set({ cart }),
  setGuestCart: (guestCart) => set({ guestCart }),
  clearCart: (cart) => set({cart: []}),

  initCart: async () => {
    const cart = await fetchCart();
    if (cart) set({ cart });
    console.log(cart)
  },

  updateQuantity: async (product_id, quantity) => {
  // 🟢 1. Optimistically update UI immediately
  set((state) => ({
    cart: state.cart.map((item) =>
      item.id === product_id
        ? { ...item, cart_quantity: quantity }
        : item
    ),
  }));

  try {
    // 🟡 2. Make the API call
    await cartService.updateQuantity(product_id, quantity);
  } catch (err) {
    console.error("Quantity update failed, rolling back");

    // 🔴 3. Roll back (or refetch whole cart)
    const cart = await cartService.fetchCart(); // <-- or however you refetch
    set({ cart });
  }
},

  removeFromCart: async (product_id) => {
    const updatedCart = await cartService.removeFromCart(product_id); // <- await and capture
    set({ cart: updatedCart }); // <- directly set to the returned data
  },
  
}));
