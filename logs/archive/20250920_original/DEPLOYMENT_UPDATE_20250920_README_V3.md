# DEPLOYMENT UPDATE — 2025‑09‑20 — README přepsán na ZION NETWORK V3

Změny:
- Přepsán hlavní README.md na "ZION NETWORK V3":
  - Jasná architektura (seed1/seed2, RPC shim 18089, Uzi pool 3333, Genesis Hub)
  - Rychlý start s Docker Compose a pořadím startu
  - Připojení mineru (XMRig) a šablona příkazu
  - Troubleshooting “Core is busy” (-9) se serializovaným GBT a backoff
  - Odkazy na logy, sběr runtime a SSH redeploy skript
- Přenesení legacy a odkazů z původního README do specializovaných dokumentů (ponecháno v repo, nebude blokovat start)

Důvod:
- Sjednotit aktuální stav nasazení (port 3333, shim, pool, UI) a dát jedno startovací místo pro ops i komunitu.

Další kroky:
- Po úspěšné první odpovědi na getblocktemplate validovat sdílení (share accepted) z XMRig
- Po potvrzení E2E toku doplnit README sekci "How it works" s diagramem a přidat Health endpoints do /hub

— Autor: Copilot ops
