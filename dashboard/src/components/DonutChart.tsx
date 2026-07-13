export default function DonutChart({
  segments
}: {
  segments: { label: string; value: number; color: string }[]
}) {
  const total = segments.reduce((s, x) => s + x.value, 0) || 1
  let start = 0
  return (
    <div className="flex gap-6 items-center">
      <svg width="120" height="120" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r="50" fill="transparent" stroke="#eee" strokeWidth="20" />
        {segments.map((seg, i) => {
          const dash = (seg.value / total) * Math.PI * 2 * 50
          const circleProps = {
            key: i,
            cx: 60,
            cy: 60,
            r: 50,
            fill: "transparent",
            stroke: seg.color,
            strokeWidth: 20,
            strokeDasharray: `${dash} ${Math.PI * 2 * 50}`,
            strokeDashoffset: -start
          }
          start += dash
          return <circle {...circleProps} />
        })}
        <circle cx="60" cy="60" r="34" fill="#fff" />
      </svg>
      <div className="space-y-1">
        {segments.map((s, i) => (
          <div key={i} className="text-xs text-gray-700 flex items-center gap-2">
            <span className="inline-block w-3 h-3 rounded" style={{ background: s.color }} />
            {s.label} {s.value}
          </div>
        ))}
      </div>
    </div>
  )
}
