'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'
import { useEffect, useState } from 'react'

export default function V4Page() {
  const params = useParams()
  const locale = (params?.locale as string) ?? 'es'
  const [session, setSession] = useState<any>(null)

  useEffect(() => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
  }, [])

  return (
    <>
      {/* ── Top Nav ───────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 h-16 bg-[#0e0e0e]/70 backdrop-blur-md shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
        <div className="flex items-center gap-4">
          <button className="md:hidden text-[#D1FF26]">
            <span className="material-symbols-outlined">menu</span>
          </button>
          <span className="text-2xl font-black text-[#D1FF26] font-headline tracking-[-0.04em] uppercase">METODO R3SET</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-8 mr-6">
            <a href="#method" className="font-label text-xs uppercase tracking-widest text-white/40 hover:text-white transition-colors">Método</a>
            <a href="#coach" className="font-label text-xs uppercase tracking-widest text-white/40 hover:text-white transition-colors">Coach</a>
            <a href="#cta" className="font-label text-xs uppercase tracking-widest text-white/40 hover:text-white transition-colors">Programas</a>
          </div>
          {session ? (
            <Link href={`/${locale}/dashboard`} className="bg-[#cefc22] text-[#3b4a00] px-5 py-2 font-headline font-bold text-xs tracking-widest uppercase hover:opacity-90 active:scale-95 transition-all">
              Mi Área
            </Link>
          ) : (
            <>
              <Link href={`/${locale}/login`} className="hidden sm:block text-white/40 hover:text-white font-label text-xs tracking-widest uppercase transition-colors">
                Login
              </Link>
              <Link href={`/${locale}/register`} className="bg-[#cefc22] text-[#3b4a00] px-5 py-2 font-headline font-bold text-xs tracking-widest uppercase hover:opacity-90 active:scale-95 transition-all">
                Comenzar
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-end px-6 pb-16 pt-24 md:pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=1600&q=80&auto=format&fit=crop"
            alt="Entrenamiento de alto rendimiento"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e]/50 to-transparent" />
          <div className="absolute inset-0 hidden md:block bg-gradient-to-r from-[#0e0e0e] via-[#0e0e0e]/60 to-transparent" />
        </div>

        <div className="relative z-10 space-y-6 max-w-2xl">
          <span className="font-label text-[#c1ed00] tracking-[0.3em] text-[10px] uppercase">Rompe el Ciclo</span>
          <h1 className="font-headline font-bold text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tighter uppercase">
            TRANSFORMA TUS <span className="text-[#c1ed00] italic">HÁBITOS</span>,<br className="hidden md:block" /> NO SOLO TU PESO.
          </h1>
          <p className="font-body text-on-surface-variant text-lg max-w-md leading-relaxed border-l-4 border-[#c1ed00] pl-5">
            Un santuario digital de alto rendimiento diseñado para resetear tu esquema mental y físico a través de pilares respaldados por la ciencia.
          </p>
          <div className="pt-2">
            <Link
              href={`/${locale}/register`}
              className="inline-flex items-center gap-3 bg-[#cefc22] text-[#3b4a00] font-headline font-extrabold px-8 py-4 text-base lg:text-lg tracking-tight hover:scale-[1.02] active:scale-[0.98] transition-all uppercase"
            >
              COMENZAR MI R3SET
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Three Pillars ─────────────────────────────────────────── */}
      <section id="method" className="px-6 py-20 bg-surface-container-low">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12 space-y-2">
            <h2 className="font-headline text-3xl lg:text-5xl font-bold tracking-tighter uppercase italic">EL MÉTODO CENTRAL</h2>
            <div className="w-12 h-1 bg-[#00e3fd]" />
          </div>

          {/* Mobile: stacked; Desktop: bento */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">

            {/* Psychology — large */}
            <div className="md:col-span-12 lg:col-span-8 group relative overflow-hidden bg-surface-container p-8 min-h-[300px] flex flex-col justify-end">
              <div className="absolute top-6 right-6 text-[#c1ed00]/10 font-headline font-black text-8xl italic pointer-events-none select-none">01</div>
              <div className="relative z-10">
                <span className="material-symbols-outlined text-[#ff734a] text-4xl mb-4 block">psychology</span>
                <h3 className="font-headline text-2xl font-bold uppercase mb-2">Psicología</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed max-w-sm">
                  Reconectá los patrones cognitivos que llevan al auto-sabotaje. Resiliencia mental y arquitectura de hábitos.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-[#ff5722]/20 text-[#ff9475] font-label text-[10px] uppercase tracking-widest">Modelos Mentales</span>
                  <span className="px-3 py-1 bg-[#ff5722]/20 text-[#ff9475] font-label text-[10px] uppercase tracking-widest">Hábitos</span>
                  <span className="px-3 py-1 bg-[#ff5722]/20 text-[#ff9475] font-label text-[10px] uppercase tracking-widest">Detox Dopamina</span>
                </div>
              </div>
            </div>

            {/* Nutrition + Training row */}
            <div className="md:col-span-6 lg:col-span-2 bg-surface-container p-8 min-h-[250px] flex flex-col justify-between">
              <span className="material-symbols-outlined text-[#00e3fd] text-4xl">restaurant</span>
              <div>
                <h3 className="font-headline text-2xl font-bold uppercase mb-2">Nutrición</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">Combustible de precisión sin restricción. Optimización metabólica basada en ciencia.</p>
              </div>
            </div>

            <div className="md:col-span-6 lg:col-span-2 bg-[#cefc22] p-8 min-h-[250px] flex flex-col justify-between">
              <span className="material-symbols-outlined text-[#3b4a00] text-4xl">fitness_center</span>
              <div>
                <h3 className="font-headline text-2xl font-extrabold uppercase mb-2 text-[#3b4a00]">Entrenamiento</h3>
                <p className="text-[#4b5e00] text-sm leading-relaxed">Movimiento funcional para la longevidad. Sesiones de alta intensidad que respetan tu biología.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Methodology / Phases ──────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#000000] relative overflow-hidden">
        <div className="absolute left-0 top-0 w-24 h-full border-r border-white/5 hidden xl:block" />
        <div className="container mx-auto max-w-6xl xl:pl-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="aspect-[4/5] bg-surface-container overflow-hidden border border-white/5">
                <img
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80&auto=format&fit=crop"
                  alt="Entrenamiento"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-[#cefc22] p-8 hidden lg:block">
                <span className="font-headline text-5xl font-black text-[#3b4a00] leading-none">R3</span>
                <span className="font-label text-[#3b4a00] block text-xs font-bold tracking-[0.4em] mt-1">SYSTEM</span>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="font-headline text-4xl lg:text-5xl font-black tracking-tighter uppercase mb-10 leading-tight italic">
                RECODIFICÁ.<br />RECONSTRUÍ.<br /><span className="text-[#c1ed00]">R3SET.</span>
              </h2>
              <div className="space-y-8">
                {[
                  { n: '01', t: 'Recodificación', d: 'Identificamos los patrones subconscientes que frenan tu progreso. Reparamos la mentalidad antes de tocar una sola pesa.' },
                  { n: '02', t: 'Reconstrucción', d: 'Introducción del protocolo de entrenamiento y la arquitectura nutricional sobre el nuevo marco mental.' },
                  { n: '03', t: 'R3SET', d: 'Estabilización. No es un desafío con fecha de fin — es tu nuevo estado de rendimiento base.' },
                ].map(({ n, t, d }) => (
                  <div key={n} className="group flex gap-5">
                    <span className="text-3xl font-headline font-black text-white/15 group-hover:text-[#c1ed00] transition-colors flex-shrink-0">{n}</span>
                    <div>
                      <h4 className="text-lg font-headline font-bold uppercase tracking-tight mb-2">{t}</h4>
                      <p className="text-on-surface-variant font-body text-sm leading-relaxed">{d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Coach Section ─────────────────────────────────────────── */}
      <section id="coach" className="px-6 py-24 bg-[#0e0e0e]">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="w-full md:w-1/2 aspect-[4/5] bg-surface-container relative flex-shrink-0">
              <img
                src="https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=800&q=80&auto=format&fit=crop"
                alt="Alejandro Gerez - Head Coach"
                className="w-full h-full object-cover"
              />
              <div className="absolute -bottom-5 -right-5 bg-[#00e3fd] text-[#003a42] px-5 py-3 font-headline font-black text-sm uppercase tracking-tighter">
                EXPERTISE: 12+ AÑOS
              </div>
            </div>
            <div className="w-full md:w-1/2 space-y-6">
              <p className="font-label text-[10px] uppercase tracking-[0.25em] text-white/30">Tu Head Coach</p>
              <h2 className="font-headline text-4xl lg:text-5xl font-bold tracking-tighter leading-none uppercase">
                CONOCÉ A ALE:<br /><span className="text-[#c1ed00] italic">ALEJANDRO GEREZ</span>
              </h2>
              <p className="text-on-surface-variant leading-relaxed font-body">
                Alejandro fundó METODO R3SET para cerrar la brecha entre la psicología clínica y el rendimiento atlético. Ex participante de Cuestión de Peso y creador de PMVM, trae un enfoque holístico a la transformación sostenible.
              </p>
              <ul className="space-y-3 font-label text-xs uppercase tracking-widest text-white/60">
                {['Psicología del Deporte', 'Nutricionista Certificado (ISSN)', 'Performance Coach Specialist'].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-[#c1ed00] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────────────────────── */}
      <section className="py-16 bg-surface-container-low">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-8">
            {[
              { value: '+200', label: 'Clientes Transformados' },
              { value: '3', label: 'Pilares del Método' },
              { value: '12', label: 'Semanas de Programa' },
              { value: '95%', label: 'Retención de Resultados' },
            ].map(({ value, label }) => (
              <div key={label} className="text-center p-6 lg:p-8">
                <span className="font-headline text-4xl lg:text-6xl font-black text-[#c1ed00] block mb-2">{value}</span>
                <span className="font-label text-[10px] text-on-surface-variant uppercase tracking-widest">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section id="cta" className="py-24 px-6 text-center bg-surface-container-low border-y border-[#484847]/10">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-headline text-4xl lg:text-5xl font-bold tracking-tighter uppercase mb-6">
            ¿LISTO PARA <span className="text-[#c1ed00]" style={{ textShadow: '0 0 20px rgba(193,237,0,0.4)' }}>RECODIFICAR</span> TU SISTEMA?
          </h2>
          <p className="text-on-surface-variant mb-10 max-w-md mx-auto font-body">
            Unite al próximo cohorte del programa de transformación R3SET.
          </p>
          <Link
            href={`/${locale}/register`}
            className="inline-block border-2 border-[#00e3fd] text-[#00e3fd] font-headline font-bold px-10 py-5 hover:bg-[#00e3fd] hover:text-[#003a42] transition-all active:scale-95 uppercase tracking-widest"
          >
            ACCESO ANTICIPADO
          </Link>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────────── */}
      <footer className="w-full py-12 px-6 border-t border-[#484847]/15 bg-[#000000] flex flex-col md:flex-row justify-between items-center gap-6 pb-24 md:pb-12">
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="text-[#D1FF26] font-black font-headline text-xl tracking-tighter uppercase">METODO R3SET</span>
          <p className="font-label text-xs uppercase text-white/30 tracking-widest">© 2025 METODO R3SET. TODOS LOS DERECHOS RESERVADOS.</p>
        </div>
        <div className="flex gap-8">
          <a href="#" className="font-label text-xs uppercase text-white/30 hover:text-white transition-colors">Privacidad</a>
          <a href="#" className="font-label text-xs uppercase text-white/30 hover:text-white transition-colors">Términos</a>
          <a href="#" className="font-label text-xs uppercase text-white/30 hover:text-white transition-colors">Contacto</a>
        </div>
        <div className="flex gap-4">
          <span className="material-symbols-outlined text-white/30 hover:text-[#00e3fd] transition-colors cursor-pointer">share</span>
          <span className="material-symbols-outlined text-white/30 hover:text-[#00e3fd] transition-colors cursor-pointer">brand_awareness</span>
        </div>
      </footer>

      {/* ── Mobile Bottom Nav ─────────────────────────────────────── */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center h-20 bg-[#0e0e0e]/90 backdrop-blur-xl z-50 border-t border-white/5">
        <a href="#method" className="flex flex-col items-center justify-center text-[#D1FF26] pt-2">
          <span className="material-symbols-outlined">psychology</span>
          <span className="font-label text-[10px] uppercase tracking-widest mt-1">Método</span>
        </a>
        <a href="#coach" className="flex flex-col items-center justify-center text-white/40 pt-2 active:scale-90 transition-all">
          <span className="material-symbols-outlined">restaurant</span>
          <span className="font-label text-[10px] uppercase tracking-widest mt-1">Nutrición</span>
        </a>
        <a href="#method" className="flex flex-col items-center justify-center text-white/40 pt-2 active:scale-90 transition-all">
          <span className="material-symbols-outlined">fitness_center</span>
          <span className="font-label text-[10px] uppercase tracking-widest mt-1">Entreno</span>
        </a>
        <Link href={`/${locale}/dashboard`} className="flex flex-col items-center justify-center text-white/40 pt-2 active:scale-90 transition-all">
          <span className="material-symbols-outlined">insights</span>
          <span className="font-label text-[10px] uppercase tracking-widest mt-1">Progreso</span>
        </Link>
      </nav>
    </>
  )
}
