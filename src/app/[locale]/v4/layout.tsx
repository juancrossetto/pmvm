import type { ReactNode } from 'react'
import Head from 'next/head'

export default function V4Layout({ children }: { children: ReactNode }) {
  return (
    <div className="dark">
      {/* Material Symbols font loaded via global CSS */}
      <div className="bg-[#0e0e0e] text-white min-h-screen font-body selection:bg-primary-container selection:text-on-primary-fixed">
        {children}
      </div>
    </div>
  )
}
