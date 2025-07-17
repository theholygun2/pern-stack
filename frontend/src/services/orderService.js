import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

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

export async function fetchOrder() {
  try {
    const res = await axios.get(`${BASE_URL}/api/order`, {withCredentials: true})
    
    if (res.status === 401) {
      return 
    }

    console.log(res.data)
    return res.data

  } catch (error) {
    console.error("Error fetching history", error)
  }
}