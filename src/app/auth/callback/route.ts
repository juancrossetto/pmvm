import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/'

  // Detectar locale del header o default a 'es'
  const acceptLanguage = request.headers.get('accept-language') ?? ''
  const locale = acceptLanguage.startsWith('en')
    ? 'en'
    : acceptLanguage.startsWith('pt')
    ? 'pt'
    : 'es'

  if (code) {
    const cookieStore = cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() { return cookieStore.getAll() },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          },
        },
      }
    )

    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      // Redirige a la página de confirmación con el locale correcto
      return NextResponse.redirect(`${origin}/${locale}/auth/confirm`)
    }
  }

  // Si algo falla, va al login
  return NextResponse.redirect(`${origin}/${locale}/login`)
}
