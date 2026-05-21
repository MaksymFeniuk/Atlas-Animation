import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'OWOW Atlas - Animation Library',
  description: 'Professional animation library for creative professionals. Browse, filter, and discover beautiful animations.',
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-dark-900 text-white antialiased">
        {children}
      </body>
    </html>
  )
}
