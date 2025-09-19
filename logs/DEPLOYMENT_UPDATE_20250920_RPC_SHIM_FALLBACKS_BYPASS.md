## 2025-09-20 — Temporary bypass of rpc-shim for pool

Reason:
- Port 3333 musí být rychle zprovozněn. Shim (18089) není momentálně dostupný přes veřejný port. Daemon RPC (18081) je funkční a vrací validní `getblocktemplate`.

Change:
- `adapters/uzi-pool-config/config.json` and `coins/zion.json` now point to `seed1:18081` directly instead of `zion-rpc-shim:18089`.

Next:
- Po rozjetí minerů přes přímé RPC vrátíme shim zpět mezi pool a daemon kvůli jednotnému rozhraní a případné mapovací logice.
