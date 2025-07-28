import { sql } from "../config/db.js"
import { pgPool } from "../config/pool.js";
import { getCartTotal } from "../services/cart.service.js";
import { getOrdersByUser } from "../services/order.service.js";
import { handleNotFound, handleServerError } from "../utils/response.js";
import { generateOrderCode } from "../utils/customAlphabet.js";

// orderController.js

// createOrder, addOrderItem, getOrder, getOrderItem, 

export const getOrder = async (req, res) => {
  try {
    const user = req.session.user;
    const orderHistory = await getOrdersByUser(user.id);
    console.log(orderHistory)

    return res.status(200).json({
      success: true,
      message: "Resource Retrieved Successfully",
      data: { orderHistory },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve order history",
    });
  }
};

export const getOrderByID = async (req, res) => {
  try {
    const { id } = req.params;
    const orderHistory = await getOrdersByUser(id); // this returns grouped

    if (!orderHistory.length) {
      return res.status(404).json({
        success: false,
        message: "No orders found for this user",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Order history retrieved successfully",
      data: { orderHistory },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve order history",
    });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const rows = await sql`
      SELECT 
        o.id as order_id,
        o.user_id,
        u.name as user_name,
        u.email as user_email,
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
      JOIN users u ON u.id = o.user_id
      ORDER BY o.created_at DESC
    `;

    // Group by order_id
    const orderMap = new Map();
    for (const row of rows) {
      if (!orderMap.has(row.order_id)) {
        orderMap.set(row.order_id, {
          order_id: row.order_id,
          user_id: row.user_id,
          user_name: row.user_name,
          user_email: row.user_email,
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
        price: row.price,
      });
    }

    return res.status(200).json({
      success: true,
      message: "All orders retrieved successfully",
      data: Array.from(orderMap.values()),
    });
  } catch (error) {
    console.error("getAllOrders error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve orders",
    });
  }
};



export const addOrder = async (req, res) => {
  const user = req.session.user;
  const cart = req.session.cart;
  const { shippingAddress, paymentMethod} = req.body;

  if (!shippingAddress || !paymentMethod ) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }

  const client = await pgPool.connect();

  try {
    await client.query('BEGIN');

    const totalPrice = await getCartTotal(cart.id); // Assuming this still works with pg client

    const orderCode = generateOrderCode();

    const { rows: [{ id: orderId }] } = await client.query(`
      INSERT INTO orders (user_id, total_price, shipping_address, payment_method, order_code)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id
    `, [user.id, totalPrice, shippingAddress, paymentMethod, orderCode]);


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

    await client.query(`
      DELETE FROM cart_items
      WHERE cart_id = $1
    `, [cart.id]);
    

    await client.query('COMMIT');
    res.status(201).json({ success: true, message: "Order added successfully" });

  } catch (err) {
    await client.query('ROLLBACK');
    console.error(err);
    res.status(500).json({ success: false, message: "Internal server error" });
  } finally {
    client.release();
  }
};

export const deleteOrder = async (req, res) => {
  const user = req.session.user
  const cart = req.session.cart
  try {
    
    res.status(204)
  } catch (error) {
    handleNotFound(res, error)
  }
};