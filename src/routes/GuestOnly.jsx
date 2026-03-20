import { Navigate, Outlet } from 'react-router-dom'
import { getToken } from '../services/authService'

export function GuestOnly() {
  if (getToken()) {
    return <Navigate to="/dashboard" replace />
  }
  return <Outlet />
}
