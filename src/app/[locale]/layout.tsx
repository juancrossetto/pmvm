import type { Metadata } from 'next'
import { ThemeProvider } from "@/components/ui/theme-provider";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

export const metadata: Metadata = {
  title: 'Entrenador Personal Online en Argentina | Método R3SET',
  description: 'Rutinas de entrenamiento y mentoría fitness 1 a 1 con acompañamiento real. Ganá masa muscular y cambiá tu alimentación con seguimiento personalizado.',
  keywords: ['fitness', 'coach', 'entrenamiento', 'nutrición', 'transformación', 'hábitos', 'metodo r3set'],
  authors: [{ name: 'Alejandro Gerez' }],
  openGraph: {
    title: 'Entrenador Personal Online en Argentina | Método R3SET',
    description: 'Rutinas de entrenamiento y mentoría fitness 1 a 1 con acompañamiento real. Ganá masa muscular y cambiá tu alimentación con seguimiento personalizado.',
    type: 'website',
    locale: 'es_AR',
    siteName: 'Metodo R3SET',
    images: [{ url: `${process.env.NEXT_PUBLIC_SITE_URL}/images/hero/hero2.webp`, width: 1200, height: 630, alt: 'Metodo R3SET — Transformación' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Entrenador Personal Online en Argentina | Método R3SET',
    description: 'Rutinas de entrenamiento y mentoría fitness 1 a 1 con acompañamiento real. Ganá masa muscular y cambiá tu alimentación con seguimiento personalizado.',
    images: [`${process.env.NEXT_PUBLIC_SITE_URL}/images/hero/hero2.webp`],
  },
  robots: { index: true, follow: true },
}

interface RootLayoutProps {
	children: React.ReactNode;
	params: {
		locale: string;
	};
}
export default async function RootLayout({
	children,
	params: { locale },
}: Readonly<RootLayoutProps>) {
	const messages = await getMessages();
	return (
		<div lang={locale}>
			<ThemeProvider
				attribute='class'
				defaultTheme='system'
				enableSystem
				disableTransitionOnChange
			>
				<NextIntlClientProvider messages={messages}>
					{children}
				</NextIntlClientProvider>
			</ThemeProvider>
		</div>
	);
}
