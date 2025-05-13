import { create } from "zustand";

// base url will be dynamic depending on the environment
const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "";

export const useProductStore = create((set, get) => ({
  // products state
  products: [],
  currentProduct: null,
  loadingProducts: false,

  setProducts: (products) => set({ products }),
  setCurrentProduct: (currentProduct) => set({currentProduct}),
  setLoadingProducts: (loadingProducts) => set({ loadingProducts }),
  setErrorProducts: (errorProducts) => set({errorProducts}),

  // user state
  user: null,
  setUser: (user) => set({user}),
  clearUser: (user) => set({ user: null}),

  loading: false,
  error: null,

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
  setFormData: (formData) => set({ formData }),
  resetForm: () => set({ formData: { name: "", price: "", image: "", category_id: "", slug: "", quantity: 1 } }),

  categories: [],
  categoryList: null,
  loadingCategories: false,
  errorProducts: null,
  errorCategories: null,

  setCategories: (categories) => set({categories}),
  setCategoryList: (categoryList) => set({categoryList}),
  setLoadingCategories: (loadingCategories) => set({loadingCategories}),
  setErrorCategories: (errorCategories) => set({errorCategories}),


}));