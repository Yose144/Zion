# ZION Mining Troubleshooting Log - Pro GPT-5
*Generated: 19. září 2025 20:02*

## 🟢 SERVER STATUS - WORKING PERFECTLY
✅ **ZION Production Server**: 91.98.122.165:18081
✅ **Container Status**: zion-production running healthy 
✅ **RPC Response**: {"status":"OK","height":1,"difficulty":1}
✅ **Genesis Block**: d763b61e4e542a6973c8f649deb228e116bcf3ee099cec92be33efe288829ae1
✅ **Mining Wallet**: ajmqontZjiVUmtNjQu1RNUYq1RZgd5EDodX3qgjcaTMoMzG8EkG4bVPgLhEgudBoH82fQU1iZVw6XPfddKWAHDdA3x92ToH4uo

## ❌ MINING PROBLEM - NEEDS GPT-5 HELP

### Problem Description
XMRig miner fails to connect to ZION blockchain with error:
```
[2025-09-19 20:01:21.420] [91.98.122.165:18081] error: "To big reserved size, maximum 255", code: -3
```

### What Was Tried
1. ✅ Downloaded XMRig 6.21.3 for all platforms (macOS ARM64, x64, Windows, Linux)
2. ✅ Created mining wallet on production server
3. ❌ Algorithm mismatch: Tried rx/0 (RandomX) but ZION uses CryptoNote
4. ❌ Tried cn/2 (CryptoNote v2) - still "reserved size" error
5. ❌ Disabled RandomX features, enabled CryptoNote - still failing
6. ❌ JSON-RPC start_mining method is not implemented in daemon
7. ✅ getblocktemplate works with reserve_size=4, but returns large reserved_offset

### Current Configuration (Failed)
```json
{
  "pools": [{
    "algo": "cn/2",
    "url": "91.98.122.165:18081", 
    "user": "ajmqontZjiVUmtNjQu1RNUYq1RZgd5EDodX3qgjcaTMoMzG8EkG4bVPgLhEgudBoH82fQU1iZVw6XPfddKWAHDdA3x92ToH4uo",
    "daemon": true
  }]
}
```

### Fresh RPC Evidence (2025-09-19)

- start_mining:
```
POST /json_rpc {"method":"start_mining", ...}
=> {"error":{"code":-32601,"message":"Method not found"}}
```

- getblocktemplate (reserve_size = 4):
```
POST /json_rpc {"method":"getblocktemplate","params":{"wallet_address":"<addr>","reserve_size":4}}
=> {
     "result": {
       "height": 1,
       "difficulty": 1,
       "reserved_offset": 427,
       "status": "OK",
       "blocktemplate_blob": "0100bfbb..."
     }
   }
```

- XMRig error při daemon backendu (solo):
```
error: "To big reserved size, maximum 255", code: -3
```

Pozn.: Zdá se, že XMRig při solo/daemon režimu požaduje větší reserve_size než daemon akceptuje, nebo nesedí očekávání ohledně reserved_offset. To je hlavní kompatibilitní bod k vyřešení.

### Mining Structure Created
```
mining/
├── platforms/
│   ├── macos-arm64/xmrig-6.21.3/    # 3.08MB - Apple M1 ⭐
│   ├── macos-x64/xmrig-6.21.3/      # 3.05MB - Intel Mac
│   ├── windows/xmrig-6.21.3/        # 2.53MB - Windows x64
│   └── linux/xmrig-6.21.3/          # 3.34MB - Linux static
├── mobile/index.html                 # Web miner for mobile
├── start-mining-macos.sh            # Auto-detect Mac architecture
├── start-mining-linux.sh            # AMD Ryzen optimized
├── start-mining-windows.bat         # Windows batch
└── start-mining.sh                  # Platform auto-detection
```

## 🔍 ANALYSIS FOR GPT-5

### Likely Issue
The "reserved size maximum 255" error suggests:
1. **Algorithm mismatch**: ZION blockchain may use different CryptoNote variant
2. **Mining protocol**: May need different XMRig algorithm (cn/0, cn/1, cn/fast, etc.)
3. **Block template**: Reserved size in mining template exceeds XMRig limits
4. **Protocol version**: CryptoNote implementation difference

### Server Daemon Information
- **Binary**: `/usr/local/bin/ziond` (CryptoNote implementation)
- **Version**: Based on CryptoNote 2.0
- **RPC**: Standard CryptoNote JSON-RPC on port 18081
- **Mining**: Should support getblocktemplate method

### Debugging Commands for GPT-5
```bash
# Check mining template
curl -X POST http://91.98.122.165:18081/json_rpc \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":"0","method":"getblocktemplate","params":{"wallet_address":"ajmqontZjiVUmtNjQu1RNUYq1RZgd5EDodX3qgjcaTMoMzG8EkG4bVPgLhEgudBoH82fQU1iZVw6XPfddKWAHDdA3x92ToH4uo","reserve_size":4}}'

# Test different algorithms
./xmrig --algo=cn/0 --url=91.98.122.165:18081 --user=WALLET --daemon
./xmrig --algo=cn/1 --url=91.98.122.165:18081 --user=WALLET --daemon
./xmrig --algo=cn/fast --url=91.98.122.165:18081 --user=WALLET --daemon

# Check server mining capabilities
ssh root@91.98.122.165 'docker exec zion-production /usr/local/bin/ziond --help | grep -i mining'
```

### Questions for GPT-5
1. **What CryptoNote algorithm** does ZION blockchain use?
2. **What reserve_size** should be used in getblocktemplate?
3. **Should we use** different mining client than XMRig?
4. **Is the mining** enabled on the daemon properly?
5. Dá se u XMRig explicitně nastavit menší reserve_size pro daemon backend (<=255)? Pokud ne, doporučený workaround?

### Files Ready for Investigation
- All platform miners: `mining/platforms/*/xmrig-6.21.3/`
- Configuration files: `config-zion.json` (all platforms)
- Startup scripts: `start-mining-*.sh/.bat`
- Server access: SSH root@91.98.122.165 (password auth)

---
**MISSION FOR GPT-5**: Make XMRig connect successfully to ZION blockchain and start mining!
**STATUS**: Server perfect ✅, Miner config broken ❌
**PRIORITY**: Fix mining algorithm/configuration compatibility