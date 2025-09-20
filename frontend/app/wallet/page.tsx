"use client";
import { useMemo, useState } from "react";
import QRCode from "qrcode.react";
import { isValidZionAddress } from "../utils/zion";

export default function WalletPage() {
  const [address, setAddress] = useState("");
  const isValid = useMemo(() => isValidZionAddress(address), [address]);

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
          <QRCode value={address} size={196} includeMargin={true} />
          <div style={{ marginTop: 8, fontFamily: "monospace" }}>{address}</div>
        </div>
      )}

      <p style={{ marginTop: 24, color: "#666" }}>
        Pozn.: Regex validace je jednoduchá (tvar/znaky); skutečné ověření provádí
        uzel/peněženka.
      </p>
    </div>
  );
}
