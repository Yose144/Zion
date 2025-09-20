# MOON / SUN / STAR — Consolidovaný souhrn (2025‑09‑20)

Tento souhrn sjednocuje runtime důkazy a akční plán do tří vrstev:

- ON THE MOON — aktuální stav, klíčové logy, co objektivně běží
- ON THE SUN — optimalizace a stabilizace, změny provedené teď
- ON THE STAR — další cíle a metriky úspěchu

---

## ON THE MOON (stav a důkazy)

- Port 3333 je otevřen (kontejner `zion-uzi-pool`) — viz `logs/runtime/20250920T012139Z/docker-ps.txt`.
- Pool se opakovaně snaží získat getblocktemplate, ale daemon vrací `{"code":-9,"message":"Core is busy"}` — viz `logs/runtime/20250920T012139Z/zion-uzi-pool.log`.
- RPC shim běží a naslouchá na 18089 — viz `logs/runtime/20250920T012139Z/zion-rpc-shim.log`.
- Seed1/Seed2 inicializovány, RPC 18081 nahozeno — viz `logs/runtime/20250920T012139Z/zion-seed1.log`, `zion-seed2.log`.

Význam: stack je propojený, jediný blocker je generování šablon bloků (GBT) v jádře/daemonu.

## ON THE SUN (optimalizace aplikované)

- Pool konfigurován na RPC shim místo přímého volání seed1 (menší špičky a lepší fallbacky).
- Snížená zátěž na daemon: `blockRefreshInterval` zvýšen z 5s → 20s.
- Uzi-pool entrypoint čeká na zdraví `rpc-shim` před startem, aby se zabránilo hrotům při bootu.
- Shim zpřísněn:
  - Serializace GBT již existuje; nově delší backoff a až 10 pokusů.
  - Ořez `reserve_size` ≤ 255 pro RandomX kompatibilitu.

Artefakty změn:

- `adapters/uzi-pool-config/config.json` — delší interval, daemon/wallet → `rpc-shim:18089`.
- `docker/uzi-pool/Dockerfile` — entrypoint s wait na shim health.
- `adapters/zion-rpc-shim/server.js` — delší backoff, limit reserve_size.

## ON THE STAR (další kroky)

1) Ulevit daemomu a ověřit GBT:
   - Po nasazení počkat 60–120 s a sledovat log `zion-uzi-pool.log` pro první úspěšný template.
   - Pokud `-9` přetrvá, restartovat `zion-seed1` se startovací prodlevou a testovat `curl` na `rpc-shim` (`method=getblocktemplate`).

2) Ověřit miner end-to-end:
   - Spustit lokální XMRig proti `tcp://<server>:3333` a validovat share submit v logu poolu.

3) Monitoring a UX:
   - Přidat lehké metriky (OK/KO GBT rate, poslední height) do Genesis Hub.

Metriky úspěchu:

- [ ] První úspěšný getblocktemplate přes shim (v logu: bez -9, obsahuje height/difficulty)
- [ ] Miner přijat, share accepted v `zion-uzi-pool.log`
- [ ] Udržitelné GBT bez -9 po dobu > 10 min

— Log generován automaticky v rámci optimalizačního průchodu 2025‑09‑20.
