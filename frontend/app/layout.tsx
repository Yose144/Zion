import React from 'react'
import type { Metadata } from 'next'
import ThemeShell from './components/ThemeShell'
export const metadata: Metadata = {
  title: 'ZION dApp',
  description: 'ZION – Amenti Library and ecosystem',
}

const ACCENT = '#00ff41'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs">
      <body style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
        <ThemeShell>{children}</ThemeShell>
      </body>
    </html>
  )
}
