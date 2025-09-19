#!/bin/bash
set -euo pipefail

# ZION Pool Deployment Script
# This script sets up a complete ZION mining pool with web dashboard

echo "🚀 ZION Pool Deployment Setup"
echo "=============================="

# Configuration
POOL_PORT=${POOL_PORT:-3333}
WEB_PORT=${WEB_PORT:-3000}
STATUS_PORT=${STATUS_PORT:-18080}
P2P_PORT=${P2P_PORT:-18081}
POOL_FEE=${POOL_FEE:-1}
POOL_DIFFICULTY=${POOL_DIFFICULTY:-1000}

# Create directories
echo "📁 Creating directories..."
mkdir -p data/pool data/seed logs/pool logs/seed

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Create environment file
echo "⚙️  Creating environment configuration..."
cat > .env <<EOF
# ZION Pool Configuration
POOL_PORT=${POOL_PORT}
WEB_PORT=${WEB_PORT}
STATUS_PORT=${STATUS_PORT}
P2P_PORT=${P2P_PORT}
POOL_FEE=${POOL_FEE}
POOL_DIFFICULTY=${POOL_DIFFICULTY}
POOL_REQUIRE_AUTH=false
POOL_PASSWORD=
ZION_LOG_LEVEL=info
EOF

# Build and start services
echo "🔨 Building Docker images..."
docker-compose -f docker-compose.pool.yml build

echo "🚀 Starting ZION pool services..."
docker-compose -f docker-compose.pool.yml up -d

# Wait for services to start
echo "⏳ Waiting for services to start..."
sleep 10

# Check service status
echo "📊 Checking service status..."
echo ""
echo "Pool Status:"
if curl -s http://localhost:${STATUS_PORT}/status > /dev/null; then
    echo "✅ ZION Pool is running"
    curl -s http://localhost:${STATUS_PORT}/status | jq '.' || echo "JSON response received"
else
    echo "❌ ZION Pool is not responding"
fi

echo ""
echo "Web Dashboard:"
if curl -s http://localhost:${WEB_PORT} > /dev/null; then
    echo "✅ Web Dashboard is running"
else
    echo "❌ Web Dashboard is not responding (this is optional)"
fi

echo ""
echo "=============================="
echo "🎉 ZION Pool Deployment Complete!"
echo "=============================="
echo ""
echo "🔗 Pool Connection:"
echo "  Stratum: stratum+tcp://localhost:${POOL_PORT}"
echo "  Host: localhost"
echo "  Port: ${POOL_PORT}"
echo ""
echo "📊 Monitoring:"
echo "  Status API: http://localhost:${STATUS_PORT}/status"
echo "  Status Page: http://localhost:${STATUS_PORT}/"
echo "  Web Dashboard: http://localhost:${WEB_PORT}/ (if enabled)"
echo ""
echo "⛏️  Mining Command:"
echo "  ./zion_miner --pool localhost:${POOL_PORT} --threads 4 --light"
echo ""
echo "🔧 Management Commands:"
echo "  View logs:    docker-compose -f docker-compose.pool.yml logs -f"
echo "  Stop pool:    docker-compose -f docker-compose.pool.yml down"
echo "  Restart:      docker-compose -f docker-compose.pool.yml restart"
echo "  Status:       docker-compose -f docker-compose.pool.yml ps"
echo ""
echo "📁 Data is stored in:"
echo "  Pool data: ./data/pool/"
echo "  Logs: ./logs/pool/"
echo ""

# Optional: Show current status
if command -v jq &> /dev/null; then
    echo "Current Pool Status:"
    curl -s http://localhost:${STATUS_PORT}/status | jq '.'
fi