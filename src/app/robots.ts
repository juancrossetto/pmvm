import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.alegerezcoach.com'
  const locales = ['es', 'en', 'pt']

  const disallow = [
    '/auth',
    ...locales.flatMap((l) => [
      `/${l}/v4secret`,
      `/${l}/planes`,
      `/${l}/admin`,
      `/${l}/dashboard`,
      `/${l}/dashboard-legacy`,
      `/${l}/login`,
      `/${l}/register`,
      `/${l}/onboarding`,
      `/${l}/auth`,
      `/${l}/debug-session`,
    ]),
  ]

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow,
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
