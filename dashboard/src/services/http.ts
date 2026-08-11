import axios from "axios"
import { useAuthStore } from "../state/authStore"
import { API_BASE_URL } from "../config/api"

export const http = axios.create({
  baseURL: API_BASE_URL,
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
