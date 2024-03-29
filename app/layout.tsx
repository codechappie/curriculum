import { siteConfig } from "@/config/site";
import "@/styles/globals.css";
import clsx from "clsx";
import { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Providers } from "./providers";
const poppinsFont = Poppins({
	subsets: ["latin"],
	weight: ["500", "600", "700"]
});

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s - ${siteConfig.name}`,
	},
	description: siteConfig.description,
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "white" },
		{ media: "(prefers-color-scheme: dark)", color: "black" },
	],
	icons: {
		icon: "/favicon.ico",
		shortcut: "/favicon-16x16.png",
		apple: "/apple-touch-icon.png",
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head />
			<body
				className={clsx(
					"min-h-screen bg-background font-poppins",
					poppinsFont.className
				)}
			>

				<Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
						{children}
				</Providers>

			</body>
		</html>
	);
}
