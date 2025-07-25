// cartService.js	Adding/removing items from the cart, retrieving cart

import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// services/cartService.js
export async function fetchCart() {
  const res = await axios.get(`${BASE_URL}/api/cart`, { withCredentials: true });
  return res.data.products || [];
}

export async function addToCart(product) {
  console.log(product)
  const res = await axios.post(`${BASE_URL}/api/cart`, { product_id: product.id}, {withCredentials: true})
  return res.data.cartItems
}

export async function updateQuantity(product_id, quantity) {
  const res = await axios.put(`${BASE_URL}/api/cart/${product_id}`, { quantity }, {withCredentials: true});
  return res.data.data
}

export async function removeFromCart(product_id) {
  const res = await axios.delete(`${BASE_URL}/api/cart`, { data: { product_id }, withCredentials: true}); 
  return res.data.cartItems
}
