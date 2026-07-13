export type Role = "admin" | "host" | "guide" | "content-writer"

export function canAccess(required: Role, actual: Role | null) {
  if (!actual) return false
  const order: Role[] = ["guide", "host", "content-writer", "admin"]
  const indexRequired = order.indexOf(required)
  const indexActual = order.indexOf(actual)
  return indexActual >= indexRequired && !(actual === "host" && required === "admin")
}

export function normalizeRole(role: string | null | undefined): Role | null {
  if (!role) return null
  const r = role.toLowerCase()
  if (r === "admin") return "admin"
  if (r === "host") return "host"
  if (r === "guide") return "guide"
  if (r === "content-writer" || r === "content_writer" || r === "content writer" || r === "writer") return "content-writer"
  return null
}
