import Link from 'next/link'
import { Bebas_Neue, Inter } from 'next/font/google'
import Image from 'next/image'

const bebasNeue = Bebas_Neue({ subsets: ['latin'], weight: ['400'], variable: '--font-bebas' })
const inter = Inter({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'], variable: '--font-inter' })

const texts = {
  es: {
    title: '¡Cuenta activada!',
    subtitle: 'Tu email fue confirmado. Ya podés iniciar sesión.',
    button: 'Ir al login',
  },
  en: {
    title: 'Account activated!',
    subtitle: 'Your email has been confirmed. You can now sign in.',
    button: 'Go to login',
  },
  pt: {
    title: 'Conta ativada!',
    subtitle: 'Seu email foi confirmado. Agora você pode entrar.',
    button: 'Ir para o login',
  },
}

export default function ConfirmPage({ params }: { params: { locale: string } }) {
  const t = texts[params.locale as keyof typeof texts] ?? texts.es

  return (
    <div
      className={`${bebasNeue.variable} ${inter.variable} min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4`}
      style={{ fontFamily: 'var(--font-inter), sans-serif' }}
    >
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,209,30,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,209,30,0.03) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />
      <div className="w-full max-w-md relative z-10 text-center">
        <div className="flex justify-center mb-8">
          <Image src="/images/icon-yellow.png" alt="Logo" width={64} height={64} className="object-contain" />
        </div>
        <div className="bg-[#141414] border border-[#ffd11e]/30 rounded-2xl p-8">
          <div className="text-5xl mb-4">✅</div>
          <h1
            className="text-4xl text-white mb-3"
            style={{ fontFamily: 'var(--font-bebas), sans-serif', letterSpacing: '0.03em' }}
          >
            {t.title}
          </h1>
          <p className="text-white/60 text-sm mb-6">{t.subtitle}</p>
          <Link
            href={`/${params.locale}/login`}
            className="inline-block bg-[#ffd11e] text-black font-semibold py-3 px-8 rounded-lg hover:bg-[#e6bc1a] transition-colors"
          >
            {t.button}
          </Link>
        </div>
      </div>
    </div>
  )
}
