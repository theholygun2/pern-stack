import { Container } from "@chakra-ui/react"
import HomePage from "@/pages/HomePage"
import ProductPage from "@/pages/ProductPage"
import  Navbar  from '@/components/ui/Navbar'
import  CategoryBar  from '@/components/ui/CategoryBar'
import { Routes, Route } from "react-router-dom"
import CategoryPage from "./pages/CategoryPage"
import CartPage from "./pages/CartPage"
import { Toaster } from "./components/ui/toaster"

function App() {
  return (
    <>
    <Toaster />
      <Navbar />
      <CategoryBar/>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/product/:slug" element={<ProductPage />}/>
        <Route path="/category/:slug" element={<CategoryPage />}/>
        <Route path="/cart" element={<CartPage />}/>
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
