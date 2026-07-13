type Props = {
  title: string
  value: string | number
  sub?: string
  delta?: { value: string; positive?: boolean }
}

export default function KPICard({ title, value, sub, delta }: Props) {
  return (
    <div className="rounded-2xl bg-white p-4 border shadow-sm flex items-center gap-4">
      <div className="h-10 w-10 rounded-full bg-lightBlue/60 grid place-items-center text-darkBlue font-bold">{String(value).toString().slice(0, 2)}</div>
      <div className="flex-1">
        <div className="text-sm text-gray-600">{title}</div>
        <div className="text-xl font-bold text-darkBlue">{value}</div>
        <div className="flex items-center gap-2">
          {sub && <div className="text-xs text-gray-500">{sub}</div>}
          {delta && (
            <span className={`text-xs ${delta.positive ? "text-green-600" : "text-red-600"}`}>{delta.value}</span>
          )}
        </div>
      </div>
    </div>
  )
}
