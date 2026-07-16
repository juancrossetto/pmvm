import { redirect } from 'next/navigation'
import { createClient, createAdminClient } from '@/lib/supabase/server'
import ClientSidebar from '@/components/dashboard/ClientSidebar'
import AdminPageTransition from '@/components/admin/AdminPageTransition'

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect(`/${locale}/login`)

  // Use admin client to bypass RLS for a reliable role check
  const { data: profile } = await createAdminClient()
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  // Admins don't belong here — send them to the admin panel
  if (profile?.role === 'admin') {
    redirect(`/${locale}/admin`)
  }

  // Safety net: si el cliente nunca completó el onboarding, mandarlo ahí primero
  if (!profile?.onboarding_completed) {
    redirect(`/${locale}/onboarding`)
  }

  // Si el locale de la URL no coincide con la preferencia guardada, corregir
  const validLocales = ['es', 'en', 'pt']
  const profileLocale = profile?.locale && validLocales.includes(profile.locale) ? profile.locale : null
  if (profileLocale && profileLocale !== locale) {
    redirect(`/${profileLocale}/dashboard`)
  }

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white font-body">
      <div className="flex h-screen overflow-hidden">
        <ClientSidebar locale={locale} profile={profile} userEmail={user.email ?? ''} />
        <main className="flex-1 overflow-y-auto hide-scrollbar pb-16 md:pb-0">
          <AdminPageTransition>
            {children}
          </AdminPageTransition>
        </main>
      </div>
    </div>
  )
}
