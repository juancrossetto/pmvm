import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import ClientSidebar from '@/components/dashboard/ClientSidebar'
import AdminPageTransition from '@/components/admin/AdminPageTransition'

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect(`/${params.locale}/login`)

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white font-body">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block"
      />
      <div className="flex h-screen overflow-hidden">
        <ClientSidebar locale={params.locale} profile={profile} userEmail={user.email ?? ''} />
        <main className="flex-1 overflow-y-auto hide-scrollbar">
          <AdminPageTransition>
            {children}
          </AdminPageTransition>
        </main>
      </div>
    </div>
  )
}
