# ZION project log

Tento soubor zachycuje klíčová rozhodnutí, změny a kroky při přechodu na CryptoNote fork a nasazení mainnetu.

## Parametry sítě
- Název: zion
- Celková nabídka: 144 000 000 000 ZION (8 desetinných míst)
- Minimální fee: 0.001 ZION
- Block time (DIFFICULTY_TARGET): 120 s
- Porty: P2P 18080, RPC 18081
- Seed node: 91.98.122.165:18080

## Změny v kódu
- slow-hash.c: Přidány guardy pro ARM64 (NO_AES_NI), vypnuto AESNI na ARM64 a odstraněno volání CPUID na ARM64.
- src/CMakeLists.txt:
  - Opraven překlep v source_group proměnné.
  - Odebrána povinná závislost na upnpc-static, nyní linkováno podmíněně.
  - Přejmenovány binárky: ziond (daemon), zion_wallet (CLI peněženka), zion_miner (miner), zion_walletd (payment gateway).
- tests/CMakeLists.txt: Přidána volba ENABLE_ZION_TESTS (default OFF) a odstraněna povinná závislost na upnpc-static.
- CMake (root): Nastaven CMP0167 OLD pro Boost a mitigace pro macOS/ARM64 (bez -maes, mírnější -O2, explicitní Boost cesty na macOS).

## Build poznámky
- macOS (Apple Silicon): AES/SSE instrukce nejsou použity, build by měl projít; nicméně doporučené referenční buildy dělat na Ubuntu x86_64.
- Linux (Ubuntu 22.04+): Doporučený cílový build; vyžaduje balíčky: build-essential, cmake, libboost-all-dev, libssl-dev, libunbound-dev (dle potřeby).
- Testy jsou defaultně vypnuté (ENABLE_ZION_TESTS=OFF).

## Nasazení
- Cílem je ziond běžící na 91.98.122.165 s otevřenými porty 18080/18081.
- Pool vrstva bude přidána následně (výběr software/stratum TBD) po stabilizaci daemonu.

## Další kroky
- Implementovat BTC-like halving (vyžaduje změnu odměnové funkce mimo klasický emission speed factor CryptoNote).
- Přidat docker build pro zion-cryptonote a docker-compose službu s healthchecky.
- Monitoring (Prometheus endpoint nebo lehký exporter nad RPC).

Datum: 2025-09-19
Autor: automatizovaný asistent
