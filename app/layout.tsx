import './globals.css'

export const metadata = {
  title: 'Smart Contracts - Coming Soon',
  description: 'Revolutionary smart contracts platform launching soon',
}

export default function RootLayout({
  children,
}: {
  children: any
}) {
  return (
    <html lang="en">
      <body className="font-space">{children}</body>
    </html>
  )
} 