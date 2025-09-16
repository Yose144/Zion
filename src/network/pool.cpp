#include "network/pool.h"
#include <sys/types.h>
#include <sys/socket.h>
#include <netdb.h>
#include <unistd.h>
#include <arpa/inet.h>
#include <cstring>
#include <iostream>

namespace zion {

PoolServer::PoolServer(const PoolConfig& cfg, Callbacks cbs) : cfg_(cfg), cbs_(cbs) {}
PoolServer::~PoolServer() { stop(); }

bool PoolServer::start() {
    if (running_) return true;
    running_ = true;

    listen_fd_ = ::socket(AF_INET, SOCK_STREAM, 0);
    if (listen_fd_ < 0) { running_ = false; return false; }

    int opt=1; setsockopt(listen_fd_, SOL_SOCKET, SO_REUSEADDR, &opt, sizeof(opt));
    sockaddr_in addr{}; addr.sin_family = AF_INET; addr.sin_port = htons(cfg_.port); addr.sin_addr.s_addr = INADDR_ANY;
    if (bind(listen_fd_, (sockaddr*)&addr, sizeof(addr)) < 0) { ::close(listen_fd_); running_ = false; return false; }
    if (listen(listen_fd_, 16) < 0) { ::close(listen_fd_); running_ = false; return false; }

    accept_thread_ = std::thread([this]{ accept_loop(); });
    std::cout << "[POOL] Listening on port " << cfg_.port << std::endl;
    return true;
}

void PoolServer::stop() {
    if (!running_) return;
    running_ = false;
    if (listen_fd_ >= 0) { ::shutdown(listen_fd_, SHUT_RDWR); ::close(listen_fd_); listen_fd_ = -1; }
    if (accept_thread_.joinable()) accept_thread_.join();
}

void PoolServer::accept_loop() {
    while (running_) {
        sockaddr_in cli{}; socklen_t clilen=sizeof(cli);
        int cfd = ::accept(listen_fd_, (sockaddr*)&cli, &clilen);
        if (cfd < 0) { if (!running_) break; continue; }
        std::thread(&PoolServer::handle_client, this, cfd).detach();
    }
}

static bool send_all(int fd, const std::string& s) {
    const char* p = s.data(); size_t n = s.size(); size_t off=0;
    while (off < n) { ssize_t w = ::send(fd, p+off, n-off, 0); if (w <= 0) return false; off += (size_t)w; }
    return true;
}

static bool recv_line(int fd, std::string& out) {
    out.clear(); char ch;
    while (true) {
        ssize_t r = ::recv(fd, &ch, 1, 0);
        if (r <= 0) return false;
        if (ch == '\n') break;
        out.push_back(ch);
        if (out.size() > 4096) return false;
    }
    return true;
}

void PoolServer::handle_client(int fd) {
    // Simple line-based protocol:
    // GETWORK -> returns one-line JSON
    // SUBMIT {json}\n -> returns OK/ERR
    // SUBMITTX <hex> -> returns OK/ERR
    std::string line;
    while (running_) {
        if (!recv_line(fd, line)) break;
        if (line == "GETWORK") {
            std::string json = cbs_.get_work ? cbs_.get_work() : std::string("{}");
            json.push_back('\n');
            if (!send_all(fd, json)) break;
        } else if (line.rfind("SUBMIT ", 0) == 0) {
            std::string payload = line.substr(7);
            bool ok = cbs_.submit_share ? cbs_.submit_share(payload) : false;
            std::string resp = ok ? "OK\n" : "ERR\n";
            if (!send_all(fd, resp)) break;
        } else if (line.rfind("SUBMITTX ", 0) == 0) {
            std::string txhex = line.substr(9);
            // reuse submit_share callback format by building JSON shim if submit_tx callback is provided? For simplicity, call submit_share only for blocks.
            // Here we don't have direct pointer to submit_tx; extend in daemon via pool SUBMIT only.
            // To keep it simple, respond ERR (or could be extended with more callbacks).
            // For now, we just return ERR to avoid confusion; wallet will use SUBMITTX via daemon integration later if added.
            bool ok = false; // placeholder for future
            std::string resp = ok ? "OK\n" : "ERR\n";
            if (!send_all(fd, resp)) break;
        } else {
            if (!send_all(fd, std::string("ERR\n"))) break;
        }
    }
    ::close(fd);
}

} // namespace zion
