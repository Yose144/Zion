# Handover — Sonnet (2025-09-20)

Cíl: Předat stav nasazení a ladění ZION V2 (RandomX) s externím Stratum poolem (uzi-pool) a RPC shimem.

## Kde začít
- Compose stack: `docker/compose.pool-seeds.yml` (služby: seed1, seed2, redis, rpc-shim, uzi-pool)
- Pool image: `docker/uzi-pool/Dockerfile`
- Pool konfigurace: `adapters/uzi-pool-config/config.json`, coin profil: `adapters/uzi-pool-config/coins/zion.json`
- RPC shim: `adapters/zion-rpc-shim/server.js` (aliasy pro Monero‑like metody, cache GBT)

## Aktuální status
- seed1/seed2: běží, genesis synced, ekonomika: 333 ZION/block, t=120s, halving 210k.
- rpc-shim: běží na 18089, health endpoint `/`, proxy na seedy.
- uzi-pool: běží na 3333; po fixu Buffer.toJSON() nepadá, ale XMRig login končí `code: 7`.
- XMRig: připojí se (tcp://SERVER:3333), vrací `login error code: 7` po authorize.

## Známé problémy
- Buffer v `/app/lib/pool.js`: `buff.toJSON()` vrací objekt; nutno převést na pole `data` před `.reverse()`.
- Login/authorize: pravděpodobně validace adresy nebo nekompatibilní response od shim/daemon při `getblocktemplate`.

## Další kroky (priorita)
1) Zabetonovat patch na Buffer v Dockerfile (build-time) nebo v entrypointu — odstranit ruční zásah v kontejneru.
2) Projít `lib/pool.js` a `lib/stratum.js`:
   - dočasně vypnout/kontaminovat validaci adres (v configu už `addressRegex: ".*"`).
   - logovat příchozí `mining.authorize` a rozhodnutí serveru.
3) Shim: ověřit mapování `getblocktemplate` → polia, zejména `blocktemplate_blob`, `reserved_offset`, `seed_hash`.
4) End‑to‑end test s XMRig a potvrzení `accepted` share v pool logu.

## Genesis peněženka
- Soubor v repozitáři: `config/OFFICIAL_GENESIS_WALLET.conf`
- Je přimountována do seed kontejnerů na cestu: `/home/zion/.zion/OFFICIAL_GENESIS_WALLET.conf` (read‑only) přes compose.

## Logy dne
- `logs/DEPLOYMENT_2025-09-20_POOL_RANDOMX_STATUS.md` — podrobný zápis kroků, stav a doporučení.

— Připravil: 2025-09-20
