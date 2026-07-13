export default function WriterGuidesContent() {
  return (
    <div className="space-y-6">
      <div className="text-2xl font-bold text-darkBlue">Guides Content</div>
      <div className="rounded-2xl bg-white p-4 border">
        <div className="flex justify-between items-center">
          <div className="font-semibold text-darkBlue">Experience Descriptions</div>
          <button className="rounded-lg px-3 py-2 bg-brand-yellow text-darkBlue font-semibold">Add content</button>
        </div>
        <ul className="mt-3 space-y-2">
          <li className="flex items-center justify-between">
            <div className="text-sm">Bhaktapur Heritage Walk — description</div>
            <div className="flex items-center gap-2">
              <button className="rounded-lg px-3 py-1 border">Edit</button>
              <button className="rounded-lg px-3 py-1 border">Remove</button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}
