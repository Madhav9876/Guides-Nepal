type Column<T> = {
  key: keyof T | string
  label: string
  render?: (row: T) => React.ReactNode
}

export default function Table<T extends Record<string, any>>({
  columns,
  rows
}: {
  columns: Column<T>[]
  rows: T[]
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border bg-white shadow-sm">
      <table className="min-w-full text-sm">
        <thead className="bg-lightBlue/50">
          <tr>
            {columns.map((c, ci) => (
              <th key={`${String(c.key)}-${ci}`} className="text-left px-3 py-2 font-semibold text-darkBlue">
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, idx) => (
            <tr key={idx} className="border-t">
              {columns.map((c, ci) => (
                <td key={`${String(c.key)}-${ci}`} className="px-3 py-2">
                  {"render" in c && c.render ? (c.render as any)(r, idx) : String(r[c.key as keyof T] ?? "")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
