import express from "express";
import { handleGoogleCallback, authMe, login, logout } from "../controllers/authController.js";
import { oauth2Client, scopes } from "../config/googleOauth.js";

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

router.post("/login", login);


export default router;