# MAITREYA (Windows 11, Ryzen 5 3600) — Mining + Connectivity Log

## Quick Run
- VS Code Tasks:
	- "MAITREYA: Start Tunnel"
	- "MAITREYA: Start Miner"
	- "MAITREYA: Check Shim Health"
- PowerShell (alternativa):
```
Set-Location D:\Zion
./scripts/ssh-tunnel-maitreya.ps1 start
.\n+mining\platforms\windows\xmrig-6.21.3\xmrig.exe -c .\test-xmrig.json
```

Date: 2025-09-20
Host: MAITREYA (user anaha)
OS: Windows 11 (PowerShell 5.1)
CPU: AMD Ryzen 5 3600 (6C/12T)
RAM: 32 GB DDR4 (2x16 GB)
Miner: XMRig 6.21.3 (Windows x64)
Wallet: ajmrDtnSJCqchjF3wuiceJRCpAumA3wGLhQjtzf7B9uELFYrbtURHTFabiC8RmVbSkPGznaPhsehxYJvwcSGcwXV495Ytpr7wf
Rig-ID: windows-ryzen-1

## Summary
- Local miner configured for RandomX (rx/0) targeting pool via SSH tunnel.
- Server 91.98.122.165 now runs rpc-shim (18089) and uzi-pool (3333); provider firewall still blocks direct ingress; we use local SSH tunnel.
- Pool stratum showed EOF when coins profile pointed to seed1:18081; fixed by updating coins/zion.json to use rpc-shim:18089.

## Connectivity
- External: Test-NetConnection to 91.98.122.165:3333 and 18089 => False (provider block).
- Tunnel: ssh -L 127.0.0.1:3333:127.0.0.1:3333 -L 127.0.0.1:18089:127.0.0.1:18089 root@91.98.122.165
- Local checks: TNc 127.0.0.1:3333 True; TNc 127.0.0.1:18089 True.
- Shim health (via tunnel): { status: ok, proxy: http://zion-seed1:18081/json_rpc, lastGbt.height: 1 }

## Pool & Shim Logs (server)
- Before fix: pool error ECONNREFUSED 172.18.0.4:18081; miner saw EOF.
- After fix: uzi-pool started, listening on 3333; shim caching GBT height=1.

## Miner Config (D:\Zion\test-xmrig.json)
- url: stratum+tcp://127.0.0.1:3333
- user: ajmrDtnS...pr7wf
- pass: windows-ryzen
- rig-id: windows-ryzen-1

## Next Steps
- Keep SSH tunnel running when mining.
- Open provider firewall for 3333/18089 to remove tunnel dependency.
- Monitor pool/shim logs for new heights and accepted shares when seed peers become reachable.

---

## 2025-09-20T Local Mining Update (Tunnel + XMRig)

- Tunnel: started with `scripts/ssh-tunnel-maitreya.ps1 start` mapping `127.0.0.1:3333` and `127.0.0.1:18089` to server 91.98.122.165.
- Connectivity checks:
	- `Test-NetConnection 127.0.0.1 -Port 3333` => True
	- `Test-NetConnection 127.0.0.1 -Port 18089` => True
- XMRig config snapshot: `mining/platforms/windows/xmrig-6.21.3/config-zion.json`
	- url: `stratum+tcp://127.0.0.1:3333`
	- algo: `rx/0`
	- user: ajmrDtnSJCqchjF3wuiceJRCpAumA3wGLhQjtzf7B9uELFYrbtURHTFabiC8RmVbSkPGznaPhsehxYJvwcSGcwXV495Ytpr7wf
	- rig-id: MAITREYA-Ryzen-1
- Commands used:
	- Start tunnel:
		- `powershell -NoLogo -NoProfile -ExecutionPolicy Bypass -File d:\Zion\scripts\ssh-tunnel-maitreya.ps1 start`
	- Start miner (helper):
		- `powershell -NoLogo -NoProfile -ExecutionPolicy Bypass -File d:\Zion\mining\start-mining-windows.ps1 -PoolHost 127.0.0.1 -PoolPort 3333 -RigId MAITREYA-Ryzen-1`
	- Start miner (direct):
		- `powershell -NoLogo -NoProfile -ExecutionPolicy Bypass -Command "Start-Process -FilePath 'd:\Zion\mining\platforms\windows\xmrig-6.21.3\xmrig.exe' -ArgumentList '--config=\"d:\Zion\mining\platforms\windows\xmrig-6.21.3\config-zion.json\"' -WorkingDirectory 'd:\Zion\mining\platforms\windows\xmrig-6.21.3' -WindowStyle Normal"`
- Results: stratum reachable via tunnel; mining running locally; shares reported as accepted in miner output.
