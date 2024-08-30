import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
import { Providers } from "./providers";

const fontHeading = Inter({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-heading",
});

const fontBody = Inter({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-body",
});

const poppins = Poppins({
	subsets: ['latin'],
	weight: ['400', '700'], // Puedes incluir otros pesos si lo necesitas
	variable: '--font-poppins', // Define una variable CSS para la fuente
  });

export const metadata: Metadata = {
	title: "PMVM",
	description: "Pesá menos, viví más",
  icons: {
    icon: "/favico.ico",
  },
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body
				className={cn("antialiased", fontHeading.variable, fontBody.variable, poppins.variable)}
			>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return children;
// }
