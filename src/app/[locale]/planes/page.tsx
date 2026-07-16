'use client'

import { use, useEffect } from 'react'

/** Mantiene URLs antiguas /planes: redirige a la sección de planes del home (diseño productivo). */
export default function PlanesRedirect({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = use(params)

  useEffect(() => {
    window.location.replace(`/${locale}#pricing`)
  }, [locale])

  return (
    <div className="min-h-screen flex items-center justify-center bg-darkColor text-lightColor">
      <p className="text-sm opacity-70">Redirigiendo a planes…</p>
    </div>
  )
}
