import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import AdminDashboardClient from '@/components/admin/AdminDashboardClient'

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
    <AdminDashboardClient
      locale={locale}
      totalClients={totalClients ?? 0}
      unreadMessages={unreadMessages ?? 0}
      recentClients={recentClients ?? []}
      recentProgress={recentProgress ?? []}
    />
  )
}
