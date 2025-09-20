# Changelog

## v1.0.1-dev – 2025-09-19
### Infrastruktura a CI/CD
- GitHub Actions CI: automatické buildy native a Docker, upload binárních artefaktů
- Cleanup skripty: `scripts/cleanup_workspace.sh` a `scripts/cleanup_docker.sh`
- Docker optimalizace: .dockerignore, APT gzip indexy + retry, procps v runtime image
- Submodule conversion: zion-cryptonote převedeno na plnohodnotný Git submodul (branch zion-mainnet)

### CryptoNote Build Fixes
- Sparsehash kompatibilita: vendored headers, std::unordered_* namísto google::sparse_*
- Constexpr fixes: random_engine min/max pro C++17 compliance
- Non-AES fallback: slow-hash.c pro CPU bez AES-NI
- Removed set_deleted_key: přechod na std containers API

### Session Management
- Automatické session logy: `docs/sessions/YYYY-MM-DD/ai-session-*.md`
- Generator skript: `scripts/generate_session_log.sh`
- Warp Workflows integrace

### Deployment
- Hetzner setup guide: `docs/hetzner-setup.md`
- Docker Compose orchestrace: P2P 18080, RPC 18081, pool 3333
- Pool monitoring a backup skripty

## v1.0.0-rc1 – 2025-09-16
- P2P: VERSION/VERACK s kontrolou network_id/chain_id
- P2P: GETHEADERS/HEADERS + INV/GETDATA/BLOCK/TX (základní synchronizace a gossip)
- Mempool: validace TX (UTXO vstupy, sumy, vynucení min. poplatku na KB)
- Pool server: vestavěný TCP (GETWORK/SUBMIT), příprava pro pool mining
- Genesis tool: zion_genesis pro výpočet a zápis genesis hash
- Docker: build image a docker-compose pro seed nody
- Build: CMake, artefakty pro Linux/macOS
