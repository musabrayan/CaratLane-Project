import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { loginUser as apiLogin, registerUser as apiRegister, getMe } from '../services/authService'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const verifySession = useCallback(async () => {
    const token = localStorage.getItem('cl_token')

    if (!token) {
      setUser(null)
      setLoading(false)
      return
    }

    try {
      const data = await getMe()
      setUser(data.user)
    } catch {
      localStorage.removeItem('cl_token')
      localStorage.removeItem('cl_user')
      setUser(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    verifySession()
  }, [verifySession])

  const login = async (email, password) => {
    const data = await apiLogin(email, password)

    if (data.success) {
      localStorage.setItem('cl_token', data.token)
      localStorage.setItem('cl_user', JSON.stringify(data.user))
      setUser(data.user)
    }

    return data
  }

  const register = async (name, email, password) => {
    const data = await apiRegister(name, email, password)

    if (data.success) {
      localStorage.setItem('cl_token', data.token)
      localStorage.setItem('cl_user', JSON.stringify(data.user))
      setUser(data.user)
    }

    return data
  }

  const logout = () => {
    localStorage.removeItem('cl_token')
    localStorage.removeItem('cl_user')
    setUser(null)
  }

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}

export default AuthContext
