#include "zion_miner_c.h"
#include "zion.h"
#include "block.h"
#include "randomx_wrapper.h"
#include <iostream>
#include <thread>
#include <memory>
#include <atomic>
#include <string>
#include <cstring>
#include <chrono>

// Forward declare for the handle
namespace zion {
    class SimpleMiner;
}

// C wrapper handle structure
struct ZionMinerHandle {
    std::unique_ptr<zion::SimpleMiner> miner;
    ZionMinerConfig config;
    std::atomic<bool> initialized{false};
    std::chrono::steady_clock::time_point start_time;
    std::string last_error;
};

// Global error string
static thread_local std::string g_last_error;

// Helper functions
static void set_last_error(const std::string& error) {
    g_last_error = error;
}

static void clear_last_error() {
    g_last_error.clear();
}

// A simplified C++ miner class for the library
namespace zion {

class SimpleMiner {
private:
    int thread_count_;
    bool light_mode_;
    bool mobile_mode_;
    std::atomic<bool> running_{false};
    std::atomic<uint64_t> total_hashes_{0};
    std::atomic<uint32_t> blocks_found_{0};
    std::atomic<uint32_t> shares_accepted_{0};
    std::atomic<uint32_t> shares_rejected_{0};
    std::vector<std::thread> mining_threads_;
    std::thread stats_thread_;
    
    ZionMinerConfig config_;
    
public:
    SimpleMiner(const ZionMinerConfig& config) 
        : config_(config), thread_count_(config.thread_count), 
          light_mode_(config.use_light_mode), mobile_mode_(config.mobile_mode) {
        if (thread_count_ <= 0) {
            thread_count_ = std::thread::hardware_concurrency();
        }
        if (mobile_mode_ && thread_count_ > 2) {
            thread_count_ = std::max(1, thread_count_ / 2);
        }
    }
    
    bool initialize() {
        try {
            // Initialize RandomX
            Hash seed;
            seed.fill(0x42);
            
            auto& randomx = RandomXWrapper::instance();
            if (!randomx.initialize(seed, !light_mode_)) {
                set_last_error("Failed to initialize RandomX");
                return false;
            }
            
            clear_last_error();
            return true;
        } catch (const std::exception& e) {
            set_last_error(std::string("Initialization error: ") + e.what());
            return false;
        }
    }
    
    bool start() {
        if (running_) {
            return true;
        }
        
        running_ = true;
        
        // Start mining threads
        for (int i = 0; i < thread_count_; ++i) {
            mining_threads_.emplace_back(&SimpleMiner::mining_thread, this, i);
        }
        
        // Start stats thread
        stats_thread_ = std::thread(&SimpleMiner::stats_thread, this);
        
        return true;
    }
    
    void stop() {
        running_ = false;
        
        // Join threads
        for (auto& thread : mining_threads_) {
            if (thread.joinable()) {
                thread.join();
            }
        }
        
        if (stats_thread_.joinable()) {
            stats_thread_.join();
        }
        
        mining_threads_.clear();
    }
    
    void get_stats(ZionMinerStats* stats) {
        if (!stats) return;
        
        stats->total_hashes = total_hashes_.load();
        stats->blocks_found = blocks_found_.load();
        stats->shares_accepted = shares_accepted_.load();
        stats->shares_rejected = shares_rejected_.load();
        stats->is_running = running_.load();
        
        // Calculate hashrate (simplified)
        static auto last_time = std::chrono::steady_clock::now();
        static uint64_t last_hashes = 0;
        
        auto now = std::chrono::steady_clock::now();
        auto elapsed = std::chrono::duration_cast<std::chrono::seconds>(now - last_time).count();
        
        if (elapsed > 0) {
            uint64_t current_hashes = total_hashes_.load();
            stats->hashrate = (current_hashes - last_hashes) / elapsed;
            last_time = now;
            last_hashes = current_hashes;
        } else {
            stats->hashrate = 0;
        }
    }
    
private:
    void mining_thread(int thread_id) {
        const uint64_t CHUNK = mobile_mode_ ? 50000ULL : 200000ULL;
        
        while (running_) {
            // Simplified mining loop
            for (uint64_t i = 0; i < CHUNK && running_; ++i) {
                // Simulate hash computation
                total_hashes_.fetch_add(1);
                
                // Simulate finding a block (very rare)
                if ((total_hashes_.load() % 1000000) == 0) {
                    blocks_found_.fetch_add(1);
                    if (config_.block_found_callback) {
                        config_.block_found_callback("dummy_block_hex", "dummy_hash_hex");
                    }
                }
            }
            
            std::this_thread::sleep_for(std::chrono::milliseconds(1));
        }
    }
    
    void stats_thread() {
        while (running_) {
            std::this_thread::sleep_for(std::chrono::seconds(10));
            
            if (config_.stats_callback) {
                ZionMinerStats stats;
                get_stats(&stats);
                config_.stats_callback(0, stats.hashrate, stats.total_hashes, 
                                      stats.shares_accepted, stats.shares_rejected);
            }
        }
    }
};

} // namespace zion

// C API Implementation

extern "C" {

const char* zion_miner_version(void) {
    return "1.0.0";
}

ZionMinerHandle* zion_miner_create(const ZionMinerConfig* config) {
    if (!config) {
        set_last_error("Configuration is null");
        return nullptr;
    }
    
    try {
        auto handle = std::make_unique<ZionMinerHandle>();
        handle->config = *config;
        handle->miner = std::make_unique<zion::SimpleMiner>(*config);
        handle->start_time = std::chrono::steady_clock::now();
        
        clear_last_error();
        return handle.release();
    } catch (const std::exception& e) {
        set_last_error(std::string("Failed to create miner: ") + e.what());
        return nullptr;
    }
}

bool zion_miner_initialize(ZionMinerHandle* handle) {
    if (!handle || !handle->miner) {
        set_last_error("Invalid handle");
        return false;
    }
    
    bool success = handle->miner->initialize();
    handle->initialized = success;
    return success;
}

bool zion_miner_start(ZionMinerHandle* handle) {
    if (!handle || !handle->miner) {
        set_last_error("Invalid handle");
        return false;
    }
    
    if (!handle->initialized) {
        set_last_error("Miner not initialized");
        return false;
    }
    
    return handle->miner->start();
}

void zion_miner_stop(ZionMinerHandle* handle) {
    if (handle && handle->miner) {
        handle->miner->stop();
    }
}

bool zion_miner_get_stats(ZionMinerHandle* handle, ZionMinerStats* stats) {
    if (!handle || !handle->miner || !stats) {
        set_last_error("Invalid parameters");
        return false;
    }
    
    handle->miner->get_stats(stats);
    
    // Calculate uptime
    auto now = std::chrono::steady_clock::now();
    auto uptime = std::chrono::duration_cast<std::chrono::seconds>(now - handle->start_time);
    stats->uptime_seconds = static_cast<uint32_t>(uptime.count());
    
    clear_last_error();
    return true;
}

bool zion_miner_update_config(ZionMinerHandle* handle, const ZionMinerConfig* config) {
    if (!handle || !config) {
        set_last_error("Invalid parameters");
        return false;
    }
    
    // For now, just update the stored config
    // A full implementation would restart threads with new settings
    handle->config = *config;
    
    clear_last_error();
    return true;
}

void zion_miner_destroy(ZionMinerHandle* handle) {
    if (handle) {
        if (handle->miner) {
            handle->miner->stop();
        }
        delete handle;
    }
}

const char* zion_miner_get_last_error(void) {
    return g_last_error.c_str();
}

bool zion_miner_is_supported(void) {
    // Check if we can initialize RandomX
    try {
        auto& randomx = zion::RandomXWrapper::instance();
        // Don't actually initialize, just check if the instance can be created
        return true;
    } catch (...) {
        return false;
    }
}

int zion_miner_get_recommended_threads(void) {
    int hw_threads = std::thread::hardware_concurrency();
    if (hw_threads <= 0) hw_threads = 1;
    
    // For mobile or low-power devices, use fewer threads
    if (hw_threads <= 2) return 1;
    if (hw_threads <= 4) return 2;
    return std::min(hw_threads - 1, 8); // Leave one core free, max 8 threads
}

uint64_t zion_miner_get_available_memory(void) {
    // This is a simplified implementation
    // In a real implementation, you'd query the system for available memory
    return 2048; // Return 2GB as a safe default
}

} // extern "C"