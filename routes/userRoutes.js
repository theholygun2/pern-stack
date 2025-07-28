import express from 'express'

import { getUserByID } from "../controllers/userController.js";



const router = express.Router();
router.get("/:id", getUserByID) 

export default router;
