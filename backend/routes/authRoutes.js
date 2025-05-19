import express from "express"
import { handleGoogleCallback, authMe, logout, login } from "../controllers/googleController.js";
import { googleAuthUrl } from "../config/googleOauth.js";

const router = express.Router();

router.get("/google", (req,res) => {
    res.redirect(googleAuthUrl)
})
router.get("/google/callback", handleGoogleCallback)
router.get("/me", authMe)
router.post("/logout", logout)
router.post("/login", login)


// import express from "express";
// import { login, logout, signup, refreshToken, getProfile } from "../controllers/auth.controller.js";
// import { protectRoute } from "../middleware/auth.middleware.js";

// router.post("/signup", signup);
// router.post("/login", login);
// router.post("/logout", logout);
// router.post("/refresh-token", refreshToken);
// router.get("/profile", protectRoute, getProfile);
export default router;