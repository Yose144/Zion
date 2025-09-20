# ZION Cryptocurrency V2

ZION je vlastní kryptoměna založená na Proof of Work algoritmu RandomX, optimalizovaná pro decentralizovanou těžbu s podporou pool mining.

## 🎯 AKTUÁLNÍ STAV - ZION V2 s RandomX

### ✅ Nedávno dokončeno (2025-09-20):
- **Přechod na RandomX**: Migrace z CryptoNote na originální RandomX algoritmus
- **Nový Genesis**: Genesis hash `63c7c425546c897cca025b585d40fe5d76f5c0e98fe8c5d2c4c45594424ea2db`
- **OFFICIAL GENESIS Wallet**: `Z1Genesis2025MainNet9999999999999999999999999999999999999999999999999999999999`
- **Produkční server**: ZION V2 daemon běží na 91.98.122.165:18080

### 🔑 Genesis Wallet Access:
```
Lokace: /Users/yose/Zion/config/OFFICIAL_GENESIS_WALLET.conf
Network: zion-mainnet-v2
Algorithm: RandomX (rx/0)
```

### Inspirace: Pi Network
- **Web**: https://minepi.com/
- **UX vzory**: Mobilní on‑boarding, "sociální těžba", denní check-in streaks
- **Implementace v ZION**: Presence modul, komunitní validace, postupná KYC
- **Pozn.**: Referenční inspirace pouze; žádné vazby či integrace

## 🔨 Sestavení

### Požadavky
- **OS**: Linux (Ubuntu 20.04+) nebo macOS 12+
# ZION NETWORK V3

Síť ZION postavená na Proof‑of‑Work (RandomX) s referenčním stackem pro těžbu přes Stratum pool, RPC most (shim) a Next.js Genesis Hub pro on‑boarding minerů.

Aktuální stav: port 3333 je otevřen (Uzi pool běží), ale daemon může občas vracet “Core is busy” (-9) při getblocktemplate. Zavedli jsme delší backoff, serializaci GBT a nižší polling; pool jede přes RPC shim.

## Architektura V3

- ziond (seed1, seed2) — P2P 18080, RPC 18081
- RPC Shim (adapters/zion-rpc-shim) — Monero‑like JSON‑RPC na 18089, retry/backoff, mutex pro GBT, health `/`
- Uzi Pool (node‑cryptonote‑pool) — Stratum port 3333, Redis pro stav
- Genesis Hub (frontend/Next.js) — wallet + miner konfigurátor, health
- Docker Compose orchestrace (docker/compose.pool-seeds.yml)

Klíčové porty: 18080 (P2P), 18081 (RPC), 18089 (shim), 3333 (Stratum)

## Rychlý start (Docker)

```bash
# 1) Vytvoř síť pro stack (pokud ještě neexistuje)
docker network create zion-seeds || true

# 2) Spusť seed nody a Redis
docker compose -f docker/compose.pool-seeds.yml up -d seed1 seed2 redis

# 3) Postav a spusť RPC shim
docker compose -f docker/compose.pool-seeds.yml build --no-cache rpc-shim
docker compose -f docker/compose.pool-seeds.yml up -d rpc-shim

# 4) Postav Uzi pool image a spusť pool
docker build -t zion:uzi-pool -f docker/uzi-pool/Dockerfile .
docker compose -f docker/compose.pool-seeds.yml up -d uzi-pool

# 5) Ověř běh
curl -s http://localhost:18089/   # {"status":"ok"}
docker ps | grep zion-
```

Poznámky:
- Pool je připojen na rpc‑shim:18089, který tlumí špičky a sjednocuje RPC metody.
- Pool při startu čeká na zdraví shim, aby se daemon nezahltil GBT dotazy.

## GENESIS peněženka

- Oficiální GENESIS wallet je uložena v repozitáři v `config/OFFICIAL_GENESIS_WALLET.conf`.
- Při nasazení seed uzlů se tento soubor mountuje read‑only do kontejnerů na cestu:
	- `/home/zion/.zion/OFFICIAL_GENESIS_WALLET.conf`

## Handover a denní logy

- Handover pro Sonnet: `logs/HANDOVER_SONNET_2025-09-20.md`
- Dnešní status RandomX poolu: `logs/DEPLOYMENT_2025-09-20_POOL_RANDOMX_STATUS.md`

## Připojení mineru (XMRig)

- URL: stratum+tcp://<server>:3333
- User: ZION adresa (Z…)
- Pass: x
- Algo: rx/0

Příklad příkazu:
```bash
xmrig \
	--url stratum+tcp://<server>:3333 \
	--algo rx/0 \
	--user Zxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx \
	--pass x \
	--keepalive \
	--rig-id HUB \
	--donate-level 0
```

Genesis Hub (frontend) umí vygenerovat xmrig.json i spouštěcí skript.

## Genesis Hub (Frontend)

```bash
cd frontend
npm install
npm run dev   # http://localhost:3000
```
Funkce:
- Validace adresy a QR kód (PNG export)
- Generátor XMRig příkazu i JSON configu
- Health přehled (shim + konfig parametrů)

## Logy a diagnostika

- Runtime: logs/runtime/<timestamp>/
- Souhrn: logs/DEPLOYMENT_UPDATE_20250920_MOON_SUN_STAR_SUMMARY.md
- Shim a pool logy: docker logs a runtime snapshoty
- Sběr: scripts/collect_runtime_logs.sh

## Troubleshooting “Core is busy” (-9)

- Shim serializuje getblocktemplate (mutex) a exponenciálně čeká
- Pool má zvýšený blockRefreshInterval (~20 s)
- Po restartu dej uzlu 60–120 s warm‑up
- Zdraví shim: `curl -s http://<server>:18089/`

## Build (volitelné mimo Docker)

```bash
sudo apt update && sudo apt install -y build-essential cmake libboost-all-dev libssl-dev
# macOS: brew install cmake openssl boost

git clone https://github.com/Yose144/Zion.git
cd Zion && git submodule update --init --recursive
mkdir build && cd build
cmake .. -DCMAKE_BUILD_TYPE=Release
make -j$(nproc)   # macOS: -j$(sysctl -n hw.ncpu)
```

## Nasazení na server (SSH)

```bash
# Doporučeno: ssh-key-setup.sh pro bezheslové přihlášení
./scripts/ssh-redeploy-pool.sh <server-ip> [user]
```

## Úklid

```bash
bash scripts/cleanup_workspace.sh
bash scripts/cleanup_docker.sh
# volitelný git hook: bash scripts/install_git_hooks.sh
```

## Parametry sítě (shrnutí)

- Network ID: zion-mainnet-v1
- P2P: 18080 | RPC: 18081 | Stratum: 3333
- Block time: 120 s; Algo: RandomX (rx/0)
- Max supply: 144,000,000,000 ZION

## Licence

MIT — viz `LICENSE`

— Last updated: 2025‑09‑20 (V3)
## Sestavení
