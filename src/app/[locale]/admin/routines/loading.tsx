export default function RoutinesLoading() {
  return (
    <div className="bg-[#0e0e0e] min-h-screen px-6 lg:px-12 py-10 max-w-5xl mx-auto">
      <div className="mb-8 space-y-3">
        <div className="h-3 w-24 bg-white/5 animate-pulse" />
        <div className="h-14 w-64 bg-white/5 animate-pulse" />
      </div>
      {/* Form skeleton */}
      <div className="space-y-6">
        {[0,1,2].map(section => (
          <div key={section} className="bg-surface-container-low p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-[#c1ed00]/20 animate-pulse" />
              <div className="h-4 w-40 bg-white/5 animate-pulse" />
            </div>
            <div className="h-12 bg-white/5 animate-pulse" />
            <div className="grid grid-cols-2 gap-3">
              <div className="h-12 bg-white/5 animate-pulse" />
              <div className="h-12 bg-white/5 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
