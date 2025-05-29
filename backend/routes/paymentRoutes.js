import express from "express"
import { protectRoute } from "../middleware/auth.middleware.js";
import { createPayment, handleWebhook } from "../controllers/paymentController.js";

const router = express.Router()

router.post("/notify", protectRoute, handleWebhook)
router.post("/", createPayment)

export default router