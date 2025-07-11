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
import ProtectedRoute from '@/components/ProtectedRoute'
import { Center, Spinner } from '@chakra-ui/react'
import LoginPage from './pages/LoginPage'
import AdminRoute from './components/AdminRoute'
import AdminDashboard from './pages/AdminDashboard'
import ProductEditPage from './pages/ProductEditPage'
import AdminOrderHistory from './pages/AdminOrderHistory'



function App() {

  const navigate = useNavigate();

  // ✅ Pull setUser from user store and setCart from cart store
  const setUser = useUserStore((state) => state.setUser);
  const setCart = useCartStore((state) => state.setCart);
  const setCheckingAuth = useUserStore((state) => state.setCheckingAuth)
  const checkingAuth = useUserStore((state) => state.checkingAuth)

  useEffect(() => {
    const init = async () => {
      setCheckingAuth(true)
    try {
      const user = await fetchUser();
      console.log("U Fetch", user)
      if (user) {
        setUser(user);
        const cart = await fetchCart();
        if (cart?.length) setCart(cart)
      }
    } catch (error) {
      console.error("Failed to init user:", error);
    } finally {
      setCheckingAuth(false)
    }
  };
  init();
  }, [setUser, setCart, setCheckingAuth]); 

  if (checkingAuth) return <Center minH="60vh"><Spinner/></Center>;

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
          <Route path="/cart" element={<ProtectedRoute><CartPage /></ProtectedRoute> } />
          <Route path="/user/history" element={<ProtectedRoute><HistoryPage/></ProtectedRoute>} />
        </Route>
 
        {/* Routes that use PlainLayout (no navbar/category) */}
        <Route element={<PlainLayout />}>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path="/checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
          <Route path="/user/setting" element={<ProtectedRoute><UserPage/></ProtectedRoute> } />
          <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard/></AdminRoute>}/>
          <Route path="/admin/product/:slug" element={<AdminRoute><ProductEditPage/></AdminRoute>}/>
          <Route path="/admin/history" element={<AdminRoute><AdminOrderHistory/></AdminRoute>}/>
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
