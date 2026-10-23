import type { Metadata } from "next";
import {
	Noto_Sans_Symbols_2,
	Roboto_Mono,
	Roboto_Serif,
} from "next/font/google";

import "./globals.css";

const robotoMono = Roboto_Mono({
	variable: "--font-roboto-mono",
	subsets: ["latin"],
});

const robotoSans = Roboto_Serif({
	variable: "--font-roboto-sans",
	subsets: ["latin"],
});

const notoSansSymbols = Noto_Sans_Symbols_2({
	variable: "--font-noto-sans-symbols",
	weight: "400",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "your-files",
	description:
		"created to try out TypeScript union types, Reducers and Context",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
	return (
		<html
			lang="en"
			className={`${robotoMono.variable} ${robotoSans.variable} ${notoSansSymbols.variable} h-full antialiased`}
		>
			<head>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0"
				/>
				<link rel="stylesheet" href="https://unpkg.com/98.css" />
			</head>
			<body className="min-h-full flex flex-col justify-center-safe items-center py-10 md:px-10">
				{children}
			</body>
		</html>
	);
}
