#pragma once

#include <string>
#include <thread>
#include <atomic>
#include <functional>

namespace zion {

struct PoolConfig {
    uint16_t port = 3333;
};

class PoolServer {
public:
    struct Callbacks {
        // returns JSON string with work (prev_hash, target_bits, height, extra_nonce)
        std::function<std::string()> get_work;
        // submit share: returns true if block is valid and accepted
        std::function<bool(const std::string& submit_json)> submit_share;
    };

    PoolServer(const PoolConfig& cfg, Callbacks cbs);
    ~PoolServer();

    bool start();
    void stop();

private:
    PoolConfig cfg_;
    Callbacks cbs_;
    std::atomic<bool> running_{false};
    int listen_fd_ = -1;
    std::thread accept_thread_;

    void accept_loop();
    void handle_client(int fd);
};

} // namespace zion
