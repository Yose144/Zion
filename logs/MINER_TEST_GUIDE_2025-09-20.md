# 🧪 ZION V2 Miner Test Guide (External XMRig)

Timestamp: 2025-09-20

## Pool Endpoint
- Stratum: stratum+tcp://<HOST>:3333
- Default local test: stratum+tcp://localhost:3333

## Wallet to Use
- Genesis (project treasury):
  - Z1Genesis2025MainNet9999999999999999999999999999999999999999999999999999999999

## XMRig Minimal Config (rx/0)
Save as test-xmrig.json:

{
  "autosave": false,
  "cpu": { "enabled": true },
  "opencl": { "enabled": false },
  "cuda": { "enabled": false },
  "pools": [
    { "algo": "rx/0", "url": "stratum+tcp://localhost:3333", "user": "Z1Genesis2025MainNet9999999999999999999999999999999999999999999999999999999999", "pass": "x", "keepalive": true }
  ]
}

## Run (macOS/Linux)
// Replace ./xmrig with your binary path
./xmrig -c test-xmrig.json

## Expected
- Connect OK, login accepted
- Job notifications once daemon provides block template

## Troubleshooting
- If "Core is busy": wait until seed nodes finish init; shim caches once template arrives
- If disconnects: check docker logs zion-uzi-pool, zion-rpc-shim
- Verify shim health: curl http://localhost:18089/
