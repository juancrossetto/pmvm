'use client'

import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'
import { useEffect, useState } from 'react'

export default function V4Page() {
  const params = useParams()
  const router = useRouter()
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
      {/* ── Nav ─────────────────────────────────────────────────────── */}
      <nav className="fixed top-0 right-0 left-0 z-50 flex items-center justify-between px-6 lg:px-12 w-full h-20 border-b border-neutral-900/30 bg-black/80 backdrop-blur-2xl flat-monolith-depth">
        <div className="flex items-center gap-8 lg:gap-12">
          <span className="text-xl font-extrabold text-[#D1FF26] font-headline tracking-widest uppercase">R3SET</span>
          <div className="hidden lg:flex items-center gap-8">
            <a href="#pillars" className="text-neutral-400 hover:text-white transition-colors duration-200 font-headline text-sm tracking-widest uppercase">Método</a>
            <a href="#methodology" className="text-neutral-400 hover:text-white transition-colors duration-200 font-headline text-sm tracking-widest uppercase">Sistema</a>
            <a href="#cta" className="text-neutral-400 hover:text-white transition-colors duration-200 font-headline text-sm tracking-widest uppercase">Programas</a>
          </div>
        </div>
        <div className="flex items-center gap-4 lg:gap-6">
          {session ? (
            <Link href={`/${locale}/dashboard`} className="bg-primary-container text-on-primary-fixed px-4 lg:px-6 py-2 font-headline font-bold text-sm tracking-widest uppercase hover:opacity-80 active:scale-95 transition-all">
              Mi Dashboard
            </Link>
          ) : (
            <>
              <Link href={`/${locale}/login`} className="text-neutral-400 hover:text-white font-headline text-sm tracking-widest uppercase transition-colors duration-200 hidden sm:block">
                Login
              </Link>
              <Link href={`/${locale}/register`} className="bg-primary-container text-on-primary-fixed px-4 lg:px-6 py-2 font-headline font-bold text-sm tracking-widest uppercase hover:opacity-80 active:scale-95 transition-all">
                Comenzar
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=1600&q=80&auto=format&fit=crop"
            alt="Entrenamiento de alta intensidad"
            className="w-full h-full object-cover grayscale opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0e0e0e] via-[#0e0e0e]/85 to-transparent" />
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="max-w-2xl">
            <div className="mb-6 flex items-center gap-4">
              <span className="h-[1px] w-12 bg-[#c1ed00]" />
              <span className="font-label text-[#c1ed00] tracking-[0.3em] text-xs uppercase font-bold">El Método Elite</span>
            </div>
            <h1 className="font-headline text-6xl lg:text-8xl font-black leading-[0.9] tracking-tighter mb-8 uppercase italic">
              TRANSFORMA TUS <span className="text-[#c1ed00]">HÁBITOS</span>,<br />
              NO SOLO TU <span className="text-[#00e3fd]">PESO.</span>
            </h1>
            <p className="font-body text-xl text-on-surface-variant leading-relaxed mb-10 border-l-4 border-[#c1ed00] pl-6">
              Un método holístico de <span className="text-white font-bold italic">Alejandro Gerez</span>, ex participante de Cuestión de Peso y creador de PMVM. Coaching de alto rendimiento para el profesional moderno.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <Link
                href={`/${locale}/register`}
                className="bg-primary-container text-on-primary-fixed px-8 lg:px-10 py-5 font-headline font-black text-base lg:text-lg tracking-widest uppercase hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
              >
                COMENZAR MI R3SET
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
              <a
                href="#methodology"
                className="border border-[#484847]/30 text-white px-8 lg:px-10 py-5 font-headline font-bold text-base lg:text-lg tracking-widest uppercase hover:bg-white/5 transition-all flex items-center justify-center gap-3"
              >
                LA METODOLOGÍA
              </a>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-6 lg:left-12 hidden md:flex flex-col items-center gap-4">
          <div className="w-[1px] h-20 bg-gradient-to-b from-[#c1ed00] to-transparent" />
        </div>
      </section>

      {/* ── Three Pillars ────────────────────────────────────────────── */}
      <section id="pillars" className="py-24 lg:py-32 bg-[#0e0e0e]">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="mb-16 lg:mb-20">
            <h2 className="font-headline text-4xl lg:text-5xl font-extrabold tracking-tighter uppercase mb-4 italic">LOS TRES PILARES</h2>
            <p className="text-on-surface-variant font-body text-lg max-w-xl">No solo contamos calorías. Reconstruimos la máquina humana a través de la convergencia de ciencia y psicología.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6 md:h-[700px]">
            {/* Psychology */}
            <div className="md:col-span-8 group relative overflow-hidden bg-surface-container-low p-8 lg:p-10 flex flex-col justify-end min-h-[300px]">
              <img
                src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&q=80&auto=format&fit=crop"
                alt="Psicología"
                className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-transparent to-transparent" />
              <div className="relative z-10">
                <span className="material-symbols-outlined text-[#ff734a] text-5xl mb-6 block">psychology</span>
                <h3 className="font-headline text-3xl lg:text-4xl font-black uppercase mb-4 tracking-tighter">Psicología</h3>
                <p className="font-body text-on-surface-variant text-base lg:text-lg max-w-md mb-8">
                  La base de todo cambio permanente. Desmantelamos los disparadores cognitivos que llevan a la regresión y los reemplazamos con marcos mentales de élite.
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="px-4 py-1 bg-[#ff5722]/20 text-[#ff9475] font-label text-xs uppercase font-bold rounded-full">Modelos Mentales</span>
                  <span className="px-4 py-1 bg-[#ff5722]/20 text-[#ff9475] font-label text-xs uppercase font-bold rounded-full">Hábitos</span>
                  <span className="px-4 py-1 bg-[#ff5722]/20 text-[#ff9475] font-label text-xs uppercase font-bold rounded-full">Detox Dopamina</span>
                </div>
              </div>
            </div>

            {/* Training */}
            <div className="md:col-span-4 group relative overflow-hidden bg-surface-container-high p-8 lg:p-10 flex flex-col justify-end min-h-[300px]">
              <img
                src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80&auto=format&fit=crop"
                alt="Entrenamiento"
                className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-high via-transparent to-transparent" />
              <div className="relative z-10">
                <span className="material-symbols-outlined text-[#c1ed00] text-5xl mb-6 block">fitness_center</span>
                <h3 className="font-headline text-3xl lg:text-4xl font-black uppercase mb-4 tracking-tighter">Entrenamiento</h3>
                <p className="font-body text-on-surface-variant text-base lg:text-lg mb-8">
                  Movimientos orientados al rendimiento, diseñados para la longevidad y la potencia explosiva.
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="px-4 py-1 bg-primary-container/10 text-[#c1ed00] font-label text-xs uppercase font-bold rounded-full">Fuerza</span>
                  <span className="px-4 py-1 bg-primary-container/10 text-[#c1ed00] font-label text-xs uppercase font-bold rounded-full">Movilidad</span>
                </div>
              </div>
            </div>

            {/* Nutrition */}
            <div className="md:col-span-12 group relative overflow-hidden bg-surface-container p-8 lg:p-10 flex items-center min-h-[250px]">
              <img
                src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1600&q=80&auto=format&fit=crop"
                alt="Nutrición"
                className="absolute inset-0 w-full h-full object-cover opacity-10 grayscale group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-surface-container via-surface-container/60 to-transparent" />
              <div className="relative z-10 grid md:grid-cols-2 gap-12 w-full items-center">
                <div>
                  <span className="material-symbols-outlined text-[#00e3fd] text-5xl mb-6 block">restaurant</span>
                  <h3 className="font-headline text-3xl lg:text-4xl font-black uppercase mb-4 tracking-tighter">Nutrición</h3>
                  <p className="font-body text-on-surface-variant text-base lg:text-lg max-w-md">
                    Alimentación para el estilo de vida que querés, no el que tenés. Planes bio-individuales que priorizan saciedad, energía y salud metabólica.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-black/40 p-6 border border-[#484847]/10">
                    <span className="font-label text-[#00e3fd] text-2xl font-black block mb-1">0%</span>
                    <span className="font-label text-[10px] text-on-surface-variant uppercase tracking-widest">Dietas Restrictivas</span>
                  </div>
                  <div className="bg-black/40 p-6 border border-[#484847]/10">
                    <span className="font-label text-[#00e3fd] text-2xl font-black block mb-1">100%</span>
                    <span className="font-label text-[10px] text-on-surface-variant uppercase tracking-widest">Sustentabilidad</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Methodology ─────────────────────────────────────────────── */}
      <section id="methodology" className="py-24 lg:py-32 bg-[#000000] relative">
        <div className="absolute left-0 top-0 w-32 h-full border-r border-[#484847]/10 hidden xl:block" />
        <div className="container mx-auto px-6 lg:px-12 xl:pl-44">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="aspect-[4/5] bg-surface-container overflow-hidden border border-[#484847]/10">
                <img
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80&auto=format&fit=crop"
                  alt="Alejandro Gerez entrenando"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 bg-primary-container p-10 hidden lg:block">
                <span className="font-headline text-6xl font-black text-on-primary-fixed leading-none">R3</span>
                <span className="font-label text-on-primary-fixed block text-sm font-bold tracking-[0.4em] mt-2">SYSTEM</span>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="font-headline text-5xl lg:text-6xl font-black tracking-tighter uppercase mb-10 leading-tight italic">
                RECODIFICÁ.<br />
                RECONSTRUÍ.<br />
                <span className="text-[#c1ed00]">R3SET.</span>
              </h2>
              <div className="space-y-10">
                {[
                  { num: '01', title: 'Fase Uno: Recodificación', desc: 'Identificamos los patrones subconscientes que frenan tu progreso. Aquí reparamos la mentalidad antes de tocar una sola pesa.' },
                  { num: '02', title: 'Fase Dos: Reconstrucción', desc: 'Introducción del protocolo de entrenamiento y la arquitectura nutricional. Construimos el cuerpo físico sobre el nuevo marco mental.' },
                  { num: '03', title: 'Fase Tres: R3SET', desc: 'Estabilización. Esto no es un desafío con fecha de fin — es tu nuevo estado de rendimiento base.' },
                ].map(({ num, title, desc }) => (
                  <div key={num} className="group">
                    <div className="flex items-center gap-6 mb-3">
                      <span className="text-4xl font-headline font-black text-white/20 group-hover:text-[#c1ed00] transition-colors">{num}</span>
                      <h4 className="text-xl font-headline font-bold uppercase tracking-tight">{title}</h4>
                    </div>
                    <p className="text-on-surface-variant font-body leading-relaxed pl-14">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ───────────────────────────────────────────────────── */}
      <section className="py-20 bg-surface-container-low">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
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

      {/* ── CTA ─────────────────────────────────────────────────────── */}
      <section id="cta" className="py-24 lg:py-40 container mx-auto px-6 lg:px-12 text-center">
        <div className="max-w-4xl mx-auto bg-primary-container text-on-primary-fixed p-12 lg:p-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
          <h2 className="font-headline text-4xl lg:text-7xl font-black tracking-tighter uppercase mb-6 relative z-10 italic">
            ¿LISTO PARA TU R3SET?
          </h2>
          <p className="font-body text-lg lg:text-xl mb-10 font-medium opacity-90 max-w-2xl mx-auto relative z-10">
            Unite al grupo exclusivo de profesionales que transformaron su vida con la metodología de Alejandro Gerez.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6 relative z-10">
            <Link
              href={`/${locale}/register`}
              className="bg-[#000000] text-white px-10 lg:px-12 py-5 lg:py-6 font-headline font-black text-lg lg:text-xl tracking-widest uppercase hover:scale-105 active:scale-95 transition-all"
            >
              EMPEZAR AHORA
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────── */}
      <footer className="bg-[#000000] py-16 lg:py-20 px-6 lg:px-12 border-t border-[#484847]/10">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 lg:gap-12">
          <div className="col-span-1 md:col-span-2">
            <span className="text-3xl lg:text-4xl font-extrabold text-[#D1FF26] font-headline tracking-widest uppercase mb-4 block">R3SET</span>
            <p className="text-on-surface-variant max-w-sm font-body mb-6 text-sm lg:text-base">
              Coaching de alto rendimiento por Alejandro Gerez. Metodología de élite para la transformación total de vida.
            </p>
          </div>
          <div>
            <h5 className="font-headline font-bold uppercase tracking-[0.2em] text-xs mb-6 text-white">Programas</h5>
            <ul className="space-y-3 font-body text-on-surface-variant text-sm">
              <li><a href="#" className="hover:text-[#c1ed00] transition-colors">Coaching Personal</a></li>
              <li><a href="#" className="hover:text-[#c1ed00] transition-colors">R3SET Grupal</a></li>
              <li><a href="#" className="hover:text-[#c1ed00] transition-colors">Rendimiento Corporativo</a></li>
              <li><a href="#" className="hover:text-[#c1ed00] transition-colors">Planes Nutricionales</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-headline font-bold uppercase tracking-[0.2em] text-xs mb-6 text-white">Legal</h5>
            <ul className="space-y-3 font-body text-on-surface-variant text-sm">
              <li><a href="#" className="hover:text-[#c1ed00] transition-colors">Términos de Servicio</a></li>
              <li><a href="#" className="hover:text-[#c1ed00] transition-colors">Política de Privacidad</a></li>
              <li><a href="#" className="hover:text-[#c1ed00] transition-colors">Aviso Médico</a></li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto mt-16 pt-8 border-t border-[#484847]/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-label text-[10px] text-neutral-600 uppercase tracking-widest">© 2025 METODO R3SET. BY ALEJANDRO GEREZ. TODOS LOS DERECHOS RESERVADOS.</p>
          <div className="flex gap-8 font-label text-[10px] text-neutral-600 uppercase tracking-widest">
            <span>EST. 2023</span>
            <span>ARGENTINA / GLOBAL</span>
          </div>
        </div>
      </footer>
    </>
  )
}
