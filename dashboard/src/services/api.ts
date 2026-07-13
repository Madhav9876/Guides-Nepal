import { http } from "./http"

export async function login(payload: { email: string; password: string }) {
  const res = await http.post("/auth/login", payload)
  return res.data
}

export async function registerUser(payload: {
  email: string
  password: string
  role?: "admin" | "host" | "guide" | "traveler"
  firstName?: string
  lastName?: string
  phone?: string
}) {
  const res = await http.post("/auth/register", payload)
  return res.data
}

export async function getMe() {
  throw new Error("Not implemented")
}

export async function getExperiences() {
  const res = await http.get("/experiences")
  return res.data
}

export async function getBookings() {
  const res = await http.get("/bookings")
  return res.data
}
