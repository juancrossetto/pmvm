import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function AdminSubscriptionsPage({ params }: { params: { locale: string } }) {
  const supabase = createClient()

  // Traer todas las suscripciones con info del usuario y plan
  const { data: subs } = await supabase
    .from('subscriptions')
    .select(`
      id,
      status,
      plan_id,
      mp_payment_id,
      started_at,
      expires_at,
      created_at,
      plans(name, duration_days),
      profiles!user_id(full_name, phone)
    `)
    .order('created_at', { ascending: false })
    .limit(100)

  // Stats
  const total = subs?.length ?? 0
  const active = subs?.filter(s => s.status === 'active').length ?? 0
  const pending = subs?.filter(s => s.status === 'pending').length ?? 0
  const expired = subs?.filter(s => s.status === 'expired').length ?? 0

  const statusColor: Record<string, string> = {
    active: '#c1ed00',
    pending: '#ffcc00',
    expired: '#ff4444',
    cancelled: '#888',
  }
  const statusLabel: Record<string, string> = {
    active: 'Activa',
    pending: 'Pendiente',
    expired: 'Vencida',
    cancelled: 'Cancelada',
  }

  return (
    <div className="bg-[#0e0e0e] min-h-screen text-white px-6 lg:px-10 py-10 max-w-6xl mx-auto">

      {/* Header */}
      <div className="mb-10 flex items-center justify-between flex-wrap gap-4">
        <div>
          <Link
            href={`/${params.locale}/admin`}
            className="text-white/30 hover:text-white text-xs transition-colors mb-3 inline-block"
          >
            ← Admin
          </Link>
          <h1 className="text-4xl font-black tracking-tighter">
            SUSCRIPCIONES<br />
            <span className="text-[#c1ed00]">& PAGOS.</span>
          </h1>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        {[
          { label: 'Total', value: total, color: '#ffffff' },
          { label: 'Activas', value: active, color: '#c1ed00' },
          { label: 'Pendientes', value: pending, color: '#ffcc00' },
          { label: 'Vencidas', value: expired, color: '#ff4444' },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white/3 border border-white/8 rounded-xl p-4">
            <p className="text-[10px] uppercase tracking-widest text-white/30 mb-1">{label}</p>
            <p className="text-3xl font-black" style={{ color }}>{value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white/3 border border-white/8 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/8">
                <th className="text-left px-4 py-3 text-[10px] uppercase tracking-widest text-white/30 font-normal">Cliente</th>
                <th className="text-left px-4 py-3 text-[10px] uppercase tracking-widest text-white/30 font-normal">Plan</th>
                <th className="text-left px-4 py-3 text-[10px] uppercase tracking-widest text-white/30 font-normal">Estado</th>
                <th className="text-left px-4 py-3 text-[10px] uppercase tracking-widest text-white/30 font-normal">Inicio</th>
                <th className="text-left px-4 py-3 text-[10px] uppercase tracking-widest text-white/30 font-normal">Vence</th>
                <th className="text-left px-4 py-3 text-[10px] uppercase tracking-widest text-white/30 font-normal">Días rest.</th>
                <th className="text-left px-4 py-3 text-[10px] uppercase tracking-widest text-white/30 font-normal">Pago MP</th>
              </tr>
            </thead>
            <tbody>
              {!subs || subs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-white/30 text-sm">
                    No hay suscripciones todavía
                  </td>
                </tr>
              ) : (
                subs.map((sub: any) => {
                  const now = new Date()
                  const expiresAt = sub.expires_at ? new Date(sub.expires_at) : null
                  const daysRemaining = expiresAt
                    ? Math.max(0, Math.ceil((expiresAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)))
                    : null
                  const profile = Array.isArray(sub.profiles) ? sub.profiles[0] : sub.profiles
                  const plan = Array.isArray(sub.plans) ? sub.plans[0] : sub.plans

                  return (
                    <tr key={sub.id} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                      <td className="px-4 py-3">
                        <p className="font-medium text-white">{profile?.full_name ?? '—'}</p>
                        {profile?.phone && (
                          <p className="text-[10px] text-white/30">{profile.phone}</p>
                        )}
                      </td>
                      <td className="px-4 py-3 text-white/70">{plan?.name ?? sub.plan_id}</td>
                      <td className="px-4 py-3">
                        <span
                          className="inline-block text-[10px] font-black px-2 py-0.5 rounded-full"
                          style={{
                            backgroundColor: `${statusColor[sub.status] ?? '#888'}20`,
                            color: statusColor[sub.status] ?? '#888',
                          }}
                        >
                          {statusLabel[sub.status] ?? sub.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-white/50 text-xs">
                        {sub.started_at
                          ? new Date(sub.started_at).toLocaleDateString('es-AR', { day: '2-digit', month: 'short', year: '2-digit' })
                          : '—'}
                      </td>
                      <td className="px-4 py-3 text-white/50 text-xs">
                        {expiresAt
                          ? expiresAt.toLocaleDateString('es-AR', { day: '2-digit', month: 'short', year: '2-digit' })
                          : '—'}
                      </td>
                      <td className="px-4 py-3">
                        {daysRemaining !== null && sub.status === 'active' ? (
                          <span
                            className="font-black text-sm"
                            style={{
                              color: daysRemaining <= 7 ? '#ff734a' : daysRemaining <= 14 ? '#ffcc00' : '#c1ed00',
                            }}
                          >
                            {daysRemaining}d
                          </span>
                        ) : (
                          <span className="text-white/20">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {sub.mp_payment_id ? (
                          <span className="text-xs text-white/30 font-mono">{sub.mp_payment_id}</span>
                        ) : (
                          <span className="text-white/20 text-xs">—</span>
                        )}
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}
