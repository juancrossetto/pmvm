import type { Metadata } from 'next'
import AppTermsContent from './AppTermsContent'

export const metadata: Metadata = {
  title: 'Términos y Condiciones — R3SET',
  robots: { index: false, follow: false },
}

export default function AppTermsPage() {
  return <AppTermsContent />
}
