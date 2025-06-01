import { Routes, Route, useNavigate } from 'react-router-dom'
import ProductPage from '@/pages/ProductPage'
import ProductsPage from '@/pages/ProductsPage'
import CategoryPage from '@/pages/CategoryPage'
import CartPage from '@/pages/CartPage'
import CheckoutPage from '@/pages/CheckoutPage'
import HistoryPage from '@/pages/HistoryPage'
import UserPage from '@/pages/UserPage'
import MainLayout from '@/layouts/MainLayout'
import PlainLayout from '@/layouts/PlainLayout'
import { Toaster } from './components/ui/toaster'
import { useEffect } from 'react'
import { fetchUser } from './services/userService'
import { fetchCart } from './services/cartService'
import { useCartStore } from './store/useCartStore'
import { useUserStore } from './store/useUserStore'


function App() {

  const navigate = useNavigate();

  // ✅ Pull setUser from user store and setCart from cart store
  const setUser = useUserStore((state) => state.setUser);
  const setCart = useCartStore((state) => state.setCart);

  useEffect(() => {
    const init = async () => {
      try {
        const user = await fetchUser(); // session-based fetch
        if (user) {
          console.log("YOU trigger a init in app.jsx",user)
          setUser(user);
          const cart = await fetchCart();
          if (cart?.length) setCart(cart); // Only set if there's something
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
          <Route path="/" element={<ProductsPage />} /> 
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:slug" element={<ProductPage />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Route>

        {/* Routes that use PlainLayout (no navbar/category) */}
        <Route element={<PlainLayout />}>
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/user/setting" element={<UserPage/>} />
          <Route path="/user/history" element={<HistoryPage/>} />
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
