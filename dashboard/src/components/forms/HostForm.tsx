import { useState } from "react"

export default function HostForm({
  initial,
  onSubmit
}: {
  initial?: { name?: string; city?: string; status?: string }
  onSubmit: (v: { name: string; city: string; status: string }) => void
}) {
  const [name, setName] = useState(initial?.name ?? "")
  const [city, setCity] = useState(initial?.city ?? "")
  const [status, setStatus] = useState(initial?.status ?? "active")
  return (
    <form
      className="space-y-3"
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit({ name, city, status })
      }}
    >
      <div>
        <label className="block text-sm text-gray-700">Name</label>
        <input className="w-full rounded-lg border px-3 py-2" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label className="block text-sm text-gray-700">City</label>
        <input className="w-full rounded-lg border px-3 py-2" value={city} onChange={(e) => setCity(e.target.value)} required />
      </div>
      <div>
        <label className="block text-sm text-gray-700">Status</label>
        <select className="w-full rounded-lg border px-3 py-2" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="active">active</option>
          <option value="suspended">suspended</option>
        </select>
      </div>
      <div className="flex gap-2">
        <button type="submit" className="rounded-lg px-3 py-2 bg-brand-yellow text-darkBlue font-semibold">Save</button>
      </div>
    </form>
  )
}
