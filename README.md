# ZION Cryptocurrency

ZION je vlastní kryptoměna založená na Proof of Work algoritmu RandomX, optimalizovaná pro CPU mining.

## Vlastnosti

- **Algoritmus**: RandomX (stejný jako Monero)
- **Typ**: Proof of Work
- **Mining**: Optimalizováno pro CPU
- **Síť**: P2P blockchain
- **Jazyk**: C++17

## Komponenty

- **ziond** - Hlavní daemon blockchain sítě
- **zion_miner** - Mining daemon pro těžbu
- **zion_wallet** - Peněženka pro správu ZION coinů

## Sestavení

### Požadavky

- CMake 3.15+
- C++17 kompatibilní kompilátor
- OpenSSL
- Git (pro stažení RandomX)

### macOS

```bash
# Instalace závislostí
brew install cmake openssl

# Stažení RandomX
git submodule init
git submodule update

# Sestavení
mkdir build
cd build
cmake ..
make
```

### Použití

1. **Spuštění uzlu**:
   ```bash
   ./ziond
   ```

2. **Těžba**:
   ```bash
   ./zion_miner --threads 4
   ```

3. **Peněženka**:
   ```bash
   ./zion_wallet
   ```

## Parametry sítě

- **Max supply**: 21,000,000 ZION
- **Block time**: 2 minuty
- **Difficulty adjustment**: Každých 720 bloků (24 hodin)
- **Mining reward**: Počáteční 50 ZION, halvening každých 210,000 bloků

## Licencia

MIT License

## Session logs (Warp)

Dated session logs are stored under docs/sessions/YYYY-MM-DD/session-HHMMSS.md.

Generate a new log:
```bash
bash scripts/generate_session_log.sh --title "My work" --notes "what I did"
```
Or via Warp Workflows: "Capture session log".
