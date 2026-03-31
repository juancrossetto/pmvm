export default function DashboardLoading() {
  return (
    <div className="bg-[#0e0e0e] min-h-screen px-6 lg:px-10 py-10 max-w-5xl mx-auto">
      <div className="mb-10 space-y-3">
        <div className="h-3 w-32 bg-white/5 animate-pulse" />
        <div className="h-14 w-48 bg-white/5 animate-pulse" />
        <div className="h-14 w-36 bg-[#c1ed00]/10 animate-pulse" />
        <div className="h-px w-full bg-white/5 animate-pulse mt-4" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {[0,1,2].map(i => (
          <div key={i} className="bg-surface-container-low p-6 space-y-4"
               style={{ animationDelay: `${i*0.1}s` }}>
            <div className="w-8 h-8 bg-white/5 animate-pulse" />
            <div className="h-3 w-28 bg-white/5 animate-pulse" />
            <div className="h-10 w-16 bg-white/5 animate-pulse" />
          </div>
        ))}
      </div>
      <div className="bg-surface-container-low p-8 space-y-4">
        <div className="h-4 w-44 bg-white/5 animate-pulse" />
        {[0,1,2].map(i => (
          <div key={i} className="h-12 bg-white/5 animate-pulse" style={{ animationDelay: `${i*0.07}s` }} />
        ))}
      </div>
    </div>
  )
}
