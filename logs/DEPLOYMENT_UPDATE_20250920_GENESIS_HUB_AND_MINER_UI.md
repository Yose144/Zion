# Deployment Update – 2025‑09‑20 – SSH klíče, rychlý restart, Genesis Hub (Wallet+Miner) one‑click

Krátký souhrn kroků a změn zaměřených na rychlé spuštění minerů a sjednocení UX do jedné aplikace.

## Infrastrukturální kroky
- Přidány skripty:
  - `scripts/ssh-key-setup.sh` – nastavení ED25519 klíče + SSH multiplexing (bez opakovaných hesel).
  - `scripts/quick-restart-remote.sh` – rychlý restart vzdálených služeb (seed1/seed2/redis/rpc-shim/uzi-pool).
  - `scripts/run-xmrig-local.sh` – pomocník pro běh XMRig lokálně na macOS (M1), volitelně přes SSH tunel.
- Proveden rychlý restart stacku; port 3333 je publikován. Daemon zatím často vrací `Core is busy` při `getblocktemplate`.

## Test miner
- Přidán `docker/compose.test-miner.yml` a `docker/xmrig.config.json` pro rychlé testy.
- Opraveny argumenty XMRig (long options, JSON config). Lokální běh přes Homebrew ověřen; připojení na 3333 je odmítáno, dokud pool nevydává joby.

## Frontend – Genesis Hub (Wallet + Miner + Health)
- Nové stránky a utility:
  - `/hub` – sjednocený “Genesis Hub” s:
    - Wallet: validace adresy, QR (stažení PNG), kopírování adresy.
    - Miner: generátor XMRig příkazu, JSON config, one‑click download `run-xmrig.sh`/`.bat`, kopírovat příkaz.
    - Health: HTTP zdraví shim (18089) + info o stratum (3333).
    - Shareable link (inicializace z URL parametrů: `a`/`h`/`p`/`tls`/`algo`).
  - `/wallet`, `/miner` ponechány (nyní odkaz z homepage), sdílejí utilitu `app/utils/zion.ts`.
  - `app/api/health/route.ts` – jednoduchý probe shim endpointu.
  - `app/config.ts` – central host/port config s podporou `NEXT_PUBLIC_` proměnných.

## Stav k 2025‑09‑20
- Služby běží, port 3333 je otevřen, shim odpovídá.
- Pool getblocktemplate: často `{ "code": -9, "message": "Core is busy" }` – čekáme na ustálení daemonu nebo další ladění backoffu/serializace.

## Next
- Nechat daemon pár minut ustálit; pokud `Core is busy` přetrvá, zvýšit intervaly a/nebo jednorázově restart seed1.
- Jakmile pool začne vydávat joby, spustit miner (lokálně i vzdáleně) a ověřit accepted shares.
