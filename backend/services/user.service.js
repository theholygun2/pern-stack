import { sql } from "../config/db.js";

export async function findOrCreateUserByGoogleInfo(userInfo) {
  const existingUsers = await sql`
    SELECT * FROM users WHERE google_id = ${userInfo.id}
  `;

  if (existingUsers.length > 0) {
    return existingUsers[0];
  }

  const newUser = await sql`
    INSERT INTO users (google_id, name, email, picture)
    VALUES (${userInfo.id}, ${userInfo.name}, ${userInfo.email}, ${userInfo.picture})
    RETURNING *
  `;

  return newUser[0];
}
