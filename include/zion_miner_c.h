#ifndef ZION_MINER_C_H
#define ZION_MINER_C_H

#ifdef __cplusplus
extern "C" {
#endif

#include <stdint.h>
#include <stdbool.h>

// Forward declarations
typedef struct ZionMinerHandle ZionMinerHandle;

// Callback function types
typedef void (*zion_log_callback_t)(const char* message);
typedef void (*zion_stats_callback_t)(int thread_id, uint64_t hashrate, uint64_t total_hashes, uint32_t accepted, uint32_t rejected);
typedef void (*zion_block_found_callback_t)(const char* block_hex, const char* hash_hex);

// Configuration structure
typedef struct {
    int thread_count;           // Number of mining threads (0 = auto-detect)
    bool use_light_mode;        // Use RandomX light mode (less memory, slower)
    bool mobile_mode;           // Optimize for mobile devices
    char payout_address[65];    // Hex-encoded public key for payouts (64 chars + null terminator)
    
    // Pool configuration
    char pool_host[256];        // Pool hostname
    int pool_port;              // Pool port
    char pool_user[256];        // Pool username
    char pool_pass[256];        // Pool password
    
    // Callbacks
    zion_log_callback_t log_callback;
    zion_stats_callback_t stats_callback;
    zion_block_found_callback_t block_found_callback;
} ZionMinerConfig;

// Mining statistics
typedef struct {
    uint64_t total_hashes;      // Total hashes computed
    uint64_t hashrate;          // Current hashrate (H/s)
    uint32_t blocks_found;      // Total blocks found
    uint32_t shares_accepted;   // Shares accepted by pool
    uint32_t shares_rejected;   // Shares rejected by pool
    uint32_t uptime_seconds;    // Mining uptime in seconds
    bool is_running;            // Whether mining is active
} ZionMinerStats;

// API functions

/**
 * Get library version
 * @return Version string (e.g., "1.0.0")
 */
const char* zion_miner_version(void);

/**
 * Create a new miner instance
 * @param config Miner configuration
 * @return Miner handle or NULL on error
 */
ZionMinerHandle* zion_miner_create(const ZionMinerConfig* config);

/**
 * Initialize the miner (call after create)
 * @param handle Miner handle
 * @return true on success, false on error
 */
bool zion_miner_initialize(ZionMinerHandle* handle);

/**
 * Start mining (solo or pool)
 * @param handle Miner handle
 * @return true on success, false on error
 */
bool zion_miner_start(ZionMinerHandle* handle);

/**
 * Stop mining
 * @param handle Miner handle
 */
void zion_miner_stop(ZionMinerHandle* handle);

/**
 * Get current mining statistics
 * @param handle Miner handle
 * @param stats Output statistics structure
 * @return true on success, false on error
 */
bool zion_miner_get_stats(ZionMinerHandle* handle, ZionMinerStats* stats);

/**
 * Update configuration (can be called while mining)
 * @param handle Miner handle
 * @param config New configuration
 * @return true on success, false on error
 */
bool zion_miner_update_config(ZionMinerHandle* handle, const ZionMinerConfig* config);

/**
 * Destroy miner instance and free resources
 * @param handle Miner handle
 */
void zion_miner_destroy(ZionMinerHandle* handle);

/**
 * Get last error message
 * @return Error message string
 */
const char* zion_miner_get_last_error(void);

/**
 * Check if mining is supported on this device
 * @return true if supported, false otherwise
 */
bool zion_miner_is_supported(void);

/**
 * Get recommended thread count for this device
 * @return Recommended number of threads
 */
int zion_miner_get_recommended_threads(void);

/**
 * Get available memory in MB
 * @return Available memory in megabytes
 */
uint64_t zion_miner_get_available_memory(void);

#ifdef __cplusplus
}
#endif

#endif // ZION_MINER_C_H