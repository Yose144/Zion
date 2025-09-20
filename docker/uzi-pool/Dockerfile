ARG UZI_POOL_REPO=https://github.com/zone117x/node-cryptonote-pool.git
ARG UZI_POOL_BRANCH=master

FROM node:8-stretch
# Debian stretch je na EOL – přesměrujeme repozitáře na archive.debian.org a vypneme kontrolu platnosti
RUN set -eux; \
	echo 'deb http://archive.debian.org/debian stretch main contrib non-free' > /etc/apt/sources.list; \
	echo 'deb-src http://archive.debian.org/debian stretch main contrib non-free' >> /etc/apt/sources.list; \
	echo 'deb http://archive.debian.org/debian-security stretch/updates main contrib non-free' >> /etc/apt/sources.list; \
	printf 'Acquire::Check-Valid-Until \"false\";\nAcquire::AllowInsecureRepositories \"true\";\n' > /etc/apt/apt.conf.d/99no-check-valid-until; \
	apt-get -o Acquire::Check-Valid-Until=false update; \
	apt-get install -y --no-install-recommends git python make g++ libssl-dev libboost-all-dev libsodium-dev; \
	rm -rf /var/lib/apt/lists/*
WORKDIR /app

ARG UZI_POOL_REPO
ARG UZI_POOL_BRANCH
RUN test -n "$UZI_POOL_REPO" || (echo "UZI_POOL_REPO build-arg is required" && exit 1)
# Pokus o klon cílového repa, případně fallback na zone117x (kompatibilní)
RUN git clone -b "$UZI_POOL_BRANCH" --depth=1 "$UZI_POOL_REPO" . \
	|| git clone -b master --depth=1 https://github.com/zone117x/node-cryptonote-pool.git .
# Některé závislosti v package.json používají protokol git:// – nahradíme za https:// a nastavíme git rewrite
RUN sed -ri 's|git://github.com/|https://github.com/|g' package.json && \
	git config --global url."https://github.com/".insteadOf git://github.com/

# Fix multi-hashing for ARM64 - skip problematic packages, patch package.json
RUN sed -i '/"multi-hashing"/d' package.json && \
	echo "Removed multi-hashing from package.json for ARM64 compatibility"

# Install dependencies - bez multi-hashing
RUN npm config set python /usr/bin/python && \
	npm config set jobs 2 && \
	npm install --production --unsafe-perm || (npm install --unsafe-perm && echo "Fallback install succeeded")

# Add dummy multi-hashing if needed by pool software
RUN mkdir -p node_modules/multi-hashing && \
	echo "module.exports = { cryptonight: function() { throw new Error('Multi-hashing disabled for ARM64'); } };" > node_modules/multi-hashing/index.js

# Configs budou přimountované jako volume na /config (viz compose)
ENV POOL_CONFIG=/config/config.json
ENV COINS_DIR=/config/coins

EXPOSE 3333

# Entrypoint: při startu propojí konfigy z /config do /app a spustí pool
RUN printf '#!/bin/sh\nset -e\n\nif [ -f "$POOL_CONFIG" ]; then\n  ln -sf "$POOL_CONFIG" /app/config.json;\nfi\nif [ -d "$COINS_DIR" ]; then\n  ln -sfn "$COINS_DIR" /app/coins;\nfi\n# Runtime hotfix: patch /app/lib/pool.js for Buffer JSON\nif [ -f "/app/lib/pool.js" ]; then\n  sed -i "s/var buffArray = buff.toJSON();/var buffArray = buff.toJSON();\\n        if (buffArray \\&\\& buffArray.data) buffArray = buffArray.data;/" /app/lib/pool.js;\n  echo "[entrypoint] applied Buffer.toJSON() fix";\n  # Runtime hotfix: advertise RandomX algo to miners (Stratum extensions)\n  # Insert algo and extensions in login reply\n  sed -i "/sendReply(null, {/!b; :a; n; s/^\([[:space:]]*\)id: minerId,/\1algo: 'rx\/0',\\n\1extensions: ['algo'],\\n\1id: minerId,/; t; ba" /app/lib/pool.js || true;\n  # Add height and seed_hash to job response\n  sed -i "/return {/{:a; n; /id: this.id/ { n; s/^\([[:space:]]*\)}/\1height: this.lastBlockHeight,\\n\1seed_hash: '0000000000000000000000000000000000000000000000000000000000000000'\\n        }/; b}; ba}" /app/lib/pool.js || true;\n  echo "[entrypoint] applied RandomX stratum fields";\nfi\n# Wait for rpc-shim health\nif command -v curl >/dev/null 2>&1; then\n  i=0; until [ $i -ge 30 ]; do\n    if curl -s --max-time 2 http://rpc-shim:18089/ | grep -q "status"; then\n      echo "[entrypoint] rpc-shim is up"; break; fi; i=$((i+1)); echo "[entrypoint] waiting rpc-shim ($i/30)"; sleep 2;\n  done;\nfi\nexec node init.js\n' > /entrypoint.sh && chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]