export function parseIntentState(raw) {
  try {
    const decoded = decodeURIComponent(raw);
    const parsed = JSON.parse(decoded);

    // Log to debug
    console.log("Decoded state:", parsed);

    // If it’s a redirect-only state
    if (typeof parsed?.redirect === "string") {
      return parsed;
    }

    // (Optional) if addToCart support is needed
    if (
      parsed?.action === "addToCart" &&
      typeof parsed.product_id === "number" &&
      typeof parsed.quantity === "number" &&
      parsed.quantity > 0 &&
      parsed.quantity <= 10
    ) {
      return parsed;
    }

  } catch (err) {
    console.warn("Invalid state param:", raw, err.message);
  }

  return null;
}
