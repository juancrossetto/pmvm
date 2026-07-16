import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-[#0e0e0e] text-white px-6 text-center">
      <h1 className="font-headline font-black text-4xl md:text-6xl uppercase tracking-tighter">
        Página no encontrada
      </h1>
      <p className="text-white/50 text-sm md:text-base max-w-md">
        La página que buscás no existe o fue movida.
      </p>
      <Link
        href="/es"
        className="inline-flex items-center gap-2 bg-[#c1ed00] text-[#0e0e0e] font-headline font-black px-6 py-3 text-sm uppercase tracking-widest hover:scale-[1.05] transition-all duration-300"
      >
        Volver al inicio
      </Link>
    </div>
  )
}
