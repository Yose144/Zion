# ZION Cryptocurrency - Production Deployment Guide

## 🎯 Quick Start (Server Deployment)

### Prerequisites
- Docker and Docker Compose installed
- Ports 18080, 18081, 8070 available
- At least 2GB RAM, 10GB disk space

### Deploy Commands
```bash
# Clone repository
git clone https://github.com/Yose144/Zion.git
cd Zion
git submodule update --init --recursive

# Start production deployment
docker-compose -f docker-compose.prod.yml up -d

# Verify deployment
curl http://localhost:18081/getheight
# Expected: {"height":1,"status":"OK"}

# Check container health
docker ps | grep zion-production
# Expected: Shows (healthy) status
```

## 📋 What's Included

### Binaries Built and Tested:
- **ziond** - Main daemon (P2P + RPC)
- **zion_wallet** - Command-line wallet
- **zion_walletd** - Wallet daemon service

### Network Configuration:
- **Port 18080**: P2P network communication
- **Port 18081**: RPC API endpoint
- **Port 8070**: Wallet daemon service
- **Port 3333**: Mining pool (optional)

### Docker Images:
- **zion:production** - Multi-stage production build
- **Healthcheck**: Process-based monitoring (`pgrep ziond`)
- **User**: Non-root with proper permissions
- **Volumes**: Persistent blockchain data

## 🔧 Technical Details

### Fixed Issues:
1. **Genesis Block**: Updated GENESIS_COINBASE_TX_HEX constant
2. **Build Dependencies**: Resolved CMake, UPnP, header issues
3. **Docker Multi-arch**: Proper platform handling
4. **Container Health**: Robust process monitoring

### Network Parameters:
- **Total Supply**: 144,000,000,000 ZION (144 billion)
- **Block Time**: 120 seconds (2 minutes)
- **Minimum Fee**: 0.001 ZION
- **Address Prefix**: 0x5a49

### Security:
- Non-root container execution
- Proper file permissions
- Network isolation
- Volume-based data persistence

## 🚀 Operations

### Start Services:
```bash
docker-compose -f docker-compose.prod.yml up -d
```

### Stop Services:
```bash
docker-compose -f docker-compose.prod.yml down
```

### View Logs:
```bash
docker logs zion-production
```

### Check Status:
```bash
# Container health
docker ps

# RPC health
curl http://localhost:18081/getheight

# Daemon status via RPC
curl -X POST http://localhost:18081/json_rpc \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":"0","method":"getlastblockheader"}'
```

### Enable Mining Pool:
```bash
# Start with pool service
docker-compose -f docker-compose.prod.yml --profile pool up -d

# Pool will be available on port 3333
```

## 📊 Monitoring

### Health Checks:
- Container healthcheck runs every 30s
- Checks if `ziond` process is running
- Container shows (healthy)/(unhealthy) status

### Log Monitoring:
- Logs rotated automatically (100MB max, 5 files)
- JSON format for structured logging
- Mounted to `./logs` directory

### RPC Endpoints:
```bash
# Get blockchain height
curl http://localhost:18081/getheight

# Get daemon info
curl http://localhost:18081/getinfo

# Get peer list
curl http://localhost:18081/get_peer_list
```

## 🔐 Wallet Operations

### Create New Wallet:
```bash
docker run -it --rm -v zion_wallet_data:/data zion:production \
  zion_wallet --generate-new-wallet /data/wallet.bin --password yourpassword
```

### Start Wallet Daemon:
```bash
# Wallet daemon is included in production deployment
# Access via port 8070 or exec into container:
docker exec -it zion-production zion_walletd --help
```

## 🐛 Troubleshooting

### Container Won't Start:
```bash
# Check logs
docker logs zion-production

# Common issues:
# 1. Port conflicts - ensure 18080/18081/8070 are free
# 2. Permissions - check volume ownership
# 3. Resources - ensure adequate RAM/disk
```

### Genesis Block Errors:
- Genesis block is fixed in current version
- If errors persist, check CryptoNoteConfig.h for correct GENESIS_COINBASE_TX_HEX

### Network Issues:
```bash
# Test P2P connectivity
telnet localhost 18080

# Test RPC connectivity  
curl http://localhost:18081/getheight

# Check firewall rules for external access
```

## 📚 Development

### Build from Source:
```bash
# Use production Dockerfile
docker build -f docker/Dockerfile.zion-cryptonote.prod -t zion:custom .
```

### Modify Configuration:
- Edit `zion-cryptonote/src/CryptoNoteConfig.h`
- Rebuild Docker image
- Update docker-compose configuration

### Add Custom Features:
- Source code in `zion-cryptonote/src/`
- CMake build system
- Multi-stage Docker builds

## 🎯 Production Checklist

Before deploying to production:

- [ ] Server has adequate resources (2GB+ RAM, 10GB+ disk)
- [ ] Firewall configured for ports 18080, 18081
- [ ] Docker and Docker Compose installed
- [ ] SSL/TLS proxy configured (if needed)
- [ ] Monitoring and alerting setup
- [ ] Backup strategy for blockchain data
- [ ] Log rotation and cleanup configured

## 📝 Latest Changes (2025-09-19)

- ✅ Fixed genesis block generation
- ✅ Resolved all build dependencies
- ✅ Created production Docker configuration
- ✅ Added comprehensive healthchecks
- ✅ Tested all major components
- ✅ Documented deployment procedures

---

**Status**: Production Ready ✅
**Last Updated**: 2025-09-19
**Version**: zion:production (commit fb3d26f)