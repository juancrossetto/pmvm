import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function AdminClientsPage({ params }: { params: { locale: string } }) {
  const supabase = createClient()

  const { data: clients } = await supabase
    .from('profiles')
    .select(`
      id, full_name, phone, goal, created_at,
      routines(id, active),
      messages(id, read, sender_role)
    `)
    .eq('role', 'client')
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl text-white" style={{ fontFamily: 'var(--font-bebas), sans-serif', letterSpacing: '0.03em' }}>
            Clientes
          </h1>
          <p className="text-white/50 mt-1">{clients?.length ?? 0} clientes registrados</p>
        </div>
      </div>

      {!clients || clients.length === 0 ? (
        <div className="bg-[#141414] border border-white/10 rounded-xl p-8 text-center">
          <p className="text-4xl mb-3">👥</p>
          <p className="text-white/40">No hay clientes registrados todavía.</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {clients.map((client: any) => {
            const activeRoutines = client.routines?.filter((r: any) => r.active).length ?? 0
            const unreadMsgs = client.messages?.filter((m: any) => !m.read && m.sender_role === 'client').length ?? 0

            return (
              <Link
                key={client.id}
                href={`/${params.locale}/admin/clients/${client.id}`}
                className="bg-[#141414] border border-white/10 rounded-xl p-5 flex items-center gap-4 hover:border-[#ffd11e]/30 transition-colors"
              >
                {/* Avatar */}
                <div className="w-11 h-11 rounded-full bg-[#ffd11e]/15 flex items-center justify-center text-[#ffd11e] font-bold text-lg flex-shrink-0">
                  {(client.full_name ?? 'C')[0].toUpperCase()}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold truncate">{client.full_name ?? 'Sin nombre'}</p>
                  <p className="text-white/40 text-sm truncate">{client.goal ?? 'Sin objetivo definido'}</p>
                </div>

                {/* Badges */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  {unreadMsgs > 0 && (
                    <span className="bg-[#ffd11e] text-black text-xs font-bold px-2 py-0.5 rounded-full">
                      {unreadMsgs} msg
                    </span>
                  )}
                  <span className="text-white/30 text-xs">
                    {activeRoutines} rutina{activeRoutines !== 1 ? 's' : ''}
                  </span>
                  <span className="text-white/20 text-xs">→</span>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
