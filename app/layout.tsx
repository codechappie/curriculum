import "@/styles/globals.css";
import clsx from "clsx";
import { Poppins } from "next/font/google";
import { Providers } from "./providers";
const poppinsFont = Poppins({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"]
});



export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<meta name="theme-color" content="black" />
				<meta media="(prefers-color-scheme: light)" name="theme-color" content="white" />
				<link rel="icon" href="/favicon.ico" />
				<link rel="shortcut icon" href="/favicon-16x16.png" />
				<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
				<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1" />
				<script src="https://cdn.jsdelivr.net/npm/js-confetti@0.9.0/dist/js-confetti.browser.js"></script>
			</head>
			<body
				className={clsx(
					"bg-background font-poppins",
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
