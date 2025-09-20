#!/usr/bin/env bash
set -euo pipefail

echo "[cleanup] Docker: zastavuji uzi-pool test miner orphans (pokud existují)…"
docker ps -aq --filter name=zion-xmrig-test | xargs -r docker rm -f || true

echo "[cleanup] Docker: smazání dangling image a cache (volitelné)…"
docker image prune -f || true
docker builder prune -f || true

echo "[cleanup] Git: přidání a commit pracovních změn…"
git add -A
git status --short

echo "[cleanup] Hotovo. Pro push použij: scripts/push_logs.sh"
#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."

# Remove local build artifacts and caches
rm -rf build CMakeCache.txt CMakeFiles 2>/dev/null || true
find . -type d -name CMakeFiles -prune -exec rm -rf {} + 2>/dev/null || true
find . -type f -name "*.o" -delete 2>/dev/null || true
find . -type f -name "*.a" -delete 2>/dev/null || true
find . -type f -name "*.so" -delete 2>/dev/null || true

# Optional: prune test and temp logs
rm -f daemon_test.log miner_test.log 2>/dev/null || true
rm -rf logs/* 2>/dev/null || true

echo "Workspace cleanup done."