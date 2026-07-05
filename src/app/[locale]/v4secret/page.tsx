import { redirect } from 'next/navigation'

export default function V4SecretRedirect({ params }: { params: { locale: string } }) {
  redirect(`/${params.locale}`)
}
