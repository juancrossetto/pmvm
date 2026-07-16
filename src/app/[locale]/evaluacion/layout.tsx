import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mentoría 1 a 1 con Ale Gerez | Método R3SET',
  description: 'Solicitá tu evaluación para la Mentoría 1 a 1: acompañamiento personalizado en entrenamiento, nutrición y hábitos con Ale Gerez.',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/es/evaluacion`,
  },
}

export default function EvaluacionLayout({ children }: { children: React.ReactNode }) {
  return children
}
