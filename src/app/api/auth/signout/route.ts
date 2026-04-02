import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const supabase = createClient()
  await supabase.auth.signOut()

  // Detectar locale de la URL de referencia o usar 'es' por defecto
  const referer = req.headers.get('referer') ?? ''
  const localeMatch = referer.match(/localhost:\d+\/([a-z]{2})\//)
  const locale = localeMatch?.[1] ?? 'es'

  return NextResponse.redirect(new URL(`/${locale}/login`, req.url))
}
