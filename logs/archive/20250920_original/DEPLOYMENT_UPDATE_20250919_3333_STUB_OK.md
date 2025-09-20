2025-09-19 — Port 3333 otevřen přes Node.js Stratum stub

- Nasazen nový kontejner `zion-pool-nodejs` (pool/), který spouští lehký Stratum-like TCP server na 0.0.0.0:3333.
- `docker compose -f docker/compose.pool-seeds.yml up -d pool-nodejs` — služba běží a port 3333 je otevřen (ověřeno `nc -zv 127.0.0.1 3333`).
- Původní integrovaný pool v ziond má stále problémy s přístupovými právy na volume; dočasně pozastaven.

Další kroky:
- Integrace skutečného pool softwaru (Uzi-Pool/NOMP/Yiimp) se ziond RPC (`get_block_template`, `submit_block`, `get_height`, `get_difficulty`).
- Přidat adaptér pro ZION (RandomX rx/0), validace adres, převod difficulty/target, accounting a payout modul.
