// src/components/ProtectedRoute.jsx
import { useUserStore } from '@/store/useUserStore'
import { Navigate, useLocation } from 'react-router-dom'

export default function ProtectedRoute({ children }) {
  const { user } = useUserStore()
  const location = useLocation()

  if (!user) {
    // Redirect to login, preserving the attempted path
    return <Navigate to={`/login?redirect=${location.pathname}`} replace />
  }

  return children
}
