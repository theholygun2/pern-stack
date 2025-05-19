import Navbar from '@/components/ui/Navbar'
import CategoryBar from '@/components/ui/CategoryBar'
import { Outlet } from 'react-router-dom'

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <CategoryBar />
      <Outlet />
    </>
  )
}
