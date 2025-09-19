# 2025-09-20 — Node Installer (MystNodes-like) + RPC Shim Fallbacks

Cíl: Zjednodušit spuštění uzlu pro uživatele (one‑click styl) a odblokovat Uzi pool na portu 3333 robustními fallbacky v RPC shim.

## Změny

1) RPC Shim vylepšení
- Soubor: `adapters/zion-rpc-shim/server.js`
- Nové: `tryVariants` s postupným zkoušením metod/parametrů
- Metody a aliasy:
  - getblocktemplate ↔ get_block_template (wallet_address/address; object i array tvary)
  - submitblock ↔ submit_block ([blob] i {block: blob})
  - getheight ↔ get_height
  - getlastblockheader ↔ get_last_block_header (fallback přes getheight)
  - getinfo (minimální emulace)
- Logování: detailní logy příchozích metod a volání na ziond, zachování error code
- Healthcheck: GET `/` vrací `{status:'ok', proxy: ...}`

2) Uzi Pool konfigurace
- Soubor: `adapters/uzi-pool-config/config.json`
- Změna: `coin` → `zion` (použije profil `coins/zion.json`)

3) One‑click Node Installer (inspirace MystNodes)
- Compose: `docker/compose.single-node.yml`
- Výchozí config: `docker/node/zion.conf`
- Skripty: `scripts/install-zion-node.sh`, `scripts/uninstall-zion-node.sh`
- Dokumentace: `docs/NODE_INSTALLER.md`
- README: doplněn odkaz na rychlé spuštění uzlu

## Jak ověřit

1) Rebuild & restart rpc-shim, smoke test:
- `curl http://localhost:18089/` → JSON health
- `POST /json_rpc` s `getblocktemplate` (reserve_size=4) → `blocktemplate_blob`, `height`, `difficulty`

2) Uzi pool
- Spustit/obnovit `zion-uzi-pool` a sledovat logy – očekáváme, že přestane hlásit `Method not found` a začne získávat templaty.

3) Node installer
- `scripts/install-zion-node.sh` → spustí lokální `ziond` přes Docker Compose, porty 18080/18081
- `curl localhost:18081/getheight` → OK

## Poznámky
- Port 3333 zůstává publikačně mapovaný na `uzi-pool`.
- Pokud ziond používá odlišná pole v templatu, shim má tolerantní mapování (template_blob/blocktemplate_blob, prev_hash/previous…).
