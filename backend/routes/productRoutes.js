import express from "express";
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductByCategory,
} from "../controllers/productController.js";
import { isAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/category/:slug", getProductByCategory) //THIS IS FOR REQUEST TO THE BACKEND /api/products/category
router.get("/", getProducts); // Supports filtering: ?category_slug=books&name=Clean&min_price=10
router.get("/:slug", getProduct);
router.post("/", isAdmin, createProduct);
router.put("/:id", isAdmin, updateProduct);
router.delete("/:id", isAdmin, deleteProduct);

export default router;
