import express from "express"
import { protectRoute } from "../middleware/auth.middleware.js";
import { addOrder } from "../controllers/orderController.js";

const router = express.Router()

router.post("/checkout", protectRoute, addOrder);

export default router