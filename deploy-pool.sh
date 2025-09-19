#!/usr/bin/env bash
set -euo pipefail

HOST=${1:-"91.98.122.165"}
USER=${2:-"root"}

echo "==> Deploying Zion pool + seeds to $USER@$HOST"

ssh "$USER@$HOST" bash -lc '
  set -euo pipefail
  echo "[server] Ensuring docker + compose present"
  if ! command -v docker >/dev/null 2>&1; then
    apt-get update && apt-get install -y docker.io
    systemctl enable --now docker
  fi
  if ! docker compose version >/dev/null 2>&1; then
    apt-get update && apt-get install -y docker-compose-plugin || true
  fi

  echo "[server] Creating /opt/zion-pool workspace"
  mkdir -p /opt/zion-pool

  echo "[server] Writing compose file"
  cat > /opt/zion-pool/compose.yml <<EOF
version: "3.8"
services:
  seed1:
    image: zion:production-fixed
    container_name: zion-seed1
    restart: unless-stopped
    command: ["/usr/local/bin/ziond","--data-dir","/home/zion/.zion","--p2p-bind-port","18080","--rpc-bind-port","18081","--rpc-bind-ip","0.0.0.0","--log-level","2"]
    volumes:
      - seed1-data:/home/zion/.zion
    networks: [zion-seeds]

  seed2:
    image: zion:production-fixed
    container_name: zion-seed2
    restart: unless-stopped
    command: ["/usr/local/bin/ziond","--data-dir","/home/zion/.zion","--p2p-bind-port","18080","--rpc-bind-port","18081","--rpc-bind-ip","0.0.0.0","--seed-node","zion-seed1:18080","--log-level","2"]
    volumes:
      - seed2-data:/home/zion/.zion
    depends_on: [seed1]
    networks: [zion-seeds]

  pool:
    image: zion:production-fixed
    container_name: zion-pool
    restart: unless-stopped
    command: ["/usr/local/bin/ziond","--data-dir","/home/zion/.zion","--pool-mode","--pool-port","3333","--pool-bind-ip","0.0.0.0","--seed-node","zion-seed1:18080","--log-level","2"]
    volumes:
      - pool-data:/home/zion/.zion
    depends_on: [seed1, seed2]
    ports:
      - "3333:3333"
    networks: [zion-seeds]

volumes:
  seed1-data: { driver: local }
  seed2-data: { driver: local }
  pool-data:  { driver: local }

networks:
  zion-seeds: { name: zion-seeds, driver: bridge }
EOF

  echo "[server] Starting stack"
  cd /opt/zion-pool
  docker compose up -d

  echo "[server] Status:"
  docker compose ps
'

echo "==> Done. Pool should be on tcp://$HOST:3333"
