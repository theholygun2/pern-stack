import { sql } from "../config/db.js";

export async function findOrCreateUserByGoogleInfo(userInfo) {
  const existingUsers = await sql`
    SELECT * FROM users WHERE google_id = ${userInfo.id}
  `;

  if (existingUsers.length > 0) {
    const user = existingUsers[0];

    const [cart] = await sql`
      SELECT * FROM cart WHERE user_id = ${user.id};
    `;
    
    if (!cart) {
      await sql`
        INSERT INTO cart (user_id) VALUES (${user.id});
      `;
    }

    return user;
  }

  const newUser = await sql`
    INSERT INTO users (google_id, name, email, picture)
    VALUES (${userInfo.id}, ${userInfo.name}, ${userInfo.email}, ${userInfo.picture})
    RETURNING *
  `;

  await sql`
    INSERT INTO cart (user_id) VALUES (${newUser[0].id});
  `;

  return newUser[0];
}

