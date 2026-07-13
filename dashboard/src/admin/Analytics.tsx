import BarChart from "../components/BarChart"
import { mockAnalyticsSeries } from "../mock/data"

export default function AdminAnalytics() {
  return (
    <div className="space-y-6">
      <div className="text-2xl font-bold text-darkBlue">Analytics</div>
      <div className="rounded-2xl bg-white p-4 border space-y-4">
        <div className="font-semibold text-darkBlue">Monthly bookings</div>
        <BarChart series={mockAnalyticsSeries} />
      </div>
    </div>
  )
}
