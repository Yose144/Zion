#!/bin/bash
set -e

# Environment variables with defaults
ZION_MODE=${ZION_MODE:-daemon}
ZION_CONFIG=${ZION_CONFIG:-/home/zion/.zion/config.json}
ZION_DATA_DIR=${ZION_DATA_DIR:-/home/zion/.zion}
ZION_LOG_LEVEL=${ZION_LOG_LEVEL:-info}

# Pool-specific settings
POOL_PORT=${POOL_PORT:-3333}
POOL_DIFFICULTY=${POOL_DIFFICULTY:-1000}
POOL_FEE=${POOL_FEE:-1}

# P2P settings (OPRAVENO - správné porty)
P2P_PORT=${P2P_PORT:-18080}
RPC_PORT=${RPC_PORT:-18081}

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
    "pool_enable": true,
    "pool_port": $POOL_PORT,
    "pool_bind": "0.0.0.0",
    "pool_difficulty": $POOL_DIFFICULTY,
    "pool_fee": $POOL_FEE
}
EOF
fi

case "$ZION_MODE" in
    daemon)
        echo "Starting Zion daemon..."
        exec ziond --config="$ZION_CONFIG" --datadir="$ZION_DATA_DIR" "$@"
        ;;
    
    pool)
        echo "Starting Zion pool server..."
        exec ziond --config="$ZION_CONFIG" --datadir="$ZION_DATA_DIR" --pool "$@"
        ;;
    
    miner)
        echo "Starting Zion miner..."
        exec zion_miner "$@"
        ;;
    
    wallet)
        echo "Starting Zion wallet..."
        exec zion_wallet "$@"
        ;;
    
    genesis)
        echo "Running Zion genesis tool..."
        exec ziond --genesis --config="$ZION_CONFIG" --datadir="$ZION_DATA_DIR" "$@"
        ;;
    
    *)
        echo "Starting Zion daemon (default)..."
        exec ziond --config="$ZION_CONFIG" --datadir="$ZION_DATA_DIR" "$@"
        ;;
esac