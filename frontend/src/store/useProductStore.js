import { create } from "zustand";
import axios from "axios";
import { toaster } from "@/components/ui/toaster";
import { useLocation } from "react-router-dom";
import { createListCollection } from "@chakra-ui/react";

// base url will be dynamic depending on the environment
const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "";

export const useProductStore = create((set, get) => ({
  // products state
  products: [],
  categories: [],
  categoryList: null,
  loading: false,
  error: null,
  currentProduct: null,
  loadingProducts: false,
  loadingCategories: false,
  errorProducts: null,
  errorCategories: null,

  // form state
  formData: {
    id: "",
    name: "",
    price: "",
    image: "",
    category_id: "",
    slug: ""
  },

  setFormData: (formData) => set({ formData }),
  resetForm: () => set({ formData: { name: "", price: "", image: "", category_id: "", slug: "" } }),

  addProduct: async (e) => {
    e.preventDefault();
    set({ loading: true });
    try {
      const { formData } = get();
      console.log(`form`, formData)
      await axios.post(`${BASE_URL}/api/products`, formData);
      await get().fetchProducts();
      get().resetForm();
    } catch (error) {
      console.log("Error in addProduct function", error);
      toaster.error({
        title: "Error",
        description: "Error while uploading product"
      })
    } finally {
      set({ loading: false });
    }
  },

fetchProducts: async ({ category_slug, name, min_price, max_price } = {}) => {
  set({ loadingProducts: true });
  try {
    const params = new URLSearchParams();
    if (category_slug) params.append("category_slug", category_slug);
    if (name) params.append("name", name);
    if (min_price) params.append("min_price", min_price);
    if (max_price) params.append("max_price", max_price);

    const response = await axios.get(`${BASE_URL}/api/products?${params.toString()}`);
    set({ products: response.data.data, errorProducts: null });
  } catch (err) {
    console.error("fetchProducts error", err);
    set({ errorProducts: "Failed to fetch products", products: [] });
  } finally {
    set({ loadingProducts: false });
  }
},

fetchProductByCategory: async (slug) => {
  set({ loadingProducts: true })
  try {
    const response = await axios.get(`${BASE_URL}/api/products/category/${slug}`)
    set({ products: response.data.data, errorProducts: null })
  } catch (err) {
    set({ errorProducts: "Failed to fetch products for category" })
  } finally {
    set({ loadingProducts: false })
  }
},


  deleteProduct: async (id) => {
    console.log("deleteProduct function called", id);
    set({ loading: true });
    try {
      await axios.delete(`${BASE_URL}/api/products/${id}`);
      set((prev) => ({ products: prev.products.filter((product) => product.id !== id) }));
    } catch (error) {
      console.log("Error in deleteProduct function", error);
    } finally {
      set({ loading: false });
    }
  },

  fetchProduct: async (slug) => {
    set({ loading: true });
    try {
      const response = await axios.get(`${BASE_URL}/api/products/${slug}`);
      console.log("Fetched product response:", response.data);
  
      const product = response.data.data; // <- correct key
  
      set({
        currentProduct: product,
        formData: { ...product},
        error: null,
      });
    } catch (error) {
      console.log("Error in fetchProduct function", error);
      set({ error: "Something went wrong", currentProduct: null });
    } finally {
      set({ loading: false });
    }
  },

  updateProduct: async () => {
    set({ loading: true });
    try {
      const { formData } = get();
      const response = await axios.put(`${BASE_URL}/api/products/${formData.id}`, formData);
      set({ currentProduct: response.data.data }); //data.data
      return true
    } catch (error) {
      console.log("Error in updateProduct function", error);
      return false
    } finally {
      set({ loading: false });
    }
  },

  fetchCategories: async () => {
    set({ loadingCategories: true });
    try {
      const response = await axios.get(`${BASE_URL}/api/categories`);
      const categories = response.data.data;
  
      const categoryList = createListCollection({
        items: categories.map((cat) => ({
          label: cat.name,
          value: cat.id.toString(),
        }))
      });
  
      set({ categories, categoryList, errorCategories: null });
    } catch (err) {
      console.error("fetchCategories error", err);
      set({ errorCategories: "Failed to fetch categories", categories: [] });
    } finally {
      set({ loadingCategories: false });
    }
  },

  
}));