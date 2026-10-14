import type { Metadata } from "next";
import { Roboto_Mono, Roboto_Serif } from "next/font/google";

import "./globals.css";

const robotoSans = Roboto_Serif({
	variable: "--font-roboto-sans",
	subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
	variable: "--font-roboto-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "tic-tac-toe",
	description:
		'created by following the official react.dev "Tutorial: Tic-Tac-Toe"',
};

export default function RootLayout({ children }: LayoutProps<"/">) {
	return (
		<html
			lang="en"
			className={`${robotoSans.variable} ${robotoMono.variable} h-full antialiased`}
		>
			<body className="min-h-full flex flex-col">{children}</body>
		</html>
	);
}
/*  */
