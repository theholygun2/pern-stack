// You can auto-create a cart on user signup or when first adding an item.

// If supporting guest carts, add a session_id field (instead of user_id).

// If using MongoDB, you could embed the items into the Cart document as an array. That’s okay for <100 items per cart.

import { sql } from "../config/db.js"

export const getCurrentUserCart = async (req, res) => {
    // const user = req.session.user
    // try {
    //     const cart = await sql `
    //     SELECT * FROM cart WHERE user_id = ${user.id};
    //     `
    // } catch (error) {
    //     res.error("Error in getCurrentUserCart", error)
    // }

	res.render("U get the C")
}

export const getCartProducts = async (req, res) => {
	try {
		const user = req.session.user;
		const products = await sql`
			SELECT p.*, ci.quantity
			FROM cart_items ci
			JOIN products p ON ci.product_id = p.id
			JOIN cart c ON ci.cart_id = c.id
			WHERE c.user_id = ${user.id};
		`;

		res.json(products);
	} catch (error) {
		console.error("Error in getCartProducts controller:", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const addToCart = async (req, res) => {
	try {
		const user = req.session.user;
		const { productId } = req.body;

		const [cart] = await sql`SELECT id FROM cart WHERE user_id = ${user.id};`;

		if (!cart) {
			return res.status(404).json({ message: "Cart not found" });
		}

		// Check if product already in cart
		const [existingItem] = await sql`
			SELECT * FROM cart_items 
			WHERE cart_id = ${cart.id} AND product_id = ${productId};
		`;

		if (existingItem) {
			await sql`
				UPDATE cart_items 
				SET quantity = quantity + 1 
				WHERE cart_id = ${cart.id} AND product_id = ${productId};
			`;
		} else {
			await sql`
				INSERT INTO cart_items (cart_id, product_id, quantity) 
				VALUES (${cart.id}, ${productId}, 1);
			`;
		}

		res.json({ message: "Product added to cart" });
	} catch (error) {
		console.error("Error in addToCart controller:", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const removeAllFromCart = async (req, res) => {
	try {
		const user = req.session.user;

		const [cart] = await sql`SELECT id FROM cart WHERE user_id = ${user.id};`;

		if (!cart) {
			return res.status(404).json({ message: "Cart not found" });
		}

		await sql`DELETE FROM cart_items WHERE cart_id = ${cart.id};`;

		res.json({ message: "All items removed from cart" });
	} catch (error) {
		console.error("Error in removeAllFromCart controller:", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};

export const updateQuantity = async (req, res) => {
	try {
		const user = req.session.user;
		const { id } = req.params; // product_id
		const { quantity } = req.body;

		if (quantity < 1) {
			return res.status(400).json({ message: "Quantity must be at least 1" });
		}

		const [cart] = await sql`SELECT id FROM cart WHERE user_id = ${user.id};`;

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
