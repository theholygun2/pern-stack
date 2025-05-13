import { oauth2Client } from "../config/googleOauth.js";
import { getGoogleUserInfo } from "../services/google.service.js";
import { findOrCreateUserByGoogleInfo } from "../services/user.service.js";

export const callback = async (req, res) => {
  const code = req.query.code;
  if (!code) return res.status(400).send("No code provided");

  try {
    const { tokens } = await oauth2Client.getToken(code);
    const userInfo = await getGoogleUserInfo(tokens);

    const user = await findOrCreateUserByGoogleInfo(userInfo);

    // You can now create a session here
    req.session.user = {
      id: user.id,
      email: user.email,
      picture: user.picture
    };

    res.redirect("http://localhost:5173/")
  } catch (error) {
    console.error("OAuth callback error:", error);
    res.status(500).send("Authentication failed");
  }
};

export const getCurrentUser = async (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({message: "Not authenticated"})
  }

  res.json(req.session.user)
}