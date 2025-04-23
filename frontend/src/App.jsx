import { Box, Button, Text, Container } from "@chakra-ui/react"
import HomePage from "@/pages/HomePage"
import ProductPage from "@/pages/ProductPage"
import  Navbar  from '@/components/ui/Navbar'
import { Routes, Route } from "react-router-dom"
import CategoryPage from "./pages/CategoryPage"
import { Toaster } from "./components/ui/toaster"

function App() {
  return (
    <>
    <Toaster />
    <Container>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/product/:id" element={<ProductPage />}/>
        <Route path="/categories/:id" element={<CategoryPage />}/>
      </Routes>
    </Container>
    </>
  )
}

export default App
