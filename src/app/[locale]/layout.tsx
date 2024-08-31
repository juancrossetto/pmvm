
import { ThemeProvider } from "@/components/ui/theme-provider";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
// import { Inter } from "next/font/google";
// import "./globals.css";

// const inter = Inter({ subsets: ["latin"] });

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
			{/* <body className={inter.className}> */}
				<NextIntlClientProvider messages={messages}>
					{children}
				</NextIntlClientProvider>
			{/* </body> */}
			</ThemeProvider>
		</div>
	);
}
