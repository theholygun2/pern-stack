import { sql } from "../config/db.js"
import { getCartTotal } from "../services/cart.service.js";
import { handleNotFound, handleServerError } from "../utils/response.js";

// orderController.js
import { pgPool } from "../config/pool.js";

// createOrder, addOrderItem, getOrder, getOrderItem, 

export const getOrder = async (req,res) => {
    
}

export const addOrder = async (req, res) => {
  const user = req.session.user;
  const cart = req.session.cart;
  const { shippingAddress, paymentMethod, status } = req.body;

  if (!shippingAddress || !paymentMethod || !status) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }

  const client = await pgPool.connect();

  try {
    await client.query('BEGIN');

    const totalPrice = await getCartTotal(cart.id); // Assuming this still works with pg client

    const { rows: [{ id: orderId }] } = await client.query(`
      INSERT INTO orders (user_id, status, total_price, shipping_address, payment_method)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id
    `, [user.id, status, totalPrice, shippingAddress, paymentMethod]);

    const { rows: products } = await client.query(`
      SELECT p.id, p.name, ci.quantity, SUM(p.price * ci.quantity) AS subtotal
      FROM products p
      JOIN cart_items ci ON p.id = ci.product_id
      WHERE ci.cart_id = $1
      GROUP BY p.id, p.name, ci.quantity
    `, [cart.id]);

    for (const product of products) {
      await client.query(`
        INSERT INTO order_items (order_id, product_id, name, quantity, subtotal)
        VALUES ($1, $2, $3, $4, $5)
      `, [orderId, product.id, product.name, product.quantity, product.subtotal]);
    }

    await client.query('COMMIT');
    res.status(201).json({ success: true });

  } catch (err) {
    await client.query('ROLLBACK');
    console.error(err);
    res.status(500).json({ success: false, message: "Internal server error" });
  } finally {
    client.release();
  }
};

