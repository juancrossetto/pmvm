export default function AdminLoading() {
  return (
    <div className="bg-[#0e0e0e] min-h-screen px-6 lg:px-12 py-10 lg:py-12 max-w-7xl mx-auto">
      {/* Header skeleton */}
      <div className="mb-10 space-y-3">
        <div className="h-3 w-32 bg-white/5 animate-pulse" />
        <div className="h-16 w-80 bg-white/5 animate-pulse" />
        <div className="h-16 w-56 bg-[#c1ed00]/10 animate-pulse" />
        <div className="h-px w-full bg-white/5 animate-pulse mt-4" />
      </div>
      {/* Stat cards skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mb-12">
        {[0,1,2].map(i => (
          <div key={i} className="bg-surface-container-low p-6 lg:p-8 space-y-4">
            <div className="w-8 h-8 bg-white/5 animate-pulse" style={{ animationDelay: `${i*0.1}s` }} />
            <div className="h-3 w-28 bg-white/5 animate-pulse" />
            <div className="h-12 w-20 bg-white/5 animate-pulse" />
          </div>
        ))}
      </div>
      {/* Bottom grid skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-surface-container-low p-8 space-y-4">
          <div className="h-4 w-48 bg-white/5 animate-pulse" />
          {[0,1,2,3].map(i => (
            <div key={i} className="h-12 bg-white/5 animate-pulse" style={{ animationDelay: `${i*0.07}s` }} />
          ))}
        </div>
        <div className="lg:col-span-4 bg-surface-container-low p-8 space-y-4">
          <div className="h-4 w-32 bg-white/5 animate-pulse" />
          {[0,1,2].map(i => (
            <div key={i} className="h-10 bg-white/5 animate-pulse" style={{ animationDelay: `${i*0.07}s` }} />
          ))}
        </div>
      </div>
    </div>
  )
}
