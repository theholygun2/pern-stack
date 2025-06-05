import axios from "axios";

const BASE_URL = import.meta.env.MODE === "development" 
  ? "http://localhost:3000" 
  : ""; // or your production domain

export async function fetchUser() {
  try {
    const response = await axios.get(`${BASE_URL}/auth/me`, {
      withCredentials: true,
    });

    return response.data ?? null; // use nullish coalescing
  } catch (error) {
    if (error.response) {
      // ✅ Known server-side error (e.g. 401)
      console.warn("User not authenticated:", error.response.status);
    } else {
      // ✅ Network or unknown error
      console.error("fetchUser failed:", error.message);
    }
    return null;
  }
}
