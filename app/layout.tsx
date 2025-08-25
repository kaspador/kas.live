import './globals.css'

export const metadata = {
  title: 'Smart Contracts - Coming Soon',
  description: 'Revolutionary smart contracts platform launching soon',
  keywords: [
    'kasplex layer 2',
    'kasplex l2 zkevm',
    'kaspa l2 smart contracts',
    'kasplex smart contracts',
    'kasplex based rollup l2',
    'layer 2 kaspa',
    'layer 2 kasplex',
    'kaspa',
    'kasplex',
    'zkevm',
    'smart contracts',
    'rollup',
    'blockchain',
    'l2',
    'layer 2'
  ],
  openGraph: {
    title: 'Kasplex: Smart Contracts for Kaspa',
    description: 'Kasplex is bringing smart contracts to Kaspa via its based rollup Layer 2 evm compatible',
    url: 'https://kas-live.vercel.app',
    siteName: 'Kasplex',
    images: [
      {
        url: 'https://kas-live.vercel.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Kasplex Smart Contracts for Kaspa',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kasplex: Smart Contracts for Kaspa',
    description: 'Kasplex is bringing smart contracts to Kaspa via its based rollup Layer 2 evm compatible',
    site: '@kasplex',
    creator: '@kasplex',
    images: ['https://kas-live.vercel.app/og-image.png'],
  },
  other: {
    'facebook:title': 'Kasplex: Smart Contracts for Kaspa',
    'facebook:description': 'Kasplex is bringing smart contracts to Kaspa via its based rollup Layer 2 evm compatible',
    'facebook:image': 'https://kas-live.vercel.app/og-image.png',
    'instagram:title': 'Kasplex: Smart Contracts for Kaspa',
    'instagram:description': 'Kasplex is bringing smart contracts to Kaspa via its based rollup Layer 2 evm compatible',
    'instagram:image': 'https://kas-live.vercel.app/og-image.png',
  },
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