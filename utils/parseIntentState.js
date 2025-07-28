export function parseIntentState(raw) {
  try {
    const parsed = JSON.parse(decodeURIComponent(raw));
    if (typeof parsed.redirect === "string") {
      return parsed;
    }
  } catch (err) {
    console.warn("Invalid state param:", err.message);
  }

  return null;
}
