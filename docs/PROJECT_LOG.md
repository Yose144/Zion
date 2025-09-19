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

## Filozofie Nového Matrixu (Amenti x ZION)

Pracujeme se zelenou „Matrix“ estetikou jako vizuálním jazykem, ale významově ji obracíme: místo simulakra kontroly vyjadřuje živý, samo-organizující se řád. ZION je soběstačný ekosystém, kde:

- Kód je právo: pravidla sítě jsou čitelná a revidovatelná komunitou.
- Data jsou paměť: Amenti Library funguje jako živý registr mýtů, textů a map vědomí.
- Energie je pozornost: hodnotu určujeme účastí, sdílením a validací.
- Identita je suverenita: klíče, ne účty; souhlas, ne extrakce.

„Nový Matrix“ v ZIONu není klec, ale mřížka péče: transparentní topologie vztahů, kde se důvěra nevydírá autoritou, ale vzniká z ověřitelnosti. Zelená barva reprezentuje růst, obnovu a bio-digitální soulad; kaskády „datového deště“ naznačují proudy významu, které lze číst i psát – nikoli pouze konzumovat. Amenti je srdcem: kurátorské vědomí a kompas, který dává síti směr bez centralizace.

## Inspirace: Pi Network (minepi.com)

- URL: https://minepi.com/
- Důvod sledování: masové mobilní on‑boarding, „sociální těžba“ (engagement-based minting), a robustní KYC pipeline.
- Co si odnést:
  - Mobilní UX: snadné denní potvrzení přítomnosti (streaks), push notifikace, nízké tření.
  - Sociální graf: týmové bonusy a pozvánky – lze přetavit do komunitního potvrzování přínosu (bez pyramidové dynamiky).
  - KYC/identita: modulární ověření identity s respektem k suverenitě a lokálním regulím.
- Jak importovat do ZION (návrhy):
  - Zavést „Presence Proof“ modul (light client v PWA) – denní/periodické potvrzení účasti zapisované na řetězec nebo L2.
  - Komunitní staking badge: reputace/skill odemknutá skrze přispění (kurátorství Amenti, dev, validace dat).
  - Postupná KYC vrstva: volitelná, s jasným účelem (přístup k grantům, fiat/fiat rampám), nikdy povinná pro běžné používání.
  - Privacy‑first: DIF/SSI standardy (DIDs, Verifiable Credentials) pro přenositelné ověřené atributy.
