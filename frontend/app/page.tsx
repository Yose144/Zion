export default function Page() {
  return (
    <section>
      <h1 style={{ color: '#00ff41', textShadow:'0 0 8px rgba(0,255,65,0.3)' }}>ZION dApp</h1>
      <p>
        Vítej. Toto je skeleton pro budoucí frontend. Pokračuj na{' '}
        <a href="/amenti" style={{ color:'#8aff9a' }}>Amenti Library</a>.
      </p>
      <p>
        Nebo otevři <a href="/hub" style={{ color:'#8aff9a' }}>Genesis Hub</a> (Wallet + Miner + Health v jednom).
      </p>
      <ul>
        <li><a href="/wallet" style={{ color:'#8aff9a' }}>Wallet Tools (validace adresy, QR)</a></li>
        <li><a href="/miner" style={{ color:'#8aff9a' }}>Miner Helper (XMRig příkaz)</a></li>
      </ul>
    </section>
  )
}
