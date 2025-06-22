import { useUserStore } from '@/store/useUserStore'
import { Navigate, useLocation } from 'react-router-dom'

export default function AdminRoute({ children }) {
  const { user } = useUserStore()

  if (!user || user.role !== "admin") {
    return <Navigate to="/unauthorized" replace />;
  }  

  return children
}
