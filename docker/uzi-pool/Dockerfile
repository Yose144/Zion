ARG UZI_POOL_REPO
ARG UZI_POOL_BRANCH=master

FROM node:20-alpine AS base
RUN apk add --no-cache git python3 build-base
WORKDIR /app

ARG UZI_POOL_REPO
ARG UZI_POOL_BRANCH
RUN test -n "$UZI_POOL_REPO" || (echo "UZI_POOL_REPO build-arg is required" && exit 1)
RUN git clone -b "$UZI_POOL_BRANCH" --depth=1 "$UZI_POOL_REPO" .

# Install dependencies
RUN npm install --production || npm install --production

# Copy our ZION configs (mounted at runtime too)
COPY ../../adapters/uzi-pool-config /config

ENV POOL_CONFIG=/config/config.json
ENV COINS_DIR=/config/coins

EXPOSE 3333
CMD ["npm", "start"]
