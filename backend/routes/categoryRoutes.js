import express from "express";
import { getCategories, getCategoryBySlug } from "../controllers/categoryController.js";

const router = express.Router();

router.get("/", getCategories);
router.get("/:slug", getCategoryBySlug); // Optional, if you want a dedicated category page

export default router;