import Navbar from '@/components/ui/Navbar'
import CategoryBar from '@/components/ui/CategoryBar'
import { Outlet } from 'react-router-dom'
import Footer from '@/components/ui/Footer'

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <CategoryBar />
      <Outlet />
      <Footer/>
    </>
  )
}
