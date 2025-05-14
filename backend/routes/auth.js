import express from "express"
import { callback, getCurrentUser, logout } from "../controllers/googleController.js";
import { googleAuthUrl } from "../config/googleOauth.js";

const router = express.Router();

router.get("/google", (req,res) => {
    res.redirect(googleAuthUrl)
})
router.get("/google/callback", callback)
router.get("/me", getCurrentUser)
router.get("/logout", logout)

export default router;