import axios from "axios";
import { toaster } from "@/components/ui/toaster";
import { useProductStore } from "./useProductStore";
import { createListCollection } from "@chakra-ui/react";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "";

export async function addProduct(e) {
    e.preventDefault();
    const {
      formData, resetForm, setLoadingProducts, setErrorProducts, setProducts
    } = useProductStore.getState();
  
    setLoadingProducts(true);
  
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
      setErrorProducts("Failed to add product");
      console.error(err);
      toaster.error({
        title: "Error",
        description: "Failed to add product.",
      });
    } finally {
      setLoadingProducts(false);
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
export async function fetchProduct(slug) {
  const {
    formData, setFormData, setErrorProducts, setLoadingProducts, setCurrentProduct,
  } = useProductStore.getState()

  setLoadingProducts(true)

  try {
    const response = await axios.get(`${BASE_URL}/api/products/${slug}`)
    setCurrentProduct(response.data.data)
    setFormData({ ...response.data.data}) //making a new fresh object dudes
    setErrorProducts(null)
  } catch (error) {
    setErrorProducts("Error in fetching a single product", error)
    console.error("error in fetching a single product", error)
  } finally {
    setLoadingProducts(false)
  }
}
export async function fetchProductByCategory(slug) {

  const {
    setLoadingProducts, setErrorProducts, setProducts
  } = useProductStore.getState();

  setLoadingProducts(true)

  try {
    const response = await axios.get(`${BASE_URL}/api/products/category/${slug}`)
    setProducts(response.data.data)
  } catch (err) {
    setErrorProducts("Failed to fetch products")
    console.error(err)
  } finally {
    setLoadingProducts(false)
  }
}
export async function updateProduct() {
  const {
    formData, setLoadingProducts, setCurrentProduct
  } = useProductStore.getState()
  
  setLoadingProducts(true)

  try {
    const response = await axios.put(`${BASE_URL}/api/products/${formData.id}`, formData);
    setCurrentProduct(response.data.data)
    return true
  } catch (error) {
    console.error("Error in updating Product", error)
    return false
  } finally {
    setLoadingProducts(false)
  }
}
export async function deleteProduct(id) {
  const {
    products,
    setLoadingProducts,
    setProducts,
    setErrorProducts,
  } = useProductStore.getState();

  setLoadingProducts(true)

  try {
    await axios.delete(`${BASE_URL}/api/products/${id}`)
    const updatedProducts = products.filter((product) => product.id !== id)
    setProducts(updatedProducts)
    console.log("product deleted", updatedProducts)
  } catch (error) {
    console.error("Error in delete Product function", error)
    setErrorProducts("Error in deleting product")
  } finally {
    setLoadingProducts(false)
  }
}
export async function fetchCategories() {
  const {
    setCategories, setCategoryList, setLoadingCategories, setErrorCategories, categories
  } = useProductStore.getState()

  if (categories.length > 0 ) return;

  setLoadingCategories(true)

  try {
    const response = await axios.get(`${BASE_URL}/api/categories`)
    const categories = response.data.data

    const categoryList = createListCollection({
      items: categories.map((cat) => ({
        label: cat.name,
        value: cat.id.toString(),
      }))
    })

    setCategories(categories)
    setCategoryList(categoryList)
    setErrorCategories(null)
  } catch (error) {
    console.error("fetch categories error", error)
    setErrorCategories("Failed to fetch categories")
  } finally{
    setLoadingCategories(false)
  }

}
// Add similar wrappers for fetchProduct, updateProduct, addProduct, etc.
