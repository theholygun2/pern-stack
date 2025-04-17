import { Box, Button, Text } from "@chakra-ui/react"
import HomePage from "@/pages/HomePage"
import ProductPage from "@/pages/ProductPage"
import  Navbar  from '@/components/ui/Navbar'
import { Routes, Route } from "react-router-dom"

function App() {
  return (
    <>
    <Box>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/product/:id" element={<ProductPage />}/>
      </Routes>
    </Box>
    </>
  )
}

export default App
