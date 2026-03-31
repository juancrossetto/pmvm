import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import DashboardSidebar from '@/components/dashboard/DashboardSidebar'
import { Bebas_Neue, Inter } from 'next/font/google'

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-bebas',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
})

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect(`/${params.locale}/login`)
  }

  // Obtener perfil del usuario
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return (
    <div
      className={`${bebasNeue.variable} ${inter.variable} min-h-screen bg-[#0a0a0a] text-white`}
      style={{ fontFamily: 'var(--font-inter), sans-serif' }}
    >
      <div className="flex h-screen overflow-hidden">
        <DashboardSidebar locale={params.locale} user={user} profile={profile} />
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
