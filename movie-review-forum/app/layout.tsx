import type { Metadata } from "next";
import { Noto_Sans_Symbols_2, Roboto_Mono, Roboto_Serif } from "next/font/google";

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
	title: "movie-review-forum",
	description: "created to try out interfaces in javascrpit and React useStates with filtering and interectavity",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
	return (
		<html
			lang="en"
			className={`${robotoMono.variable} ${robotoSans.variable} ${notoSansSymbols.variable} h-full antialiased`}
		>
			<body className="min-h-full flex flex-col text-center">{children}</body>
		</html>
	);
}
