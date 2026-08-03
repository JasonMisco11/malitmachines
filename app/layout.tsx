import type { Metadata } from 'next'
import { Hanken_Grotesk, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const hanken = Hanken_Grotesk({ subsets: ['latin'], variable: '--font-hanken' })
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains' })

export const metadata: Metadata = {
  title: 'Ture Cleaning Home',
  description: 'Premier Cleaning Solution',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${hanken.variable} ${jetbrains.variable} font-sans`}>
        {children}
      </body>
    </html>
  )
}
