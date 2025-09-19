import { useEffect, useState } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

interface NodeStatus {
  node_version: string
  height: number
  difficulty: number
  peer_count: number
  mempool_size: number
  network_hash_rate: string
  uptime: string
  last_block_time: string
  pool: {
    enabled: boolean
    port: number
    workers: number
  }
}

export default function Home() {
  const [status, setStatus] = useState<NodeStatus | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchStatus = async () => {
    try {
      const response = await fetch('/api/node/status')
      if (!response.ok) {
        throw new Error('Failed to fetch status')
      }
      const data = await response.json()
      setStatus(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStatus()
    const interval = setInterval(fetchStatus, 5000) // Update every 5 seconds
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className={styles.container}>
        <Head>
          <title>ZION Dashboard</title>
          <meta name="description" content="ZION Cryptocurrency Dashboard" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.main}>
          <div className={styles.loading}>Loading...</div>
        </main>
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.container}>
        <Head>
          <title>ZION Dashboard</title>
        </Head>
        <main className={styles.main}>
          <div className={styles.error}>Error: {error}</div>
        </main>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>ZION Dashboard</title>
        <meta name="description" content="ZION Cryptocurrency Dashboard" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          🚀 ZION Node Dashboard
        </h1>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h2>📊 Blockchain Info</h2>
            <div className={styles.stat}>
              <span>Height:</span>
              <span>{status?.height}</span>
            </div>
            <div className={styles.stat}>
              <span>Difficulty:</span>
              <span>{status?.difficulty}</span>
            </div>
            <div className={styles.stat}>
              <span>Last Block:</span>
              <span>{status?.last_block_time}</span>
            </div>
          </div>

          <div className={styles.card}>
            <h2>🌐 Network Status</h2>
            <div className={styles.stat}>
              <span>Version:</span>
              <span>{status?.node_version}</span>
            </div>
            <div className={styles.stat}>
              <span>Peers:</span>
              <span>{status?.peer_count}</span>
            </div>
            <div className={styles.stat}>
              <span>Mempool:</span>
              <span>{status?.mempool_size} tx</span>
            </div>
            <div className={styles.stat}>
              <span>Uptime:</span>
              <span>{status?.uptime}</span>
            </div>
          </div>

          <div className={styles.card}>
            <h2>⛏️ Mining Pool</h2>
            <div className={styles.stat}>
              <span>Status:</span>
              <span className={status?.pool.enabled ? styles.online : styles.offline}>
                {status?.pool.enabled ? 'Online' : 'Offline'}
              </span>
            </div>
            {status?.pool.enabled && (
              <>
                <div className={styles.stat}>
                  <span>Port:</span>
                  <span>{status.pool.port}</span>
                </div>
                <div className={styles.stat}>
                  <span>Workers:</span>
                  <span>{status.pool.workers}</span>
                </div>
              </>
            )}
          </div>

          <div className={styles.card}>
            <h2>📚 Documentation</h2>
            <p>Learn more about ZION:</p>
            <ul className={styles.links}>
              <li><a href="/docs/getting-started">Getting Started</a></li>
              <li><a href="/docs/mining">Mining Guide</a></li>
              <li><a href="/docs/pool-setup">Pool Setup</a></li>
              <li><a href="/docs/api">API Reference</a></li>
            </ul>
          </div>

          <div className={styles.card}>
            <h2>⬇️ Downloads</h2>
            <p>Download ZION software:</p>
            <ul className={styles.links}>
              <li><a href="/downloads/linux">Linux</a></li>
              <li><a href="/downloads/macos">macOS</a></li>
              <li><a href="/downloads/windows">Windows</a></li>
              <li><a href="/downloads/docker">Docker</a></li>
            </ul>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>ZION Cryptocurrency v{status?.node_version} - Proof-of-Work with RandomX</p>
      </footer>
    </div>
  )
}