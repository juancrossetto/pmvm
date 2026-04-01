import { createClient } from '@/lib/supabase/server'
import AdminClientsClient from '@/components/admin/AdminClientsClient'

export default async function AdminClientsPage({ params }: { params: { locale: string } }) {
  const supabase = createClient()

  const { data: clients } = await supabase
    .from('profiles')
    .select(`id, full_name, phone, goal, created_at, role,
      routines(id, active),
      messages(id, read, sender_role)`)
    .eq('role', 'client')
    .order('created_at', { ascending: false })

  // Fetch emails from auth.users via admin API
  const { data: { users } } = await supabase.auth.admin.listUsers()
  const emailMap: Record<string, string> = {}
  users?.forEach((u) => { emailMap[u.id] = u.email ?? '' })

  const clientsWithEmail = (clients ?? []).map((c: any) => ({
    ...c,
    email: emailMap[c.id] ?? '',
  }))

  return <AdminClientsClient locale={params.locale} clients={clientsWithEmail} />
}
