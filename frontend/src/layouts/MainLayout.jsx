import Navbar from '@/components/ui/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '@/components/ui/Footer'
import { Box } from '@chakra-ui/react'

export default function MainLayout() {
  return (
    <>
    <Box minH="100vh" display="flex" flexDirection="column">
    <Navbar />
      <Box flex="1">
      <Outlet />
      </Box>
      <Footer/>
    </Box>

    </>
  )
}
