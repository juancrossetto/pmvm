import { redirect } from 'next/navigation'

export default async function V4SecretRedirect({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  redirect(`/${locale}`)
}
