import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || (import.meta.env.PROD ? '/api' : 'http://localhost:8000/api'),
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('cl_token')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const currentPath = window.location.pathname

      if (currentPath !== '/login' && currentPath !== '/register') {
        localStorage.removeItem('cl_token')
        localStorage.removeItem('cl_user')
      }
    }

    return Promise.reject(error)
  }
)

export default api