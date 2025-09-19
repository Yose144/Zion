#include "network/http_status.h"
#include "blockchain.h"
#include "network/p2p.h"
#include "network/pool.h"
#include <sys/socket.h>
#include <netinet/in.h>
#include <unistd.h>
#include <cstring>
#include <sstream>
#include <iomanip>
#include <chrono>

namespace zion {

HttpStatusServer::HttpStatusServer(uint16_t port) : port_(port) {
    start_time_ = std::chrono::steady_clock::now();
}

HttpStatusServer::~HttpStatusServer() {
    stop();
}

bool HttpStatusServer::start() {
    if (running_) return true;

    // Create socket
    listen_fd_ = socket(AF_INET, SOCK_STREAM, 0);
    if (listen_fd_ < 0) {
        return false;
    }

    // Set socket options
    int opt = 1;
    setsockopt(listen_fd_, SOL_SOCKET, SO_REUSEADDR, &opt, sizeof(opt));

    // Bind to port
    sockaddr_in addr{};
    addr.sin_family = AF_INET;
    addr.sin_addr.s_addr = INADDR_ANY;
    addr.sin_port = htons(port_);

    if (bind(listen_fd_, (sockaddr*)&addr, sizeof(addr)) < 0) {
        close(listen_fd_);
        return false;
    }

    if (listen(listen_fd_, 10) < 0) {
        close(listen_fd_);
        return false;
    }

    running_ = true;
    server_thread_ = std::thread(&HttpStatusServer::server_loop, this);

    return true;
}

void HttpStatusServer::stop() {
    if (!running_) return;
    
    running_ = false;
    if (listen_fd_ >= 0) {
        close(listen_fd_);
        listen_fd_ = -1;
    }
    
    if (server_thread_.joinable()) {
        server_thread_.join();
    }
}

void HttpStatusServer::set_blockchain(std::shared_ptr<Blockchain> blockchain) {
    blockchain_ = blockchain;
}

void HttpStatusServer::set_p2p_node(std::shared_ptr<P2PNode> p2p) {
    p2p_ = p2p;
}

void HttpStatusServer::set_pool_server(std::shared_ptr<PoolServer> pool) {
    pool_ = pool;
}

void HttpStatusServer::server_loop() {
    while (running_) {
        sockaddr_in client_addr{};
        socklen_t client_len = sizeof(client_addr);
        
        int client_fd = accept(listen_fd_, (sockaddr*)&client_addr, &client_len);
        if (client_fd < 0) {
            if (running_) {
                std::this_thread::sleep_for(std::chrono::milliseconds(10));
            }
            continue;
        }

        // Handle client in a separate thread for better performance
        std::thread client_thread(&HttpStatusServer::handle_client, this, client_fd);
        client_thread.detach();
    }
}

void HttpStatusServer::handle_client(int client_fd) {
    char buffer[4096];
    ssize_t bytes_read = recv(client_fd, buffer, sizeof(buffer) - 1, 0);
    
    if (bytes_read <= 0) {
        close(client_fd);
        return;
    }
    
    buffer[bytes_read] = '\0';
    std::string request(buffer);
    
    // Parse HTTP request line
    std::istringstream iss(request);
    std::string method, path, version;
    iss >> method >> path >> version;
    
    std::string response_body;
    std::string content_type;
    
    if (path == "/status" || path == "/status/") {
        // JSON status endpoint
        StatusData status = get_status_data();
        response_body = generate_status_json(status);
        content_type = "application/json";
    } else if (path == "/" || path == "/index.html") {
        // HTML status page
        StatusData status = get_status_data();
        response_body = generate_status_html(status);
        content_type = "text/html";
    } else {
        // 404 response
        response_body = "{\"error\":\"Not found\"}";
        content_type = "application/json";
    }
    
    // Send HTTP response
    std::ostringstream response;
    response << "HTTP/1.1 200 OK\r\n";
    response << "Content-Type: " << content_type << "\r\n";
    response << "Content-Length: " << response_body.length() << "\r\n";
    response << "Access-Control-Allow-Origin: *\r\n";
    response << "Connection: close\r\n";
    response << "\r\n";
    response << response_body;
    
    std::string response_str = response.str();
    send(client_fd, response_str.c_str(), response_str.length(), 0);
    
    close(client_fd);
}

StatusData HttpStatusServer::get_status_data() {
    StatusData data;
    
    if (blockchain_) {
        data.height = blockchain_->getHeight();
        data.difficulty = blockchain_->getDifficulty();
        
        // Get mempool size by counting pending transactions
        auto pending_txs = blockchain_->getPendingTransactions();
        data.mempool_size = pending_txs.size();
        
        // Get last block time
        auto latest_block = blockchain_->getLatestBlock();
        if (latest_block) {
            auto timestamp = latest_block->getHeader().timestamp;
            std::time_t t = timestamp;
            std::ostringstream oss;
            oss << std::put_time(std::gmtime(&t), "%Y-%m-%d %H:%M:%S UTC");
            data.last_block_time = oss.str();
        }
    }
    
    // Calculate uptime
    auto now = std::chrono::steady_clock::now();
    auto uptime_seconds = std::chrono::duration_cast<std::chrono::seconds>(now - start_time_).count();
    
    if (uptime_seconds < 60) {
        data.uptime = std::to_string(uptime_seconds) + "s";
    } else if (uptime_seconds < 3600) {
        data.uptime = std::to_string(uptime_seconds / 60) + "m " + std::to_string(uptime_seconds % 60) + "s";
    } else {
        int hours = uptime_seconds / 3600;
        int minutes = (uptime_seconds % 3600) / 60;
        data.uptime = std::to_string(hours) + "h " + std::to_string(minutes) + "m";
    }
    
    // Pool info
    if (pool_) {
        data.pool_enabled = true;
        data.pool_port = 3333; // Default pool port
    }
    
    return data;
}

std::string HttpStatusServer::generate_status_json(const StatusData& data) {
    std::ostringstream json;
    json << "{\n";
    json << "  \"node_version\": \"" << data.node_version << "\",\n";
    json << "  \"height\": " << data.height << ",\n";
    json << "  \"difficulty\": " << data.difficulty << ",\n";
    json << "  \"peer_count\": " << data.peer_count << ",\n";
    json << "  \"mempool_size\": " << data.mempool_size << ",\n";
    json << "  \"network_hash_rate\": \"" << data.network_hash_rate << "\",\n";
    json << "  \"uptime\": \"" << data.uptime << "\",\n";
    json << "  \"last_block_time\": \"" << data.last_block_time << "\",\n";
    json << "  \"pool\": {\n";
    json << "    \"enabled\": " << (data.pool_enabled ? "true" : "false") << ",\n";
    json << "    \"port\": " << data.pool_port << ",\n";
    json << "    \"workers\": " << data.pool_workers << "\n";
    json << "  }\n";
    json << "}";
    return json.str();
}

std::string HttpStatusServer::generate_status_html(const StatusData& data) {
    std::ostringstream html;
    html << "<!DOCTYPE html>\n";
    html << "<html><head><title>ZION Node Status</title>\n";
    html << "<meta charset=\"UTF-8\">\n";
    html << "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n";
    html << "<style>\n";
    html << "body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 20px; background: #1a1a1a; color: #fff; }\n";
    html << ".container { max-width: 800px; margin: 0 auto; }\n";
    html << "h1 { color: #4a90e2; text-align: center; margin-bottom: 30px; }\n";
    html << ".card { background: #2d2d2d; border-radius: 8px; padding: 20px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.3); }\n";
    html << ".card h2 { margin-top: 0; color: #5cb85c; }\n";
    html << ".stat { display: flex; justify-content: space-between; margin: 10px 0; }\n";
    html << ".stat-label { font-weight: bold; }\n";
    html << ".stat-value { color: #4a90e2; }\n";
    html << ".status-indicator { display: inline-block; width: 12px; height: 12px; border-radius: 50%; margin-right: 8px; }\n";
    html << ".online { background-color: #5cb85c; }\n";
    html << ".offline { background-color: #d9534f; }\n";
    html << "</style>\n";
    html << "</head><body>\n";
    html << "<div class=\"container\">\n";
    html << "<h1>🚀 ZION Node Status</h1>\n";
    
    html << "<div class=\"card\">\n";
    html << "<h2>📊 Blockchain Info</h2>\n";
    html << "<div class=\"stat\"><span class=\"stat-label\">Height:</span><span class=\"stat-value\">" << data.height << "</span></div>\n";
    html << "<div class=\"stat\"><span class=\"stat-label\">Difficulty:</span><span class=\"stat-value\">" << data.difficulty << "</span></div>\n";
    html << "<div class=\"stat\"><span class=\"stat-label\">Last Block:</span><span class=\"stat-value\">" << data.last_block_time << "</span></div>\n";
    html << "</div>\n";
    
    html << "<div class=\"card\">\n";
    html << "<h2>🌐 Network Status</h2>\n";
    html << "<div class=\"stat\"><span class=\"stat-label\">Node Version:</span><span class=\"stat-value\">" << data.node_version << "</span></div>\n";
    html << "<div class=\"stat\"><span class=\"stat-label\">Peers:</span><span class=\"stat-value\">" << data.peer_count << "</span></div>\n";
    html << "<div class=\"stat\"><span class=\"stat-label\">Mempool Size:</span><span class=\"stat-value\">" << data.mempool_size << " tx</span></div>\n";
    html << "<div class=\"stat\"><span class=\"stat-label\">Uptime:</span><span class=\"stat-value\">" << data.uptime << "</span></div>\n";
    html << "</div>\n";
    
    html << "<div class=\"card\">\n";
    html << "<h2>⛏️ Mining Pool</h2>\n";
    html << "<div class=\"stat\"><span class=\"stat-label\">Status:</span><span class=\"stat-value\"><span class=\"status-indicator " << (data.pool_enabled ? "online" : "offline") << "\"></span>" << (data.pool_enabled ? "Online" : "Offline") << "</span></div>\n";
    if (data.pool_enabled) {
        html << "<div class=\"stat\"><span class=\"stat-label\">Port:</span><span class=\"stat-value\">" << data.pool_port << "</span></div>\n";
        html << "<div class=\"stat\"><span class=\"stat-label\">Workers:</span><span class=\"stat-value\">" << data.pool_workers << "</span></div>\n";
    }
    html << "</div>\n";
    
    html << "<div class=\"card\">\n";
    html << "<h2>🔗 API Endpoints</h2>\n";
    html << "<div class=\"stat\"><span class=\"stat-label\">Status (JSON):</span><span class=\"stat-value\"><a href=\"/status\" style=\"color: #4a90e2;\">/status</a></span></div>\n";
    html << "<div class=\"stat\"><span class=\"stat-label\">Status (HTML):</span><span class=\"stat-value\"><a href=\"/\" style=\"color: #4a90e2;\">/</a></span></div>\n";
    html << "</div>\n";
    
    html << "</div>\n";
    html << "<script>\n";
    html << "// Auto-refresh every 30 seconds\n";
    html << "setTimeout(() => location.reload(), 30000);\n";
    html << "</script>\n";
    html << "</body></html>";
    
    return html.str();
}

} // namespace zion