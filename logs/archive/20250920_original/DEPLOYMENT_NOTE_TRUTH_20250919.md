Pravda k portu 3333 a poolu (2025-09-19)

- NESNAŽ SE LHOU OHNOUT — JE TO NEMOŽNÉ. Pravda: integrovaný C++ pool v ziond teď blokují práva volumu a komplikace uvnitř image. Tolik k realitě.
- Použijeme to, co funguje: samostatný Node.js Stratum (stub) otevřel port 3333 ihned, takže síť a firewall jsou v pořádku.
- Další krok: hotový Node.js CryptoNote/Monero pool + ZION RPC adapter (rpc-shim), aby běželo reálné těžení.
  - Přidán zion-rpc-shim (Monero-like JSON-RPC → ziond RPC) jako kontejner na 18089.
  - Pool software nasměrujeme na SHIM (http://server:18089/json_rpc), aby “viděl” ZION jako kompatibilní backend.
  - Pokud ziond postrádá některé RPC, doplníme je.
