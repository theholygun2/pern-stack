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
