#!/bin/bash

# ZION Mining Startup Script
# Spouští XMRig pro těžení ZION blockchainu

echo "🚀 Starting ZION Mining..."
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

# Start mining
echo "🔥 Starting XMRig miner..."
cd "$(dirname "$0")/xmrig-6.21.3"
./xmrig --config=config-zion.json