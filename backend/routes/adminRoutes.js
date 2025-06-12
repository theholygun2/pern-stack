import express from 'express';
import bcrypt from 'bcrypt';
import { pgPool } from '../config/pool.js'

const router = express.Router();

// Admin login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pgPool.query('SELECT * FROM admin_users WHERE email = $1', [email]);
    const admin = result.rows[0];

    if (!admin) return res.status(401).json({ error: 'Invalid credentials' });

    const match = await bcrypt.compare(password, admin.password_hash);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });

    req.session.adminId = admin.id;
    return res.redirect(`http://localhost:5173/admin/dashboard`);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Admin logout
router.post('/logout', (req, res) => {
  req.session.adminId = null;
  res.json({ message: 'Logged out' });
});

export default router;
