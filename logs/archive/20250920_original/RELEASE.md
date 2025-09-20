# ZION Release Guide

## Tagging
- Bump verze pokud je třeba (include/zion.h) a zapiš změny do CHANGELOG.md
- Vytvoř tag:
  - git tag v1.0.0-rc1 -m "ZION v1.0.0-rc1"
  - git push origin v1.0.0-rc1

## CI build
- GitHub Actions workflow `.github/workflows/release.yml` se spustí na push tagu `v*`
- Vytvoří binární artefakty pro Linux a macOS a nahraje je do GitHub Release

## Balení artefaktů
- Workflow volá `scripts/package.sh` a vytvoří tar.gz balíčky:
  - zion-<platform>-<arch>.tar.gz

## Poznámky
- Před publikací vyplň v configu [blockchain] genesis_hash
- Pro produkční genesis generuj hash bez snížení obtížnosti (`--max-bits` nepoužívat)
