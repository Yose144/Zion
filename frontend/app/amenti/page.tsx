'use client'
import React, { useEffect, useState } from 'react'

type Book = {
  id: string
  title: string
  description?: string
  landingPage?: string
  downloads?: { url: string; type?: string; note?: string }[]
  categories?: string[]
  tags?: string[]
}

export default function AmentiPage() {
  const [books, setBooks] = useState<Book[]>([])
  const [q, setQ] = useState('')
  const [err, setErr] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/amenti').then(async (r) => {
      if (!r.ok) throw new Error('Manifest load failed')
      const j = await r.json()
      setBooks(j.books || [])
    }).catch((e) => setErr(String(e)))
  }, [])

  const f = (b: Book) => {
    if (!q) return true
    const hay = [b.title, b.description, ...(b.tags||[]), ...(b.categories||[])].join(' ').toLowerCase()
    return hay.includes(q.toLowerCase())
  }

  return (
    <section>
      <h1 style={{ color: '#E7C34E' }}>Amenti Library</h1>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Hledat (název, tagy)"
        style={{ background:'#111', color:'#eaeaea', border:'1px solid #222', padding:'10px 12px', borderRadius:8, width:320 }}
      />
      {err && <p style={{ color:'#ff8080' }}>{err}</p>}
      <div>
        {books.filter(f).map((b) => (
          <div key={b.id} style={{ border:'1px solid #1c1c1c', padding:16, borderRadius:12, margin:'12px 0', background:'#0f0f0f' }}>
            <h3 style={{ color:'#E7C34E', margin:0 }}>{b.title}</h3>
            <div style={{ display:'flex', gap:8, flexWrap:'wrap', margin:'8px 0' }}>
              {(b.categories||[]).map((c) => <span key={c} style={{ fontSize:12, border:'1px solid #234', background:'#132', color:'#cde', padding:'2px 8px', borderRadius:999 }}>{c}</span>)}
            </div>
            {b.description && <p>{b.description}</p>}
            <div>
              {b.landingPage && <a href={b.landingPage} target="_blank" style={{ color:'#bde', marginRight:12 }}>Otevřít</a>}
              {(b.downloads||[]).map((d, i) => (
                <a key={i} href={d.url} target="_blank" style={{ color:'#bde', marginRight:12 }}>Stáhnout{d.type?` (${d.type})`:''}</a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
