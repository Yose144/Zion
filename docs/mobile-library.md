# ZION Miner C Library for Mobile Bindings

This library provides a C API for the ZION cryptocurrency miner, designed for easy integration with mobile applications using React Native, Flutter, or other cross-platform frameworks.

## Features

- **C API**: Clean C interface for easy FFI integration
- **Thread Management**: Configurable multi-threading support
- **Mobile Optimized**: Special mobile mode with reduced resource usage
- **Pool Support**: Built-in pool mining protocol support
- **Callback System**: Real-time mining statistics and event notifications
- **Cross-Platform**: Works on Linux, macOS, Windows, Android, iOS

## Building

The library is built as part of the main ZION project:

```bash
mkdir build
cd build
cmake -DCMAKE_BUILD_TYPE=Release ..
make zion_miner_c
```

This creates:
- `libzion_miner_c.so` - Shared library
- `libzion_miner_c.a` - Static library
- `zion_miner_c.h` - Header file

## API Overview

### Types

- `ZionMinerHandle` - Opaque miner instance handle
- `ZionMinerConfig` - Configuration structure
- `ZionMinerStats` - Mining statistics structure

### Key Functions

```c
// Create and initialize
ZionMinerHandle* zion_miner_create(const ZionMinerConfig* config);
bool zion_miner_initialize(ZionMinerHandle* handle);

// Control mining
bool zion_miner_start(ZionMinerHandle* handle);
void zion_miner_stop(ZionMinerHandle* handle);

// Get statistics
bool zion_miner_get_stats(ZionMinerHandle* handle, ZionMinerStats* stats);

// Cleanup
void zion_miner_destroy(ZionMinerHandle* handle);

// Utility functions
const char* zion_miner_version(void);
bool zion_miner_is_supported(void);
int zion_miner_get_recommended_threads(void);
```

### Callbacks

The library supports three callback types:

1. **Log Callback**: Receives log messages
2. **Stats Callback**: Real-time mining statistics updates
3. **Block Found Callback**: Notification when blocks are found

## Usage Example

```c
#include "zion_miner_c.h"

void log_callback(const char* message) {
    printf("[MINER] %s\n", message);
}

void stats_callback(int thread_id, uint64_t hashrate, uint64_t total_hashes, 
                   uint32_t accepted, uint32_t rejected) {
    printf("Thread %d: %llu H/s\n", thread_id, hashrate);
}

void block_found_callback(const char* block_hex, const char* hash_hex) {
    printf("Block found! Hash: %s\n", hash_hex);
}

int main() {
    // Check if mining is supported
    if (!zion_miner_is_supported()) {
        printf("Mining not supported on this device\n");
        return 1;
    }
    
    // Configure miner
    ZionMinerConfig config = {0};
    config.thread_count = zion_miner_get_recommended_threads();
    config.use_light_mode = true;  // Recommended for mobile
    config.mobile_mode = true;     // Enable mobile optimizations
    strcpy(config.payout_address, "your_64_char_hex_address_here");
    
    // Set callbacks
    config.log_callback = log_callback;
    config.stats_callback = stats_callback;
    config.block_found_callback = block_found_callback;
    
    // Create and initialize miner
    ZionMinerHandle* miner = zion_miner_create(&config);
    if (!miner) {
        printf("Failed to create miner: %s\n", zion_miner_get_last_error());
        return 1;
    }
    
    if (!zion_miner_initialize(miner)) {
        printf("Failed to initialize: %s\n", zion_miner_get_last_error());
        zion_miner_destroy(miner);
        return 1;
    }
    
    // Start mining
    if (!zion_miner_start(miner)) {
        printf("Failed to start: %s\n", zion_miner_get_last_error());
        zion_miner_destroy(miner);
        return 1;
    }
    
    // Mining is now running in background threads
    // Your app can continue with other tasks
    
    // Get stats periodically
    ZionMinerStats stats;
    if (zion_miner_get_stats(miner, &stats)) {
        printf("Hashrate: %llu H/s\n", stats.hashrate);
        printf("Total hashes: %llu\n", stats.total_hashes);
    }
    
    // Stop mining when done
    zion_miner_stop(miner);
    zion_miner_destroy(miner);
    
    return 0;
}
```

## Mobile Integration

### React Native

For React Native integration, you can use libraries like `react-native-ffi` or create a native module:

```javascript
import { NativeModules } from 'react-native';

const { ZionMiner } = NativeModules;

// Start mining
const config = {
  threadCount: 2,
  lightMode: true,
  mobileMode: true,
  payoutAddress: 'your_address_here'
};

ZionMiner.create(config)
  .then(() => ZionMiner.initialize())
  .then(() => ZionMiner.start())
  .then(() => console.log('Mining started'))
  .catch(error => console.error('Mining error:', error));

// Get stats
ZionMiner.getStats()
  .then(stats => {
    console.log('Hashrate:', stats.hashrate);
    console.log('Total hashes:', stats.totalHashes);
  });
```

### Flutter

For Flutter, create a native plugin using platform channels:

```dart
import 'package:flutter/services.dart';

class ZionMiner {
  static const MethodChannel _channel = MethodChannel('zion_miner');
  
  static Future<bool> create(Map<String, dynamic> config) async {
    return await _channel.invokeMethod('create', config);
  }
  
  static Future<bool> initialize() async {
    return await _channel.invokeMethod('initialize');
  }
  
  static Future<bool> start() async {
    return await _channel.invokeMethod('start');
  }
  
  static Future<Map<String, dynamic>> getStats() async {
    return await _channel.invokeMethod('getStats');
  }
  
  static Future<void> stop() async {
    await _channel.invokeMethod('stop');
  }
}
```

## Configuration Options

### Mobile Mode

When `mobile_mode` is enabled:
- Reduces chunk size for lower memory usage
- Suggests fewer threads to preserve battery
- Optimizes for thermal management
- Reduces background CPU usage

### Light Mode

When `use_light_mode` is enabled:
- Uses RandomX light mode (less memory, slightly slower)
- Faster initialization time
- Suitable for devices with limited RAM
- Recommended for mobile devices

### Pool Mining

To enable pool mining, set the pool configuration:

```c
config.pool_port = 3333;
strcpy(config.pool_host, "pool.example.com");
strcpy(config.pool_user, "your_worker_name");
strcpy(config.pool_pass, "your_password");
```

## Performance Considerations

### Thread Count

- Mobile devices: 1-2 threads recommended
- Desktop: Number of CPU cores - 1
- Servers: Number of CPU cores or more

### Memory Usage

- Light mode: ~256MB RAM minimum
- Full mode: ~2GB RAM minimum
- Mobile mode reduces working set by ~50%

### Battery Life

On mobile devices:
- Use mobile mode to reduce power consumption
- Limit thread count to 1-2 threads
- Consider implementing thermal throttling
- Monitor battery level and pause mining when low

## Error Handling

Always check return values and use `zion_miner_get_last_error()` for detailed error messages:

```c
if (!zion_miner_start(miner)) {
    const char* error = zion_miner_get_last_error();
    printf("Failed to start mining: %s\n", error);
    // Handle error appropriately
}
```

## Testing

A test program is included:

```bash
./test_miner_c 2  # Test with 2 threads
```

This demonstrates all library features and validates the API.

## Deployment

### Android

1. Build the library for Android architectures (arm64-v8a, armeabi-v7a)
2. Include in your APK under `lib/` directory
3. Load using `System.loadLibrary("zion_miner_c")`

### iOS

1. Build as a static library for iOS architectures
2. Include in your Xcode project
3. Link against the static library and dependencies

### Dependencies

The library requires:
- OpenSSL (crypto functions)
- pthreads (threading)
- RandomX (included as submodule)

Make sure these are available on your target platform.

## Security Considerations

- Validate all input parameters
- Use secure random number generation for nonces
- Protect private keys and passwords
- Consider implementing rate limiting for API calls
- Monitor for thermal throttling on mobile devices

## License

The library is released under the same license as the main ZION project (MIT License).