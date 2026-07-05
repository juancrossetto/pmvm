import type { Metadata } from 'next'
import { ThemeProvider } from "@/components/ui/theme-provider";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

export const metadata: Metadata = {
  title: 'METODO R3SET — Transformá tus hábitos, no solo tu peso',
  description: 'Programa de transformación integral basado en 3 pilares: Psicología, Entrenamiento y Nutrición. Coach certificado. Seguimiento real. Acceso inmediato.',
  keywords: ['fitness', 'coach', 'entrenamiento', 'nutrición', 'transformación', 'hábitos', 'metodo r3set'],
  authors: [{ name: 'Alejandro Gerez' }],
  openGraph: {
    title: 'METODO R3SET — Transformá tus hábitos, no solo tu peso',
    description: 'Programa de transformación integral. Psicología, Entrenamiento y Nutrición. Coach certificado con 12+ años de experiencia.',
    type: 'website',
    locale: 'es_AR',
    siteName: 'Metodo R3SET',
    images: [{ url: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=1200&q=80&auto=format&fit=crop', width: 1200, height: 630, alt: 'Metodo R3SET — Transformación' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'METODO R3SET — Transformá tus hábitos, no solo tu peso',
    description: 'Programa de transformación integral. Coach certificado. 3 pilares: Psicología, Entrenamiento y Nutrición.',
    images: ['https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=1200&q=80&auto=format&fit=crop'],
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
