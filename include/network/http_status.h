#pragma once

#include <string>
#include <thread>
#include <atomic>
#include <functional>
#include <memory>

namespace zion {

class Blockchain;
class P2PNode;
class PoolServer;

struct StatusData {
    uint32_t height = 0;
    uint32_t difficulty = 0;
    size_t peer_count = 0;
    size_t mempool_size = 0;
    std::string network_hash_rate = "0 H/s";
    std::string node_version = "1.0.0";
    bool pool_enabled = false;
    uint16_t pool_port = 0;
    size_t pool_workers = 0;
    std::string uptime = "0s";
    std::string last_block_time = "";
};

class HttpStatusServer {
public:
    HttpStatusServer(uint16_t port = 18080);
    ~HttpStatusServer();

    bool start();
    void stop();

    // Set data sources for status
    void set_blockchain(std::shared_ptr<Blockchain> blockchain);
    void set_p2p_node(std::shared_ptr<P2PNode> p2p);
    void set_pool_server(std::shared_ptr<PoolServer> pool);

private:
    uint16_t port_;
    std::atomic<bool> running_{false};
    int listen_fd_ = -1;
    std::thread server_thread_;
    
    // Data sources
    std::shared_ptr<Blockchain> blockchain_;
    std::shared_ptr<P2PNode> p2p_;
    std::shared_ptr<PoolServer> pool_;
    
    std::chrono::steady_clock::time_point start_time_;

    void server_loop();
    void handle_client(int client_fd);
    StatusData get_status_data();
    std::string generate_status_json(const StatusData& data);
    std::string generate_status_html(const StatusData& data);
};

} // namespace zion