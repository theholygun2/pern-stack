import { create } from "zustand";

// base url will be dynamic depending on the environment
const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "";

export const useProductStore = create((set, get) => ({
  // products state
  products: [],
  pagination: null,
  currentProduct: null,
  loadingProducts: false,
  uploadedFile: null,



  setProducts: (products) => set({ products }),
  setPagination: (pagination) => set({ pagination }),
  setCurrentProduct: (currentProduct) => set({currentProduct}),
  setLoadingProducts: (loadingProducts) => set({ loadingProducts }),
  setErrorProducts: (errorProducts) => set({errorProducts}),
  setUploadedFile: (file) => set({ uploadedFile: file }),
  
  

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
    stock: 1,
    slug: "",
    deleted: false
  },
  setFormData: (updater) =>
  set((state) => ({
    formData:
      typeof updater === "function"
        ? updater(state.formData)
        : updater,
  })),
  resetForm: () => set({ formData: { id: "", name: "", price: "", image: "", category_id: "", slug: "", stock: 1, deleted: false } }),

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