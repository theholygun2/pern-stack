import { useCartStore } from "@/store/useCartStore";
import axios from "axios";
import { useEffect } from "react";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const useValidateCart = () => {
  const { cart, setCart } = useCartStore();

  const validateCart = async () => {
    const validated = await Promise.all(
  cart.map(async (item) => {
    try {
      const res = await axios.get(`${BASE_URL}/api/products/${item.slug}`);
      const fresh = res.data.data;

      // ⬇️ Add this block here:
      if (fresh.stock < item.cart_quantity) {
        return {
          ...item,
          price: fresh.price,
          stock: fresh.stock,
          cart_quantity: fresh.stock,  // 👈 auto-correct quantity
          deleted: fresh.deleted,
          stock_issue: true,           // 👈 new field for UI
        };
      }

      return {
        ...item,
        price: fresh.price,
        stock: fresh.stock,
        deleted: fresh.deleted,
        stock_issue: false,            // 👈 clean when valid
      };
    } catch {
      return { ...item, deleted: true };
    }
  })
);


    setCart(validated);
    return validated;
  };

  // 🔁 Auto run on first mount
  useEffect(() => {
    if (cart.length > 0) validateCart();
  }, []);

  return validateCart; // 👈 expose it
};

