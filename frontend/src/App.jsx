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
      <CategoryBar />
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/product/:id" element={<ProductPage />}/>
        <Route path="/category/:id" element={<CategoryPage />}/>
        <Route path="/cart" element={<CartPage />}/>
      </Routes>
    </>
  )
}

export default App
