import { useAuthStore } from "../state/authStore"

export default function HeroGreeting() {
  const { user } = useAuthStore()
  const name = user ? `${user.firstName ?? ""}`.trim() || "there" : "there"
  return (
    <div className="rounded-2xl bg-lightBlue/50 p-6 border shadow-sm">
      <div className="text-sm text-gray-600">Today</div>
      <div className="text-2xl font-bold text-darkBlue mt-1">Hello, {name}! 👋</div>
      <div className="text-sm text-gray-600 mt-1">Track & manage your latest progress here</div>
    </div>
  )
}
