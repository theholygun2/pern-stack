import axios from "axios";
import { toaster } from "@/components/ui/toaster";
import { useProductStore } from "./useProductStore";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "";

export async function addProduct(e) {
    e.preventDefault();
    const {
      formData, resetForm, setLoading, setError, setProducts
    } = useProductStore.getState();
  
    setLoading(true);
  
    try {
      await axios.post(`${BASE_URL}/api/products`, formData);
      const res = await axios.get(`${BASE_URL}/api/products`);
      setProducts(res.data.data);
      resetForm();
  
      toaster.success({
        title: "Product Added",
        description: "The product was successfully created.",
      });
    } catch (err) {
      setError("Failed to add product");
      console.error(err);
      toaster.error({
        title: "Error",
        description: "Failed to add product.",
      });
    } finally {
      setLoading(false);
    }
}

export async function fetchProducts(params = {}) {
  const {
    setLoadingProducts,
    setProducts,
    setErrorProducts,
  } = useProductStore.getState();

  setLoadingProducts(true);

  try {
    const query = new URLSearchParams(params).toString();
    const res = await axios.get(`${BASE_URL}/api/products?${query}`);
    setProducts(res.data.data);
    setErrorProducts(null);
  } catch (err) {
    setErrorProducts("Failed to fetch products");
    console.error(err);
  } finally {
    setLoadingProducts(false);
  }
}
// Add similar wrappers for fetchProduct, updateProduct, addProduct, etc.
