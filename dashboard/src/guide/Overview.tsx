import useFetch from "../hooks/useFetch"
import { getBookings } from "../services/api"
import StatCard from "../components/StatCard"
import KPICard from "../components/KPICard"
import HeroGreeting from "../components/HeroGreeting"
import BarChart from "../components/BarChart"
import Badge from "../components/Badge"
import SchedulePanel from "../components/SchedulePanel"
import Table from "../components/Table"
import { mockExperiences, mockBookings as mockB, mockGuideTasks, mockGuideScheduleItems } from "../mock/data"

export default function GuideOverview() {
  const { data, loading } = useFetch(getBookings)
  const bookings = Array.isArray(data) ? data : []
  const upcoming = bookings.filter((x: any) => x.status === "upcoming").length
  const earningsTotal = bookings.reduce((sum: number, x: any) => sum + (x.price ?? 0), 0)
  const series = (mockB ?? []).map((bk) => ({ label: bk.date, value: bk.price }))
  return (
    <div className="space-y-6">
      <div className="text-2xl font-bold text-darkBlue">Guide Overview</div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-2">
          <HeroGreeting />
        </div>
        <KPICard title="Upcoming" value={loading ? "…" : upcoming} delta={{ value: "+1", positive: true }} />
        <KPICard title="Total bookings" value={loading ? "…" : bookings.length} delta={{ value: "+3%", positive: true }} />
        <KPICard title="Earnings" value={loading ? "…" : `$${earningsTotal}`} delta={{ value: "+1%", positive: true }} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="rounded-2xl bg-white p-4 border space-y-2 lg:col-span-2">
          <div className="font-semibold text-darkBlue">Bookings trend</div>
          <BarChart series={series} />
        </div>
        <div className="rounded-2xl bg-white p-4 border space-y-2">
          <div className="font-semibold text-darkBlue">Tasks</div>
          <ul className="space-y-2">
            {mockGuideTasks.map((t) => (
              <li key={t.id} className="flex items-center justify-between">
                <div className="text-sm">{t.title}</div>
                <div className="text-xs text-gray-600">{t.due} • {t.status}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="rounded-2xl bg-white p-4 border space-y-2 lg:col-span-2">
          <div className="font-semibold text-darkBlue">Assigned Experiences</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {mockExperiences.map((e) => (
              <div key={e.id} className="rounded-2xl border p-3 bg-white">
                <div className="font-semibold text-darkBlue">{e.title}</div>
                <div className="text-xs text-gray-600">{e.city}</div>
                <div className="flex items-center gap-2 mt-2">
                  <Badge text={e.duration} />
                  <Badge text={e.status} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <SchedulePanel items={mockGuideScheduleItems} />
      </div>
      <div className="rounded-2xl bg-white p-4 border space-y-2">
        <div className="font-semibold text-darkBlue">Recent Bookings</div>
        <Table
          columns={[
            { key: "experienceTitle", label: "Experience" },
            { key: "date", label: "Date" },
            { key: "guests", label: "Guests" },
            { key: "status", label: "Status" },
            { key: "price", label: "Price", render: (r: any) => `$${r.price}` }
          ]}
          rows={mockB}
        />
      </div>
    </div>
  )
}
