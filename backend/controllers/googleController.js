import { oauth2Client } from "../config/googleOauth.js";
import { getGoogleUserInfo } from "../services/google.service.js";
import { findOrCreateUserByGoogleInfo } from "../services/user.service.js";
import { sql } from "../config/db.js"
import { findOrCreateCartByUserId } from "../services/cart.service.js";

// Handles the OAuth callback (should be named accordingly)
export const handleGoogleCallback = async (req, res) => {
  const code = req.query.code;
  if (!code) return res.status(400).send("No code provided");

  try {
    const { tokens } = await oauth2Client.getToken(code); // todos: store tokens in redis
    const userInfo = await getGoogleUserInfo(tokens); // 
    const user = await findOrCreateUserByGoogleInfo(userInfo);
    const cart = await findOrCreateCartByUserId(user)

    req.session.user = {
      id: user.id,
    };
    req.session.cart = {
      id: cart.id,
    };

    res.redirect("http://localhost:5173/");
  } catch (error) {
    console.error("OAuth callback error:", error);
    res.status(500).send("Authentication failed");
  }
};

// validate or authenticate if the session has the user
export const authMe = async (req, res) => {

  console.log("seession:", req.session.user)
    const [user] = await sql`
    SELECT id, name, email, picture FROM users WHERE id = ${req.session.user.id}
  `;
  res.json(user);
};

export const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Logout error:", err);
      return res.status(500).json({ message: "Logout failed" });
    }
    res.clearCookie("connect.sid", {
      path: "/", // adjust if your session cookie is scoped to a specific path
    });
    res.json({ message: "Logout successful" });
  });
};

export const login = async (req, res) => { 
  // for emails and password created solo
}