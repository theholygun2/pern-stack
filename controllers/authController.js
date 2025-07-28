import { oauth2Client } from "../config/googleOauth.js";
import { getGoogleUserInfo } from "../services/google.service.js";
import { findOrCreateUserByGoogleInfo } from "../services/user.service.js";
import { sql } from "../config/db.js"
import { findOrCreateCartByUserId } from "../services/cart.service.js";
import { parseIntentState } from "../utils/parseIntentState.js";
import bcrypt from 'bcrypt'
import dotenv from "dotenv";

dotenv.config({
  path: process.env.NODE_ENV === "production" ? ".env.production" : ".env",
});

export const handleGoogleCallback = async (req, res) => {
  const code = req.query.code;
  if (!code) return res.status(400).send("No code provided");

  const state = parseIntentState(req.query.state); // contains: { redirect: "/product/laptop-gada-merk" }

  try {
    const { tokens } = await oauth2Client.getToken(code);
    const userInfo = await getGoogleUserInfo(tokens);
    const user = await findOrCreateUserByGoogleInfo(userInfo);
    const cart = await findOrCreateCartByUserId(user);

    req.session.user = { id: user.id, role: user.role };
    req.session.cart = { id: cart.id };

    let redirectPath = "/";
    if (user.role === "admin") {
      redirectPath = "/admin/dashboard";
    } else if (state?.redirect) {
      redirectPath = state.redirect;
    }

    return res.redirect(`${process.env.CLIENT_URL}${redirectPath}`)
  } catch (error) {
    console.error("OAuth callback error:", error);
    res.status(500).send("Authentication failed");
  }
};

// validate or authenticate if the session has the user
export const authMe = async (req, res) => {
  if (!req.session || !req.session.user) {
    return res.status(200).json(null); // No error, just null user
  }

  console.log("session:", req.session.user);

  const [user] = await sql`
    SELECT id, name, email, picture, role, provider FROM users WHERE id = ${req.session.user.id}
  `;
  
  return res.json(user);
};

export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "Missing fields" });
  }

  try {
    const existingUser = await sql`
      SELECT * FROM users
      WHERE username = ${username} OR email = ${email}
    `;

    if (existingUser.length > 0) {
      return res.status(409).json({ message: "Username or email already exists" });
    }

    const password_hash = await bcrypt.hash(password, 10);

    const newUser = await sql`
      INSERT INTO users (username, email, password_hash, provider, role)
      VALUES (${username}, ${email}, ${password_hash}, 'local', 'user')
      RETURNING id, username, email, role
    `;

    res.status(201).json({
      success: true,
      user: newUser[0],
    });

  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const login = async (req, res) => {
    const { email, password } = req.body;

  try {
    const admin = await authenticateAdmin(email, password);

    // ✅ Handle failed login
    if (!admin) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    // ✅ Set session
    req.session.user = { id: admin.id, role: "admin" };

    // ✅ Respond with user data
    res.json({
      success: true,
      user: {
        id: admin.id,
        email: admin.email,
        role: "admin",
      },
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
}

export const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Logout error:", err);
      return res.status(500).json({ message: "Logout failed" });
    }

    res.clearCookie("connect.sid", { path: "/" });
    console.log("User logged out");
    res.status(200).json({ message: "Logged out" });
  });
};