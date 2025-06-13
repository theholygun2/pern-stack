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

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post('http://localhost:3000/auth/login', {
      email,
      password,
    }, { withCredentials: true });

    return {
      success: true,
      user: response.data, // ← whatever you send back from backend
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Unknown error",
    };
  }
};
