This folder contains runtime and deployment logs captured during local or remote probes.

Housekeeping and rules:
- Do not commit huge binaries or archives. Use fetch scripts or release assets instead.
- Git LFS is not used here; keep logs and docs text-only.
- Pool status note: Stargate (port 3333) is currently NOT open and ready — pending Docker permission fix in pool container.

Files:
- rpc_probe_YYYYMMDD_HHMMSS.log — Output of scripts/rpc_probe.sh (getinfo and getblocktemplate matrix).
- SESSION_YYYY-MM-DD_*.md — Session summaries.
- FUTURE_ROADMAP.md — Product/tech roadmap.
