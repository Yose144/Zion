# ZION Cryptocurrency

ZION je vlastní kryptoměna založená na Proof of Work algoritmu RandomX, optimaliz### Inspirace: Pi Network
- **Web**: https://minepi.com/
- **UX vzory**: Mobilní on‑boarding, "sociální těžba", denní check-in streaks
- **Implementace v ZION**: Presence modul, komunitní validace, postupná KYC
- **Pozn.**: Referenční inspirace pouze; žádné vazby či integrace

## 🔨 Sestavení

### Požadavky
- **OS**: Linux (Ubuntu 20.04+) nebo macOS 12+
- **CPU**: 4+ cores (RandomX optimalizace)
- **RAM**: Minimum 4GB, doporučeno 8GB pro mining
- **Disk**: 50GB+ pro blockchain data
- **Síť**: Stabilní připojení, otevřené porty 18080, 18081

### Linux (Ubuntu/Debian)
```bash
# Závislosti
sudo apt update
sudo apt install -y build-essential cmake libboost-all-dev libssl-dev

# Clone a build
git clone https://github.com/Yose144/Zion.git
cd Zion
git submodule update --init --recursive
mkdir build && cd build
cmake .. -DCMAKE_BUILD_TYPE=Release
make -j$(nproc)
```U mining. Projekt kombinuje robustní blockchain infrastrukturu s moderním frontend dApp ekosystémem.

## 🚀 Vlastnosti

- **Celková nabídka**: 144,000,000,000 ZION (144 miliard tokenů)
- **Block time**: 120 sekund (2 minuty)
- **Minimální poplatek**: 0.001 ZION
- **Těžební algoritmus**: RandomX (CPU optimalizovaný)
- **Porty**: 18080 (P2P), 18081 (RPC), 3333 (Pool)

## 📱 Frontend dApp

### Next.js Web Aplikace
```bash
cd frontend
npm install
npm run dev    # Development server na portu 3000
npm run build  # Production build
```

### Funkce dApp:
- **Amenti Library**: Katalog duchovních textů s filtry (kategorie, jazyk)
- **Matrix Theme**: Zelená estetika s DataRain efektem (dark mode)
- **InteractiveEarth**: Drátový glóbus s uzly v hlavičce
- **Responzivní design**: Hamburger menu pro mobily/tablety (≤1100px)
- **Presence check-in**: Denní streak tracking v localStorage
- **Theme toggle**: Dark/light mode přepínač

### Komponenty:
- `app/components/ThemeShell.tsx` - Hlavní layout s navigací
- `app/components/DataRain.tsx` - Matrix "data rain" overlay
- `app/components/InteractiveEarth.tsx` - 3D wireframe globe
- `app/components/Presence.tsx` - Daily check-in widget
- `app/amenti/page.tsx` - Amenti Library browser
- `app/api/amenti/route.ts` - API endpoint pro manifest

## 🔧 Zion-Cryptonote jako submodul (doporučeno)

Aktuálně je složka `zion-cryptonote` uvnitř tohoto repozitáře jako „embedded repo“ (gitlink bez .gitmodules). Doporučený stav je mít ji jako plnohodnotný git submodul, aby šla jednoduše verzovat a updatovat.

Postup dokončení konverze na submodul:

1) Na GitHubu vytvořte prázdný repozitář (např. `Yose144/zion-cryptonote`).

2) Spusťte skript, který pushne lokální větev s úpravami a z drženého „embedded“ repozitáře vytvoří submodul:

```bash
# Nahraďte URL vlastní URL nově vytvořeného repozitáře
scripts/convert_to_submodule.sh https://github.com/YOUR_GH_USER/zion-cryptonote.git zion-mainnet
```

Skript provede:

Pokud chcete zachovat jiný název větve, předejte ho jako druhý argument skriptu.

Poznámka: Dokud neprovedete kroky výše, klony vašeho hlavního repozitáře nebudou automaticky obsahovat obsah `zion-cryptonote`.

## 🏗️ Komponenty

### Blockchain Core
- **ziond**: Hlavní daemon (P2P + RPC server)
- **zion_wallet**: CLI peněženka
- **zion_miner**: CPU miner s pool podporou
- **zion_walletd**: Wallet daemon service

### Docker Deployment
```bash
# Rychlé nasazení (production ready)
git clone https://github.com/Yose144/Zion.git
cd Zion && git submodule update --init --recursive
docker-compose -f docker-compose.prod.yml up -d

# Ověření
curl http://localhost:18081/getheight
# Expected: {"height":1,"status":"OK"}
```

### Frontend dApp
- **Framework**: Next.js 14 + React 18 + TypeScript
- **Styling**: Custom CSS-in-JS s Matrix green tématikou
- **API**: RESTful endpoint pro Amenti manifest
- **Assets**: SVG loga, abstract graphics, cover images

### Amenti Library & dApp
- **Data manifest**: `data/amenti/library.json` - strukturovaná metadata knih
- **Schema**: `data/amenti/schema.json` - JSON schema pro validaci
- **Integration guide**: `docs/dapp/amenti-integration.md`
- **Demo**: `docs/dapp/demo.html` - statická preview
- **Purpose**: Katalog duchovních textů NewEarth projektu v dApp UI

### Branding & Assets
- **Brand guide**: `docs/BRANDING.md` - barvy, typography, voice
- **Logo primary**: `assets/logos/zion-amenti.svg` - Amenti-inspirované logo
- **Logo legacy**: `assets/logos/zion.svg` - původní Z mark
- **Graphics**: `frontend/public/graphics/` - abstraktní SVG symboly

### Documentation
- **Deployment**: `DEPLOYMENT_GUIDE.md` - production setup
- **Project log**: `docs/PROJECT_LOG.md` - klíčová rozhodnutí a filozofie
- **Session logs**: `docs/sessions/` - automatické AI session záznamy
- **Knowledge base**: `GPT5_COMPLETE_KNOWLEDGE_BASE.md` - handoff dokumentace

### Inspirace: Pi Network
- Web: https://minepi.com/
- Důvod: masový mobilní on‑boarding a „sociální těžba“ – zajímavé UX vzory pro ZION PWA.
- Pozn.: Referenční inspirace, žádné vazby či integrace; jakýkoli import konceptů musí respektovat suverenitu uživatelů, etiku a regulace.

### Branding
- Draft guide: `docs/BRANDING.md`
- Logo SVG: `assets/logos/zion.svg`

## Sestavení

### Požadavky


### macOS
```bash
# Závislosti
brew install cmake openssl boost

# Clone a build
git clone https://github.com/Yose144/Zion.git
cd Zion
git submodule update --init --recursive
mkdir build && cd build
cmake .. -DCMAKE_BUILD_TYPE=Release
make -j$(sysctl -n hw.ncpu)
```

### Docker (doporučeno pro production)
```bash
# Single command deployment
docker-compose -f docker-compose.prod.yml up -d

# Custom build
docker build -f docker/Dockerfile.zion-cryptonote.prod -t zion:custom .
```

## 💼 Použití

### 1. Spuštění uzlu:
```bash
./build/ziond --config=./config/mainnet.conf
# nebo
docker run -d -p 18080:18080 -p 18081:18081 zion:production
```

### 2. Frontend dApp:
```bash
cd frontend
npm run dev
# Aplikace dostupná na http://localhost:3000
```

### 3. CPU Těžba:
```bash
# Solo mining
./build/zion_miner --threads 4 --address YOUR_ZION_ADDRESS

# Pool mining
./build/zion_miner --pool pool.zion.network:3333 --user YOUR_ADDRESS --threads 4
```

### 4. Peněženka:
```bash
# CLI wallet
./build/zion_wallet

# Wallet daemon (REST API)
./build/zion_walletd --config wallet.conf
```

## 🌐 Parametry sítě

- **Network ID**: zion-mainnet-v1
- **Chain ID**: 1
- **Genesis timestamp**: 1734355200 (16. prosinec 2024)
- **P2P port**: 18080
- **RPC port**: 18081
- **Pool port**: 3333
- **Seed nodes**: 91.98.122.165:18080

### Ekonomické parametry:
- **Max supply**: 144,000,000,000 ZION
- **Decimals**: 8
- **Initial block reward**: 50 ZION
- **Halving**: Každých 210,000 bloků
- **Target block time**: 120 sekund


## 📊 Monitoring a Status

### Blockchain Health:
```bash
# Výška blockchainu
curl http://localhost:18081/getheight

# Info o síti
curl http://localhost:18081/getinfo

# Peer seznam
curl http://localhost:18081/get_peer_list

# Pool stats
curl http://localhost:3333/stats
```

### Container Health:
```bash
# Docker status
docker ps | grep zion

# Logy
docker logs zion-production

# Resource usage
docker stats zion-production
```

## 🔗 Užitečné odkazy

### Oficiální:
- **Repository**: https://github.com/Yose144/Zion
- **Deployment guide**: `DEPLOYMENT_GUIDE.md`
- **Issues**: https://github.com/Yose144/Zion/issues

### NewEarth projekt:
- **Main site**: https://newearth.cz
- **Blog**: https://projektnewearth.blogspot.com/
- **Halls of Amenti**: https://newearth.cz/V2/halls.html

### Related inspirations:
- **Pi Network**: https://minepi.com/ (UX reference)
- **WingMakers**: https://wingmakers.com/ | https://tvurcikridel.cz/
- **VedaBase**: https://vedabase.io/en/library/

## 🚧 Úklid a údržba

### Lokální cleanup:
```bash
# Úklid repozitáře (build artefakty, logy)
bash scripts/cleanup_workspace.sh

# Úklid Dockeru (vyžaduje běžící Docker Desktop)
bash scripts/cleanup_docker.sh
```

### Session logs:
```bash
# Generování session logu
bash scripts/generate_session_log.sh --title "My work" --notes "what I did"

# Logs umístění
ls docs/sessions/YYYY-MM-DD/
```

## 📝 Licencia

## 📝 Licencia

MIT License - viz `LICENSE` file

## 🤖 AI Development

### Session logs (Warp):
Dated session logs jsou uloženy v `docs/sessions/YYYY-MM-DD/session-HHMMSS.md`.

Generování nového logu:
```bash
bash scripts/generate_session_log.sh --title "My work" --notes "what I did"
```
Nebo přes Warp Workflows: "Capture session log".

### GPT-5 Handoff:
Kompletní knowledge base pro AI continuity v `GPT5_COMPLETE_KNOWLEDGE_BASE.md`.

### Development Status:
- ✅ **Blockchain core**: Production ready
- ✅ **Docker deployment**: Multi-stage build s healthchecks
- ✅ **Frontend dApp**: Next.js s responsive nav a Matrix tématikou
- ✅ **Amenti Library**: Manifest + API + UI s filtry
- ✅ **Documentation**: Kompletní deployment a development guides
- 🔄 **Mobile optimization**: PWA a mobile-first features (v další fázi)

---

**Status**: Production Ready ✅  
**Last Updated**: 2025-09-19  
**Version**: 1.0.1-dev  
**Frontend**: zion-frontend@0.1.0
