import express from "express";
import {
  getProducts,
  getProduct,
  getProductByCategory,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/category/:slug", getProductByCategory) //THIS IS FOR REQUEST TO THE BACKEND /api/products/category
router.get("/", getProducts); // Supports filtering: ?category_slug=books&name=Clean&min_price=10
router.get("/:slug", getProduct);

export default router;
