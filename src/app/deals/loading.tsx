export default function DealsLoading() {
  return (
    <div className="min-h-screen animate-pulse">
      {/* Search bar skeleton */}
      <div className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="h-8 bg-slate-200 rounded-lg w-1/2 mx-auto mb-6" />
          <div className="h-12 bg-slate-200 rounded-lg mx-auto max-w-md" />
        </div>
      </div>

      {/* Filters and cards grid */}
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar filters */}
          <div className="space-y-4">
            <div className="h-6 bg-slate-200 rounded w-3/4" />
            <div className="space-y-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-10 bg-slate-100 rounded" />
              ))}
            </div>
          </div>

          {/* Card grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="h-80 bg-slate-100 rounded-xl" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
