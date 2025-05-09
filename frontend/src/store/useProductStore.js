import { create } from "zustand";
import axios from "axios";

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

  setProducts: (products) => set({ products }),
  setCurrentProduct: (currentProduct) => set({currentProduct}),
  setLoadingProducts: (loadingProducts) => set({ loadingProducts }),
  setErrorProducts: (errorProducts) => set({errorProducts}),

  setCategories: (categories) => set({categories}),
  setCategoryList: (categoryList) => set({categoryList}),
  setLoadingCategories: (loadingCategories) => set({loadingCategories}),
  setErrorCategories: (errorCategories) => set({errorCategories}),

  setFormData: (formData) => set({ formData }),
  resetForm: () => set({ formData: { name: "", price: "", image: "", category_id: "", slug: "" } }),

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
}));