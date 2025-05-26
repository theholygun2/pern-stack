import express from "express"
import { protectRoute } from "../middleware/auth.middleware.js";
import { addOrder, getOrder } from "../controllers/orderController.js";

const router = express.Router()

router.get("/", protectRoute, getOrder)
router.post("/checkout", protectRoute, addOrder);

export default router