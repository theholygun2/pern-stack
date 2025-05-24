// You can auto-create a cart on user signup or when first adding an item.

// If supporting guest carts, add a session_id field (instead of user_id).

// If using MongoDB, you could embed the items into the Cart document as an array. That’s okay for <100 items per cart.

import { sql } from "../config/db.js"
import { getCartTotal } from "../services/cart.service.js";

export const getCartProducts = async (req, res) => {
	try {
		const cart = req.session.cart
		const products = await sql`
			SELECT p.*, ci.quantity as cart_quantity
			FROM cart_items ci
			JOIN products p 
			ON ci.product_id = p.id
			WHERE ci.cart_id = ${cart.id}
		`;
		console.log("get cart Products", products)
		res.json({ products });
	} catch (error) {
		console.error("Error in getCartProducts controller:", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const addToCart = async (req, res) => {
	try {
		const user = req.session.user;
		const cartId = req.session.cart.id;
		const { product_id } = req.body;

		// Get the product stock
		const [product] = await sql`
			SELECT quantity FROM products WHERE id = ${product_id};
		`;
		if (!product) {
			return res.status(404).json({ message: "Product not found" });
		}

		// Check existing cart item
		const [existingItem] = await sql`
			SELECT * FROM cart_items 
			WHERE cart_id = ${cartId} AND product_id = ${product_id};
		`;

		const currentQty = existingItem ? existingItem.quantity : 0;
		const newQty = currentQty + 1;

		if (newQty > product.quantity) {
			return res.status(400).json({ message: "Cannot add more than available stock." });
		}

		if (existingItem) {
			await sql`
				UPDATE cart_items 
				SET quantity = ${newQty}
				WHERE cart_id = ${cartId} AND product_id = ${product_id};
			`;
		} else {
			await sql`
				INSERT INTO cart_items (cart_id, product_id, quantity) 
				VALUES (${cartId}, ${product_id}, 1);
			`;
		}

		const updatedCartItems = await sql`
			SELECT p.*, ci.quantity AS cart_quantity
			FROM cart_items ci
			JOIN products p ON ci.product_id = p.id
			WHERE ci.cart_id = ${cartId};
		`;

		res.status(200).json({ cartItems: updatedCartItems });
	} catch (error) {
		console.error("Error in addToCart controller:", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

  

export const removeFromCart = async (req, res) => {
	 try {
		const cart = req.session.cart;
		const { product_id } = req.body;
		
		if (!product_id) {
			// Clear entire cart
			await sql`
				DELETE FROM cart_items WHERE cart_id = ${cart.id}
			`;
		} else {
			// Delete a specific product from cart
			await sql`
				DELETE FROM cart_items 
				WHERE cart_id = ${cart.id} AND product_id = ${product_id}
			`;
		}

		// Re-fetch updated cart to return
		const updatedCartItems = await sql`
			SELECT p.*, ci.quantity as cart_quantity
			FROM cart_items ci
			JOIN products p ON ci.product_id = p.id
			WHERE ci.cart_id = ${cart.id}
		`;

		res.json({cartItems: updatedCartItems });
	} catch (error) {
		console.error("Error in removeFromCart controller:", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
	 
	
};


export const updateQuantity = async (req, res) => {
	try {
		const cart = req.session.cart;
		const { id } = req.params; // product_id
		const { quantity } = req.body;

		if (quantity < 1) {
			return res.status(400).json({ message: "Quantity must be at least 1" });
		}

		await sql`
			UPDATE cart_items 
			SET quantity = ${quantity} 
			WHERE cart_id = ${cart.id} AND product_id = ${id};
		`;
		res.json({ message: "Quantity updated" });
	} catch (error) {
		console.error("Error in updateQuantity controller:", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};