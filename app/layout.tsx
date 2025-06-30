import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";

import "./styles/globals.css";

import "overlayscrollbars/overlayscrollbars.css";

const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin", "cyrillic"],
	weight: ["400", "500", "600", "700"],
	display: "swap",
	fallback: ["system-ui", "sans-serif"],
	adjustFontFallback: true,
});

export const metadata: Metadata = {
	title: "CSSKINSPACE",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${inter.variable}`}>
				<Suspense>{children}</Suspense>
			</body>
		</html>
	);
}
