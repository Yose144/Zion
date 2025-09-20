## 2025-09-20 — RPC Shim fallbacks for pool compatibility

Changes:
- Enhanced `adapters/zion-rpc-shim/server.js`:
  - Added method/param fallbacks for: getblocktemplate, submitblock, getheight, getlastblockheader.
  - Preserved backend error codes, improved logging of incoming requests and upstream calls.
  - Added simple GET `/` healthcheck.

Why:
- Pool `uzi-pool` was failing on `getblocktemplate` with `Method not found`. We need to support both underscore and non-underscore variants and alternative parameter shapes used by various CryptoNote daemons.

Next:
- Rebuild `rpc-shim` container without cache and retest via curl:
  - POST /json_rpc method=getblocktemplate with wallet_address and reserve_size.
  - Verify `uzi-pool` stops erroring and receives templates.

Notes:
- Keep port 3333 exposed via `uzi-pool` while iterating. Once stable, enable payments/api.
