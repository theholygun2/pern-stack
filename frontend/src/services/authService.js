// services/authService.js
import axios from "axios";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "";

export async function logoutUser() {
  try {
    await axios.post(`${BASE_URL}/auth/logout`, null, {
      withCredentials: true,
    });
    // You could also add toast here
  } catch (error) {
    console.error("Logout failed", error);
    throw error;
  }
}