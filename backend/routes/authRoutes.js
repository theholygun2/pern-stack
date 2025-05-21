import express from "express"
import { handleGoogleCallback, authMe, logout } from "../controllers/googleController.js";
import { googleAuthUrl } from "../config/googleOauth.js";

const router = express.Router();

router.get("/google", (req,res) => {
    res.redirect(googleAuthUrl)
})
router.get("/google/callback", handleGoogleCallback)
router.get("/me", authMe)
router.post("/logout", logout)
export default router;