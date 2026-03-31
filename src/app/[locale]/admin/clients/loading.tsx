export default function ClientsLoading() {
  return (
    <div className="bg-[#0e0e0e] min-h-screen px-6 lg:px-12 py-10 max-w-7xl mx-auto">
      <div className="mb-8 space-y-3">
        <div className="h-3 w-24 bg-white/5 animate-pulse" />
        <div className="h-12 w-48 bg-white/5 animate-pulse" />
      </div>
      <div className="space-y-3">
        {[0,1,2,3,4,5].map(i => (
          <div key={i} className="bg-surface-container-low p-5 flex items-center gap-4"
               style={{ animationDelay: `${i*0.06}s` }}>
            <div className="w-10 h-10 bg-[#c1ed00]/10 animate-pulse flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-3 w-40 bg-white/5 animate-pulse" />
              <div className="h-2 w-24 bg-white/5 animate-pulse" />
            </div>
            <div className="h-3 w-16 bg-white/5 animate-pulse hidden md:block" />
          </div>
        ))}
      </div>
    </div>
  )
}
