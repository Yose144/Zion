ARG UZI_POOL_REPO=https://github.com/zone117x/node-cryptonote-pool.git
ARG UZI_POOL_BRANCH=master

FROM node:12-buster AS base
RUN apt-get update && apt-get install -y git python make g++ && rm -rf /var/lib/apt/lists/*
WORKDIR /app

ARG UZI_POOL_REPO
ARG UZI_POOL_BRANCH
RUN test -n "$UZI_POOL_REPO" || (echo "UZI_POOL_REPO build-arg is required" && exit 1)
RUN git clone -b "$UZI_POOL_BRANCH" --depth=1 "$UZI_POOL_REPO" .

# Install dependencies
RUN npm install --production || npm install --production

# Configs budou přimountované jako volume na /config (viz compose)
ENV POOL_CONFIG=/config/config.json
ENV COINS_DIR=/config/coins

EXPOSE 3333
# Většina CryptoNote Node.js poolů startuje přes init.js
CMD ["node", "init.js"]
