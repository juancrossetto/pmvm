import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function AdminPage({ params }: { params: { locale: string } }) {
  const supabase = createClient()
  const locale = params.locale

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

  return (
    <div className="bg-[#0e0e0e] min-h-screen text-white">
      {/* Ambient glows */}
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-[#c1ed00]/5 blur-[160px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-[#00e3fd]/4 blur-[160px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="relative z-10 px-6 lg:px-12 py-10 lg:py-12 max-w-7xl mx-auto">

        {/* Editorial header */}
        <div className="mb-10 lg:mb-12">
          <p className="font-label text-[10px] uppercase tracking-[0.2em] text-white/30 mb-2">Operational Overview</p>
          <h2 className="text-5xl lg:text-7xl font-headline font-black tracking-tighter text-white leading-none -ml-0.5">
            SYSTEM<br /><span className="text-[#c1ed00]">DASHBOARD</span>
          </h2>
        </div>

        {/* Bento Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mb-12">
          {/* Stat: Active Students */}
          <div className="bg-surface-container-low p-6 lg:p-8 relative overflow-hidden">
            <span className="material-symbols-outlined text-[#c1ed00] mb-4 text-3xl block" style={{ fontVariationSettings: "'FILL' 1" }}>group</span>
            <p className="font-label text-[10px] text-white/30 uppercase tracking-widest mb-1">Clientes Activos</p>
            <p className="text-5xl lg:text-6xl font-headline font-black text-white">{totalClients ?? 0}</p>
            <div className="mt-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#c1ed00] text-sm">trending_up</span>
              <Link href={`/${locale}/admin/clients`} className="font-label text-[10px] text-[#c1ed00] uppercase tracking-widest hover:underline">
                Ver todos →
              </Link>
            </div>
            <div className="absolute -bottom-4 -right-4 text-white/[0.04] font-black text-8xl font-headline pointer-events-none select-none">
              {totalClients ?? 0}
            </div>
          </div>

          {/* Stat: Unread Messages */}
          <div className="bg-surface-container-low p-6 lg:p-8 relative overflow-hidden">
            <span className="material-symbols-outlined text-[#00e3fd] mb-4 text-3xl block">chat</span>
            <p className="font-label text-[10px] text-white/30 uppercase tracking-widest mb-1">Mensajes sin leer</p>
            <p className="text-5xl lg:text-6xl font-headline font-black text-white">{String(unreadMessages ?? 0).padStart(2, '0')}</p>
            <div className="mt-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#00e3fd] text-sm">priority_high</span>
              <Link href={`/${locale}/admin/messages`} className="font-label text-[10px] text-[#00e3fd] uppercase tracking-widest hover:underline">
                {(unreadMessages ?? 0) > 0 ? 'Requiere atención →' : 'Ver mensajes →'}
              </Link>
            </div>
            <div className="absolute -bottom-4 -right-4 text-white/[0.04] font-black text-8xl font-headline pointer-events-none select-none">
              {String(unreadMessages ?? 0).padStart(2, '0')}
            </div>
          </div>

          {/* Stat: Progress this week */}
          <div className="bg-surface-container-low p-6 lg:p-8 relative overflow-hidden">
            <span className="material-symbols-outlined text-[#ff734a] mb-4 text-3xl block">monitoring</span>
            <p className="font-label text-[10px] text-white/30 uppercase tracking-widest mb-1">Registros de Progreso</p>
            <p className="text-5xl lg:text-6xl font-headline font-black text-white">{recentProgress?.length ?? 0}</p>
            <div className="mt-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#ff734a] text-sm">check_circle</span>
              <span className="font-label text-[10px] text-[#ff734a] uppercase tracking-widest">Últimos registros</span>
            </div>
            <div className="absolute -bottom-4 -right-4 text-white/[0.04] font-black text-8xl font-headline pointer-events-none select-none">
              {recentProgress?.length ?? 0}
            </div>
          </div>
        </div>

        {/* Activity + Clients grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">

          {/* Recent Progress — activity feed */}
          <section className="lg:col-span-8">
            <div className="flex justify-between items-center mb-5">
              <h4 className="text-xs font-headline font-bold uppercase tracking-widest text-white/30">Actividad Reciente · Progreso</h4>
              <span className="px-2 py-0.5 bg-white/5 text-[10px] font-label text-white/30 border border-white/5">Live</span>
            </div>
            <div className="space-y-3">
              {recentProgress && recentProgress.length > 0 ? (
                recentProgress.map((p: any) => (
                  <div key={p.id} className="group flex items-center justify-between p-5 lg:p-6 bg-surface-container-low hover:bg-surface-container hover:pl-8 transition-all duration-200">
                    <div className="flex items-center gap-4 lg:gap-6">
                      <div className="w-10 lg:w-12 h-10 lg:h-12 bg-white/5 flex items-center justify-center flex-shrink-0">
                        <span className="material-symbols-outlined text-[#c1ed00] text-xl">monitoring</span>
                      </div>
                      <div>
                        <p className="text-sm font-headline font-bold text-white uppercase tracking-tight">
                          {(p.profiles as any)?.full_name ?? 'Cliente'}
                        </p>
                        <p className="text-xs text-white/40 font-body mt-0.5">
                          {p.weight_kg ? `${p.weight_kg} kg registrado` : 'Nuevo registro de progreso'}
                        </p>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="text-[10px] font-label text-white/25 block mb-1">
                        {new Date(p.created_at).toLocaleDateString('es-AR', { day: '2-digit', month: 'short' })}
                      </span>
                      <span className="text-[10px] font-label text-[#c1ed00] uppercase px-2 py-0.5 border border-[#c1ed00]/20">
                        Progreso
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 bg-surface-container-low text-center">
                  <span className="material-symbols-outlined text-white/20 text-4xl block mb-3">monitoring</span>
                  <p className="text-white/30 font-body text-sm">No hay registros de progreso aún</p>
                </div>
              )}
            </div>
          </section>

          {/* Recent clients */}
          <aside className="lg:col-span-4 space-y-5">
            <div className="flex justify-between items-center mb-5">
              <h4 className="text-xs font-headline font-bold uppercase tracking-widest text-white/30">Nuevos Clientes</h4>
            </div>
            <div className="space-y-2">
              {recentClients && recentClients.length > 0 ? (
                recentClients.map((c: any) => (
                  <Link
                    key={c.id}
                    href={`/${locale}/admin/clients/${c.id}`}
                    className="flex items-center gap-4 p-4 bg-surface-container-low hover:bg-surface-container transition-all duration-200 group"
                  >
                    <div className="w-9 h-9 bg-[#cefc22] flex items-center justify-center text-[#3b4a00] font-black text-sm font-headline flex-shrink-0">
                      {c.full_name?.[0]?.toUpperCase() ?? '?'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-headline font-bold text-white uppercase tracking-tight truncate">{c.full_name}</p>
                      <p className="text-[10px] text-white/30 font-label">
                        {new Date(c.created_at).toLocaleDateString('es-AR')}
                      </p>
                    </div>
                    <span className="material-symbols-outlined text-white/20 group-hover:text-[#c1ed00] text-sm transition-colors">chevron_right</span>
                  </Link>
                ))
              ) : (
                <div className="p-6 bg-surface-container-low text-center">
                  <p className="text-white/30 font-body text-sm">No hay clientes aún</p>
                </div>
              )}
            </div>

            {/* Quick action */}
            <Link
              href={`/${locale}/admin/clients`}
              className="flex items-center justify-center gap-2 w-full py-4 bg-[#cefc22] text-[#3b4a00] font-headline font-black text-xs tracking-widest uppercase hover:opacity-90 active:scale-[0.98] transition-all mt-4"
            >
              <span className="material-symbols-outlined text-[18px]">group_add</span>
              Ver todos los clientes
            </Link>
          </aside>
        </div>
      </div>
    </div>
  )
}
