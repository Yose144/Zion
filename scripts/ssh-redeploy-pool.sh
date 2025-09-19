#!/usr/bin/env bash
set -euo pipefail

# Remote redeploy of seed nodes, rpc-shim and uzi-pool over SSH
# Usage: ./scripts/ssh-redeploy-pool.sh <server-ip> [user]

SERVER_IP="${1:-}"
SERVER_USER="${2:-root}"

if [[ -z "${SERVER_IP}" ]]; then
  echo "Usage: $0 <server-ip> [user]" >&2
  exit 1
fi

REMOTE_BASE="/opt/zion"
REMOTE_REPO_DIR="$REMOTE_BASE/Zion"
REPO_URL="https://github.com/Yose144/Zion.git"

echo "[ssh] Testing SSH connectivity to ${SERVER_USER}@${SERVER_IP}…"
if ! ssh -o BatchMode=yes -o ConnectTimeout=5 "${SERVER_USER}@${SERVER_IP}" 'echo SSH_OK' 2>/dev/null | grep -q SSH_OK; then
  echo "SSH not available without password. If you need password mode, use deploy-ssh.sh or setup ssh-copy-id." >&2
  exit 2
fi

echo "[ssh] Preparing remote workspace at $REMOTE_REPO_DIR…"
ssh "${SERVER_USER}@${SERVER_IP}" bash -s << 'REMOTE_CMDS'
set -euo pipefail
REMOTE_BASE="/opt/zion"
REMOTE_REPO_DIR="$REMOTE_BASE/Zion"
REPO_URL="https://github.com/Yose144/Zion.git"

sudo mkdir -p "$REMOTE_BASE"
sudo chown -R "$USER":"$USER" "$REMOTE_BASE"

if [[ -d "$REMOTE_REPO_DIR/.git" ]]; then
  echo "[remote] Repo exists, pulling latest…"
  git -C "$REMOTE_REPO_DIR" fetch --all --prune
  git -C "$REMOTE_REPO_DIR" reset --hard origin/master
  git -C "$REMOTE_REPO_DIR" submodule update --init --recursive
else
  echo "[remote] Cloning repo fresh…"
  git clone "$REPO_URL" "$REMOTE_REPO_DIR"
  git -C "$REMOTE_REPO_DIR" submodule update --init --recursive
fi

cd "$REMOTE_REPO_DIR"

echo "[remote] Ensuring docker network 'zion-seeds' exists…"
docker network create zion-seeds >/dev/null 2>&1 || true

echo "[remote] Checking daemon image tag…"
if ! docker image inspect zion:production-fixed >/dev/null 2>&1; then
  if docker image inspect zion:production >/dev/null 2>&1; then
    echo "[remote] Tagging zion:production -> zion:production-fixed"
    docker image tag zion:production zion:production-fixed
  else
    echo "[remote] WARNING: Neither zion:production-fixed nor zion:production is present. Seed containers may fail."
  fi
fi

echo "[remote] Building uzi-pool image (zion:uzi-pool)…"
docker build -t zion:uzi-pool -f docker/uzi-pool/Dockerfile .

echo "[remote] Building rpc-shim (no cache)…"
docker compose -f docker/compose.pool-seeds.yml build --no-cache rpc-shim

echo "[remote] Starting core services (seed1, seed2, redis)…"
docker compose -f docker/compose.pool-seeds.yml up -d seed1 seed2 redis

echo "[remote] Restarting rpc-shim & uzi-pool…"
docker compose -f docker/compose.pool-seeds.yml up -d --force-recreate rpc-shim uzi-pool

echo "[remote] Current service states:"
docker ps --format 'table {{.Names}}\t{{.Status}}\t{{.Ports}}' | (head -n1; grep -E 'zion-(seed1|seed2|redis|rpc-shim|uzi-pool)') || true

echo "[remote] Probing shim health:"
curl -s http://localhost:18089/ || true
echo
REMOTE_CMDS

echo "[ssh] Remote redeploy completed. You can follow logs with: ssh ${SERVER_USER}@${SERVER_IP} 'docker logs -f zion-uzi-pool'"
