# AI Session Log – 2025-09-19

Meta
- Time (UTC): 2025-09-19T00:00:00Z
- Host OS (local dev): macOS
- Default shell: zsh
- Server: Hetzner 91.98.122.165 (Ubuntu 22.04 via Docker)
- Repo: Zion (branch master)

## Cíle
- Nasadit ZION mainnet na server (daemon ziond, RPC 18081, P2P 18080)
- Zprovoznit těžební pool (3333) a monitoring
- Vytvořit ZION peněženku a nastavit těžbu
- Přechod na stabilnější základ: fork z CryptoNote (zion-cryptonote)
- Upravit monetární parametry: 144 miliard mincí, poplatky, porty, seed nody
- Opravit build a CI/CD (Docker, CMake, Boost, AES/SSE gated)

## Dosavadní průběh a klíčové body
- Původní nasazení vlastní RandomX daemona: P2P 18080 OK, RPC/Pool ne
  - Root cause: mismatch formátu konfigurace (daemon INI vs docker JSON), port konflikty
  - Workaround: sjednocení defaultů a debug logů; one-off container ukázal, že pool 3333 poslouchal, ale compose služba ho nespouštěla konzistentně
- Pivot na zion-cryptonote pro stabilnější baseline
  - Nastaveny parametry sítě, supply 144B, poplatky, porty, seed nody
  - Refaktor build systému: CMake policy guard, odstranění -Werror, robustní Threads a Boost detekce/link
  - Gating AESNI/SSE: kompilace na x86_64 i arm64 (bez -maes na aarch64)
  - Přejmenování binárek: ziond, zion_wallet, zion_miner, zion_walletd
  - Přidány Dockerfile a docker-compose pro Ubuntu 22.04

## Stav buildu (poslední iterace)
- CMake configure: OK po úpravách (Threads, Boost, -maes jen na x86_64)
- Kompilace: postupuje, ale zůstávají tyto chyby/blokátory:
  1) slow-hash.inl (non-AES path) stále odkazuje na __m128i/SSE typy na ne-x86, nutná čistě C fallback varianta nebo striktnější ifdefy v inl
  2) Chybí google/sparse_hash_set (fatal) – nahradit std::unordered_set/map nebo vendorovat sparsehash
  3) Místy chybějící <memory> u std::unique_ptr (např. INode.h vyžaduje <memory>, ICore.h již opraveno)
  4) Potenciální nesoulady signatur INode/BlockchainExplorer (ověřit a sjednotit)

## Změny v kódu (shrnutí)
- CMakeLists.txt (root a src):
  - Guard CMP0167, odstranění -Werror, přidání -pthread, robustní FindBoost bez tvrdé závislosti na Threads komponentách
  - Gating -maes pouze na x86_64; ARM64 bez SSE/AES intrinsics
- crypto/slow-hash.c:
  - Arch gating CN_HAVE_AESNI pouze pro x86_64; runtime výběr aesni/noaesni
  - Připraveno pro dvojí include slow-hash.inl (AESNI a no-AESNI varianty)
- CryptoNoteCore/ICore.h: přidán include <memory>
- tests/CMakeLists.txt: ENABLE_ZION_TESTS=OFF (by default), podmíněné linkování upnpc
- docker/Dockerfile.zion-cryptonote + compose: build/run na Ubuntu 22.04, expose 18080/18081, datadir volume
- docs/PROJECT_LOG.md: průběžné poznámky

## Síťové a peněžní parametry
- Supply: 144 000 000 000 (144B) jednotek
- Porty: P2P 18080, RPC 18081, Pool 3333
- Seed nodes: aktualizovány dle specifikace ZION
- Peněženka (vytvořená lokálně na Mac): 66eac3881f1faddc0a9e40a4485b36fa19bb4c5d0f854e1a770a8fec53a6b810

## Nasazení a infrastruktura
- Server: Hetzner (91.98.122.165)
- Docker compose pro ziond připraven, RPC/P2P mapovány, healthcheck přidán
- Pool a monitoring: zatím odloženo do doby, než bude ziond stabilně běžet

## Otevřené úkoly (todo)
1) slow-hash non-AES varianta bez __m128i na ARM/nez- x86
2) Nahradit google::sparse_hash_set/map za std::unordered_* nebo přidat jako vendored dependency
3) Doplňující <memory> includes (např. include/INode.h) a sjednocení API signatur
4) Dokončit build Ubuntu image (ziond, zion_wallet), spustit na Hetzner, otevřít RPC
5) Pool integrace (Stratum) a monitoring (prometheus/metric endpoint, případně jednoduché skripty)

## Další kroky
- Implementovat čistě C fallback v slow-hash.inl nebo přísněji oddělit AESNI sekce
- Nahradit sparse_hash_* použití v Blockchain.*
- Rebuild Docker image (docker/compose.zion-cryptonote.yml) a ověřit porty 18080/18081 zvenčí
- Poté řešit pool (port 3333) a jednoduchý monitoring

## Tipy k pokračování
- Pro rychlé uložení kontextu dne stačí spustit helper skript: scripts/generate_session_log.sh --title "Zion – denní stav" --notes "Stručný update"
- Tento log je uložen v docs/sessions/2025-09-19/ a navazuje na předchozí sezení (2025-09-16)

---
Tento soubor vznikl jako snapshot kontextu aktuální AI konverzace a prací kolem projektu, aby bylo možné příště plynule navázat.
