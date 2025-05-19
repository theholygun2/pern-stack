import express from "express"
import { protectRoute } from "../middleware/auth.middleware.js";
import { getCartProducts, addToCart, removeAllFromCart, updateQuantity } from "../controllers/cartController.js";

const router = express.Router()


router.get("/", protectRoute, getCartProducts); // cart_item -> cart list of cart_item row
router.post("/", protectRoute, addToCart); // add product to cart_item where cart_id = cart.id
router.delete("/", protectRoute, removeAllFromCart);// delete row from cart_item where cart_id = cart.id?
router.put("/:id", protectRoute, updateQuantity); // update the cart after purchase, meaning; idk what this does

export default router