// services/authService.js
import axios from "axios";
import { useProductStore } from "@/store/useProductStore";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "";

export async function logoutUser() {
  const { setUser } = useProductStore.getState();

  try {
    await axios.get(`${BASE_URL}/auth/logout`, { withCredentials: true });
    setUser(null);
    // You could also add toast here
  } catch (error) {
    console.error("Logout failed", error);
    throw error;
  }
}
