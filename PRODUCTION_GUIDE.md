# ZION Production Deployment Guide
================================

## 🚀 Quick Start

### 1. Kompletní Deployment
```bash
./deploy-production.sh deploy
```

### 2. Monitoring
```bash
# Jednorázová kontrola
./prod-monitor.sh check

# Kontinuální monitoring
./prod-monitor.sh monitor

# Live logy
./prod-monitor.sh logs
```

### 3. Řízení služeb
```bash
# Start
./deploy-production.sh start

# Stop
./deploy-production.sh stop

# Restart
./deploy-production.sh restart

# Status
./deploy-production.sh status
```

## 📊 Production Architecture

### Docker Services
- **zion-node**: Main blockchain node
- **Port 18080**: P2P network
- **Port 18081**: RPC endpoint

### Data Persistence
- Blockchain data: `/data` volume
- Logs: Container logs + `/data/zion.log`
- Configuration: `config/prod.conf`

### Health Monitoring
- Docker container health
- RPC endpoint availability
- Blockchain sync status
- System resources (CPU, Memory, Disk)
- P2P connectivity

## 🔧 Configuration

### Production Config (`config/prod.conf`)
```ini
# Network
p2p-bind-port=18080
rpc-bind-port=18081

# Performance
max-connections=100
sync-threads=2

# Security
restricted-rpc=false
enable-cors=*
```

### Docker Compose (`docker-compose.prod.yml`)
- Multi-stage production build
- Health checks
- Resource limits
- Persistent volumes

## 🛠️ Troubleshooting

### Container Issues
```bash
# Check container status
docker-compose -f docker-compose.prod.yml ps

# View logs
docker-compose -f docker-compose.prod.yml logs zion-node

# Restart specific service
docker-compose -f docker-compose.prod.yml restart zion-node
```

### Blockchain Issues
```bash
# Check RPC
curl http://localhost:18081/getinfo

# Check sync status
curl -X POST http://localhost:18081/json_rpc \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","id":"0","method":"getinfo"}'
```

### Resource Issues
```bash
# System resources
free -h
df -h
top

# Docker resources
docker stats
```

## 📈 Performance Optimization

### System Requirements
- **CPU**: 2+ cores recommended
- **RAM**: 4GB+ for blockchain sync
- **Disk**: 20GB+ for blockchain data
- **Network**: Stable internet connection

### Optimization Tips
1. **SSD Storage**: Greatly improves sync speed
2. **Memory**: More RAM = faster sync
3. **Network**: Good connectivity for P2P
4. **CPU**: More cores help with compilation

## 🔐 Security Considerations

### Network Security
- P2P port (18080) should be accessible
- RPC port (18081) should be protected
- Use firewall for production

### Container Security
- Non-root user in container
- Read-only filesystem where possible
- Resource limits configured

### Data Security
- Regular backups of blockchain data
- Secure key management
- Monitor for unusual activity

## 📝 Operational Procedures

### Daily Operations
1. Check health status: `./prod-monitor.sh check`
2. Monitor sync progress
3. Check resource usage
4. Review logs for errors

### Weekly Maintenance
1. Update Docker images if needed
2. Check disk space growth
3. Review performance metrics
4. Backup configuration

### Emergency Procedures
1. **Service Down**: Use restart script
2. **Sync Issues**: Check P2P connectivity
3. **Resource Exhaustion**: Scale up or optimize
4. **Data Corruption**: Restore from backup

## 🌟 Multi-Chain Dharma Integration

Připraveno pro rozšíření podle filozofie Multi-Chain Dharma:
- **Ahimsa**: Minimální resource footprint
- **Satya**: Transparentní monitoring a logy
- **Asteya**: Efektivní využití systémových zdrojů
- **Brahmacharya**: Disciplinované deployment procesy
- **Aparigraha**: Jednoduché, nezbytné konfigurace

---

*Server je připraven pro produkční nasazení s plnou automatizací a monitoringem!* 🚀