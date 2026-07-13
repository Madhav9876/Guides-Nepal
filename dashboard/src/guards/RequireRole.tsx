import { ReactNode } from "react"
import { Navigate } from "react-router-dom"
import { useAuthStore } from "../state/authStore"
import { Role } from "../utils/roles"

export default function RequireRole({ role, children }: { role: Role; children: ReactNode }) {
  const { role: actual } = useAuthStore()
  if (actual !== role) return <Navigate to="/dashboard/login" replace />
  return <>{children}</>
}
