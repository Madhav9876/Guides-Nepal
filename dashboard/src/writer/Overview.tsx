export default function WriterOverview() {
  return (
    <div className="space-y-6">
      <div className="text-2xl font-bold text-darkBlue">Contant Writer Overview</div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-2xl bg-white p-4 border">
          <div className="text-sm text-gray-600">Pages</div>
          <div className="text-2xl font-bold text-darkBlue">12</div>
        </div>
        <div className="rounded-2xl bg-white p-4 border">
          <div className="text-sm text-gray-600">Blog Drafts</div>
          <div className="text-2xl font-bold text-darkBlue">3</div>
        </div>
        <div className="rounded-2xl bg-white p-4 border">
          <div className="text-sm text-gray-600">Guides Content</div>
          <div className="text-2xl font-bold text-darkBlue">8</div>
        </div>
      </div>
    </div>
  )
}
