import { useCallback, useState } from 'react'
import {
  getStoredUser,
  getToken,
  logout as clearAuth,
} from '../services/authService'

export function useAuth() {
  const [user, setUser] = useState(() =>
    getToken() ? getStoredUser() : null
  )
  const logoutUser = useCallback(() => {
    clearAuth()
    setUser(null)
  }, [])

  return {
    user,
    logoutUser,
    isAuthenticated: Boolean(getToken()),
  }
}
