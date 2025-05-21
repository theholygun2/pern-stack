import { oauth2Client } from "../config/googleOauth.js";
import { getGoogleUserInfo } from "../services/google.service.js";
import { findOrCreateUserByGoogleInfo } from "../services/user.service.js";
import { sql } from "../config/db.js"
import { findOrCreateCartByUserId } from "../services/cart.service.js";
import { parseIntentState } from "../utils/parseIntentState.js";

// Handles the OAuth callback (should be named accordingly)
export const handleGoogleCallback = async (req, res) => {
  const code = req.query.code;

  if (!code) return res.status(400).send("No code provided");

  const state = parseIntentState(req.query.state)
  try {
    const { tokens } = await oauth2Client.getToken(code);
    const userInfo = await getGoogleUserInfo(tokens);
    const user = await findOrCreateUserByGoogleInfo(userInfo);
    const cart = await findOrCreateCartByUserId(user);

    req.session.user = { id: user.id };
    req.session.cart = { id: cart.id };

    const redirectUrl = state
      ? `http://localhost:5173/?state=${encodeURIComponent(JSON.stringify(state))}`
      : `http://localhost:5173/?auth=success`;

    res.redirect(redirectUrl);
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
    SELECT id, name, email, picture FROM users WHERE id = ${req.session.user.id}
  `;
  
  return res.json(user);
};


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


export const login = async (req, res) => { 
  // for emails and password created solo
}