import express from "express"
import { protectRoute } from "../middleware/auth.middleware.js";
import { handleWebhook } from "../controllers/paymentController.js";

const router = express.Router()

router.post("/notify", handleWebhook)

export default router