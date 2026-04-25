export default function GuidesLoading() {
  return (
    <div className="min-h-screen animate-pulse">
      {/* Hero section */}
      <div className="bg-gradient-to-b from-[#0a1628] to-[#1E3A5F] py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="h-10 bg-slate-200 rounded-lg w-1/2 mx-auto" />
        </div>
      </div>

      {/* Guides cards grid */}
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="rounded-lg overflow-hidden border border-slate-200">
              <div className="h-40 bg-slate-100 mb-4" />
              <div className="px-4 py-4">
                <div className="h-5 bg-slate-200 rounded w-4/5 mb-3" />
                <div className="space-y-2">
                  <div className="h-3 bg-slate-100 rounded" />
                  <div className="h-3 bg-slate-100 rounded w-4/5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
