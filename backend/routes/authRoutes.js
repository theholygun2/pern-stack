import express from "express"
import { handleGoogleCallback, authMe, logout } from "../controllers/googleController.js";
import { oauth2Client, scopes } from "../config/googleOauth.js";

const router = express.Router();

router.get('/google', (req, res) => {
  const state = req.query.state; // Raw JSON string (encoded)
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    prompt: 'consent',
    state, // ✅ Pass the dynamic state here
  });

  res.redirect(authUrl);
});
router.get("/google/callback", handleGoogleCallback)
router.get("/me", authMe)
router.post("/logout", logout)
export default router;