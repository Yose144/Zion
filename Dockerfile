# Multi-stage Dockerfile for Zion cryptocurrency daemon and pool server

# Build stage
FROM ubuntu:22.04 AS builder

# Install build dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    cmake \
    git \
    libssl-dev \
    libboost-all-dev \
    pkg-config \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /build

# Copy source code
COPY . .

# Initialize submodules and build
RUN git submodule update --init --recursive && \
    mkdir -p build && \
    cd build && \
    cmake .. && \
    make -j$(nproc)

# Runtime stage
FROM ubuntu:22.04

# Install runtime dependencies
RUN apt-get update && apt-get install -y \
    libssl3 \
    libboost-system1.74.0 \
    libboost-filesystem1.74.0 \
    libboost-thread1.74.0 \
    libboost-program-options1.74.0 \
    ca-certificates \
    curl \
    jq \
    && rm -rf /var/lib/apt/lists/*

# Create non-root user
RUN useradd -m -s /bin/bash zion && \
    mkdir -p /home/zion/.zion /var/log/zion && \
    chown -R zion:zion /home/zion /var/log/zion

# Copy binaries from build stage
COPY --from=builder /build/build/zion_daemon /usr/local/bin/
COPY --from=builder /build/build/zion_miner /usr/local/bin/
COPY --from=builder /build/build/zion_wallet /usr/local/bin/
COPY --from=builder /build/build/zion_genesis /usr/local/bin/

# Make binaries executable
RUN chmod +x /usr/local/bin/zion_*

# Copy default configuration
COPY configs/mainnet.json /home/zion/.zion/config.json
RUN chown zion:zion /home/zion/.zion/config.json

# Copy entrypoint script
COPY docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Switch to non-root user
USER zion
WORKDIR /home/zion

# Expose ports
# RPC port
EXPOSE 18080
# P2P port  
EXPOSE 18081
# Pool stratum port
EXPOSE 3333

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
    CMD curl -f http://localhost:18080/status || exit 1

# Default entrypoint and command
ENTRYPOINT ["/entrypoint.sh"]
CMD ["daemon"]