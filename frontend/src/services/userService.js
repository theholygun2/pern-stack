// cartService.js	Adding/removing items from the cart, retrieving cart

import axios from "axios";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "";

export async function fetchUser() {
  try {
    const res = await axios.get(`${BASE_URL}/auth/me`, { withCredentials: true });
    return res.data || null; // null if not logged in
  } catch (err) {
    console.error("fetch user failed", err);
    return null;
  }
}

