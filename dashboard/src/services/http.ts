import axios from "axios"
import { useAuthStore } from "../state/authStore"

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || (import.meta.env.DEV ? "http://localhost:8000/api/v1" : "https://guides-nepal.onrender.com/api/v1"),
  withCredentials: true
})

http.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token
  if (token) {
    config.headers = config.headers ?? {}
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
