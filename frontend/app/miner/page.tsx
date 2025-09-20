"use client";
import { useMemo, useState } from "react";
import { buildXmrigCommand, isValidZionAddress } from "../utils/zion";

export default function MinerPage() {
  const [host, setHost] = useState("91.98.122.165");
  const [port, setPort] = useState(3333);
  const [address, setAddress] = useState("");
  const [algo, setAlgo] = useState("rx/0");
  const isValid = useMemo(() => isValidZionAddress(address), [address]);
  const cmd = useMemo(() => {
    if (!isValid) return "Zadej platnou ZION adresu";
    return buildXmrigCommand({ host, port, address, algo, rigId: "WEB" });
  }, [host, port, address, algo, isValid]);

  return (
    <div style={{ maxWidth: 900, margin: "40px auto", padding: 16 }}>
      <h1>ZION Miner Helper</h1>
      <p>Vygeneruj si příkaz pro XMRig (RandomX).</p>

      <div style={{ display: "grid", gap: 12, gridTemplateColumns: "1fr 1fr" }}>
        <label>
          Pool host
          <input value={host} onChange={(e) => setHost(e.target.value)} />
        </label>
        <label>
          Port
          <input
            type="number"
            value={port}
            onChange={(e) => setPort(parseInt(e.target.value || "3333", 10))}
          />
        </label>
        <label style={{ gridColumn: "1 / span 2" }}>
          ZION adresa
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value.trim())}
            placeholder="Z..."
            style={{ width: "100%", fontFamily: "monospace" }}
          />
        </label>
        <label>
          Algorithm
          <select value={algo} onChange={(e) => setAlgo(e.target.value)}>
            <option value="rx/0">RandomX (rx/0)</option>
          </select>
        </label>
      </div>

      <div style={{ marginTop: 24 }}>
        <div style={{ fontWeight: 600 }}>XMRig příkaz:</div>
        <pre style={{ background: "#111", color: "#0f0", padding: 12, overflow: "auto" }}>{cmd}</pre>
        {!isValid && address && (
          <div style={{ color: "#c00" }}>Prosím vlož platnou ZION adresu.</div>
        )}
      </div>

      <div style={{ marginTop: 16, color: "#666" }}>
        Tip: Na macOS můžeš XMRig nainstalovat přes Homebrew: <code>brew install xmrig</code>
      </div>
    </div>
  );
}
