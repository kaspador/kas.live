import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kaspa BlockDAG - Live Visualization",
  description: "Real-time animated visualization of the Kaspa blockchain's blockDAG structure with beautiful 3D blocks and smooth animations.",
  keywords: ["Kaspa", "blockchain", "blockDAG", "visualization", "cryptocurrency", "DAG", "real-time"],
  authors: [{ name: "Kaspa BlockDAG Visualizer" }],
  openGraph: {
    title: "Kaspa BlockDAG - Live Visualization",
    description: "Real-time animated visualization of the Kaspa blockchain's blockDAG structure",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{
          backgroundColor: '#0f172a',
          color: 'white',
          overflow: 'hidden',
          margin: 0,
          padding: 0,
          fontFamily: 'var(--font-geist-sans), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }}
      >
        {children}
      </body>
    </html>
  );
}
