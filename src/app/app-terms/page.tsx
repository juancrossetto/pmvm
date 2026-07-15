import type { Metadata } from 'next'
import AppTermsContent from './AppTermsContent'

export const metadata: Metadata = {
  title: 'Términos y Condiciones — R3SET',
  description: 'Términos y condiciones de uso de la aplicación móvil de Método R3SET.',
  robots: { index: false, follow: false },
}

export default function AppTermsPage() {
  return <AppTermsContent />
}
