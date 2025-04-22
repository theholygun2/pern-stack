import express from "express"
import { createCategory, getCategories, getCategory, updateCategory, deleteCategory } from "../controllers/categoryControllers.js"
const router = express.Router()

router.get("/", getCategories)
router.get("/:id", getCategory)
router.post("/", createCategory)
router.put("/:id", updateCategory)
router.delete("/:id", deleteCategory)

export default router