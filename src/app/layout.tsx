import './globals.css'
import { Metadata } from 'next'
import { AnimatedHeroBackground } from '@/components/ui/animated-hero-background'

export const metadata: Metadata = {
  title: 'DAIV.PRO - Efficient AI Automation',
  description: 'Supercharge your business with AI automation.',
  icons: {
    icon: {
      url: '/PRO.png',
      type: 'image/png',
    }
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-primary text-white font-inter antialiased">
        <AnimatedHeroBackground />
        {children}
      </body>
    </html>
  )
}
