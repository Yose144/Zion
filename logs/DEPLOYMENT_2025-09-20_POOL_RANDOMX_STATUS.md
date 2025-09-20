# 2025-09-20 — Uzi-Pool (Stratum 3333) + RPC Shim + XMRig status

Tento log shrnuje dnešní iterace nad Stratum poolem (uzi-pool), RPC shimem a testovacím minerem (XMRig) pro ZION V2 (RandomX, rx/0).

## Provedené kroky

- Postaven image `zion:uzi-pool` z `docker/uzi-pool/Dockerfile` (Node 8, Debian stretch EOL repa přesměrována na archive.debian.org).
- Opraveny build-time závislosti (bignum, cryptoforknote-util, cryptonight-hashing, node-lmdb) — build OK.
- Nasazen compose stack `docker/compose.pool-seeds.yml`: seed1, seed2, redis, rpc-shim, uzi-pool.
- Vyřešen crash uzi-poolu způsobený `TypeError: buffArray.reverse is not a function` v `/app/lib/pool.js` (Node Buffer.toJSON vrací `{ type, data }`).
  - Dočasná manuální in-container oprava (perl/sed) přidala kontrolu `if (buffArray && buffArray.data) buffArray = buffArray.data;`.
  - Změny buffera ponechány konzervativně (pouze fix pole; `new Buffer` nechán, Node 8 varuje, ale neběží to kriticky).
- Uzi-pool po opravě startuje a poslouchá na portu 3333. Shim zdravý na 18089.
- XMRig se připojí, ale hlásí `login error code: 7` (autorizace/validace adresy/job mapa).
- Upravena coin konfigurace poolu tak, aby šla přes shim (Monero-like API) místo přímého seed1:
  - `adapters/uzi-pool-config/coins/zion.json`: daemon `rpc-shim:18089`, `rpcPath: "/"`.

## Aktuální stav

- seed1, seed2: běží, genesis konzistentní, ekonomi cíl: 333 ZION/blok, t=120s, halving 210k, max supply 144B.
- rpc-shim: běží, poskytuje aliasy metod (getblocktemplate, submitblock, getheight, atd.) a cache GBT.
- uzi-pool: běží na 3333, po fixu Bufferu nespadne; stále odmítá přihlášení minerů (kód 7).
- XMRig: připojení OK, po authorize: `login error code: 7`.

## Příčina a hypotéza

- Chyba loginu pravděpodobně vyplývá z validace adresy/parametrů v uzi-poolu, případně z mapování polí v RPC shim → daemon (rezerved_offset, template blob název).
- Další možnost: coin profil (zion.json) či config poolu očekává jiný formát/nepovolenou regex validaci (již uvolněna na `".*"`).

## Doporučené další kroky

1) Zreprodukovat a trvale aplikovat Buffer patch při build-time nebo v entrypointu image (bez křehkého inline `node -e`).
   - Jednoduché řešení: během build kroku nahradit řádek `var buffArray = buff.toJSON();` za verzi s `.data` kontrolou pomocí `sed -ri` a ověřit.
2) Zkontrolovat login handler v uzi-pool (typicky `lib/pool.js` a `lib/stratum.js`) a vypnout/změkčit validaci adres.
3) Ověřit shim mapování polí z `getblocktemplate` (blob, prev_hash, reserved_offset) versus očekávání poolu.
4) Otestovat end-to-end s XMRig a záznamem share submit v pool logu.

## Poznámky

- Port 3333 je vyhrazen pro uzi-pool; ziond nic na 3333 neposlouchá.
- GENESIS peněženka je perzistentně mountována do seed kontejnerů (viz níže).

---

Log vytvořen: 2025-09-20.
