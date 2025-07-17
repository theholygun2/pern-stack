export function generateOrderCode() {
  const now = new Date();
  const datePart = now.toISOString().slice(0, 10).replace(/-/g, ''); // e.g. 20250716
  const random = Math.floor(100000 + Math.random() * 900000); // 6-digit random number
  return `ORD-${datePart}-${random}`;
}
