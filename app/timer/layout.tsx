import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kaspa Rewards Reduction Countdown',
  description: 'Track the time until the next Kaspa rewards reduction.',
  keywords: ['Kaspa', 'Timer', 'Rewards', 'Reduction', 'Cryptocurrency', 'Supply'],
  robots: 'index, follow',
  openGraph: {
    title: 'Kaspa Rewards Reduction Countdown',
    description: 'Track the time until the next Kaspa rewards reduction.',
    images: [
      {
        url: 'https://kas.live/images/timer.png',
        width: 1200,
        height: 630,
        alt: 'Kaspa Rewards Reduction Countdown',
      },
    ],
    url: 'https://kas.live/timer',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@kaspador',
    title: 'Kaspa Rewards Reduction Countdown',
    description: 'Track the time until the next Kaspa rewards reduction.',
    images: ['https://kas.live/images/timer.png'],
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
  },
}

// JSON-LD structured data
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Kaspa Reduction Timer',
  url: 'https://kas.live',
  logo: 'https://kas.live/images/kaspalogo.svg',
  sameAs: [
    'https://twitter.com/Kaspador',
    'https://discordapp.com/users/416297444184293407/',
    'https://t.me/kaspador'
  ],
  description: 'See live the countdown to the next Kaspa rewards reduction.'
}

export default function TimerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* Google Analytics */}
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-RLFC4Q9HVJ" />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-RLFC4Q9HVJ');
          `,
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  )
}
