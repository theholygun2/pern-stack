import axios from "axios";
import { useProductStore } from "./useProductStore";
import { createListCollection } from "@chakra-ui/react";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchProducts(params = {}) {
  const {
    setLoadingProducts,
    setPagination,
    setProducts,
    setErrorProducts,
  } = useProductStore.getState();

  setLoadingProducts(true);

  try {
    const query = new URLSearchParams(params).toString();
    const res = await axios.get(`${BASE_URL}/api/products?${query}`);
    setProducts(res.data.data);
    setPagination(res.data.pagination) 
    setErrorProducts(null);
  } catch (err) {
    setErrorProducts("Failed to fetch products");
    console.error(err);
  } finally {
    setLoadingProducts(false);
  }
};

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
};

export async function fetchProductByCategory(slug, params = {}) { //for category page
  const {
    setLoadingProducts, setErrorProducts, setProducts, setPagination
  } = useProductStore.getState();

  setLoadingProducts(true);

  const query = new URLSearchParams(params).toString();
  const url = `${BASE_URL}/api/products/category/${slug}?${query}`;

  try {
    const response = await axios.get(url);
    setProducts(response.data.data);
    setPagination(response.data.pagination) // You might also want to store pagination info if needed
  } catch (err) {
    setErrorProducts("Failed to fetch products");
    console.error(err);
  } finally {
    setLoadingProducts(false);
  }
};

export async function addProduct(formData) {
  const { resetForm, setLoadingProducts, setErrorProducts, setProducts } = useProductStore.getState();

  setLoadingProducts(true);

  try {
    const response = await axios.post(`${BASE_URL}/api/admin/products`, formData, { withCredentials: true });
    const createdProduct = response.data.data;

    const res = await axios.get(`${BASE_URL}/api/products`);
    setProducts(res.data.data);
    resetForm();

    return createdProduct; // ✅ Return it!
  } catch (err) {
    setErrorProducts("Failed to add product");
    throw err;
  } finally {
    setLoadingProducts(false);
  }
};

export async function updateProduct(formData) {
  const { setLoadingProducts, setCurrentProduct
  } = useProductStore.getState()
  
  setLoadingProducts(true)

  try {
    const response = await axios.put(`${BASE_URL}/api/admin/products/${formData.id}`, formData, {withCredentials: true});
    setCurrentProduct(response.data.data)
    return true
  } catch (error) {
    console.error("Error in updating Product", error)
    return false
  } finally {
    setLoadingProducts(false)
  }
};

export async function deleteProduct(id) {
  const {
    products,
    setLoadingProducts,
    setProducts,
    setErrorProducts,
  } = useProductStore.getState();

  setLoadingProducts(true);

  try {
    const res = await axios.delete(`${BASE_URL}/api/admin/products/${id}`, {withCredentials: true});
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
    return { success: true, data: res.data };
  } catch (error) {
    console.error("Error in delete Product function", error);
    setErrorProducts("Error in deleting product");
    return { success: false, error };
  } finally {
    setLoadingProducts(false);
  }
};

// ✅ No need to touch useProductStore state here
export async function restoreProduct(id) {
  try {
    const res = await axios.put(`${BASE_URL}/api/admin/products/${id}/restore`, {}, {
      withCredentials: true,
    });
    return { success: true, data: res.data };
  } catch (error) {
    console.error("Error in restoreProduct function", error);
    return { success: false, error };
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

};
// Add similar wrappers for fetchProduct, updateProduct, addProduct, etc.
