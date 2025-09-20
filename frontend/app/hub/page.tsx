"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import QRCode from "qrcode.react";
import { buildXmrigCommand, isValidZionAddress } from "../utils/zion";
import { ZION_HOST, ZION_POOL_PORT, ZION_SHIM_PORT } from "../config";

export default function GenesisHub() {
  // Shared state
  const [address, setAddress] = useState("");
  const [host, setHost] = useState(ZION_HOST);
  const [port, setPort] = useState(ZION_POOL_PORT);
  const [algo, setAlgo] = useState("rx/0");
  const [tls, setTls] = useState(false);
  const isValid = useMemo(() => isValidZionAddress(address), [address]);

  // Health
  const [health, setHealth] = useState<any>(null);
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/health', { cache: 'no-store' });
        setHealth(await res.json());
      } catch (e) {
        setHealth({ error: String(e) });
      }
    };
    load();
    const id = setInterval(load, 15000);
    return () => clearInterval(id);
  }, []);

  // Wallet helpers
  const qrRef = useRef<HTMLCanvasElement | null>(null);
  const copyAddress = async () => {
    if (!address) return;
    await navigator.clipboard.writeText(address);
    alert("Adresa zkopírována");
  };
  const savePng = () => {
    const canvas = qrRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url; a.download = "zion-address.png"; a.click();
  };

  // Miner helpers
  const cmd = useMemo(() => {
    if (!isValid) return "Zadej platnou ZION adresu";
    return buildXmrigCommand({ host, port, address, algo, rigId: "HUB", tls });
  }, [host, port, address, algo, tls, isValid]);
  const jsonConfig = useMemo(() => {
    if (!isValid) return {};
    return {
      autosave: true,
      'donate-level': 0,
      cpu: { enabled: true, yield: true },
      pools: [
        {
          algo,
          coin: null,
          url: `${host}:${port}`,
          user: address,
          pass: 'x',
          'rig-id': 'HUB',
          keepalive: true,
          tls,
        },
      ],
      'print-time': 5,
      retries: 10,
      'retry-pause': 5,
    } as const;
  }, [host, port, address, algo, tls, isValid]);

  return (
    <div style={{ maxWidth: 1080, margin: '32px auto', padding: 16 }}>
      <h1 style={{ color: '#00ff41' }}>ZION Genesis Hub</h1>
      <p>Jedna aplikace pro peněženku (QR/validace) a miner (XMRig příkaz/JSON) + zdraví shim.</p>

      {/* Network config */}
      <section style={{ marginTop: 16, padding: 12, border: '1px solid #2a2', borderRadius: 8 }}>
        <h3>Konfigurace sítě</h3>
        <div style={{ display: 'grid', gap: 12, gridTemplateColumns: '1fr 1fr 1fr 1fr' }}>
          <label>Host<input value={host} onChange={e=>setHost(e.target.value)} /></label>
          <label>Port<input type="number" value={port} onChange={e=>setPort(parseInt(e.target.value||'3333',10))} /></label>
          <label>Algoritmus<select value={algo} onChange={e=>setAlgo(e.target.value)}><option value="rx/0">rx/0</option></select></label>
          <label>TLS <input type="checkbox" checked={tls} onChange={e=>setTls(e.target.checked)} /></label>
        </div>
        <div style={{ marginTop: 8, color:'#666' }}>Shim: http://{ZION_HOST}:{ZION_SHIM_PORT} • Stratum: {host}:{port}</div>
      </section>

      {/* Wallet */}
      <section style={{ marginTop: 16, padding: 12, border: '1px solid #2a2', borderRadius: 8 }}>
        <h3>Wallet</h3>
        <label style={{ display:'block' }}>ZION adresa
          <input value={address} onChange={e=>setAddress(e.target.value.trim())} placeholder="Z..." style={{ width:'100%', fontFamily:'monospace' }} />
        </label>
        <div style={{ marginTop: 6, fontWeight: 600 }}>Stav: {address ? (isValid ? 'Platná' : 'Neplatná') : ''}</div>
        {isValid && (
          <div style={{ marginTop: 16, textAlign:'center' }}>
            <QRCode value={address} size={196} includeMargin renderAs="canvas" ref={qrRef as any} />
            <div style={{ marginTop:8, fontFamily:'monospace' }}>{address}</div>
            <div style={{ marginTop:8, display:'flex', gap:8, justifyContent:'center' }}>
              <button onClick={copyAddress}>Kopírovat adresu</button>
              <button onClick={savePng}>Stáhnout QR (PNG)</button>
            </div>
          </div>
        )}
      </section>

      {/* Miner */}
      <section style={{ marginTop: 16, padding: 12, border: '1px solid #2a2', borderRadius: 8 }}>
        <h3>Miner</h3>
        <div style={{ fontWeight: 600 }}>XMRig příkaz:</div>
        <pre style={{ background:'#111', color:'#0f0', padding:12, overflow:'auto' }}>{cmd}</pre>
        <button disabled={!isValid} onClick={()=>navigator.clipboard.writeText(cmd)}>Kopírovat příkaz</button>
        {!isValid && address && (<div style={{ color:'#c00' }}>Prosím vlož platnou ZION adresu.</div>)}

        <div style={{ marginTop: 16, fontWeight: 600 }}>Alternativa: xmrig JSON (ulož jako xmrig.json)</div>
        <pre style={{ background:'#111', color:'#8cf', padding:12, overflow:'auto' }}>{JSON.stringify(jsonConfig, null, 2)}</pre>
      </section>

      {/* Health */}
      <section style={{ marginTop: 16, padding: 12, border: '1px solid #2a2', borderRadius: 8 }}>
        <h3>Health</h3>
        <pre style={{ background:'#111', color:'#ccc', padding:12, overflow:'auto' }}>{JSON.stringify(health, null, 2)}</pre>
        <div style={{ color:'#666' }}>Pozn.: Stratum (3333) není HTTP, proto je zde stav pouze informační a HTTP zdraví shim.</div>
      </section>
    </div>
  );
}
