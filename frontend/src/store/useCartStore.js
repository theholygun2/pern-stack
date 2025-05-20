import { create } from "zustand";
// base url will be dynamic depending on the environment
const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "";

export const useCartStore = create((set, get) => ({
    cart: [], // take a json of products from the cart_item table
    total: 0,
    subtotal: 0,

    setCart: (cart) => set({ cart }),
}));