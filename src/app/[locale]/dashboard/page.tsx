import { createClient } from '@/lib/supabase/server'
import ClientDashboardHome from '@/components/dashboard/ClientDashboardHome'

export default async function DashboardPage({ params }: { params: { locale: string } }) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const [
    { data: profile },
    { data: routines },
    { data: messages },
    { data: progress },
  ] = await Promise.all([
    supabase.from('profiles').select('full_name').eq('id', user!.id).single(),
    supabase.from('routines').select('id, name').eq('client_id', user!.id),
    supabase.from('messages').select('id').eq('client_id', user!.id).eq('read', false).eq('sender_role', 'admin'),
    supabase.from('progress').select('id, weight_kg, created_at').eq('client_id', user!.id).order('created_at', { ascending: false }).limit(5),
  ])

  return (
    <ClientDashboardHome
      locale={params.locale}
      displayName={profile?.full_name ?? user!.email?.split('@')[0] ?? 'Atleta'}
      routinesCount={routines?.length ?? 0}
      unreadMessages={messages?.length ?? 0}
      progressCount={progress?.length ?? 0}
      recentProgress={progress ?? []}
    />
  )
}
