'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Bebas_Neue, Inter } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'

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

export default function LoginPage({
  params,
}: {
  params: { locale: string }
}) {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const texts = {
    es: {
      title: 'Bienvenido',
      subtitle: 'Ingresá a tu área de cliente',
      email: 'Email',
      password: 'Contraseña',
      button: 'Ingresar',
      loading: 'Ingresando...',
      errorInvalid: 'Email o contraseña incorrectos.',
      errorGeneric: 'Ocurrió un error. Intentá de nuevo.',
      back: 'Volver al inicio',
      noAccount: '¿No tenés cuenta?',
      register: 'Registrarse',
    },
    en: {
      title: 'Welcome',
      subtitle: 'Sign in to your client area',
      email: 'Email',
      password: 'Password',
      button: 'Sign In',
      loading: 'Signing in...',
      errorInvalid: 'Invalid email or password.',
      errorGeneric: 'An error occurred. Please try again.',
      back: 'Back to home',
      noAccount: "Don't have an account?",
      register: 'Sign up',
    },
    pt: {
      title: 'Bem-vindo',
      subtitle: 'Acesse sua área de cliente',
      email: 'Email',
      password: 'Senha',
      button: 'Entrar',
      loading: 'Entrando...',
      errorInvalid: 'Email ou senha incorretos.',
      errorGeneric: 'Ocorreu um erro. Tente novamente.',
      back: 'Voltar ao início',
      noAccount: 'Não tem uma conta?',
      register: 'Cadastrar-se',
    },
  }

  const t = texts[params.locale as keyof typeof texts] ?? texts.es

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(
        error.message.includes('Invalid') ? t.errorInvalid : t.errorGeneric
      )
      setLoading(false)
      return
    }

    router.push(`/${params.locale}/dashboard`)
    router.refresh()
  }

  return (
    <div
      className={`${bebasNeue.variable} ${inter.variable} min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4`}
      style={{ fontFamily: 'var(--font-inter), sans-serif' }}
    >
      {/* Grid background */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,209,30,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,209,30,0.03) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Image
            src="/images/icon-yellow.png"
            alt="Logo"
            width={64}
            height={64}
            className="object-contain"
          />
        </div>

        {/* Card */}
        <div className="bg-[#141414] border border-white/10 rounded-2xl p-8">
          <h1
            className="text-4xl text-white mb-1"
            style={{ fontFamily: 'var(--font-bebas), sans-serif', letterSpacing: '0.03em' }}
          >
            {t.title}
          </h1>
          <p className="text-white/50 text-sm mb-8">{t.subtitle}</p>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-white/70 text-sm mb-1.5">{t.email}</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#ffd11e] transition-colors"
                placeholder="tu@email.com"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-white/70 text-sm mb-1.5">{t.password}</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#ffd11e] transition-colors"
                placeholder="••••••••"
              />
            </div>

            {/* Error */}
            {error && (
              <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-2">
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#ffd11e] text-black font-semibold py-3 rounded-lg hover:bg-[#e6bc1a] transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {loading ? t.loading : t.button}
            </button>
          </form>

          {/* Register link */}
          <p className="text-center text-white/40 text-sm mt-6">
            {t.noAccount}{' '}
            <Link href={`/${params.locale}/register`} className="text-[#ffd11e] hover:underline">
              {t.register}
            </Link>
          </p>
        </div>

        {/* Back link */}
        <div className="text-center mt-6">
          <Link
            href={`/${params.locale}/v3`}
            className="text-white/40 text-sm hover:text-white/70 transition-colors"
          >
            ← {t.back}
          </Link>
        </div>
      </div>
    </div>
  )
}
