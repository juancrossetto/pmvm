'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}
const card = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: 'easeOut' } },
}
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] },
})

interface Props {
  locale: string
  displayName: string
  routinesCount: number
  unreadMessages: number
  progressCount: number
  recentProgress: any[]
}

export default function ClientDashboardHome({
  locale, displayName, routinesCount, unreadMessages, progressCount, recentProgress,
}: Props) {
  const stats = [
    { icon: 'fitness_center', color: '#c1ed00', label: 'Rutinas Activas',   value: routinesCount,   href: `/${locale}/dashboard/routines` },
    { icon: 'chat',           color: '#00e3fd', label: 'Mensajes del Coach', value: unreadMessages,  href: `/${locale}/dashboard/messages` },
    { icon: 'monitoring',     color: '#ff734a', label: 'Registros de Peso',  value: progressCount,   href: `/${locale}/dashboard/progress` },
  ]

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Buenos días' : hour < 19 ? 'Buenas tardes' : 'Buenas noches'

  return (
    <div className="bg-[#0e0e0e] min-h-screen text-white relative overflow-hidden">
      {/* Ambient */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-[#c1ed00]/5 blur-[140px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-[#00e3fd]/4 blur-[140px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="relative z-10 px-6 lg:px-10 py-10 max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <motion.p className="font-label text-[10px] uppercase tracking-[0.25em] text-white/30 mb-1" {...fadeUp(0.1)}>
            {greeting}
          </motion.p>
          <motion.h1
            className="font-headline font-black text-5xl lg:text-6xl tracking-tighter leading-none"
            {...fadeUp(0.2)}
          >
            {displayName.split(' ')[0].toUpperCase()}<br />
            <span className="text-[#c1ed00] italic">R3SET.</span>
          </motion.h1>
          <motion.div
            className="mt-5 h-px bg-gradient-to-r from-[#c1ed00]/40 via-white/10 to-transparent"
            initial={{ scaleX: 0, transformOrigin: 'left' }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
        </div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          {stats.map(({ icon, color, label, value, href }) => (
            <motion.div
              key={label}
              variants={card}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                href={href}
                className="block bg-surface-container-low p-6 relative overflow-hidden group hover:bg-surface-container-high transition-colors duration-300"
              >
                <span
                  className="material-symbols-outlined text-3xl mb-3 block"
                  style={{ color, fontVariationSettings: "'FILL' 1" }}
                >
                  {icon}
                </span>
                <p className="font-label text-[10px] text-white/30 uppercase tracking-widest mb-1">{label}</p>
                <p className="font-headline font-black text-4xl text-white">{value}</p>
                <div className="absolute -bottom-3 -right-3 text-white/[0.04] font-black text-7xl font-headline select-none pointer-events-none">
                  {value}
                </div>
                <div className="mt-3 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm" style={{ color }}>arrow_forward</span>
                  <span className="font-label text-[10px] uppercase tracking-widest" style={{ color }}>Ver más</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Recent progress */}
        <motion.div
          className="bg-surface-container-low p-6 lg:p-8"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="font-label text-[10px] uppercase tracking-[0.2em] text-white/30 mb-1">Historial</p>
              <h3 className="font-headline text-lg font-bold uppercase tracking-tight">Mis Últimos Registros</h3>
            </div>
            <Link href={`/${locale}/dashboard/progress`} className="font-label text-[10px] uppercase tracking-widest text-[#c1ed00] hover:underline">
              Ver todo →
            </Link>
          </div>

          {recentProgress.length === 0 ? (
            <motion.div
              className="flex flex-col items-center py-12 gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <span className="material-symbols-outlined text-4xl text-white/10">monitoring</span>
              <p className="font-label text-[10px] uppercase tracking-widest text-white/25">Todavía no hay registros</p>
              <Link
                href={`/${locale}/dashboard/progress`}
                className="mt-2 px-5 py-2.5 bg-[#cefc22] text-[#3b4a00] font-headline font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-opacity"
              >
                Registrar mi primer pesaje
              </Link>
            </motion.div>
          ) : (
            <motion.div
              className="space-y-2"
              variants={stagger}
              initial="hidden"
              animate="visible"
            >
              {recentProgress.map((p: any, i: number) => (
                <motion.div
                  key={p.id}
                  className="flex items-center gap-4 px-4 py-3 bg-[#0e0e0e]/60 hover:bg-[#0e0e0e] transition-colors group"
                  variants={card}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.15 }}
                >
                  <span className="material-symbols-outlined text-[#c1ed00] text-sm">trending_up</span>
                  <div className="flex-1">
                    <p className="font-label text-xs text-white">
                      {p.weight_kg ? `${p.weight_kg} kg` : 'Registro de progreso'}
                    </p>
                  </div>
                  <p className="font-label text-[10px] text-white/25">
                    {new Date(p.created_at).toLocaleDateString('es-AR', { day: '2-digit', month: 'short' })}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* Quick CTA */}
        <motion.div
          className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65 }}
        >
          <Link
            href={`/${locale}/dashboard/routines`}
            className="flex items-center justify-center gap-2 py-4 border border-[#c1ed00]/30 text-[#c1ed00] font-headline font-bold text-sm uppercase tracking-widest hover:bg-[#c1ed00]/5 transition-colors"
          >
            <span className="material-symbols-outlined text-sm">fitness_center</span>
            Ver mis rutinas
          </Link>
          <Link
            href={`/${locale}/dashboard/messages`}
            className="flex items-center justify-center gap-2 py-4 border border-[#00e3fd]/30 text-[#00e3fd] font-headline font-bold text-sm uppercase tracking-widest hover:bg-[#00e3fd]/5 transition-colors"
          >
            <span className="material-symbols-outlined text-sm">chat</span>
            Mensajes del coach
          </Link>
        </motion.div>

      </div>
    </div>
  )
}
