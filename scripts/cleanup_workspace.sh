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