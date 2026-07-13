import { useState } from "react"

export default function GuideForm({
  initial,
  onSubmit
}: {
  initial?: { name?: string; languages?: string; verified?: boolean }
  onSubmit: (v: { name: string; languages: string[]; verified: boolean }) => void
}) {
  const [name, setName] = useState(initial?.name ?? "")
  const [languages, setLanguages] = useState(initial?.languages ?? "English,Nepali")
  const [verified, setVerified] = useState(initial?.verified ?? false)
  return (
    <form
      className="space-y-3"
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit({ name, languages: languages.split(",").map((x) => x.trim()).filter(Boolean), verified })
      }}
    >
      <div>
        <label className="block text-sm text-gray-700">Name</label>
        <input className="w-full rounded-lg border px-3 py-2" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label className="block text-sm text-gray-700">Languages (comma separated)</label>
        <input className="w-full rounded-lg border px-3 py-2" value={languages} onChange={(e) => setLanguages(e.target.value)} required />
      </div>
      <label className="flex items-center gap-2 text-sm text-gray-700">
        <input type="checkbox" checked={verified} onChange={(e) => setVerified(e.target.checked)} />
        Verified
      </label>
      <div className="flex gap-2">
        <button type="submit" className="rounded-lg px-3 py-2 bg-brand-yellow text-darkBlue font-semibold">Save</button>
      </div>
    </form>
  )
}
