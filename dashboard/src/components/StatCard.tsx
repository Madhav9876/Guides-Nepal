type Props = {
  label: string
  value: string | number
}

export default function StatCard({ label, value }: Props) {
  return (
    <div className="rounded-2xl bg-white p-4 border">
      <div className="text-sm text-gray-600">{label}</div>
      <div className="text-2xl font-bold text-darkBlue">{value}</div>
    </div>
  )
}
