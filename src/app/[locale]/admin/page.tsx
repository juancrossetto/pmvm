import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function AdminPage({ params }: { params: { locale: string } }) {
  const supabase = createClient()

  const [
    { count: totalClients },
    { count: unreadMessages },
    { data: recentClients },
    { data: recentProgress },
  ] = await Promise.all([
    supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'client'),
    supabase.from('messages').select('*', { count: 'exact', head: true }).eq('read', false).eq('sender_role', 'client'),
    supabase.from('profiles').select('id, full_name, created_at').eq('role', 'client').order('created_at', { ascending: false }).limit(5),
    supabase.from('progress').select('id, client_id, weight_kg, created_at, profiles(full_name)').order('created_at', { ascending: false }).limit(5),
  ])

  const stats = [
    { label: 'Clientes activos', value: totalClients ?? 0, icon: '👥', href: `/${params.locale}/admin/clients` },
    { label: 'Mensajes sin leer', value: unreadMessages ?? 0, icon: '💬', href: `/${params.locale}/admin/messages` },
    { label: 'Capacidad', value: `${totalClients ?? 0}/60`, icon: '📊', href: null },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl text-white" style={{ fontFamily: 'var(--font-bebas), sans-serif', letterSpacing: '0.03em' }}>
          Panel de control
        </h1>
        <p className="text-white/50 mt-1">Resumen general de tus clientes.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className={`bg-[#141414] border border-white/10 rounded-xl p-5 flex items-center gap-4 ${stat.href ? 'hover:border-[#ffd11e]/30 transition-colors' : ''}`}>
            {stat.href ? (
              <Link href={stat.href} className="flex items-center gap-4 w-full">
                <div className="text-3xl">{stat.icon}</div>
                <div>
                  <p className="text-3xl font-bold text-[#ffd11e]">{stat.value}</p>
                  <p className="text-white/50 text-sm">{stat.label}</p>
                </div>
              </Link>
            ) : (
              <>
                <div className="text-3xl">{stat.icon}</div>
                <div>
                  <p className="text-3xl font-bold text-[#ffd11e]">{stat.value}</p>
                  <p className="text-white/50 text-sm">{stat.label}</p>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Clientes recientes */}
        <div className="bg-[#141414] border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl text-white" style={{ fontFamily: 'var(--font-bebas), sans-serif', letterSpacing: '0.03em' }}>
              Clientes recientes
            </h2>
            <Link href={`/${params.locale}/admin/clients`} className="text-[#ffd11e] text-xs hover:underline">
              Ver todos →
            </Link>
          </div>
          {!recentClients || recentClients.length === 0 ? (
            <p className="text-white/40 text-sm">No hay clientes todavía.</p>
          ) : (
            <div className="space-y-3">
              {recentClients.map((client) => (
                <Link
                  key={client.id}
                  href={`/${params.locale}/admin/clients/${client.id}`}
                  className="flex items-center gap-3 hover:bg-white/5 rounded-lg px-2 py-2 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-[#ffd11e]/20 flex items-center justify-center text-[#ffd11e] font-bold text-sm flex-shrink-0">
                    {(client.full_name ?? 'C')[0].toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-white text-sm font-medium truncate">{client.full_name ?? 'Sin nombre'}</p>
                    <p className="text-white/40 text-xs">
                      {new Date(client.created_at).toLocaleDateString('es', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Último progreso cargado */}
        <div className="bg-[#141414] border border-white/10 rounded-xl p-6">
          <h2 className="text-2xl text-white mb-4" style={{ fontFamily: 'var(--font-bebas), sans-serif', letterSpacing: '0.03em' }}>
            Último progreso cargado
          </h2>
          {!recentProgress || recentProgress.length === 0 ? (
            <p className="text-white/40 text-sm">No hay registros de progreso todavía.</p>
          ) : (
            <div className="space-y-3">
              {recentProgress.map((p: any) => (
                <div key={p.id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                  <div>
                    <p className="text-white text-sm font-medium">{p.profiles?.full_name ?? 'Cliente'}</p>
                    <p className="text-white/40 text-xs">
                      {new Date(p.created_at).toLocaleDateString('es', { day: '2-digit', month: 'short' })}
                    </p>
                  </div>
                  <span className="text-[#ffd11e] font-bold text-sm">{p.weight_kg} kg</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
