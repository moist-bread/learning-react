import type { Metadata } from "next";
import { Roboto_Mono, Roboto_Serif } from "next/font/google";

import "./globals.css";

const robotoMono = Roboto_Mono({
	variable: "--font-roboto-mono",
	subsets: ["latin"],
});

const robotoSans = Roboto_Serif({
	variable: "--font-roboto-sans",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "fun-fact-hub",
	description: "created to try out the challenges given by the official react.dev \"Passing Props to a Component\" article",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
	return (
		<html
			lang="en"
			className={`${robotoMono.variable} ${robotoSans.variable} h-full antialiased`}
		>
			<body className="min-h-full flex flex-col justify-center-safe text-center mt-20">{children}</body>
		</html>
	);
}
// justify-center