// utils/handleOAuthIntent.js
import axios from "axios";

export async function handleOAuthIntent(stateParam, setCart, navigate) {
  try {
    const intent = JSON.parse(decodeURIComponent(stateParam));

    if (intent.action === "addToCart") {
      const { product_id, quantity } = intent;

      // 1. Send to backend to add to cart (optional depending on backend logic)
      await axios.post('/cart/add', {
        productId: product_id,
        quantity,
      }, { withCredentials: true });

      // 2. Fetch updated cart
      const res = await axios.get('/cart', { withCredentials: true });

      // 3. Update frontend cart store
      setCart(res.data);

      // 4. Clean URL and redirect
      window.history.replaceState(null, '', '/cart');
      navigate('/cart');
    }
  } catch (err) {
    console.error("Error handling OAuth intent:", err);
  }
}
