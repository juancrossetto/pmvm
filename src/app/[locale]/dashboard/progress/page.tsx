import { createClient } from '@/lib/supabase/server'
import ProgressClient from './ProgressClient'

export default async function ProgressPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: records } = await supabase
    .from('progress')
    .select('*')
    .eq('client_id', user!.id)
    .order('created_at', { ascending: true })

  return <ProgressClient locale={locale} records={records ?? []} userId={user!.id} />
}
