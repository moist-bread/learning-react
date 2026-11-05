import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "your-files",
	description:
		"created to try out TypeScript union types, Reducers and Context",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
	return (
		<html lang="en" className={`h-full antialiased`}>
			<head>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0"
				/>
				<link rel="stylesheet" href="https://unpkg.com/98.css" />
			</head>
			<body className="flex min-h-full flex-col items-center justify-center-safe bg-(--light) py-5 md:px-5">
				{children}
			</body>
		</html>
	);
}
