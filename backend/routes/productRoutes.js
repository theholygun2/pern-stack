import express from "express"
import { createProduct, getProducts, getProduct, updateProduct, deleteProduct, getProductsByCategory } from "../controllers/productControllers.js"
const router = express.Router()

router.get("/by-category", getProductsByCategory)
router.get("/", getProducts)
router.get("/:id", getProduct)
router.post("/", createProduct)
router.put("/:id", updateProduct)
router.delete("/:id", deleteProduct)

export default router