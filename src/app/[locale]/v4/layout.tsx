import type { ReactNode } from 'react'

export default function V4Layout({ children }: { children: ReactNode }) {
  return (
    <div className="dark">
      {/* Material Symbols: load via <link> for guaranteed availability */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block"
      />
      <div className="bg-[#0e0e0e] text-white min-h-screen font-body selection:bg-primary-container selection:text-on-primary-fixed">
        {children}
      </div>
    </div>
  )
}
