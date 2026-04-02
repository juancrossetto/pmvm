'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { CheckCircle } from 'lucide-react'

const texts = {
  es: {
    title: 'CREAR',
    titleAccent: 'CUENTA.',
    subtitle: 'Registrate para acceder a tu área de cliente.',
    name: 'Nombre completo',
    email: 'Email',
    phone: 'WhatsApp / Teléfono',
    phonePlaceholder: '+54 9 11 1234 5678',
    phoneHint: 'Para recibir confirmaciones y novedades por WhatsApp',
    password: 'Contraseña',
    passwordHint: 'Mínimo 8 caracteres',
    button: 'CREAR CUENTA',
    loading: 'Creando cuenta...',
    successTitle: 'REVISÁ TU',
    successAccent: 'EMAIL.',
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
    title: 'CREATE',
    titleAccent: 'ACCOUNT.',
    subtitle: 'Sign up to access your client area.',
    name: 'Full name',
    email: 'Email',
    phone: 'WhatsApp / Phone',
    phonePlaceholder: '+1 555 123 4567',
    phoneHint: 'To receive confirmations and updates via WhatsApp',
    password: 'Password',
    passwordHint: 'At least 8 characters',
    button: 'CREATE ACCOUNT',
    loading: 'Creating account...',
    successTitle: 'CHECK YOUR',
    successAccent: 'EMAIL.',
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
    title: 'CRIAR',
    titleAccent: 'CONTA.',
    subtitle: 'Cadastre-se para acessar sua área de cliente.',
    name: 'Nome completo',
    email: 'Email',
    phone: 'WhatsApp / Telefone',
    phonePlaceholder: '+55 11 91234-5678',
    phoneHint: 'Para receber confirmações e novidades via WhatsApp',
    password: 'Senha',
    passwordHint: 'Mínimo 8 caracteres',
    button: 'CRIAR CONTA',
    loading: 'Criando conta...',
    successTitle: 'VERIFIQUE SEU',
    successAccent: 'EMAIL.',
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
  const [phone, setPhone] = useState('')
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
        data: { full_name: fullName, phone: phone.trim() || null },
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

    setSuccess(true)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#0e0e0e] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Ambient glows */}
      <div className="fixed top-0 left-1/2 w-[500px] h-[500px] bg-[#c1ed00]/[0.04] blur-[160px] rounded-full -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[400px] h-[400px] bg-[#ff734a]/[0.03] blur-[140px] rounded-full translate-y-1/2 translate-x-1/3 pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-10">
          <p className="text-xs font-black tracking-[0.3em] text-[#c1ed00] mb-4">R3SET</p>

          {success ? (
            <>
              <div className="flex justify-center mb-5">
                <div className="w-16 h-16 rounded-full bg-[#c1ed00]/10 flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-[#c1ed00]" />
                </div>
              </div>
              <h1 className="text-5xl font-black tracking-tighter text-white leading-none">
                {t.successTitle}<br />
                <span className="text-[#c1ed00] italic">{t.successAccent}</span>
              </h1>
            </>
          ) : (
            <h1 className="text-5xl font-black tracking-tighter text-white leading-none">
              {t.title}<br />
              <span className="text-[#c1ed00] italic">{t.titleAccent}</span>
            </h1>
          )}

          <p className="text-white/40 text-sm mt-3">
            {success ? t.successText(email) : t.subtitle}
          </p>
        </div>

        {success ? (
          /* Success — link to login */
          <div className="text-center">
            <Link
              href={`/${params.locale}/login`}
              className="inline-block px-8 py-3.5 bg-[#c1ed00] text-[#0e0e0e] font-black text-sm tracking-widest rounded-xl hover:bg-[#d4ff00] transition-colors"
            >
              IR A INICIAR SESIÓN
            </Link>
          </div>
        ) : (
          /* Form */
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
            <form onSubmit={handleRegister} className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-2 font-bold">
                  {t.name}
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#c1ed00]/50 transition-colors"
                  placeholder="Juan Pérez"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-2 font-bold">
                  {t.email}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#c1ed00]/50 transition-colors"
                  placeholder="tu@email.com"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-2 font-bold">
                  {t.phone}
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#c1ed00]/50 transition-colors"
                  placeholder={t.phonePlaceholder}
                />
                <p className="text-white/20 text-xs mt-1.5 px-1">{t.phoneHint}</p>
              </div>

              {/* Password */}
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-2 font-bold">
                  {t.password}
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3.5 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#c1ed00]/50 transition-colors"
                  placeholder="••••••••"
                />
                <p className="text-white/20 text-xs mt-1.5 px-1">{t.passwordHint}</p>
              </div>

              {/* Error */}
              {error && (
                <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-2.5">
                  {error}
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#c1ed00] text-[#0e0e0e] font-black py-3.5 rounded-xl hover:bg-[#d4ff00] transition-colors disabled:opacity-60 disabled:cursor-not-allowed text-sm tracking-widest mt-1"
              >
                {loading ? t.loading : t.button}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-white/8" />
              <span className="text-[10px] text-white/20 uppercase tracking-widest">o</span>
              <div className="flex-1 h-px bg-white/8" />
            </div>

            {/* Login link */}
            <p className="text-center text-white/40 text-sm">
              {t.hasAccount}{' '}
              <Link href={`/${params.locale}/login`} className="text-[#c1ed00] font-bold hover:underline">
                {t.login}
              </Link>
            </p>
          </div>
        )}

        {/* Back link */}
        <div className="text-center mt-8">
          <Link
            href={`/${params.locale}`}
            className="text-white/25 text-sm hover:text-white/50 transition-colors"
          >
            ← {t.back}
          </Link>
        </div>
      </div>
    </div>
  )
}
