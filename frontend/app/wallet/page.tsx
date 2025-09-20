"use client";
import { useMemo, useRef, useState } from "react";
import QRCode from "qrcode.react";
import { isValidZionAddress } from "../utils/zion";

export default function WalletPage() {
  const [address, setAddress] = useState("");
  const isValid = useMemo(() => isValidZionAddress(address), [address]);
  const qrRef = useRef<HTMLCanvasElement | null>(null);

  const copy = async () => {
    if (!address) return;
    await navigator.clipboard.writeText(address);
    alert("Adresa zkopírována do schránky");
  };

  const savePng = () => {
    const canvas = qrRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = "zion-address.png";
    a.click();
  };

  return (
    <div style={{ maxWidth: 720, margin: "40px auto", padding: 16 }}>
      <h1>ZION Wallet Tools</h1>
      <p>Zadej ZION adresu pro validaci a QR kód.</p>

      <label style={{ display: "block", marginTop: 16 }}>
        ZION adresa:
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value.trim())}
          placeholder="Z..."
          style={{ width: "100%", padding: 8, fontFamily: "monospace" }}
        />
      </label>

      <div style={{ marginTop: 8, fontWeight: 600 }}>
        Stav: {address ? (isValid ? "Platná" : "Neplatná") : ""}
      </div>

      {isValid && (
        <div style={{ marginTop: 24, textAlign: "center" }}>
          <QRCode value={address} size={196} includeMargin={true} renderAs="canvas" ref={qrRef as any} />
          <div style={{ marginTop: 8, fontFamily: "monospace" }}>{address}</div>
          <div style={{ marginTop: 8, display: 'flex', gap: 8, justifyContent:'center' }}>
            <button onClick={copy}>Kopírovat adresu</button>
            <button onClick={savePng}>Stáhnout QR (PNG)</button>
          </div>
        </div>
      )}

      <p style={{ marginTop: 24, color: "#666" }}>
        Pozn.: Regex validace je jednoduchá (tvar/znaky, 95 znaků, prefix Z/a);
        skutečné ověření provádí uzel/peněženka.
      </p>
    </div>
  );
}
