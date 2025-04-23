import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";
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

  // form state
  formData: {
    name: "",
    price: "",
    image: "",
    category_id: ""
  },

  setFormData: (formData) => set({ formData }),
  resetForm: () => set({ formData: { name: "", price: "", image: "", category_id: "" } }),

  addProduct: async (e) => {
    e.preventDefault();
    set({ loading: true });

    try {
      const { formData } = get();
      console.log(`form`, formData)
      await axios.post(`${BASE_URL}/api/products`, formData);
      await get().fetchProducts();
      get().resetForm();
      toast.success("Product added successfully");
      //document.getElementById("add_product_modal").close();
    } catch (error) {
      console.log("Error in addProduct function", error);
      toast.error("Something went wrong");
    } finally {
      set({ loading: false });
    }
  },

  fetchProducts: async () => {
    set({ loading: true });
    try {
      const response = await axios.get(`${BASE_URL}/api/products`);
      set({ products: response.data.data, error: null });
    } catch (err) {
      if (err.status == 429) set({ error: "Rate limit exceeded", products: [] });
      else set({ error: "Something went wrong", products: [] });
    } finally {
      set({ loading: false });
    }
  },

  deleteProduct: async (id) => {
    console.log("deleteProduct function called", id);
    set({ loading: true });
    try {
      await axios.delete(`${BASE_URL}/api/products/${id}`);
      set((prev) => ({ products: prev.products.filter((product) => product.id !== id) }));
      toast.success("Product deleted successfully");
    } catch (error) {
      console.log("Error in deleteProduct function", error);
      toast.error("Something went wrong");
    } finally {
      set({ loading: false });
    }
  },

  fetchProduct: async (id) => {
    set({ loading: true });
    try {
      const response = await axios.get(`${BASE_URL}/api/products/${id}`);
      console.log("Fetched product response:", response.data);
  
      const product = response.data.data; // <- correct key
  
      set({
        currentProduct: product,
        formData: product,
        error: null,
      });
    } catch (error) {
      console.log("Error in fetchProduct function", error);
      set({ error: "Something went wrong", currentProduct: null });
    } finally {
      set({ loading: false });
    }
  },
  updateProduct: async (id) => {
    set({ loading: true });
    try {
      const { formData } = get();
      const response = await axios.put(`${BASE_URL}/api/products/${id}`, formData);
      set({ currentProduct: response.data.data });
      toast.success("Product updated successfully");
    } catch (error) {
      toast.error("Something went wrong");
      console.log("Error in updateProduct function", error);
    } finally {
      set({ loading: false });
    }
  },

  fetchCategories: async () => {
    set({ loading: true });
    try {
      const response = await axios.get(`${BASE_URL}/api/categories`);
      const categories = response.data.data;
      const categoryList = createListCollection({
        items: categories.map((cat) => ({
          label: cat.name,
          value: cat.id.toString(),
        }))
      })
      set({ categories, categoryList, error: null });
    } catch (err) {
      if (err.status == 429) set({ error: "Rate limit exceeded", categories: [] });
      else set({ error: "Something went wrong", categories: [] });
    } finally {
      set({ loading: false });
    }
  },
}));