# Changelog

## v1.0.0-rc1 – 2025-09-16
- P2P: VERSION/VERACK s kontrolou network_id/chain_id
- P2P: GETHEADERS/HEADERS + INV/GETDATA/BLOCK/TX (základní synchronizace a gossip)
- Mempool: validace TX (UTXO vstupy, sumy, vynucení min. poplatku na KB)
- Pool server: vestavěný TCP (GETWORK/SUBMIT), příprava pro pool mining
- Genesis tool: zion_genesis pro výpočet a zápis genesis hash
- Docker: build image a docker-compose pro seed nody
- Build: CMake, artefakty pro Linux/macOS
