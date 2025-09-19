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

Pokud chcete zachovat jiný název větve, předejte ho jako druhý argument skriptu.

Poznámka: Dokud neprovedete kroky výše, klony vašeho hlavního repozitáře nebudou automaticky obsahovat obsah `zion-cryptonote`.

## Komponenty


### Amenti Library & dApp
- Data manifest: `data/amenti/library.json`
- Integration guide: `docs/dapp/amenti-integration.md`
- Purpose: Provide structured metadata (titles, links, images) for the NewEarth Amenti Library within a dApp UI.

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
