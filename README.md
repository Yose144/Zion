# ZION Cryptocurrency

ZION je vlastní kryptoměna založená na Proof of Work algoritmu RandomX, optimalizovaná pro CPU mining.

## Vlastnosti


## Zion-Cryptonote jako submodul (doporučeno)

Aktuálně je složka `zion-cryptonote` uvnitř tohoto repozitáře jako „embedded repo“ (gitlink bez .gitmodules). Doporučený stav je mít ji jako plnohodnotný git submodul, aby šla jednoduše verzovat a updatovat.

Postup dokončení konverze na submodul:

1) Na GitHubu vytvořte prázdný repozitář (např. `Yose144/zion-cryptonote`).

2) Spusťte skript, který pushne lokální větev s úpravami a z drženého „embedded“ repozitáře vytvoří submodul:

```bash
# Nahraďte URL vlastní URL nově vytvořeného repozitáře
scripts/convert_to_submodule.sh https://github.com/YOUR_GH_USER/zion-cryptonote.git zion-mainnet
```

Skript provede:
- push větve `zion-mainnet` z adresáře `zion-cryptonote` do vašeho vzdáleného repozitáře,
- odstranění stávajícího gitlinku ze stagingu a přidání korektního git submodulu se zadanou URL a větví,
- aktualizaci `.gitmodules` s `branch = zion-mainnet`,
- commit změn v hlavním repozitáři.

Pokud chcete zachovat jiný název větve, předejte ho jako druhý argument skriptu.

Poznámka: Dokud neprovedete kroky výše, klony vašeho hlavního repozitáře nebudou automaticky obsahovat obsah `zion-cryptonote`.

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

## Úklid (disk/místo)

Pokud dochází místo (např. Docker na macOS selhává na I/O), použijte:

```bash
# Úklid repozitáře (build artefakty, logy)
bash scripts/cleanup_workspace.sh

# Úklid Dockeru (vyžaduje běžící Docker Desktop)
bash scripts/cleanup_docker.sh
```

Pozn.: CI (GitHub Actions) nahrává build artefakty, takže lokální build není nutný pro ověření změn.
