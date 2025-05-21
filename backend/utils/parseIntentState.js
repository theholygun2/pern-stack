// utils/parseIntentState.js
export function parseIntentState(raw) {
    try {
      const parsed = JSON.parse(decodeURIComponent(raw));
      if (
        parsed.action === "addToCart" &&
        typeof parsed.product_id === "number" &&
        typeof parsed.quantity === "number" &&
        parsed.quantity > 0 &&
        parsed.quantity <= 10
      ) {
        return parsed;
      }
    } catch (err) {
      console.warn("Invalid state param:", err.message);
    }
    return null;
  }
  