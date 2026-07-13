import useFetch from "../hooks/useFetch"
import { getBookings } from "../services/api"

export default function GuideMyBookings() {
  const { data, loading, error } = useFetch(getBookings)
  return (
    <div className="space-y-4">
      <div className="text-2xl font-bold text-darkBlue">My bookings</div>
      <div className="rounded-2xl bg-white p-4 border">
        {loading && "Loading..."}
        {error && <span className="text-red-600">{error}</span>}
        {!loading && !error && Array.isArray(data) && (
          <ul className="space-y-2">
            {data.map((b: any) => (
              <li key={b.id} className="border rounded-lg p-3">
                <div className="font-medium">{b.experienceTitle ?? "Experience"}</div>
                <div className="text-sm text-gray-600">{b.date}</div>
                <div className="text-sm text-gray-600">Guests: {b.guests}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
