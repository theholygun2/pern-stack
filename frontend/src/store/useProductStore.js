import { create } from "zustand";
import axios from "axios";
import { createListCollection, MarkPropsProvider } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import { useLocation } from "react-router-dom";

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
      toaster.success({
        title: "Upload successfull",
        description: "Product successfully uploaded to the server",
      })
      //document.getElementById("add_product_modal").close();
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
    set({ loading: true });
    try {
      const params = new URLSearchParams();
      if (category_slug) params.append("category_slug", category_slug);
      if (name) params.append("name", name);
      if (min_price) params.append("min_price", min_price);
      if (max_price) params.append("max_price", max_price)
      
      const response = await axios.get(`${BASE_URL}/api/products?${params.toString()}`);
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
  
  fetchProductsByCategoryId: async (id) => {
    set( {loading: true});
    try {
      const response = await axios.get(`${BASE_URL}/api/products/by-category/?categoryID=${id}`)
      console.log("Fetched product response: ", response.data)
    } catch (error) {
      console.log("Error in fetchProductsByCategoryId function ", error)
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