#!/bin/bash

# ZION Mining Startup Script - Linux/Ubuntu
# Spouští XMRig pro těžení ZION blockchainu na Linux/Ubuntu (AMD Ryzen optimized)

echo "🐧 ZION Mining for Linux/Ubuntu"
echo "Genesis Block Hash: d763b61e4e542a6973c8f649deb228e116bcf3ee099cec92be33efe288829ae1"
echo "Mining Address: ajmqontZjiVUmtNjQu1RNUYq1RZgd5EDodX3qgjcaTMoMzG8EkG4bVPgLhEgudBoH82fQU1iZVw6XPfddKWAHDdA3x92ToH4uo"
echo "Server: 91.98.122.165:18081"
echo ""

# Check if server is accessible
echo "Checking server connection..."
if curl -s http://91.98.122.165:18081/getinfo > /dev/null; then
    echo "✅ Server is accessible"
else
    echo "❌ Server is not accessible"
    exit 1
fi

# Optimize for AMD Ryzen
echo "Setting up AMD Ryzen optimizations..."
echo "- Enabling large pages"
echo "- Setting CPU governor to performance"

# Try to set performance governor (requires sudo)
if command -v cpupower > /dev/null; then
    echo "Setting CPU governor to performance (may require sudo)..."
    sudo cpupower frequency-set -g performance 2>/dev/null || echo "Note: Could not set performance governor, continuing anyway"
fi

echo "🔥 Starting XMRig for Linux..."
cd "$(dirname "$0")/platforms/linux/xmrig-6.21.3"
./xmrig --config=config-zion.json