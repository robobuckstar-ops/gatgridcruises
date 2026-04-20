export default function BlogLoading() {
  return (
    <div className="min-h-screen animate-pulse">
      {/* Hero section */}
      <div className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="h-10 bg-slate-200 rounded-lg w-1/2 mx-auto" />
        </div>
      </div>

      {/* Blog cards grid */}
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="overflow-hidden rounded-lg">
              <div className="h-48 bg-slate-100 mb-4" />
              <div className="px-4 py-4">
                <div className="h-4 bg-slate-200 rounded w-3/4 mb-3" />
                <div className="space-y-2">
                  <div className="h-3 bg-slate-100 rounded" />
                  <div className="h-3 bg-slate-100 rounded w-5/6" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
