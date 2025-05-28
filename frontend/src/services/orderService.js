import axios from "axios";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "";

// Pass cart or order data as body
export async function createOrder(order) {
    try {
      const res = await axios.post(
        `${BASE_URL}/api/order/checkout`,
        order,
        { withCredentials: true }
      );
  
      // Handle response
      if (res.status === 401) {
        window.location.href = `${BASE_URL}/auth/google`;
        return;
      }
  
      return res.data; // Axios auto-parses JSON
    } catch (error) {
      console.error("Error processing purchase", error);
    }
  }
  