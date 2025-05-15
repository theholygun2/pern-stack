import { create } from "zustand";

// base url will be dynamic depending on the environment
const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "";

export const useCartStore = create((set, get) => ({
  productCart: null,
  cartItems: [], // { productId, name, price, quantity, stock, image }
	coupon: null,
	total: 0,
	subtotal: 0,
	isCouponApplied: false,

  setCartItems: (items) => set({ cartItems: items }),

  addToCart: (item) => {
    const cart = get().cartItems;
    const existing = cart.find((i) => i.product_id === item.id);
    if (existing) {
      // Update quantity
      const updated = cart.map((i) =>
        i.product_id === item.id
          ? { ...i, quantity: i.quantity + item.quantity }
          : i
      );
      console.log("added", item.id)
      set({ cartItems: updated });
    } else {
      set({ cartItems: [...cart, item] });
    }
  },

  updateQuantity: (id, quantity) => {
    const cart = get().cartItems;
    const updated = cart.map((i) =>
      i.product_id === id ? { ...i, quantity } : i
    );
    set({ cartItems: updated });
  },

  removeFromCart: (id) => {
    const cart = get().cartItems.filter((i) => i.product_id !== id);
    set({ cartItems: cart });
  },

  clearCart: () => set({ cartItems: [] }),
}));