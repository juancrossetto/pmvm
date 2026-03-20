'use client'

import { useState } from 'react'
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

const texts = {
  es: {
    title: 'Crear cuenta',
    subtitle: 'Registrate para acceder a tu área de cliente.',
    name: 'Nombre completo',
    email: 'Email',
    password: 'Contraseña',
    passwordHint: 'Mínimo 8 caracteres',
    button: 'Crear cuenta',
    loading: 'Creando cuenta...',
    successTitle: '¡Revisá tu email!',
    successText: (email: string) =>
      `Te enviamos un link de confirmación a ${email}. Hacé click en el link para activar tu cuenta.`,
    errorGeneric: 'Ocurrió un error. Intentá de nuevo.',
    errorEmail: 'Este email ya está registrado.',
    errorPassword: 'La contraseña debe tener al menos 8 caracteres.',
    hasAccount: '¿Ya tenés cuenta?',
    login: 'Iniciar sesión',
    back: 'Volver al inicio',
  },
  en: {
    title: 'Create account',
    subtitle: 'Sign up to access your client area.',
    name: 'Full name',
    email: 'Email',
    password: 'Password',
    passwordHint: 'At least 8 characters',
    button: 'Create account',
    loading: 'Creating account...',
    successTitle: 'Check your email!',
    successText: (email: string) =>
      `We sent a confirmation link to ${email}. Click the link to activate your account.`,
    errorGeneric: 'An error occurred. Please try again.',
    errorEmail: 'This email is already registered.',
    errorPassword: 'Password must be at least 8 characters.',
    hasAccount: 'Already have an account?',
    login: 'Sign in',
    back: 'Back to home',
  },
  pt: {
    title: 'Criar conta',
    subtitle: 'Cadastre-se para acessar sua área de cliente.',
    name: 'Nome completo',
    email: 'Email',
    password: 'Senha',
    passwordHint: 'Mínimo 8 caracteres',
    button: 'Criar conta',
    loading: 'Criando conta...',
    successTitle: 'Verifique seu email!',
    successText: (email: string) =>
      `Enviamos um link de confirmação para ${email}. Clique no link para ativar sua conta.`,
    errorGeneric: 'Ocorreu um erro. Tente novamente.',
    errorEmail: 'Este email já está cadastrado.',
    errorPassword: 'A senha deve ter pelo menos 8 caracteres.',
    hasAccount: 'Já tem uma conta?',
    login: 'Entrar',
    back: 'Voltar ao início',
  },
}

export default function RegisterPage({ params }: { params: { locale: string } }) {
  const t = texts[params.locale as keyof typeof texts] ?? texts.es

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (password.length < 8) {
      setError(t.errorPassword)
      return
    }

    setLoading(true)
    const supabase = createClient()

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/${params.locale}/auth/confirm`,
      },
    })

    if (error) {
      if (error.message.toLowerCase().includes('already')) {
        setError(t.errorEmail)
      } else {
        setError(t.errorGeneric)
      }
      setLoading(false)
      return
    }

    // Notificar a Zapier para crear el cliente en Trainerize (fire & forget)
    fetch('/api/zapier/new-client', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ full_name: fullName, email }),
    }).catch(() => {/* silencioso si falla */})

    setSuccess(true)
    setLoading(false)
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

        {success ? (
          /* Success state */
          <div className="bg-[#141414] border border-green-500/30 rounded-2xl p-8 text-center">
            <div className="text-5xl mb-4">📬</div>
            <h2
              className="text-3xl text-white mb-3"
              style={{ fontFamily: 'var(--font-bebas), sans-serif', letterSpacing: '0.03em' }}
            >
              {t.successTitle}
            </h2>
            <p className="text-white/60 text-sm leading-relaxed">
              {t.successText(email)}
            </p>
          </div>
        ) : (
          /* Form */
          <div className="bg-[#141414] border border-white/10 rounded-2xl p-8">
            <h1
              className="text-4xl text-white mb-1"
              style={{ fontFamily: 'var(--font-bebas), sans-serif', letterSpacing: '0.03em' }}
            >
              {t.title}
            </h1>
            <p className="text-white/50 text-sm mb-8">{t.subtitle}</p>

            <form onSubmit={handleRegister} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-white/70 text-sm mb-1.5">{t.name}</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#ffd11e] transition-colors"
                  placeholder="Juan Pérez"
                />
              </div>

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
                  minLength={8}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#ffd11e] transition-colors"
                  placeholder="••••••••"
                />
                <p className="text-white/30 text-xs mt-1.5 px-1">{t.passwordHint}</p>
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

            {/* Already have account */}
            <p className="text-center text-white/40 text-sm mt-6">
              {t.hasAccount}{' '}
              <Link
                href={`/${params.locale}/login`}
                className="text-[#ffd11e] hover:underline"
              >
                {t.login}
              </Link>
            </p>
          </div>
        )}

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
