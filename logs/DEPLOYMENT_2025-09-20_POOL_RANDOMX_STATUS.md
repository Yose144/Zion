\n## Update – RandomX share processing patched (ARM64) and connectivity check
- Implementováno runtime patchování uzi‑poolu, které obchází CryptoNight/multi‑hashing na ARM64:
  - Zjednodušen `IsBannedIp` a vložena vlastní `processShare(...)`, která věří minerovu `result` hash a počítá obtížnost přes bignum.
  - Při překročení `blockTemplate.difficulty` se pokusí zavolat `submitblock` s blobem z `cryptonote-util.construct_block_blob`.
## Update — End-to-end těžba OK: submitblock prochází, výška roste (2025-09-20)

- Pool nyní úspěšně nachází a odesílá bloky, daemon je přijímá:
  - uzi-pool log: `Block … found … submit result: {"status":"OK"}` (např. h=8, h=9 ~18:10:47/52)
  - ihned následuje `New block to mine at height <n+1>`
- RPC shim/daemon potvrzuje růst výšky: `getheight => { height: 12 }` (přes shim na 18089)
- getblocktemplate mapování stabilní (reserved_offset ~462, tplLen ~940) — joby se regenerují po každém přijetí bloku.

Poznámky:
- „Core is busy (-9)“ na submitblock vyřešeno úpravou RPC serveru (povoleno submitblock i v busy režimu pro test síť) a dočasným uvolněním readiness v izolovaném prostředí.
- Share path v uzi-poolu nyní konstruuje blob přes `cryptonote-util.construct_block_blob(headerBuffer, nonceBuffer)` a předává správné Buffery.

Další kroky (priorita):
1) Payout pipeline: napojit pool na zion_wallet(d) a otestovat maturitu coinbase → výplatní transakce.
2) Zpřísnit readiness v daemonu (vrátit standardní isCoreReady), ponechat jen submitblock „allow while busy“.
3) P2P peering seed1↔seed2 + perzistence dat volume; otevřít p2p porty ven, přidat seeds.
4) Observabilita: lehký metrics/health endpoint v rpc-shim (height, diff, submit OK rate, orphan rate).


  - Odstraněna závislost na CryptoNight v share path (žádné pády workeru).
- Image `zion:uzi-pool` znovu postaven a nasazen; při startu: `[patch-rx] Patched pool.js for RandomX/ARM64`.
- Služby běží:
  - Stratum: 0.0.0.0:3333 (zion-uzi-pool) – port je publikován z kontejneru na hosta.
  - RPC shim: 0.0.0.0:18089 (zion-rpc-shim).
- Log uzi‑pool po nasazení: žádná výjimka „Multi‑hashing disabled for ARM64“, opakovaná připojení mineru, probíhá retarget.

Externí miner (Ryzen) – pokud hlásí „Connection refused“:
- Zkontrolujte, že se připojujete na veřejnou nebo LAN IP tohoto hosta a port 3333 (např. `stratum+tcp://<IP_MAC>:3333`).
- Na hostu je port namapovaný (docker ps: `0.0.0.0:3333->3333/tcp`). Pokud jste mimo LAN, zajistěte NAT/port‑forward 3333 a povolení ve firewallu.
- Rychlé testy:
  - Z Ryzen: `nc -vz <IP_MAC> 3333` (ověření, že port poslouchá a není blokován cestou).
  - Na hostu: `lsof -iTCP -sTCP:LISTEN | grep 3333` – stratum je otevřeno.

Pozn.: Pokud by XMRig vyžadoval v login reply explicitní `algo: 'rx/0'`, lze injekci znovu zapnout (aktuálně spoléháme na konfig mineru s `rx/0`).

# ZION Pool – RandomX stav (2025-09-20)

Algoritmus: RandomX (rx/0)
Stav: Stratum pool online, RPC shim OK, seed nody běží (izolovaný režim)
Pool adresy: `config/adapters/uzi-pool-config/config.json` – poolAddress nastaven na lokální peněženku
XMRig test: přihlášení OK, přiděleny joby (rx/0, height 1), těžba běží (omezený dataset → slow mode v Dockeru)
Známé poznámky: občasné reconnect po startu (EOF), stabilizuje se; doporučeno navýšit paměť / hugepages pro vyšší výkon

Výřezy z logů:
XMRig: "new job … diff 1000 algo rx/0 height 1"
Pool: "Started server listening on port 3333" a "New block to mine at height 1"

Další kroky:
Vyladit výkon mineru (Huge Pages, více RAM)
Ověřit share submission end-to-end a `submitblock` přes shim
Přidat metriky (height, diff) do jednoduchého monitoringu
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
