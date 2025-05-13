import HomePage from "@/pages/HomePage"
import ProductPage from "@/pages/ProductPage"
import ProductsPage from "@/pages/ProductsPage"
import  Navbar  from '@/components/ui/Navbar'
import  CategoryBar  from '@/components/ui/CategoryBar'
import { Routes, Route } from "react-router-dom"
import CategoryPage from "./pages/CategoryPage"
import CartPage from "./pages/CartPage"
import { Toaster } from "./components/ui/toaster"
import { useEffect, useState } from "react";
import { useProductStore } from "./store/useProductStore"

function App() {

  const {setUser} = useProductStore()

  useEffect(() => {
    fetch("http://localhost:3000/auth/me", { credentials: "include" })
      .then(res => res.json())
      .then(data => {
        if (data?.id) setUser(data)
      })
      .catch(err => console.error("User not logged in", err))
  }, [])

  return (
    <>
    <Toaster />
      <Navbar />
      <CategoryBar/>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/products" element={<ProductsPage /> }/>
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
