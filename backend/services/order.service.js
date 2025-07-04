import { sql } from "../config/db.js"
import { deductProductStock } from "./inventory.service.js";

export const getOrdersByUser = async (userId) => {
  try {
    const rows = await sql`
      SELECT 
        o.id as order_id,
        o.user_id,
        o.status,
        o.total_price,
        o.shipping_address,
        o.payment_method,
        o.paid_at,
        o.created_at,
        o.order_code,
        p.id as product_id,
        p.name,
        p.slug,
        p.image,
        p.price,
        oi.quantity,
        oi.subtotal
      FROM order_items oi
      JOIN products p ON p.id = oi.product_id
      JOIN orders o ON o.id = oi.order_id
      WHERE o.user_id = ${userId}
      ORDER BY o.created_at DESC
    `;

    // Group into nested orderHistory format //learn this shit
    const orderMap = new Map();
    for (const row of rows) {
      if (!orderMap.has(row.order_id)) {
        orderMap.set(row.order_id, {
          order_id: row.order_id,
          user_id: row.user_id,
          status: row.status,
          total_price: row.total_price,
          shipping_address: row.shipping_address,
          payment_method: row.payment_method,
          paid_at: row.paid_at,
          created_at: row.created_at,
          order_code: row.order_code,
          items: [],
        });
      }
      orderMap.get(row.order_id).items.push({
        product_id: row.product_id,
        name: row.name,
        slug: row.slug,
        quantity: row.quantity,
        subtotal: row.subtotal,
        image: row.image,
        price: row.price
      });
    }

    return Array.from(orderMap.values());
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch orders");
  }
};

export const markOrderAsPaid = async (orderCode, client) => {
  // Step 1: Get the real internal order ID
  const { rows } = await client.query(
    `SELECT id FROM orders WHERE order_code = $1`, [orderCode]
  );
  const orderId = rows[0]?.id;
  if (!orderId) throw new Error("Order not found");

  // Step 2: Update order status
  await client.query(
    `UPDATE orders SET status = 'paid' WHERE id = $1`, [orderId]
  );

  // Step 3: Deduct stock
  await deductProductStock(orderId, client);
};

