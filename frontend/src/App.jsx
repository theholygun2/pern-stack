import { Routes, Route } from 'react-router-dom'
import HomePage from '@/pages/HomePage'
import ProductPage from '@/pages/ProductPage'
import ProductsPage from '@/pages/ProductsPage'
import CategoryPage from '@/pages/CategoryPage'
import CartPage from '@/pages/CartPage'
import CheckoutPage from '@/pages/CheckoutPage'
import MainLayout from '@/layouts/MainLayout'
import PlainLayout from '@/layouts/PlainLayout'
import { Toaster } from './components/ui/toaster'
import { useEffect } from 'react'
import { fetchUser } from './services/userService'
import { fetchCart } from './services/cartService'
import { useUserStore } from './store/useUserStore'

function App() {

  useEffect(() => {
    const init = async () => {
      try {
        const user = await fetchUser(); 
        if (user) {
          setUser(user);
          const cart = await fetchCart();
          if (cart) setCart(cart);
        }
      } catch (err) {
        console.error("App init failed", err);
      }
    };
    init();
  }, []);
  

  return (
    <>
      <Toaster />
      <Routes>
        {/* Routes that use MainLayout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} /> 
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:slug" element={<ProductPage />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
        </Route>

        {/* Routes that use PlainLayout (no navbar/category) */}
        <Route element={<PlainLayout />}>
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Route>
      </Routes>
    </>
  )
}


// File Name	Component Purpose
// HomePage.jsx	Landing experience (hero + featured)
// ProductsPage.jsx	List all products
// ProductPage.jsx	Show single product details
// CategoryPage.jsx	Show products filtered by category
// CartPage.jsx	User’s selected items
// CheckoutPage.jsx	Final purchase step (optional)
// NotFoundPage.jsx	404 route fallback

export default App
