export default function BarChart({ series }: { series: { label: string; value: number }[] }) {
  const max = Math.max(...series.map((s) => s.value), 1)
  return (
    <div className="flex items-end gap-2 h-24">
      {series.map((s, i) => (
        <div key={`${s.label}-${i}`} className="flex flex-col items-center">
          <div className="bg-brand-yellow w-6" style={{ height: `${(s.value / max) * 100}%` }} />
          <div className="text-xs text-gray-600 mt-1">{s.value}</div>
        </div>
      ))}
    </div>
  )
}
