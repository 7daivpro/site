import './globals.css'
import { Metadata } from 'next'
import { AnimatedHeroBackground } from '@/components/ui/animated-hero-background'

const title = 'DAIV.PRO - AI Automation for Business Efficiency';
const description = 'Stop drowning in repetitive tasks. DAIV.PRO offers custom AI automation to streamline your operations, handle leads, and scale your business effortlessly. Get your free automation analysis.';
const url = 'https://www.daiv.pro'; // Replace with your actual domain

const keywords = [
  "AI automation", "Workflow Automation", "Intelligent Automation", "AI workflow", "Automate With AI",
  "Productivity Boost", "Efficiency Through AI", "Streamline Operations", "Automate To Innovate", "Scale Effortlessly",
  "Automated Customer Support", "AI Form Automation", "Back Office AI", "AI Automation For SMEs", "AI Agencies",
  "DAIVPRO", "DAIVAutomation", "AIByDAIV", "DAIVTech",
  "AI tools", "Business Automation", "NoCode Automation", "SaaS Automation", "Lead Generation AI",
  "CRM Integration", "Custom AI Agents", "AI for Business", "AI Productivity", "AI Tasks"
];

export const metadata: Metadata = {
  title: title,
  description: description,
  keywords: keywords,
  authors: [{ name: 'DAIV.PRO', url: 'www.linkedin.com/in/7devverma' }],
  creator: 'DAIV.PRO',
  publisher: 'DAIV.PRO',
  metadataBase: new URL(url),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: title,
    description: description,
    url: url,
    siteName: 'DAIV.PRO',
    images: [
      {
        url: '/logo.png', // Using your logo for the preview
        width: 1200,
        height: 630,
        alt: 'DAIV.PRO Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: {
      url: '/PRO.png',
      type: 'image/png',
    }
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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
