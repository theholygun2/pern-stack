// src/components/ProtectedRoute.jsx
import { useUserStore } from '@/store/useUserStore'
import { Navigate, useLocation } from 'react-router-dom'

export default function ProtectedRoute({ children }) {
  const { user } = useUserStore()
  const location = useLocation()

  if (!user) {
    const redirect = encodeURIComponent(location.pathname)
    return <Navigate to={`/login?redirect=${redirect}`} replace />
  }

  return children
}
