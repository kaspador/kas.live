import type { Metadata } from "next";
import { Rubik, Oswald, Lato } from "next/font/google";
import "./globals.css";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
  display: 'swap',
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  display: 'swap',
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "$KAS Smart Contracts Countdown - Deployed by Kasplex",
  description: "Countdown timer until Kaspa smart contracts are deployed by Kasplex. Join the revolution in blockchain technology with the fastest, most scalable proof-of-work network.",
  keywords: ["Kaspa", "smart contracts", "Kasplex", "cryptocurrency", "blockchain", "countdown", "$KAS", "deployment"],
  authors: [{ name: "Kaspa Community" }],
  openGraph: {
    title: "$KAS Smart Contracts Countdown - Deployed by Kasplex",
    description: "Countdown timer until Kaspa smart contracts are deployed by Kasplex",
    type: "website",
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${rubik.variable} ${oswald.variable} ${lato.variable} antialiased`}
        style={{
          backgroundColor: '#231F20',
          color: 'white',
          overflow: 'hidden',
          margin: 0,
          padding: 0,
          fontFamily: 'var(--font-lato), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }}
      >
        {children}
      </body>
    </html>
  );
}
