import { useAuthStore } from "../state/authStore"
import { useNavigate } from "react-router-dom"

export default function Topbar() {
  const navigate = useNavigate()
  const { role, user, reset } = useAuthStore()
  function logout() {
    reset()
    navigate("/dashboard/login", { replace: true })
  }
  return (
    <div className="h-14 border-b bg-white flex items-center px-4 justify-between">
      <div className="flex items-center gap-3">
        <img src="/logo.svg" alt="Guides Nepal" className="h-6 w-6" />
        <div className="font-semibold text-darkBlue">Guides Nepal Dashboard</div>
      </div>
      <div className="flex-1 px-6">
        <input
          className="w-full rounded-full border px-4 py-2 text-sm bg-lightBlue/30 focus:outline-none focus:ring-2 focus:ring-brand-yellow"
          placeholder="Search experiences, guides, bookings..."
        />
      </div>
      <div className="flex items-center gap-4">
        <div className="text-sm text-gray-600">
          {user ? `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim() : "Guest"} • {role ?? "guest"}
        </div>
        {role && (
          <button
            onClick={logout}
            className="rounded-lg px-3 py-1 border border-brand-yellow text-darkBlue hover:bg-peach text-sm"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  )
}
