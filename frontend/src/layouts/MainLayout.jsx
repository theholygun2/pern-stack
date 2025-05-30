import Navbar from '@/components/ui/Navbar'
import CategoryBar from '@/components/ui/CategoryBar'
import { Outlet } from 'react-router-dom'
import Footer from '@/components/ui/Footer'
import { Box } from '@chakra-ui/react'

export default function MainLayout() {
  return (
    <>
    <Box minH="100vh" display="flex" flexDirection="column">
    <Navbar />
      <CategoryBar />
      <Box flex="1">
      <Outlet />
      </Box>
      <Footer/>
    </Box>

    </>
  )
}
