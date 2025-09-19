#include "zion_miner_c.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>

// Callback functions
void log_callback(const char* message) {
    printf("[LOG] %s\n", message);
}

void stats_callback(int thread_id, uint64_t hashrate, uint64_t total_hashes, uint32_t accepted, uint32_t rejected) {
    printf("[STATS] Thread %d: %llu H/s, Total: %llu, A/R: %u/%u\n", 
           thread_id, (unsigned long long)hashrate, (unsigned long long)total_hashes, accepted, rejected);
}

void block_found_callback(const char* block_hex, const char* hash_hex) {
    printf("[BLOCK] Found block! Hash: %.16s...\n", hash_hex);
}

int main(int argc, char* argv[]) {
    printf("ZION Miner C Library Test\n");
    printf("Version: %s\n", zion_miner_version());
    printf("=========================\n\n");
    
    // Check if mining is supported
    if (!zion_miner_is_supported()) {
        printf("Mining is not supported on this device!\n");
        return 1;
    }
    
    // Get system info
    int recommended_threads = zion_miner_get_recommended_threads();
    uint64_t available_memory = zion_miner_get_available_memory();
    
    printf("System Info:\n");
    printf("  Recommended threads: %d\n", recommended_threads);
    printf("  Available memory: %llu MB\n", (unsigned long long)available_memory);
    printf("\n");
    
    // Configure miner
    ZionMinerConfig config = {0};
    config.thread_count = (argc > 1) ? atoi(argv[1]) : 2; // Use 2 threads by default
    config.use_light_mode = true;   // Use light mode for faster startup
    config.mobile_mode = false;
    strcpy(config.payout_address, "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef");
    
    // Pool configuration (empty for solo mining)
    config.pool_host[0] = '\0';
    config.pool_port = 0;
    config.pool_user[0] = '\0';
    config.pool_pass[0] = '\0';
    
    // Set callbacks
    config.log_callback = log_callback;
    config.stats_callback = stats_callback;
    config.block_found_callback = block_found_callback;
    
    printf("Creating miner with %d threads...\n", config.thread_count);
    
    // Create miner
    ZionMinerHandle* miner = zion_miner_create(&config);
    if (!miner) {
        printf("Failed to create miner: %s\n", zion_miner_get_last_error());
        return 1;
    }
    
    // Initialize miner
    printf("Initializing miner...\n");
    if (!zion_miner_initialize(miner)) {
        printf("Failed to initialize miner: %s\n", zion_miner_get_last_error());
        zion_miner_destroy(miner);
        return 1;
    }
    
    // Start mining
    printf("Starting mining...\n");
    if (!zion_miner_start(miner)) {
        printf("Failed to start miner: %s\n", zion_miner_get_last_error());
        zion_miner_destroy(miner);
        return 1;
    }
    
    printf("Mining started! Press Ctrl+C to stop or wait 30 seconds for demo...\n\n");
    
    // Run for 30 seconds
    for (int i = 0; i < 30; i++) {
        sleep(1);
        
        // Get stats every 5 seconds
        if (i % 5 == 0) {
            ZionMinerStats stats;
            if (zion_miner_get_stats(miner, &stats)) {
                printf("Mining Stats (t=%ds):\n", i);
                printf("  Running: %s\n", stats.is_running ? "Yes" : "No");
                printf("  Total hashes: %llu\n", (unsigned long long)stats.total_hashes);
                printf("  Current hashrate: %llu H/s\n", (unsigned long long)stats.hashrate);
                printf("  Blocks found: %u\n", stats.blocks_found);
                printf("  Uptime: %u seconds\n", stats.uptime_seconds);
                printf("\n");
            }
        }
    }
    
    // Stop mining
    printf("Stopping miner...\n");
    zion_miner_stop(miner);
    
    // Get final stats
    ZionMinerStats final_stats;
    if (zion_miner_get_stats(miner, &final_stats)) {
        printf("\nFinal Stats:\n");
        printf("  Total hashes: %llu\n", (unsigned long long)final_stats.total_hashes);
        printf("  Average hashrate: %llu H/s\n", 
               final_stats.uptime_seconds > 0 ? 
               (unsigned long long)(final_stats.total_hashes / final_stats.uptime_seconds) : 0);
        printf("  Blocks found: %u\n", final_stats.blocks_found);
        printf("  Total uptime: %u seconds\n", final_stats.uptime_seconds);
    }
    
    // Cleanup
    zion_miner_destroy(miner);
    
    printf("\nTest completed successfully!\n");
    return 0;
}