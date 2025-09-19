# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Build Commands

### Build the project (Release mode)
```bash
cmake -S . -B build -DCMAKE_BUILD_TYPE=Release && cmake --build build -j
```

### Build with specific options
```bash
# Build without tests
cmake -S . -B build -DBUILD_TESTS=OFF && cmake --build build -j

# Build with enhanced miner v2
cmake -S . -B build -DBUILD_MINER_V2=ON && cmake --build build -j

# Debug build
cmake -S . -B build -DCMAKE_BUILD_TYPE=Debug && cmake --build build -j
```

### Clean build
```bash
rm -rf build && cmake -S . -B build && cmake --build build -j
```

## Testing

### Run the full test suite
```bash
./test_zion.sh
```

### Run CMake tests
```bash
cd build && ctest
```

### Run a single test
```bash
./build/tests/test_basic
```

## Running Components

### Start the daemon (blockchain node)
```bash
# Default configuration
./build/ziond

# With specific config file
./build/ziond --config=./config/mainnet.conf

# Testnet mode
./build/ziond --datadir=./test_data --testnet
```

### Mining operations
```bash
# Standard miner with 4 threads
./build/zion_miner --threads 4 --light

# Enhanced miner v2 (if built)
./build/zion_miner_v2 --threads 4
```

### Wallet operations
```bash
# Create new wallet
./build/zion_wallet new --file=wallet.dat

# Check wallet info
./build/zion_wallet info --file=wallet.dat
```

### Generate genesis hash
```bash
./build/zion_genesis ./config/mainnet.conf
```

## Docker Operations

### Build and run seed nodes
```bash
docker compose -f docker/compose.seed.yml up -d --build
```

### Production deployment
```bash
docker compose -f docker-compose.prod.yml up -d
```

## Package Release
```bash
# macOS
bash scripts/package.sh macos-latest

# Linux
bash scripts/package.sh ubuntu-latest
```

## Session Logging
```bash
# Generate dated session log for documentation
bash scripts/generate_session_log.sh --title "Title" --notes "Description"
```

## Architecture Overview

### Core Components

**Block & Blockchain (`include/block.h`, `include/blockchain.h`, `src/core/`)**
- Implements a Proof-of-Work blockchain using RandomX algorithm (same as Monero)
- Block time: 2 minutes
- Difficulty adjustment: Every 720 blocks (24 hours)
- Max supply: 21,000,000 ZION with halving every 210,000 blocks

**Transaction System (`include/transaction.h`, `src/core/transaction.cpp`)**
- UTXO-based transaction model
- Mempool with configurable minimum fee requirements (`mempool_min_fee` in config)
- Transaction validation and signature verification

**Mining (`src/mining/miner.cpp`, `src/mining/miner_v2.cpp`)**
- CPU-optimized mining using RandomX
- Two miner implementations: standard and enhanced v2
- Pool mining support with built-in stratum-like protocol

**P2P Network (`include/network/p2p.h`, `src/network/p2p.cpp`)**
- Custom text-based protocol over TCP
- Message types: VERSION, VERACK, PING/PONG, INV, GETDATA, GETHEADERS, HEADERS, BLOCK, TX
- Automatic peer discovery via seed nodes
- Block and transaction propagation via INV/GETDATA pattern
- Default P2P port: 18080 (configurable via `p2p_port`)

**Wallet (`src/wallet/`)**
- Key generation and management
- Transaction creation and signing
- Balance tracking

**Pool Server (`src/network/pool.cpp`)**
- Built-in mining pool server (optional, enabled via `pool_enable` in config)
- Simple stratum-like JSON protocol
- Worker authentication support

### Configuration System

Configuration is loaded from INI-style files (see `include/config.h`):
- Genesis block parameters (`genesis_timestamp`, `genesis_difficulty`, `genesis_coinbase_address`)
- Network settings (`network_id`, `chain_id`, `p2p_port`, `rpc_port`)
- Seed nodes list
- Pool server settings
- Mempool minimum fee

### RandomX Integration

The project uses RandomX (external/randomx/) for Proof-of-Work:
- Wrapper in `include/randomx_wrapper.h`
- Singleton pattern for efficient memory usage
- Light mode support for mining

### Build System

CMake-based build with options:
- `BUILD_TESTS`: Enable test compilation
- `BUILD_WALLET`: Build wallet application  
- `BUILD_MINER`: Build standard miner
- `BUILD_MINER_V2`: Build enhanced miner v2

Dependencies:
- CMake 3.15+
- C++17 compiler
- OpenSSL
- pthreads
- RandomX (included as git submodule)
