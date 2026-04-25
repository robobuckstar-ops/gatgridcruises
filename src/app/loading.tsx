export default function Loading() {
  return (
    <div className="min-h-screen animate-pulse">
      {/* Hero section */}
      <div className="bg-gradient-to-b from-[#0a1628] to-[#1E3A5F] py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="h-12 bg-slate-200 rounded-lg w-2/3 mx-auto mb-4" />
          <div className="h-6 bg-slate-200 rounded-lg w-1/2 mx-auto mb-8" />
          <div className="h-12 bg-slate-200 rounded-full w-96 mx-auto" />
        </div>
      </div>

      {/* Content section */}
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-64 bg-slate-100 rounded-xl" />
          ))}
        </div>
      </div>

      {/* Additional skeleton */}
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="h-8 bg-slate-200 rounded-lg w-1/3 mb-6" />
        <div className="space-y-4">
          <div className="h-4 bg-slate-100 rounded w-full" />
          <div className="h-4 bg-slate-100 rounded w-full" />
          <div className="h-4 bg-slate-100 rounded w-2/3" />
        </div>
      </div>
    </div>
  )
}
