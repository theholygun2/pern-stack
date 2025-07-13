import express from "express";
import { isAdmin, protectRoute } from "../middleware/auth.middleware.js";
import { getAllOrders, getOrderByID } from "../controllers/orderController.js";
import { createProduct, updateProduct, deleteProduct, restoreProduct } from "../controllers/productController.js";

const router = express.Router();

router.get("/orders", protectRoute, isAdmin, getAllOrders);
router.get("/orders/:id", protectRoute, isAdmin, getOrderByID);

router.post("/products", protectRoute, isAdmin, createProduct);
router.put("/products/:id", protectRoute, isAdmin, updateProduct);
router.put("/products/:id/restore", protectRoute, isAdmin, restoreProduct )
router.delete("/products/:id", protectRoute, isAdmin, deleteProduct);

export default router;
