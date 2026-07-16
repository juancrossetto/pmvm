import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Elegí tu Plan | Método R3SET',
  description: 'Sumate a Método R3SET: planes de entrenamiento online con seguimiento, nutrición y psicología incluidos. Empezá hoy.',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/es/checkout`,
  },
}

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return children
}
