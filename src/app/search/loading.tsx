export default function SearchLoading() {
  return (
    <div className="min-h-screen animate-pulse">
      {/* Search bar section */}
      <div className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="h-8 bg-slate-200 rounded-lg w-1/3 mx-auto mb-6" />
          <div className="h-14 bg-slate-200 rounded-lg mx-auto max-w-2xl" />
        </div>
      </div>

      {/* Results section */}
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="h-6 bg-slate-200 rounded-lg w-1/4 mb-8" />

        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="h-24 bg-slate-100 rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  )
}
