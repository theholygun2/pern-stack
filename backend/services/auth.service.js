import { sql } from '../config/db.js'; // or however you're querying
import bcrypt from 'bcrypt';

export const authenticateUser = async (username, password) => {
  const [user] = await sql`SELECT * FROM users WHERE email = ${username}`;
  if (!user) return null;

  const match = await bcrypt.compare(password, user.password_hash);
  return match ? { ...user, role: 'user' } : null;
};

export const authenticateAdmin = async (username, password) => {
  const [admin] = await sql`SELECT * FROM admin_users WHERE email = ${username}`;
  if (!admin) return null;

  const match = await bcrypt.compare(password, admin.password_hash);
  return match ? { ...admin } : null
};
