import { useState } from "react"
import Table from "../components/Table"
import Modal from "../components/Modal"
import GuideForm from "../components/forms/GuideForm"
import { mockGuides } from "../mock/data"

export default function AdminGuides() {
  const [rows, setRows] = useState(mockGuides)
  const [openEdit, setOpenEdit] = useState<{ idx: number } | null>(null)
  const [openAdd, setOpenAdd] = useState(false)
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-2xl font-bold text-darkBlue">Guides</div>
        <button className="rounded-lg px-3 py-2 bg-brand-yellow text-darkBlue font-semibold" onClick={() => setOpenAdd(true)}>
          Add guide
        </button>
      </div>
      <Table
        columns={[
          { key: "name", label: "Name" },
          { key: "verified", label: "Verified" },
          { key: "level", label: "Level" },
          { key: "rating", label: "Rating" },
          { key: "reviews", label: "Reviews" },
          { key: "languages", label: "Languages", render: (r: any) => r.languages.join(", ") },
          {
            key: "actions",
            label: "Actions",
            render: (_r: any, i?: number) => (
              <div className="flex gap-2">
                <button className="rounded-lg px-2 py-1 border" onClick={() => setOpenEdit({ idx: i! })}>Edit</button>
                <button
                  className="rounded-lg px-2 py-1 border"
                  onClick={() =>
                    setRows((prev) =>
                      prev.map((x, idx) => (idx === i ? { ...x, verified: true } : x))
                    )
                  }
                >
                  Verify
                </button>
                <button
                  className="rounded-lg px-2 py-1 border"
                  onClick={() =>
                    setRows((prev) =>
                      prev.map((x, idx) => (idx === i ? { ...x, level: "senior" } : x))
                    )
                  }
                >
                  Promote
                </button>
                <button
                  className="rounded-lg px-2 py-1 border"
                  onClick={() =>
                    setRows((prev) =>
                      prev.map((x, idx) => (idx === i ? { ...x, verified: false } : x))
                    )
                  }
                >
                  Suspend
                </button>
                <button
                  className="rounded-lg px-2 py-1 border"
                  onClick={() => setRows((prev) => prev.filter((_, idx) => idx !== i))}
                >
                  Remove
                </button>
              </div>
            )
          }
        ]}
        rows={rows}
      />
      <Modal
        open={openEdit !== null}
        title="Edit guide"
        onClose={() => setOpenEdit(null)}
      >
        {openEdit !== null && (
          <GuideForm
            initial={{
              name: rows[openEdit.idx].name,
              languages: rows[openEdit.idx].languages.join(","),
              verified: rows[openEdit.idx].verified
            }}
            onSubmit={(v) => {
              setRows((prev) =>
                prev.map((x, idx) => (idx === openEdit.idx ? { ...x, name: v.name, languages: v.languages, verified: v.verified } : x))
              )
              setOpenEdit(null)
            }}
          />
        )}
      </Modal>
      <Modal open={openAdd} title="Add guide" onClose={() => setOpenAdd(false)}>
        <GuideForm
          onSubmit={(v) => {
            setRows((prev) => [
              { id: Math.floor(Math.random() * 10000), name: v.name, verified: v.verified, level: "regular", rating: 0, reviews: 0, languages: v.languages },
              ...prev
            ])
            setOpenAdd(false)
          }}
        />
      </Modal>
    </div>
  )
}
