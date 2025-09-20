# 2025-09-20 — RPC Probe Results (seed RPC 18081)

Cíl: Ověřit `getinfo` a `getblocktemplate` parametry/limity před napojením poolu.

## Prostředí
- Host: 91.98.122.165
- RPC port: 18081

## Výsledky

### getinfo
```json
{
  "alt_blocks_count": 0,
  "difficulty": 1,
  "grey_peerlist_size": 0,
  "height": 1,
  "incoming_connections_count": 0,
  "last_known_block_index": 0,
  "outgoing_connections_count": 0,
  "status": "OK",
  "tx_count": 0,
  "tx_pool_size": 0,
  "white_peerlist_size": 0
}
```

### getblocktemplate — rezervní velikost
- `reserve_size = 4` → OK (obsahuje blocktemplate_blob, difficulty=1, height=1, reserved_offset≈427)
- `reserve_size = 8` → OK (reserved_offset≈427)
- `reserve_size = 16` → OK (reserved_offset≈427)
- `reserve_size = 32` → OK (reserved_offset≈427)
- `reserve_size = 64` → OK (reserved_offset≈427)
- `reserve_size = 128` → OK (reserved_offset≈428)
- `reserve_size = 255` → OK (reserved_offset≈428)
- `reserve_size = 256` → Error `code=-3, message="To big reserved size, maximum 255"`
- `reserve_size = 300` → Error `code=-3`
- `reserve_size = 400` → Error `code=-3`

Shrnutí: Maximální podporovaná `reserve_size` je 255. Pro pool/XMRig použít `reserve_size=4` (osvědčené) nebo jinou nízkou hodnotu; shim fallbacky zachovají kompatibilitu.

## Poznámka k shim (18089)
- Shim běží s novými fallbacky; health endpoint `/` bude ověřen po redeployi kontejneru `zion-rpc-shim` (compose.pool-seeds.yml). V případě nedostupnosti jde pravděpodobně o to, že běží stará verze nebo služba je zastavená.
