# UZI Pool – Build & Run Update (2025-09-20)

Cíl: Zprovoznit reálný Stratum pool na portu 3333 (XMRig kompatibilní) přes node-cryptonote-pool + ZION RPC shim. Port 3333 má zůstat otevřený i během iterací.

## Akce

- Postaven nový image `zion:uzi-pool` z `docker/uzi-pool/Dockerfile` (node:8-stretch):
  - Opraveny EOL repozitáře (archive.debian.org) a invalid-until.
  - Přidány system deps: git, python, make, g++, libssl-dev, libboost-all-dev, libsodium-dev.
  - Přepis `git://` na `https://` kvůli časovým limitům.
  - NPM nativní moduly úspěšně zbuildovány: bignum, cryptonote-util, multi-hashing.

- Aktualizace `docker/compose.pool-seeds.yml`:
  - U služby `uzi-pool` odstraněn build a ponechán pouze image tag `zion:uzi-pool` (použijeme předem postavený image).

- Úprava `adapters/uzi-pool-config/config.json`:
  - Převedeno na (předpokládaný) formát `poolServer.poolAddress` a `coin` (statická konfigurace pro Stratum 3333/0.0.0.0).

- RPC shim vylepšen (commit uživatele):
  - Aliasy metod: getblocktemplate/getheight/submitblock, batch handling, tolerantní JSON parser.

## Výsledky

- Build image: OK
  - Log shrnutí: bignum fallback build OK, cryptonote-util OK, multi-hashing OK.

- Spuštění kontejneru `zion-uzi-pool`: kontejner startuje, ale ihned padá chybou v `configReader.js`:

```
TypeError: Cannot read property 'poolAddress' of undefined
    at Object.<anonymous> (/app/lib/configReader.js:23:67)
```

- Pozn.: `docker ps` neukázal port binding `3333` (kontejner nestihl naběhnout). Compose varuje, že síť `zion-seeds` už existuje (možno označit jako `external: true`).

## Hypotéza příčiny

- Použitý pool (zone117x/node-cryptonote-pool) očekává konkrétní strukturu `config.json`. Přestože jsme přidali `poolServer.poolAddress`, v běhu je `config.poolServer` stále `undefined`.
  - Možné důvody:
    - Entrypoint sice symlinkuje `/config/config.json` -> `/app/config.json`, ale pool načítá jiný soubor/název (jiný loader nebo struktura configu).
    - Skutečný požadovaný formát odpovídá starší verzi: např. `poolServer` uvnitř `defaultPool` nebo jiné klíče (donace, redis, payments…), které ovlivňují validaci.

## Další kroky (navržené)

1) Porovnat s příklady konfigurací v repu poolu (config_examples) a upravit `config.json` tak, aby seděl 1:1 s očekáváním `lib/configReader.js`.

2) Pro jistotu namapovat konfiguraci přímo na `/app/config.json` přes volume místo rely na entrypoint symlink:
   - Nebo přidat log výpis `cat /app/config.json` na start pro rychlou validaci obsahu.

3) Přidat Redis (pokud pool vyžaduje) do compose a případně vypnout payments/unlocker, aby běžel jen Stratum:
   - Minimální konfigurace pro rychlé otevření 3333 a handshaky se Stratum klienty.

4) Re-create `zion-uzi-pool` po úpravě configu a ověřit logy + zveřejnění portu 3333.

5) Ověřit end-to-end s XMRig (tcp://SERVER:3333), sledovat share submit v logu poolu.

## Artefakty a změny v repozitáři

- docker/uzi-pool/Dockerfile – legacy Node 8 + Boost/Sodium, úspěšný build.
- docker/compose.pool-seeds.yml – u `uzi-pool` používáme jen `image: zion:uzi-pool`.
- adapters/uzi-pool-config/config.json – nový formát s `poolServer.poolAddress` (může vyžadovat další doladění).
- adapters/zion-rpc-shim/server.js – aliasy metod pro kompatibilitu s pool sw (commit uživatele).

## Stav cíle “port 3333 otevřen“

- Trvalé otevření portu 3333 aktuálně blokuje pád `zion-uzi-pool` při načítání konfigurace.
- Dočasný stub na 3333 je připraven k opětovnému povolení, pokud potřebujeme udržet port otevřený veřejně během ladění.

---

Log vytvořen: 2025-09-20. Pokračujeme úpravou konfigurace poolu dle přesného očekávání `configReader.js` a případným doplněním Redis/disable payments.
