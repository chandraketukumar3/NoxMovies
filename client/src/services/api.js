import axios from 'axios'

// Base Axios instance pointing at the backend API
const api = axios.create({
  baseURL: import.meta.env.MODE === 'development'
    ? 'http://localhost:5000/api'
    : 'https://noxmovies.onrender.com/api',
  withCredentials: true,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor — attach auth tokens here if needed
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor — handle global errors here
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error)
    return Promise.reject(error)
  }
)

export default api
