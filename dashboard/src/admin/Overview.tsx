import useFetch from "../hooks/useFetch"
import { getExperiences } from "../services/api"
import StatCard from "../components/StatCard"
import KPICard from "../components/KPICard"
import HeroGreeting from "../components/HeroGreeting"
import BarChart from "../components/BarChart"
import DonutChart from "../components/DonutChart"
import Table from "../components/Table"
import Badge from "../components/Badge"
import SchedulePanel from "../components/SchedulePanel"
import { mockAnalyticsSeries, mockTasks, mockActivity, mockEmployees, mockSources, mockExperiences, mockScheduleItems } from "../mock/data"

export default function AdminOverview() {
  const { data, loading } = useFetch(getExperiences)
  const experiences = Array.isArray(data) ? data : []
  return (
    <div className="space-y-6">
      <div className="text-2xl font-bold text-darkBlue">Dashboard</div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-2">
          <HeroGreeting />
        </div>
        <KPICard title="Total Experiences" value={loading ? "…" : experiences.length} sub="Listed across cities" />
        <KPICard title="Response Rate" value="92%" sub="Last 30 days" />
        <KPICard title="Bookings" value="1,242" sub="This month" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="rounded-2xl bg-white p-4 border space-y-2 lg:col-span-2">
          <div className="font-semibold text-darkBlue">Average KPIs</div>
          <BarChart series={mockAnalyticsSeries} />
        </div>
        <div className="rounded-2xl bg-white p-4 border space-y-2">
          <div className="font-semibold text-darkBlue">Tasks</div>
          <ul className="space-y-2">
            {mockTasks.map((t) => (
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
          <div className="font-semibold text-darkBlue">Employees</div>
          <Table
            columns={[
              { key: "name", label: "Name" },
              { key: "email", label: "Email" },
              { key: "department", label: "Department" },
              { key: "role", label: "Role" },
              { key: "status", label: "Status" }
            ]}
            rows={mockEmployees}
          />
        </div>
        <div className="rounded-2xl bg-white p-4 border space-y-2">
          <div className="font-semibold text-darkBlue">Recent Activity</div>
          <ul className="space-y-2">
            {mockActivity.map((a, idx) => (
              <li key={idx} className="flex items-center justify-between">
                <div className="text-sm">{a.text}</div>
                <div className="text-xs text-gray-600">{a.time}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="rounded-2xl bg-white p-4 border space-y-2">
          <div className="font-semibold text-darkBlue">Application Resources</div>
          <DonutChart segments={mockSources} />
        </div>
        <div className="rounded-2xl bg-white p-4 border space-y-2 lg:col-span-2">
          <div className="font-semibold text-darkBlue">Current Experiences</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {mockExperiences.map((e) => (
              <div key={e.id} className="rounded-2xl border p-3 bg-white">
                <div className="font-semibold text-darkBlue">{e.title}</div>
                <div className="text-xs text-gray-600">{e.city}</div>
                <div className="flex items-center gap-2 mt-2">
                  <Badge text={`$${e.price}`} />
                  <Badge text={e.duration} />
                  <Badge text={e.status} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <SchedulePanel items={mockScheduleItems} />
    </div>
  )
}
