import express from "express";
import { handleGoogleCallback, authMe, logout } from "../controllers/googleController.js";
import { oauth2Client, scopes } from "../config/googleOauth.js";
import { authenticateAdmin } from "../services/auth.service.js";

const router = express.Router();

router.get('/google', (req, res) => {
  const state = req.query.state;
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    prompt: 'consent',
    state,
  });

  res.redirect(authUrl);
});

router.get("/google/callback", handleGoogleCallback);
router.get("/me", authMe);
router.post("/logout", logout);

router.post("/login", async (req, res) => {
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
});


export default router;