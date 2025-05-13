import express from "express"
import { callback, getCurrentUser } from "../controllers/googleController.js";
import { googleAuthUrl } from "../config/googleOauth.js";

const router = express.Router();

router.get("/google", (req,res) => {
    res.redirect(googleAuthUrl)
})
router.get("/google/callback", callback)

router.get("/me", getCurrentUser)

export default router;