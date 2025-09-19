# Multi-stage Dockerfile for Zion cryptocurrency daemon and pool server

# Build stage
FROM ubuntu:22.04 AS builder

# Install build dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    cmake \
    git \
    libssl-dev \
    pkg-config \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /build

# Copy source code
COPY . .

# Clean any existing CMake cache and manually clone RandomX
RUN rm -f CMakeCache.txt && \
    rm -rf CMakeFiles/ && \
    rm -rf build/ && \
    rm -rf external/randomx && \
    mkdir -p external && \
    cd external && \
    git clone https://github.com/tevador/RandomX.git randomx && \
    cd randomx && \
    git checkout tags/v1.2.1 && \
    cd /build && \
    ls -la external/randomx/ && \
    mkdir -p build && \
    cd build && \
    cmake -DCMAKE_BUILD_TYPE=Release .. && \
    make -j$(nproc)

# Runtime stage
FROM ubuntu:22.04

# Install runtime dependencies
RUN apt-get update && apt-get install -y \
    libssl3 \
    ca-certificates \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Create non-root user
RUN useradd -m -s /bin/bash zion && \
    mkdir -p /home/zion/.zion

# Copy binaries from build stage
COPY --from=builder /build/build/ziond /usr/local/bin/
COPY --from=builder /build/build/zion_miner /usr/local/bin/
COPY --from=builder /build/build/zion_wallet /usr/local/bin/
COPY --from=builder /build/build/zion_genesis /usr/local/bin/

# Make binaries executable
RUN chmod +x /usr/local/bin/zion*

# Copy entrypoint script
COPY docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Switch to non-root user
USER zion
WORKDIR /home/zion

# Expose ports
EXPOSE 18080 18081 3333

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
    CMD curl -f http://localhost:18081/status || exit 1

ENTRYPOINT ["/entrypoint.sh"]
CMD ["daemon"]