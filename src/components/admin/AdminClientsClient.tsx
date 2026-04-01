'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState } from 'react'

const stagger = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.07 } } }
const row = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } } }

interface Client {
  id: string; full_name: string | null; email: string; phone: string | null
  goal: string | null; created_at: string
  routines: any[]; messages: any[]
}

interface Props { locale: string; clients: Client[] }

export default function AdminClientsClient({ locale, clients }: Props) {
  const [syncingId, setSyncingId] = useState<string | null>(null)
  const [syncedIds, setSyncedIds] = useState<Set<string>>(new Set())
  const [syncErrors, setSyncErrors] = useState<Set<string>>(new Set())

  async function syncToTrainerize(client: Client, e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    setSyncingId(client.id)
    try {
      const res = await fetch('/api/zapier/sync-client', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ full_name: client.full_name, email: client.email, phone: client.phone, goal: client.goal }),
      })
      if (res.ok) { setSyncedIds(prev => new Set(prev).add(client.id)) }
      else { setSyncErrors(prev => new Set(prev).add(client.id)) }
    } catch { setSyncErrors(prev => new Set(prev).add(client.id)) }
    setSyncingId(null)
  }

  return (
    <div className="bg-[#0e0e0e] min-h-screen px-6 lg:px-12 py-10 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div className="mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <p className="font-label text-[10px] uppercase tracking-[0.2em] text-white/30 mb-1">Gestión</p>
        <h1 className="font-headline text-5xl lg:text-6xl font-black tracking-tighter leading-none">
          CLIENTES<br /><span className="text-[#c1ed00] text-3xl lg:text-4xl italic">BASE DE DATOS</span>
        </h1>
        <motion.div className="mt-4 h-px bg-gradient-to-r from-[#c1ed00]/40 via-white/10 to-transparent"
          initial={{ scaleX: 0, transformOrigin: 'left' }} animate={{ scaleX: 1 }} transition={{ delay: 0.3, duration: 0.7 }} />
        <p className="mt-3 font-label text-[10px] text-white/30 uppercase tracking-widest">
          {clients.length} cliente{clients.length !== 1 ? 's' : ''} registrado{clients.length !== 1 ? 's' : ''} ·
          <span className="text-[#00e3fd] ml-2">Sync via Zapier → Trainerize</span>
        </p>
      </motion.div>

      {clients.length === 0 ? (
        <motion.div className="bg-surface-container-low p-16 flex flex-col items-center gap-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <span className="material-symbols-outlined text-5xl text-white/10">group</span>
          <p className="font-label text-[10px] uppercase tracking-widest text-white/30">No hay clientes registrados todavía</p>
        </motion.div>
      ) : (
        <motion.div className="space-y-2" variants={stagger} initial="hidden" animate="visible">
          {clients.map((client) => {
            const activeRoutines = client.routines?.filter((r: any) => r.active).length ?? 0
            const unreadMsgs = client.messages?.filter((m: any) => !m.read && m.sender_role === 'client').length ?? 0
            const initials = (client.full_name ?? 'C').split(' ').map((w: string) => w[0]).join('').toUpperCase().slice(0, 2)
            const isSynced = syncedIds.has(client.id)
            const isError = syncErrors.has(client.id)
            const isSyncing = syncingId === client.id

            return (
              <motion.div key={client.id} variants={row} whileHover={{ x: 3 }} transition={{ duration: 0.15 }}>
                <Link
                  href={`/${locale}/admin/clients/${client.id}`}
                  className="flex items-center gap-4 bg-surface-container-low p-4 lg:p-5 hover:bg-surface-container-high transition-colors duration-200 group"
                >
                  {/* Avatar */}
                  <div className="w-10 h-10 bg-[#c1ed00] flex items-center justify-center text-[#3b4a00] font-headline font-black text-sm flex-shrink-0">
                    {initials}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-label text-sm text-white font-bold truncate">{client.full_name ?? 'Sin nombre'}</p>
                    <p className="font-label text-[10px] text-white/30 truncate">{client.email || 'Sin email'}</p>
                    {client.goal && (
                      <p className="font-label text-[10px] text-white/20 truncate mt-0.5">{client.goal}</p>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="hidden md:flex items-center gap-6 flex-shrink-0">
                    <div className="text-center">
                      <p className="font-headline font-black text-lg text-white">{activeRoutines}</p>
                      <p className="font-label text-[9px] uppercase tracking-widest text-white/30">rutinas</p>
                    </div>
                    {unreadMsgs > 0 && (
                      <div className="bg-[#00e3fd]/15 px-2 py-1 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[#00e3fd] text-sm">chat</span>
                        <span className="font-label text-[10px] text-[#00e3fd] font-bold">{unreadMsgs}</span>
                      </div>
                    )}
                  </div>

                  {/* Trainerize Sync button */}
                  <button
                    onClick={(e) => syncToTrainerize(client, e)}
                    disabled={isSyncing}
                    className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-2 font-label text-[9px] uppercase tracking-widest transition-all duration-200 ${
                      isSynced
                        ? 'bg-[#c1ed00]/10 text-[#c1ed00] cursor-default'
                        : isError
                        ? 'bg-red-500/15 text-red-400'
                        : 'bg-white/5 text-white/40 hover:bg-[#00e3fd]/15 hover:text-[#00e3fd]'
                    }`}
                    title="Sincronizar a Trainerize"
                  >
                    {isSyncing ? (
                      <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>
                    ) : isSynced ? (
                      <span className="material-symbols-outlined text-sm">check_circle</span>
                    ) : isError ? (
                      <span className="material-symbols-outlined text-sm">error</span>
                    ) : (
                      <span className="material-symbols-outlined text-sm">sync</span>
                    )}
                    <span className="hidden lg:inline">
                      {isSyncing ? 'Sincronizando...' : isSynced ? 'Sincronizado' : isError ? 'Error' : 'Sync'}
                    </span>
                  </button>

                  <span className="material-symbols-outlined text-white/20 group-hover:text-white/50 transition-colors flex-shrink-0">arrow_forward</span>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      )}
    </div>
  )
}
