import React from 'react'
export const metadata = {
  title: 'ZION dApp',
  description: 'ZION – Amenti Library and ecosystem',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs">
      <body style={{ fontFamily: 'Inter, system-ui, sans-serif', background: '#0a0a0a', color: '#eaeaea' }}>
        <header style={{ padding: '20px', borderBottom: '1px solid #111' }}>
          <a href="/" style={{ color: '#E7C34E', textDecoration: 'none', fontWeight: 700 }}>ZION</a>
          <nav style={{ marginTop: 8 }}>
            <a href="/amenti" style={{ color: '#bde', marginRight: 16 }}>Amenti Library</a>
          </nav>
        </header>
        <main style={{ maxWidth: 980, margin: '20px auto', padding: '0 16px' }}>{children}</main>
      </body>
    </html>
  )
}
