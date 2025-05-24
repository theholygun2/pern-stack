import { sql } from "../config/db.js";

export async function findOrCreateCartByUserId(user) {
  const [cart] = await sql`
    SELECT * FROM cart WHERE user_id = ${user.id};
  `;

  if (!cart) {
    const [newCart] = await sql`
      INSERT INTO cart (user_id) VALUES (${user.id})
      RETURNING *;
    `;
    return newCart;
  }

  return cart;
}

export const getCartTotal = async (cart_id) => {
  const [result] = await sql`
    SELECT 
      SUM(p.price * ci.quantity) AS total_price
    FROM cart_items ci
    JOIN products p ON ci.product_id = p.id
    WHERE ci.cart_id = ${cart_id};
  `;
  return result.total_price ?? 0;
};
