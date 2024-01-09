import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { siteConfig } from '@/config/site'
import { Provider } from 'jotai'
import Navbar from '@/components/shared/navbar'
import Footer from '@/components/shared/footer'
import { cn } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  icons: [
    {
      url: 'bocchi_right.ico',
      href: 'bocchi_right.ico',
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn('relative min-h-screen antialiased', inter.className)}
      >
        <Provider>
          <div className="pb-36">
            <Navbar />
            <div className="container">{children}</div>
          </div>
          <Footer />
        </Provider>
      </body>
    </html>
  )
}
