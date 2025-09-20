#!/bin/sh
set -e

# Link configs
if [ -f "$POOL_CONFIG" ]; then
  ln -sf "$POOL_CONFIG" /app/config.json
fi
if [ -d "$COINS_DIR" ]; then
  ln -sfn "$COINS_DIR" /app/coins
fi

# Apply RandomX patch (disables CryptoNight/multi-hashing paths)
if [ -f "/patch-rx.js" ]; then
  node /patch-rx.js || echo "[entrypoint] patch-rx failed (continuing)"
fi

# Buffer.toJSON() safety in pool.js (legacy code uses buff.toJSON().data)
if [ -f "/app/lib/pool.js" ]; then
  sed -i "s/var buffArray = buff.toJSON();/var buffArray = buff.toJSON();\n        if (buffArray \&\& buffArray.data) buffArray = buffArray.data;/" /app/lib/pool.js || true
fi

# Wait for rpc-shim health (best-effort)
if command -v curl >/dev/null 2>&1; then
  i=0; until [ $i -ge 30 ]; do
    if curl -s --max-time 2 http://rpc-shim:18089/ | grep -q "status"; then
      echo "[entrypoint] rpc-shim is up"; break; fi
    i=$((i+1)); echo "[entrypoint] waiting rpc-shim ($i/30)"; sleep 2
  done
fi

exec node init.js
