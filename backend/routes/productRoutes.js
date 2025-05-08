import express from "express";
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductByCategory,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/category/:slug", getProductByCategory) //THIS IS FOR REQUEST TO THE BACKEND /api/products/category
router.get("/", getProducts); // Supports filtering: ?category_slug=books&name=Clean&min_price=10
router.get("/:slug", getProduct);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
