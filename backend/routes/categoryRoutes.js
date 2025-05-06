import express from "express"
import { createCategory, getCategories, getCategory, updateCategory, deleteCategory,getCategoryBySlug } from "../controllers/categoryControllers.js"
const router = express.Router()

router.get("/slug/:slug", getCategoryBySlug);
router.get("/", getCategories)
router.get("/:id", getCategory)
router.post("/", createCategory)
router.put("/:id", updateCategory)
router.delete("/:id", deleteCategory)


export default router