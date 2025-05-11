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
    quantity: 1,
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
  resetForm: () => set({ formData: { name: "", price: "", image: "", category_id: "", slug: "", quantity: 1 } }),
}));