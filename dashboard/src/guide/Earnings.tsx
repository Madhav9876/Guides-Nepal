import BarChart from "../components/BarChart"
import { mockEarningsHistory } from "../mock/data"

export default function GuideEarnings() {
  const series = mockEarningsHistory.map((e) => ({ label: e.date, value: e.amount }))
  const total = mockEarningsHistory.reduce((s, x) => s + x.amount, 0)
  return (
    <div className="space-y-6">
      <div className="text-2xl font-bold text-darkBlue">Earnings</div>
      <div className="rounded-2xl bg-white p-4 border space-y-2">
        <div className="font-semibold text-darkBlue">Recent earnings</div>
        <BarChart series={series} />
        <div className="text-sm text-gray-600">Total: ${total}</div>
      </div>
    </div>
  )
}
