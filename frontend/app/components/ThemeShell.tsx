'use client'
import React, { useEffect, useMemo, useState } from 'react'
import DataRain from './DataRain'
import Presence from './Presence'
import InteractiveEarth from './InteractiveEarth'

type Theme = 'dark' | 'light'

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'dark'
  const saved = window.localStorage.getItem('zion-theme') as Theme | null
  if (saved === 'dark' || saved === 'light') return saved
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  return prefersDark ? 'dark' : 'light'
}

export default function ThemeShell({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark')
  const [isMobile, setIsMobile] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    setTheme(getInitialTheme())
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('zion-theme', theme)
      document.documentElement.setAttribute('data-theme', theme)
    }
  }, [theme])

  // Responsive breakpoint detection
  useEffect(() => {
    if (typeof window === 'undefined') return
    const onResize = () => {
      // Treat tablets as mobile for nav (hamburger)
      const mobile = window.innerWidth < 1100
      setIsMobile(mobile)
      if (!mobile) setMobileOpen(false)
    }
    onResize()
    window.addEventListener('resize', onResize, { passive: true })
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const ACCENT = theme === 'dark' ? '#00ff41' : '#006b1c'
  const LINK = theme === 'dark' ? '#8aff9a' : '#0d7a30'
  const BORDER = theme === 'dark' ? '#072807' : '#cfe9d6'
  const headerBg = theme === 'dark' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)'
  const fg = theme === 'dark' ? '#eaeaea' : '#0a0a0a'

  const bgLayerStyle = useMemo<React.CSSProperties>(() => {
    if (theme === 'dark') {
      return {
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        backgroundColor: '#000',
        backgroundImage:
          'radial-gradient(ellipse at 50% -20%, rgba(0,255,65,0.08), transparent 50%), linear-gradient(rgba(0,255,65,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,65,0.04) 1px, transparent 1px)',
        backgroundSize: '100% 100%, 26px 26px, 26px 26px',
        backgroundPosition: '0 0, 0 0, 0 0',
      }
    }
    return {
      position: 'fixed',
      inset: 0,
      zIndex: 0,
      backgroundColor: '#f6fff7',
      backgroundImage:
        'linear-gradient(rgba(0,107,28,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,107,28,0.06) 1px, transparent 1px)',
      backgroundSize: '26px 26px, 26px 26px',
      backgroundPosition: '0 0, 0 0',
    }
  }, [theme])

  return (
    <div style={{ position: 'relative', minHeight: '100vh', color: fg }}>
      <div style={{ ...bgLayerStyle, zIndex: 0 }} />
      {theme === 'dark' && !isMobile && <DataRain />}
      <header
        style={{
          padding: '8px 20px 16px 20px',
          borderBottom: `1px solid ${BORDER}`,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          background: headerBg,
          backdropFilter: 'blur(2px)',
          position: 'relative',
          zIndex: 2,
          color: fg,
          overflow: 'hidden',
        }}
      >
        <InteractiveEarth theme={theme} height={isMobile ? 120 : 200} />
        <div style={{ position:'relative', zIndex:3, width:'100%' }}>
          {!isMobile && (
            <div style={{ display:'flex', justifyContent:'flex-end', gap:12, marginBottom:8 }}>
              <a href="https://newearth.cz/#v3zion" style={{ color: LINK, textDecoration:'none', fontSize:12 }}>V3 ZION</a>
              <a href="https://newearth.cz/wp/" style={{ color: LINK, textDecoration:'none', fontSize:12 }}>SHOP</a>
              <a href="https://newearth.cz/#support" style={{ color: LINK, textDecoration:'none', fontSize:12 }}>SUPPORT</a>
              <a href="https://newearth.cz/#contact" style={{ color: LINK, textDecoration:'none', fontSize:12 }}>CONTACT</a>
              <a href="https://newearth.cz/V2/main.html" style={{ color: LINK, textDecoration:'none', fontSize:12 }}>V2 WEB</a>
            </div>
          )}
          <div style={{ display:'flex', alignItems:'center', gap:12 }}>
            <img src="/logo-zion-amenti.svg" alt="ZION" width={40} height={40} />
            <a
              href="/"
              style={{
                color: ACCENT,
                textDecoration: 'none',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textShadow: theme === 'dark' ? '0 0 8px rgba(0,255,65,0.3)' : 'none',
                fontSize: 20,
              }}
            >
              ZION
            </a>
            {!isMobile && (
              <nav style={{ marginLeft: 16, display:'flex', gap:16, flexWrap:'wrap' }}>
                <a href="/amenti" style={{ color: LINK, textDecoration: 'none' }}>Amenti Library</a>
                <a href="https://newearth.cz/V2/main.html" style={{ color: LINK, textDecoration: 'none' }}>Home</a>
                <a href="https://newearth.cz/V2/camp.html" style={{ color: LINK, textDecoration: 'none' }}>Camps</a>
                <a href="https://newearth.cz/V2/arts.html" style={{ color: LINK, textDecoration: 'none' }}>Arts</a>
                <a href="https://newearth.cz/V2/halls.html" style={{ color: LINK, textDecoration: 'none' }}>Amenti</a>
                <a href="https://newearth.cz/wp/" style={{ color: LINK, textDecoration: 'none' }}>eShop</a>
                <a href="https://newearth.cz/V2/blog.html" style={{ color: LINK, textDecoration: 'none' }}>Blog</a>
                <a href="https://newearth.cz/V2/links.html" style={{ color: LINK, textDecoration: 'none' }}>Links</a>
                <a href="https://newearth.cz/V2/about.html" style={{ color: LINK, textDecoration: 'none' }}>About</a>
                <a href="https://newearth.cz/V2/dev.html" style={{ color: LINK, textDecoration: 'none' }}>DeV</a>
              </nav>
            )}
            <div style={{ marginLeft: 'auto', display:'flex', alignItems:'center', gap:12 }}>
              {!isMobile && <Presence theme={theme} />}
              {isMobile && (
                <button
                  onClick={() => setMobileOpen((o) => !o)}
                  aria-expanded={mobileOpen}
                  aria-label="Otevřít menu"
                  style={{
                    background: 'transparent',
                    color: fg,
                    border: `1px solid ${BORDER}`,
                    padding: '6px 10px',
                    borderRadius: 8,
                    cursor: 'pointer',
                  }}
                >
                  ☰ Menu
                </button>
              )}
              <button
                onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
                aria-label="Přepnout motiv"
                style={{
                  background: 'transparent',
                  color: fg,
                  border: `1px solid ${BORDER}`,
                  padding: '6px 10px',
                  borderRadius: 8,
                  cursor: 'pointer',
                }}
              >
                {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
              </button>
            </div>
          </div>
          {isMobile && mobileOpen && (
            <div style={{
              marginTop: 10,
              borderTop: `1px solid ${BORDER}`,
              paddingTop: 10,
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 10,
            }}>
              <a href="/amenti" onClick={() => setMobileOpen(false)} style={{ color: LINK, textDecoration: 'none' }}>Amenti Library</a>
              <a href="https://newearth.cz/V2/main.html" onClick={() => setMobileOpen(false)} style={{ color: LINK, textDecoration: 'none' }}>Home</a>
              <a href="https://newearth.cz/V2/camp.html" onClick={() => setMobileOpen(false)} style={{ color: LINK, textDecoration: 'none' }}>Camps</a>
              <a href="https://newearth.cz/V2/arts.html" onClick={() => setMobileOpen(false)} style={{ color: LINK, textDecoration: 'none' }}>Arts</a>
              <a href="https://newearth.cz/V2/halls.html" onClick={() => setMobileOpen(false)} style={{ color: LINK, textDecoration: 'none' }}>Amenti</a>
              <a href="https://newearth.cz/wp/" onClick={() => setMobileOpen(false)} style={{ color: LINK, textDecoration: 'none' }}>eShop</a>
              <a href="https://newearth.cz/V2/blog.html" onClick={() => setMobileOpen(false)} style={{ color: LINK, textDecoration: 'none' }}>Blog</a>
              <a href="https://newearth.cz/V2/links.html" onClick={() => setMobileOpen(false)} style={{ color: LINK, textDecoration: 'none' }}>Links</a>
              <a href="https://newearth.cz/V2/about.html" onClick={() => setMobileOpen(false)} style={{ color: LINK, textDecoration: 'none' }}>About</a>
              <a href="https://newearth.cz/V2/dev.html" onClick={() => setMobileOpen(false)} style={{ color: LINK, textDecoration: 'none' }}>DeV</a>
              <div style={{ gridColumn: '1 / -1', display:'flex', justifyContent:'space-between', alignItems:'center', marginTop: 6 }}>
                <Presence theme={theme} />
                <a href="https://newearth.cz/#v3zion" onClick={() => setMobileOpen(false)} style={{ color: LINK, textDecoration:'none', fontSize:12 }}>V3 ZION</a>
              </div>
            </div>
          )}
        </div>
      </header>
      <main style={{ maxWidth: 980, margin: '24px auto', padding: '0 16px', position: 'relative', zIndex: 2 }}>{children}</main>
    </div>
  )
}
