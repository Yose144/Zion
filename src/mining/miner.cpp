#include "zion.h"
#include "block.h"
#include "transaction.h"
#include "randomx_wrapper.h"
#include <iostream>
#include <thread>
#include <chrono>
#include <atomic>
#include <vector>
#include <signal.h>
#include <iomanip>
#include <cstdlib>

namespace zion {

class ZionMiner {
public:
    ZionMiner(int thread_count = std::thread::hardware_concurrency(), bool use_dataset = true)
        : thread_count_(thread_count), use_dataset_(use_dataset), running_(false), blocks_mined_(0), hashes_per_second_(0) {}
    
    bool initialize() {
        std::cout << "Inicializace ZION miner..." << std::endl;
        
        // Initialize RandomX
        Hash seed;
        seed.fill(0x42); // Same seed as daemon for now
        
        auto& randomx = RandomXWrapper::instance();
        // Miner může použít plný režim (dataset) nebo light mode podle nastavení
        if (!randomx.initialize(seed, use_dataset_)) {
            std::cerr << "Chyba při inicializaci RandomX!" << std::endl;
            return false;
        }
        
        // Generate miner keypair
        auto [private_key, public_key] = generate_keypair();
        miner_private_key_ = private_key;
        miner_public_key_ = public_key;
        
        std::cout << "Miner adresa: ";
        for (const auto& byte : public_key) {
            std::cout << std::hex << std::setfill('0') << std::setw(2) << static_cast<int>(byte);
        }
        std::cout << std::dec << std::endl;
        
        std::cout << "Použije " << thread_count_ << " vláken pro těžbu" << std::endl;
        return true;
    }
    
    void start_mining() {
        std::cout << "Spouštím těžbu..." << std::endl;
        running_ = true;
        
        // Create mining threads
        for (int i = 0; i < thread_count_; ++i) {
            mining_threads_.emplace_back(&ZionMiner::mining_thread, this, i);
        }
        
        // Stats thread
        stats_thread_ = std::thread(&ZionMiner::stats_thread, this);
        
        // Wait for threads to finish
        for (auto& thread : mining_threads_) {
            if (thread.joinable()) {
                thread.join();
            }
        }
        
        if (stats_thread_.joinable()) {
            stats_thread_.join();
        }
        
        std::cout << "Těžba ukončena" << std::endl;
    }
    
    void stop_mining() {
        std::cout << "Zastavuji těžbu..." << std::endl;
        running_ = false;
    }
    
private:
    int thread_count_;
    bool use_dataset_;
    std::atomic<bool> running_;
    std::atomic<uint64_t> blocks_mined_;
    std::atomic<uint64_t> hashes_per_second_;
    
    PrivateKey miner_private_key_;
    PublicKey miner_public_key_;
    
    std::vector<std::thread> mining_threads_;
    std::thread stats_thread_;
    
    void mining_thread(int thread_id) {
        std::cout << "Mining thread " << thread_id << " spuštěn" << std::endl;
        
        auto& randomx = RandomXWrapper::instance();
        uint64_t thread_hashes = 0;
        auto last_stats_time = std::chrono::steady_clock::now();
        
        while (running_) {
            // Create a new block to mine
            Block candidate_block = create_candidate_block();
            
            // Mine the block
            uint64_t target_difficulty = calculate_current_difficulty();
            
            if (mine_block(candidate_block, target_difficulty, thread_id)) {
                blocks_mined_++;
                std::cout << "✓ Thread " << thread_id << " vytěžil blok! "
                         << "Nonce: " << candidate_block.getHeader().nonce 
                         << " Difficulty: " << target_difficulty << std::endl;
                
                // In a real implementation, we would broadcast this block to the network
                print_block_info(candidate_block);
            }
            
            // Update hash rate stats
            thread_hashes++;
            auto current_time = std::chrono::steady_clock::now();
            auto elapsed = std::chrono::duration_cast<std::chrono::seconds>(current_time - last_stats_time);
            
            if (elapsed.count() >= 5) { // Update every 5 seconds
                hashes_per_second_ = thread_hashes / elapsed.count();
                thread_hashes = 0;
                last_stats_time = current_time;
            }
        }
        
        std::cout << "Mining thread " << thread_id << " ukončen" << std::endl;
    }
    
    void stats_thread() {
        while (running_) {
            std::this_thread::sleep_for(std::chrono::seconds(10));
            
            if (running_) {
                std::cout << "📊 Statistiky: " 
                         << blocks_mined_.load() << " bloků vytěženo, "
                         << hashes_per_second_.load() * thread_count_ << " H/s"
                         << std::endl;
            }
        }
    }
    
    Block create_candidate_block() {
        // Create coinbase transaction
        uint64_t reward = calculate_block_reward();
        auto coinbase_tx = std::make_shared<Transaction>(Transaction::create_coinbase(miner_public_key_, reward));
        
        // Create previous block hash (for now, use a dummy hash)
        Hash prev_hash;
        prev_hash.fill(0x00);
        
        // Use proper constructor - height 1 for now
        Block block(1, prev_hash);
        
        // Add coinbase transaction
        block.addTransaction(coinbase_tx);
        
        // In a real implementation, we would also include pending transactions from mempool
        
        return block;
    }
    
    bool mine_block(Block& block, uint64_t target_difficulty, int thread_id) {
        const uint64_t max_iterations = 1000000; // Check for stop signal every 1M hashes
        
        for (uint64_t i = 0; i < max_iterations && running_; ++i) {
            if (block.mine(target_difficulty)) {
                return true;
            }
            
            // In the next iteration, mine() will automatically increment nonce
            // For thread safety, we'd need to modify block's nonce differently
        }
        
        return false;
    }
    
    uint64_t calculate_current_difficulty() {
        // Simplified difficulty calculation
        // In a real implementation, this would be based on network hashrate and target block time
        return 10000; // Fixed difficulty for now
    }
    
    uint64_t calculate_block_reward() {
        // Simplified reward calculation
        // In a real implementation, this would consider block height and halvening
        return ZION_INITIAL_REWARD;
    }
    
    void print_block_info(const Block& block) {
        auto hash = block.calculateHash();
        std::cout << "🔗 Nový blok:" << std::endl;
        std::cout << "   Hash: ";
        for (const auto& byte : hash) {
            std::cout << std::hex << std::setfill('0') << std::setw(2) << static_cast<int>(byte);
        }
        std::cout << std::dec << std::endl;
        std::cout << "   Timestamp: " << block.getHeader().timestamp << std::endl;
        std::cout << "   Transakce: " << block.getTransactions().size() << std::endl;
    }
};

} // namespace zion

// Global miner instance
zion::ZionMiner* g_miner = nullptr;

void signal_handler(int signal) {
    std::cout << "Přijat signál " << signal << ", ukončuji těžbu..." << std::endl;
    if (g_miner) {
        g_miner->stop_mining();
    }
}

int main(int argc, char* argv[]) {
    std::cout << "ZION Cryptocurrency Miner v"
              << static_cast<int>(zion::ZION_VERSION_MAJOR) << "."
              << static_cast<int>(zion::ZION_VERSION_MINOR) << "."
              << static_cast<int>(zion::ZION_VERSION_PATCH) << std::endl;
    
    // Parse command line arguments
    int thread_count = std::thread::hardware_concurrency();
    bool light_mode = false; // pokud true, nepoužívat dataset (rychlejší start, menší RAM)
    std::string pool_host; int pool_port = 0; std::string payout_address;
    
    for (int i = 1; i < argc; ++i) {
        if (std::string(argv[i]) == "--threads" && i + 1 < argc) {
            thread_count = std::atoi(argv[i + 1]);
            ++i;
        } else if (std::string(argv[i]) == "--light") {
            light_mode = true;
        } else if (std::string(argv[i]) == "--pool" && i + 1 < argc) {
            std::string hp = argv[++i];
            auto pos = hp.rfind(':');
            if (pos != std::string::npos) { pool_host = hp.substr(0,pos); pool_port = std::atoi(hp.substr(pos+1).c_str()); }
        } else if (std::string(argv[i]) == "--address" && i + 1 < argc) {
            payout_address = argv[++i];
        } else if (std::string(argv[i]) == "--help") {
            std::cout << "Použití: zion_miner [--threads N] [--light] [--pool host:port] [--address ADDR] [--help]" << std::endl;
            std::cout << "  --threads N    Počet těžebních vláken (výchozí: " << thread_count << ")" << std::endl;
            std::cout << "  --light        Light mode (bez RandomX datasetu; rychlejší start, nižší výkon)" << std::endl;
            std::cout << "  --pool h:p     Připojit se k poolu" << std::endl;
            std::cout << "  --address A    Adresa pro odměny (při solo miningu ignorováno)" << std::endl;
            std::cout << "  --help         Zobrazit tuto nápovědu" << std::endl;
            return 0;
        }
    }
    
    if (thread_count <= 0 || thread_count > 256) {
        std::cerr << "Neplatný počet vláken: " << thread_count << std::endl;
        return 1;
    }
    
    // Setup signal handlers
    signal(SIGINT, signal_handler);
    signal(SIGTERM, signal_handler);
    
    // Create and initialize miner
    zion::ZionMiner miner(thread_count, !light_mode);
    g_miner = &miner;
    
    if (!miner.initialize()) {
        std::cerr << "Chyba při inicializaci miner!" << std::endl;
        return 1;
    }
    
    // Start mining
    if (!pool_host.empty() && pool_port > 0) {
        std::cout << "Režim pool klient: " << pool_host << ":" << pool_port << std::endl;
        std::cout << "Pozn.: Pool klient zatím není implementován (TODO)." << std::endl;
    }
    miner.start_mining();
    
    // Cleanup
    zion::RandomXWrapper::instance().cleanup();
    
    return 0;
}
