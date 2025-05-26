import { sql } from "../config/db.js"

export const getOrdersByUser = async (userId) => {
    const orders = await sql `
    SELECT *
    FROM orders o
    JOIN order_items oi
    ON o.id = oi.order_id
    WHERE o.user_id = ${userId}`
  
    return orders;
  };
  