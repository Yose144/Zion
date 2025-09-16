#!/bin/bash
set -e

# Environment variables with defaults
ZION_MODE=${ZION_MODE:-daemon}  # daemon, pool, miner, seed
ZION_CONFIG=${ZION_CONFIG:-/home/zion/.zion/config.json}
ZION_DATA_DIR=${ZION_DATA_DIR:-/home/zion/.zion}
ZION_LOG_LEVEL=${ZION_LOG_LEVEL:-info}

# Pool-specific settings
POOL_PORT=${POOL_PORT:-3333}
POOL_DIFFICULTY=${POOL_DIFFICULTY:-1000}
POOL_FEE=${POOL_FEE:-1}

# Miner-specific settings
MINER_THREADS=${MINER_THREADS:-$(nproc)}
MINER_POOL=${MINER_POOL:-localhost:3333}
MINER_WALLET=${MINER_WALLET:-}

# P2P settings
P2P_PORT=${P2P_PORT:-18081}
RPC_PORT=${RPC_PORT:-18080}
SEED_NODES=${SEED_NODES:-}

# Create data directory if it doesn't exist
mkdir -p "$ZION_DATA_DIR"

# Generate config if not exists
if [ ! -f "$ZION_CONFIG" ]; then
    echo "Generating configuration file..."
    cat > "$ZION_CONFIG" <<EOF
{
    "network": "mainnet",
    "data_dir": "$ZION_DATA_DIR",
    "log_level": "$ZION_LOG_LEVEL",
    "p2p_port": $P2P_PORT,
    "rpc_port": $RPC_PORT,
    "pool_port": $POOL_PORT,
    "pool_difficulty": $POOL_DIFFICULTY,
    "pool_fee": $POOL_FEE,
    "genesis_difficulty": 8,
    "seed_nodes": [
        $SEED_NODES
    ]
}
EOF
fi

case "$ZION_MODE" in
    daemon)
        echo "Starting Zion daemon..."
        exec /usr/local/bin/zion_daemon \
            --config "$ZION_CONFIG" \
            --data-dir "$ZION_DATA_DIR" \
            --log-level "$ZION_LOG_LEVEL" \
            "$@"
        ;;
    
    pool)
        echo "Starting Zion pool server..."
        exec /usr/local/bin/zion_daemon \
            --config "$ZION_CONFIG" \
            --data-dir "$ZION_DATA_DIR" \
            --pool-enable \
            --pool-port "$POOL_PORT" \
            --pool-difficulty "$POOL_DIFFICULTY" \
            --pool-fee "$POOL_FEE" \
            --log-level "$ZION_LOG_LEVEL" \
            "$@"
        ;;
    
    miner)
        if [ -z "$MINER_WALLET" ]; then
            echo "Error: MINER_WALLET environment variable must be set"
            exit 1
        fi
        echo "Starting Zion miner..."
        echo "Pool: $MINER_POOL"
        echo "Threads: $MINER_THREADS"
        echo "Wallet: $MINER_WALLET"
        
        exec /usr/local/bin/zion_miner \
            --pool "$MINER_POOL" \
            --threads "$MINER_THREADS" \
            --wallet "$MINER_WALLET" \
            "$@"
        ;;
    
    seed)
        echo "Starting Zion seed node..."
        exec /usr/local/bin/zion_daemon \
            --config "$ZION_CONFIG" \
            --data-dir "$ZION_DATA_DIR" \
            --seed-node \
            --no-mining \
            --log-level "$ZION_LOG_LEVEL" \
            "$@"
        ;;
    
    wallet)
        echo "Starting Zion wallet..."
        exec /usr/local/bin/zion_wallet "$@"
        ;;
    
    genesis)
        echo "Running Zion genesis tool..."
        exec /usr/local/bin/zion_genesis "$@"
        ;;
    
    bash|sh)
        exec /bin/bash "$@"
        ;;
    
    *)
        echo "Unknown mode: $ZION_MODE"
        echo "Available modes: daemon, pool, miner, seed, wallet, genesis, bash"
        exit 1
        ;;
esac