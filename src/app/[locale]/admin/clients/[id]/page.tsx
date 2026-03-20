import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import AdminClientTabs from '@/components/admin/AdminClientTabs'
import Link from 'next/link'

export default async function AdminClientDetailPage({
  params,
}: {
  params: { locale: string; id: string }
}) {
  const supabase = createClient()

  const [
    { data: profile },
    { data: routines },
    { data: progress },
    { data: messages },
  ] = await Promise.all([
    supabase.from('profiles').select('*').eq('id', params.id).single(),
    supabase.from('routines').select('*, routine_exercises(*)').eq('client_id', params.id).order('created_at', { ascending: false }),
    supabase.from('progress').select('*').eq('client_id', params.id).order('created_at', { ascending: false }),
    supabase.from('messages').select('*').eq('client_id', params.id).order('created_at', { ascending: true }),
  ])

  if (!profile) notFound()

  // Marcar mensajes del cliente como leídos
  await supabase
    .from('messages')
    .update({ read: true })
    .eq('client_id', params.id)
    .eq('sender_role', 'client')
    .eq('read', false)

  return (
    <div className="space-y-6">
      {/* Back + header */}
      <div>
        <Link
          href={`/${params.locale}/admin/clients`}
          className="text-white/40 text-sm hover:text-white/70 transition-colors mb-4 inline-block"
        >
          ← Volver a clientes
        </Link>
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-[#ffd11e]/15 flex items-center justify-center text-[#ffd11e] font-bold text-2xl flex-shrink-0">
            {(profile.full_name ?? 'C')[0].toUpperCase()}
          </div>
          <div>
            <h1 className="text-4xl text-white" style={{ fontFamily: 'var(--font-bebas), sans-serif', letterSpacing: '0.03em' }}>
              {profile.full_name ?? 'Sin nombre'}
            </h1>
            <p className="text-white/50 text-sm">{profile.goal ?? 'Sin objetivo definido'}</p>
          </div>
        </div>
      </div>

      {/* Tabs con toda la gestión */}
      <AdminClientTabs
        clientId={params.id}
        locale={params.locale}
        routines={routines ?? []}
        progress={progress ?? []}
        messages={messages ?? []}
      />
    </div>
  )
}
